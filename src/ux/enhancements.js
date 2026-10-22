/* Progressive enhancement for the accepted Markdown reader and native dialogs. */
(()=>{
 'use strict';
 const ready=()=>{
  const U=window.KDVUI,K=U.K,lang=U.LANG,main=document.getElementById('main');
  const routeMap={'index.html':'','para-quem.html':'audience','modelo.html':'model','playbook.html':'playbook','implementacao.html':'implementation','recursos.html':'resources','documentacao.html':'docs','comunidade.html':'community','privacidade.html':'privacy'};
  function cleanLinks(root){root.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href'),m=href.match(/^([a-z-]+\.html)(?:#(.*))?$/);if(!m||!(m[1] in routeMap))return;if(m[1]==='documentacao.html'&&K.ux.slugs[m[2]])a.href=`/${lang}/docs/${K.ux.slugs[m[2]]}/`;else a.href=`/${lang}/${routeMap[m[1]]?routeMap[m[1]]+'/':''}${m[2]?'#'+m[2]:''}`;});}
  cleanLinks(document);
  const observer=new MutationObserver(entries=>{for(const entry of entries)for(const node of entry.addedNodes)if(node.nodeType===1)cleanLinks(node.parentElement||node);});
  observer.observe(main,{childList:true,subtree:true});observer.observe(document.getElementById('drawer'),{childList:true,subtree:true});
  document.querySelector('.palette-close').addEventListener('click',()=>{const p=document.getElementById('palette');p.classList.remove('on');p.close();document.getElementById('search-btn').focus();});
  let lightboxFocus;
  document.addEventListener('click',event=>{if(event.target.closest('[data-lightbox]'))lightboxFocus=event.target.closest('[data-lightbox]');},true);
  document.getElementById('lightbox').addEventListener('close',()=>lightboxFocus?.focus());
  const drawer=document.getElementById('drawer');drawer.addEventListener('click',event=>{if(event.target!==drawer)return;const rect=drawer.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right)U.closeDrawer();});
  window.addEventListener('hashchange',()=>{const match=location.hash.match(/^#ver=([a-z]+:[a-z0-9-]+)$/);if(match&&!drawer.classList.contains('on'))U.openRef(match[1]);});
  const alias=document.getElementById(location.hash.slice(1));if(alias?.dataset.refAlias)U.openRef(alias.dataset.refAlias);
  let reading={},navigating=false;
  const normalized=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function updateTrail(){
   const host=document.querySelector('[data-trail-output]');if(!host)return;
   const persona=K.personas.find(p=>p.id===U.store.get('perfil',null));
   if(!persona){host.replaceChildren();return;}
   const current=location.pathname.split('/').filter(Boolean).at(-1),paths=persona.trilha.map(id=>({id,slug:K.ux.slugs[id],title:K.guias.find(g=>g.id===id).titulo}));
   if(current!=='docs')reading[current]=true;
   host.innerHTML=`<p class="mono">${U.esc(persona.curto)} · ${paths.filter(p=>reading[p.slug]).length}/${paths.length} ${U.esc(K.ui.docs.lidos)}</p><div class="trail">${paths.map(p=>`<a href="/${lang}/docs/${p.slug}/" ${p.slug===current?'aria-current="page"':''}>${U.esc(p.title)}${reading[p.slug]?' ✓':''}</a>`).join('')}</div>`;
  }
  function hints(){
   const article=document.querySelector('.docs-article');if(!article)return;
   const words={Hive:'conceito:dominio',Cell:'conceito:subdominio',Comb:'conceito:agrupamento',Farm:'conceito:ambiente',steward:'termo:steward',custodian:'papel:custodiante',custodiante:'papel:custodiante',MCP:'termo:mcp'};
   const pattern=/\b(Hive|Cell|Comb|Farm|steward|custodian|custodiante|MCP)\b/g,walker=document.createTreeWalker(article,NodeFilter.SHOW_TEXT),nodes=[];
   let node;while(node=walker.nextNode())if(!node.parentElement.closest('a,button,pre,code,h1,h2,h3,script,style'))nodes.push(node);
   for(const node of nodes){pattern.lastIndex=0;if(!pattern.test(node.nodeValue))continue;pattern.lastIndex=0;const fragment=document.createDocumentFragment();let index=0;for(const match of node.nodeValue.matchAll(pattern)){fragment.append(document.createTextNode(node.nodeValue.slice(index,match.index)));const b=document.createElement('button');b.type='button';b.className='ref';b.dataset.ref=words[match[0]];b.textContent=match[0];fragment.append(b);index=match.index+match[0].length;}fragment.append(document.createTextNode(node.nodeValue.slice(index)));node.replaceWith(fragment);}
  }
  function wireDocs(){
   document.querySelectorAll('[data-doc-link],[data-doc-card]').forEach(a=>{
    const slug=new URL(a.href,location.href).pathname.split('/').filter(Boolean).at(-1);
    const summary=K.guias.find(g=>K.ux.slugs[g.id]===slug);
    if(summary)a.dataset.search=(a.dataset.search||a.textContent)+' '+summary.titulo+' '+summary.resumo;
   });
   const input=document.querySelector('[data-doc-filter]');
   if(input)input.addEventListener('input',()=>{
    const q=normalized(input.value.trim()),side=document.querySelector('.docs-sidebar');
    side.classList.toggle('is-filtering',!!q);
    document.querySelectorAll('[data-doc-link],[data-doc-card]').forEach(a=>{a.hidden=!normalized(a.dataset.search||a.textContent).includes(q);});
    document.querySelectorAll('.docs-nav-group').forEach(g=>{g.hidden=[...g.querySelectorAll('[data-doc-link]')].every(a=>a.hidden);});
    document.querySelector('[data-doc-empty]').hidden=[...document.querySelectorAll('[data-doc-link]')].some(a=>!a.hidden);
   });
   document.querySelector('[data-doc-toggle]')?.addEventListener('click',event=>{
    const button=event.currentTarget,expanded=button.getAttribute('aria-expanded')!=='true';
    button.setAttribute('aria-expanded',String(expanded));document.querySelector('.docs-sidebar').classList.toggle('is-open',expanded);
   });
   hints();updateTrail();cleanLinks(main);
  }
  async function navigate(url,push=true){
   if(navigating)return; navigating=true;main.setAttribute('aria-busy','true');
   try{
    const response=await fetch(url.href,{credentials:'same-origin',headers:{Accept:'text/html'}});if(!response.ok)throw Error('Document unavailable');
    const doc=new DOMParser().parseFromString(await response.text(),'text/html');const next=doc.getElementById('main');if(!next)throw Error('No document content');
    main.innerHTML=next.innerHTML;main.dataset.uxPage=next.dataset.uxPage;document.title=doc.title;
    for(const selector of ['link[rel="canonical"]','meta[name="description"]','meta[property="og:title"]','meta[property="og:description"]','meta[property="og:url"]','meta[name="twitter:title"]','meta[name="twitter:description"]']){const old=document.querySelector(selector),fresh=doc.querySelector(selector);if(old&&fresh)old.replaceWith(fresh.cloneNode(true));}
    document.querySelectorAll('head link[rel="alternate"]').forEach(el=>el.remove());doc.querySelectorAll('head link[rel="alternate"]').forEach(el=>document.head.append(el.cloneNode(true)));
    if(push)history.pushState({kdvGuide:true},'',url.pathname+url.hash);
    document.querySelectorAll('[data-lang-to]').forEach(a=>a.href=location.pathname.replace(/^\/(en|pt-br|pt|es)\//,'/'+a.dataset.langTo+'/')+location.hash);
    wireDocs();window.scrollTo({top:0,behavior:'instant'});const heading=main.querySelector('h1');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
   }catch(error){location.assign(url.href);}finally{navigating=false;main.removeAttribute('aria-busy');}
  }
  document.addEventListener('click',event=>{
   const a=event.target.closest('a[href]');if(!a||a.target||a.hasAttribute('download')||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;
   const url=new URL(a.href,location.href);if(url.origin!==location.origin)return;
   if(url.pathname.startsWith(`/${lang}/docs/`)&&location.pathname.startsWith(`/${lang}/docs/`)&&url.pathname!==location.pathname){event.preventDefault();U.closeDrawer();navigate(url);}
  });
  window.addEventListener('popstate',()=>{if(location.pathname.startsWith(`/${lang}/docs/`))navigate(new URL(location.href),false);});
  document.addEventListener('kdv:persona',updateTrail);
  wireDocs();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();

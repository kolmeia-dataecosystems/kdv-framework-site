/* Optional motion and reading tools. All editorial content is already in HTML. */
(()=>{
 'use strict';
 function ready(){
  const K=window.KDV_DATA,t=K.ux.dynamic,R=window.KDVDynamics,lang=document.body.dataset.language;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const esc=window.KDVUI.esc;
  const form=document.querySelector('[data-start-form]');
  form?.addEventListener('submit',event=>event.preventDefault());
  form?.addEventListener('change',()=>{
   const values=new FormData(form),profile=R.profile(values.get('team'),values.get('maturity')),i=['solo','team','organization'].indexOf(profile);
   document.querySelector('[data-start-result]').innerHTML=`${R.scale(profile,window.KDVIcons.icon)}<h3>${esc(t.suggested)}: ${esc(t.profiles[i])}</h3><p>${esc(t.meanings[i])}</p><ul>${R.guideIds(values.get('goal')).map(id=>`<li><a class="text-link" href="/${lang}/docs/${K.ux.slugs[id]}/">${esc(K.guias.find(g=>g.id===id).titulo)}</a></li>`).join('')}</ul><p>${esc(t.optional)} <a class="text-link" href="https://kdvecosystems.com">${esc(t.product)} ↗</a></p>`;
  });

  // A seção é redesenhada pelos componentes depois do carregamento: os eventos são delegados e
  // as abas e painéis são lidos a cada ação, para não ficarem presos a elementos substituídos.
  const stages=document.querySelector('#stages');
  if(stages){
   const tabs=()=>[...stages.querySelectorAll('.stage-honeycomb [role="tab"]')],panels=()=>[...stages.querySelectorAll('.stage-panels [role="tabpanel"]')];
   let active=0,timer,interacted=false;
   function select(i){const t=tabs(),p=panels();if(!t.length)return;active=i;t.forEach((tab,n)=>{tab.classList.toggle('selected',n===i);tab.setAttribute('aria-selected',String(n===i));tab.tabIndex=n===i?0:-1;if(p[n])p[n].hidden=n!==i;});}
   function stop(){interacted=true;clearTimeout(timer);}
   function schedule(){clearTimeout(timer);if(reduced.matches||interacted||document.hidden)return;timer=setTimeout(()=>{select((active+1)%Math.max(tabs().length,1));schedule();},2500);}
   stages.addEventListener('pointerdown',stop);
   stages.addEventListener('pointerenter',stop);
   stages.addEventListener('focusin',stop);
   stages.addEventListener('click',event=>{const tab=event.target.closest('.stage-honeycomb [role="tab"]');if(tab){stop();select(tabs().indexOf(tab));}});
   stages.addEventListener('keydown',event=>{const tab=event.target.closest('.stage-honeycomb [role="tab"]');if(!tab)return;const t=tabs(),i=R.stageIndex(event.key,t.indexOf(tab),t.length);if(i===null)return;event.preventDefault();stop();select(i);t[i].focus();});
   new MutationObserver(()=>{if(panels().some((p,n)=>p.hidden===(n===active)))select(active);}).observe(stages,{childList:true,subtree:true});
   document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',schedule);select(0);schedule();
  }

  let revealObserver,anatomyObserver;
  function reveal(root=document){
   if(reduced.matches||!('IntersectionObserver' in window))return;
   revealObserver ||= new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-pending');revealObserver.unobserve(entry.target);}}),{threshold:0,rootMargin:'0px 0px -24px 0px'});
   root.querySelectorAll('.section,.sec,.journey-card,.docs-guide,.contribution-grid article,.template-list article,.reference-list>a,.baseline>*,#models article,.docs-nav-group,.cell.click,.acc>details').forEach(el=>{
    if(el.dataset.revealed)return;el.dataset.revealed='true';el.classList.add('reveal-motion');
    // Content already above the fold remains visible, including focus targets.
    if(el.getBoundingClientRect().top>=innerHeight)el.classList.add('reveal-pending');revealObserver.observe(el);
   });
   const tree=root.querySelector('#explorer .anat');
   if(tree&&!tree.dataset.assembled){
    tree.dataset.assembled='true';tree.classList.add('anatomy-tree');
    const levels=['ecossistema','dominio','subdominio','agrupamento','produto','ambiente'];
    // Fade each semantic level; only labels translate, avoiding compounded displacement.
    levels.forEach((id,i)=>tree.querySelectorAll(`.box[data-sel="${id}"]>.lbl`).forEach(label=>{label.parentElement.classList.add('anatomy-container','reveal-pending');label.parentElement.style.transitionDelay=`${i*.1}s`;label.classList.add('anatomy-layer','reveal-pending');label.style.transitionDelay=`${i*.1}s`;}));
    anatomyObserver ||= new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.querySelectorAll('.anatomy-layer,.anatomy-container').forEach(label=>label.classList.remove('reveal-pending'));anatomyObserver.unobserve(entry.target);}}),{threshold:.05});
    anatomyObserver.observe(tree);
   }
  }
  reduced.addEventListener('change',()=>{if(reduced.matches){document.querySelectorAll('.reveal-pending').forEach(el=>el.classList.remove('reveal-pending'));revealObserver?.disconnect();anatomyObserver?.disconnect();}});
  // Focus must never land in visually hidden content.
  document.addEventListener('focusin',event=>{let el=event.target;while(el){el.classList?.remove('reveal-pending');el=el.parentElement;}});

  const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');progress.hidden=true;document.body.append(progress);
  let frame;
  function updateProgress(){
   frame=null;const article=document.querySelector('.docs-article'),header=document.querySelector('.header');progress.hidden=!article;
   if(!article)return;const top=header.getBoundingClientRect().bottom,rect=article.getBoundingClientRect();
   progress.style.top=`${top}px`;progress.style.transform=`scaleX(${Math.max(0,Math.min(1,(top-rect.top)/Math.max(1,rect.height-(innerHeight-top))))})`;
  }
  const queueProgress=()=>{if(!frame)frame=requestAnimationFrame(updateProgress);};
  window.addEventListener('scroll',queueProgress,{passive:true});window.addEventListener('resize',queueProgress);
  if('ResizeObserver' in window)new ResizeObserver(queueProgress).observe(document.getElementById('main'));
  function docs(){
   const article=document.querySelector('.docs-article');if(!article){updateProgress();return;}
   let status=article.querySelector('[data-copy-status]');if(!status){status=document.createElement('p');status.className='sr';status.dataset.copyStatus='';status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');article.append(status);}
   article.querySelectorAll('h2[id],h3[id]').forEach(heading=>{
    if(heading.querySelector('.copy-heading'))return;
    const button=document.createElement('button');button.type='button';button.className='copy-heading';button.textContent=t.copyLink;button.setAttribute('aria-label',`${t.copyLink}: ${heading.textContent}`);
    button.addEventListener('click',async()=>{
     const url=new URL(location.href);url.hash=heading.id;status.textContent='';let copied=false;
     try{await navigator.clipboard.writeText(url.href);copied=true;}catch{
      const input=document.createElement('textarea');input.value=url.href;input.className='copy-fallback';input.setAttribute('aria-label',t.copyLink);article.append(input);input.select();
      try{copied=document.execCommand('copy');}catch{}input.remove();button.focus({preventScroll:true});
      if(!copied)window.prompt(t.copyPrompt,url.href);
     }
     status.textContent=copied?t.copied:t.copyPrompt;
    });heading.append(' ',button);
   });updateProgress();
  }
  // The documentation reader swaps main without reloading the page.
  document.addEventListener('kdv:content',()=>{docs();reveal();});docs();reveal();

  if(document.body.dataset.page!=='documentacao'&&'IntersectionObserver' in window){
   const hero=document.querySelector('.hero,.page-hero'),footer=document.querySelector('footer');
   const target=document.getElementById('voce');
   // Reuse the home CTA and its existing destination on every institutional page.
   const cta=document.createElement('a');cta.className='btn mobile-action';cta.textContent=K.page.home.hero.cta1;cta.href=target?'#voce':`/${lang}/#voce`;cta.hidden=true;document.body.append(cta);
   const mobile=matchMedia('(max-width:700px)');
   // Rects are read on scroll (one per frame): IntersectionObserver misses fast jumps and leaves the CTA stale.
   const inView=el=>{if(!el)return false;const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;};
   function update(){const head=document.querySelector('.header'),hb=head?head.getBoundingClientRect().bottom:0;const pastHero=hero?hero.getBoundingClientRect().bottom<=hb:true;const show=mobile.matches&&pastHero&&!inView(footer)&&!inView(target);cta.hidden=!show;document.body.classList.toggle('mobile-action-visible',show);if(show)document.body.style.setProperty('--mobile-action-space',`${cta.getBoundingClientRect().height+24}px`);}
   let queued=false;const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;update();});};
   addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);mobile.addEventListener('change',update);update();
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();

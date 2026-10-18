'use strict';
(() => {
 const config=JSON.parse(document.getElementById('page-config').textContent);
 const menu=document.querySelector('.mobile-toggle');
 menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.getElementById('navigation').classList.toggle('is-open',open)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){menu.click();menu.focus()}});
 document.querySelector('[data-close-notice]')?.addEventListener('click',()=>document.querySelector('.privacy-notice').remove());
 document.querySelectorAll('a[href^="#concept-"]').forEach(a=>a.addEventListener('click',()=>{const target=document.getElementById(a.hash.slice(1));if(target instanceof HTMLDetailsElement){target.open=true;document.querySelectorAll('.concepts details').forEach(x=>x.classList.toggle('highlight',x===target))}}));
 const openConcept=()=>{const target=document.getElementById(location.hash.slice(1));if(target instanceof HTMLDetailsElement)target.open=true};openConcept();window.addEventListener('hashchange',openConcept);
 const tabs=document.querySelector('[data-tabs]');
 if(tabs){const buttons=[...tabs.querySelectorAll('[data-tab]')],panels=[...tabs.querySelectorAll('[data-panel]')];
  const activate=(index,focus=false)=>{buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1});panels.forEach((p,i)=>{p.hidden=i!==index});if(focus)buttons[index].focus()};
  buttons.forEach((b,i)=>{b.addEventListener('click',()=>activate(i));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%buttons.length;if(e.key==='ArrowLeft')n=(i+buttons.length-1)%buttons.length;if(e.key==='Home')n=0;if(e.key==='End')n=buttons.length-1;if(n!==undefined){e.preventDefault();activate(n,true)}})});
  const fromHash=()=>{const m=location.hash.match(/^#stage-(\d)$/);activate(m&&+m[1]<panels.length?+m[1]:0)};fromHash();window.addEventListener('hashchange',fromHash);
 }
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-reference]').forEach(row=>{row.hidden=filter!=='all'&&row.dataset.reference!==filter})}));
 const checks=[...document.querySelectorAll('[data-check]')];
 const updateChecks=()=>{const count=checks.filter(c=>c.checked).length;const n=document.querySelector('[data-check-count]');if(n)n.textContent=count;const p=document.querySelector('[data-progress]');if(p)p.style.width=`${100*count/checks.length}%`};
 checks.forEach(c=>c.addEventListener('change',updateChecks));document.querySelector('[data-reset]')?.addEventListener('click',()=>{checks.forEach(c=>{c.checked=false});updateChecks()});
 const form=document.querySelector('[data-canvas]');
 form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const values=new FormData(form);const safe=v=>String(v||'').replace(/[\r\n]+/g,' ').trim();const product=safe(values.get('product'));const owner=safe(values.get('owner'));const purpose=safe(values.get('purpose'));const classification=safe(values.get('classification'));let text=`# KDV / framework - ${product}\n\n> ${config.templateNote}\n\n`;[product,owner,purpose,classification].forEach((v,i)=>{text+=`## ${config.fields[i]}\n${v}\n\n`});text+=`## ${config.evidence}\n${config.stages.map(x=>'- [ ] '+x).join('\n')}\n\n---\nKDV Framework community edition 0.1\nOriginal template: CC BY 4.0 - https://creativecommons.org/licenses/by/4.0/\nhttps://github.com/kolmeia-dataecosystems/kdv-framework-site\n`;const blob=new Blob([text],{type:'text/markdown;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='kdv-data-product-canvas-'+config.language+'.md';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('[data-canvas-status]').textContent=config.builderSuccess});
})();

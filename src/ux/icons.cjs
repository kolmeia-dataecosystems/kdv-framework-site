/* Shared by static rendering and the browser. Geometry follows the home vocabulary. */
(function(root){
 'use strict';
 const paths={
  persona:'<circle cx="12" cy="6" r="3"/><path d="M5 21v-6l3-3h8l3 3v6"/>',
  organizacao:'<path d="M2 22h20M4 22V3h11v19M15 9h5v13M8 7h3M8 11h3M8 15h3M18 13v1M18 17v1"/>',
  papel:'<path d="M8 5V2h8v3M3 5h18v17H3ZM3 11h18M10 10v4h4v-4"/>',
  estagio:'<path d="M3 20V4h6v16Zm6-5h6V4h6v16H9M9 9h6"/>',
  pratica:'<path d="M4 4h16v16H4ZM8 12l3 3 6-7"/>',
  template:'<path d="M5 2h14v20H5ZM5 7h14M10 7v15M10 12h9M10 17h9"/>',
  artefato:'<path d="m12 2 9 5v10l-9 5-9-5V7Zm-9 5 9 5 9-5M12 12v10"/>',
  risco:'<path d="m12 2 10 19H2ZM12 8v6M12 17v1"/>',
  evidencia:'<path d="M5 2h14v20H5ZM8 7h8M8 11h8M8 16l2 2 6-5"/>',
  comunidade:'<path d="M9 2h6v6H9ZM5 22v-8h14v8M1 7h4v4H1Zm18 0h4v4h-4M1 22v-6h4M23 22v-6h-4"/>',
  documento:'<path d="M6 2h12v20H6ZM6 7h12M9 11h6M9 15h6M9 18h3"/>',
  seta:'<path d="M3 12h18m-7-7 7 7-7 7"/>',
  'link-externo':'<path d="M5 19 19 5M5 5h14v14"/>',
  sol:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2"/>',
  lua:'<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/>',
  fechar:'<path d="m5 5 14 14M5 19 19 5"/>',
  expandir:'<path d="M4 12h16M12 4v16"/>',
  busca:'<circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/>',
  concluido:'<path d="m4 12 5 5L20 6"/>',
  hive:'<path d="M12 2 21 7v10l-9 5-9-5V7Z"/><path d="m3 7 9 5 9-5M12 12v10"/>',
  cell:'<path d="M5 5h14v14H5Z"/><path d="M9 9h6v6H9Z"/>',
  ecosystem:'<path d="m12 1 10 6v11l-10 5L2 18V7Z"/><path d="M12 7v10M7 9l10 6M17 9 7 15"/>',
  comb:'<path d="M2 3h8v8H2Zm12 0h8v8h-8ZM2 15h8v8H2Zm12 0h8v8h-8Z"/>',
  farm:'<path d="m2 10 10-8 10 8M5 8v14h14V8M9 22v-8h6v8"/>',
  grow:'<path d="M12 22V10M12 14C3 14 3 6 3 6s9-1 9 8ZM12 10C12 2 21 2 21 2s0 8-9 8Z"/>',
  govern:'<path d="m12 2 9 4v6c0 6-9 11-9 11S3 18 3 12V6Z"/><path d="m7 12 3 3 7-7"/>',
  share:'<path d="m7 12 10-7M7 12l10 7"/><path d="M2 9h6v6H2Zm15-7h5v5h-5Zm0 15h5v5h-5Z"/>',
  activate:'<path d="M3 21V3M3 21h19M7 17l5-5 4 2 6-9M17 5h5v5"/>',
  code:'<path d="m8 5-6 7 6 7M16 5l6 7-6 7M14 2l-4 20"/>'
 };
 const aliases={product:'documento',people:'comunidade'};
 function icon(name,size=24){name=aliases[name]||name;if(!paths[name])throw Error('Unknown icon: '+name);if(![16,20,24,32].includes(size))throw Error('Invalid icon size');return `<svg class="icon icon-${size}" data-icon="${name}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="miter" stroke-linecap="square" aria-hidden="true" focusable="false">${paths[name]}</svg>`;}
 const glyphs={'←':'seta','→':'seta','↗':'link-externo','↓':'seta','↑':'seta','✓':'concluido','☀':'sol','☾':'lua','◐':'lua','×':'fechar','✕':'fechar','⌕':'busca'};
 function textIcons(text){return text.replace(/[←→↗↓↑✓☀☾◐✕⌕]|(?<=^|\s)×(?=\s*$)/g,g=>g==='←'?`<span class="arrow-back">${icon("seta",16)}</span>`:icon(glyphs[g],16));}
 // Preserve accepted guide prose, code, scripts and styles byte for byte.
 function markup(html){const saved=[];html=html.replace(/<(script|style|pre|code)\b[^>]*>[\s\S]*?<\/\1>|<article class="docs-article">[\s\S]*?<\/article>/g,s=>`\u0000${saved.push(s)-1}\u0000`);
  html=html.replace(/<span class="go">([^<]*)<\/span>/g,(_,t)=>`<span class="go">${icon(t.includes('↗')?'link-externo':'seta',16)}${t.replace(/[→↗]/g,'')}</span>`);
  html=html.replace(/>([^<]+)</g,(_,t)=>'>'+textIcons(t)+'<');
  html=html.replace(/(<(?:a|button)\b[^>]*class="[^"]*\barrow\b[^"]*"[^>]*>)(?!<svg)/g,'$1'+icon('seta',16));
  html=html.replace(/(<span class="go">)(?!<svg)/g,'$1'+icon('seta',16));
  html=html.replace(/<span class="plus" aria-hidden="true"><\/span>/g,`<span class="plus" aria-hidden="true">${icon('expandir',20)}</span>`);
  return html.replace(/\u0000(\d+)\u0000/g,(_,i)=>saved[+i]);
 }
 function enhance(root){
  // Only interface text changes; imported knowledge and code stay untouched.
  const skip='svg,script,style,pre,code,.markdown-body';
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
  let node;while(node=walker.nextNode())if(!node.parentElement.closest(skip)&&textIcons(node.nodeValue)!==node.nodeValue)nodes.push(node);
  for(const node of nodes){const holder=document.createElement('span');holder.innerHTML=textIcons(node.nodeValue.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])));node.replaceWith(...holder.childNodes);}
  const selector='.arrow,.go,.plus,.recog-list [data-pick]';
  for(const el of [...(root.matches?.(selector)?[root]:[]),...root.querySelectorAll(selector)]){
   if(el.closest('.markdown-body')||el.querySelector('[data-icon="seta"],[data-icon="link-externo"],[data-icon="expandir"]'))continue;
   el.insertAdjacentHTML('beforeend',icon(el.matches('.plus')?'expandir':'seta',el.matches('.plus')?20:16));
  }
 }
 const api={icon,paths,markup,textIcons,enhance};
 if(typeof module==='object')module.exports=api;else {
  root.KDVIcons=api;
  document.addEventListener('DOMContentLoaded',()=>{
   enhance(document.body);
   const observer=new MutationObserver(entries=>{const roots=new Set();for(const entry of entries){if(entry.type==='characterData')roots.add(entry.target.parentElement);else for(const node of entry.addedNodes)if(node.nodeType===1&&!node.matches('svg,svg *'))roots.add(node);else if(node.nodeType===3)roots.add(node.parentElement);}for(const el of roots)if(el?.isConnected&&!el.closest('svg,script,style,pre,code,.markdown-body'))enhance(el);});
   observer.observe(document.body,{childList:true,subtree:true,characterData:true});
  });
 }
})(typeof window==='object'?window:globalThis);

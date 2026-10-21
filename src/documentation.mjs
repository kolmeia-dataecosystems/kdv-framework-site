import {reviewMode,knowledgeDirectory} from './context.mjs';
import {copy} from '../review/copy.mjs';
import {brazilian} from '../review/regional.mjs';
import {readFileSync} from 'node:fs';
import {release,releaseUi,frameworkReleaseUrl} from './releases.mjs';
import {join} from 'node:path';
const base=new URL('../'+knowledgeDirectory+'/',import.meta.url);
export const source=JSON.parse(readFileSync(new URL('source.json',base),'utf8'));
export const inventory=JSON.parse(readFileSync(new URL('knowledge.json',base),'utf8'));
export const KNOWLEDGE=`https://github.com/${source.repository}`;
export const guides=inventory.documents.map(d=>({...d,markdown:readFileSync(new URL(d.path,base),'utf8')}));
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const headingId=text=>text.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export function docHref(raw,language){
 if(raw.startsWith('#'))return raw;
 if(/^https?:\/\//.test(raw)||raw.startsWith('mailto:'))return raw;
 if(/^\.\.\/\.\.\/diagrams\/[a-z0-9-]+\.svg$/.test(raw))return '/knowledge-assets/'+raw.split('/').at(-1);
 if(/^\.\.\/\.\.\/templates\/(en|pt-br|pt|es)\/[a-z0-9-]+\.md$/.test(raw))return '/'+raw.slice(6);
 const match=raw.match(/^([a-z][a-z0-9-]*)\.md(#[a-z0-9-]+)?$/);
 if(match&&guides.some(g=>g.language===language&&g.slug===match[1]))return `/${language}/docs/${match[1]}/${match[2]||''}`;
 return '#';
}
function inline(text,l){
 const parts=[];let i=0;const token=/(!?)\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;let m;
 while((m=token.exec(text))){parts.push(e(text.slice(i,m.index)));if(m[4])parts.push('<strong>'+e(m[4])+'</strong>');else if(m[5])parts.push('<code>'+e(m[5])+'</code>');else{const href=docHref(m[3],l);parts.push(m[1]?`<img src="${e(href)}" alt="${e(m[2])}" loading="lazy" width="520" height="500">`:`<a href="${e(href)}">${e(m[2])}</a>`)}i=token.lastIndex;}
 return parts.join('')+e(text.slice(i));
}
export function markdownToHtml(markdown,l){
 const rows=markdown.replace(/\r/g,'').split('\n');const html=[],toc=[],ids=new Map();let paragraph=[],list=null,code=null;
 const flush=()=>{if(paragraph.length){html.push('<p>'+inline(paragraph.join(' '),l)+'</p>');paragraph=[]}if(list){html.push('</'+list+'>');list=null}};
 for(let i=0;i<rows.length;i++){
  const line=rows[i];
  if(line.startsWith('```')){flush();if(code!==null){html.push('<pre><code>'+e(code.join('\n'))+'</code></pre>');code=null}else code=[];continue}
  if(code!==null){code.push(line);continue}
  if(/^# /.test(line)){flush();continue}
  const head=line.match(/^(#{2,4}) (.+)$/);if(head){flush();const depth=head[1].length;const stem=headingId(head[2]);const n=ids.get(stem)||0;ids.set(stem,n+1);const id=stem+(n?'-'+n:'');html.push(`<h${depth} id="${id}">${inline(head[2],l)}</h${depth}>`);if(depth===2)toc.push({id,title:head[2]});continue}
  if(!line.trim()){flush();continue}
  if(line==='---'){flush();html.push('<hr>');continue}
  if(line.startsWith('> ')){flush();html.push('<blockquote>'+inline(line.slice(2),l)+'</blockquote>');continue}
  if(/^\|/.test(line)&&/^\|[\s:|-]+\|$/.test(rows[i+1]||'')){
   flush();const cells=t=>t.split('|').slice(1,-1).map(x=>x.trim());const head=cells(line);i++;const data=[];while(i+1<rows.length&&rows[i+1].startsWith('|'))data.push(cells(rows[++i]));
   html.push(`<div class="table-scroll" tabindex="0"><table><thead><tr>${head.map(t=>'<th scope="col">'+inline(t,l)+'</th>').join('')}</tr></thead><tbody>${data.map(r=>'<tr>'+r.map(t=>'<td>'+inline(t,l)+'</td>').join('')+'</tr>').join('')}</tbody></table></div>`);continue;
  }
  const item=line.match(/^(-|\d+\.) (.+)$/);if(item){if(paragraph.length){html.push('<p>'+inline(paragraph.join(' '),l)+'</p>');paragraph=[]}const kind=item[1]==='-'?'ul':'ol';if(list!==kind){if(list)html.push('</'+list+'>');html.push('<'+kind+'>');list=kind}html.push('<li>'+inline(item[2],l)+'</li>');continue}
  if(list){html.push('</'+list+'>');list=null}paragraph.push(line);
 }
 flush();if(code!==null)throw new Error('Unclosed Markdown code fence');return {html:html.join('\n'),toc};
}
export const docsUi={
 en:{label:'Documentation',title:'A shared body\nof working knowledge.',intro:'Read the operating model in depth. Explore original guides, diagrams and practical artefacts maintained in the open knowledge repository.',browse:'Browse guides',search:'Filter guides',count:'guides',version:'Published from main',edit:'Propose an edit',view:'View source',toc:'On this page',previous:'Previous',next:'Next',index:'All guides',empty:'No guides match this filter.',governance:'Open contributions. Guarded publication.',governanceBody:'Anyone can propose an improvement. Changes enter main only after guardian review and passing checks. Initial guardian: ismael-lab. The website publishes a pinned revision of that accepted knowledge.',contribute:'Contribute knowledge',source:'Open knowledge repository',code:'Website source',note:'The guides below are built from the same Markdown you can read and improve on GitHub.'},
 pt:{label:'Documentação',title:'Uma base comum\nde conhecimento aplicado.',intro:'Aprofunde o modelo operacional. Explore guias originais, diagramas e artefactos práticos mantidos no repositório aberto de conhecimento.',browse:'Explorar guias',search:'Filtrar guias',count:'guias',version:'Publicado a partir da main',edit:'Propor uma alteração',view:'Ver a fonte',toc:'Nesta página',previous:'Anterior',next:'Seguinte',index:'Todos os guias',empty:'Nenhum guia corresponde ao filtro.',governance:'Contribuição aberta. Publicação guardiã.',governanceBody:'Qualquer pessoa pode propor melhorias. As alterações entram na main após revisão do guardião e verificações aprovadas. Guardião inicial: ismael-lab. O site publica uma revisão fixada desse conhecimento aceite.',contribute:'Contribuir com conhecimento',source:'Repositório aberto de conhecimento',code:'Código do site',note:'Os guias abaixo são construídos a partir do mesmo Markdown que pode ler e melhorar no GitHub.'},
 es:{label:'Documentación',title:'Una base común\nde conocimiento aplicado.',intro:'Profundice en el modelo operativo. Explore guías originales, diagramas y artefactos prácticos mantenidos en el repositorio abierto de conocimiento.',browse:'Explorar guías',search:'Filtrar guías',count:'guías',version:'Publicado desde main',edit:'Proponer un cambio',view:'Ver la fuente',toc:'En esta página',previous:'Anterior',next:'Siguiente',index:'Todas las guías',empty:'Ninguna guía coincide con el filtro.',governance:'Contribución abierta. Publicación custodiada.',governanceBody:'Cualquier persona puede proponer mejoras. Los cambios entran en main tras revisión del guardián y verificaciones aprobadas. Guardián inicial: ismael-lab. El sitio publica una revisión fijada de ese conocimiento aceptado.',contribute:'Contribuir conocimiento',source:'Repositorio abierto de conocimiento',code:'Código del sitio',note:'Las guías se construyen con el mismo Markdown que puede leer y mejorar en GitHub.'}
};
docsUi['pt-br']=brazilian(docsUi.pt);
if(reviewMode){for(const [l,p] of Object.entries(copy)){Object.assign(docsUi[l],{version:p.docsVersion,view:p.docsView,edit:p.docsEdit,note:p.docsNote});}}
export function documentation(l,slug=''){
 const ui=docsUi[l],items=guides.filter(g=>g.language===l),current=items.find(g=>g.slug===slug);if(slug&&!current)throw new Error('Unknown documentation guide');const revision=source.commit.slice(0,7);
 const groups=[...new Set(items.map(g=>g.group))];
 const sidebar=`<aside class="docs-sidebar"><a class="docs-sidebar-title" href="/${l}/docs/">${e(ui.label)}</a><label class="docs-search">${e(ui.search)}<input type="search" data-doc-filter autocomplete="off" aria-label="${e(ui.search)}"></label><button class="docs-nav-toggle" type="button" aria-expanded="false" aria-controls="docs-guide-navigation" data-doc-toggle>${e(ui.browse)} <span aria-hidden="true">+</span></button><nav id="docs-guide-navigation" aria-label="${e(ui.label)}">${groups.map(group=>`<div class="docs-nav-group"><span class="mono">${e(group)}</span>${items.filter(g=>g.group===group).map(g=>`<a data-doc-link data-search="${e((g.title+' '+g.description).toLocaleLowerCase(l))}" href="/${l}/docs/${g.slug}/" ${g===current?'aria-current="page"':''}>${e(g.title)}</a>`).join('')}</div>`).join('')}</nav><p class="docs-empty" data-doc-empty hidden>${e(ui.empty)}</p><a class="docs-github" href="${KNOWLEDGE}">GitHub ↗</a></aside>`;
 const provenance=reviewMode?`<div class="docs-provenance proposal-provenance"><span>${e(copy[l].docsVersion)} · v1.1.0-dev.2</span><a href="${KNOWLEDGE}/pull/1">${e(copy[l].docsEdit)} ↗</a><a href="${KNOWLEDGE}/blob/${source.commit}/${current?current.path:'README.md'}">${e(copy[l].docsView)} ↗</a></div>`:`<div class="docs-provenance"><span><a href="${frameworkReleaseUrl}">Framework v${e(release.knowledge.version)}</a> · ${e(ui.version)} · <a href="${KNOWLEDGE}/commit/${source.commit}">${revision}</a></span><a href="${KNOWLEDGE}/blob/${source.commit}/${current?current.path:'README.md'}">${e(ui.view)} ↗</a>${current?`<a href="${KNOWLEDGE}/edit/main/${current.path}">${e(ui.edit)} ↗</a>`:''}</div>`;
 let main,toc='';
 if(current){const prefix=`# ${current.title}\n\n${current.description}\n`;const text=current.markdown.startsWith(prefix)?current.markdown.slice(prefix.length):current.markdown;const rendered=markdownToHtml(text,l);const i=items.indexOf(current);main=`<article class="docs-article"><p class="eyebrow">${e(ui.label)} / ${e(current.group)}</p><h1>${e(current.title)}</h1><p class="docs-description">${e(current.description)}</p>${provenance}<div class="markdown-body">${rendered.html}</div><nav class="docs-pagination" aria-label="${e(ui.label)}">${i>0?`<a href="/${l}/docs/${items[i-1].slug}/"><small>${e(ui.previous)}</small>${e(items[i-1].title)} ←</a>`:'<span></span>'}${i<items.length-1?`<a href="/${l}/docs/${items[i+1].slug}/"><small>${e(ui.next)}</small>${e(items[i+1].title)} →</a>`:''}</nav></article>`;toc=`<aside class="docs-toc"><span class="mono">${e(ui.toc)}</span><nav>${rendered.toc.map(t=>`<a href="#${t.id}">${e(t.title)}</a>`).join('')}</nav></aside>`;
 }else{main=`<div class="docs-index"><p class="eyebrow">${e(ui.label)} / ${e(releaseUi[l].communityEdition)} v${e(reviewMode?'1.1 — '+copy[l].previewTitle:release.knowledge.version)}</p><h1>${e(ui.title).replace(/\n/g,'<br>')}</h1><p class="docs-description">${e(ui.intro)}</p>${provenance}<p class="fine-print">${e(ui.note)}</p><div class="docs-guide-grid">${items.map((g,i)=>`<a class="docs-guide" data-doc-card data-search="${e((g.title+' '+g.description).toLocaleLowerCase(l))}" href="/${l}/docs/${g.slug}/"><span class="mono">${String(i+1).padStart(2,'0')} / ${e(g.group)}</span><h2>${e(g.title)}</h2><p>${e(g.description)}</p><span aria-hidden="true">↗</span></a>`).join('')}</div><div class="docs-governance"><h2>${e(ui.governance)}</h2><p>${e(ui.governanceBody)}</p><a class="text-link" href="${KNOWLEDGE}/blob/main/CONTRIBUTING.md">${e(ui.contribute)} ↗</a></div></div>`;}
 return `<section class="wrap docs-layout ${current?'has-toc':''}">${sidebar}${main}${toc}</section>`;
}

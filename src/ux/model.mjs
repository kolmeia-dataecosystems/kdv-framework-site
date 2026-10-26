import {startingPoint,stageHoneycomb} from './dynamic-render.mjs';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import {implementationEnabled} from './availability.mjs';

const require=createRequire(import.meta.url);
export const templates=require('./templates.cjs');
export const languages=['en','pt-br','pt','es'];
export const data=Object.fromEntries(languages.map(l=>[l,JSON.parse(readFileSync(new URL(`./data/${l}.json`,import.meta.url),'utf8'))]));
export const routeIds={'':'home',audience:'para-quem',model:'modelo',playbook:'playbook',implementation:'implementacao',resources:'recursos',docs:'documentacao',community:'comunidade',privacy:'privacidade'};
export const routeFiles={'index.html':'','para-quem.html':'audience','modelo.html':'model','playbook.html':'playbook','implementacao.html':'implementation','recursos.html':'resources','documentacao.html':'docs','comunidade.html':'community','privacidade.html':'privacy'};
export const slugFor=id=>data.en.ux.slugs[id]||id;
export const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function fallback(l,ref){const [kind,id]=ref.split(':');const slugs={conceito:'anatomy',papel:'responsibilities',etapa:'lifecycle',camada:'principles',base:'principles',termo:'glossary',ferramenta:'reference-architecture',modulo:'reference-architecture',modelo:'data-contracts',persona:'start-here',nicho:'worked-example',caso:'worked-example'};return kind==='contato'?'mailto:info@kolmeia.io':`/${l}/docs/${slugs[kind]||'start-here'}/`;}
export function localizeLinks(html,l){
 html=html.replaceAll('../assets/ux/','/assets/ux/');
 if(!implementationEnabled)html=html.replace(/href=(["'])implementacao\.html(?:#[a-z0-9-]+)?\1/g,`href="/${l}/model/#modulos"`);
 html=html.replace(/href="documentacao\.html#([a-z0-9-]+)"/g,(_,id)=>`href="/${l}/docs/${slugFor(id)}/"`);
 for(const [file,route] of Object.entries(routeFiles))html=html.replaceAll(`href="${file}`,`href="/${l}/${route?route+'/':''}`);
 return html.replace(/[ \t]+$/gm,'');
}
const scripts=['interaction.js','components.js'].map(file=>readFileSync(new URL('./'+file,import.meta.url),'utf8'));

// Render the same first interaction state at build time. Only reviewed, local
// presentation modules execute here. No browser, network or contributor code.
class Slot{
 constructor(){this.innerHTML='';this.textContent='';this.children=new Map();this.classList={add(){},remove(){},toggle(){},contains(){return false;}};}
 addEventListener(){}setAttribute(){}focus(){}
 querySelector(selector){if(!this.children.has(selector))this.children.set(selector,new Slot());return this.children.get(selector);}
 querySelectorAll(){return [];}
 html(){let html=this.innerHTML;for(const [selector,child] of this.children){if(selector==='#cv-prev')html=html.replace(/(<pre\b[^>]*id="cv-prev"[^>]*>)[\s\S]*?(<\/pre>)/,'$1'+escape(child.textContent)+'$2');}return html;}
}
const slots={home:['hexmap','recog','stages','baseline','translation','cases','paths-mini'],'para-quem':['nichos','personas'],modelo:['explorer','matrix','roles','modules','refs'],playbook:['steps','access','rhythm','check-ui'],implementacao:['chooser','tools','arch','modules'],recursos:['models','canvas-ui','diagrams'],comunidade:['brands'],privacidade:[]};
export function serverContext(l,id){
 const K=data[l], hosts=Object.fromEntries((slots[id]||[]).map(k=>[k,new Slot()]));
 const document={addEventListener(){},getElementById:id=>hosts[id]||null,querySelector:selector=>selector.startsWith('#')?hosts[selector.slice(1)]||null:null,querySelectorAll:()=>[],body:{dataset:{page:id}}};
 const window={KDV_DATA:K,document,innerWidth:1440,addEventListener(){}};
 class InitialFormData{*[Symbol.iterator](){for(const key of Object.keys(K.ui.canvas.campos))yield[key,key==='classificacao'?K.ui.canvas.classes[1]:''];}}
 const ctx=vm.createContext({window,document,location:{hash:'',pathname:`/${l}/`},history:{replaceState(){}},localStorage:{getItem(){return null;},setItem(){}},FormData:InitialFormData,setTimeout(){},clearTimeout(){},URL,console:{log(){},warn(){}}});
 for(const code of scripts)vm.runInContext(code,ctx,{timeout:1500});
 return {ctx,window,hosts};
}
export function renderPrototypePage(l,route){
 const id=routeIds[route],K=data[l], P=K.page[id];
 let html=templates[id](P)+(id==='home'?templates.homeAfter(P):'');
 const {window,hosts}=serverContext(l,id);
 window.KDVPages[id]?.();
 for(const [name,host] of Object.entries(hosts)){
  const pattern=new RegExp(`(<div\\b[^>]*\\bid="${name}"[^>]*>)[\\s\\S]*?(<\\/div>)`);
  html=html.replace(pattern,(_,start,end)=>start+host.html()+end);
 }
 if(id==='home'){
  html=html.replace(/<div class="hexmap" id="hexmap">[\s\S]*?<p class="cap">[\s\S]*?<\/p><\/div>/,`<div class="ux-honeycomb">${stageHoneycomb(K,l)}</div>`);
  html=html.replace('<section class="sec tint" id="proposta"',startingPoint(K,l)+'<section class="sec tint" id="proposta"');
  html=html.replace('<section class="sec" id="exemplos"',`<p class="wrap nota pilot-note">${escape(K.ux.pilot)}</p><section class="sec" id="exemplos"`);
 }
 if(id==='implementacao')html=html.replace('<div id="tools">',`<p class="nota maturity-note">${escape(K.ux.maturity)}</p><div id="tools">`);
 if(id==='modelo')html=html.replace('<div class="explorer" id="explorer">',`<p class="nota maturity-note">${escape(K.ux.anatomyNote)}</p><div class="explorer" id="explorer">`);
 if(id==='modelo')html=html.replace(/(<div class="grid g3" id="modules">[\s\S]*?<\/button><\/div>)/,`$1<aside class="implementation-example"><p class="eyebrow">${escape(K.ux.exampleLabel)}</p><p>${escape(K.ux.implementationExample)}</p></aside>`);
 if(id==='playbook')html=html.replace('<div class="check" id="check-ui">',`<p class="nota maturity-note">${escape(K.ux.checkNote)}</p><div class="check" id="check-ui">`);
 if(id==='playbook')html=html.replace('id="etapas"', 'id="etapas"').replace('<div id="steps">',`<figure class="wrap journey-figure"><img src="/assets/ux/D3_processo_jornada_do_dado.svg" alt="${escape(K.ui.diagramas.D3)}" loading="lazy"><figcaption>${escape(K.ui.diagramas.nota)}</figcaption></figure><div id="steps">`);
 const aliases=route==='model'?{anatomy:'anatomia',mapping:'referenciais'}:route==='playbook'?{journey:'etapas',readiness:'checklist','stage-0':'cultivar','stage-1':'governar','stage-2':'compartilhar','stage-3':'ativar'}:route==='resources'?{templates:'modelos'}:{};
 for(const [oldId,newId] of Object.entries(aliases))html=html.replace(`id="${newId}"`,`id="${newId}" data-alias="${oldId}"`).replace(new RegExp(`(<(?:section|div)\\b[^>]*id="${newId}"[^>]*>)`),`$1<span id="${oldId}" class="route-alias" aria-hidden="true"></span>`);
 if(route==='model')html+=K.conceitos.map(c=>`<span id="concept-${({ecossistema:'ecosystem',dominio:'hive',subdominio:'cell',agrupamento:'comb',produto:'product',ambiente:'farm'})[c.id]}" data-ref-alias="conceito:${c.id}" class="route-alias"></span>`).join('');
 html=localizeLinks(html,l);
 // Link-based fallbacks make concepts usable even without JavaScript.
 html=html.replace(/<button\b([^>]*\bdata-ref="([a-z]+:[a-z0-9-]+)"[^>]*)>([\s\S]*?)<\/button>/g,(_,attrs,ref,body)=>`<a ${attrs.replace(/type="button"\s*/,'')} href="${fallback(l,ref)}" aria-haspopup="dialog">${body}</a>`);
 return html.replace(/[ \t]+$/gm,'');
}

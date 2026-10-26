import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import icons from '../src/ux/icons.cjs';
import {languages,data,renderPrototypePage} from '../src/ux/model.mjs';
import {allRoutes} from '../src/render.mjs';

const concepts=['persona','organizacao','papel','estagio','pratica','template','artefato','risco','evidencia','comunidade','documento','seta','link-externo'];
const glyphs=/[⌘◐☀☾◈⟋▢▣◆●✕×✓←→↗↓↑]|(?:^|>)\s*[+−]\s*(?:<|$)/u;
// Guide content may contain meaningful arrows and mathematical symbols. Its
// presentation controls are checked separately, without editing imported prose.
const interfaceOnly=html=>html.replace(/<(script|style|pre|code)\b[^>]*>[\s\S]*?<\/\1>/g,'').replace(/<div class="markdown-body">[\s\S]*?<nav class="docs-pagination"/g,'<nav class="docs-pagination"').replace(/>[^<]* × [^<]*</g,'><').replace(/<[^>]+>/g,'>');

test('Generated pages contain no text glyphs used as interface icons',async()=>{
 for(const l of languages)for(const route of allRoutes){
  const html=await readFile(`dist/${l}/${route?route+'/':''}index.html`,'utf8');
  assert.doesNotMatch(interfaceOnly(html),glyphs,`${l}/${route}`);
 }
 const css=await readFile('dist/styles.css','utf8');
 assert.doesNotMatch(css,/content:\s*['"][^'"]*[↗→↓+−✓][^'"]*['"]/);
});

test('Every concept uses the same accessible stroke SVG in all four languages',async()=>{
 for(const l of languages){
  const html=(await Promise.all(['audience','model','playbook','resources','community','docs','releases'].map(r=>readFile(`dist/${l}/${r}/index.html`,'utf8')))).join('');
  for(const concept of concepts){
   assert.ok(html.includes(`data-icon="${concept}"`),`${l}: ${concept}`);
   for(const [,svg] of html.matchAll(/(<svg\b[^>]*data-icon="[^"]+"[^>]*>[\s\S]*?<\/svg>)/g)){
    const name=svg.match(/data-icon="([^"]+)"/)[1],size=Number(svg.match(/width="(\d+)"/)[1]);
    assert.equal(svg,icons.icon(name,size),`${l}: canonical ${name}`);
   }
  }
 }
 assert.throws(()=>icons.icon('missing'));assert.throws(()=>icons.icon('persona',18));
});

test('Browser and static icon modules agree, retain guide text and theme behavior',async()=>{
 const source=await readFile('src/ux/icons.cjs','utf8'),ctx={window:{},document:{addEventListener(){}}};
 vm.runInNewContext(source,ctx);
 for(const name of Object.keys(icons.paths))for(const size of [16,20,24,32])assert.equal(ctx.window.KDVIcons.icon(name,size),icons.icon(name,size));
 const article='<article class="docs-article"><div class="markdown-body"><p>Cultivar → Governar</p></div></article>';
 assert.equal(icons.markup(article),article);
 const interaction=await readFile('src/ux/interaction.js','utf8');
 assert.match(interaction,/innerHTML = window.KDVIcons.icon\(dark \? "lua" : "sol",20\)/);
 assert.match(interaction,/b.setAttribute\("aria-pressed", dark\)/);
 for(const l of languages)assert.ok(icons.markup(renderPrototypePage(l,'implementation')).includes('data-icon="estagio"'));
});

test('Four-language editorial cards and section introductions stay aligned',()=>{
 for(const l of languages){
  for(const family of ['personas','modulos','modelos'])for(const card of data[l][family]){
   assert.ok(card.apoio);assert.ok(card.apoio.split(/\s+/).length<=12,`${l}: ${family}/${card.id}`);
  }
  for(const id of ['para-quem','modelo','playbook','implementacao','recursos','comunidade']){
   const p=data[l].page[id];
   for(const intro of [p.hero.lead,...Object.values(p.sec).map(s=>s.p)])assert.ok((intro.match(/[.!?](?:\s|$)/g)||[]).length<=2,`${l}: ${id}: ${intro}`);
  }
  assert.deepEqual(Object.keys(data[l].ux.documentation.cards),Object.keys(data.en.ux.documentation.cards));
 }
});

test('Dynamic icon enhancement escapes text before inserting SVG markup',async()=>{
 const source=await readFile('src/ux/icons.cjs','utf8');let inserted='';
 const node={nodeValue:'→ <img src=x onerror=alert(1)>',parentElement:{closest(){return null;}},replaceWith(){}};
 const ctx={window:{},NodeFilter:{SHOW_TEXT:4},document:{addEventListener(){},createTreeWalker(){let first=true;return {nextNode(){if(first){first=false;return node;}return null;}};},createElement(){return {set innerHTML(value){inserted=value;},childNodes:[]};}}};
 vm.runInNewContext(source,ctx);
 ctx.window.KDVIcons.enhance({querySelectorAll(){return [];}});
 assert.ok(inserted.includes('data-icon="seta"'));assert.ok(inserted.includes('&lt;img'));
 assert.ok(!inserted.includes('<img'));
 const sample='<button class="arrow">Read</button><span class="go">GitHub ↗</span>';
 assert.equal(icons.markup(icons.markup(sample)),icons.markup(sample));
 assert.equal((icons.markup(sample).match(/data-icon="link-externo"/g)||[]).length,1);
});

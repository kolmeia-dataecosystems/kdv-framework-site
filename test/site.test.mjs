import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import vm from 'node:vm';
import {languages,content} from '../src/content.mjs';
import {routes,escape} from '../src/render.mjs';
const root=resolve('dist');
const file=async p=>readFile(join(root,p),'utf8');
const pages=languages.flatMap(l=>routes.map(r=>`${l}/${r?r+'/':''}index.html`));
test('All locales contain the complete editorial model',()=>{
 for(const l of languages){assert.deepEqual(Object.keys(content[l]).sort(),Object.keys(content.en).sort());assert.equal(content[l].anatomy.length,6);assert.equal(content[l].roles.length,10);assert.equal(content[l].stages.length,4);for(const row of content[l].stages)assert.equal(row.length,8);assert.equal(content[l].mapping.length,9)}
});
test('English default, localized metadata and unique accessible page structure',async()=>{
 assert.equal(await file('index.html'),await file('en/index.html'));
 for(const p of pages){const html=await file(p);const l=p.split('/')[0];assert.ok(html.includes(`lang="${content[l].locale}"`));assert.equal((html.match(/<h1[ >]/g)||[]).length,1,p);assert.equal((html.match(/hreflang=/g)||[]).length,4,p);assert.ok(html.includes('<main id="main">'));const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,ids.length,p);assert.ok(!html.includes('undefined'),p)}
});
test('Every generated internal link, asset and fragment resolves',async()=>{
 for(const p of pages){const html=await file(p);for(const [,raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(!raw.startsWith('/')&&!raw.startsWith('#'))continue;
  const [pathname,fragment]=raw.split('#');let target=pathname?join(root,pathname):join(root,p);assert.ok(target.startsWith(root));if(pathname?.endsWith('/'))target=join(target,'index.html');await stat(target);
  if(fragment){const text=await readFile(target,'utf8');assert.ok(text.includes(`id="${fragment}"`),`${p}: ${raw}`)}
 }}
});
test('Templates contain working sections, original-content licence and provenance',async()=>{
 for(const l of languages)for(const [slug,title] of content[l].templates){const md=await file(`templates/${l}/${slug}.md`);assert.ok(md.startsWith('# '+title));assert.ok((md.match(/^## /gm)||[]).length>=8);assert.ok(md.includes('CC BY 4.0'));assert.ok(md.includes('not official')||md.includes('não formulários oficiais')||md.includes('no formularios oficiales'))}
});
test('No external execution, persistent storage or accidental form transmission',async()=>{
 const runtime=await file('runtime.js');new vm.Script(runtime);assert.doesNotMatch(runtime,/\b(?:fetch|XMLHttpRequest|localStorage|sessionStorage|sendBeacon)\b|document\.cookie/);
 for(const p of pages){const html=await file(p);assert.doesNotMatch(html,/<script[^>]+src="https?:/);assert.doesNotMatch(html,/<iframe|<form[^>]+action=/);if(p.includes('/resources/'))assert.ok(html.includes('<form method="dialog"'))}
});
test('Framework is distinct from product, official assessments and a maturity score',async()=>{
 const html=await file('en/model/index.html');assert.ok(html.includes('A Cell can own several data products'));assert.ok(html.includes('not an extra infrastructure layer'));assert.ok(html.includes('not an official equivalence'));assert.ok(html.includes('does not require a KDV platform'));
 const p=await file('en/playbook/index.html');assert.ok(p.includes('not a maturity score'));
});
test('Markup escaping protects editorial text',()=>{assert.equal(escape('<img src="x" onerror=\'x\'>&'), '&lt;img src=&quot;x&quot; onerror=&#39;x&#39;&gt;&amp;')});

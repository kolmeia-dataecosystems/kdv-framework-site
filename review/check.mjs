import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {languages,content} from '../src/content.mjs';
import {guides,source} from '../src/documentation.mjs';
import {allRoutes} from '../src/render.mjs';
import {copy} from './copy.mjs';
assert.equal(process.env.KDV_REVIEW_PREVIEW,'1');
assert.deepEqual(languages,['en','pt-br','pt','es']);assert.equal(guides.length,60);assert.equal(source.status,'proposal');
const root=resolve('preview-dist');
const read=path=>readFile(join(root,path),'utf8');
let count=0;
for(const l of languages){
 assert.equal(guides.filter(g=>g.language===l).length,15);
 assert.equal(content[l].locale,{en:'en','pt-br':'pt-BR',pt:'pt-PT',es:'es'}[l]);
 for(const route of allRoutes){
  const path=`${l}/${route?route+'/':''}index.html`,html=await read(path);count++;
  assert.ok(html.includes(`lang="${content[l].locale}"`),path);assert.doesNotMatch(html,/undefined|\[object Object\]/,path);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,path);
  assert.equal((html.match(/hreflang=/g)||[]).length,5,path);
  assert.ok(html.includes('name="robots" content="noindex,nofollow"'),path);
  assert.ok(html.includes(copy[l].previewLabel.replaceAll('&','&amp;')),path);
  for(const targetLanguage of languages)assert.ok(html.includes(`href="/${targetLanguage}/${route?route+'/':''}"`),`${path}: language continuity`);
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,path);
  for(const [,raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   if(!raw.startsWith('/')&&!raw.startsWith('#'))continue;
   const [pathname,fragment]=raw.split('#');let target=pathname?join(root,pathname):join(root,path);assert.ok(target.startsWith(root+'/'));
   if(pathname?.endsWith('/'))target=join(target,'index.html');await stat(target);
   if(fragment)assert.ok((await readFile(target,'utf8')).includes(`id="${fragment}"`),`${path}: ${raw}`);
  }
  if(route.startsWith('docs/')){
   assert.ok(html.includes(copy[l].docsVersion.replaceAll('&','&amp;')));assert.ok(!html.includes('Published from main'));
  }
 }
 for(const [slug,title] of content[l].templates){const md=await read(`templates/${l}/${slug}.md`);assert.ok(md.startsWith('# '+title),`${l}/${slug}`);assert.ok(md.includes('CC BY 4.0'));}
 const csv=await read(`templates/${l}/evidence-worksheet.csv`);assert.ok(csv.includes('"<="'));assert.ok(csv.includes('">="'));
}
assert.equal(await read('index.html'),await read('en/index.html'));
assert.ok((await read('pt-br/index.html')).includes('compartilhado'));
assert.ok((await read('pt/index.html')).includes('partilhado'));
assert.ok((await read('en/playbook/index.html')).includes('Authorised owner decides'));
assert.ok((await read('pt-br/docs/worked-example/index.html')).includes('5 dias'));
assert.ok((await read('robots.txt')).includes('Disallow: /'));
console.log(`Review checks passed: ${count} pages, 60 guides, 20 templates, four language editions, links, fragments and proposal provenance.`);

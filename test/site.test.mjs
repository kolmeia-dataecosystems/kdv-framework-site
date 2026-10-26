import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import vm from 'node:vm';
import {guides,source,inventory,markdownToHtml,docHref} from '../src/documentation.mjs';
import {languages,content} from '../src/content.mjs';
import {allRoutes,escape} from '../src/render.mjs';
const root=resolve('dist');
const file=async p=>readFile(join(root,p),'utf8');
const pages=languages.flatMap(l=>allRoutes.map(r=>`${l}/${r?r+'/':''}index.html`));
test('All locales contain the complete editorial model',()=>{
 for(const l of languages){assert.deepEqual(Object.keys(content[l]).sort(),Object.keys(content.en).sort());assert.equal(content[l].anatomy.length,6);assert.equal(content[l].roles.length,10);assert.equal(content[l].stages.length,4);for(const row of content[l].stages)assert.equal(row.length,8);assert.equal(content[l].mapping.length,9)}
});
test('English default, localized metadata and unique accessible page structure',async()=>{
 assert.equal(await file('index.html'),await file('en/index.html'));
 for(const p of pages){const html=await file(p);const l=p.split('/')[0];assert.ok(html.includes(`lang="${content[l].locale}"`));assert.equal((html.match(/<h1[ >]/g)||[]).length,1,p);assert.equal((html.match(/<link rel="alternate" hreflang=/g)||[]).length,languages.length+1,p);assert.ok(/<main\b[^>]*id="main"/.test(html));const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,ids.length,p);assert.ok(!html.includes('undefined'),p)}
});
test('Every generated internal link, asset and fragment resolves',async()=>{
 for(const p of pages){const html=await file(p);for(const [,quote,raw] of html.matchAll(/(?:href|src)=(["'])([^"']+)\1/g)){
  if(!raw.startsWith('/')&&!raw.startsWith('#'))continue;
  const [pathWithQuery,fragment]=raw.split('#');const pathname=pathWithQuery.split('?')[0];let target=pathname?join(root,pathname):join(root,p);assert.ok(target.startsWith(root));if(pathname?.endsWith('/'))target=join(target,'index.html');await stat(target);
  if(fragment){const text=await readFile(target,'utf8');assert.ok(text.includes(`id="${fragment}"`),`${p}: ${raw}`)}
 }}
});
test('Templates contain working sections, original-content licence and provenance',async()=>{
 for(const l of languages)for(const [slug,title] of content[l].templates){const md=await file(`templates/${l}/${slug}.md`);assert.ok(md.startsWith('# '+title));assert.ok((md.match(/^## /gm)||[]).length>=8);assert.ok(md.includes('CC BY 4.0'));assert.ok(md.includes('not official')||md.includes('não formulários oficiais')||md.includes('no formularios oficiales'))}
});
test('Progressive interaction stays local, with only explicit browser preferences persisted',async()=>{
 const scripts=await Promise.all(['interaction.js','components.js','enhancements.js','dynamic.js','dynamics.js'].map(f=>file('assets/ux/'+f)));
 for(const script of scripts){new vm.Script(script);assert.doesNotMatch(script,/XMLHttpRequest|sendBeacon|document\.cookie/);}
 assert.match(scripts[0],/if \(!\["tema", "perfil"\]\.includes\(k\)\)/);
 assert.doesNotMatch(scripts[0]+scripts[1],/\bfetch\(/);
 assert.match(scripts[2],/url\.origin!==location\.origin/);
 assert.match(scripts[2],/credentials:'same-origin'/);
 for(const p of pages){const html=await file(p);assert.doesNotMatch(html,/<script[^>]+src="https?:/);assert.doesNotMatch(html,/<iframe|<form[^>]+action=/);for(const form of html.matchAll(/<form\b[^>]*>/g))assert.match(form[0],/method="dialog"/);}
});
test('Framework is distinct from product, official assessments and a maturity score',async()=>{
 const html=await file('en/model/index.html');assert.ok(html.includes('A Cell can own several data products'));assert.ok(html.includes('not an extra infrastructure layer'));assert.ok(html.includes('not an official equivalence')||html.includes('original interpretation'));assert.ok(html.includes('without buying a platform')||html.includes('does not require a KDV platform')||html.includes('operating model stays the same'));
 const p=await file('en/playbook/index.html');assert.ok(p.includes('not a maturity score'));
});
test('Markup escaping protects editorial text',()=>{assert.equal(escape('<img src="x" onerror=\'x\'>&'), '&lt;img src=&quot;x&quot; onerror=&#39;x&#39;&gt;&amp;')});

test('Documentation is rendered from the pinned accepted Markdown, in every locale',async()=>{
 assert.equal(source.ref,'main');assert.equal(source.repository,'kolmeia-dataecosystems/kdv-framework');assert.match(source.commit,/^[0-9a-f]{40}$/);assert.equal(guides.length,inventory.documents.length);
 for(const g of guides){const html=await file(`${g.language}/docs/${g.slug}/index.html`);assert.ok(html.includes(escape(g.title)));assert.ok(html.includes(source.commit));assert.ok(html.includes(`/edit/main/${g.path}`));assert.ok(html.includes(markdownToHtml(g.markdown,g.language).toc[0].id));assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.ok(html.includes('docs-sidebar'));}
});
test('Contribution destinations use the knowledge repository, while implementation stays separate',async()=>{
 for(const l of languages){const html=await file(`${l}/community/index.html`);assert.ok(html.includes('https://github.com/kolmeia-dataecosystems/kdv-framework/issues/new?template=question.yml'));assert.ok(html.includes('ismael-lab'));assert.ok(html.includes(`/${l}/docs/`));assert.ok(html.includes('https://github.com/kolmeia-dataecosystems/kdv-framework-site'));}
});
test('Markdown renderer escapes HTML and rejects executable and unrecognised link targets',()=>{
 const rendered=markdownToHtml('## Safe heading\n\n<script>alert(1)</script>\n\n[x](javascript:alert(1))','en').html;
 assert.ok(rendered.includes('&lt;script&gt;'));assert.ok(!rendered.includes('href="javascript:'));assert.equal(docHref('data:text/html,hello','en'),'#');assert.equal(docHref('anatomy.md','pt'),'/pt/docs/anatomy/');assert.equal(docHref('../../templates/en/domain-charter.md','en'),'/templates/en/domain-charter.md');
});


test('release-versioned assets prevent mixing cached website editions',async()=>{
 const release=JSON.parse(await readFile('release.json','utf8'));
 for(const l of ['en','pt-br','pt','es']){
  const html=await file(l+'/index.html');
  for(const asset of ['/styles.css','/assets/ux/data-'+l+'.js','/assets/ux/interaction.js','/assets/ux/components.js','/assets/ux/enhancements.js']){
   assert.ok(html.includes(asset+'?v='+release.version),`missing release version: ${asset}`);
  }
 }
});

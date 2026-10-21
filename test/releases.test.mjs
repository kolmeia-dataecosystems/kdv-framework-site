import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {release,releaseUi,validateRelease} from '../src/releases.mjs';
import {languages} from '../src/content.mjs';
import {allRoutes} from '../src/render.mjs';

const json=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),'utf8'));
const source=await json('../knowledge/source.json');
const inventory=await json('../knowledge/knowledge.json');

test('A changed knowledge snapshot cannot retain the historical baseline release claim',()=>{
 assert.throws(()=>validateRelease(release,{...source,commit:'a'.repeat(40)},inventory,release.version),/Confirm the framework release/);
 const historical={...release,knowledge:{version:'1.0.0',tag:'v1.0.0',commit:'a'.repeat(40),sourceEdition:'0.1'}};
 assert.throws(()=>validateRelease(historical,{repository:source.repository,ref:'main',commit:'a'.repeat(40),edition:'0.1'},{edition:'0.1'},release.version));
});

test('Stable publication rejects development knowledge and inconsistent website versions',()=>{
 const final=structuredClone(release);final.status='stable';final.version=final.target;
 final.knowledge.version='1.1.0-dev.1';final.knowledge.tag='v'+final.knowledge.version;
 assert.throws(()=>validateRelease(final,source,inventory,final.version),/Stable websites/);
 assert.throws(()=>validateRelease(release,source,inventory,'1.0.0'),/package and release versions/);
});

test('All localized pages expose website version, accepted framework version and exact source separately',async()=>{
 for(const l of languages)for(const route of allRoutes){
  const html=await readFile(`dist/${l}/${route?route+'/':''}index.html`,'utf8');
  assert.ok(html.includes(`name="kdv:website-version" content="${release.version}"`));
  assert.ok(html.includes(`name="kdv:framework-version" content="${release.knowledge.version}"`));
  assert.ok(html.includes(`name="kdv:framework-commit" content="${source.commit}"`));
  const footer=html.slice(html.indexOf('<footer>'));
  assert.ok(footer.includes(`href="/${l}/releases/"`));
  assert.ok(footer.includes(`Framework v${release.knowledge.version}`));
  assert.ok(footer.includes(`${releaseUi[l].website} v${release.version}`));
 }
 for(const l of languages){
  const html=await readFile(`dist/${l}/releases/index.html`,'utf8');
  assert.ok(html.includes(releaseUi[l][release.status]));
  assert.ok(html.includes('v1.0.0'));assert.ok(html.includes('0.1'));
  assert.ok(html.includes('id="baseline"'));
  assert.ok(html.includes(`/releases/tag/${release.knowledge.tag}`));
 }
});

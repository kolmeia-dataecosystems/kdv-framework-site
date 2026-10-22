import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {allRoutes} from '../src/render.mjs';
import {data,languages,serverContext} from '../src/ux/model.mjs';
const page=(l,r)=>readFile(`dist/${l}/${r?r+'/':''}index.html`,'utf8');
const brands=/\b(?:Mage|SeaweedFS|Iceberg|OpenMetadata|Ranger|Splink|Trino|WSO2|Superset|vassets|Prometheus|Loki|Grafana|Keycloak|OpenLDAP|OpenBao|PostgreSQL|Airflow|dbt Core|OpenLineage)\b|KDV (?:Consumer|Producer|EcOps|PlatOps|Desk)/i;

test('Published pages and current capability descriptions use functional terminology',async()=>{
 for(const l of languages){
  assert.equal(data[l].ux.implementationEnabled,false);
  for(const item of [...data[l].ferramentas,...data[l].modulos])assert.doesNotMatch(JSON.stringify(item),brands);
  for(const route of allRoutes){const html=await page(l,route);assert.doesNotMatch(html,brands,`${l}/${route}`);assert.doesNotMatch(html,/class="btn fab"|data-ref="contato:kdv"/);}
 }
});

test('Implementation has no menu/inbound links or sitemap entry, and old URLs provide a noindex notice',async()=>{
 const sitemap=await readFile('dist/sitemap.xml','utf8');assert.doesNotMatch(sitemap,/\/(?:en|pt-br|pt|es)\/implementation\//);
 for(const l of languages){
  assert.ok(!data[l].paginas.some(p=>p.id==='implementacao'));
  for(const r of allRoutes.filter(r=>r!=='implementation'))assert.doesNotMatch(await page(l,r),new RegExp(`href="/${l}/implementation/`),`${l}/${r}`);
  const notice=await page(l,'implementation');assert.ok(notice.includes('noindex, nofollow'));assert.ok(!notice.includes('id="tools"'));assert.ok(notice.includes(`href="/${l}/playbook/"`));
 }
});

test('The software example follows the six generic functional areas without a sales CTA',async()=>{
 for(const l of languages){const html=await page(l,'model'),match=html.match(/<aside class="implementation-example">([\s\S]*?)<\/aside>/);assert.ok(match);assert.ok(match[1].includes('KDV Studio/Cloud'));assert.doesNotMatch(match[1],/<a |<button /);for(const module of data[l].modulos)assert.ok(html.includes(module.nome));}
});

test('Historical tool hashes resolve to current functional concepts; supplier diagram stays unpublished',async()=>{
 for(const l of languages){const {window}=serverContext(l,'home');const item=window.KDVUI.get('ferramenta:mage');assert.equal(item.id,'etl-orchestration');assert.equal(item.x.nome,data[l].ferramentas.find(f=>f.id==='etl-orchestration').nome);assert.ok(!(await page(l,'resources')).includes('D5_arquitetura_referencia_ferramentas'));}
 await assert.rejects(stat('dist/assets/ux/D5_arquitetura_referencia_ferramentas.png'),{code:'ENOENT'});
 const source=await readFile('assets/ux/D4_processo_decisao_de_acesso.svg','utf8');assert.doesNotMatch(source,brands);
});

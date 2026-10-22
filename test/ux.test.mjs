import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {data,languages} from '../src/ux/model.mjs';
const html=(lang,route='')=>readFile(`dist/${lang}/${route?route+'/':''}index.html`,'utf8');
const keys={conceito:'conceitos',papel:'papeis',etapa:'etapas',camada:'camadas',base:'baseline',termo:'termos',ferramenta:'ferramentas',modulo:'modulos',modelo:'modelos',persona:'personas',nicho:'nichos',caso:'casos'};

test('Every locale has the complete interactive catalogue and valid concept references',()=>{
 for(const l of languages){const K=data[l];
  for(const key of Object.values(keys))assert.deepEqual(K[key].map(x=>x.id),data.en[key].map(x=>x.id),`${l}: ${key}`);
  assert.equal(K.paginas.length,8);assert.equal(K.personas.length,6);assert.equal(K.nichos.length,6);assert.equal(K.ferramentas.length,14);
  for(const [,kind,id] of JSON.stringify(K).matchAll(/\{\{([a-z]+):([a-z0-9-]+)\|/g))assert.ok((kind==='contato'&&id==='kdv')||K[keys[kind]]?.some(x=>x.id===id),`${l}: ${kind}:${id}`);
 }
});

test('The illustrative RACI retains a single accountable role per stage and the model has twenty operating cells',()=>{
 for(const l of languages){const K=data[l];
  for(const stage of ['preparar','cultivar','governar','compartilhar','ativar'])assert.equal(K.papeis.filter(p=>p.raci[stage]==='A').length,1,`${l}: ${stage}`);
  assert.equal(K.camadas.length,5);for(const row of K.camadas){assert.equal(Object.keys(row.celulas).length,4);for(const [title,detail] of Object.values(row.celulas)){assert.ok(title.length>3);assert.ok(detail.length>20);}}
  assert.equal(K.referenciais.dcam.length,8);assert.ok(JSON.stringify(K.referenciais.dcam).includes(K.ux.knowledge));
 }
});

test('Substantive page content and download fallbacks are available before JavaScript executes',async()=>{
 for(const l of languages){
  for(const [route,id] of [['','recog'],['audience','nichos'],['model','matrix'],['playbook','steps'],['implementation','tools'],['resources','models']]){
   const body=await html(l,route);const offset=body.indexOf(`id="${id}"`);assert.ok(offset>0);const after=body.slice(offset,offset+1400);assert.match(after,/<(?:article|button|details|a|div)\b/);assert.doesNotMatch(after,/id="\w+"><\/div>/);
   assert.ok(body.includes('noindex, nofollow'));assert.ok(body.includes('data-ux-page='));
  }
  const resources=await html(l,'resources');assert.ok(resources.includes(`/templates/${l}/domain-charter.md`));assert.ok(resources.includes('/templates/office/pt-br/05_Registro_de_evidencias.xlsx'));
  assert.ok((await html(l,'model')).includes(Knote(l,'anatomyNote')));
 }
});
function Knote(l,key){return data[l].ux[key].replaceAll('&','&amp;').replaceAll("'",'&#39;');}

test('Native modal dialogs have names, close controls and language-preserving links',async()=>{
 const page=await html('en');
 for(const id of ['drawer','palette','lightbox'])assert.match(page,new RegExp(`<dialog[^>]*id="${id}"[^>]*aria-label(?:ledby)?="`));
 assert.ok(page.includes('id="drawer-close"'));assert.ok(page.includes('class="panel-languages"'));
 const script=await readFile('dist/assets/ux/interaction.js','utf8');
 assert.match(script,/addEventListener\("cancel"/);assert.match(script,/lastFocus.*focus/);assert.match(script,/ArrowRight/);assert.match(script,/aria-activedescendant/);
});

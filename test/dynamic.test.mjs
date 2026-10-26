import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import rules from '../src/ux/dynamics.cjs';
import {data,languages} from '../src/ux/model.mjs';
import {guides} from '../src/documentation.mjs';

test('Starting profile follows the approved rule for all nine combinations',()=>{
 const expected={small:['solo','team','organization'],few:['team','team','organization'],many:['organization','organization','organization']};
 for(const team of Object.keys(expected))for(const [i,maturity] of ['starting','some','established'].entries())assert.equal(rules.profile(team,maturity),expected[team][i]);
 for(const goal of ['owners','share','value']){
  assert.equal(rules.guideIds(goal).length,3);
  for(const l of languages)for(const id of rules.guideIds(goal))assert.ok(guides.some(g=>g.language===l&&g.slug===data[l].ux.slugs[id]),`${l}/${id}`);
 }
});

test('Reading time counts rendered words, rounds up at 200 and ignores tags',()=>{
 assert.equal(rules.readingMinutes(''),1);
 assert.equal(rules.readingMinutes('<h2 id="one">One</h2><p>two &amp; three</p>'),1);
 assert.equal(rules.readingMinutes('<p>'+Array(200).fill('ação').join(' ')+'</p>'),1);
 assert.equal(rules.readingMinutes('<p>'+Array(201).fill('acción').join(' ')+'</p>'),2);
 assert.equal(rules.readingMinutes(Array(400).fill('evidence').join(' ')),2);
});

test('Dynamic helper copy is complete in four locales and rendered in the expected places',async()=>{
 const shape=x=>Array.isArray(x)?x.map(shape):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k,shape(v)])):typeof x;
 for(const l of languages){
  const t=data[l].ux.dynamic;
  assert.deepEqual(shape(t),shape(data.en.ux.dynamic));
  assert.ok(Object.values(t).flat().every(s=>typeof s==='string'&&s.trim().length>0));
  assert.equal(t.teams.length,3);assert.equal(t.maturities.length,3);assert.equal(t.goals.length,3);assert.equal(t.profiles.length,3);assert.equal(t.meanings.length,3);
  const home=await readFile(`dist/${l}/index.html`,'utf8');
  assert.ok(home.includes(t.title));assert.ok(home.includes(t.optional));assert.match(home,/data-start-result aria-live="polite"/);
  for(const stage of ['cultivar','governar','compartilhar','ativar'])assert.ok(home.includes(`data-cycle-stage="${stage}"`));
  for(const guide of guides.filter(g=>g.language===l)){
   const html=await readFile(`dist/${l}/docs/${guide.slug}/index.html`,'utf8');
   assert.match(html,/class="reading-time"/);assert.ok(html.includes(t.readingTime.split('{n}')[1]));
  }
 }
});

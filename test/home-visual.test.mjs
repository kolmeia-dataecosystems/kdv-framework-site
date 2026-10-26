import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {data,languages,escape} from '../src/ux/model.mjs';
import {startingResult} from '../src/ux/dynamic-render.mjs';
import rules from '../src/ux/dynamics.cjs';
const ids=['cultivar','governar','compartilhar','ativar'];
const source=readFileSync('src/ux/dynamic.js','utf8');
const text=html=>html.replace(/<[^>]+>/g,' ').replace(/&(?:amp|lt|gt|quot|#39);/g,x=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"}[x])).replace(/\s+/g,' ').replace(/\s+([.,;:])/g,'$1').trim();
const editorial=s=>s.replace(/\{\{[^|]+\|([^}]+)\}\}/g,'$1');

test('Unified honeycomb connects four ARIA tabs to complete server-rendered panels in every locale',()=>{
 for(const lang of languages){
  const html=readFileSync(`dist/${lang}/index.html`,'utf8'),K=data[lang];
  assert.equal((html.match(/class="stage-honeycomb"/g)||[]).length,1);
  assert.match(html,/class="stage-honeycomb" role="tablist"/);
  assert.ok(html.includes(K.page.home.sec.como.h2));assert.ok(html.includes(K.page.home.sec.como.p));
  for(const [i,id] of ids.entries()){
   assert.match(html,new RegExp(`id="stage-tab-${id}" role="tab" aria-selected="${i===0}" aria-controls="stage-panel-${id}" tabindex="${i===0?0:-1}"`));
   assert.match(html,new RegExp(`id="stage-panel-${id}" role="tabpanel" aria-labelledby="stage-tab-${id}" tabindex="0"`));
   const stage=K.etapas.find(s=>s.id===id);
   for(const str of [stage.cliente,stage.kdv,stage.frase,stage.entrada,...stage.praticas,...stage.evidencia])assert.ok(html.includes(escape(str)),`${lang}: ${str}`);
   for(const person of stage.participantes)assert.ok(html.includes(`data-ref="papel:${person}"`));
   assert.ok(html.includes(`href="/${lang}/playbook/#${id}"`));
  }
  assert.doesNotMatch(html,/data-cycle-pause|class="stages" role="group"/);
 }
});

// Exercise the actual browser module with a small event surface; no copied handler logic.
function browser(reducedMotion=false){
 const hostHandlers={},docHandlers={},timers=new Map(),observers=[];let clock=0,focused=-1;
 const on=target=>(type,fn)=>{target[type]=fn;};
 const makeTabs=()=>ids.map((id,i)=>({dataset:{cycleStage:id},classList:{toggle(){}},attrs:{},setAttribute(k,v){this.attrs[k]=v;},closest(){return this;},focus(){focused=i;hostHandlers.focusin();}}));
 let tabs=makeTabs(),panels=ids.map(()=>({hidden:false}));
 // The section is delegated: tabs and panels are read on each action, as in the browser.
 const host={addEventListener:on(hostHandlers),querySelectorAll:s=>s.includes('tabpanel')?panels:tabs};
 const reducedHandlers=[];const reduced={matches:reducedMotion,addEventListener(type,fn){reducedHandlers.push(fn);},change(){reducedHandlers.forEach(fn=>fn());}};
 const document={readyState:'complete',hidden:false,body:{dataset:{language:'en',page:'documentacao'},append(){}},addEventListener:on(docHandlers),querySelector:s=>s==='#stages'?host:null,querySelectorAll:()=>[],createElement:()=>({style:{},setAttribute(){}})};
 const window={KDV_DATA:data.en,KDVDynamics:rules,KDVUI:{esc:escape},addEventListener(){}};
 class MutationObserver{constructor(fn){this.fn=fn;observers.push(this);}observe(){}}
 vm.runInNewContext(source,{document,window,MutationObserver,matchMedia:()=>reduced,setTimeout:fn=>{const id=++clock;timers.set(id,fn);return id;},clearTimeout:id=>timers.delete(id),requestAnimationFrame(){},addEventListener(){}});
 const key=(key,i)=>{let prevented=false;hostHandlers.keydown({key,target:tabs[i],preventDefault(){prevented=true;}});return prevented;};
 const tick=()=>{const next=timers.entries().next().value;if(next){timers.delete(next[0]);next[1]();}};
 // Simulates the components re-rendering the section with fresh elements.
 const rerender=()=>{tabs=makeTabs();panels=ids.map(()=>({hidden:false}));observers.forEach(o=>o.fn());};
 return {get tabs(){return tabs;},get panels(){return panels;},key,tick,timers,handlers:hostHandlers,hostHandlers,docHandlers,reduced,document,rerender,get focused(){return focused;}};
}

test('Stage panels stay in sync after the section is re-rendered',()=>{
 const b=browser();b.handlers.click({target:b.tabs[2]});b.rerender();
 assert.deepEqual(b.panels.map(p=>p.hidden),[true,true,false,true]);
 b.handlers.click({target:b.tabs[1]});assert.equal(b.tabs[1].attrs['aria-selected'],'true');assert.deepEqual(b.panels.map(p=>p.hidden),[true,false,true,true]);
});

test('Stage keyboard wraps, supports Home/End, moves focus and permanently stops automatic selection',()=>{
 const b=browser();b.tick();assert.equal(b.tabs[1].attrs['aria-selected'],'true');
 assert.equal(b.key('ArrowLeft',0),true);assert.equal(b.focused,3);
 assert.deepEqual(b.tabs.map(t=>t.tabIndex),[-1,-1,-1,0]);assert.deepEqual(b.panels.map(p=>p.hidden),[true,true,true,false]);
 b.key('ArrowRight',3);assert.equal(b.focused,0);
 b.key('ArrowDown',0);assert.equal(b.focused,1);
 b.key('ArrowUp',1);assert.equal(b.focused,0);
 b.key('End',0);assert.equal(b.focused,3);b.key('Home',3);assert.equal(b.focused,0);
 assert.equal(b.key('Tab',0),false);assert.equal(b.timers.size,0);b.docHandlers.visibilitychange();assert.equal(b.timers.size,0);
 b.handlers.click({target:b.tabs[2]});assert.equal(b.tabs[2].attrs['aria-selected'],'true');assert.equal(b.panels[2].hidden,false);
});

test('Reduced motion and first pointer/focus interaction stop the cycle, including later preference changes',()=>{
 const reduced=browser(true);assert.equal(reduced.timers.size,0);assert.equal(reduced.panels[0].hidden,false);
 for(const event of ['pointerdown','pointerenter','focusin']){const b=browser();assert.equal(b.timers.size,1);b.hostHandlers[event]();assert.equal(b.timers.size,0);b.reduced.matches=true;b.reduced.change();b.reduced.matches=false;b.reduced.change();assert.equal(b.timers.size,0);}
 const b=browser();b.reduced.matches=true;b.reduced.change();assert.equal(b.timers.size,0);
});

test('Five badges, chain and connected definition pairs preserve every existing text in generated HTML',()=>{
 for(const lang of languages){
  const K=data[lang],html=readFileSync(`dist/${lang}/index.html`,'utf8'),visible=text(html);
  const contains=s=>assert.ok(visible.includes(text(escape(editorial(s)))),`${lang}: ${s}`);
  for(const b of K.baseline)for(const field of ['nome','porque','verificar','evidencia'])contains(b[field]);
  for(const row of K.page.home.propostaCells)row.forEach(contains);
  assert.match(html,/<ol class="value-chain">/);
  for(const ref of ['termo:steward','conceito:dominio','termo:contrato','base:acesso'])assert.ok(html.includes(`data-ref="${ref}"`));
  for(const concept of K.conceitos)for(const field of ['cliente','kdv','frase','exemplo','analogia'])contains(concept[field]);
  K.ui.home.linhaCiclo.forEach(contains);
  assert.equal((html.match(/data-term-pair>/g)||[]).length,7);assert.match(html,/<dl class="term-pairs">/);assert.match(html,/data-term-filter/);
  assert.equal((html.match(/class="baseline-item"/g)||[]).length,5);
  for(const local of K.ux.visual.localChoices)contains(local);
 }
});

test('Profile cards retain the approved readings, note and scale for representative answers in all locales',()=>{
 for(const lang of languages)for(const [team,maturity,goal,expected,count] of [['small','starting','owners','solo',1],['few','some','share','team',3],['small','established','value','organization',7],['many','starting','owners','organization',7]]){
  const profile=rules.profile(team,maturity);assert.equal(profile,expected);
  const html=startingResult(data[lang],lang,profile,goal);
  assert.equal((html.match(/data-icon="hexagono"/g)||[]).length,count);
  assert.ok(html.includes(escape(data[lang].ux.dynamic.profiles[['solo','team','organization'].indexOf(expected)])));
  assert.ok(html.includes(escape(data[lang].ux.dynamic.optional)));
  for(const id of rules.guideIds(goal))assert.ok(html.includes(`/${lang}/docs/${data[lang].ux.slugs[id]}/`));
 }
 for(const lang of languages){const html=readFileSync(`dist/${lang}/index.html`,'utf8');assert.equal((html.match(/class="start-chip"/g)||[]).length,9);assert.equal((html.match(/type="radio"/g)||[]).length,9);}
});

test('Home foreground/background token pairs retain text contrast in both themes and inverted states',()=>{
 const reference=readFileSync('src/ux/reference-components.css','utf8'),brand=readFileSync('src/ux/brand.css','utf8');
 const vars=s=>Object.fromEntries([...s.matchAll(/(--[\w-]+):([^;}]+)/g)].map(m=>[m[1],m[2].trim()]));
 const light={...vars(reference.match(/:root\{([^}]+)\}/)[1]),...vars(brand.match(/:root\{([^}]+)\}/)[1])};
 const dark={...light,...vars(brand.match(/:root\[data-theme="dark"\]\{([^}]+)\}/)[1])};
 const lum=hex=>{const rgb=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
 for(const [theme,tokens] of Object.entries({light,dark}))for(const [fg,bg] of [['--ink','--card'],['--ink','--soft'],['--ink-2','--paper-2'],['--muted','--card'],['--muted','--paper-2'],['--on-invert','--invert']]){
  const a=lum(tokens[fg]),b=lum(tokens[bg]),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
  assert.ok(ratio>=4.5,`${theme} ${fg}/${bg}: ${ratio.toFixed(2)}`);
 }
 const homeStyles=brand.split('/* Website 1.5:')[1];assert.doesNotMatch(homeStyles,/#[\da-f]{3,8}\b|rgba?\(/i);
});

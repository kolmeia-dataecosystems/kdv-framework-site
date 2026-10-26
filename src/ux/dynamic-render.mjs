import icons from './icons.cjs';
import rules from './dynamics.cjs';
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function startingPoint(K,l){
 const t=K.ux.dynamic;
 const fields=[['team',t.team,t.teams,['small','few','many']],['maturity',t.maturity,t.maturities,['starting','some','established']],['goal',t.goal,t.goals,['owners','share','value']]];
 return `<section class="sec" id="start-here"><div class="wrap"><div class="sec-head"><h2>${e(t.title)}</h2><p>${e(t.intro)}</p></div><noscript><p>${e(t.noScript)}</p></noscript><form method="dialog" data-start-form><div class="start-questions">${fields.map(([name,title,labels,values])=>`<fieldset><legend>${e(title)}</legend>${values.map((v,i)=>`<label class="start-chip"><input type="radio" name="${name}" value="${v}" ${i===0?'checked':''}> <span>${e(labels[i])}</span></label>`).join('')}</fieldset>`).join('')}</div><p class="small">${e(t.rule)}</p></form><div data-start-result aria-live="polite" aria-atomic="true">${startingResult(K,l,'solo','owners')}</div></div></section>`;
}
export function startingResult(K,l,profile,goal){
 const t=K.ux.dynamic,i=['solo','team','organization'].indexOf(profile);
 return `${rules.scale(profile,icons.icon)}<h3>${e(t.suggested)}: ${e(t.profiles[i])}</h3><p>${e(t.meanings[i])}</p><ul>${rules.guideIds(goal).map(id=>`<li><a class="text-link" href="/${l}/docs/${K.ux.slugs[id]}/">${e(K.guias.find(g=>g.id===id).titulo)}</a></li>`).join('')}</ul><p>${e(t.optional)} <a class="text-link" href="https://kdvecosystems.com">${e(t.product)} ↗</a></p>`;
}

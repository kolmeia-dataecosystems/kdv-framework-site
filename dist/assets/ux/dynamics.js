/* Shared, deterministic rules for the static renderer and browser. */
(function(root){
 const profile=(team,maturity)=>team==='many'||maturity==='established'?'organization':team==='small'&&maturity==='starting'?'solo':'team';
 const guideIds=goal=>({owners:['primeiros-passos','papeis','anatomia'],share:['contratos','acesso','ciclo'],value:['evidencias','exemplo','principios']})[goal]||[];
 const readingMinutes=html=>Math.max(1,Math.ceil((html.replace(/<[^>]*>/g,' ').replace(/&[^;]+;/g,' ').match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)||[]).length/200));
 const stageIndex=(key,current,count)=>key==='Home'?0:key==='End'?count-1:['ArrowRight','ArrowDown'].includes(key)?(current+1)%count:['ArrowLeft','ArrowUp'].includes(key)?(current+count-1)%count:null;
 const scale=(profile,icon)=>`<div class="profile-scale profile-scale-${profile}" aria-hidden="true">${Array.from({length:({solo:1,team:3,organization:7})[profile]},()=>icon('hexagono',32)).join('')}</div>`;
 const api={profile,guideIds,readingMinutes,stageIndex,scale};
 if(typeof module==='object')module.exports=api;else root.KDVDynamics=api;
})(typeof window==='object'?window:globalThis);

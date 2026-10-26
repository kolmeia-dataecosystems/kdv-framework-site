/* Shared, deterministic rules for the static renderer and browser. */
(function(root){
 const profile=(team,maturity)=>team==='many'||maturity==='established'?'organization':team==='small'&&maturity==='starting'?'solo':'team';
 const guideIds=goal=>({owners:['primeiros-passos','papeis','anatomia'],share:['contratos','acesso','ciclo'],value:['evidencias','exemplo','principios']})[goal]||[];
 const readingMinutes=html=>Math.max(1,Math.ceil((html.replace(/<[^>]*>/g,' ').replace(/&[^;]+;/g,' ').match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)||[]).length/200));
 const api={profile,guideIds,readingMinutes};
 if(typeof module==='object')module.exports=api;else root.KDVDynamics=api;
})(typeof window==='object'?window:globalThis);

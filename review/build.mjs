import {mkdir,readFile,writeFile,copyFile,rm,readdir} from 'node:fs/promises';
import {content,languages} from '../src/content.mjs';
import {render,allRoutes,escape} from '../src/render.mjs';
import {reviewMode} from '../src/context.mjs';
import {copy} from './copy.mjs';
if(!reviewMode)throw new Error('Review builds require KDV_REVIEW_PREVIEW=1. Production uses npm run build.');
const out='preview-dist',origin=(process.env.SITE_ORIGIN||'http://127.0.0.1:4174').replace(/\/+$/,'');
const siteUrl=new URL(origin);
if(!['https:','http:'].includes(siteUrl.protocol)||siteUrl.origin!==origin)throw new Error('SITE_ORIGIN must be an HTTP(S) origin without credentials or a path.');
await mkdir(out+'/assets',{recursive:true});
for(const name of await readdir('dist/assets'))await copyFile('dist/assets/'+name,out+'/assets/'+name);
for(const l of languages)await copyFile(`assets/social/kdv-framework-social-${l==='pt-br'?'pt':l}-v1.png`,`${out}/assets/kdv-framework-social-${l}-v1.png`);
await writeFile(out+'/styles.css',await readFile('src/styles.css','utf8')+'\n'+await readFile('review/styles.css','utf8'));
await copyFile('src/runtime.js',out+'/runtime.js');
const urls=[];
for(const l of languages){
 await rm(`${out}/${l}/docs`,{recursive:true,force:true});
 for(const r of allRoutes){const dir=`${out}/${l}${r?'/'+r:''}`;await mkdir(dir,{recursive:true});await writeFile(`${dir}/index.html`,render(l,r,origin));urls.push(origin+`/${l}/${r?r+'/':''}`)}
 await rm(`${out}/templates/${l}`,{recursive:true,force:true});
}
const knowledge=JSON.parse(await readFile('review/knowledge/knowledge.json','utf8'));
await mkdir(out+'/knowledge-assets',{recursive:true});
for(const p of knowledge.assets)await copyFile('review/knowledge/'+p,out+'/knowledge-assets/'+p.split('/').at(-1));
for(const p of knowledge.templates){await mkdir(out+'/'+p.split('/').slice(0,-1).join('/'),{recursive:true});await copyFile('review/knowledge/'+p,out+'/'+p);}
for(const l of languages){
 const rows=[copy[l].evidenceCsv,['ACCESS-01','','','','<=','2','','','','',''],['QUALITY-01','','','','>=','0.98','','','','','']];
 const csv='\uFEFF'+rows.map(row=>row.map(cell=>'"'+String(cell).replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';
 await writeFile(`${out}/templates/${l}/evidence-worksheet.csv`,csv);
}
await writeFile(out+'/index.html',render('en','',origin));
await writeFile(out+'/404.html',`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Page not found | KDV Framework</title><link rel="stylesheet" href="/styles.css"><main class="section wrap"><h1>${escape(content.en.notFound)}</h1><a href="/en/">${escape(content.en.backHome)}</a></main></html>`);
await writeFile(out+'/robots.txt','User-agent: *\nDisallow: /\n');
await writeFile(out+'/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${u}</loc></url>`).join('')}</urlset>`);
console.log(`Built ${urls.length} localized pages and ${knowledge.templates.length} templates in preview-dist. PROPOSAL ONLY; accepted snapshot and production output unchanged.`);

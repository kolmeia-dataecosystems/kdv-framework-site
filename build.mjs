import {mkdir,readFile,writeFile,copyFile,rm} from 'node:fs/promises';
import {copy} from './review/copy.mjs';
import {implementationEnabled} from './src/ux/availability.mjs';
import {buildUxAssets} from './src/ux/build.mjs';
import {content,languages} from './src/content.mjs';
import {render,allRoutes,escape} from './src/render.mjs';
export const origin=(process.env.SITE_ORIGIN||'https://kdvframework.org').replace(/\/+$/,'');
const siteUrl=new URL(origin);
if(!['https:','http:'].includes(siteUrl.protocol)||siteUrl.origin!==origin)throw new Error('SITE_ORIGIN must be an HTTP(S) origin without a path, query, credentials or fragment.');
const hosting=JSON.parse(await readFile('.openai/hosting.json','utf8'));
hosting.static={directory:'dist'};
await writeFile('.openai/hosting.json',JSON.stringify(hosting,null,2)+'\n');
await mkdir('dist/assets',{recursive:true});
for(const language of languages)await copyFile(`assets/social/kdv-framework-social-${language==='pt-br'?'pt':language}-v1.png`,`dist/assets/kdv-framework-social-${language}-v1.png`);
await writeFile('dist/styles.css',await readFile('src/styles.css','utf8')+'\n'+await readFile('review/styles.css','utf8'));
await copyFile('src/runtime.js','dist/runtime.js');
await buildUxAssets();
let urls=[];
for(const l of languages){
 await rm(`dist/${l}/docs`,{recursive:true,force:true});
 for(const r of allRoutes){const dir=`dist/${l}${r?'/'+r:''}`;await mkdir(dir,{recursive:true});await writeFile(`${dir}/index.html`,render(l,r,origin));if(implementationEnabled||r!=='implementation')urls.push(origin+`/${l}/${r?r+'/':''}`)}
 await rm(`dist/templates/${l}`,{recursive:true,force:true});
}
const knowledge=JSON.parse(await readFile('knowledge/knowledge.json','utf8'));
await mkdir('dist/knowledge-assets',{recursive:true});
for(const p of knowledge.assets)await copyFile('knowledge/'+p,'dist/knowledge-assets/'+p.split('/').at(-1));
for(const p of knowledge.templates){await mkdir('dist/'+p.split('/').slice(0,-1).join('/'),{recursive:true});await copyFile('knowledge/'+p,'dist/'+p);}
for(const l of languages){
 const rows=[copy[l].evidenceCsv,['ACCESS-01','','','','<=','2','','','','',''],['QUALITY-01','','','','>=','0.98','','','','','']];
 const csv='\uFEFF'+rows.map(row=>row.map(cell=>'"'+String(cell).replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';
 await writeFile(`dist/templates/${l}/evidence-worksheet.csv`,csv);
}
await writeFile('dist/index.html',render('en','',origin));
await writeFile('dist/404.html',`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found | KDV Framework</title><link rel="stylesheet" href="/styles.css"><main class="section wrap not-found"><p class="eyebrow">404 / KDV FRAMEWORK</p><h1>${escape(content.en.notFound)}</h1><a class="button solid" href="/en/">${escape(content.en.backHome)}</a></main></html>`);
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${u}</loc></url>`).join('')}</urlset>`);
console.log(`Built ${languages.length*allRoutes.length} localized pages (${urls.length} active routes), English root, knowledge documentation and ${knowledge.templates.length} editable templates.`);

import {mkdir,readFile,writeFile,copyFile,rm} from 'node:fs/promises';
import {content,languages} from './src/content.mjs';
import {render,allRoutes,escape} from './src/render.mjs';
export const origin=process.env.SITE_ORIGIN||'https://kdv-framework.lab-of-codes-6406.chatgpt.site';
const hosting=JSON.parse(await readFile('.openai/hosting.json','utf8'));
hosting.static={directory:'dist'};
await writeFile('.openai/hosting.json',JSON.stringify(hosting,null,2)+'\n');
await mkdir('dist/assets',{recursive:true});
for(const name of ['styles.css','runtime.js'])await copyFile(`src/${name}`,`dist/${name}`);
let urls=[];
for(const l of languages){
 await rm(`dist/${l}/docs`,{recursive:true,force:true});
 for(const r of allRoutes){const dir=`dist/${l}${r?'/'+r:''}`;await mkdir(dir,{recursive:true});await writeFile(`${dir}/index.html`,render(l,r,origin));urls.push(origin+`/${l}/${r?r+'/':''}`)}
 await rm(`dist/templates/${l}`,{recursive:true,force:true});
}
const knowledge=JSON.parse(await readFile('knowledge/knowledge.json','utf8'));
await mkdir('dist/knowledge-assets',{recursive:true});
for(const p of knowledge.assets)await copyFile('knowledge/'+p,'dist/knowledge-assets/'+p.split('/').at(-1));
for(const p of knowledge.templates){await mkdir('dist/'+p.split('/').slice(0,-1).join('/'),{recursive:true});await copyFile('knowledge/'+p,'dist/'+p);}
await writeFile('dist/index.html',render('en','',origin));
await writeFile('dist/404.html',`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found | KDV Framework</title><link rel="stylesheet" href="/styles.css"><main class="section wrap not-found"><p class="eyebrow">404 / KDV FRAMEWORK</p><h1>${escape(content.en.notFound)}</h1><a class="button solid" href="/en/">${escape(content.en.backHome)}</a></main></html>`);
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${u}</loc></url>`).join('')}</urlset>`);
await writeFile('dist/assets/social.svg',`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f5f5f1"/><g fill="none" stroke="#999">${[[900,215],[1000,385],[800,385]].map(([x,y])=>`<path d="m${x} ${y-100} 87 50v100l-87 50-87-50V${y-50}Z"/>`).join('')}</g><g font-family="Arial,sans-serif" fill="#181818"><text x="65" y="95" font-size="30">KDV / framework</text><text x="65" y="285" font-size="76">Good governance.</text><text x="65" y="375" font-size="76" fill="#888">A living practice.</text><text x="65" y="555" font-size="19">OPEN OPERATIONAL FRAMEWORK · POWERED BY KDV ECOSYSTEMS</text></g></svg>`);
console.log(`Built ${urls.length} localized pages, English root, knowledge documentation and 15 editable templates.`);

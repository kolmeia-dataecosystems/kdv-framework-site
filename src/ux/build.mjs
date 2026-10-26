import {brandLogo} from '../brand.mjs';
import {release} from '../releases.mjs';
import {readFile,writeFile,copyFile,mkdir,readdir,rm} from 'node:fs/promises';
import {data,languages} from './model.mjs';
import {implementationEnabled} from './availability.mjs';
// Scope the reference's interaction layout. Existing brand typography, header,
// honeycomb, documentation, sharing artwork and footer remain the foundation.
function scopeCss(css){
 let output='',start=0;
 while(start<css.length){const open=css.indexOf('{',start);if(open<0)break;let depth=1,i=open+1;for(;i<css.length&&depth;i++){if(css[i]==='{')depth++;else if(css[i]==='}')depth--;}
  const selector=css.slice(start,open).replace(/\/\*[\s\S]*?\*\//g,'').trim(),body=css.slice(open+1,i-1);start=i;
  if(selector.startsWith('@media')||selector.startsWith('@supports')){const inner=scopeCss(body);if(inner)output+=selector+'{'+inner+'}\n';continue;}
  if(!selector||selector.includes(':root')||selector.includes('.site-header')||selector.includes('.site-footer')||selector.startsWith('body')||['*','html','img','a','button','h1,h2,h3,h4','h1','h2','h3','h4','p','.wrap'].includes(selector))continue;
  output+=selector.split(',').map(s=>'.ux-experience '+s.trim()).join(',')+'{'+body+'}\n';
 }
 return output;
}
export async function buildUxAssets(){
 await mkdir('dist/assets/ux',{recursive:true});
 for(const l of languages)await writeFile(`dist/assets/ux/data-${l}.js`,'window.KDV_DATA='+JSON.stringify(data[l]).replace(/</g,'\\u003c')+';window.KDV_BRAND='+JSON.stringify(brandLogo)+';\n');
 for(const file of ['interaction.js','components.js','enhancements.js','dynamic.js'])await copyFile('src/ux/'+file,'dist/assets/ux/'+file);
 await copyFile('src/ux/dynamics.cjs','dist/assets/ux/dynamics.js');
 for(const file of await readdir('assets/ux')){
  if(!implementationEnabled&&file.startsWith('D5_')){await rm('dist/assets/ux/'+file,{force:true});continue;}
  await copyFile('assets/ux/'+file,'dist/assets/ux/'+file);
 }
 await mkdir('dist/templates/office/pt-br',{recursive:true});
 for(const file of await readdir('assets/office/pt-br'))await copyFile('assets/office/pt-br/'+file,'dist/templates/office/pt-br/'+file);
 const css=await readFile('src/styles.css','utf8')+'\n'+await readFile('review/styles.css','utf8')+'\n'+scopeCss(await readFile('src/ux/reference-components.css','utf8'))+'\n'+await readFile('src/ux/brand.css','utf8');
 await writeFile('dist/styles.css',css.replace(/(Delight-[A-Za-z]+\.woff2)/g,'$1?v='+release.version));
}

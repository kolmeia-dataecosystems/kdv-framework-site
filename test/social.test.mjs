import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {languages} from '../src/content.mjs';
import {allRoutes} from '../src/render.mjs';
const origin=(process.env.SITE_ORIGIN||'https://kdvframework.org').replace(/\/+$/,'');
test('home and documentation pages expose complete localized raster sharing cards',async()=>{
 const pages=['index.html',...languages.flatMap(l=>allRoutes.map(r=>`${l}/${r?r+'/':''}index.html`))];
 for(const file of pages){
  const html=await readFile(new URL('../dist/'+file,import.meta.url),'utf8'),head=html.slice(0,html.indexOf('</head>'));
  const pairs=[...head.matchAll(/<meta (?:property|name)="([^"]+)" content="([^"]*)">/g)].map(m=>[m[1],m[2]]),meta=new Map(pairs);
  for(const key of ['og:title','og:description','og:url','og:image','og:image:alt','og:image:type','og:image:width','og:image:height','og:site_name','twitter:card','twitter:image'])assert.equal(pairs.filter(([k])=>k===key).length,1,`${file}: ${key}`);
  assert.equal(meta.get('twitter:card'),'summary_large_image');assert.equal(meta.get('twitter:image'),meta.get('og:image'));
  assert.equal(meta.get('twitter:title'),meta.get('og:title'));assert.equal(meta.get('twitter:description'),meta.get('og:description'));
  assert.equal(meta.get('og:image:type'),'image/png');assert.equal(meta.get('og:image:width'),'1200');assert.equal(meta.get('og:image:height'),'630');
  const language=file==='index.html'?'en':file.split('/')[0],image=new URL(meta.get('og:image'));
  assert.equal(image.origin,origin);assert.ok(image.pathname.endsWith(`-${language}-v1.png`));
  assert.equal(meta.get('og:url'),head.match(/rel="canonical" href="([^"]+)"/)[1]);
  const png=await readFile(new URL('../dist'+image.pathname,import.meta.url));
  assert.deepEqual([...png.subarray(0,8)],[137,80,78,71,13,10,26,10]);
  assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
  assert.ok(png.length<1_000_000);assert.ok(meta.get('og:image:alt').length>30);
 }
});

import {reviewMode,buildLanguages} from './context.mjs';
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const allLocales={en:'en_GB','pt-br':'pt_BR',pt:'pt_PT',es:'es_ES'};
const locales=Object.fromEntries(buildLanguages.map(l=>[l,allLocales[l]]));
const descriptions={
 en:'KDV Framework. Good governance. A living practice. Open operational framework powered by KDV Ecosystems, with connected hive cells.',
 pt:'KDV Framework. Boa governança. Uma prática viva. Framework operacional aberto impulsionado pela KDV Ecosystems, com células de uma colmeia conectadas.',
 es:'KDV Framework. Buena gobernanza. Una práctica viva. Framework operativo abierto impulsado por KDV Ecosystems, con celdas de una colmena conectadas.'
};
descriptions['pt-br']=descriptions.pt;
export function socialMeta(language,origin,{title,description}){
 const image=`${origin}/assets/kdv-framework-social-${language}-v1.png`,alt=escape(descriptions[language]);
 return `<meta property="og:site_name" content="KDV Framework"><meta property="og:locale" content="${locales[language]}">${Object.keys(locales).filter(l=>l!==language).map(l=>`<meta property="og:locale:alternate" content="${locales[l]}">`).join('')}<meta property="og:image" content="${image}">${origin.startsWith('https:')?`<meta property="og:image:secure_url" content="${image}">`:''}<meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${alt}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${image}"><meta name="twitter:image:alt" content="${alt}">`;
}

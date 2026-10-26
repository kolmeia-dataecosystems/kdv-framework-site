import {readFileSync} from 'node:fs';

// Inline the official asset so its paths inherit the surrounding theme colour.
export const brandLogo=readFileSync(new URL('../assets/brand/kdv-framework.svg',import.meta.url),'utf8')
 .replace('<svg ', '<svg class="brand-logo" role="img" aria-label="KDV / framework" ')
 .replace('width="1830" height="200"','width="210.45" height="23"');

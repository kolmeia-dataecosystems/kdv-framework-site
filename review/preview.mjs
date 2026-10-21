process.env.KDV_REVIEW_PREVIEW='1';
await import('./build.mjs');
if(process.argv.includes('--check'))await import('./check.mjs');

export const reviewMode=process.env.KDV_REVIEW_PREVIEW==='1';
export const outputDirectory=reviewMode?'preview-dist':'dist';
export const knowledgeDirectory=reviewMode?'review/knowledge':'knowledge';
export const localeLabels={en:'EN','pt-br':'PT-BR',pt:'PT-PT',es:'ES'};
export const institutionalLanguage=l=>l==='pt-br'?'pt':l;

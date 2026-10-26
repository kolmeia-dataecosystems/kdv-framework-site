import icons from './ux/icons.cjs';
const {icon}=icons;
import {release,releaseUi,releaseStatus,frameworkReleaseUrl,websiteBaselineUrl,sourceCommitUrl} from './releases.mjs';
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text={
  "en": {
    "title": "Versions and release notes",
    "intro": "Website and Framework versions are independent. Accepted knowledge remains at 1.2.0.",
    "changes": "Website 1.5.0 · Framework 1.2.0",
    "candidate": "A review candidate, separate from the accepted knowledge release.",
    "items": [
      "Unified lifecycle honeycomb with accessible stage selection.",
      "Five common badges and a connected sequence for everyday governance.",
      "Connected terminology pairs and profile chips with scale illustrations.",
      "Complete home content preserved in four languages, including without JavaScript."
],
    "site": "Website",
    "source": "Exact accepted knowledge revision",
    "summary": "Presentation revised across four languages."
  },
  "pt-br": {
    "title": "Versões e notas de release",
    "intro": "Site e Framework têm versões independentes. O conhecimento aprovado permanece em 1.2.0.",
    "changes": "Site 1.5.0 · Framework 1.2.0",
    "candidate": "Versão candidata para avaliação, separada da release aprovada do conhecimento.",
    "items": [
      "Colmeia unificada do ciclo com seleção acessível de etapas.",
      "Cinco emblemas comuns e uma sequência ligada para a governança no trabalho.",
      "Pares de termos ligados e chips de perfil com desenhos de escala.",
      "Conteúdo integral da home preservado em quatro idiomas, inclusive sem JavaScript."
],
    "site": "Site",
    "source": "Revisão exata do conhecimento aprovado",
    "summary": "Apresentação revisada em quatro idiomas."
  },
  "pt": {
    "title": "Versões e notas de release",
    "intro": "Site e Framework têm versões independentes. O conhecimento aceite permanece em 1.2.0.",
    "changes": "Site 1.5.0 · Framework 1.2.0",
    "candidate": "Versão candidata para avaliação, separada da release aceite do conhecimento.",
    "items": [
      "Colmeia unificada do ciclo com seleção acessível de etapas.",
      "Cinco emblemas comuns e uma sequência ligada para a governação no trabalho.",
      "Pares de termos ligados e chips de perfil com desenhos de escala.",
      "Conteúdo integral da página inicial preservado em quatro idiomas, incluindo sem JavaScript."
],
    "site": "Site",
    "source": "Revisão exata do conhecimento aceite",
    "summary": "Apresentação revista em quatro idiomas."
  },
  "es": {
    "title": "Versiones y notas de release",
    "intro": "Sitio y Framework tienen versiones independientes. El conocimiento aceptado permanece en 1.2.0.",
    "changes": "Sitio 1.5.0 · Framework 1.2.0",
    "candidate": "Versión candidata para revisión, independiente de la release aceptada del conocimiento.",
    "items": [
      "Colmena unificada del ciclo con selección accesible de etapas.",
      "Cinco emblemas comunes y una secuencia conectada para la gobernanza diaria.",
      "Pares de términos conectados y chips de perfil con dibujos de escala.",
      "Contenido completo del inicio conservado en cuatro idiomas, incluso sin JavaScript."
],
    "site": "Sitio",
    "source": "Revisión exacta del conocimiento aceptado",
    "summary": "Presentación revisada en cuatro idiomas."
  }
};
export const publicationText=text;
export function publishedRelease(l){
 const t=text[l],ui=releaseUi[l];
 return `<section class="page-hero wrap"><p class="eyebrow">${e(ui.notes)}</p><h1>${e(t.title)}</h1><p class="lead">${e(t.intro)}</p></section><section class="section wrap"><div class="review-release-pair"><article><p class="eyebrow">${e(t.site)}</p><h2>${icon("documento",24)} v${e(release.version)}</h2><p>${e(releaseStatus(l))}</p>${release.status!=='stable'?`<p>${e(t.candidate)}</p>`:`<a class="text-link" href="https://github.com/kolmeia-dataecosystems/kdv-framework-site/releases/tag/v${e(release.version)}">${e(ui.notes)} ↗</a>`}</article><article><p class="eyebrow">${e(ui.included)}</p><h2>${icon("artefato",24)} Framework v${e(release.knowledge.version)}</h2><a class="text-link" href="${frameworkReleaseUrl}">${e(ui.notes)} ↗</a><p class="fine-print">${e(t.source)}: <a href="${sourceCommitUrl}"><code>${e(release.knowledge.commit.slice(0,7))}</code></a></p></article></div><div class="sec-head"><p class="eyebrow">${icon("evidencia",20)}${e(ui.notes)}</p><h2>${e(t.changes)}</h2><p>${e(t.summary)}</p></div><ul class="release-change-list">${t.items.map(item=>`<li>${e(item)}</li>`).join('')}</ul><section id="baseline"><div class="sec-head"><p class="eyebrow">${icon("documento",20)}${e(ui.legacy)}</p><h2>${e(ui.baseline)}</h2></div><ul>${ui.baselineBody.split(/(?<=\.)\s+/).map(p=>`<li>${e(p)}</li>`).join("")}</ul><div class="actions"><a class="text-link" href="${websiteBaselineUrl}">${e(t.site)} v1.0.0 ↗</a><a class="text-link" href="https://github.com/kolmeia-dataecosystems/kdv-framework/releases/tag/v1.0.0">Framework v1.0.0 ↗</a></div></section></section>`;
}

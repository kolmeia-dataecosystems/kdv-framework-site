import icons from './ux/icons.cjs';
const {icon}=icons;
import {release,releaseUi,releaseStatus,frameworkReleaseUrl,websiteBaselineUrl,sourceCommitUrl} from './releases.mjs';
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text={
  "en": {
    "title": "Versions and release notes",
    "intro": "Website and Framework versions are independent. Accepted knowledge remains at 1.2.0.",
    "changes": "Website 1.4.0 · Framework 1.2.0",
    "candidate": "A review candidate, separate from the accepted knowledge release.",
    "items": [
      "One stroke SVG system for concepts, links and theme controls.",
      "Shorter institutional introductions and cards in four languages.",
      "Shared section headers, card states and navigation patterns.",
      "Approved home and accepted guides, templates and knowledge revision preserved."
    ],
    "site": "Website",
    "source": "Exact accepted knowledge revision",
    "summary": "Presentation revised across four languages."
  },
  "pt-br": {
    "title": "Versões e notas de release",
    "intro": "Site e Framework têm versões independentes. O conhecimento aprovado permanece em 1.2.0.",
    "changes": "Site 1.4.0 · Framework 1.2.0",
    "candidate": "Versão candidata para avaliação, separada da release aprovada do conhecimento.",
    "items": [
      "Um sistema SVG de traço para conceitos, links e tema.",
      "Intros e cartões institucionais mais curtos em quatro idiomas.",
      "Cabeçalhos, estados dos cartões e navegação consistentes.",
      "Home aprovada, guias, templates e revisão do conhecimento preservados."
    ],
    "site": "Site",
    "source": "Revisão exata do conhecimento aprovado",
    "summary": "Apresentação revisada em quatro idiomas."
  },
  "pt": {
    "title": "Versões e notas de release",
    "intro": "Site e Framework têm versões independentes. O conhecimento aceite permanece em 1.2.0.",
    "changes": "Site 1.4.0 · Framework 1.2.0",
    "candidate": "Versão candidata para avaliação, separada da release aceite do conhecimento.",
    "items": [
      "Um sistema SVG de traço para conceitos, ligações e tema.",
      "Intros e cartões institucionais mais curtos em quatro idiomas.",
      "Cabeçalhos, estados dos cartões e navegação consistentes.",
      "Home aprovada, guias, modelos e revisão do conhecimento preservados."
    ],
    "site": "Site",
    "source": "Revisão exata do conhecimento aceite",
    "summary": "Apresentação revista em quatro idiomas."
  },
  "es": {
    "title": "Versiones y notas de release",
    "intro": "Sitio y Framework tienen versiones independientes. El conocimiento aceptado permanece en 1.2.0.",
    "changes": "Sitio 1.4.0 · Framework 1.2.0",
    "candidate": "Versión candidata para revisión, independiente de la release aceptada del conocimiento.",
    "items": [
      "Un sistema SVG de trazo para conceptos, enlaces y tema.",
      "Introducciones y tarjetas institucionales más breves en cuatro idiomas.",
      "Encabezados, estados de tarjetas y navegación consistentes.",
      "Inicio aprobado, guías, plantillas y revisión del conocimiento preservados."
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

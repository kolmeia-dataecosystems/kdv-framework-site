import {release,releaseUi,releaseStatus,frameworkReleaseUrl,websiteBaselineUrl,sourceCommitUrl} from './releases.mjs';
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text={
  "en": {
    "title": "Versions and release notes",
    "intro": "The website and the open Framework have independent versions. This edition identifies the exact accepted knowledge source.",
    "changes": "Changes in 1.2.1 / 1.2.0",
    "candidate": "A review candidate, separate from the accepted knowledge release.",
    "items": [
      "Versioned styles and scripts prevent stale browser caches from mixing website editions.",
      "In-context concept panels, profile reading paths, quick search and accessible keyboard interactions.",
      "Functional terminology for technical capabilities and supporting areas; KDV Studio/Cloud is an optional example.",
      "Implementation menu and inbound links paused; the previous URL shows an explanatory notice.",
      "Four languages, sixty accepted guides, editable resources and the exact Framework 1.2.0 source revision.",
      "Light/dark theme, local-only canvas and checklist; only explicit theme/profile preferences are stored."
    ],
    "site": "Website",
    "source": "Exact accepted knowledge revision"
  },
  "pt-br": {
    "title": "Versões e notas de release",
    "intro": "O site e o Framework aberto têm versões independentes. Esta edição identifica a revisão exata do conhecimento aprovado.",
    "changes": "Alterações das versões 1.2.1 / 1.2.0",
    "candidate": "Versão candidata para avaliação, separada da release aprovada do conhecimento.",
    "items": [
      "Estilos e scripts identificados por versão evitam a mistura de edições pelo cache do navegador.",
      "Painéis de conceitos no contexto, trilhas por perfil, busca rápida e interações acessíveis pelo teclado.",
      "Terminologia funcional para capacidades técnicas e áreas de apoio; KDV Studio/Cloud é um exemplo opcional.",
      "Menu Implementação e vínculos para a seção suspensos; o endereço anterior apresenta um aviso explicativo.",
      "Quatro idiomas, sessenta guias aprovados, recursos editáveis e a revisão exata do Framework 1.2.0.",
      "Tema claro/escuro, canvas e checklist locais; apenas preferências explícitas de tema/perfil são armazenadas."
    ],
    "site": "Site",
    "source": "Revisão exata do conhecimento aprovado"
  },
  "pt": {
    "title": "Versões e notas de release",
    "intro": "O site e o Framework aberto têm versões independentes. Esta edição identifica a revisão exata do conhecimento aceite.",
    "changes": "Alterações das versões 1.2.1 / 1.2.0",
    "candidate": "Versão candidata para avaliação, separada da release aceite do conhecimento.",
    "items": [
      "Estilos e scripts identificados por versão evitam a mistura de edições pela cache do navegador.",
      "Painéis de conceitos no contexto, percursos por perfil, pesquisa rápida e interações acessíveis pelo teclado.",
      "Terminologia funcional para capacidades técnicas e áreas de apoio; KDV Studio/Cloud é um exemplo opcional.",
      "Menu Implementação e ligações para a secção suspensos; o endereço anterior apresenta um aviso explicativo.",
      "Quatro idiomas, sessenta guias aceites, recursos editáveis e a revisão exata do Framework 1.2.0.",
      "Tema claro/escuro, canvas e lista de verificação locais; apenas preferências explícitas de tema/perfil são guardadas."
    ],
    "site": "Site",
    "source": "Revisão exata do conhecimento aceite"
  },
  "es": {
    "title": "Versiones y notas de release",
    "intro": "El sitio y el Framework abierto tienen versiones independientes. Esta edición identifica la revisión exacta del conocimiento aceptado.",
    "changes": "Cambios de las versiones 1.2.1 / 1.2.0",
    "candidate": "Versión candidata para revisión, independiente de la release aceptada del conocimiento.",
    "items": [
      "Estilos y scripts identificados por versión evitan que la caché del navegador mezcle ediciones.",
      "Paneles de conceptos en contexto, rutas por perfil, búsqueda rápida e interacciones accesibles por teclado.",
      "Terminología funcional para capacidades técnicas y áreas de apoyo; KDV Studio/Cloud es un ejemplo opcional.",
      "Menú Implementación y enlaces a la sección suspendidos; la dirección anterior muestra un aviso explicativo.",
      "Cuatro idiomas, sesenta guías aceptadas, recursos editables y la revisión exacta del Framework 1.2.0.",
      "Tema claro/oscuro, canvas y lista de verificación locales; solo se guardan preferencias explícitas de tema/perfil."
    ],
    "site": "Sitio",
    "source": "Revisión exacta del conocimiento aceptado"
  }
};
export const publicationText=text;
export function publishedRelease(l){
 const t=text[l],ui=releaseUi[l];
 return `<section class="page-hero wrap"><p class="eyebrow">${e(ui.notes)}</p><h1>${e(t.title)}</h1><p class="lead">${e(t.intro)}</p></section><section class="section wrap"><div class="review-release-pair"><article><p class="eyebrow">${e(t.site)}</p><h2>v${e(release.version)}</h2><p>${e(releaseStatus(l))}</p>${release.status!=='stable'?`<p>${e(t.candidate)}</p>`:`<a class="text-link" href="https://github.com/kolmeia-dataecosystems/kdv-framework-site/releases/tag/v${e(release.version)}">${e(ui.notes)} ↗</a>`}</article><article><p class="eyebrow">${e(ui.included)}</p><h2>Framework v${e(release.knowledge.version)}</h2><a class="text-link" href="${frameworkReleaseUrl}">${e(ui.notes)} ↗</a><p class="fine-print">${e(t.source)}: <a href="${sourceCommitUrl}"><code>${e(release.knowledge.commit.slice(0,7))}</code></a></p></article></div><h2>${e(t.changes)}</h2><ul class="release-change-list">${t.items.map(item=>`<li>${e(item)}</li>`).join('')}</ul><section id="baseline"><h2>${e(ui.baseline)}</h2><p>${e(ui.baselineBody)}</p><div class="actions"><a class="text-link" href="${websiteBaselineUrl}">${e(t.site)} v1.0.0 ↗</a><a class="text-link" href="https://github.com/kolmeia-dataecosystems/kdv-framework/releases/tag/v1.0.0">Framework v1.0.0 ↗</a></div></section></section>`;
}

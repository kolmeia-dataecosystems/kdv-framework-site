# Website 1.4 UX decisions

26 October 2026 · website `1.4.0` · accepted Framework `1.2.0`.

## Scope and boundaries

Work stays on `feat/consistencia-icones-texto`; no branch change, push, merge or publication. The comparison baseline is website 1.3.1 at `7c5a6b159602b7ad7ec54341d98f81cfc8cf14f6`. The approved home hero, vocabulary honeycomb, four-stage cycle and starting-point questionnaire retain their layout, copy, rules and timing. Shared controls and decorative icons follow the new system.

The accepted `knowledge/` snapshot, its source revision, full guide prose, downloadable templates and original diagrams are unchanged. The documentation index uses a separate editorial summary map; those shorter titles/descriptions do not rename or rewrite accepted guides. Implementation remains paused, absent from menus/sitemap and noindex at its compatibility URL. Prepared implementation copy is edited without enabling the page.

## Decisions

| Concern | Decision |
| --- | --- |
| One icon source | `src/ux/icons.cjs` supplies both Node rendering and browser updates. Named concepts: persona, papel, estagio, pratica, template, artefato, risco, evidencia, comunidade, documento, seta, link-externo. Existing home geometry is retained in the same module. Theme, search, close, expand and completion controls use the same stroke rules. |
| Geometry and accessibility | 24×24 viewBox, currentColor, 1.5 stroke, miter joins, square caps; sizes 16, 20, 24 and 32. Every decorative SVG is aria-hidden and nonfocusable. Theme labels, pressed state, keyboard handlers, modal naming and focus restoration remain. No new library. |
| Direction | Internal actions use the right arrow; external destinations use the diagonal arrow. Previous-guide navigation rotates the shared arrow. CSS no longer supplies glyph icons. Build-time and dynamic markup use the same geometry, without duplicate arrows. Imported guide symbols and mathematical multiplication in the model are content, not interface icons. |
| Copy | Every reviewed hero/section introduction has at most two sentences. Profile and module cards use separate short titles/support; detailed names and explanations stay in panels. Template descriptions remain intact in the catalogue, with short editorial support on cards. No CSS clipping or line clamping hides information. |
| Density | Primary profile, module and template support contains at most 12 words in every locale. AI and contribution grids use two columns for more readable support. Existing concise cadence, source and roadmap cards retain their wording. Line wrapping depends on font, viewport and text scaling; the two-line visual target is not claimed as verified without browser QA. |
| Paragraphs and duplication | Guardian requirements, documentation publication rules, implementation selection criteria and historical release explanation use lists. Community version copy no longer repeats version independence already explained on Releases. The optional software summary links conceptually to the full explanation in Model, retaining optionality and no purchase recommendation. |
| Visual rhythm | Existing theme tokens, responsive section spacing and 1.3 hover/focus behavior are shared by catalogue, documentation and release cards. Connected grids retain one shared border. Headers use eyebrow, heading and introduction; sequence labels use two digits (preparation is 00). Action priority is retained: one filled primary action per section, secondary text links or utility controls. |
| Four languages | PT-BR is the editorial baseline. EN, PT-PT and ES receive the same structure and equivalent edits. The open-method, original-interpretation/non-equivalence, optional purchase, no-certification and legal-advice limitations remain. No new delivery, endorsement or conformity claim. |
| Motion and privacy | Reduced-motion rules and focus reveal behavior remain. The icon observer updates only presentation text outside imported Markdown, code, SVG and scripts; text is escaped before SVG insertion. No new storage or network behavior. |

## Word counts

Counts compare committed generated HTML at the baseline with generated 1.4.0 HTML, in DOM order. A word is a whitespace-delimited token containing a Unicode letter, digit or underscore. SVG, styles and scripts contribute no words. **Intros** sum hero lead, section-header introductions and the documentation-index introduction. Eyebrows, titles, notes, metadata, action labels and expanded panels are excluded. **Cards** sum titles and supporting paragraphs in `.cell` (excluding notes), `.docs-guide` and release-pair articles; action labels and metadata are excluded. Unchanged diagram/source cards are included. The brand comparison is a list, not a card grid, and is reported separately below.

Numbers are before → after. “0” on the paused implementation page means there are no public cards, not that the prepared content was deleted.

### Português do Brasil

| Página | Intros | Cartões | Quantidade de cartões |
| --- | ---: | ---: | ---: |
| Para quem | 71 → 40 | 167 → 60 | 6 |
| Modelo | 145 → 110 | 183 → 103 | 10 |
| Playbook | 95 → 75 | 35 → 35 | 3 |
| Implementação (aviso) | 21 → 21 | 0 → 0 | 0 |
| Recursos | 93 → 79 | 130 → 114 | 12 |
| Comunidade | 65 → 59 | 98 → 98 | 7 |
| Versões | 18 → 17 | 5 → 5 | 2 |
| Documentação (índice) | 17 → 14 | 187 → 159 | 15 |

### English

| Página | Intros | Cartões | Quantidade de cartões |
| --- | ---: | ---: | ---: |
| Para quem | 69 → 41 | 155 → 54 | 6 |
| Modelo | 142 → 106 | 171 → 94 | 10 |
| Playbook | 101 → 76 | 29 → 29 | 3 |
| Implementação (aviso) | 21 → 21 | 0 → 0 | 0 |
| Recursos | 92 → 78 | 113 → 95 | 12 |
| Comunidade | 59 → 51 | 89 → 89 | 7 |
| Versões | 17 → 16 | 5 → 5 | 2 |
| Documentação (índice) | 19 → 14 | 178 → 152 | 15 |

### Português europeu

| Página | Intros | Cartões | Quantidade de cartões |
| --- | ---: | ---: | ---: |
| Para quem | 70 → 41 | 174 → 61 | 6 |
| Modelo | 142 → 108 | 185 → 102 | 10 |
| Playbook | 93 → 76 | 35 → 35 | 3 |
| Implementação (aviso) | 22 → 22 | 0 → 0 | 0 |
| Recursos | 93 → 78 | 130 → 114 | 12 |
| Comunidade | 67 → 61 | 99 → 99 | 7 |
| Versões | 18 → 17 | 5 → 5 | 2 |
| Documentação (índice) | 17 → 14 | 187 → 159 | 15 |

### Español

| Página | Intros | Cartões | Quantidade de cartões |
| --- | ---: | ---: | ---: |
| Para quem | 66 → 41 | 169 → 61 | 6 |
| Modelo | 153 → 111 | 193 → 104 | 10 |
| Playbook | 96 → 76 | 36 → 36 | 3 |
| Implementação (aviso) | 22 → 22 | 0 → 0 | 0 |
| Recursos | 94 → 79 | 133 → 114 | 12 |
| Comunidade | 69 → 62 | 98 → 98 | 7 |
| Versões | 18 → 17 | 5 → 5 | 2 |
| Documentação (índice) | 19 → 15 | 192 → 163 | 15 |

### PT-BR: each introduction and card

Labels follow the rendered 1.4.0 order; original names remain available in panels or accepted guides.

**Para quem**

| Intro / cartão | Antes | Depois |
| --- | ---: | ---: |
| Intro · hero | 31 | 16 |
| Intro · organizacoes | 16 | 8 |
| Intro · perfis | 16 | 8 |
| Intro · perguntas | 8 | 8 |
| Cartão · Gestão de negócio | 22 | 11 |
| Cartão · Governança de dados | 30 | 10 |
| Cartão · Risco e conformidade | 29 | 11 |
| Cartão · Engenharia de dados | 30 | 9 |
| Cartão · Data steward | 26 | 9 |
| Cartão · Análise e IA | 30 | 10 |

**Modelo**

| Intro / cartão | Antes | Depois |
| --- | ---: | ---: |
| Intro · hero | 28 | 15 |
| Intro · anatomia | 25 | 25 |
| Intro · camadas | 14 | 14 |
| Intro · papeis | 11 | 11 |
| Intro · modulos | 31 | 19 |
| Intro · referenciais | 11 | 11 |
| Intro · ia | 25 | 15 |
| Cartão · Descoberta e consumo | 25 | 10 |
| Cartão · Publicação de produtos | 23 | 11 |
| Cartão · Governança do ecossistema | 20 | 11 |
| Cartão · Operações da plataforma | 19 | 10 |
| Cartão · Atendimento de dados | 15 | 10 |
| Cartão · Integrações | 19 | 7 |
| Cartão · Propósito e autoridade | 20 | 11 |
| Cartão · Minimização e acesso | 16 | 11 |
| Cartão · Origem e avaliação | 13 | 11 |
| Cartão · Pessoas e direitos | 13 | 11 |

**Playbook**

| Intro / cartão | Antes | Depois |
| --- | ---: | ---: |
| Intro · hero | 33 | 18 |
| Intro · etapas | 22 | 17 |
| Intro · acesso | 12 | 12 |
| Intro · ritmo | 8 | 8 |
| Intro · checklist | 20 | 20 |
| Cartão · 1 | 11 | 11 |
| Cartão · 2 | 12 | 12 |
| Cartão · 3 | 12 | 12 |

**Implementação (aviso)**

| Intro / cartão | Antes | Depois |
| --- | ---: | ---: |
| Intro · hero | 21 | 21 |

**Recursos**

| Intro / cartão | Antes | Depois |
| --- | ---: | ---: |
| Intro · hero | 35 | 21 |
| Intro · modelos | 12 | 12 |
| Intro · canvas | 16 | 16 |
| Intro · diagramas | 14 | 14 |
| Intro · fontes | 16 | 16 |
| Cartão · Carta do domínio | 14 | 10 |
| Cartão · Contrato de produto de dados | 16 | 13 |
| Cartão · Registro de decisão de governança | 13 | 11 |
| Cartão · Lista de revisão de acesso | 14 | 11 |
| Cartão · Registro de evidências | 13 | 9 |
| Cartão · 6 | 8 | 8 |
| Cartão · 7 | 6 | 6 |
| Cartão · 8 | 7 | 7 |
| Cartão · 9 | 7 | 7 |
| Cartão · DAMA-DMBOK 2 | 9 | 9 |
| Cartão · DCAM | 14 | 14 |
| Cartão · Data Mesh | 9 | 9 |

**Comunidade**

| Intro / cartão | Antes | Depois |
| --- | ---: | ---: |
| Intro · hero | 21 | 15 |
| Intro · contribuir | 11 | 11 |
| Intro · guardioes | 14 | 14 |
| Intro · roteiro | 8 | 8 |
| Intro · marcas | 11 | 11 |
| Cartão · Faça uma pergunta útil | 15 | 15 |
| Cartão · Melhore um modelo | 13 | 13 |
| Cartão · Compartilhe um exemplo | 11 | 11 |
| Cartão · Torne mais acessível | 10 | 10 |
| Cartão · Facilitar o primeiro caso | 14 | 14 |
| Cartão · Melhorar os recursos | 19 | 19 |
| Cartão · Aprofundar a implementação | 16 | 16 |

**Versões**

| Intro / cartão | Antes | Depois |
| --- | ---: | ---: |
| Intro · hero | 18 | 12 |
| Intro · hero-2 | 0 | 5 |
| Cartão · v1.4.0 | 3 | 3 |
| Cartão · Framework v1.2.0 | 2 | 2 |

**Documentação (índice)**

| Intro / cartão | Antes | Depois |
| --- | ---: | ---: |
| Intro · hero | 17 | 14 |
| Cartão · Primeiros passos | 13 | 13 |
| Cartão · Princípios e baseline | 12 | 12 |
| Cartão · Anatomia do ecossistema | 9 | 9 |
| Cartão · Papéis e direitos de decisão | 10 | 10 |
| Cartão · O ciclo de vida do dado | 14 | 13 |
| Cartão · Acordos de produto de dados | 11 | 11 |
| Cartão · Acesso e exceções | 14 | 10 |
| Cartão · Evidências e melhoria | 12 | 11 |
| Cartão · Aplicar o modelo | 10 | 10 |
| Cartão · Arquitetura de referência | 15 | 9 |
| Cartão · Práticas e referenciais | 11 | 11 |
| Cartão · IA e privacidade | 17 | 10 |
| Cartão · Dois exemplos completos | 19 | 10 |
| Cartão · Glossário comum | 8 | 8 |
| Cartão · Comunidade e guardiões | 12 | 12 |

### Prepared implementation and supporting community copy

These source-level counts are separate from the public HTML totals above. Prepared implementation intros include the hero and five section introductions; prepared cards count the six functional-area titles/support only. Existing detailed capability descriptions are unchanged. Community list counts cover all five brand descriptions. Guardian counts compare the former repeated paragraph with the new three requirements, excluding the unchanged guardian identity.

| Idioma | Implementação: intros | Implementação: cartões | Comunidade: marcas | Comunidade: regras dos guardiões |
| --- | ---: | ---: | ---: | ---: |
| pt-br | 158 → 91 | 121 → 59 | 98 → 65 | 42 → 31 |
| en | 149 → 79 | 107 → 53 | 93 → 65 | 37 → 28 |
| pt | 156 → 91 | 121 → 59 | 98 → 64 | 44 → 31 |
| es | 171 → 91 | 125 → 60 | 99 → 67 | 43 → 34 |

## Validation and limits

`npm run check` passes 32 tests and builds all 100 localized pages plus the English root. New tests scan every generated page for interface glyph icons, verify all twelve canonical concepts in four locales, check canonical SVG attributes/geometry and browser/build parity, preserve imported prose, check concise aligned copy and protect dynamic text insertion against HTML injection. Existing checks retain all internal links/fragments, knowledge provenance, neutral positioning, version metadata and local-only behavior. JavaScript syntax and `git diff --check` are checked separately.

Browser QA was attempted but could not run: the local HTTP server bind was denied by the sandbox (`Operation not permitted`); Chrome tab creation reported unsupported window creation and the integrated browser was unavailable. No desktop/mobile screenshot, rendered line-count, dark-theme interaction, keyboard or screen-reader observations are claimed. The code preserves existing accessibility/motion mechanisms; static tests do not replace those interactive checks.

## Local delivery

Package/release labels, README, English changelog and the four release pages identify website 1.4.0. Framework remains 1.2.0 at accepted revision `57bc85be294170be1f419629ed241d302530d4d9`. Local staging and commit (`Unify icons and refine institutional copy`) were attempted; both were denied when creating `.git/index.lock` (`Operation not permitted`). All changes remain in the worktree. No push or production publication is authorized.

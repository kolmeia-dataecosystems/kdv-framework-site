# KDV / framework

An open operational data governance framework for the data community, powered by KDV Ecosystems. Bio-inspired by hives and beekeeping, it connects good practices to decision rights, everyday processes and evidence. This repository contains the website, original framework explanations, editable templates and contribution process.

- Website preview: https://kdv-framework.lab-of-codes-6406.chatgpt.site
- Production domain: https://kdvframework.org
- Repository: https://github.com/kolmeia-dataecosystems/kdv-framework-site
- Institutional site: https://kdvecosystems.com
- Published baseline: **v1.0.0**, designated 21 October 2026; the tagged files retain the historical 0.1 labels.
- Previous public release: **v1.1.0**, published on 21 October 2026.
- Current website release: **v1.2.2**, prepared on 26 October 2026.
- Current edition: English, Brazilian Portuguese, European Portuguese and Spanish; 96 active localized pages plus four compatibility notices, 60 guides, 20 Markdown templates and four CSV worksheets. The earlier [proposal preview](review/README.md) remains a separate historical review snapshot. The [1.2 UX decision log](docs/UX-1.2.md) records the new reference, implementation decisions and validation limits.
- Included Framework: **v1.2.0**, accepted commit `57bc85be294170be1f419629ed241d302530d4d9`.

See [release policy and publication checklist](docs/RELEASING.md). Website and Framework versions are independent. The localized `/releases/` pages identify the exact version pair, history and publication status. The production build reads only the explicitly imported accepted knowledge snapshot.

The original Sites preview is owner-private. Public production is hosted on Hostinger at `https://kdvframework.org`. GitHub visibility and Sites preview access are independent; preserve the preview's existing identity and audience.

## The operating model

KDV connects five layers:

1. Principles and policies: purpose, classification, retention and a shared baseline.
2. Organisation and roles: named owners, stewards and scoped decision rights.
3. Processes and decisions: Cultivate → Govern → Share → Activate, with reviews and exception paths.
4. Controls and enablers: contracts, quality tests, access policies and operational practices.
5. Evidence and improvement: decisions, quality results, usage, incidents and outcomes.

The vocabulary distinguishes **Ecosystem**, **Hive** (business domain), **Cell** (subdomain), **Comb** (optional grouping of Cells in the same Hive), **data product**, and **Farm** (execution environment). A Cell may contain multiple products; it is not itself a data product. A Cell may belong to multiple Combs. A Farm is distinct from the business hierarchy. Domain, subdomain and product owners remain separate responsibilities even when one person holds several roles.

The reference KDV product informed this abstraction. Consumer, Producer, EcOps and PlatOps are interaction perspectives rather than replacements for business roles. Applying the framework does not require purchasing or installing a KDV product.

DAMA-DMBOK 2, DCAM and Data Mesh inform the model. The website's reference mapping is an **original, illustrative KDV interpretation**, not an official equivalence, DCAM assessment, certification or claim of endorsement. No restricted reference-framework content is redistributed. See [model and evidence](docs/OPERATING-MODEL.md) and [source notes](docs/SOURCES.md).

## Run locally

Node.js 22+; Python 3 for the optional local preview. No third-party npm dependencies are required.

```sh
git clone https://github.com/kolmeia-dataecosystems/kdv-framework-site.git
cd kdv-framework-site
npm run check
npm run dev
```

Open http://127.0.0.1:4174. English is the default. The site also contains complete Brazilian Portuguese, European Portuguese and Spanish editions.

| Command | Purpose |
| --- | --- |
| `npm run build` | Build 100 localized pages, the English root, 404, sitemap, 20 Markdown templates and four CSV worksheets |
| `npm test` | Check generated links/fragments, locale coverage, escaping, privacy boundaries and model distinctions |
| `npm run check` | Build and run checks |
| `npm run dev` | Serve `dist/` on port 4174 |

## Structure

```text
src/content.mjs                 Four-language editorial content and reference URLs
src/render.mjs                  Semantic document frame, metadata, routes and accepted reader
src/legacy-render.mjs           Preserved brand artwork and footer
src/ux/                        Four-language UX catalogue, SSR components and progressive behaviours
src/documentation.mjs           Safe Markdown rendering, guide navigation and source provenance
knowledge/                     Pinned snapshot of accepted knowledge from the independent repository
scripts/sync-knowledge.mjs      Explicit main-only knowledge import
src/runtime.js                  Historical 1.1 runtime, retained for the historical review build
src/styles.css                  Responsive monochrome design system
build.mjs                       Deterministic static generator and editable template fields
dist/                           Generated static site; deploy this directory only
  assets/                       Supplied KDV brand assets and original share illustration
  {en,pt-br,pt,es}/                   Localized pages
  templates/{en,pt-br,pt,es}/         Five Markdown templates and a CSV worksheet per language
  templates/office/pt-br/             Supplied editable Word/Excel companions (PT-BR)
test/site.test.mjs              Node regression checks
docs/                          Model, sources, privacy, validation and release notes
.github/                        CI and community issue templates
.openai/hosting.json             Sites identity and static directory (no secrets)
LICENSE                         MIT licence for code
LICENSE-CONTENT.md               CC BY 4.0 for original framework content and diagrams
```

Edit `src/` and `build.mjs`, then rebuild. Generated HTML is committed so that any static host can serve the project without installing a framework. Do not hand-edit generated HTML. Preserve the opaque Site ID when updating the existing hosted preview.

## Pages and interactions

- `/{language}/`: problem-led overview, six reader roles and six organisation types, in-place concepts and illustrative cases.
- `/{language}/audience/`: organisation needs, persona cards and frequently asked questions.
- `/{language}/implementation/`: temporarily paused; the previous URL displays a noindex notice. Its menu, inbound links, diagram and sitemap entries are disabled. Prepared source remains available for later editorial review.
- `/{language}/model/`: interactive anatomy, twenty layer/stage cells, ten roles, an illustrative RACI, six generic supporting functional areas and reference boundaries. KDV Studio/Cloud appears as one optional example, without a sales CTA.
- `/{language}/playbook/`: four-stage playbook with participants, practices, evidence, gates and measures; example access flow; proposed review rhythm; readiness conversation checklist.
- `/{language}/resources/`: five Markdown templates in four languages, PT-BR Word/Excel companions, four available process/anatomy diagrams, a localized evidence CSV and a browser-only product canvas generator.
- `/{language}/community/`: contribution paths, stewardship, licensing and the distinction between the open method and commercial implementations.
- `/{language}/releases/`: website/framework versions, delivered changes, exact accepted knowledge revision and baseline notes.
- `/{language}/privacy/`: localized privacy/storage notice, operator and hosting boundaries.
- `/{language}/docs/`: documentation index, with fifteen guides per language under `/{language}/docs/{slug}/`.

All substantive content is present in HTML. JavaScript enhances navigation and interactions. Stage tabs support arrow keys, Home and End. Concepts use native modal dialogs with keyboard handling, a panel history and direct links; static links open the accepted full guide when JavaScript is unavailable. Without JavaScript all playbook stages remain readable and the static template downloads still work. Language links retain the current page and open concept. The root remains English; no language preference is stored. Quick search supports Ctrl/Cmd+K and /.

Canvas data, checklist selections and reading progress remain in page memory. Theme and a reader profile selected explicitly by the visitor are stored locally under `kdv:tema` and `kdv:perfil`; a saved profile can be removed with the profile chip. Downloads are generated locally as text; the application does not send email, collect leads, save form fields or call a service. The checklist is explicitly not an official maturity score or certification. Form `method="dialog"` prevents accidental network submission if JavaScript is unavailable.

## Deployment and domain

The default absolute origin is `https://kdvframework.org` in `build.mjs`; `SITE_ORIGIN` may override it for another host. It must be an HTTP(S) origin without credentials, path, query or fragment. Rebuild canonical, alternate, Open Graph and sitemap URLs together after changing it.

Every page, including documentation, contains Open Graph and `summary_large_image` Twitter Card metadata directly in HTML. Each language uses its own 1200 × 630 PNG, with the Framework identity and a link to the public production origin. Titles and descriptions follow the current page. SVG is retained only as an artwork source or legacy asset, not as the sharing image.

Editable SVG masters and their rendered PNGs live in `assets/social/`. The dependency-free build copies the PNGs to `dist/assets/`. Export a matching 1200 × 630 PNG after editing a master. For a future artwork replacement, increment the `v1` filename and its reference in `src/social.mjs`. Social platforms can retain an older preview until they scrape the page again.

For Sites, use the supported source workflow: synchronize the exact source commit, package `dist/` from it, save and deploy that version. The GitHub repository is separate from the Sites source provider. GitHub Actions runs checks only. Production on Hostinger uses the existing Git integration from `main`; a reviewed main change can trigger deployment independently of GitHub Releases. Short-lived hosting credentials must remain in memory and must not be saved in this repository.

Production uses `https://kdvframework.org` on Hostinger. The owner-private Sites preview is separate. Release preparation does not change DNS or the preview audience.

## Community and licensing

Read [CONTRIBUTING.md](CONTRIBUTING.md), [GOVERNANCE.md](GOVERNANCE.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Contributions should show the context, proposed practice, evidence, limitations and effect of a change. Include only synthetic or properly anonymised examples.

Original framework copy, diagrams and templates are available under **CC BY 4.0**. Website code is **MIT**. KDV logos/trademarks, DAMA-DMBOK, DCAM and other external marks/material are excluded from those grants and retain their owners' rights. Third-party reference publishers' licensing conditions continue to apply.

## Brand and privacy

The monochrome identity continues the KDV brand: large editorial typography, strict grids, original line icons, hive geometry and restrained pixel motifs. The official KDV / framework SVG inherits the theme colour. Delight is served locally in five weights (300–700), with system Arial/Helvetica/sans-serif fallbacks and no remote font requests. Monospaced labels retain their existing typeface.

Operator: **Lab of Codes & Kolmeia**. Privacy contact: **info@kolmeia.io**. Application cookies and analytics: **none**. Persistent storage is limited to the optional theme and explicitly selected reader profile. Hosting sign-in and provider processing are separate; see [privacy inventory](docs/PRIVACY.md). Display language does not determine whether LGPD or GDPR applies.


## Open knowledge and the documentation section

The authoritative Markdown lives in [kolmeia-dataecosystems/kdv-framework](https://github.com/kolmeia-dataecosystems/kdv-framework), a separate public repository with guardian-reviewed `main`. Community questions, guide improvements, contribution instructions and the main GitHub call to action now point there. Website accessibility/implementation changes still point to this code repository.

The approved presentation retains the monochrome brand and existing routes while adding problem-led reading paths, preparation, worked examples and reference implementation choices. Documentation is an integrated reading area, with the existing colours and typography, a responsive guide sidebar, local guide filter, section contents, previous/next links, source revision and edit-proposal links. It currently contains 60 guides, four localized diagrams and twenty editable Markdown templates sourced from the knowledge base.

`knowledge/source.json` records the exact accepted commit. `npm run build` is offline and reproducible: it reads the tracked snapshot, never a remote draft. To publish newly accepted knowledge:

```sh
npm run knowledge:sync
npm run check
# Review and commit the resulting knowledge snapshot and generated site changes.
# Merge the reviewed site commit into main for the existing Hostinger deployment.
```

The synchronization command clones **main only**, validates the content inventory and allowed file paths, copies documents/diagrams/templates and records the commit. It does not execute source-repository scripts or import contributor branches. Never hand-edit `knowledge/` as the editorial source: propose the change in the knowledge repository, obtain guardian acceptance, then synchronize.

A knowledge merge does not automatically deploy this website. No cross-repository credential, webhook or scheduled task is configured. This explicit release boundary is intentional and documented in the knowledge repository. Static Markdown contains the original content; the site renderer escapes raw HTML and rejects unrecognised link protocols. The guide filter runs on existing document titles/descriptions, with no API or persistent storage.

The initial knowledge guardian is **ismael-lab**, as designated by the owner. Its main branch requires CODEOWNER approval, passing `knowledge-check`, up-to-date branches, resolved conversations and fresh approval after changes. Push restrictions allow only the guardian; administrator bypass, force pushes and deletion are disabled. With only one guardian, a guardian-authored PR requires another authorised guardian for independent approval. The source repo's protected policy governs acceptance; the site snapshot exposes provenance, not a second approval authority.

## Functional terminology and Implementation pause

Public pages, guide text and concept panels describe what capabilities do, with no named market tools. The accepted glossary includes nineteen technical capabilities and six functional areas. The commercial-name/concept/function correspondence stays in the knowledge repository under `references/`, outside the website content inventory. It is an editorial aid, not a mandatory stack or licence/readiness claim.

`src/ux/availability.mjs` is the explicit switch for the paused Implementation section. Re-enabling it requires reviewing all entry links, prepared content and the supplier-specific diagram before publication. Old tool hashes resolve to the new functional identifiers. Root language links also preserve valid single-slash routes.

The 1.2.1 website patch versions stylesheet and JavaScript request URLs to prevent browsers from combining new HTML with cached files from a previous release. Framework knowledge remains 1.2.0.

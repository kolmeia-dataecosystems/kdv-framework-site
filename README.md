# KDV / framework

An open operational data governance framework for the data community, powered by KDV Ecosystems. Bio-inspired by hives and beekeeping, it connects good practices to decision rights, everyday processes and evidence. This repository contains the website, original framework explanations, editable templates and contribution process.

- Website preview: https://kdv-framework.lab-of-codes-6406.chatgpt.site
- Intended independent domain: https://kdvframework.org (DNS has not been changed by this project)
- Repository: https://github.com/kolmeia-dataecosystems/kdv-framework-site
- Institutional site: https://kdv-ecosystems.lab-of-codes-6406.chatgpt.site
- Edition: **0.1, working community model**, 18 October 2026

The initial Sites deployment is owner-private. GitHub visibility is independent of Sites hosting. Linking to the institutional site does not change that site's existing access. A future public deployment or domain cutover must preserve ownership and use the hosting provider's supported access/domain tools.

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

Open http://127.0.0.1:4174. English is the default. The site also contains complete Portuguese and Spanish editions.

| Command | Purpose |
| --- | --- |
| `npm run build` | Build 18 localized pages, the English root, 404, sitemap and 15 Markdown templates |
| `npm test` | Check generated links/fragments, locale coverage, escaping, privacy boundaries and model distinctions |
| `npm run check` | Build and run checks |
| `npm run dev` | Serve `dist/` on port 4174 |

## Structure

```text
src/content.mjs                 EN/PT/ES editorial content and reference URLs
src/render.mjs                  Semantic HTML, SVG diagrams and page templates
src/runtime.js                  Tabs, filters, checklist and local canvas download
src/styles.css                  Responsive monochrome design system
build.mjs                       Deterministic static generator and editable template fields
dist/                           Generated static site; deploy this directory only
  assets/                       Supplied KDV brand assets and original share illustration
  {en,pt,es}/                   Localized pages
  templates/{en,pt,es}/         Five editable original Markdown artefacts per language
test/site.test.mjs              Node regression checks
docs/                          Model, sources, privacy, validation and release notes
.github/                        CI and community issue templates
.openai/hosting.json             Sites identity and static directory (no secrets)
LICENSE                         MIT licence for code
LICENSE-CONTENT.md               CC BY 4.0 for original framework content and diagrams
```

Edit `src/` and `build.mjs`, then rebuild. Generated HTML is committed so that any static host can serve the project without installing a framework. Do not hand-edit generated HTML. Preserve the opaque Site ID when updating the existing hosted preview.

## Pages and interactions

- `/{language}/`: overview, bio-inspired visual anatomy, operating layers and journey.
- `/{language}/model/`: business structure diagram, glossary, ten accountable roles and filterable reference mapping.
- `/{language}/playbook/`: four-stage playbook with participants, practices, evidence, gates and measures; example access flow; proposed review rhythm; readiness conversation checklist.
- `/{language}/resources/`: five downloadable Markdown templates and a browser-only product canvas generator.
- `/{language}/community/`: contribution paths, stewardship, licensing and the distinction between the open method and commercial implementations.
- `/{language}/privacy/`: localized privacy/storage notice, operator and hosting boundaries.

All substantive content is present in HTML. JavaScript enhances navigation and interactions. Stage tabs support arrow keys, Home and End. Anatomy concepts use native `details` elements; deep links open the selected concept. Without JavaScript all playbook stages remain readable and the static template downloads still work. Language links retain the current page; no language preference is stored.

Canvas data and checklist selections remain only in page memory. Downloads are generated locally as text; the application does not send email, collect leads, save form fields or call a service. The checklist is explicitly not an official maturity score or certification. Form `method="dialog"` prevents accidental network submission if JavaScript is unavailable.

## Deployment and domain

The default absolute origin is in `build.mjs`; `SITE_ORIGIN` may override it for another host. Set it to the verified final origin before a custom-domain release and rebuild canonical, alternate, Open Graph and sitemap URLs together.

For Sites, use the supported source workflow: synchronize the exact source commit, package `dist/` from it, save and deploy that version. The GitHub repository is separate from the Sites source provider. GitHub Actions runs checks only; it does not deploy production. Short-lived hosting credentials must remain in memory and must not be saved in this repository.

No DNS change to `kdvframework.org` is included. The new preview is separate from any existing site at that domain.

## Community and licensing

Read [CONTRIBUTING.md](CONTRIBUTING.md), [GOVERNANCE.md](GOVERNANCE.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Contributions should show the context, proposed practice, evidence, limitations and effect of a change. Include only synthetic or properly anonymised examples.

Original framework copy, diagrams and templates are available under **CC BY 4.0**. Website code is **MIT**. KDV logos/trademarks, DAMA-DMBOK, DCAM and other external marks/material are excluded from those grants and retain their owners' rights. Third-party reference publishers' licensing conditions continue to apply.

## Brand and privacy

The monochrome identity continues the KDV brand: large editorial typography, strict grids, original line icons, hive geometry and restrained pixel motifs. Supplied logos are retained. No Delight font files were provided, so the site uses system Arial/Helvetica/sans-serif without remote font requests.

Operator: **Lab of Codes & Kolmeia**. Privacy contact: **info@kolmeia.io**. Application cookies, analytics and persistent storage: **none**. Hosting sign-in and provider processing are separate; see [privacy inventory](docs/PRIVACY.md). Display language does not determine whether LGPD or GDPR applies.

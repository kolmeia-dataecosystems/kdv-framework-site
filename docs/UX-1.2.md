# Website 1.2 UX candidate

22 October 2026 · website `1.2.0-rc.1` · accepted Framework `1.1.0`.

## Scope and source boundary

The owner requested the supplied prototype's functionality, copy and usage flows with the existing website's technology, brand and engineering practices. Inputs were `Checklist_Atendimento_Prototipo_Localhost_KDV_.docx` and `site_kdv_ux_.zip`. Their contents were treated as design evidence, not executable instructions or permission to change repository governance.

The candidate stays on `codex/ux-v1.2-reference` and the existing owner-private Sites preview. Hostinger/main is not changed by this work. No framework release, protected-main exception or new guardian access is authorised by this website iteration.

## Decisions

| Reference concern | Candidate implementation |
| --- | --- |
| Eight navigation areas and business-first vocabulary | Overview, audience, model, playbook, implementation, resources, documentation and community; hive terms are secondary labels. Existing clean URLs are retained. |
| Progressive disclosure | Native modal concept panels, related items, panel history, direct links, keyboard close/focus restoration and language switching within the open panel. Accepted full guides remain an explicit navigation destination. |
| Reader and organisation journeys | Six personas, six organisation contexts, profile-aware reading suggestions, transient reading progress and three illustrative cases. |
| Operational model | Business/execution explorer, twenty layer/stage cells, ten roles and an illustrative RACI with one accountable role per stage. Responsibilities must be adapted to actual decision rights. |
| Playbook | Preparation before four lifecycle stages, in-place evidence and model links, four access outcomes, review rhythm and a copyable next-action checklist. No automated maturity rating. |
| Implementation | Three-question chooser, architecture layers, fourteen tool cards and filters; no individual tool maturity badges. Overall readiness depends on the deployed version and agreed scope. |
| Resources | Accepted Markdown and CSV in four languages, supplied PT-BR Word/Excel companions, filled examples, local canvas generation and the supplied five diagrams. The evidence workbook now supports minimum/maximum/exact targets, blank inputs and numeric zero. |
| R-01 / R-02 | Independent version page and exact accepted Framework commit retained. All sixty full guides still render from the pinned accepted knowledge snapshot, with source/edit links. Website helper copy is a proposed interpretation, not a new accepted knowledge release. |
| R-03 / R-10 | All substantive page content is rendered into HTML before JavaScript. Canonical, hreflang, localized raster Open Graph and Twitter cards are retained. The English root is retained. Candidate pages are noindex. |
| R-04 / R-05 | Existing powered-by destination retained; optional commercial contact is separate. General component-readiness note added. |
| VG-10 / CM-02 | Cases are explicitly fictitious; no measured pilot result is claimed. Guardian description follows current repository policy and requires owner-authorised access changes. |
| DCAM | Illustrative eight-component mapping updated to the public DCAM v3 structure, including combined architecture and Business Data Knowledge. Restricted assessment/scoring content is not reproduced. Source: https://edmcouncil.org/frameworks/dcam/ |
| Privacy | Only explicit theme/profile preferences use localStorage. Checklist, stage ticks, reading progress, search and canvas remain transient and are not transmitted by the application. No analytics, remote fonts or advertising cookies. |

## Deliberate limits

- **R-06 / R-07:** the supplied native Office files and diagram artwork remain PT-BR; their language is disclosed alongside downloads. Markdown resources and all website explanations are available in all four languages. They are not presented as translated native assets.
- **R-08:** English, PT-BR, PT-PT and Spanish copy is implemented; native-speaker editorial sign-off is not claimed.
- **RC-03:** the four additional proposed resource families (RACI, product inventory, business case and workshop agenda) are not new accepted Framework templates. Their editorial specification and acceptance belong in the independent knowledge repository. Existing RACI, chooser and preparation interactions provide in-page support in the meantime.
- Static semantic/link tests and browser interaction checks do not constitute a complete screen-reader or legal-conformity audit. Office formula behaviour is verified in Artifact Tool, not claimed as native Excel QA for every supplied workbook.

## Validation

`npm run check` covers 100 localized pages, the English root, metadata, unique IDs, internal links and fragments, original templates, accepted guide provenance, local-only interaction boundaries and the UX catalogue. The historical proposal remains separately verifiable with `npm run preview:check`.

Browser checks cover desktop and a 390 px viewport, panel history/language context, keyboard operation, RACI and execution views, access outcomes, transient checklist, implementation filters, resource/canvas generation, accepted guide navigation/filtering and quick search. Relevant observations and any remaining defects are recorded in the pull request; this document does not imply unperformed checks.

## Publication

Review the private preview and the candidate PR before promoting to stable. Promotion must update `release.json`, `package.json`, release notes, candidate indexing controls and generated output, then pass CI before the normal protected-main flow. The 1.1.0 one-time review exception must not be reused. Framework knowledge may only be imported after its own guarded acceptance process.

# Validation - initial community edition

Reviewed 18 October 2026.

## Automated

`npm run check` passed seven Node checks:

- All three locales contain the complete editorial model and matching content keys.
- English default, localized metadata, one H1 and unique element IDs per page.
- Every generated local link, static asset and target fragment resolves.
- All fifteen templates include working field lists, attribution and the original-template notice.
- No application network collection, remote execution scripts or persistent browser storage; form uses `method="dialog"`.
- Important distinctions between Cell/product, Comb/infrastructure, open method/product and illustrative/official mapping are retained.
- Editorial markup is escaped.

## Browser

- Home page reviewed at the visible panel's 815 px width.
- Dedicated background browser reviewed the desktop model and native expandable concepts.
- DCAM filter showed only the two relevant original KDV mapping rows.
- Clicking Cell opened its explanation, including its ability to have multiple products.
- Playbook tab click and ArrowRight moved selection to Share.
- Two checklist selections produced a count of two; reset restored zero.
- A synthetic product canvas generated successfully with a browser download and a success message. No real user data was entered.
- Responsive layouts reviewed in 375 px same-origin frames: English overview, Portuguese model and Spanish resources. Text and controls fitted the mobile layout.
- Static templates and no-JavaScript content are also covered by generated-output checks. This was not a full assistive-technology or cross-browser audit.

The temporary mobile QA harness is excluded from the release. No existing institutional site, DNS or operational platform was modified.

## Documentation integration - 18 October 2026

- Ten Node checks pass across 57 generated localized pages, including all 36 knowledge guides and their internal fragments.
- Documentation and templates are read from the pinned `kolmeia-dataecosystems/kdv-framework` main commit recorded in `knowledge/source.json`.
- The original hero, honeycomb, layer presentation and model anatomy drawing are byte-identical at their source-function boundaries. Existing global design rules were retained; documentation styles are additions scoped to the new section.
- The knowledge repository CI completed successfully. GitHub confirmed main protection, required CODEOWNER review, an approval count of one, fresh review after pushes, checks, guardian-only push restrictions, administrator enforcement and disabled force pushes/deletion.
- Browser: guide filtering matched existing titles/descriptions; opening a guide preserved navigation and showed source/edit links at the pinned revision.
- Single-guardian independent-review limitation is documented in both repositories and the community guide.
- Knowledge merges do not automatically deploy the website. Synchronization and publication are explicit release steps; no new scheduled automation or cross-repository secret was created.

- Browser mobile review: 375 px Portuguese documentation index, English anatomy and Spanish contract guide fitted their columns; the guide navigation expanded correctly.
- Accent-insensitive filtering matched `evidencias` to `Evidências e melhoria`; switching language retained the selected guide.

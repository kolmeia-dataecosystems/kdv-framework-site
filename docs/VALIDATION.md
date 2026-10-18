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

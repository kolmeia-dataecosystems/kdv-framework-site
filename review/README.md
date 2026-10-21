# Historical v1.1 review preview

This is the owner's requested complete, navigable proposal for deciding the next edition. It is not the accepted framework release and does not deploy `kdvframework.org`.

- English: `/en/` (also the root).
- Brazilian Portuguese: `/pt-br/`.
- European Portuguese: `/pt/`, preserving existing URLs.
- Spanish: `/es/`.

The complete preview includes 92 localized pages, 60 guides, 20 editable Markdown templates, evidence worksheet downloads and original responsive diagrams. All four language editions cover the same routes. The normal build now uses accepted Framework 1.1.0 in four languages from `knowledge/`; the review build explicitly uses `review/knowledge/` and marks every page as a proposal, with noindex metadata.

## Run

```sh
npm run preview:check
npm run preview
```

Open `http://127.0.0.1:4174/pt-br/`. Only one local server may use that port at a time. `preview-dist/` is generated and ignored; `dist/` remains the production build.

## Knowledge source

Edit proposed Markdown, translations, templates and SVGs in the separate framework repository's review branch. Those changes are proposed through its guarded PR. The review snapshot here is a review bundle, not a second editorial authority. To refresh it deliberately from the local proposal checkout:

```sh
node scripts/sync-review.mjs --source-dir ../kdv-framework
npm run preview:check
```

This helper accepts a local `codex/` proposal branch, records its commit and whether it has uncommitted changes, copies only allowed regular files, and never executes scripts from that repository. The normal `knowledge:sync` remains main-only and does not use the review snapshot. A proposed source commit is not an accepted release.

## Acceptance and publication

Evaluate the preview first. The owner approved the complete preview on 21 October 2026. The coordinated release promotes that experience into the normal production build after explicit main-only synchronization. This directory retains the earlier proposal snapshot and its noindex/proposal provenance; it is not the production knowledge source. Future proposed changes still require the appropriate guardian acceptance and publication checks.

The existing owner-private Sites host may serve this proposal for review with its original audience retained. It is separate from public Hostinger production. No main protection, access policy or official release is changed by showing a preview.

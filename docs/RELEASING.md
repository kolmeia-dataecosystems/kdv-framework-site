# Website releases

## Baseline and next version

The owner designated the current website as **v1.0.0** on 21 October 2026, preserving commit `9dafad188e419a0019177289e168b06e9bd938f5`. Its original package and text retain the historical 0.1 labels. See [the baseline release](https://github.com/kolmeia-dataecosystems/kdv-framework-site/releases/tag/v1.0.0).

That baseline includes [Framework v1.0.0](https://github.com/kolmeia-dataecosystems/kdv-framework/releases/tag/v1.0.0), accepted knowledge commit `498c0f3fc5a52770c06a8088858baebf3b0f20cc`. Version 1 is a historical reference, not a certification or product readiness claim.

The working website version is **1.1.0-dev.1**, targeting **1.1.0**. This branch prepares release identification; it does not deliver all the team's proposed content changes. The separate [knowledge release plan](https://github.com/kolmeia-dataecosystems/kdv-framework/pulls) tracks the proposal. A final release date has not been set.

## Version contract

`package.json.version` and `release.json.version` identify website code/presentation. `release.json.knowledge` identifies the included framework version, its historical editorial label, tag and exact accepted commit. `knowledge/source.json` remains the import provenance; do not modify the imported knowledge to fake a released edition.

The localized `/{language}/releases/` page and footer show these separately. A development label must remain visible in development builds. Once a release is complete, replace development copy with a description of what was actually delivered; do not leave an obsolete plan on the final release page.

Use PATCH for compatible fixes, MINOR for compatible additions, and MAJOR for incompatible routes or interactions without a migration path. Framework conceptual changes follow that repository's own compatibility decision. The two numbers may differ. The `v1` in sharing-card filenames versions artwork and is independent of these releases.

## Release sequence

1. Complete and review the agreed changes. For knowledge work, obtain acceptance into the independent repository's protected `main`; never import an unreviewed branch. Do not change the original visual identity unnecessarily.
2. Confirm the exact stable framework tag and accepted commit. `npm run knowledge:sync` imports main only; review the result and confirm it matches the intended framework release. Synchronizing does not deploy or release anything.
3. Update `release.json.knowledge` to that version, tag, commit and editorial edition. The build fails if the public release metadata disagrees with the imported snapshot. The one explicit 0.1-to-1.0.0 mapping applies only to the historical baseline commit.
4. Align website package/release versions and status, translated release-page copy and `CHANGELOG.md`. Use `-dev.N` during development and `-rc.N` only for complete release candidates. Set `stable` and the final version only when the release is ready; stable metadata rejects prerelease knowledge.
5. Run `npm run check`; review desktop/mobile output, version links, source links and downloads. Commit generated `dist/` from those exact inputs. Verify a reproducible build leaves no uncommitted generated differences.
6. Merge the reviewed website changes into main for the existing Hostinger Git deployment. **The production deployment follows main, not a GitHub Release event.** Keep development PRs in draft until the complete publication scope is ready. The owner-private Sites preview is a separate host and must keep its audience and identity.
7. Tag the exact accepted website commit and create GitHub release notes with the included framework version and commit, significant changes, compatibility, tests and remaining limits. A draft or prerelease must not be presented as a final edition. Tags must not be moved or reused.
8. Verify the Hostinger deployment at `https://kdvframework.org`, including release indication and documentation provenance. Record any deployment failure separately from the GitHub release state.

## Next-edition acceptance

- [ ] Agreed clarity, documentation, adoption and reference changes reviewed in their authoritative repositories.
- [ ] Revised resources, examples, formulas, translations and accessibility checked.
- [ ] Framework accepted and released; exact version/commit imported explicitly.
- [ ] Version indication and localized notes describe delivered changes accurately.
- [ ] Existing URLs, English default and framework independence preserved.
- [ ] Full build/tests and generated-output check pass.
- [ ] Review complete before main triggers production deployment.
- [ ] Final GitHub release and live Hostinger result verified separately.

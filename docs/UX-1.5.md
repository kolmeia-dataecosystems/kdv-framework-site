# Website 1.5 UX decisions

26 October 2026 · website `1.5.0` · accepted Framework `1.2.0`.

## Scope

Local work on `feat/home-visual`. No branch change, staging, commit, push, merge or production publication. Package, release manifest, README, changelog, localized release pages and generated assets identify 1.5.0. The accepted knowledge revision remains `57bc85be294170be1f419629ed241d302530d4d9`.

The hero and its vocabulary honeycomb, reference strip and “Choose your starting point” reader/organization selector retain their structure and copy. Imported knowledge, full guides and resources are unchanged. Existing 1.4 home text is reused; the only additional home labels repeat the three existing examples of local choices, translated in all four locales.

## Decisions

| Section | Presentation and behavior |
| --- | --- |
| Four stages | One section keeps the former inline section title and introduction. Its four hexagons are a tablist beside the complete stage panel. The selected stage is inverted using paired theme tokens. Arrows wrap in both directions; Home/End select the endpoints; one tab participates in sequential focus. Panels retain entry condition, practices, evidence, participants, detail action and Playbook link. The old `#ciclo` fragment remains an alias inside `#como`. |
| Automatic cycle | The existing 2500 ms interval runs only before interaction. Pointer entry/down, focus anywhere in the section, clicking and arrow navigation stop it permanently. Hidden documents suspend scheduling; reduced motion disables it, including preference changes. The pause control is removed because interaction stops cycling. Automatic changes do not move focus or overwrite a live region. |
| Five common items | Five prominent hexagonal icon badges sit between subdued labels for role names, approval flows and review rhythm. Each native details/summary reveals the existing why, verification and evidence, plus the existing model destination. Keyboard focus opens the detail; pointer activation retains native toggling. No item text is removed. The baseline container explicitly resets the historical dark-band collision, and nested model links reset the historical baseline-button card styling. |
| What KDV does | An ordered sequence keeps all three existing titles, text and internal concept links. Each step has a shared stroke icon; arrow connectors indicate reading order. Desktop is horizontal; mobile is vertical. |
| Terminology | A semantic definition list presents two connected sides per pair, with supporting description, example and analogy below. Hover/focus on either side highlights the same connector. Existing example/analogy controls remain; a labeled, accent-insensitive local search filters complete pairs, including their supporting text. The lifecycle pair remains present. Both support variants are emitted into build HTML; JavaScript initially selects examples. |
| Where to start | Fieldsets and native radios become chips, retaining native keyboard behavior and a visible focus ring. The live result becomes a profile card with decorative one/three/seven-hexagon scale artwork. Build and browser share the scale function. Profile selection, readings, meaning and optional-product note retain the approved rules and wording. No answers are stored or submitted. |

## Progressive rendering, motion and themes

All four stage panels, all five badge details, all seven terminology pairs and both supporting variants are in generated HTML. With JavaScript disabled, stage panels remain readable, badges use native disclosures, both terminology explanations are visible, and the default Solo card and existing no-JavaScript explanation remain available. Definition-list semantics provide the accessible terminology version without maintaining a duplicate hidden table.

The new CSS uses existing color tokens only. Selected/hovered badges and selected chips/hexagons explicitly pair `--invert` and `--on-invert`; muted text remains outside inverted areas. Hover reactions use .2 s and existing reveals use .5 s. Reduced-motion rules suppress transitions and reveals. Responsive grids use shrinkable columns, wrapped labels and vertical mobile arrangements; these rules have not been visually certified at any viewport in this environment.

## Validation and limits

`npm run check` passes 38 tests and rebuilds 100 localized pages plus the English root. Six added tests cover ARIA tab/panel relationships, actual browser-module arrow/Home/End events and focus movement, permanent cycle cancellation, reduced-motion changes, all stage/badge/chain/terminology text in generated HTML, representative profile cards/readings and one/three/seven-icon scales, and foreground/background token contrast in light/dark and inverted states. Existing tests cover all nine profile combinations, links/fragments, guide provenance, glyph-free icons and script syntax/local-only behavior. `git diff --check` passes.

The browser behavior tests execute the real interaction module against an event-surface fixture, not a real browser DOM. Contrast checks calculate token-pair luminance; they do not prove the final rendered CSS cascade. Browser QA was attempted: HTTP binding to 127.0.0.1 was denied by the sandbox (`Operation not permitted`), browser window creation was unsupported, and native Chrome access was denied. No permission escalation was attempted.

Consequently, 390/768/1024/1380 px rendering, absence of horizontal scrolling, visual contrast in both themes and hover/focus states, actual native radio/disclosure behavior, pointer geometry, screenshots and screen-reader announcements remain unverified. These are explicit local review limits, not passed checks. No production publication occurred.

# Website 1.3 UX decisions

26 October 2026 · website `1.3.0` · accepted Framework `1.2.0`.

## Scope and source boundary

The owner approved six progressive enhancements to the public website. The work stays on `feat/ux-dinamica`; merging into main remains the production publication boundary. No push or deployment is part of this change. The accepted knowledge snapshot and its exact revision remain unchanged.

New interface copy lives in `src/ux/data/{en,pt-br,pt,es}.json`. The site remains dependency-free. New visual states use the existing theme tokens. Card reactions take `.2s`; entrances and stage transitions take `.5s ease`, with translations of at most 12 px per element (3 px for arrows).

## Decisions

| Concern | Implementation |
| --- | --- |
| Home lifecycle | The previous home artwork actually linked six anatomy concepts. Its home presentation now uses four linked stage hexagons: Cultivate → Govern → Share → Activate. Existing stage phrases appear below in a polite live region. A 2.5-second timer pauses on hover, stage focus, hidden tabs, reduced motion and an explicit pause toggle. Stage links retain normal navigation to the playbook. |
| Anatomy assembly | The existing model explorer uses nested `.anat` / `.box` elements, rather than a pre-existing `.anatomy-tree`. IntersectionObserver adds the latter class and reveals semantic levels with 100 ms offsets, once. Containers fade; only labels translate, so nesting does not multiply movement. Existing business hierarchy, optional Comb membership and separate Farm execution view are preserved. User-driven explorer redraws remain immediately visible. |
| Starting point | “Where do I start?” sits on the home page immediately after reader/organisation identification, before the value proposition. This keeps discovery and the next reading action together without adding an extra navigation step. Three native radio groups use fieldset/legend and update a polite, atomic result. The exact approved rule selects Solo, Team or Organization; the goal selects three existing accepted guides. Rule functions are shared by build and browser. The result links to the existing KDV institutional destination as an optional product implementation, explicitly stating purchase is unnecessary. |
| Section and card motion | Sections, guides, native lists and current catalogue cards reveal once on entering the viewport. Content already above the fold stays visible. Focus reveals pending ancestors immediately. Hover and focus share card backgrounds and arrow reactions. Both requested historical selectors and current `.cell.click` / resource articles are covered. |
| Documentation | The build estimates reading time from rendered article words at 200 words/minute, rounded up with a one-minute minimum, near provenance. A thin `--ink` progress line follows the article below the sticky header and is aria-hidden. H2/H3 copy buttons have descriptive accessible names, keyboard/touch visibility, clipboard → legacy copy → manual URL prompt fallback and a polite status. Documentation navigation reinitialises these tools after replacing main. |
| Mobile CTA | At widths up to 700 px, institutional pages reuse the home `cta1` and its `#voce` destination (localized home URL from other pages). IntersectionObserver shows it after the hero and hides it while the destination or footer is visible. Body padding follows the button height and safe-area inset. Documentation has no mobile CTA. |
| Privacy | Questionnaire choices are transient: no storage, analytics, submission or service call. Existing theme/profile preferences remain the only persistent application data. |
| Progressive enhancement | No JavaScript: static stage links, all model/section content, reading estimates, default reading suggestion and guide links remain available. The rule and a localized no-JavaScript note explain the static suggestion. No observer support: content stays visible. Reduced motion: no automatic cycle, transitions or entrances; pending content is immediately revealed, including when the preference changes during the session. |

## Deliberate limits

- No automatic concept-panel switching during the anatomy animation: it would overwrite the reader's chosen concept and its live region. Farm remains an execution environment, not a child of a product. The existing view selector retains access to it.
- No remembered questionnaire choice, new library, knowledge edit, push or production publication.
- The reading estimate is a simple word-based guide, not measured individual reading speed. Clipboard fallback only confirms success when copying actually succeeds; otherwise the URL is offered for manual copying.

## Validation

`npm run check` builds all 100 localized pages plus the English root and passes 27 tests. Added checks cover all nine team/maturity combinations, guide destinations for each goal in all four locales, reading-time rounding at 200/201/400 words, HTML exclusion, complete localized helper-copy structure and generated stage/selector/reading-time markup. Existing checks cover internal links/fragments, semantic IDs, source provenance, theme/brand assets and local interaction boundaries, now including the new scripts. JavaScript syntax and `git diff --check` are also checked.

Visual browser QA could not be completed in this workspace: local server binding was denied (`Operation not permitted`), and the installed browser could not launch in the sandbox. No desktop/mobile, clipboard, assistive-technology or timing observations are claimed as performed. These interactive checks remain a review limitation before publication; static and rule tests do not replace them.

## Publication

Package/release labels, README, English changelog, localized release-page heading/summary and generated output identify website 1.3.0. Framework remains 1.2.0 at the same accepted revision. This branch is intended for local review and commit only.

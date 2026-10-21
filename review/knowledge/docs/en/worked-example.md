# Worked example across two public-interest contexts

From dispersed sources to municipal planning and traceable professional inspection.

## A municipality facing dispersed information

A fictional municipality plans maintenance, social support and citizen services using separate systems. Departmental figures cover different periods and geographies. The practical question is where demand is increasing before the next planning meeting, rather than how to copy every operational database into one system.

Start with one planning decision and a bounded product: weekly service pressure by neighbourhood, service category and reference period. Agree the geographic definition, observation window, completeness, update frequency and suppression of groups that could expose individuals. Each contributing domain remains responsible for the meaning and authorised use of its source.

The consumer sees both the indicator and its limitations. A missing department or a late source must remain visible; absence is not zero demand. Operational follow-up uses a separate authorised workflow. An aggregated planning product does not grant access to identifiable service records.

## A professional council preparing inspections

A fictional council needs current information from internal registrations, complaints and authorised external sources. Its use cases are different: an analytical product helps prioritise inspections, while a restricted operational view helps a qualified reviewer examine an individual case. A possible data match is an alert for validation, not proof of an infringement or automatic authority to impose a sanction.

## Preparation and responsibilities

The inspection domain owner sponsors the scope. A product owner is accountable for the agreement and consumers. A steward maintains definitions and matching rules. Engineering prepares a reproducible delivery. The custodian implements authorised access. Privacy and legal specialists advise on applicable duties; they do not automatically replace the organisation’s decision authority.

| Decision | Working agreement | Evidence |
| --- | --- | --- |
| Which sources may be used? | Record purpose, authority, permitted scope and update conditions per source. | Source inventory and retrieval reference. |
| What constitutes a potential match? | Define keys, confidence, false-positive handling and human review. | Versioned rule and validation sample. |
| Who may see a case? | Authorise a scoped consumer role with expiry and review. | Owner decision and policy implementation record. |
| What may trigger individual action? | Apply the competent authority’s procedure after evidence validation. | Human decision, supporting evidence and correction path. |

## Cultivate

Inventory sources and their restrictions before collecting data. Record provenance, retrieval date, reference period and failures. Prefer stable identifiers where authorised; do not hide ambiguous matches. Keep a reproducible preparation recipe and an explicit failed-update state. The first artefact is a source inventory, not a promise of complete coverage.

## Govern

Agree the product’s meaning, purpose, roles, quality rules and allowed consumers. Version the matching logic and assess its limitations. Define both technical and human review: a valid schema does not establish that a claim about a person is true. Set correction, retention and incident paths with the responsible organisation.

## Share

Publish a discoverable contract and separate interfaces for aggregate planning and restricted case work. A steward checks the request; the authorised owner approves, rejects or escalates it; only then does the custodian implement an approved scope. Record the expiry, review date and verification of enforcement. Escalation returns a decision before implementation.

## Activate and learn

Use the planning product to select inspection priorities, then validate each operational case with competent people and applicable procedure. Record corrections and false positives, whether the source was current, and whether the product helped the agreed decision. Improve the rule or withdraw an unsuitable product. A dashboard or model never substitutes for the necessary authority and due process.

## Measures with direction

| Indicator | Illustrative target | Observation | Interpretation |
| --- | --- | --- | --- |
| Source freshness | Age <= 24 hours | 30 hours | Outside the agreed target. |
| Validated completeness | Rate >= 98% | 99% | Within this target, not proof of every quality dimension. |
| Access lead time | Days <= 2 | 5 days | Outside the target; examine review and implementation delays. |
| False-positive rate | Define with the accountable team | Not measured | Missing evidence, not a successful result. |

Targets above are fictional examples. The organisation must define realistic thresholds, sampling, units and periods; no result or implementation timetable is promised.

## Working artefacts

Use the domain charter, product contract, decision record, access review and evidence register from the resource library. The same product may expose an API, a dataset and a dashboard, but each interface must respect its agreed purpose and policy.

## Continue reading

- [Getting started](start-here.md)
- [Data product agreements](data-contracts.md)
- [Access and exceptions](access-and-exceptions.md)
- [Evidence and improvement](evidence.md)

---

Original KDV knowledge. Proposed community edition 1.1 for review; not an accepted release. CC BY 4.0. Third-party rights remain reserved.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

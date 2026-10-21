# The data lifecycle

Entry conditions, participants, controls and evidence in four stages.

## Purpose

Start small. Define a purpose, follow the four stages and use feedback to improve the next iteration.

## Cultivate / Prepare with purpose.

**Entry condition:** A defined use case and identified source.

**Accountable participants:** Product owner + data engineering

**Working practices:** Connect sources; document provenance; prepare data; establish reproducible delivery.

**Evidence to keep:** Source inventory, transformation record and initial quality checks.

**Decision gate:** The source is authorised and the output can be explained.

**Example measures:** Source coverage and delivery failures.

## Govern / Make trust actionable.

**Entry condition:** Prepared data with a proposed meaning and use.

**Accountable participants:** Steward + product owner + domain owner

**Working practices:** Agree definitions, classification, quality thresholds, permitted uses and decision rights.

**Evidence to keep:** Glossary, versioned contract, quality results and policy decisions.

**Decision gate:** Ownership, terms and quality expectations have been reviewed.

**Example measures:** Ownership coverage and quality exceptions.

## Share / Publish an agreement.

**Entry condition:** An approved product and a clear audience.

**Accountable participants:** Product owner + steward + technical custodian

**Working practices:** Publish metadata and terms; review access requests; apply controls; communicate changes.

**Evidence to keep:** Published contract, approval record, access policy and version history.

**Decision gate:** The intended consumer can discover and access the authorised version.

**Example measures:** Access lead time and contract adoption.

## Activate / Observe the value.

**Entry condition:** An authorised consumer and an agreed purpose.

**Accountable participants:** Consumer + product owner

**Working practices:** Use the product in analytics, applications or AI; monitor outcomes; report issues; review continued use.

**Evidence to keep:** Usage record, outcome indicator, issue log and improvement decision.

**Decision gate:** Value and limitations are reviewed; improvement or retirement is decided.

**Example measures:** Use against purpose, incidents and value indicator.

## Synthetic example

A fictional service-planning team needs a weekly aggregate of requests. The service domain owns the meaning; a subdomain team prepares the data; a product owner agrees freshness and allowed use. The first release is an internal aggregate, not a copy of identifiable source records. The team records quality results and reviews whether the product supports the intended planning decision.

## Continue reading

- [Worked example across two public-interest contexts](worked-example.md)
- [Applying the model](implementation.md)

---

Original KDV knowledge. Community edition 1.1.0. CC BY 4.0. Third-party rights remain reserved.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

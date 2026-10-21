# AI and privacy in the operating model

Turn intended use, risk and individual rights into explicit operational decisions.

## Start with the intended use

A product suitable for a dashboard is not automatically suitable for model training, retrieval, automated decisions or use by an external AI provider. Record the purpose, consumer, data scope, outputs and authority for the proposed use. Check provenance and quality for that context, including uncertainty and limitations.

## Operating decisions

| Question | Record before use | Review trigger |
| --- | --- | --- |
| What may be processed? | Purpose, data categories, authorised sources and applicable lawful-processing grounds. | New purpose, source or consumer. |
| Who can decide? | Organisational controller/processor roles, product authority and specialist advice. | Change in responsibility or provider. |
| What is necessary? | Minimised input, scoped retrieval and restricted output. | More data, broader access or new derived attributes. |
| What happens later? | Retention, deletion, access review, correction and incident paths. | Expiry, request, failure or end of purpose. |

Language selection does not determine whether Brazilian LGPD, European GDPR or another regime applies. Assess the actual processing context. A data owner inside the framework is not automatically the legal controller, and a technical custodian is not automatically a legal processor. Record the real legal and contractual roles.

## Privacy and accountability

Embed privacy decisions in the contract and delivery workflow. The accountable organisation decides and demonstrates compliance; the DPO or privacy specialist advises within the applicable role. Consider an impact assessment where the risk and applicable rules call for one. Hosting location alone does not establish sovereignty or lawful international transfers.

## AI-specific checks

- Verify whether a provider retains inputs, trains on them, or uses subprocessors, and agree the relevant terms.
- Preserve source permissions in retrieval and derived outputs. A successful connector does not authorise every use.
- Evaluate groundedness, misleading answers, leakage and harmful failure modes with an explicit test set and accountable reviewer.
- Keep logs proportionate and protected. Evidence should not become an unnecessary copy of sensitive prompts or source records.
- Define human oversight and a way to challenge or correct consequential results. Do not turn a match or a model score into automatic proof about a person.
- Reassess after changes to model, prompt, sources, purpose or deployment. Technical monitoring and organisational review complement each other.

## Sources and limits

This is original operating guidance, not a jurisdiction-specific legal opinion or a compliance guarantee. Validate applicable duties with competent professionals and the official sources.

- [Brazilian LGPD consolidated text](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm)
- [ANPD guidance for individuals](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados)
- [EDPB guidance on protection by design](https://www.edpb.europa.eu/topics/ai-and-technology/privacy-by-design-and-by-default_en)
- [EDPB guidance on the DPO role](https://www.edpb.europa.eu/sme/be-compliant/data-protection-officer_en)

## Continue reading

- [Data product agreements](data-contracts.md)
- [Access and exceptions](access-and-exceptions.md)
- [Reference implementation choices](reference-architecture.md)

---

Original KDV knowledge. Proposed community edition 1.1 for review; not an accepted release. CC BY 4.0. Third-party rights remain reserved.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

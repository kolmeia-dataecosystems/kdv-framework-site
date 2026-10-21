# Reference implementation choices

Separate business responsibilities, reusable controls and deployment choices.

## Three viable starting points

Apply the model manually in a bounded first case, connect it to an existing platform, or use a suitable reference implementation. The baseline does not require a KDV platform or a specific lakehouse. Select technology after the purpose, responsible roles, control requirements and operating limits are understood.

## Business and execution planes

A domain owns meaning and decisions; a subdomain organises work close to the data; a product makes an accountable offering available. An execution environment hosts the relevant workloads. Do not force the domain structure to follow a department chart or a server naming convention. The optional Comb groups Cells within one Hive and does not become another infrastructure layer.

## Capabilities before product names

| Capability | Implementation question | Example evidence |
| --- | --- | --- |
| Identity and entitlement | How is the consumer identified and the approved scope enforced? | Identity reference, authorised policy and expiry verification. |
| Catalogue and semantics | How can consumers discover purpose, definitions and limitations? | Published contract, glossary and lineage. |
| Quality and delivery | How are tests, updates and failures made visible? | Reproducible delivery, quality results and failure path. |
| Execution and recovery | Where does the workload run and how is service recovered? | Environment inventory, backup and recovery exercise. |
| Observability and audit | Which events demonstrate operation without overcollecting personal data? | Protected records, retention rules and review. |

## Illustrative tool options

OpenMetadata for catalogue discussions; Keycloak for identity; Apache Ranger for supported policy enforcement; OpenLineage for lineage; Airflow for orchestration; dbt Core for transformation workflows; Trino and Apache Iceberg for suitable analytical architectures; Superset for visual consumption. These are options to evaluate, not an integrated or universally sufficient distribution.

Check component versions, licences, maintenance, compatibility and support boundaries at selection time. A tool’s availability does not demonstrate that a KDV-specific integration is delivered or that the entire product stack is open source.

## Framework and KDV offerings

KDV Framework is open knowledge. Kolmeia is the open-source approach under development; installer/distribution scope requires its own versioned inventory and licence decision. KDV Studio, Cloud, interaction perspectives and managed services are optional implementations. Do not infer product readiness, licensing or deployment guarantees from this operating model.

## Sovereignty and portability

Record control over purpose and permissions, jurisdiction, provider responsibilities, export paths, key management, recovery and exit conditions. Keeping data in a client environment can be one design choice; it is not the entire definition of sovereignty. Common metadata also needs appropriate protection and a documented scope.

## Adoption and review

Start with one product and validate the end-to-end operating decision before broad automation. Use an architecture decision record for significant trade-offs. Demonstrate an access refusal as well as a successful authorised path, test a failed update, and verify recovery and evidence export. Extend only when these controls and responsibilities can be sustained.

## Continue reading

- [Applying the model](implementation.md)
- [Worked example](worked-example.md)
- [AI and privacy](ai-privacy.md)

---

Original KDV knowledge. Community edition 1.1.0. CC BY 4.0. Third-party rights remain reserved.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

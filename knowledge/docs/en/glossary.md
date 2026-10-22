# Shared glossary

A compact vocabulary for consistent discussions.

## Purpose

The metaphor helps explain the model. It does not replace an organisation’s terminology or assign human roles based on bee biology.

## Ecosystem / Shared purpose

The boundary of collaboration: objectives, participating domains, common policies and accountable governance. Start with a use case and a named sponsor.

## Hive / Business domain

A domain with an accountable owner, its own meaning and priorities. It coordinates its Cells while respecting the ecosystem’s minimum rules.

## Cell / Business subdomain

A focused subdomain inside a Hive. Stewardship and engineering work close to the data. A Cell can own several data products; the Cell is not itself a product.

## Comb / Business grouping

An optional grouping of Cells within the same Hive. A Cell may belong to several Combs. This is a business and permission grouping, not an extra infrastructure layer.

## Data product / An accountable offering

A purposeful offering with a named owner, versioned contract, known consumers, quality expectations and a lifecycle. Tables, APIs and dashboards can be delivery interfaces.

## Farm / Execution environment

Where products are cultivated and operated: production, test or development environments. The Farm is an execution boundary, distinct from business ownership.

## Accountability

- **Governance forum:** Sets the baseline, reviews cross-domain exceptions and resolves conflicts.
- **Ecosystem manager:** Coordinates implementation, scope, policy versions and improvement follow-up.
- **Domain owner:** Accountable for the domain and escalated approval decisions.
- **Subdomain owner:** Accountable for the subdomain and its approval decisions.
- **Data product owner:** Owns purpose, contract, versions, publication and consumer relationships.
- **Operational steward:** Maintains meaning, classification and quality; reviews requests.
- **Coordinating steward:** Coordinates stewardship and resolves issues across Cells.
- **Data engineering:** Builds and maintains reproducible data preparation and delivery.
- **Technical custodian:** Operates environments and implements authorised controls.
- **Data discovery and consumption portal:** Uses data within agreed terms and provides feedback on fitness for purpose.

## Scope and limitations

KDV adds an original operating interpretation. DAMA-DMBOK and DCAM material is not redistributed. References do not imply endorsement, affiliation, certification or an official mapping.

## Continue reading

- [Worked example across two public-interest contexts](worked-example.md)
- [Applying the model](implementation.md)


## Supporting technical capabilities

Use these functional names when discussing requirements. They identify the required capability without prescribing a vendor or a tool. A single product may combine several capabilities, and one capability may use several components.

| Functional concept | What it does |
| --- | --- |
| Object storage | Object storage (lake) |
| Open analytical table format | Organises analytical tables over object storage so compatible engines can read and write them. |
| Technical table catalogue | Records table metadata and locations for discovery by query and processing engines. |
| ETL/ELT pipeline orchestration | Pipelines with quality and lineage |
| Data catalogue and governance | Catalogue, glossary, lineage and quality |
| Access policy management | Policy-based authorisation and access audit |
| Entity resolution and record matching | Master data: matching across registers |
| Distributed SQL query engine | Query engine, one per environment |
| API management | APIs and subscriptions |
| Business intelligence and data visualisation | Dashboards and visual analysis |
| Data services for applications and AI | Data services for applications and AI assistants |
| Metrics collection and querying | Collects and stores time-series metrics for service and infrastructure monitoring. |
| Log aggregation and querying | Collects and searches service logs to investigate events and failures. |
| Distributed tracing | Records request paths across multiple services to investigate execution and latency. |
| Observability dashboards | Presents metrics, logs and traces to support operational review. |
| Identity and authentication management | Manages identities, authentication and single sign-on for applications. |
| Directory service | Stores and provides identity records and user attributes. |
| Secrets management | Secrets vault |
| Relational database | Register of hierarchy, contracts, grants and audit |

## Functional areas that support the operating model

| Functional concept | What it does |
| --- | --- |
| Data discovery and consumption portal | Catalogue, time-limited access requests, contract reading and tracking of grants. |
| Data product management and publishing | Domains, subdomains, contracts, versions, quality and decisions on access requests. |
| Data ecosystem governance console | Common policies, governance profiles, roles, forum decisions and indicators. |
| Data platform operations console | Environments, services, alerts, certificates and secrets, without showing their values. |
| Data service desk | Common desk for questions, problems and data incidents. |
| Platform integration adapters | Connect the model to the chosen tools, without separate product versions. |

---

Original KDV knowledge. Community edition 1.2.0. CC BY 4.0. Third-party rights remain reserved.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

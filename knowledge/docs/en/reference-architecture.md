# Reference implementation choices

Separate business responsibilities, reusable controls and deployment choices.

## Capabilities before technologies

Start from the use case, decision rights and evidence. Describe the capabilities required to deliver and operate the data product before choosing technologies. The operating model can be supported by existing systems, multiple integrated tools or controlled manual practices.

| Functional concept | What it does |
| --- | --- |
| Object storage | Object storage (lake) |
| Open table format and technical catalogue | Open table format and table catalogue |
| ETL/ELT pipeline orchestration | Pipelines with quality and lineage |
| Data catalogue and governance | Catalogue, glossary, lineage and quality |
| Access policy management | Policy-based authorisation and access audit |
| Entity resolution and record matching | Master data: matching across registers |
| Distributed SQL query engine | Query engine, one per environment |
| API management | APIs and subscriptions |
| Business intelligence and data visualisation | Dashboards and visual analysis |
| Data services for applications and AI | Data services for applications and AI assistants |
| Service observability | Observability and operational evidence |
| Identity, authentication and directory | Identity and single sign-on |
| Secrets management | Secrets vault |
| Relational database | Register of hierarchy, contracts, grants and audit |

## Interfaces support responsibilities

The functional areas for discovery and consumption, product publishing, ecosystem governance, platform operations, service desk and integration support the business roles. They do not replace the accountable domain, subdomain or product owner.

## Selection criteria

Evaluate interoperability, identity integration, access enforcement, recoverable evidence, accessibility, portability and operational support. Select components against these requirements rather than treating a stack as a requirement of the Framework.

## Optional implementation example

KDV Studio/Cloud is one example of software bringing together the modules needed to support KDV: consumption, publishing, ecosystem governance, platform operations, service desk and integrations. It is optional; the Framework can be applied with other tools. This example is not a purchasing recommendation.

The example describes an arrangement of capabilities, not a universal availability or licensing commitment. Confirm the deployed version, scope and evidence before relying on a control.

## Continue reading

[Playbook](lifecycle.md) · [Supporting technical capabilities](glossary.md) · [Capabilities that support the work.](responsibilities.md)

---

KDV Framework · Community edition 1.2.0 · CC BY 4.0.

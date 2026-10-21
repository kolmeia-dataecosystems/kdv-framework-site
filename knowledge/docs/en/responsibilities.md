# Roles and decision rights

Assign accountability independently of product interfaces.

## Purpose

A person may hold several roles. Record the role exercised for each decision. Consumer, Producer, EcOps and PlatOps are product interaction perspectives, not substitutes for business accountability.

## Governance forum

**Scope:** Ecosystem.

Sets the baseline, reviews cross-domain exceptions and resolves conflicts.

**Reference interface:** EcOps records decisions.

## Ecosystem manager

**Scope:** Ecosystem.

Coordinates implementation, scope, policy versions and improvement follow-up.

**Reference interface:** EcOps.

## Domain owner

**Scope:** Hive.

Accountable for the domain and escalated approval decisions.

**Reference interface:** EcOps / Producer.

## Subdomain owner

**Scope:** Cell.

Accountable for the subdomain and its approval decisions.

**Reference interface:** Producer.

## Data product owner

**Scope:** Product.

Owns purpose, contract, versions, publication and consumer relationships.

**Reference interface:** Producer.

## Operational steward

**Scope:** Cell; optionally Hive.

Maintains meaning, classification and quality; reviews requests.

**Reference interface:** Producer / EcOps.

## Coordinating steward

**Scope:** Hive.

Coordinates stewardship and resolves issues across Cells.

**Reference interface:** EcOps.

## Data engineering

**Scope:** Cell; optionally Hive.

Builds and maintains reproducible data preparation and delivery.

**Reference interface:** Producer.

## Technical custodian

**Scope:** Farm.

Operates environments and implements authorised controls.

**Reference interface:** PlatOps / EcOps.

## Consumer

**Scope:** Product.

Uses data within agreed terms and provides feedback on fitness for purpose.

**Reference interface:** Consumer.

## Scope and limitations

When no subdomain owner is assigned, make the domain owner’s inherited responsibility explicit. A Comb may group permissions without creating a new role. Exact segregation of duties depends on risk and context.

## Continue reading

- [Worked example across two public-interest contexts](worked-example.md)
- [Applying the model](implementation.md)

---

Original KDV knowledge. Community edition 1.1.0. CC BY 4.0. Third-party rights remain reserved.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

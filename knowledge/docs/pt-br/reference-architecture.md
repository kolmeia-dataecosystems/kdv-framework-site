# Escolhas de implementação de referência

Separe responsabilidades de negócio, controles reutilizáveis e escolhas de implantação.

## Capacidades antes de tecnologias

Comece pelo caso de uso, pelos direitos de decisão e pelas evidências. Descreva as capacidades necessárias para entregar e operar o produto de dados antes de escolher tecnologias. O modelo operacional pode ser atendido por sistemas existentes, ferramentas integradas ou práticas manuais controladas.

| Conceito funcional | O que faz |
| --- | --- |
| Armazenamento de objetos | Armazenamento de objetos (lake) |
| Formato aberto e catálogo técnico de tabelas | Formato de tabela aberto e catálogo de tabelas |
| Orquestração de pipelines ETL/ELT | Pipelines com qualidade e linhagem |
| Catálogo de dados e governança | Catálogo, glossário, linhagem e qualidade |
| Gestão de políticas de acesso | Autorização por política e auditoria de acesso |
| Resolução de entidades e correspondência de registros | Dados mestres: correspondência entre cadastros |
| Motor distribuído de consultas SQL | Motor de consulta, um por ambiente |
| Gestão de APIs | APIs e assinaturas |
| BI e visualização de dados | Painéis e análise visual |
| Serviços de dados para aplicações e IA | Serviços de dados para aplicações e assistentes de IA |
| Observabilidade de serviços | Observabilidade e evidência operacional |
| Identidade, autenticação e diretório | Identidade e login único |
| Gestão de segredos | Cofre de segredos |
| Base de dados relacional | Registro de hierarquia, contratos, concessões e auditoria |

## Interfaces apoiam responsabilidades

As áreas funcionais de descoberta e consumo, publicação de produtos, governança do ecossistema, operação da plataforma, atendimento e integração apoiam os papéis de negócio. Elas não substituem o responsável pelo domínio, subdomínio ou produto.

## Critérios de escolha

Avalie interoperabilidade, integração de identidade, aplicação das políticas de acesso, recuperação de evidências, acessibilidade, portabilidade e suporte operacional. Escolha componentes com base nesses requisitos, sem transformar uma stack em requisito do Framework.

## Exemplo opcional de implementação

KDV Studio/Cloud é um exemplo de ferramenta que reúne os módulos necessários para apoiar o KDV: consumo, publicação, governança do ecossistema, operação da plataforma, atendimento e integrações. Seu uso é opcional; o Framework pode ser aplicado com outras ferramentas. Este exemplo não é uma recomendação de contratação.

O exemplo descreve uma organização de capacidades, sem compromisso universal de disponibilidade ou licença. Confirme versão implantada, escopo e evidências antes de depender de um controle.

## Continuar a leitura

[Playbook](lifecycle.md) · [Capacidades técnicas de apoio](glossary.md) · [Capacidades que apoiam o trabalho.](responsibilities.md)

---

KDV Framework · Community edition 1.2.0 · CC BY 4.0.

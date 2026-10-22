# Glossário comum

Um vocabulário compacto para discussões consistentes.

## Propósito

A metáfora ajuda a explicar o modelo. Não substitui os termos da organização nem atribui papéis humanos com base na biologia das abelhas.

## Ecosystem / Propósito comum

O limite da colaboração: objetivos, domínios participantes, políticas comuns e governança responsável. Comece por um caso de uso e um patrocinador identificado.

## Hive / Domínio de negócio

Um domínio com dono responsável, significado e prioridades próprios. Coordena suas Cells e respeita as regras mínimas do ecossistema.

## Cell / Subdomínio de negócio

Um subdomínio dentro de uma Hive. Stewardship e engenharia trabalham perto dos dados. Uma Cell pode ter vários produtos; a Cell não é o produto.

## Comb / Agrupamento de negócio

Agrupamento opcional de Cells da mesma Hive. Uma Cell pode pertencer a vários Combs. É um agrupamento de negócio e permissões, não outra camada de infraestrutura.

## Produto de dados / Uma oferta com responsável

Uma oferta com propósito, dono identificado, contrato versionado, consumidores conhecidos, expectativas de qualidade e ciclo de vida. Tabelas, APIs e dashboards podem ser interfaces de entrega.

## Farm / Ambiente de execução

Onde os produtos são cultivados e operados: produção, teste ou desenvolvimento. A Farm delimita a execução e é distinta da responsabilidade de negócio.

## Responsabilidades

- **Fórum de governança:** Define o baseline, revisa exceções entre domínios e resolve conflitos.
- **Gestor do ecossistema:** Coordena a implantação, o escopo, as versões de políticas e a melhoria.
- **Dono do domínio:** Responde pelo domínio e pelas decisões de aprovação escaladas.
- **Dono do subdomínio:** Responde pelo subdomínio e pelsuas decisões de aprovação.
- **Dono do produto de dados:** Responde pelo propósito, contrato, versões, publicação e relação com consumidores.
- **Steward operacional:** Mantém significado, classificação e qualidade; revisa pedidos.
- **Steward coordenador:** Coordena o stewardship e resolve perguntas entre Cells.
- **Engenharia de dados:** Constrói e mantém preparação e entrega reproduzíveis.
- **Custodiante técnico:** Opera ambientes e implementa controles autorizados.
- **Consumidor:** Usa dados nos termos acordados e dá retorno sobre a adequação ao propósito.

## Escopo e limites

A KDV acrescenta uma interpretação operacional original. Não redistribui conteúdos DAMA-DMBOK ou DCAM. A referência não implica endosso, afiliação, certificação ou mapeamento oficial.

## Continuar a leitura

- [Exemplo completo em dois contextos de interesse público](worked-example.md)
- [Aplicar o modelo](implementation.md)


## Capacidades técnicas de apoio

Use estes nomes funcionais ao discutir requisitos. Eles identificam a capacidade necessária sem prescrever fornecedor ou ferramenta. Um produto pode reunir várias capacidades, e uma capacidade pode depender de vários componentes.

| Conceito funcional | O que faz |
| --- | --- |
| Armazenamento de objetos | Armazenamento de objetos (lake) |
| Formato aberto de tabelas analíticas | Organiza tabelas analíticas sobre armazenamento de objetos para leitura e escrita por mecanismos compatíveis. |
| Catálogo técnico de tabelas | Registra metadados e localização das tabelas para descoberta por mecanismos de consulta e processamento. |
| Orquestração de pipelines ETL/ELT | Pipelines com qualidade e linhagem |
| Catálogo de dados e governança | Catálogo, glossário, linhagem e qualidade |
| Gestão de políticas de acesso | Autorização por política e auditoria de acesso |
| Resolução de entidades e correspondência de registros | Dados mestres: correspondência entre cadastros |
| Motor distribuído de consultas SQL | Motor de consulta, um por ambiente |
| Gestão de APIs | APIs e assinaturas |
| BI e visualização de dados | Painéis e análise visual |
| Serviços de dados para aplicações e IA | Serviços de dados para aplicações e assistentes de IA |
| Coleta e consulta de métricas | Coleta e armazena métricas ao longo do tempo para acompanhar serviços e infraestrutura. |
| Agregação e consulta de logs | Reúne e permite pesquisar logs de serviços para investigar eventos e falhas. |
| Rastreamento distribuído | Registra o percurso das requisições entre serviços para investigar a execução e a latência. |
| Painéis de observabilidade | Apresenta métricas, logs e rastros para apoiar a análise da operação. |
| Gestão de identidade e autenticação | Gerencia identidades, autenticação e início de sessão único para aplicações. |
| Serviço de diretório | Armazena e disponibiliza identidades e atributos de usuários. |
| Gestão de segredos | Cofre de segredos |
| Base de dados relacional | Registro de hierarquia, contratos, concessões e auditoria |

## Áreas funcionais de apoio ao modelo operacional

| Conceito funcional | O que faz |
| --- | --- |
| Portal de descoberta e consumo de dados | Catálogo, pedido de acesso com prazo, leitura do contrato e acompanhamento das concessões. |
| Gestão e publicação de produtos de dados | Domínios, subdomínios, contratos, versões, qualidade e decisão sobre pedidos de acesso. |
| Console de governança do ecossistema | Políticas comuns, perfis de governança, papéis, decisões do fórum e indicadores. |
| Console de operações da plataforma | Ambientes, serviços, alertas, certificados e segredos, sem mostrar os valores. |
| Central de atendimento de dados | Balcão comum para dúvidas, problemas e incidentes de dados. |
| Adaptadores de integração da plataforma | Ligam o modelo às ferramentas escolhidas, sem versões separadas do produto. |

---

Conhecimento original KDV. Edição comunitária 1.2.0. CC BY 4.0. Direitos de terceiros reservados.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

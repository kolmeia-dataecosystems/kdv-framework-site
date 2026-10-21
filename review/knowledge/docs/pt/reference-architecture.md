# Escolhas de implementação de referência

Separe responsabilidades de negócio, controlos reutilizáveis e escolhas de implantação.

## Três pontos de partida viáveis

Aplique o modelo manualmente num primeiro caso delimitado, ligue-o à plataforma existente ou use uma implementação de referência adequada. O baseline não exige uma plataforma KDV ou um lakehouse específico. Selecione tecnologia depois de compreender o propósito, os papéis, os controlos necessários e os limites de operação.

## Planos de negócio e execução

Um domínio responde por significado e decisões; um subdomínio organiza o trabalho perto dos dados; um produto oferece uma entrega com responsável. Um ambiente de execução aloja as cargas relevantes. Não force os domínios a seguir um organograma ou nomes de servidores. O Comb opcional agrupa Cells da mesma Hive, sem se tornar uma camada de infraestrutura.

## Capacidades antes de nomes de produtos

| Capacidade | Pergunta de implementação | Exemplo de evidência |
| --- | --- | --- |
| Identidade e permissões | Como se identifica o consumidor e se aplica o âmbito aprovado? | Referência de identidade, política autorizada e verificação do prazo. |
| Catálogo e semântica | Como se descobrem propósito, definições e limitações? | Contrato, glossário e linhagem publicados. |
| Qualidade e entrega | Como se tornam visíveis testes, atualizações e falhas? | Entrega reproduzível, testes e tratamento de falhas. |
| Execução e recuperação | Onde funciona a carga e como se recupera o serviço? | Inventário, cópia de segurança e ensaio de recuperação. |
| Observabilidade e auditoria | Que eventos demonstram operação sem recolha excessiva de dados pessoais? | Registos protegidos, retenção e revisão. |

## Ferramentas ilustrativas

OpenMetadata para discutir catálogo; Keycloak para identidade; Apache Ranger para aplicação de políticas suportadas; OpenLineage para linhagem; Airflow para orquestração; dbt Core para transformação; Trino e Apache Iceberg em arquiteturas analíticas adequadas; Superset para consumo visual. São opções a avaliar, não uma distribuição integrada ou suficiente para qualquer contexto.

Verifique versões, licenças, manutenção, compatibilidade e limites de suporte na seleção. A disponibilidade de uma ferramenta não demonstra que uma integração KDV esteja entregue ou que a stack completa de produto seja open source.

## Framework e ofertas KDV

KDV Framework é conhecimento aberto. Kolmeia é a abordagem open source em desenvolvimento; o âmbito de um instalador ou distribuição exige inventário versionado e decisão de licenciamento próprios. KDV Studio, Cloud, perspetivas de interação e serviços geridos são opcionais. Não deduza disponibilidade, licença ou garantias de implantação a partir do modelo operacional.

## Soberania e portabilidade

Registe controlo sobre propósito e permissões, jurisdição, responsabilidades do fornecedor, exportação, gestão de chaves, recuperação e condições de saída. Manter dados no ambiente do cliente pode ser uma escolha, mas não é a definição completa de soberania. Os metadados comuns também exigem proteção e âmbito documentados.

## Adoção e revisão

Comece por um produto e valide a decisão operacional completa antes de automatizar em larga escala. Use um registo de decisão de arquitetura para escolhas relevantes. Demonstre uma recusa de acesso, além do percurso autorizado, teste uma falha de atualização e verifique recuperação e exportação das evidências. Expanda quando for possível sustentar controlos e responsabilidades.

## Continuar a leitura

- [Aplicar o modelo](implementation.md)
- [Exemplo completo](worked-example.md)
- [IA e privacidade](ai-privacy.md)

---

Conhecimento original KDV. Proposta da edição comunitária 1.1 para avaliação; não é uma release aceite. CC BY 4.0. Direitos de terceiros reservados.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

# Acordos de produto de dados

Explicite responsáveis, qualidade, compatibilidade e utilização.

## Propósito

O contrato é um acordo de trabalho versionado entre quem produz, governa e consome um produto. Descreve a oferta, os destinatários, as finalidades e as expectativas. Um esquema de dados não estabelece por si só responsabilidade ou autorização. O modelo original KDV é legível por pessoas e não alega conformidade com ODCS ou outro padrão técnico.

## Baseline mínimo

- Identidade, versão, Hive, Cell e dono do produto
- Propósito, consumidores e interfaces de entrega
- Definições, esquema, origem e linhagem
- Classificação, uso permitido, retenção e condições de acesso
- Limites de qualidade, testes, atualização e contato de incidentes
- Compatibilidade, depreciação e registro de revisão e aprovação

## Versão e compatibilidade

Acorde como distinguir alterações incompatíveis, acréscimos compatíveis e correções documentais. Avise os consumidores antes de substituir o acordo por uma versão incompatível. Preserve aprovações anteriores e um caminho de transição ou retirada. Pode adotar versionamento semântico, mas a equipe deve definir o efeito das alterações para os consumidores.

## Exemplo sintético

Uma equipe fictícia de planejamento de serviços precisa de um agregado semanal de pedidos. O domínio do serviço responde pelo significado; uma equipe do subdomínio prepara os dados; o dono do produto acorda a atualização e os usos permitidos. A primeira entrega é um agregado interno, sem copiar registros identificáveis. A equipe guarda os resultados de qualidade e revisa se o produto apoia a decisão pretendida.

## Questões de revisão

- Quem pode decidir e qual é o papel exercido?
- Que regra ou acordo autoriza a ação?
- Que evidências demonstram a execução e suas limitações?
- Quando serão revisados o resultado ou a exceção?

## Privacidade e utilização permitida em IA

Registre propósito, papéis legais aplicáveis, entradas minimizadas, retenção, revisão de acesso, utilização permitida em IA e condições para novos consumidores. O encarregado aconselha; a organização conserva suas responsabilidades legais. Ligue a aprovação à política efetivamente aplicada.

## Continuar a leitura

- [Exemplo completo em dois contextos de interesse público](worked-example.md)
- [Aplicar o modelo](implementation.md)

---

Conhecimento original KDV. Edição comunitária 1.1.0. CC BY 4.0. Direitos de terceiros reservados.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

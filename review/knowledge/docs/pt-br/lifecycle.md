# O ciclo de vida do dado

Entradas, participantes, controles e evidências nas quatro etapas.

## Propósito

Comece pequeno. Defina um propósito, percorra as quatro etapas e use o retorno para melhorar a próxima iteração.

## Cultivar / Preparar com propósito.

**Condição de entrada:** Um caso de uso definido e uma fonte identificada.

**Participantes responsáveis:** Dono do produto + engenharia de dados

**Práticas de trabalho:** Conectar fontes; documentar a origem; preparar os dados; estabelecer uma entrega reproduzível.

**Evidência a guardar:** Inventário de fontes, registro das transformações e testes iniciais de qualidade.

**Ponto de decisão:** A fonte está autorizada e o resultado pode ser explicado.

**Exemplos de medidas:** Cobertura de fontes e falhas na entrega.

## Governar / Tornar a confiança aplicável.

**Condição de entrada:** Dados preparados, com significado e uso propostos.

**Participantes responsáveis:** Steward + dono do produto + dono do domínio

**Práticas de trabalho:** Acordar definições, classificação, limites de qualidade, usos permitidos e direitos de decisão.

**Evidência a guardar:** Glossário, contrato versionado, resultados de qualidade e decisões de política.

**Ponto de decisão:** Responsáveis, termos e expectativas de qualidade foram revisados.

**Exemplos de medidas:** Cobertura de responsáveis e exceções de qualidade.

## Compartilhar / Publicar um acordo.

**Condição de entrada:** Um produto aprovado e um público claro.

**Participantes responsáveis:** Dono do produto + steward + custodiante técnico

**Práticas de trabalho:** Publicar metadados e termos; revisar pedidos de acesso; aplicar controles; comunicar alterações.

**Evidência a guardar:** Contrato publicado, aprovação, política de acesso e histórico de versões.

**Ponto de decisão:** O consumidor previsado consegue descobrir e acessar à versão autorizada.

**Exemplos de medidas:** Tempo de aprovação de acesso e adoção do contrato.

## Ativar / Observar o valor.

**Condição de entrada:** Um consumidor autorizado e um propósito acordado.

**Participantes responsáveis:** Consumidor + dono do produto

**Práticas de trabalho:** Usar o produto em analytics, aplicações ou IA; acompanhar resultados; reportar problemas; revisar o uso.

**Evidência a guardar:** Registro de utilização, indicador de resultado, problemas e decisão de melhoria.

**Ponto de decisão:** Valor e limitações são revisados; decide-se a melhoria ou retirada.

**Exemplos de medidas:** Uso face ao propósito, incidentes e indicador de valor.

## Exemplo sintético

Uma equipe fictícia de planejamento de serviços precisa de um agregado semanal de pedidos. O domínio do serviço responde pelo significado; uma equipe do subdomínio prepara os dados; o dono do produto acorda a atualização e os usos permitidos. A primeira entrega é um agregado interno, sem copiar registros identificáveis. A equipe guarda os resultados de qualidade e revisa se o produto apoia a decisão pretendida.

## Continuar a leitura

- [Exemplo completo em dois contextos de interesse público](worked-example.md)
- [Aplicar o modelo](implementation.md)

---

Conhecimento original KDV. Proposta da edição comunitária 1.1 para avaliação; não é uma release aceita. CC BY 4.0. Direitos de terceiros reservados.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

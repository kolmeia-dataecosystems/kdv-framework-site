# Papéis e direitos de decisão

Atribua responsabilidades independentemente das interfaces.

## Propósito

Uma pessoa pode acumular papéis. Registre o papel exercido em cada decisão. Consumer, Producer, EcOps e PlatOps são perspectivas de interação com o produto e não substituem responsabilidades de negócio.

## Fórum de governança

**Escopo:** Ecossistema.

Define o baseline, revisa exceções entre domínios e resolve conflitos.

**Interface de referência:** EcOps registra as decisões.

## Gestor do ecossistema

**Escopo:** Ecossistema.

Coordena a implantação, o escopo, as versões de políticas e a melhoria.

**Interface de referência:** EcOps.

## Dono do domínio

**Escopo:** Hive.

Responde pelo domínio e pelas decisões de aprovação escaladas.

**Interface de referência:** EcOps / Producer.

## Dono do subdomínio

**Escopo:** Cell.

Responde pelo subdomínio e pelsuas decisões de aprovação.

**Interface de referência:** Producer.

## Dono do produto de dados

**Escopo:** Produto.

Responde pelo propósito, contrato, versões, publicação e relação com consumidores.

**Interface de referência:** Producer.

## Steward operacional

**Escopo:** Cell; opcionalmente Hive.

Mantém significado, classificação e qualidade; revisa pedidos.

**Interface de referência:** Producer / EcOps.

## Steward coordenador

**Escopo:** Hive.

Coordena o stewardship e resolve perguntas entre Cells.

**Interface de referência:** EcOps.

## Engenharia de dados

**Escopo:** Cell; opcionalmente Hive.

Constrói e mantém preparação e entrega reproduzíveis.

**Interface de referência:** Producer.

## Custodiante técnico

**Escopo:** Farm.

Opera ambientes e implementa controles autorizados.

**Interface de referência:** PlatOps / EcOps.

## Consumidor

**Escopo:** Produto.

Usa dados nos termos acordados e dá retorno sobre a adequação ao propósito.

**Interface de referência:** Consumer.

## Escopo e limites

Sem dono de subdomínio, explicite a responsabilidade herdada pelo dono do domínio. Um Comb pode agrupar permissões sem criar outro papel. A segregação de funções depende do risco e do contexto.

## Continuar a leitura

- [Exemplo completo em dois contextos de interesse público](worked-example.md)
- [Aplicar o modelo](implementation.md)

---

Conhecimento original KDV. Proposta da edição comunitária 1.1 para avaliação; não é uma release aceita. CC BY 4.0. Direitos de terceiros reservados.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

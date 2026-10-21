# Papéis e direitos de decisão

Atribua responsabilidades independentemente das interfaces.

## Propósito

Uma pessoa pode acumular papéis. Registe o papel exercido em cada decisão. Consumer, Producer, EcOps e PlatOps são perspetivas de interação com o produto e não substituem responsabilidades de negócio.

## Fórum de governança

**Âmbito:** Ecossistema.

Define o baseline, revê exceções entre domínios e resolve conflitos.

**Interface de referência:** EcOps regista as decisões.

## Gestor do ecossistema

**Âmbito:** Ecossistema.

Coordena a implantação, o âmbito, as versões de políticas e a melhoria.

**Interface de referência:** EcOps.

## Dono do domínio

**Âmbito:** Hive.

Responde pelo domínio e pelas decisões de aprovação escaladas.

**Interface de referência:** EcOps / Producer.

## Dono do subdomínio

**Âmbito:** Cell.

Responde pelo subdomínio e pelas suas decisões de aprovação.

**Interface de referência:** Producer.

## Dono do produto de dados

**Âmbito:** Produto.

Responde pelo propósito, contrato, versões, publicação e relação com consumidores.

**Interface de referência:** Producer.

## Steward operacional

**Âmbito:** Cell; opcionalmente Hive.

Mantém significado, classificação e qualidade; revê pedidos.

**Interface de referência:** Producer / EcOps.

## Steward coordenador

**Âmbito:** Hive.

Coordena o stewardship e resolve questões entre Cells.

**Interface de referência:** EcOps.

## Engenharia de dados

**Âmbito:** Cell; opcionalmente Hive.

Constrói e mantém preparação e entrega reproduzíveis.

**Interface de referência:** Producer.

## Custodiante técnico

**Âmbito:** Farm.

Opera ambientes e implementa controlos autorizados.

**Interface de referência:** PlatOps / EcOps.

## Consumidor

**Âmbito:** Produto.

Usa dados nos termos acordados e dá retorno sobre a adequação ao propósito.

**Interface de referência:** Consumer.

## Âmbito e limites

Sem dono de subdomínio, explicite a responsabilidade herdada pelo dono do domínio. Um Comb pode agrupar permissões sem criar outro papel. A segregação de funções depende do risco e do contexto.

## Continuar a leitura

- [Exemplo completo em dois contextos de interesse público](worked-example.md)
- [Aplicar o modelo](implementation.md)

---

Conhecimento original KDV. Edição comunitária 1.1.0. CC BY 4.0. Direitos de terceiros reservados.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

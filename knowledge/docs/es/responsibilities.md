# Roles y derechos de decisión

Asigne responsabilidades independientemente de las interfaces.

## Propósito

Una persona puede asumir varios roles. Registre el rol ejercido en cada decisión. Consumer, Producer, EcOps y PlatOps son perspectivas de interacción, no sustitutos de responsabilidades de negocio.

## Foro de gobernanza

**Ámbito:** Ecosistema.

Define el baseline, revisa excepciones entre dominios y resuelve conflictos.

**Interfaz de referencia:** EcOps registra decisiones.

## Gestor del ecosistema

**Ámbito:** Ecosistema.

Coordina implantación, alcance, versiones de políticas y mejora.

**Interfaz de referencia:** EcOps.

## Responsable del dominio

**Ámbito:** Hive.

Responde por el dominio y las aprobaciones escaladas.

**Interfaz de referencia:** EcOps / Producer.

## Responsable del subdominio

**Ámbito:** Cell.

Responde por el subdominio y sus aprobaciones.

**Interfaz de referencia:** Producer.

## Responsable del producto

**Ámbito:** Producto.

Responde por propósito, contrato, versiones, publicación y consumidores.

**Interfaz de referencia:** Producer.

## Steward operativo

**Ámbito:** Cell; opcionalmente Hive.

Mantiene significado, clasificación y calidad; revisa solicitudes.

**Interfaz de referencia:** Producer / EcOps.

## Steward coordinador

**Ámbito:** Hive.

Coordina stewardship y resuelve cuestiones entre Cells.

**Interfaz de referencia:** EcOps.

## Ingeniería de datos

**Ámbito:** Cell; opcionalmente Hive.

Construye y mantiene preparación y entrega reproducibles.

**Interfaz de referencia:** Producer.

## Custodio técnico

**Ámbito:** Farm.

Opera entornos e implementa controles autorizados.

**Interfaz de referencia:** PlatOps / EcOps.

## Consumidor

**Ámbito:** Producto.

Usa los datos según las condiciones y aporta comentarios sobre su utilidad.

**Interfaz de referencia:** Consumer.

## Alcance y límites

Sin responsable del subdominio, explicite la responsabilidad heredada por el del dominio. Un Comb puede agrupar permisos sin crear otro rol. La separación de funciones depende del riesgo y el contexto.

## Continuar leyendo

- [Ejemplo completo en dos contextos de interés público](worked-example.md)
- [Aplicar el modelo](implementation.md)

---

Conocimiento original KDV. Edición comunitaria 1.1.0. CC BY 4.0. Derechos de terceros reservados.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

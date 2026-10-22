# El ciclo de vida del dato

Entradas, participantes, controles y evidencias en cuatro etapas.

## Propósito

Empiece pequeño. Defina un propósito, siga las cuatro etapas y mejore la próxima iteración con lo aprendido.

## Cultivar / Preparar con propósito.

**Condición de entrada:** Un caso de uso definido y una fuente identificada.

**Participantes responsables:** Responsable del producto + ingeniería de datos

**Prácticas de trabajo:** Conectar fuentes, documentar su origen, preparar datos y establecer una entrega reproducible.

**Evidencia que conservar:** Inventario de fuentes, transformaciones y pruebas iniciales de calidad.

**Punto de decisión:** La fuente está autorizada y el resultado puede explicarse.

**Ejemplos de medidas:** Cobertura de fuentes y fallos de entrega.

## Gobernar / Hacer aplicable la confianza.

**Condición de entrada:** Datos preparados con significado y uso propuestos.

**Participantes responsables:** Steward + responsable del producto + responsable del dominio

**Prácticas de trabajo:** Acordar definiciones, clasificación, umbrales de calidad, usos permitidos y derechos de decisión.

**Evidencia que conservar:** Glosario, contrato versionado, resultados de calidad y decisiones.

**Punto de decisión:** Responsables, condiciones y calidad se han revisado.

**Ejemplos de medidas:** Cobertura de responsables y excepciones de calidad.

## Compartir / Publicar un acuerdo.

**Condición de entrada:** Un producto aprobado y una audiencia clara.

**Participantes responsables:** Responsable del producto + steward + custodio técnico

**Prácticas de trabajo:** Publicar metadatos y condiciones; revisar solicitudes; aplicar controles; comunicar cambios.

**Evidencia que conservar:** Contrato publicado, aprobación, política de acceso e historial de versiones.

**Punto de decisión:** El consumidor previsto puede descubrir y acceder a la versión autorizada.

**Ejemplos de medidas:** Tiempo de aprobación y adopción del contrato.

## Activar / Observar el valor.

**Condición de entrada:** Un consumidor autorizado y un propósito acordado.

**Participantes responsables:** Consumidor + responsable del producto

**Prácticas de trabajo:** Usar el producto en analítica, aplicaciones o IA; observar resultados; informar de problemas; revisar el uso.

**Evidencia que conservar:** Registro de uso, indicador de resultado, incidencias y decisión de mejora.

**Punto de decisión:** Se revisan valor y limitaciones; se decide mejorar o retirar.

**Ejemplos de medidas:** Uso según el propósito, incidentes e indicador de valor.

## Ejemplo sintético

Un equipo ficticio de planificación necesita un agregado semanal de solicitudes. El dominio responde por el significado, el subdominio prepara los datos y el responsable del producto acuerda actualización y usos. La primera entrega es un agregado interno sin copiar registros identificables. Se conservan pruebas de calidad y se revisa si el producto apoya la decisión prevista.

## Continuar leyendo

- [Ejemplo completo en dos contextos de interés público](worked-example.md)
- [Aplicar el modelo](implementation.md)

---

Conocimiento original KDV. Edición comunitaria 1.2.0. CC BY 4.0. Derechos de terceros reservados.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

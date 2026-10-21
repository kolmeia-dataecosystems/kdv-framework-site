# Opciones de implementación de referencia

Separe responsabilidades de negocio, controles reutilizables y opciones de despliegue.

## Tres puntos de partida viables

Aplique el modelo manualmente en un caso acotado, conéctelo a la plataforma existente o use una implementación de referencia adecuada. La base común no exige una plataforma KDV ni un lakehouse específico. Seleccione tecnología tras comprender propósito, roles, controles y límites operativos.

## Planos de negocio y ejecución

Un dominio responde por significado y decisiones; un subdominio organiza el trabajo cerca de los datos; un producto ofrece una entrega con responsable. Un entorno de ejecución aloja las cargas relevantes. No fuerce los dominios a seguir un organigrama o nombres de servidores. Comb agrupa opcionalmente Cells de una misma Hive, sin convertirse en una capa de infraestructura.

## Capacidades antes que nombres de producto

| Capacidad | Pregunta de implementación | Ejemplo de evidencia |
| --- | --- | --- |
| Identidad y permisos | ¿Cómo se identifica al consumidor y aplica el alcance aprobado? | Referencia de identidad, política y verificación de vencimiento. |
| Catálogo y semántica | ¿Cómo se descubren propósito, definiciones y limitaciones? | Contrato, glosario y linaje publicados. |
| Calidad y entrega | ¿Cómo se hacen visibles pruebas, actualizaciones y fallos? | Entrega reproducible, pruebas y tratamiento de fallos. |
| Ejecución y recuperación | ¿Dónde funciona la carga y cómo se recupera el servicio? | Inventario, respaldo y ensayo de recuperación. |
| Observabilidad y auditoría | ¿Qué eventos demuestran operación sin recoger datos personales excesivos? | Registros protegidos, conservación y revisión. |

## Herramientas ilustrativas

OpenMetadata para discutir catálogo; Keycloak para identidad; Apache Ranger para políticas soportadas; OpenLineage para linaje; Airflow para orquestación; dbt Core para transformación; Trino y Apache Iceberg en arquitecturas analíticas adecuadas; Superset para consumo visual. Son opciones a evaluar, no una distribución integrada o suficiente para cualquier contexto.

Verifique versiones, licencias, mantenimiento, compatibilidad y límites de soporte al seleccionar. La disponibilidad de una herramienta no demuestra que una integración KDV esté entregada ni que toda la stack de producto sea open source.

## Framework y ofertas KDV

KDV Framework es conocimiento abierto. Kolmeia es el enfoque open source en desarrollo; el alcance de un instalador o distribución requiere inventario versionado y una decisión propia de licencias. KDV Studio, Cloud, perspectivas de interacción y servicios gestionados son opcionales. No deduzca disponibilidad, licencia ni garantías de despliegue a partir del modelo operativo.

## Soberanía y portabilidad

Registre control sobre propósito y permisos, jurisdicción, responsabilidades del proveedor, exportación, gestión de claves, recuperación y salida. Mantener datos en el entorno del cliente puede ser una opción, pero no define toda la soberanía. Los metadatos comunes también necesitan protección y alcance documentado.

## Adopción y revisión

Empiece con un producto y valide la decisión operativa completa antes de automatizar a gran escala. Use un registro de decisión de arquitectura para elecciones relevantes. Demuestre un acceso rechazado además de la ruta autorizada, pruebe una actualización fallida y verifique recuperación y exportación de evidencias. Amplíe cuando pueda sostener controles y responsabilidades.

## Continuar leyendo

- [Aplicar el modelo](implementation.md)
- [Ejemplo completo](worked-example.md)
- [IA y privacidad](ai-privacy.md)

---

Conocimiento original KDV. Propuesta de edición comunitaria 1.1 para revisión; no es una release aceptada. CC BY 4.0. Derechos de terceros reservados.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

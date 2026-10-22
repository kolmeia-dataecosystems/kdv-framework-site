# Glosario común

Un vocabulario compacto para conversaciones coherentes.

## Propósito

La metáfora explica el modelo. No sustituye los términos de la organización ni asigna roles humanos a partir de la biología de las abejas.

## Ecosystem / Propósito compartido

El límite de la colaboración: objetivos, dominios, políticas comunes y gobernanza responsable. Empiece con un caso de uso y un patrocinador identificado.

## Hive / Dominio de negocio

Un dominio con responsable, significado y prioridades propios. Coordina sus Cells y respeta las reglas mínimas del ecosistema.

## Cell / Subdominio de negocio

Un subdominio dentro de una Hive. Stewardship e ingeniería trabajan cerca de los datos. Una Cell puede tener varios productos; la Cell no es el producto.

## Comb / Agrupación de negocio

Agrupación opcional de Cells de la misma Hive. Una Cell puede pertenecer a varios Combs. Agrupa negocio y permisos; no añade una capa de infraestructura.

## Producto de datos / Una oferta con responsable

Una oferta con propósito, responsable, contrato versionado, consumidores conocidos, expectativas de calidad y ciclo de vida. Tablas, APIs y dashboards pueden ser interfaces de entrega.

## Farm / Entorno de ejecución

Donde se cultivan y operan los productos: producción, pruebas o desarrollo. La Farm delimita la ejecución, separada de la responsabilidad de negocio.

## Responsabilidades

- **Foro de gobernanza:** Define el baseline, revisa excepciones entre dominios y resuelve conflictos.
- **Gestor del ecosistema:** Coordina implantación, alcance, versiones de políticas y mejora.
- **Responsable del dominio:** Responde por el dominio y las aprobaciones escaladas.
- **Responsable del subdominio:** Responde por el subdominio y sus aprobaciones.
- **Responsable del producto:** Responde por propósito, contrato, versiones, publicación y consumidores.
- **Steward operativo:** Mantiene significado, clasificación y calidad; revisa solicitudes.
- **Steward coordinador:** Coordina stewardship y resuelve cuestiones entre Cells.
- **Ingeniería de datos:** Construye y mantiene preparación y entrega reproducibles.
- **Custodio técnico:** Opera entornos e implementa controles autorizados.
- **Consumidor:** Usa los datos según las condiciones y aporta comentarios sobre su utilidad.

## Alcance y límites

KDV aporta una interpretación operativa original. No redistribuye material DAMA-DMBOK o DCAM. Las referencias no implican respaldo, afiliación, certificación ni mapeo oficial.

## Continuar leyendo

- [Ejemplo completo en dos contextos de interés público](worked-example.md)
- [Aplicar el modelo](implementation.md)


## Capacidades técnicas de apoyo

Use estos nombres funcionales al debatir requisitos. Identifican la capacidad necesaria sin prescribir un proveedor o una herramienta. Un producto puede reunir varias capacidades y una capacidad puede depender de varios componentes.

| Concepto funcional | Qué hace |
| --- | --- |
| Almacenamiento de objetos | Almacenamiento de objetos (lake) |
| Formato abierto de tablas analíticas | Organiza tablas analíticas sobre almacenamiento de objetos para lectura y escritura por motores compatibles. |
| Catálogo técnico de tablas | Registra metadatos y ubicación de las tablas para su descubrimiento por motores de consulta y procesamiento. |
| Orquestación de pipelines ETL/ELT | Pipelines con calidad y linaje |
| Catálogo de datos y gobernanza | Catálogo, glosario, linaje y calidad |
| Gestión de políticas de acceso | Autorización por política y auditoría de acceso |
| Resolución de entidades y correspondencia de registros | Datos maestros: correspondencia entre registros |
| Motor distribuido de consultas SQL | Motor de consulta, uno por entorno |
| Gestión de APIs | APIs y suscripciones |
| BI y visualización de datos | Paneles y análisis visual |
| Servicios de datos para aplicaciones e IA | Servicios de datos para aplicaciones y asistentes de IA |
| Recopilación y consulta de métricas | Recopila y almacena métricas a lo largo del tiempo para observar servicios e infraestructura. |
| Agregación y consulta de logs | Reúne y permite buscar logs de servicios para investigar eventos y fallos. |
| Rastreo distribuido | Registra el recorrido de las solicitudes entre servicios para investigar su ejecución y latencia. |
| Paneles de observabilidad | Presenta métricas, logs y rastros para apoyar el análisis de la operación. |
| Gestión de identidad y autenticación | Gestiona identidades, autenticación e inicio de sesión único para aplicaciones. |
| Servicio de directorio | Almacena y facilita identidades y atributos de usuarios. |
| Gestión de secretos | Almacén de secretos |
| Base de datos relacional | Registro de jerarquía, contratos, concesiones y auditoría |

## Áreas funcionales de apoyo al modelo operativo

| Concepto funcional | Qué hace |
| --- | --- |
| Portal de descubrimiento y consumo de datos | Catálogo, solicitud de acceso con plazo, lectura del contrato y seguimiento de las concesiones. |
| Gestión y publicación de productos de datos | Dominios, subdominios, contratos, versiones, calidad y decisión sobre solicitudes de acceso. |
| Consola de gobernanza del ecosistema | Políticas comunes, perfiles de gobernanza, roles, decisiones del foro e indicadores. |
| Consola de operaciones de la plataforma | Entornos, servicios, alertas, certificados y secretos, sin mostrar sus valores. |
| Centro de atención de datos | Mostrador común para dudas, problemas e incidentes de datos. |
| Adaptadores de integración de la plataforma | Conectan el modelo con las herramientas elegidas, sin versiones separadas del producto. |

---

Conocimiento original KDV. Edición comunitaria 1.2.0. CC BY 4.0. Derechos de terceros reservados.

[GitHub](https://github.com/kolmeia-dataecosystems/kdv-framework) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

# Opciones de implementación de referencia

Separe responsabilidades de negocio, controles reutilizables y opciones de despliegue.

## Capacidades antes que tecnologías

Empiece por el caso de uso, los derechos de decisión y las evidencias. Describa las capacidades necesarias para entregar y operar el producto de datos antes de elegir tecnologías. El modelo operativo puede apoyarse en sistemas existentes, herramientas integradas o prácticas manuales controladas.

| Concepto funcional | Qué hace |
| --- | --- |
| Almacenamiento de objetos | Almacenamiento de objetos (lake) |
| Formato abierto y catálogo técnico de tablas | Formato de tabla abierto y catálogo de tablas |
| Orquestación de pipelines ETL/ELT | Pipelines con calidad y linaje |
| Catálogo de datos y gobernanza | Catálogo, glosario, linaje y calidad |
| Gestión de políticas de acceso | Autorización por política y auditoría de acceso |
| Resolución de entidades y correspondencia de registros | Datos maestros: correspondencia entre registros |
| Motor distribuido de consultas SQL | Motor de consulta, uno por entorno |
| Gestión de APIs | APIs y suscripciones |
| BI y visualización de datos | Paneles y análisis visual |
| Servicios de datos para aplicaciones e IA | Servicios de datos para aplicaciones y asistentes de IA |
| Observabilidad de servicios | Observabilidad y evidencia operativa |
| Identidad, autenticación y directorio | Identidad e inicio de sesión único |
| Gestión de secretos | Almacén de secretos |
| Base de datos relacional | Registro de jerarquía, contratos, concesiones y auditoría |

## Las interfaces apoyan responsabilidades

Las áreas funcionales de descubrimiento y consumo, publicación de productos, gobernanza del ecosistema, operación de la plataforma, atención e integración apoyan los roles de negocio. No sustituyen al responsable del dominio, subdominio o producto.

## Criterios de elección

Evalúe la interoperabilidad, la integración de identidad, la aplicación de políticas de acceso, la recuperación de evidencias, la accesibilidad, la portabilidad y el soporte operativo. Elija los componentes según estos requisitos, sin convertir una stack en requisito del Framework.

## Ejemplo opcional de implementación

KDV Studio/Cloud es un ejemplo de herramienta que reúne los módulos necesarios para apoyar KDV: consumo, publicación, gobernanza del ecosistema, operación de la plataforma, atención e integraciones. Su uso es opcional; el Framework puede aplicarse con otras herramientas. Este ejemplo no es una recomendación de contratación.

El ejemplo describe una organización de capacidades, sin compromiso universal de disponibilidad o licencia. Confirme la versión implantada, el alcance y las evidencias antes de depender de un control.

## Continuar la lectura

[Playbook](lifecycle.md) · [Capacidades técnicas de apoyo](glossary.md) · [Capacidades que apoyan el trabajo.](responsibilities.md)

---

KDV Framework · Community edition 1.2.0 · CC BY 4.0.

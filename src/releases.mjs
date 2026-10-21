import {brazilian} from '../review/regional.mjs';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const json=path=>JSON.parse(readFileSync(new URL(path,import.meta.url),'utf8'));
export const release=json('../release.json');
const source=json('../knowledge/source.json');
const inventory=json('../knowledge/knowledge.json');
const pkg=json('../package.json');

// Fail the build if a knowledge sync leaves a stale public release claim behind.
export function validateRelease(value,pinned,manifest,packageVersion){
 assert.match(value.version,/^\d+\.\d+\.\d+(?:-[a-z0-9]+(?:\.[a-z0-9]+)*)?$/);
 assert.equal(value.version,packageVersion,'Website package and release versions must match');
 assert.ok(['development','candidate','stable'].includes(value.status));
 if(value.status==='stable'){
  assert.equal(value.version,value.target);
  assert.doesNotMatch(value.version,/-/);
  assert.doesNotMatch(value.knowledge.version,/-/,'Stable websites must include stable framework knowledge');
 }else{
  assert.ok(value.version.startsWith(value.target+'-'));
  assert.match(value.version,value.status==='candidate'?/-rc\./:/-dev\./);
 }
 assert.equal(pinned.repository,'kolmeia-dataecosystems/kdv-framework');
 assert.equal(pinned.ref,'main');
 assert.equal(value.knowledge.commit,pinned.commit,'Confirm the framework release after synchronizing knowledge');
 assert.equal(value.knowledge.sourceEdition,pinned.edition);
 assert.equal(pinned.edition,manifest.edition);
 assert.equal(value.knowledge.tag,'v'+value.knowledge.version);
 if(manifest.release){
  assert.equal(value.knowledge.version,manifest.release);
 }else{
  // One explicit historical mapping; never infer a release for an unknown snapshot.
  assert.equal(pinned.commit,'498c0f3fc5a52770c06a8088858baebf3b0f20cc');
  assert.equal(value.knowledge.version,'1.0.0');
  assert.equal(pinned.edition,'0.1');
 }
 return value;
}
validateRelease(release,source,inventory,pkg.version);

export const frameworkReleaseUrl=`https://github.com/${source.repository}/releases/tag/${release.knowledge.tag}`;
export const websiteBaselineUrl=`https://github.com/kolmeia-dataecosystems/kdv-framework-site/releases/tag/${release.baseline.tag}`;
export const sourceCommitUrl=`https://github.com/${source.repository}/commit/${source.commit}`;

export const releaseUi={
 en:{
  title:'Versions and release notes',intro:'The open Framework and its website have independent versions. Every website edition identifies the accepted knowledge it includes.',
  website:'Website',framework:'Framework',notes:'Release notes',development:'In development',candidate:'Release candidate',stable:'Published release',
  included:'Included knowledge',source:'Exact source revision',baseline:'Version 1 baseline',next:'Next edition · target 1.1.0',
  baselineBody:'On 21 October 2026, the existing website and accepted knowledge were recorded as v1.0.0 in their own repositories. The tagged files retain their historical 0.1 labels. This designation preserves history; it does not certify the model or announce a new product.',
  statusBody:'This website version is being prepared for publication. The accepted knowledge currently included is identified above. Proposed improvements enter a release after review, acceptance and explicit synchronization.',
  scopeTitle:'Planned for the next edition',
  scope:['Clearer problem-led introduction and familiar business vocabulary, retaining the hive identity.','Preparation for a first case, a worked example and reviewed diagrams and editable resources.','Deeper operational guidance on reference practices, AI governance, privacy and implementation choices.','Brazilian Portuguese for the revised Portuguese edition, English as default and continued Spanish coverage.'],
  gate:'Scope is planned, not delivered. Knowledge enters main after guardian review and passing checks. The website then imports the accepted revision and records the final version pair before publication.',
  plan:'Follow the knowledge proposal',history:'Read the baseline notes',legacy:'Historical source label',communityEdition:'Community edition'
 },
 pt:{
  title:'Versões e notas de release',intro:'O Framework aberto e seu site têm versões independentes. Cada edição do site identifica o conhecimento aprovado que ela inclui.',
  website:'Site',framework:'Framework',notes:'Notas de release',development:'Em desenvolvimento',candidate:'Candidata a release',stable:'Release publicada',
  included:'Conhecimento incluído',source:'Revisão exata da fonte',baseline:'Versão 1 de referência',next:'Próxima edição · objetivo 1.1.0',
  baselineBody:'Em 21 de outubro de 2026, o site existente e o conhecimento aprovado foram registrados como v1.0.0 nos respectivos repositórios. Os arquivos dessas tags mantêm a identificação histórica 0.1. Esse registro preserva o histórico; não certifica o modelo nem anuncia um novo produto.',
  statusBody:'Esta versão do site está sendo preparada para publicação. O conhecimento aprovado incluído está identificado acima. As melhorias propostas entram em uma release após revisão, aprovação e sincronização explícita.',
  scopeTitle:'Planejado para a próxima edição',
  scope:['Apresentação a partir dos problemas e vocabulário de negócios mais claro, preservando a identidade das colmeias.','Preparação de um primeiro caso, exemplo completo e revisão dos diagramas e recursos editáveis.','Maior profundidade operacional nos referenciais, governança de IA, privacidade e escolhas de implementação.','Português do Brasil na edição portuguesa revisada, inglês como padrão e continuidade do espanhol.'],
  gate:'O escopo está planejado e ainda não foi entregue. O conhecimento entra na main após revisão guardiã e verificações aprovadas. O site então incorpora a revisão aceita e registra o par final de versões antes da publicação.',
  plan:'Acompanhar a proposta de conhecimento',history:'Ler as notas da versão de referência',legacy:'Identificação histórica da fonte',communityEdition:'Edição comunitária'
 },
 es:{
  title:'Versiones y notas de release',intro:'El Framework abierto y su sitio tienen versiones independientes. Cada edición del sitio identifica el conocimiento aprobado que incluye.',
  website:'Sitio',framework:'Framework',notes:'Notas de release',development:'En desarrollo',candidate:'Candidata a release',stable:'Release publicada',
  included:'Conocimiento incluido',source:'Revisión exacta de la fuente',baseline:'Versión 1 de referencia',next:'Próxima edición · objetivo 1.1.0',
  baselineBody:'El 21 de octubre de 2026, el sitio existente y el conocimiento aprobado se registraron como v1.0.0 en sus respectivos repositorios. Los archivos de esas etiquetas conservan su identificación histórica 0.1. Este registro preserva el historial; no certifica el modelo ni anuncia un producto nuevo.',
  statusBody:'Esta versión del sitio se está preparando para su publicación. El conocimiento aprobado incluido se identifica arriba. Las mejoras propuestas entran en una release tras revisión, aprobación y sincronización explícita.',
  scopeTitle:'Previsto para la próxima edición',
  scope:['Presentación desde los problemas y un vocabulario de negocio más claro, conservando la identidad de las colmenas.','Preparación de un primer caso, ejemplo completo y revisión de diagramas y recursos editables.','Mayor profundidad operativa en las referencias, gobernanza de IA, privacidad y opciones de implementación.','Portugués de Brasil para la edición portuguesa revisada, inglés por defecto y continuidad del español.'],
  gate:'El alcance está planificado y todavía no se ha entregado. El conocimiento entra en main tras la revisión de guardianes y las verificaciones. Después, el sitio incorpora la revisión aceptada y registra el par final de versiones antes de publicar.',
  plan:'Seguir la propuesta de conocimiento',history:'Leer las notas de la versión de referencia',legacy:'Identificación histórica de la fuente',communityEdition:'Edición comunitaria'
 }
};

export const releaseStatus=l=>releaseUi[l][release.status];

releaseUi['pt-br']=brazilian(releaseUi.pt);

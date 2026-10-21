import {readFile,writeFile,mkdir,copyFile,lstat} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';

// Explicit local proposal import. This never replaces knowledge/ or deploys a site.
const args=process.argv.slice(2);assert.equal(args[0],'--source-dir');assert.equal(args.length,2);
const checkout=resolve(args[1]);
const git=(...values)=>execFileSync('git',['-C',checkout,...values],{encoding:'utf8'}).trim();
const ref=git('branch','--show-current');assert.ok(ref.startsWith('codex/'),'Review imports require an explicit proposal branch');
const manifest=JSON.parse(await readFile(checkout+'/knowledge.json','utf8'));
assert.equal(manifest.repository,'kolmeia-dataecosystems/kdv-framework');assert.match(manifest.release,/-dev\./);
assert.deepEqual(manifest.languages,['en','pt-br','pt','es']);
const paths=['knowledge.json',...manifest.documents.map(d=>d.path),...manifest.assets,...manifest.templates];
for(const path of paths){
 assert.match(path,/^(knowledge\.json|docs\/(en|pt-br|pt|es)\/[a-z0-9-]+\.md|templates\/(en|pt-br|pt|es)\/[a-z0-9-]+\.md|diagrams\/[a-z0-9-]+\.svg)$/);
 const info=await lstat(checkout+'/'+path);assert.ok(info.isFile()&&!info.isSymbolicLink());
}
const destination=resolve('review/knowledge');
for(const path of paths){await mkdir(dirname(destination+'/'+path),{recursive:true});await copyFile(checkout+'/'+path,destination+'/'+path)}
const accepted=JSON.parse(await readFile('knowledge/source.json','utf8'));
const dirty=git('status','--porcelain').length>0;
const source={repository:manifest.repository,ref,baseCommit:accepted.commit,status:'proposal',release:manifest.release,commit:git('rev-parse','HEAD'),uncommitted:dirty,edition:manifest.edition};
await writeFile(destination+'/source.json',JSON.stringify(source,null,2)+'\n');
console.log(`Imported review-only proposal ${source.commit}${dirty?' with uncommitted changes':''}. Accepted knowledge/ unchanged.`);

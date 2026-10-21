import {execFileSync} from 'node:child_process';
import {mkdtemp,readFile,writeFile,mkdir,copyFile,rm,lstat} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve,dirname} from 'node:path';
import assert from 'node:assert/strict';
const repository='kolmeia-dataecosystems/kdv-framework';
const url=`https://github.com/${repository}.git`;
// Deliberately no ref argument: published knowledge comes from main only.
const scratch=await mkdtemp(join(tmpdir(),'kdv-knowledge-'));
try{
 const checkout=join(scratch,'source');
 execFileSync('git',['clone','--quiet','--depth','1','--branch','main','--single-branch',url,checkout],{stdio:['ignore','ignore','pipe']});
 const commit=execFileSync('git',['-C',checkout,'rev-parse','HEAD'],{encoding:'utf8'}).trim();assert.match(commit,/^[0-9a-f]{40}$/);
 const manifest=JSON.parse(await readFile(join(checkout,'knowledge.json'),'utf8'));assert.equal(manifest.repository,repository);assert.equal(manifest.version,1);
 assert.deepEqual(manifest.languages,['en','pt-br','pt','es']);
 assert.equal(manifest.release,manifest.edition);assert.match(manifest.release,/^\d+\.\d+\.\d+$/);
 const paths=['knowledge.json',...manifest.documents.map(d=>d.path),...manifest.assets,...manifest.templates];
 for(const p of paths){assert.ok(/^(knowledge\.json|docs\/(en|pt-br|pt|es)\/[a-z0-9-]+\.md|diagrams\/[a-z0-9-]+\.svg|templates\/(en|pt-br|pt|es)\/[a-z0-9-]+\.md)$/.test(p),p);const st=await lstat(join(checkout,p));assert.ok(st.isFile()&&!st.isSymbolicLink());}
 // Validate before replacing the tracked snapshot. Never execute code from the source repository.
 const destination=resolve('knowledge');await mkdir(destination,{recursive:true});
 for(const p of paths){await mkdir(dirname(join(destination,p)),{recursive:true});await copyFile(join(checkout,p),join(destination,p));}
 await writeFile(join(destination,'source.json'),JSON.stringify({repository,ref:'main',commit,edition:manifest.edition,release:manifest.release},null,2)+'\n');
 console.log(`Imported ${manifest.documents.length} guides from accepted main at ${commit}. Run npm run check and release the site to publish this revision.`);
}finally{await rm(scratch,{recursive:true,force:true})}

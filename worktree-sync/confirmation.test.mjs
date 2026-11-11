import test from 'node:test';import assert from 'node:assert/strict';import {randomUUID} from 'node:crypto';
import {taskRequest,validateTask} from './tasks.js';
class Storage{map=new Map();queue=Promise.resolve();transaction(fn){const run=this.queue.then(()=>fn(this));this.queue=run.catch(()=>{});return run;}async get(k){return structuredClone(this.map.get(k));}async put(obj){for(const [k,v] of Object.entries(obj))this.map.set(k,structuredClone(v));}async list({prefix,limit}){return new Map([...this.map].filter(([k])=>k.startsWith(prefix)).slice(0,limit));}}
const base=()=>({id:'CUSTOM-'+randomUUID(),rev:0,requestId:randomUUID(),title:'배너 컨펌 🎨 ไทย 中文 <b>제목</b>',category:'confirmation',kind:'confirmation',url:'',note:'수정할 내용 & 링크는 선택',countries:[],checks:{},completed:false,deleted:false});
const send=(s,b)=>taskRequest(new Request('https://local/v1/tasks',b?{method:'POST',body:JSON.stringify(b)}:{}),s);
test('Confirmation create/read/edit/complete/reopen/delete preserves unrelated data',async()=>{
 const s=new Storage();s.map.set('board',{cells:{unchanged:true}});let t=(await(await send(s,base())).json()).task;
 assert.equal(t.category,'confirmation');assert.equal(t.kind,'confirmation');assert.deepEqual(t.countries,[]);
 for(const patch of [{note:'수정 시안 검토'},{url:'https://example.com/시안?emoji=🎨'},{completed:true},{completed:false},{deleted:true}]){
  const response=await send(s,{...t,...patch,requestId:randomUUID()});assert.equal(response.status,200);t=(await response.json()).task;
  const list=await(await send(s)).json();assert.equal(list.tasks.length,t.deleted?0:1);
 }
 assert.deepEqual(await s.get('board'),{cells:{unchanged:true}});assert.equal((await s.get('task-history:'+t.id)).length,5);
});
test('Confirmation requires matching category/kind, no countries, safe optional URL and bounded valid inputs',()=>{
 for(const patch of [{category:'website'},{kind:'collaboration'},{kind:'language'},{kind:'upload'},{kind:'content'},{countries:['EN'],checks:{EN:false}},{title:''},{title:'x'.repeat(121)},{note:null},{checks:null},{url:'javascript:alert(1)'},{url:'https://user:pass@example.com'},{completed:null},{requestId:null}])assert.throws(()=>validateTask({...base(),...patch}));
 assert.throws(()=>validateTask(null));assert.throws(()=>validateTask(undefined));assert.doesNotThrow(()=>validateTask({...base(),title:'가'.repeat(120),note:'🎨'.repeat(1000),url:'https://example.com/한글'}));
});
test('Confirmation CAS and retry never duplicate requests or overwrite another editor',async()=>{
 const s=new Storage(),body=base(),one=await(await send(s,body)).json();assert.deepEqual(await(await send(s,body)).json(),one);
 const t=one.task;const results=await Promise.all([send(s,{...t,note:'담당자 A',requestId:randomUUID()}),send(s,{...t,note:'담당자 B',requestId:randomUUID()})]);
 assert.deepEqual(results.map(r=>r.status),[200,409]);assert.equal((await(await send(s)).json()).tasks.length,1);
});
test('Changing to or from confirmation cannot inherit a completed status',async()=>{
 for(const from of ['confirmation','collaboration','language']){
  const s=new Storage(),scoped=from==='language';const body={...base(),kind:from,category:from==='confirmation'?'confirmation':'website',url:scoped?'https://example.com':'',countries:scoped?['EN']:[],checks:scoped?{EN:false}:{}};
  let t=(await(await send(s,body)).json()).task;t=(await(await send(s,{...t,completed:true,checks:scoped?{EN:true}:{},requestId:randomUUID()})).json()).task;
  const to=from==='confirmation'?'collaboration':'confirmation',changed={...t,kind:to,category:to==='confirmation'?'confirmation':'other',countries:[],checks:{},requestId:randomUUID()};
  assert.equal((await send(s,changed)).status,400);assert.equal((await send(s,{...changed,completed:false})).status,200);
 }
});

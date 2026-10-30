const uuid=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const countries=new Set(['EN','JP','CN','TW','TH','HK']);
const categories=new Set(['video','cardnews','website','other']);
const reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export function validateTask(body){
  if(!body||typeof body!=='object'||Array.isArray(body)||typeof body.id!=='string'||!body.id.startsWith('CUSTOM-')||!uuid.test(body.id.slice(7))||!uuid.test(body.requestId||'')||!Number.isSafeInteger(body.rev)||body.rev<0)throw Error('Invalid identity');
  if(typeof body.title!=='string'||!body.title.trim()||body.title.length>120||typeof body.note!=='string'||body.note.length>2000||typeof body.url!=='string'||body.url.length>1500||!categories.has(body.category)||!['language','collaboration'].includes(body.kind))throw Error('Invalid task');
  if(body.url){let url;try{url=new URL(body.url)}catch{throw Error('Invalid link')}
    if(!['https:','http:'].includes(url.protocol)||url.username||url.password)throw Error('Invalid link');}
  if(!Array.isArray(body.countries)||body.countries.length>6||new Set(body.countries).size!==body.countries.length||body.countries.some(c=>!countries.has(c)))throw Error('Invalid countries');
  if(body.kind==='language'&&(!body.countries.length||!body.url))throw Error('Language review requires countries and link');
  if(body.kind==='collaboration'&&body.countries.length)throw Error('Unexpected countries');
  if(!body.checks||typeof body.checks!=='object'||Array.isArray(body.checks)||Object.keys(body.checks).length!==body.countries.length||body.countries.some(c=>typeof body.checks[c]!=='boolean')||typeof body.completed!=='boolean'||typeof body.deleted!=='boolean')throw Error('Invalid status');
  if(body.kind==='language'&&body.completed&&!body.countries.every(c=>body.checks[c]))throw Error('Review is incomplete');
  return {id:body.id,title:body.title.trim(),category:body.category,kind:body.kind,url:body.url.trim(),note:body.note.trim(),countries:[...body.countries],checks:Object.fromEntries(body.countries.map(c=>[c,body.checks[c]])),completed:body.completed,deleted:body.deleted};
}
export async function taskRequest(request,storage){
  if(request.method==='GET')return storage.transaction(async tx=>{
    const rows=await tx.list({prefix:'task:',limit:2000});
    return reply({tasks:[...rows.values()].filter(t=>!t.deleted),version:await tx.get('tasks-version')||0});
  });
  let body,clean;try{
    const reader=request.body?.getReader();if(!reader)throw Error('Missing body');
    let size=0;const chunks=[];
    while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>16000){await reader.cancel();return reply({error:'Body too large'},413)}chunks.push(value);}
    body=JSON.parse(await new Blob(chunks).text());clean=validateTask(body);
  }catch{return reply({error:'Invalid task'},400)}
  return storage.transaction(async tx=>{
    const key='task:'+clean.id,prev=await tx.get(key);
    if(prev?.requestId===body.requestId){
      const old=Object.fromEntries(Object.keys(clean).map(k=>[k,prev[k]]));
      if(JSON.stringify(old)!==JSON.stringify(clean))return reply({error:'Request ID reused with different content'},409);
      return reply({task:prev,version:await tx.get('tasks-version')||0});
    }
    if((prev?.rev||0)!==body.rev)return reply({error:'Conflict',task:prev||null},409);
    if(!prev&&(clean.deleted||clean.completed||Object.values(clean.checks).some(Boolean)))return reply({error:'New tasks must start pending'},400);
    if(!prev&&(await tx.list({prefix:'task:',limit:2000})).size>=2000)return reply({error:'Task limit'},400);
    const at=new Date().toISOString(),task={...clean,createdAt:prev?.createdAt||at,updatedAt:at,rev:(prev?.rev||0)+1,requestId:body.requestId};
    const history=await tx.get('task-history:'+clean.id)||[],version=(await tx.get('tasks-version')||0)+1;
    await tx.put({[key]:task,['task-history:'+clean.id]:[...history,...(prev?[prev]:[])].slice(-12),'tasks-version':version});
    return reply({task,version});
  });
}

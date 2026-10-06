const idPattern=/^(BASE\d{2}|[RN]\d{2}|CUSTOM-[a-f0-9-]{36})$/;
const uuid=/^[a-f0-9-]{36}$/;
const reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export class ConfirmationNotes{
  constructor(ctx){this.ctx=ctx;}
  async fetch(request){
    if(request.method==='GET')return this.ctx.storage.transaction(async tx=>{
      const stored=await tx.list({prefix:'note:',limit:1000});return reply({notes:Object.fromEntries([...stored].map(([k,v])=>[k.slice(5),v]))});
    });
    let body;const reader=request.body?.getReader();if(!reader)return reply({error:'Missing body'},400);
    const parts=[];let size=0;
    while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>24000){await reader.cancel();return reply({error:'Body too large'},413)}parts.push(value)}
    try{body=JSON.parse(await new Blob(parts).text())}catch{return reply({error:'Invalid JSON'},400)}
    if(!body||!idPattern.test(body.id)||typeof body.id!=='string'||typeof body.text!=='string'||!body.text.trim()||body.text.length>4000||typeof body.author!=='string'||body.author.length>60||!Number.isSafeInteger(body.rev)||body.rev<0||typeof body.requestId!=='string'||!uuid.test(body.requestId))return reply({error:'Invalid note'},400);
    return this.ctx.storage.transaction(async tx=>{
      const key='note:'+body.id,prev=await tx.get(key)||{rev:0,text:'',author:'',at:''};
      if(prev.requestId===body.requestId&&prev.text===body.text.trim()&&prev.author===body.author.trim())return reply({note:prev});
      if(prev.rev!==body.rev)return reply({error:'Conflict',note:prev},409);
      if(prev.rev===0&&(await tx.list({prefix:'note:',limit:1000})).size>=1000)return reply({error:'Note limit'},400);
      const note={id:body.id,text:body.text.trim(),author:body.author.trim(),rev:prev.rev+1,at:new Date().toISOString(),requestId:body.requestId};
      const history=await tx.get('history:'+body.id)||[];
      await tx.put({[key]:note,['history:'+body.id]:[...history,...(prev.rev?[prev]:[])].slice(-12)});
      return reply({note});
    });
  }
}
export default{async fetch(request,env){
  const origin=request.headers.get('Origin'),headers={'Access-Control-Allow-Origin':env.ALLOWED_ORIGIN,'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,X-BB-Worktree','Cache-Control':'no-store','Vary':'Origin'};
  if(origin!==env.ALLOWED_ORIGIN)return reply({error:'Origin not allowed'},403);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
  if(new URL(request.url).pathname!=='/v1/notes'||!['GET','POST'].includes(request.method))return new Response('Not found',{status:404,headers});
  if(request.headers.get('X-BB-Worktree')!=='notes-v1')return new Response('Missing client header',{status:400,headers});
  if(request.method==='POST'&&!request.headers.get('Content-Type')?.startsWith('application/json'))return new Response('Expected JSON',{status:415,headers});
  try{const stub=env.NOTES.get(env.NOTES.idFromName('confirmation-v1'));const r=await stub.fetch(request);return new Response(r.body,{status:r.status,headers:{...Object.fromEntries(r.headers),...headers}})}
  catch{return new Response('{"error":"Storage temporarily unavailable"}',{status:503,headers:{...headers,'Content-Type':'application/json'}})}
}};

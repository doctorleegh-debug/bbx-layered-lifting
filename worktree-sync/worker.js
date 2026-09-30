import defaults from './defaults.json';

const kinds = /^(BASE\d{2}|[RN]\d{2}|CUSTOM-[a-f0-9-]{36})\/(KO|EN|JP|CN|TW|TH|HK)\/(review|upload)$/;
const known = new Set(Object.keys(defaults).map(k => k.split('/')[0]));
function validKey(key) {
  return typeof key === 'string' && kinds.test(key) && !key.endsWith('/KO/review') &&
    (known.has(key.split('/')[0]) || key.startsWith('CUSTOM-'));
}
function response(data, status = 200) {
  return Response.json(data, {status, headers:{'Cache-Control':'no-store'}});
}

// One durable board, per-cell revisions. No employee notes, links or credentials stored.
export class SharedChecks {
  constructor(ctx) { this.ctx = ctx; }
  async fetch(request) {
    const route = new URL(request.url).pathname;
    let body;
    if (request.method === 'POST') {
      const reader = request.body?.getReader();
      if (!reader) return response({error:'Missing body'},400);
      const parts=[]; let size=0;
      while (true) {
        const {done,value}=await reader.read(); if(done)break;
        size+=value.length;
        if(size>65000){await reader.cancel();return response({error:'Body too large'},413);}
        parts.push(value);
      }
      try { body=JSON.parse(await new Blob(parts).text()); }
      catch { return response({error:'Invalid JSON'},400); }
      if(!body || !Array.isArray(body.changes) || body.changes.length>800)
        return response({error:'Invalid changes'},400);
      const ids=new Set();
      for(const c of body.changes){
        if(!c || !validKey(c.key) || ids.has(c.key) ||
          (route==='/v1/legacy' ? typeof c.value!=='boolean' :
            (![true,false,null].includes(c.value)||!Number.isSafeInteger(c.rev)||c.rev<0)))
          return response({error:'Invalid cell'},400);
        ids.add(c.key);
      }
    }
    return this.ctx.storage.transaction(async tx => {
      const board=await tx.get('board') || {version:0,cells:{}};
      for(const [key,value] of Object.entries(defaults))
        if(!Object.hasOwn(board.cells,key))board.cells[key]={value,rev:0,source:'record'};
      if(request.method==='GET')return response(board);
      if(Object.keys(board.cells).length+body.changes.filter(c=>!Object.hasOwn(board.cells,c.key)).length>6000)
        return response({error:'Board limit'},400);
      if(route==='/v1/check'){
        const conflict=body.changes.some(c=>(board.cells[c.key]?.rev||0)!==c.rev);
        if(conflict)return response({error:'Conflict',board},409);
      }
      const stamp=new Date().toISOString();let changed=false;const events=[];
      for(const c of body.changes){
        const prev=board.cells[c.key]||{value:null,rev:0};
        // Legacy browser imports may add a previously unsynced tick, but never undo
        // an explicit shared edit (including an explicit false).
        if(route==='/v1/legacy' && (prev.rev>0 || prev.value===c.value))continue;
        board.cells[c.key]={value:c.value,rev:prev.rev+1,at:stamp,
          source:route==='/v1/legacy'?'legacy':'shared'};
        events.push({key:c.key,before:prev.value,after:c.value,rev:prev.rev+1,at:stamp,source:board.cells[c.key].source});
        changed=true;
      }
      if(changed){
        board.version++;
        const history=await tx.get('history')||[];
        await tx.put({board,history:[...history,...events].slice(-1000)});
      }
      return response(board);
    });
  }
}

export default {
  async fetch(request,env) {
    const origin=request.headers.get('Origin');
    const headers={'Access-Control-Allow-Origin':env.ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods':'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers':'Content-Type,X-BB-Worktree',
      'Cache-Control':'no-store','Vary':'Origin'};
    const path=new URL(request.url).pathname;
    if(origin!==env.ALLOWED_ORIGIN)return response({error:'Origin not allowed'},403);
    if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
    if(!((request.method==='GET'&&path==='/v1/state')||
      (request.method==='POST'&&['/v1/check','/v1/legacy'].includes(path))))
      return new Response('Not found',{status:404,headers});
    if(request.headers.get('X-BB-Worktree')!=='checks-v1')
      return new Response('Missing client header',{status:400,headers});
    if(request.method==='POST'&&!request.headers.get('Content-Type')?.startsWith('application/json'))
      return new Response('Expected JSON',{status:415,headers});
    try {
      const stub=env.CHECKS.get(env.CHECKS.idFromName('homepage-v1'));
      const r=await stub.fetch(request);
      return new Response(r.body,{status:r.status,headers:{...Object.fromEntries(r.headers),...headers}});
    }catch{
      return new Response('{"error":"Storage temporarily unavailable"}',{status:503,
        headers:{...headers,'Content-Type':'application/json'}});
    }
  }
};

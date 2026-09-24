/* Read-only same-origin public board adapter. No API keys, iframe or proxy. */
(()=>{'use strict';
async function read(source,{limit=12,signal}={}){
 const board=new URL(source,location.href);if(board.origin!==location.origin)throw Error('Event board must share the page origin');
 const get=async url=>{const u=new URL(url,board);if(u.origin!==board.origin)throw Error('Unexpected event origin');const r=await fetch(u.href,{credentials:'same-origin',cache:'no-store',signal});if(!r.ok)throw Error('Event board HTTP '+r.status);return new DOMParser().parseFromString(await r.text(),'text/html')};
 const hongkong=board.hostname==='hk.beautyblossom.kr';
 const doc=await get(board),links=[...doc.querySelectorAll(hongkong?'main a[href^="/events/"]':'a.post_link_wrap')].filter(a=>!hongkong||a.querySelector('h2')).slice(0,Math.max(1,Math.min(24,limit)));
 if(!links.length)throw Error('No event cards found; retain last successful set');
 const jobs=links.map(link=>{const title=link.querySelector(hongkong?'h2':'.title')?.cloneNode(true);title?.querySelectorAll('em').forEach(e=>e.remove());const url=new URL(link.getAttribute('href'),board);if(url.origin!==board.origin)throw Error('Unexpected event link');return {url:url.href,title:(title?.textContent||link.textContent).replace(/\s+/g,' ').trim(),id:url.searchParams.get('idx')||url.pathname}});
 const out=new Array(jobs.length);let cursor=0;
 const revision=Date.now();
 if(board.hostname==='www.beautyblossomth.kr'){
  const detail=await get(jobs[0].url),data=JSON.parse(detail.querySelector('#bb-admin-event-detail-data')?.textContent||'null');
  if(!Array.isArray(data?.events))throw Error('No Thai event data');
  return jobs.map(job=>{const row=data.events.find(x=>x.id===job.id);if(!row?.images?.[0]?.url)throw Error('No Thai event artwork');const image=new URL(row.images[0].url,board);if(image.protocol!=='https:')throw Error('Invalid artwork URL');image.searchParams.set('_bb_event',String(revision));return {...job,title:row.title,image:image.href,width:1080,height:1350}});
 }
 await Promise.all(Array.from({length:Math.min(3,jobs.length)},async()=>{while(cursor<jobs.length){const i=cursor++,job=jobs[i],detail=await get(job.url),img=detail.querySelector(hongkong?'main img':'[class*="_comment_body_"] img, .board_txt_area img');if(!img)throw Error('No original event artwork');const image=new URL(img.getAttribute('src'),job.url);if(image.protocol!=='https:')throw Error('Invalid artwork URL');image.searchParams.set('_bb_event',String(revision));out[i]={...job,image:image.href,width:Number(img.getAttribute('width'))||1080,height:Number(img.getAttribute('height'))||1350}}}));
 return out;
}
window.BBEventFeed=Object.freeze({read});
})();

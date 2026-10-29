'use strict';
const API='https://bb-worktree-checks.beautyblossom.workers.dev';
const headers={'X-BB-Worktree':'checks-v1','Content-Type':'application/json'};
const cards=[...document.querySelectorAll('.image-card')];
const status=document.getElementById('save-status'),retry=document.getElementById('retry');
const exportButton=document.getElementById('export'),search=document.getElementById('search'),only=document.getElementById('only-selected');
const data=JSON.parse(document.getElementById('image-data').textContent);
let board={version:-1,cells:{}},connected=false,busy=false,refreshing=false;
function message(text,state='ok'){status.textContent=text;status.dataset.state=state;retry.hidden=state!=='error'}
function adopt(value){
  if(!value||!Number.isSafeInteger(value.version)||!value.cells||typeof value.cells!=='object'||Array.isArray(value.cells))throw Error('Invalid board');
  for(const card of cards){const cell=value.cells[card.dataset.key];if(cell&&(!Number.isSafeInteger(cell.rev)||cell.rev<0||![true,false,null].includes(cell.value)))throw Error('Invalid selection');}
  if(value.version>=board.version)board=value;
}
function render(){
  let selected=0,shown=0;const term=search.value.normalize('NFC').trim().toLocaleLowerCase('ko');
  for(const card of cards){const checked=board.cells[card.dataset.key]?.value===true;const input=card.querySelector('input');input.checked=checked;input.disabled=!connected||busy;card.classList.toggle('is-selected',checked);selected+=checked?1:0;card.hidden=Boolean((only.checked&&!checked)||(term&&!card.dataset.search.normalize('NFC').toLocaleLowerCase('ko').includes(term)));shown+=card.hidden?0:1;}
  document.getElementById('selected-count').textContent=board.version<0?'—':selected;
  document.getElementById('shown-count').textContent=shown+'개';document.getElementById('empty').hidden=shown!==0;
  exportButton.disabled=!connected||busy||selected===0;
}
async function request(path,options={}){
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);
  try{const response=await fetch(API+path,{...options,headers,cache:'no-store',signal:controller.signal});const value=await response.json();return {response,value};}finally{clearTimeout(timer)}
}
async function refresh(){
  if(busy||refreshing)return;refreshing=true;
  try{const {response,value}=await request('/v1/state');if(!response.ok)throw Error('Read failed');adopt(value);connected=true;message('선택 목록 연결됨 · 변경 시 자동 저장');}
  catch{connected=false;message('연결을 확인해 주세요. 다시 연결한 뒤 선택할 수 있어요.','error');}
  finally{refreshing=false;render();}
}
async function save(card){
  if(!connected||busy){render();return;}
  busy=true;const key=card.dataset.key,value=card.querySelector('input').checked,rev=board.cells[key]?.rev||0;
  render();message('선택 저장 중…');
  try{
    const result=await request('/v1/check',{method:'POST',body:JSON.stringify({changes:[{key,value,rev}]})});
    if(result.response.status===409){adopt(result.value.board);message('다른 화면의 변경을 불러왔어요. 선택을 다시 확인해 주세요.');}
    else{if(!result.response.ok)throw Error('Save failed');adopt(result.value);message('선택 저장 완료');}
  }catch{
    // A timed-out write may have committed. Read once; never retry a write automatically.
    try{const result=await request('/v1/state');if(!result.response.ok)throw Error('Read failed');adopt(result.value);connected=true;message('저장 응답을 확인하지 못했어요. 현재 선택을 다시 확인해 주세요.','error');}
    catch{connected=false;message('저장 여부를 확인하지 못했어요. 다시 연결해 선택을 확인해 주세요.','error');}
  }finally{busy=false;render();}
}
for(const card of cards)card.querySelector('input').addEventListener('change',()=>save(card));
search.addEventListener('input',render);only.addEventListener('change',render);retry.addEventListener('click',refresh);
exportButton.addEventListener('click',()=>{
  const ids=new Set(cards.filter(c=>board.cells[c.dataset.key]?.value===true).map(c=>c.dataset.id));
  const quote=value=>'"'+String(value??'').replace(/^[=+@\-]/,"'$&").replaceAll('"','""')+'"';
  const rows=[['사진 ID','사진 구분','사용 페이지','페이지 링크','원본 이미지'],...data.filter(d=>ids.has(d.id)).map(d=>[d.id,d.title,d.pages,d.urls,d.source])];
  const blob=new Blob(['\uFEFF'+rows.map(row=>row.map(quote).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='beauty-blossom-selected-images.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
setInterval(()=>{if(!document.hidden)refresh()},5000);render();refresh();

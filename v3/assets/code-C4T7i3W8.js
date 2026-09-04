import{W as u}from"./widgets-LhN6N8FE.js";const v=document.getElementById("code"),h=[1440,1024,375],y={1440:1500,1024:1700,375:2100},f=(t,s)=>`<!doctype html><html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.css">
<style>html,body{margin:0}body{background:#fff;padding:20px 16px;overflow:hidden;
font-family:'Pretendard',system-ui,sans-serif}</style></head><body>${t}
<script>(function(){function p(){try{parent.postMessage({id:'${s}',h:document.documentElement.scrollHeight},'*')}catch(e){}}
addEventListener('load',p);setTimeout(p,150);setTimeout(p,700);setTimeout(p,1800);
if(window.ResizeObserver)new ResizeObserver(p).observe(document.body)})();<\/script>
</body></html>`;for(const t of u){const s=document.createElement("section");s.className="widget",s.innerHTML=`
    <div class="widget__hd">
      <span class="widget__kick">${t.prefix}- · ${t.file}</span>
      <h2>${t.name}</h2>
      <p>${t.desc}</p>
    </div>
    <div class="card">
      <div class="card__bar">
        <h3>미리보기</h3>
        <div class="tools">
          ${h.map((a,e)=>`<button type="button" data-w="${a}" aria-pressed="${e===0}">${a}px</button>`).join("")}
          <span class="dim js-scale"></span>
        </div>
      </div>
      <div class="stage"><div class="holder"><iframe title="${t.name} 미리보기"></iframe></div></div>
    </div>
    <div class="card">
      <div class="card__bar">
        <h3>코드</h3>
        <div class="tools">
          <span class="dim">${(t.src.length/1024).toFixed(1)} KB</span>
          <button type="button" class="js-copy">전체 복사</button>
        </div>
      </div>
      <pre><code></code></pre>
    </div>`,v.appendChild(s),s.querySelector("code").textContent=t.src;const r=s.querySelector("iframe"),p=s.querySelector(".stage"),l=s.querySelector(".holder"),m=s.querySelector(".js-scale");let d=h[0],i=0;r.srcdoc=f(t.src,t.id);const n=()=>{const a=p.clientWidth-32;if(a<40)return;const e=Math.min(1,a/d),o=i||y[d]||1500;Object.assign(r.style,{width:d+"px",height:o+"px",transform:e<1?`scale(${e})`:"none"}),l.style.width=Math.round(d*e)+"px",l.style.height=Math.round(o*e)+"px",m.textContent=e<1?Math.round(e*100)+"%":"100%"};addEventListener("message",a=>{const e=a.data;if(!e||e.id!==t.id||typeof e.h!="number"||e.h<120)return;const o=Math.round(e.h)+24;Math.abs(o-i)>4&&(i=o,n())}),r.addEventListener("load",()=>{n(),setTimeout(n,400)}),addEventListener("resize",n),setTimeout(n,120),s.querySelectorAll("[data-w]").forEach(a=>a.addEventListener("click",()=>{d=+a.dataset.w,s.querySelectorAll("[data-w]").forEach(e=>e.setAttribute("aria-pressed",e===a)),i=0,n(),setTimeout(n,300)}));const c=s.querySelector(".js-copy");c.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(t.src),c.textContent="복사했습니다"}catch{c.textContent="직접 선택해서 복사하세요"}setTimeout(()=>{c.textContent="전체 복사"},2200)})}

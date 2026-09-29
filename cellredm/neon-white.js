/* CellREDM only: white neon with a single narrow rightward rainbow sweep. */
(()=>{'use strict';
const NS='http://www.w3.org/2000/svg',roots=[...document.querySelectorAll('.bb-event-title')],media=matchMedia('(prefers-reduced-motion:reduce)');
const make=(tag,attrs={},parent)=>{const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(parent)parent.append(e);return e};
const active=root=>{root.dataset.neonPlaying=String(root.dataset.neonVisible==='true'&&!document.hidden&&!media.matches&&!navigator.connection?.saveData)};
const observer='IntersectionObserver'in window?new IntersectionObserver(entries=>{for(const e of entries){e.target.dataset.neonVisible=String(e.isIntersecting);active(e.target)}},{threshold:.05}):null;
function initialize(root,index){
 const img=root.querySelector('.bb-event-title-neon');if(!img||root.dataset.neonReady)return;
 if(!img.complete||!img.naturalWidth||!img.naturalHeight)return;
 const id=`bb-outline-${index}-${document.querySelectorAll('.bb-neon-svg').length}`,W=img.naturalWidth,H=img.naturalHeight;
 const svg=make('svg',{'viewBox':`0 0 ${W} ${H}`,'class':'bb-neon-svg','aria-hidden':'true','focusable':'false'}),defs=make('defs',{},svg);
 // Extract bright tube cores from the existing transparent image, never the rectangular background.
 const tube=make('filter',{id:id+'-tube','color-interpolation-filters':'sRGB',x:0,y:0,width:1,height:1},defs);
 make('feColorMatrix',{type:'matrix',values:'0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.063 3.576 .361 0 -3.65',result:'core'},tube);
 make('feComposite',{in:'core',in2:'SourceAlpha',operator:'in'},tube);
 const crisp=make('feComponentTransfer',{},tube);make('feFuncA',{type:'linear',slope:2,intercept:-.12},crisp);
 make('feMorphology',{operator:'dilate',radius:.7},tube);
 const clip=make('clipPath',{id:id+'-scope'},defs);
 make('rect',{x:0,y:0,width:W,height:H*.31},clip);
 make('rect',{x:W*.28,y:H*.29,width:W*.44,height:H*.69},clip);
 const mask=make('mask',{id:id+'-mask',maskUnits:'userSpaceOnUse',x:0,y:0,width:W,height:H,'style':'mask-type:alpha'},defs);
 make('image',{href:img.currentSrc||img.src,x:0,y:0,width:W,height:H,filter:`url(#${id}-tube)`,'clip-path':`url(#${id}-scope)`},mask);
 const bandWidth=W*.20;
 const rainbow=make('linearGradient',{id:id+'-rainbow',gradientUnits:'objectBoundingBox',x1:0,y1:0,x2:1,y2:0},defs);
 ['#edb5e8','#b29aff','#96d6ff','#99e5c0','#ffe5a0','#ffbba9','#edb5e8'].forEach((c,i)=>make('stop',{offset:i/6,'stop-color':c,'stop-opacity':i===0||i===6?0:1},rainbow));
 make('image',{href:img.currentSrc||img.src,x:0,y:0,width:W,height:H,filter:`url(#${id}-tube)`,'class':'cr-neon-white-base'},svg);
 const group=make('g',{mask:`url(#${id}-mask)`,'class':'cr-neon-line-mask'},svg);
 make('rect',{x:0,y:0,width:bandWidth,height:H,fill:`url(#${id}-rainbow)`,'class':'cr-neon-sweep'},group);
 svg.style.setProperty('--cr-sweep-start',`${-bandWidth}px`);svg.style.setProperty('--cr-sweep-end',`${W}px`);
 root.append(svg);root.dataset.neonReady='true';
 if(observer)observer.observe(root);else{root.dataset.neonVisible='true';active(root)}
}
roots.forEach((root,index)=>{const img=root.querySelector('.bb-event-title-neon');if(img)img.addEventListener('load',()=>initialize(root,index));initialize(root,index)});
const sync=()=>roots.forEach(active);window.addEventListener('pageshow',()=>{roots.forEach(initialize);sync()});document.addEventListener('visibilitychange',sync);media.addEventListener('change',sync);navigator.connection?.addEventListener?.('change',sync);
})();

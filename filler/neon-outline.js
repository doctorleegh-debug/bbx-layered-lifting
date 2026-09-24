/* Reusable: the moving rainbow is masked to the original lettering and logo tubes. */
(()=>{'use strict';
const NS='http://www.w3.org/2000/svg',roots=[...document.querySelectorAll('.bb-event-title')],media=matchMedia('(prefers-reduced-motion:reduce)');
const make=(tag,attrs={},parent)=>{const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(parent)parent.append(e);return e};
const active=root=>{root.dataset.neonPlaying=String(root.dataset.neonVisible==='true'&&!document.hidden&&!media.matches&&!navigator.connection?.saveData)};
const observer='IntersectionObserver'in window?new IntersectionObserver(entries=>{for(const e of entries){e.target.dataset.neonVisible=String(e.isIntersecting);active(e.target)}},{threshold:.05}):null;
roots.forEach(async(root,index)=>{
 const img=root.querySelector('.bb-event-title-neon');if(!img||root.dataset.neonReady)return;
 try{await img.decode()}catch{return}
 if(!img.naturalWidth||!img.naturalHeight)return;
 const id=`bb-outline-${index}-${document.querySelectorAll('.bb-neon-svg').length}`,W=img.naturalWidth,H=img.naturalHeight;
 const svg=make('svg',{'viewBox':`0 0 ${W} ${H}`,'class':'bb-neon-svg','aria-hidden':'true','focusable':'false'}),defs=make('defs',{},svg);
 // Recolor only green-dominant pixels; white tube cores and golden lettering stay intact.
 const tint=make('filter',{id:id+'-pink','color-interpolation-filters':'sRGB',x:0,y:0,width:1,height:1},defs);
 make('feColorMatrix',{in:'SourceGraphic',type:'matrix',values:'0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -4 4 0 0 -.12',result:'green'},tint);
 make('feComposite',{in:'green',in2:'SourceAlpha',operator:'in',result:'greenAlpha'},tint);
 make('feColorMatrix',{in:'SourceGraphic',type:'matrix',values:'0 1 0 0 0  .92 .08 0 0 0  .4 .4 .2 0 0  0 0 0 1 0',result:'rose'},tint);
 make('feComposite',{in:'rose',in2:'greenAlpha',operator:'in',result:'roseOnly'},tint);
 make('feComposite',{in:'SourceGraphic',in2:'greenAlpha',operator:'out',result:'rest'},tint);
 const merge=make('feMerge',{},tint);make('feMergeNode',{in:'rest'},merge);make('feMergeNode',{in:'roseOnly'},merge);
 // Extract bright tube cores from the existing transparent image, never the rectangular background.
 const tube=make('filter',{id:id+'-tube','color-interpolation-filters':'sRGB',x:0,y:0,width:1,height:1},defs);
 make('feColorMatrix',{type:'matrix',values:'0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.063 3.576 .361 0 -3.65',result:'core'},tube);
 make('feComposite',{in:'core',in2:'SourceAlpha',operator:'in'},tube);
 make('feMorphology',{operator:'dilate',radius:1.3},tube);
 const clip=make('clipPath',{id:id+'-scope'},defs);
 make('rect',{x:0,y:0,width:W,height:H*.31},clip);
 make('rect',{x:W*.28,y:H*.29,width:W*.44,height:H*.69},clip);
 const mask=make('mask',{id:id+'-mask',maskUnits:'userSpaceOnUse',x:0,y:0,width:W,height:H,'style':'mask-type:alpha'},defs);
 make('image',{href:img.currentSrc||img.src,x:0,y:0,width:W,height:H,filter:`url(#${id}-tube)`,'clip-path':`url(#${id}-scope)`},mask);
 const rainbow=make('linearGradient',{id:id+'-rainbow',gradientUnits:'userSpaceOnUse',x1:0,y1:0,x2:W,y2:0,spreadMethod:'repeat'},defs);
 ['#ff296e','#ff952f','#ffe66d','#38e0a2','#35cdf7','#8b66ff','#ed41dd','#ff296e'].forEach((c,i)=>make('stop',{offset:i/7,'stop-color':c},rainbow));
 const sheen=make('linearGradient',{id:id+'-sheen',gradientUnits:'userSpaceOnUse',x1:0,y1:0,x2:W,y2:0,spreadMethod:'repeat'},defs);
 [[0,0],[.41,0],[.48,.3],[.51,.95],[.55,.3],[.62,0],[1,0]].forEach(([offset,opacity])=>make('stop',{offset,'stop-color':'#ffffff','stop-opacity':opacity},sheen));
 make('image',{href:img.currentSrc||img.src,x:0,y:0,width:W,height:H,filter:`url(#${id}-pink)`},svg);
 const group=make('g',{mask:`url(#${id}-mask)`,'class':'bb-neon-tubes'},svg);
 make('rect',{x:-W,y:0,width:W*3,height:H,fill:`url(#${id}-rainbow)`,'class':'bb-neon-spectrum'},group);
 make('rect',{x:-W,y:0,width:W*3,height:H,fill:`url(#${id}-sheen)`,'class':'bb-neon-sheen'},group);
 svg.style.setProperty('--neon-period',`${W}px`);root.append(svg);root.dataset.neonReady='true';
 if(observer)observer.observe(root);else{root.dataset.neonVisible='true';active(root)}
 });
const sync=()=>roots.forEach(active);document.addEventListener('visibilitychange',sync);media.addEventListener('change',sync);navigator.connection?.addEventListener?.('change',sync);
})();

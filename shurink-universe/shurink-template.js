/* Keep the shared footer unchanged; adapt this preview's event frame only. */
(()=>{'use strict';const root=document.querySelector('#bb-shurink');if(!root)return;
const css=`.eb-book{clip-path:inset(-20px -22px -20px -22px)}
@media(min-width:768px) and (max-width:1200px){.eb-section{zoom:.85;width:100%}}`;
function apply(){const shadow=root.querySelector('bb-brand-footer')?.shadowRoot;if(!shadow)return false;
 if(!shadow.querySelector('[data-su-template]')){const style=document.createElement('style');style.dataset.suTemplate='r10';style.textContent=css;shadow.append(style)}return true}
if(!apply()){const observer=new MutationObserver(()=>{if(apply())observer.disconnect()});observer.observe(root,{childList:true});window.addEventListener('pagehide',()=>observer.disconnect(),{once:true})}
})();

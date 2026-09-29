(()=>{'use strict';const root=document.querySelector('#bb-thermage');if(!root)return;
const science=root.querySelector('#science');const phase=['energy','cooling','remodeling'];
function syncPhase(){const selected=[...root.querySelectorAll('.tf-tabs [role=tab]')].findIndex(t=>t.getAttribute('aria-selected')==='true');science.dataset.phase=phase[Math.max(0,selected)]}
new MutationObserver(syncPhase).observe(root.querySelector('.tf-tabs'),{subtree:true,attributes:true,attributeFilter:['aria-selected']});syncPhase();
const portrait=root.querySelector('.tf2-portrait'),cards=[...root.querySelectorAll('.tf2-area-card')];
function choose(value){portrait.dataset.area=value;cards.forEach(card=>{const active=card.dataset.areaCard===value;card.dataset.active=String(active);card.querySelector('button').setAttribute('aria-pressed',String(active))});}
cards.forEach(card=>{const button=card.querySelector('button');button.addEventListener('click',()=>choose(button.dataset.area));card.addEventListener('click',e=>{if(!e.target.closest('button'))choose(button.dataset.area)});});
})();

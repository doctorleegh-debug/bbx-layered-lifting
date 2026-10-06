/* Shurink preview contact layout. Reuses the shared template's text and destinations. */
(() => {
  'use strict';
  const root = document.getElementById('bb-shurink');
  if (!root) return;
  const css = `
.contact[data-su-contact]{background:#fff9f8;padding:100px 0 96px;color:#392e32}
.contact[data-su-contact] .su-visit-heading{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-bottom:48px}
.contact[data-su-contact] .display{font-size:clamp(52px,5.4vw,80px);line-height:1.05;color:#F19391;margin:0}
.contact[data-su-contact] h2{font-size:clamp(29px,2.6vw,40px);line-height:1.45;margin:0;letter-spacing:-.045em}
.contact[data-su-contact] .contact-grid{grid-template-columns:1.08fr 1fr;gap:0;background:#fff;border:1px solid #eddad7;border-radius:28px;overflow:hidden}
.contact[data-su-contact] .map{min-width:0;display:flex;flex-direction:column;border-right:1px solid #eddad7;background:#f9efed}
.contact[data-su-contact] .map iframe{flex:1 1 auto;min-height:400px;height:100%;width:100%;border:0}
.contact[data-su-contact] .map>a{display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:62px;padding:17px 25px;background:#fff;font-size:16px;font-weight:700;text-decoration:none;border-top:1px solid #eddad7}
.contact[data-su-contact] .map>a:hover{background:#fff5f3}
.contact[data-su-contact] .info{min-width:0;display:block;padding:36px 40px}
.contact[data-su-contact] .su-visit-block{min-width:0}
.contact[data-su-contact] .su-visit-block+.su-visit-block{border-top:1px solid #eadbd8;margin-top:26px;padding-top:26px}
.contact[data-su-contact] .info h3{display:flex;align-items:center;gap:13px;font-size:24px;line-height:1.45;margin:0 0 16px}
.contact[data-su-contact] .su-visit-icon{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;flex:none;border-radius:12px;background:#fff0ed;color:#995558}
.contact[data-su-contact] .su-visit-icon svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.contact[data-su-contact] .info address{font-size:18px;line-height:1.9;margin:0}
.contact[data-su-contact] .info p{font-size:18px;line-height:1.95;color:#625356}
.contact[data-su-contact] .info>a{display:inline-flex;align-items:center;min-height:44px;font-size:15px;line-height:1.7;margin-top:18px;text-underline-offset:5px}
.contact[data-su-contact] .actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:20px}
.contact[data-su-contact] .button{min-width:0;min-height:64px;padding:15px 20px;border:1px solid #e4c9c6;border-radius:14px;background:#fff;font-size:18px;color:#503641;line-height:1.5;transition:background .2s,border-color .2s;transform:none}
.contact[data-su-contact] .button:hover{border-color:#b97678;background:#fff1ee;transform:none}
.contact[data-su-contact] .button:first-child{background:#f19391;border-color:#f19391;color:#402d33}
.contact[data-su-contact] .button:first-child:hover{background:#ed8684;border-color:#ed8684}
.contact[data-su-contact] a:focus-visible{outline:3px solid #7f3f55;outline-offset:-5px}
@media(max-width:1000px){
 .contact[data-su-contact] .su-visit-heading{gap:30px}
 .contact[data-su-contact] .contact-grid{grid-template-columns:1fr 1fr}
 .contact[data-su-contact] .info{padding:28px}
 .contact[data-su-contact] .info address,.contact[data-su-contact] .info p{font-size:17px}
 .contact[data-su-contact] .map iframe{min-height:430px}
}
@media(max-width:760px){
 .contact[data-su-contact]{padding:66px 0}
 .contact[data-su-contact] .su-visit-heading{grid-template-columns:1fr;gap:24px;margin-bottom:30px}
 .contact[data-su-contact] .display{font-size:54px}
 .contact[data-su-contact] h2{font-size:30px;line-height:1.45}
 .contact[data-su-contact] .contact-grid{grid-template-columns:1fr;border-radius:22px}
 .contact[data-su-contact] .map{border-right:0;border-bottom:1px solid #eddad7}
 .contact[data-su-contact] .map iframe{flex:none;min-height:0;height:300px}
 .contact[data-su-contact] .map>a{font-size:15px;padding:15px 22px;min-height:58px}
 .contact[data-su-contact] .info{padding:26px 24px}
 .contact[data-su-contact] .info h3{font-size:23px;gap:11px}
 .contact[data-su-contact] .info address,.contact[data-su-contact] .info p{font-size:17px}
 .contact[data-su-contact] .su-visit-block+.su-visit-block{margin-top:23px;padding-top:23px}
 .contact[data-su-contact] .actions{grid-template-columns:1fr;gap:10px;margin-top:16px}
 .contact[data-su-contact] .button{min-height:58px;font-size:17px;padding:13px 18px;border-radius:12px}
}
@media(max-width:359px){
 .contact[data-su-contact] h2{font-size:27px}
 .contact[data-su-contact] .info{padding:24px 20px}
 .contact[data-su-contact] .info address,.contact[data-su-contact] .info p{font-size:16px}
}
@media(prefers-reduced-motion:reduce){.contact[data-su-contact] .button{transition:none}}
`;
  const paths = {
    pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    clock: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z M12 6v6l4 2',
  };
  function icon(kind) {
    const span = document.createElement('span');
    span.className = 'su-visit-icon';
    span.setAttribute('aria-hidden', 'true');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', paths[kind]);
    svg.append(path);
    span.append(svg);
    return span;
  }
  function enhance() {
    const shadow = root.querySelector('bb-brand-footer')?.shadowRoot;
    const contact = shadow?.querySelector('.contact');
    if (!contact) return false;
    if (contact.hasAttribute('data-su-contact')) return true;
    const display = contact.querySelector('.display');
    const title = contact.querySelector('h2');
    const info = contact.querySelector('.info');
    const headings = info?.querySelectorAll('h3');
    const address = info?.querySelector('address');
    const hours = info?.querySelector('p');
    if (!display || !title || headings?.length !== 2 || !address || !hours) return false;
    const style = document.createElement('style');
    style.dataset.suContactStyle = 'r02';
    style.textContent = css;
    const heading = document.createElement('div');
    heading.className = 'su-visit-heading';
    display.before(heading);
    heading.append(display, title);
    for (const [h, content, kind] of [[headings[0], address, 'pin'], [headings[1], hours, 'clock']]) {
      const block = document.createElement('div');
      block.className = 'su-visit-block';
      h.before(block);
      h.prepend(icon(kind));
      block.append(h, content);
    }
    shadow.append(style);
    contact.dataset.suContact = 'r02';
    return true;
  }
  if (enhance()) return;
  const observer = new MutationObserver(() => { if (enhance()) observer.disconnect(); });
  observer.observe(root, {childList: true});
  // Stop observing when the document goes away; the shared template has a static fallback.
  window.addEventListener('pagehide', () => observer.disconnect(), {once: true});
})();

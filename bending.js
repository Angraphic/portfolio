// Parti condivise della versione ispirata a bendingspoons.com: menu a schermo intero, footer, comparse allo scroll, video.
// Va caricato dopo dati.js e motivi.js. La pagina dichiara chi è con <body data-page="home|project">.
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => String(n).padStart(2, '0');
const mail = 'mailto:antonio.nocella3@gmail.com';
const isHome = document.body.dataset.page === 'home';
const home = isHome ? '' : 'bending.html'; // i link alle sezioni della home
const caseUrl = w => `bending-progetto.html?id=${w.id}`;
// una frase breve per ogni lavoro
const tagline = {
  '01': 'Every lead. One pipeline.', '01-site': 'A whole SaaS, explained in one scroll.', '02': 'Your parcels. Only when it matters.',
  '03': '1,700 colours. A few questions.', '04': 'Touch the samples. Keep the palette.', '05': 'An agency, run from one place.',
  '06': 'Design trends, on a globe.', '07': 'Motion that explains.', '08': 'Industrial tech. Numbers first.',
  '09': 'Gear for pilots.', '10': 'Made in Italy. Made to fly.', '11': 'From factory to site.',
};
const current = new URLSearchParams(location.search).get('id') || location.hash.slice(1);

// menu: sezioni in grande a sinistra, tutti i progetti a destra
document.body.insertAdjacentHTML('beforeend', `
<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
  <div class="menu-top"><div class="wrap in">
    <a href="${home || '#'}" class="brand" aria-label="Nocella, home"><span class="mm-word">Nocella</span></a>
    <button class="menu-btn" id="menuClose">Close <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button>
  </div></div>
  <div class="menu-body">
    <div class="wrap menu-grid">
      <ul class="menu-main">
        ${[['Home', home || '#top'], ['Projects', home + '#projects'], ['How I work', home + '#method'], ['Experience', home + '#experience'], ['Contact', home + '#contact']]
          .map(([t, h], i) => `<li style="--i:${i}"><a href="${h}">${t}</a></li>`).join('')}
      </ul>
      <div class="menu-side">
        <p class="mono-l" style="--i:2">Projects · ${pad(works.length)}</p>
        <ul class="menu-projects">${works.map((w, i) => `<li style="--i:${3 + i * .6}"><a href="${caseUrl(w)}"${w.id === current && !isHome ? ' aria-current="page"' : ''}><i style="background:${w.c}"></i>${w.n}</a></li>`).join('')}</ul>
      </div>
    </div>
    <div class="wrap menu-foot"><span>antonio.nocella3@gmail.com · Adelfia, Bari · also remotely</span><div><a href="${mail}">Write to me ↗</a><a href="index.html">The classic site</a></div></div>
  </div>
</div>`);
{
  const menu = $('#menu'), btn = $('#menuBtn');
  const open = () => {
    menu.hidden = false; document.documentElement.classList.add('lock'); btn.setAttribute('aria-expanded', true);
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('on'))); $('#menuClose').focus();
  };
  const close = () => {
    if (menu.hidden) return;
    menu.classList.remove('on'); document.documentElement.classList.remove('lock'); btn.setAttribute('aria-expanded', false);
    setTimeout(() => { if (!menu.classList.contains('on')) menu.hidden = true; }, 360);
  };
  btn.onclick = open;
  $('#menuClose').onclick = () => { close(); btn.focus(); };
  menu.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { close(); btn.focus(); } });
}

// footer
$('#foot').innerHTML = `<div class="wrap">
  <div class="fcols">
    <div><p class="mono-l">Sections</p><ul><li><a href="${home}#projects">Projects</a></li><li><a href="${home}#method">How I work</a></li><li><a href="${home}#experience">Experience</a></li><li><a href="index.html">The classic site</a></li></ul></div>
    <div><p class="mono-l">Latest work</p><ul>${works.slice(0, 5).map(w => `<li><a href="${caseUrl(w)}">${w.n}</a></li>`).join('')}</ul></div>
    <div><p class="mono-l">Contact</p><ul><li><a href="${mail}">antonio.nocella3@gmail.com</a></li><li>Adelfia, Bari, Italy</li><li>Also available remotely</li></ul></div>
    <div><p class="legal">© 2026 Antonio Nocella. All rights reserved. Design and code may not be copied or reused without permission. Videos are screen recordings of the live products; prototypes and personal projects are marked as such.</p></div>
  </div>
  <div class="fbig" aria-hidden="true">Nocella</div>
  <p class="tagline">Designed by me. <em>Built by me.</em></p>
</div>`;

// comparsa allo scroll: la pagina chiama reveal() dopo aver scritto il suo contenuto
const rvIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rvIO.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
const reveal = () => $$('.rv:not(.in)').forEach(el => rvIO.observe(el));

// video del progetto in un riquadro a schermo
document.body.insertAdjacentHTML('beforeend', `
<dialog class="vmodal" id="vmodal" aria-labelledby="vmTitle">
  <button class="vm-close" id="vmClose" aria-label="Close video"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  <video id="vmVideo" controls playsinline loop muted></video>
  <div class="vm-bar"><h3 id="vmTitle"></h3><a class="see" id="vmCase">Case study ↗</a></div>
</dialog>`);
const film = (() => {
  const modal = $('#vmodal'), vid = $('#vmVideo');
  $('#vmClose').onclick = () => modal.close();
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', () => { vid.pause(); vid.removeAttribute('src'); vid.load(); });
  return w => {
    vid.poster = media(w.id) + '.jpg'; vid.src = media(w.id) + '.webm';
    $('#vmTitle').textContent = w.n; $('#vmCase').href = caseUrl(w);
    $('#vmCase').hidden = !isHome;
    modal.classList.toggle('tall', !!w.tall);
    modal.showModal(); vid.play().catch(() => {});
  };
})();

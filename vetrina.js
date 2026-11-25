// Parti condivise della versione vetrina (home-vetrina.html, progetto-vetrina.html): menu a schermo intero, footer, comparse allo scroll, video.
// Va caricato dopo dati.js e motivi.js. La pagina dichiara chi è con <body data-page="home|project">.
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => String(n).padStart(2, '0');
const mail = 'mailto:antonio.nocella3@gmail.com';
const isHome = document.body.dataset.page === 'home';
const home = isHome ? '' : 'home-vetrina.html'; // i link alle sezioni della home
const caseUrl = w => `progetto-vetrina.html?id=${w.id}`;
// una frase breve per ogni lavoro
const tagline = {
  '01': 'Every lead. One pipeline.', '01-site': 'A whole SaaS, explained in one scroll.', '02': 'Your parcels. Only when it matters.',
  '03': '1,700 colours. A few questions.', '04': 'Touch the samples. Keep the palette.', '05': 'An agency, run from one place.',
  '06': 'Design trends, on a globe.', '07': 'Motion that explains.', '08': 'Industrial tech. Numbers first.',
  '09': 'Gear for pilots.', '10': 'Made in Italy. Made to fly.', '11': 'From factory to site.',
};
const current = new URLSearchParams(location.search).get('id') || location.hash.slice(1);
// logo: "Nocella" disegnato su misura, senza font: lettere in contrasto, "ll" a tetto, la "o" a forma di nocciola (anche in assets/logo-nocella.svg)
const LOGO = '<svg class="logo" viewBox="-10 -780 3063 790" fill="currentColor" role="img" aria-label="Nocella"><path d="M2943.6 0H3042.8L3007.6 -35.2V-250V-508L2943.6 -468.3V-417C2897.8 -468 2831.5 -500 2757.6 -500C2619.5 -500 2507.6 -388.1 2507.6 -250C2507.6 -111.9 2619.5 0 2757.6 0C2831.5 0 2897.8 -32 2943.6 -83ZM1116 -250C1116 -329.9 1078.5 -401 1020.2 -446.8L866 -570L711.8 -446.8C653.5 -401 616 -329.9 616 -250C616 -136.3 691.9 -40.3 795.8 -10H936.2C1040.1 -40.3 1116 -136.3 1116 -250ZM2197.6 -250C2197.6 -388.1 2085.7 -500 1947.6 -500C1809.5 -500 1697.6 -388.1 1697.6 -250C1697.6 -111.9 1809.5 0 1947.6 0C2021.3 0 2087.6 -31.9 2133.4 -82.7L2093 -119.1C2058.9 -70.9 2006.5 -40 1947.6 -40C1849.6 -40 1769.4 -125.5 1762.1 -234H2195.6V-241.3L2197.5 -241.3C2197.6 -244.2 2197.6 -247.1 2197.6 -250ZM0 0H47.4V-650.9L469.1 0H560V-724H512.6V-73.1L90.9 -724H0ZM2943.6 -250C2943.6 -134 2860.3 -40 2757.6 -40C2654.9 -40 2571.6 -134 2571.6 -250C2571.6 -366 2654.9 -460 2757.6 -460C2860.3 -460 2943.6 -366 2943.6 -250ZM1052 -254C1052 -141.3 968.7 -50 866 -50C763.3 -50 680 -141.3 680 -254C680 -366.7 763.3 -458 866 -458C968.7 -458 1052 -366.7 1052 -254ZM1565.7 -375.3 1607.9 -410.7C1562.1 -465.3 1493.3 -500 1416.4 -500C1278.3 -500 1166.4 -388.1 1166.4 -250C1166.4 -111.9 1278.3 0 1416.4 0C1493.3 0 1562.1 -34.7 1607.9 -89.3L1565.7 -124.7C1531.8 -73.3 1477.5 -40 1416.4 -40C1313.7 -40 1230.4 -134 1230.4 -250C1230.4 -366 1313.7 -460 1416.4 -460C1477.5 -460 1531.8 -426.7 1565.7 -375.3ZM1763.2 -278C1775.4 -380.7 1853.3 -460 1947.6 -460C2041.9 -460 2119.8 -380.7 2132 -278ZM2253.6 0H2317.6V-770L2253.6 -730.3ZM2387.6 0H2451.6V-730.3L2387.6 -770Z"/></svg>';

// menu: sezioni in grande a sinistra, tutti i progetti a destra
document.body.insertAdjacentHTML('beforeend', `
<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
  <div class="menu-top"><div class="wrap in">
    <a href="${home || '#'}" class="brand" aria-label="Nocella, home"></a>
    <button class="menu-btn" id="menuClose">Close <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button>
  </div></div>
  <div class="menu-body">
    <div class="wrap menu-grid">
      <ul class="menu-main">
        ${[['Home', home || '#top'], ['Projects', home + '#projects'], ['How I work', home + '#method'], ['Experience', home + '#experience'], ['Contact', home + '#contact']]
          .map(([t, h], i) => `<li style="--i:${i}"><a href="${h}">${t}</a></li>`).join('')}
      </ul>
      <div class="menu-side">
        <p class="mono-l" style="--i:2">Contact</p>
        <ul class="menu-contact"><li style="--i:3"><a href="${mail}">antonio.nocella3@gmail.com</a></li><li style="--i:4">Adelfia, Bari, Italy · also remotely</li><li style="--i:5"><a href="${mail}" class="pill pill-lg">Write to me ↗</a></li></ul>
      </div>
    </div>
    <div class="wrap menu-foot"><span>© 2026 Antonio Nocella</span><a href="index.html">The classic site</a></div>
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
  <div class="fbig" aria-hidden="true">${LOGO}</div>
  <p class="tagline">Designed by me. <em>Built by me.</em></p>
</div>`;

// il logo in barra e nel menu
$$('.brand').forEach(b => (b.innerHTML = LOGO));

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

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
// logo: "Nocella" in Instrument Sans, con la "o" a forma di nocciola (anche in assets/logo-nocella.svg)
const LOGO = '<svg class="logo" viewBox="0 246 3406 754" fill="currentColor" fill-rule="evenodd" role="img" aria-label="Nocella"><path d="M74 970V250H197L555 827V250H657V970H534L176 393V970ZM1014.0 397.6L1164.8 503.8A262.0 262.0 0 1 1 863.2 503.8ZM856.0 718.0A158.0 158.0 0 1 0 1172.0 718.0A158.0 158.0 0 1 0 856.0 718.0ZM1583.0 980Q1510.0 980 1453.0 945.5Q1396.0 911 1363.5 851.0Q1331.0 791 1331.0 714Q1331.0 637 1363.5 577.5Q1396.0 518 1453.0 484.0Q1510.0 450 1582.0 450Q1643.0 450 1691.0 473.0Q1739.0 496 1770.0 537.0Q1801.0 578 1810.0 634H1712.0Q1702.0 589 1668.5 562.0Q1635.0 535 1584.0 535Q1540.0 535 1507.0 557.0Q1474.0 579 1456.0 619.0Q1438.0 659 1438.0 714Q1438.0 768 1456.0 809.0Q1474.0 850 1507.0 872.5Q1540.0 895 1585.0 895Q1634.0 895 1668.5 868.5Q1703.0 842 1713.0 797H1811.0Q1801.0 852 1769.5 893.0Q1738.0 934 1690.0 957.0Q1642.0 980 1583.0 980ZM2122.0 980Q2045.0 980 1986.5 946.0Q1928.0 912 1895.0 852.0Q1862.0 792 1862.0 714Q1862.0 635 1894.5 575.5Q1927.0 516 1986.0 483.0Q2045.0 450 2121.0 450Q2195.0 450 2249.5 481.5Q2304.0 513 2333.5 569.0Q2363.0 625 2363.0 702Q2363.0 714 2362.5 724.5Q2362.0 735 2360.0 746H1969.0Q1975.0 810 2009.0 850Q2050.0 899 2124.0 899Q2169.0 899 2202.0 880.5Q2235.0 862 2251.0 826H2349.0Q2324.0 898 2264.5 939.0Q2205.0 980 2122.0 980ZM1970.0 668H2260.0Q2254.0 608 2224.0 574Q2187.0 531 2121.0 531Q2050.0 531 2009.0 579Q1979.0 614 1970.0 668ZM2457.0 970V250H2561.0V970ZM2695.0 970V250H2799.0V970ZM3249.0 970Q3244.0 951 3243.0 928Q3241.0 911 3241.0 889Q3222.0 928 3185.0 951Q3139.0 980 3073.0 980Q2995.0 980 2949.0 941.5Q2903.0 903 2903.0 837Q2903.0 769 2951.5 729.5Q3000.0 690 3091.0 676L3236.0 653V629Q3236.0 580 3211.5 555.5Q3187.0 531 3134.0 531Q3083.0 531 3052.5 551.0Q3022.0 571 3017.0 608H2918.0Q2925.0 536 2983.0 493.0Q3041.0 450 3138.0 450Q3238.0 450 3288.0 496.5Q3338.0 543 3338.0 633V872Q3338.0 895 3341.0 919.0Q3344.0 943 3350.0 970ZM3236.0 726 3107.0 746Q3056.0 754 3030.5 773.0Q3005.0 792 3005.0 828Q3005.0 863 3028.5 880.5Q3052.0 898 3097.0 898Q3157.0 898 3196.5 869.0Q3236.0 840 3236.0 796Z"/></svg>';

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

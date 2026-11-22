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
// logo: "Nocella" in Instrument Sans Regular, con la "o" a forma di nocciola (anche in assets/logo-nocella.svg)
const LOGO = '<svg class="logo" viewBox="0 246 3358 754" fill="currentColor" fill-rule="evenodd" role="img" aria-label="Nocella"><path d="M86 970V250H171L572 838V250H650V970H565L164 382V970ZM1016.0 399.6L1177.6 534.6A252.0 252.0 0 1 1 854.4 534.6ZM844.0 728.0A172.0 172.0 0 1 0 1188.0 728.0A172.0 172.0 0 1 0 844.0 728.0ZM1578.0 980Q1508.0 980 1453.5 945.5Q1399.0 911 1367.5 850.5Q1336.0 790 1336.0 713Q1336.0 636 1367.5 577.0Q1399.0 518 1453.5 484.0Q1508.0 450 1577.0 450Q1634.0 450 1679.5 472.0Q1725.0 494 1754.5 534.5Q1784.0 575 1792.0 629H1718.0Q1708.0 580 1672.0 549.0Q1636.0 518 1579.0 518Q1530.0 518 1494.0 542.0Q1458.0 566 1438.0 610.0Q1418.0 654 1418.0 713Q1418.0 772 1438.0 817.0Q1458.0 862 1494.5 887.0Q1531.0 912 1580.0 912Q1635.0 912 1672.0 881.5Q1709.0 851 1719.0 802H1793.0Q1784.0 855 1753.5 895.5Q1723.0 936 1678.0 958.0Q1633.0 980 1578.0 980ZM2106.0 980Q2033.0 980 1977.0 945.5Q1921.0 911 1889.0 851.0Q1857.0 791 1857.0 713.0Q1857.0 635 1888.5 575.5Q1920.0 516 1977.0 483.0Q2034.0 450 2108.0 450Q2179.0 450 2231.5 481.0Q2284.0 512 2312.5 568.0Q2341.0 624 2341.0 700Q2341.0 710 2340.5 719.0Q2340.0 728 2338.0 739H1940.0Q1946.0 811 1986.0 857Q2032.0 912 2110.0 912Q2159.0 912 2196.0 890.5Q2233.0 869 2250.0 829H2326.0Q2301.0 899 2242.5 939.5Q2184.0 980 2106.0 980ZM1942.0 672H2261.0Q2254.0 607 2223.0 567Q2182.0 518 2108.0 518Q2032.0 518 1986.0 570Q1950.0 611 1942.0 672ZM2449.0 970V250H2529.0V970ZM2677.0 970V250H2757.0V970ZM3218.0 970Q3214.0 953 3213.0 931Q3211.0 915 3211.0 893Q3193.0 930 3157.0 952Q3110.0 980 3043.0 980Q2964.0 980 2917.5 941.5Q2871.0 903 2871.0 836.0Q2871.0 769 2917.0 732.0Q2963.0 695 3051.0 680L3206.0 654V631Q3206.0 573 3179.5 545.5Q3153.0 518 3094.0 518Q3036.0 518 3001.5 541.5Q2967.0 565 2963.0 608H2886.0Q2891.0 534 2948.0 492.0Q3005.0 450 3097.0 450Q3192.0 450 3238.0 495.0Q3284.0 540 3284.0 630V875Q3284.0 897 3287.0 920.5Q3290.0 944 3295.0 970ZM3206.0 720 3063.0 742Q3007.0 751 2978.0 772.0Q2949.0 793 2949.0 833Q2949.0 872 2975.5 892.0Q3002.0 912 3054.0 912Q3121.0 912 3163.5 881.5Q3206.0 851 3206.0 802Z"/></svg>';

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

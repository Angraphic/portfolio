// giri interattivi: cursore finto visibile + clic "lenti", così nel video si capisce cosa succede
const CURSOR = `addEventListener('DOMContentLoaded', () => {
  const c = document.createElement('div');
  c.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 2l16 9-7 2-3 7z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  c.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;transform:translate(-100px,-100px);transition:scale .12s;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4))';
  document.documentElement.append(c);
  addEventListener('mousemove', e => c.style.transform = 'translate(' + (e.clientX - 4) + 'px,' + (e.clientY - 2) + 'px)', true);
  addEventListener('mousedown', () => c.style.scale = '.82', true);
  addEventListener('mouseup', () => c.style.scale = '1', true);
});`;
export default ({ J, desk, glide, sleep }) => {
  const tap = async (page, loc, after = 900) => {
    const l = typeof loc === 'string' ? page.locator(loc).first() : loc.first();
    try {
      await l.scrollIntoViewIfNeeded({ timeout: 4000 });
      const b = await l.boundingBox();
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 22 });
      await sleep(160);
      await page.mouse.down(); await sleep(90); await page.mouse.up();
    } catch (e) { console.log('tap', String(loc), e.message.split('\n')[0]); }
    await sleep(after);
  };
  const before = (extra = '') => async page => page.addInitScript(CURSOR + extra);

  J('01', {
    url: 'https://login.leadwin.it', before: before(),
    prep: async page => {
      await sleep(2000);
      await page.locator('input[type=email]').fill(process.env.LW_USER);
      await page.locator('input[type=password]').fill(process.env.LW_PASS);
      await page.locator('input[type=password]').press('Enter');
      await page.waitForURL(/dashboard/, { timeout: 30000 }).catch(() => {});
      await sleep(4500);
    },
    run: async (page, poster) => {
      await page.mouse.move(900, 500); await sleep(800); await poster();
      await glide(page, 520, 1500); await sleep(600);
      const nav = name => page.getByRole('button', { name });
      await tap(page, nav(/^Pipeline/), 2600);
      await tap(page, nav(/^Leads/), 1800);
      await page.mouse.move(900, 500, { steps: 12 }); await glide(page, 500, 1400); await sleep(500);
      await tap(page, nav(/^Calendario/), 2400);
      await tap(page, nav(/^Agenti/), 2400);
    },
  });

  J('03', {
    url: 'https://intessuto.vercel.app', before: before("\nlocalStorage.setItem('inpelle_tour_done','1');"),
    run: async (page, poster) => {
      await sleep(1800); await poster();
      await tap(page, 'text=Inizia ora', 1500);
      await tap(page, "button:has-text('Divano')", 500);
      await tap(page, "button:has-text('Animali domestici')", 400);
      await tap(page, "button:has-text('Lavabile con acqua')", 600);
      await tap(page, "md-filled-button:has-text('Avanti')", 1300);
      await tap(page, 'text=Fatti guidare', 1600);
      await tap(page, page.locator('.dsc__card').nth(1), 700);
      await tap(page, "md-filled-button:has-text('Avanti')", 1300);
      for (let k = 0; k < 3; k++) await tap(page, k === 1 ? '.deck__btn--nope' : '.deck__btn--like', 700);
    },
  });

  const tall = { w: 540, h: 960, ow: 540, oh: 960 };
  J('04', {
    url: 'http://localhost:8137', view: tall, before: before(),
    run: async (page, poster) => {
      await sleep(2500); await poster();
      await tap(page, "button:has-text('Inizia')", 1800);
      await page.mouse.move(400, 500, { steps: 15 }); await sleep(400);
      await tap(page, "button:has-text('Scegli Casa')", 1800);
      const seq = ['Mi rappresenta', 'Non fa per me', 'Mi incuriosisce', 'Mi rappresenta', 'Mi rappresenta', 'Non fa per me'];
      for (const s of seq) await tap(page, `[aria-label="${s}"]`, 1100);
    },
  });

  J('06', {
    url: 'https://finish-decor.vercel.app', view: { w: 450, h: 800, ow: 450, oh: 800 }, before: before(),
    run: async (page, poster) => {
      await sleep(3000); await poster();
      await page.mouse.move(150, 380, { steps: 10 }); await page.mouse.down();
      await page.mouse.move(330, 360, { steps: 45 }); await page.mouse.up(); await sleep(1200);
      await tap(page, 'text=Miami', 2600);
      await tap(page, '#spotlight-close', 1000);
      await tap(page, 'text=Zellige', 2600);
      await tap(page, '#spotlight-close', 1200);
    },
  });

  // prototipo condiviso: solo navigazione, niente trascinamenti o salvataggi che cambierebbero i dati
  J('05', {
    url: 'https://manytask.vercel.app', before: before(),
    run: async (page, poster) => {
      await sleep(2500); await page.mouse.move(900, 450); await sleep(500); await poster();
      await glide(page, 420, 1400); await sleep(700);
      await tap(page, page.getByRole('link', { name: /^Task/ }), 1500);
      await tap(page, '[aria-label="Vista board"]', 1800);
      await page.mouse.move(380, 520, { steps: 18 }); await sleep(900);
      await tap(page, page.getByRole('link', { name: 'Contratti' }), 1800);
      await tap(page, page.getByRole('link', { name: 'Scadenze' }), 2000);
      await tap(page, page.getByRole('link', { name: 'Catalogo servizi' }), 2000);
    },
  });
};

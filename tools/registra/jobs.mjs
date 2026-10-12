export default ({ J, desk, phone, scrollTour, glide, sleep }) => {
  const tour = scrollTour([[900, 1700, 500], [900, 1700, 500], [900, 1700, 500], [900, 1700, 700]]);
  const click = sel => async page => { await sleep(2500); await page.locator(sel).first().click({ timeout: 8000 }).catch(e => console.log('click', e.message)); await sleep(800); };
  J('01-site', { url: 'https://leadwin.it', run: tour });
  J('02', { url: 'https://traccio-landing-six.vercel.app', run: tour });
  J('07', { url: 'https://neverbefore-site.vercel.app', run: scrollTour([[1100, 2000, 300], [1100, 2000, 300], [1100, 2000, 300], [1100, 2000, 600]], 2500) });
  J('08', { url: 'https://beeyond-eight.vercel.app/en/', run: tour });
  J('09', { url: 'https://antonionocellanb4.github.io/blackshape-shop/', run: tour });
  J('10', { url: 'https://blackshapeaircraft.com', prep: click('text=Accept'), run: tour });
  J('11', { url: 'https://www.puntogold.it', prep: click('button:has-text("Accetta")'), run: tour });
};

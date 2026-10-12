// Figure animate del portfolio (passi del metodo in home, highlight nella scheda progetto).
// Linguaggio del sito, non illustrazioni: cornici selezionate con maniglie, etichette in VT323, cursore,
// guide di misura, auto layout. Ogni figura è un SVG 400×300; GSAP la anima solo mentre è a schermo.
// Uso: motivo(el, nome | numero). Con un numero si prende la figura in ciclo (highlight a rotazione).
(function () {
  const A = '#FF9030', L = 'rgba(255,255,255,.28)', M = '#8E8E93', P = '#161618', K = '#050505';
  const NS = 'http://www.w3.org/2000/svg';
  const tx = (x, y, s, a = '') => `<text x="${x}" y="${y}" font-family="VT323, monospace" font-size="17" letter-spacing=".5" ${a}>${s}</text>`;
  const hd = (x, y) => `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" fill="#fff" stroke="${A}"/>`;
  // cornice selezionata come nell'editor: contorno arancione, maniglie, nome del livello sopra
  const sel = (x, y, w, h, name) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${A}"/>${hd(x, y)}${hd(x + w, y)}${hd(x, y + h)}${hd(x + w, y + h)}` +
    (name ? `<rect x="${x}" y="${y - 26}" width="${name.length * 8 + 12}" height="19" rx="3" fill="${A}"/>${tx(x + 6, y - 11, name, `fill="${K}"`)}` : '');
  const cursor = cls => `<path class="${cls}" d="M0 0l15 8.5-6.5 1.8L5.6 17z" fill="#fff" stroke="${K}" stroke-width="1.2" stroke-linejoin="round"/>`;
  const $$ = (s, q) => [...s.querySelectorAll(q)];
  const at = (e, o) => { for (const k in o) e.setAttribute(k, o[k]); };

  const F = {
    // 01 il brief: le voci si scrivono e si spuntano, "cosa non costruire" viene barrato
    brief: () => {
      const items = ['Goals', 'Edge cases', 'Risks', 'Not to build'], w = [150, 118, 136, 92];
      return [`<rect x="86" y="44" width="228" height="224" rx="6" fill="${P}" stroke="${L}"/>${tx(102, 68, 'brief.md', `fill="${M}"`)}<path d="M86 80H314" stroke="${L}"/>` +
        items.map((s, k) => { const y = 112 + k * 40; return `<rect x="102" y="${y - 11}" width="14" height="14" rx="2" stroke="${L}"/>
          <path class="ck" d="M105 ${y - 4}l3.5 4 6-8" stroke="${A}" stroke-width="2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
          ${tx(126, y + 2, s.toUpperCase(), 'fill="#fff"')}<rect class="ln" x="126" y="${y + 9}" width="${w[k]}" height="3" rx="1.5" fill="${L}"/>` +
          (k === 3 ? `<path class="st" d="M122 ${y - 3}H${132 + s.length * 8}" stroke="${A}" stroke-width="2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>` : ''); }).join('') +
        sel(80, 38, 240, 236, 'Frame · Brief'),
        (s, tl) => {
          const ln = $$(s, '.ln'), ck = $$(s, '.ck');
          tl.set(ln, { scaleX: 0, transformOrigin: '0 50%' }).set([...ck, ...$$(s, '.st')], { strokeDashoffset: 1 });
          ln.forEach((l, k) => tl.to(l, { scaleX: 1, duration: .55, ease: 'power2.out' }).to(ck[k], { strokeDashoffset: 0, duration: .25 }));
          tl.to($$(s, '.st'), { strokeDashoffset: 0, duration: .35 }).to({}, { duration: 1.4 }).to(ln, { scaleX: 0, duration: .35 });
        }];
    },
    // 02 tante direzioni affiancate, la cornice le prova tutte, tre vengono scartate e una cresce
    options: () => {
      const wf = [
        '<rect x="8" y="10" width="56" height="8" rx="2"/><rect x="8" y="26" width="38" height="4"/><rect x="8" y="40" width="56" height="44" rx="3"/><rect x="8" y="94" width="30" height="12" rx="6" fill="' + A + '"/>',
        '<circle cx="36" cy="46" r="22"/><rect x="14" y="80" width="44" height="5"/><rect x="20" y="92" width="32" height="5"/>',
        '<rect x="8" y="10" width="26" height="26" rx="3"/><rect x="38" y="10" width="26" height="26" rx="3"/><rect x="8" y="40" width="26" height="26" rx="3"/><rect x="38" y="40" width="26" height="26" rx="3"/><rect x="8" y="76" width="56" height="5"/><rect x="8" y="94" width="56" height="12" rx="6" fill="' + A + '"/>',
        '<rect x="0" y="0" width="72" height="54" rx="4"/><rect x="8" y="64" width="50" height="5"/><rect x="8" y="76" width="36" height="5"/>',
      ];
      return [wf.map((w, k) => `<g class="fr" transform="translate(${30 + k * 88} 92)"><rect width="72" height="116" rx="5" fill="${P}" stroke="${L}"/><g fill="rgba(255,255,255,.16)">${w}</g>` +
          (k === 2 ? '' : `<path class="x" d="M10 12L62 104M62 12L10 104" stroke="${A}" stroke-width="2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`) + '</g>').join('') +
        `<g class="pick" transform="translate(30 92)">${sel(-6, -6, 84, 128, '')}<rect x="-6" y="-32" width="76" height="19" rx="3" fill="${A}"/>${tx(0, -17, 'OPTION 1', `class="lb" fill="${K}"`)}</g>`,
        (s, tl) => {
          const fr = $$(s, '.fr'), sl = s.querySelector('.pick'), lb = s.querySelector('.lb'), lose = fr.filter((_, k) => k !== 2);
          const name = k => () => (lb.textContent = `OPTION ${k + 1}`);
          tl.set(sl, { x: 30, y: 92 }).set(fr[2], { x: 206, y: 92 }).set(lose, { opacity: 1 }).set($$(s, '.x'), { strokeDashoffset: 1 }).call(name(0));
          for (let k = 1; k < 4; k++) tl.to(sl, { x: 30 + k * 88, duration: .4, ease: 'power2.inOut', delay: .35, onStart: name(k) });
          tl.to(sl, { x: 206, duration: .45, ease: 'power2.inOut', delay: .3, onStart: name(2) })
            .to($$(s, '.x'), { strokeDashoffset: 0, duration: .3, stagger: .1 })
            .to(lose, { opacity: .18, duration: .4 })
            .to([fr[2], sl], { x: 164, y: 84, duration: .7, ease: 'power3.inOut' })
            .to({}, { duration: 1.4 });
        }];
    },
    // 03 il codice si scrive e a fianco la schermata si compone; il cursore prova il bottone
    code: () => {
      const ind = [0, 12, 24, 24, 12, 24, 12, 0], wd = [64, 92, 70, 48, 84, 58, 40, 30];
      return [`<rect x="22" y="52" width="172" height="196" rx="6" fill="${P}" stroke="${L}"/>${tx(36, 74, 'Card.tsx', `fill="${M}"`)}` +
        ind.map((d, k) => `<rect class="cl" x="${36 + d}" y="${90 + k * 18}" width="${wd[k]}" height="6" rx="3" fill="${[0, 4, 7].includes(k) ? A : 'rgba(255,255,255,.4)'}"/>`).join('') +
        `<rect x="222" y="36" width="152" height="228" rx="18" fill="#0B0B0C" stroke="${L}"/>
        <rect class="ui" x="236" y="54" width="124" height="12" rx="3" fill="rgba(255,255,255,.18)"/>
        <rect class="ui" x="236" y="76" width="124" height="74" rx="6" fill="#2C2C2E"/>
        <rect class="ui" x="236" y="162" width="96" height="6" rx="3" fill="rgba(255,255,255,.4)"/>
        <rect class="ui" x="236" y="176" width="70" height="6" rx="3" fill="rgba(255,255,255,.25)"/>
        <g class="ui"><rect class="btn" x="236" y="204" width="124" height="28" rx="14" fill="${A}"/>${tx(278, 223, 'BOOK', `fill="${K}"`)}</g>
        <g class="cur" transform="translate(360 280)">${cursor('')}</g>`,
        (s, tl) => {
          const cl = $$(s, '.cl'), ui = $$(s, '.ui'), cur = s.querySelector('.cur'), btn = s.querySelector('.btn');
          tl.set(cl, { scaleX: 0, opacity: 1, transformOrigin: '0 50%' }).set(ui, { opacity: 0, y: 8 }).set(cur, { x: 360, y: 280, opacity: 1 }).set(btn, { attr: { fill: A } });
          tl.to(cl, { scaleX: 1, duration: .35, stagger: .14, ease: 'power2.out' })
            .to(ui, { opacity: 1, y: 0, duration: .4, stagger: .18 }, '-=.9')
            .to(cur, { x: 318, y: 214, duration: .7, ease: 'power2.inOut' })
            .to(cur, { scale: .85, duration: .08, yoyo: true, repeat: 1 })
            .to(btn, { attr: { fill: '#FFC08A' }, duration: .1, yoyo: true, repeat: 1 }, '<')
            .to({}, { duration: 1.2 })
            .to([...cl, ...ui, cur], { opacity: 0, duration: .35 });
        }];
    },
    // 04 i controlli girano uno alla volta e passano
    checks: () => {
      const rows = ['Permissions', 'Lead scoring', 'Data parsing', 'Edge cases'];
      return [`<rect x="48" y="40" width="304" height="224" rx="6" fill="${P}" stroke="${L}"/>${tx(64, 64, 'npm test', `fill="${M}"`)}<path d="M48 76H352" stroke="${L}"/>
        <rect class="scan" x="49" y="86" width="302" height="34" fill="${A}" fill-opacity=".1"/>` +
        rows.map((r, k) => { const y = 108 + k * 38; return `<circle class="dot" cx="72" cy="${y - 5}" r="8" fill="none" stroke="${L}"/>
          <path class="ck" d="M68 ${y - 5}l3 3 5-6" stroke="${K}" stroke-width="2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
          ${tx(90, y, r.toUpperCase(), 'fill="#fff"')}${tx(336, y, 'QUEUED', `class="stt" text-anchor="end" fill="${M}"`)}`; }).join('') +
        `<path d="M48 236H352" stroke="${L}"/>${tx(64, 255, '0 / 4 PASSED', `class="sum" fill="${M}"`)}`,
        (s, tl) => {
          const dot = $$(s, '.dot'), ck = $$(s, '.ck'), st = $$(s, '.stt'), sum = s.querySelector('.sum'), scan = s.querySelector('.scan');
          tl.set(dot, { attr: { fill: 'none', stroke: L } }).set(ck, { strokeDashoffset: 1 }).set(scan, { attr: { y: 86 } })
            .call(() => { st.forEach(e => { e.textContent = 'QUEUED'; e.setAttribute('fill', M); }); sum.textContent = '0 / 4 PASSED'; sum.setAttribute('fill', M); });
          dot.forEach((d, k) => {
            tl.to(scan, { attr: { y: 86 + k * 38 }, duration: .35, ease: 'power2.inOut' })
              .call(() => (st[k].textContent = 'RUNNING'))
              .to(d, { attr: { fill: A, stroke: A }, duration: .2, delay: .45 })
              .to(ck[k], { strokeDashoffset: 0, duration: .2 })
              .call(() => { st[k].textContent = 'PASS'; st[k].setAttribute('fill', A); sum.textContent = `${k + 1} / 4 PASSED`; if (k === 3) sum.setAttribute('fill', A); });
          });
          tl.to({}, { duration: 1.6 });
        }];
    },
    // 05 si rilascia e si continua: la curva d'uso sale, le versioni si susseguono e il numero cresce a ogni giro
    ship: () => [`<path d="M20 236H380" stroke="${L}"/>${tx(24, 56, 'USAGE', `fill="${M}"`)}<path d="M20 64V236" stroke="${L}" stroke-dasharray="3 5"/>
      <path class="cv" d="M20 222C70 218 90 206 140 196S200 168 240 150S310 96 380 66" stroke="${A}" stroke-width="2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>` +
      [60, 140, 220, 300].map(x => `<g class="rel"><path d="M${x} 236V${x < 200 ? 200 : 120}" stroke="${L}" stroke-dasharray="3 4"/><circle cx="${x}" cy="236" r="5" fill="${A}"/>${tx(x, 260, 'V1.0', 'class="v" text-anchor="middle" fill="#fff"')}</g>`).join(''),
      (s, tl) => {
        const rel = $$(s, '.rel'), v = $$(s, '.v');
        let n = 1;
        tl.set(s.querySelector('.cv'), { strokeDashoffset: 1, opacity: 1 }).set(rel, { opacity: 0 })
          .call(() => v.forEach((e, k) => (e.textContent = `V${n}.${k}`)))
          .to(s.querySelector('.cv'), { strokeDashoffset: 0, duration: 2.6, ease: 'none' })
          .to(rel, { opacity: 1, duration: .25, stagger: .62 }, '<.2')
          .to({}, { duration: 1.2 })
          .to([s.querySelector('.cv'), ...rel], { opacity: 0, duration: .4 })
          .call(() => n++);
      }],
    // auto layout: la cornice si stringe e i tre blocchi passano da riga a colonna, la misura si aggiorna
    layout: () => {
      const box = w => {
        const x = 200 - w / 2, wide = w >= 236;
        const cw = wide ? (w - 56) / 3 : w - 32;
        return { x, w, h: wide ? 118 : 210, cards: [0, 1, 2].map(i => wide ? [x + 16 + i * (cw + 12), 104, cw, 62] : [x + 16, 98 + i * 52, cw, 42]) };
      };
      const b = box(320);
      return [`<rect class="fb" x="${b.x}" y="50" width="${b.w}" height="${b.h}" rx="6" fill="${P}" stroke="${L}"/><rect class="bar" x="${b.x + 16}" y="70" width="64" height="8" rx="4" fill="rgba(255,255,255,.3)"/>` +
        b.cards.map(([x, y, w, h], i) => `<rect class="cd" x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${i ? 'rgba(255,255,255,.12)' : 'rgba(255,144,48,.35)'}" stroke="${i ? 'none' : A}"/>`).join('') +
        `<g class="sl"><rect fill="none" stroke="${A}"/>${[0, 1, 2, 3].map(() => '<rect width="8" height="8" fill="#fff" stroke="' + A + '"/>').join('')}<rect class="tg" height="19" rx="3" fill="${A}"/>${tx(0, 0, '', `class="tt" fill="${K}"`)}</g>`,
        (s, tl) => {
          const o = { w: 320 }, cur = { x: b.x, w: b.w, h: b.h, cards: b.cards.map(c => [...c]) };
          const fb = s.querySelector('.fb'), bar = s.querySelector('.bar'), cd = $$(s, '.cd'), [ol, ...hs] = $$(s, '.sl rect:not(.tg)'), tg = s.querySelector('.tg'), tt = s.querySelector('.tt');
          const lerp = (a, z) => a + (z - a) * .16;
          const draw = () => {
            const t = box(o.w);
            cur.x = t.x; cur.w = t.w; cur.h = lerp(cur.h, t.h);
            cur.cards = cur.cards.map((c, i) => c.map((v, j) => lerp(v, t.cards[i][j])));
            at(fb, { x: cur.x, width: cur.w, height: cur.h }); at(bar, { x: cur.x + 16 });
            cd.forEach((e, i) => { const [x, y, w, h] = cur.cards[i]; at(e, { x, y, width: w, height: h }); });
            at(ol, { x: cur.x, y: 50, width: cur.w, height: cur.h });
            [[cur.x, 50], [cur.x + cur.w, 50], [cur.x, 50 + cur.h], [cur.x + cur.w, 50 + cur.h]].forEach(([x, y], i) => at(hs[i], { x: x - 4, y: y - 4 }));
            const label = `AUTO LAYOUT · W ${Math.round(o.w)}`;
            tt.textContent = label; at(tt, { x: cur.x + 6, y: 35 }); at(tg, { x: cur.x, y: 21, width: label.length * 8 + 12 });
          };
          draw();
          tl.eventCallback('onUpdate', draw);
          tl.to(o, { w: 150, duration: 1.8, ease: 'power2.inOut', delay: .6 }).to({}, { duration: 1 }).to(o, { w: 320, duration: 1.8, ease: 'power2.inOut' }).to({}, { duration: 1 });
        }];
    },
    // guide di misura: un livello trascinato si avvicina, la distanza si aggiorna e scatta l'allineamento
    measure: () => [`<rect x="56" y="112" width="112" height="92" rx="5" fill="${P}" stroke="${L}"/>${tx(64, 104, 'CARD', `fill="${M}"`)}
      <path class="gd" d="M30 112H380" stroke="${A}" stroke-dasharray="4 4" opacity="0"/>
      <path class="ms" stroke="${A}"/><g class="mt"><rect y="-12" height="19" rx="3" fill="${A}"/>${tx(0, 2, '', `fill="${K}"`)}</g>
      <g class="b"><rect width="96" height="74" rx="5" fill="rgba(255,144,48,.16)" stroke="${A}"/>${hd(0, 0)}${hd(96, 0)}${hd(0, 74)}${hd(96, 74)}<g transform="translate(70 52)">${cursor('')}</g></g>`,
      (s, tl) => {
        const o = { x: 286, y: 54 }, b = s.querySelector('.b'), ms = s.querySelector('.ms'), mt = s.querySelector('.mt'), gd = s.querySelector('.gd');
        const draw = () => {
          at(b, { transform: `translate(${o.x} ${o.y})` });
          const gap = Math.round(o.x - 168), y = Math.max(o.y, 112) + 30;
          at(ms, { d: `M168 ${y}H${o.x}M168 ${y - 5}V${y + 5}M${o.x} ${y - 5}V${y + 5}` });
          const t = mt.querySelector('text'), r = mt.querySelector('rect'), lab = String(gap);
          t.textContent = lab; at(r, { width: lab.length * 8 + 10 }); at(mt, { transform: `translate(${168 + gap / 2 - (lab.length * 8 + 10) / 2} ${y - 14})` }); at(t, { x: 5 });
          gd.setAttribute('opacity', Math.abs(o.y - 112) < 1.5 ? 1 : 0);
        };
        draw();
        tl.eventCallback('onUpdate', draw);
        tl.to(o, { x: 236, y: 150, duration: 1.1, ease: 'power2.inOut', delay: .4 })
          .to(o, { x: 192, y: 112, duration: .7, ease: 'back.out(2.2)' })
          .to({}, { duration: 1.4 })
          .to(o, { x: 286, y: 54, duration: 1, ease: 'power2.inOut' });
      }],
    // classifica: i punteggi cambiano e le righe si riordinano
    rank: () => {
      const n = 5;
      return [`${tx(40, 44, 'SORT: SCORE ↓', `fill="${M}"`)}<path d="M40 56H360" stroke="${L}"/>` +
        Array.from({ length: n }, (_, k) => `<g class="rw" transform="translate(0 ${84 + k * 42})"><circle cx="48" cy="-5" r="5" fill="${k ? 'rgba(255,255,255,.4)' : A}"/>${tx(62, 0, `LEAD ${String(k + 1).padStart(2, '0')}`, 'fill="#fff"')}<rect class="br" x="150" y="-11" width="${180 - k * 30}" height="12" rx="6" fill="${k ? 'rgba(255,255,255,.2)' : A}"/></g>`).join(''),
        (s, tl) => {
          const rw = $$(s, '.rw');
          const shuffle = () => {
            const sc = rw.map(() => 40 + Math.random() * 170), order = sc.map((v, k) => k).sort((a, z) => sc[z] - sc[a]);
            order.forEach((k, r) => {
              gsap.to(rw[k], { y: 84 + r * 42, duration: .7, ease: 'power3.inOut' });
              gsap.to(rw[k].querySelector('.br'), { attr: { width: sc[k], fill: r ? 'rgba(255,255,255,.2)' : A }, duration: .7, ease: 'power3.inOut' });
              gsap.to(rw[k].querySelector('circle'), { attr: { fill: r ? 'rgba(255,255,255,.4)' : A }, duration: .3 });
            });
          };
          tl.to({}, { duration: 2.2, repeat: -1, onRepeat: shuffle });
        }];
    },
  };

  // ---------- highlight dei progetti: una scena per punto, chiave "<id progetto>-<indice>" ----------
  const G = 'rgba(255,255,255,.12)', W = '#fff', D2 = '#2C2C2E';
  const t = (x, y, s, c = W, a = '', sz = 17) => `<text x="${x}" y="${y}" font-family="VT323, monospace" font-size="${sz}" letter-spacing=".5" fill="${c}" ${a}>${s}</text>`;
  const box = (x, y, w, h, title = '', a = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${P}" stroke="${L}" ${a}/>` +
    (title ? t(x + 12, y + 21, title, M) + `<path d="M${x} ${y + 31}H${x + w}" stroke="${L}"/>` : '');
  const tag = (x, y, s, cls = '', bg = A, fg = K) => `<g class="${cls}"><rect x="${x}" y="${y - 14}" width="${s.length * 8 + 12}" height="19" rx="3" fill="${bg}"/>${t(x + 6, y, s, fg)}</g>`;
  const bar = (x, y, w, cls = '', c = 'rgba(255,255,255,.35)', h = 6) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}"/>`;
  const phone = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="#0B0B0C" stroke="${L}"/>`;
  const ln = (d, cls, c = A, a = '') => `<path class="${cls}" d="${d}" stroke="${c}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" ${a}/>`;
  const cur = (x, y) => `<g class="cu" transform="translate(${x} ${y})">${cursor('')}</g>`;
  const click = ['.cu', 'to', { scale: .85, duration: .08, yoyo: true, repeat: 1 }];
  const wait = s => [{}, 'to', { duration: s }];
  const pal = ['#8B5E3C', '#C9B79C', '#5B6E5A', '#A3472F', '#2F4A6D', '#D8C3A5', '#6E6259', '#B88A5A', '#3E3A36', '#9C8F7A'];
  // globo a fili: meridiani che girano e punti visibili solo sul lato davanti
  const globe = (cx, cy, r, pins) => {
    const pos = (la, lo, rot) => { const a = (lo + rot) * Math.PI / 180, b = la * Math.PI / 180; return [cx + r * Math.cos(b) * Math.sin(a), cy - r * Math.sin(b), Math.cos(a)]; };
    const svg = `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${L}"/>` +
      [-50, -25, 0, 25, 50].map(l => { const b = l * Math.PI / 180; return `<ellipse cx="${cx}" cy="${cy - r * Math.sin(b)}" rx="${r * Math.cos(b)}" ry="${r * .1 * Math.cos(b)}" stroke="rgba(255,255,255,.12)"/>`; }).join('') +
      [0, 30, 60, 90, 120, 150].map(lo => `<ellipse class="me" cx="${cx}" cy="${cy}" rx="${Math.abs(r * Math.sin(lo * Math.PI / 180))}" ry="${r}" stroke="rgba(255,255,255,.18)"/>`).join('') +
      pins.map(([la, lo]) => { const [x, y, z] = pos(la, lo, 0); return `<circle class="pn" cx="${x}" cy="${y}" r="5" fill="${A}" opacity="${z > 0 ? 1 : 0}"/>`; }).join('');
    const draw = (s, rot) => {
      $$(s, '.me').forEach((e, k) => e.setAttribute('rx', Math.abs(r * Math.sin((k * 30 + rot) * Math.PI / 180))));
      $$(s, '.pn').forEach((e, k) => { const [x, y, z] = pos(...pins[k], rot); at(e, { cx: x, cy: y, opacity: z > .1 ? 1 : 0 }); });
    };
    return [svg, draw];
  };

  const H = {
    // LeadWin: l'AI dentro il lavoro, l'app Meta, il pavimento delle vendite
    '01-0': () => [box(20, 30, 214, 240, 'ASK LEADY') +
      `<g class="q"><rect x="70" y="76" width="152" height="24" rx="12" fill="${A}"/>${t(82, 93, 'STUCK &gt; 14 DAYS?', K)}</g>` +
      `<rect class="ab" x="32" y="114" width="176" height="74" rx="10" fill="${G}"/>` + bar(44, 128, 124, 'a') + bar(44, 144, 96, 'a') + bar(44, 160, 140, 'a') +
      tag(32, 226, 'BOOKED THU 16:00', 'bk') +
      box(250, 30, 130, 112, 'WHATSAPP') + `<rect class="w1" x="262" y="74" width="86" height="20" rx="10" fill="${G}"/><rect class="w2" x="284" y="102" width="84" height="20" rx="10" fill="${A}" fill-opacity=".85"/>` +
      box(250, 158, 130, 112, 'MCP') + t(264, 206, 'CLAUDE', W, 'class="m"') + t(264, 230, 'CHATGPT', W, 'class="m"') + tag(264, 258, 'READ-ONLY', 'ro', D2, W),
      [['.q', 'in'], ['.ab', 'in'], ['.a', 'grow', { stagger: .18 }], ['.w1', 'in'], ['.w2', 'in'], ['.bk', 'pop'], ['.m', 'in', { stagger: .2 }], ['.ro', 'pop']]],
    '01-1': () => [tag(20, 40, 'META TECH PROVIDER', 'tp') +
      box(20, 116, 92, 68) + t(32, 144, 'LEAD ADS') + t(32, 168, 'FACEBOOK', M) +
      `<path d="M112 150H170M266 150L300 66M266 150H300M266 150L300 234" stroke="${L}" stroke-dasharray="4 5"/>` +
      box(170, 110, 96, 80) + t(182, 138, 'WEBHOOK', M) + t(182, 164, 'BY PAGE') +
      ['A', 'B', 'C'].map((c, k) => `<rect class="c c${k}" x="300" y="${40 + k * 84}" width="84" height="52" rx="6" fill="${P}" stroke="${L}"/>` + t(312, 72 + k * 84, 'CLIENT ' + c)).join('') +
      `<circle class="pk" cx="112" cy="150" r="6" fill="${A}"/>`,
      [['.tp', 'pop'], ['.pk', 'init', { attr: { cx: 112, cy: 150 }, opacity: 0 }], ['.c', 'init', { attr: { stroke: L } }],
        ...[1, 0, 2].flatMap(k => [['.pk', 'set', { attr: { cx: 112, cy: 150 }, opacity: 1 }], ['.pk', 'to', { attr: { cx: 218 }, duration: .45, ease: 'none' }],
          ['.pk', 'to', { attr: { cx: 300, cy: 66 + k * 84 }, duration: .4, ease: 'none' }], ['.c' + k, 'to', { attr: { stroke: A }, duration: .15 }],
          ['.pk', 'to', { opacity: 0, duration: .15 }], ['.c' + k, 'to', { attr: { stroke: L }, duration: .3, delay: .25 }]])]],
    '01-2': () => [['NEW', 'CONTACTED', 'WON'].map((h, k) => box(16 + k * 124, 34, 120, 232, h)).join('') +
      [[0, 76], [0, 132], [1, 76], [2, 76]].map(([c, y]) => `<rect x="${24 + c * 124}" y="${y}" width="104" height="48" rx="5" fill="${G}"/>`).join('') +
      `<g class="mc"><rect x="24" y="188" width="104" height="58" rx="5" fill="${D2}" stroke="${A}"/>` + bar(34, 200, 64) + bar(34, 212, 44, '', 'rgba(255,255,255,.2)') +
      `<rect class="scr" x="34" y="222" width="52" height="16" rx="3" fill="rgba(255,255,255,.25)"/>${t(39, 235, 'COLD', K, 'class="sct"', 16)}</g>`,
      s => { const chip = (n, c) => () => { s.querySelector('.sct').textContent = n; s.querySelector('.scr').setAttribute('fill', c); };
        return [['.mc', 'init', { x: 0, y: 0 }], [chip('COLD', 'rgba(255,255,255,.25)'), 0], ['.mc', 'to', { x: 124, y: -56, duration: .7, delay: .5 }], [chip('WARM', '#FFC08A')],
          ['.mc', 'to', { x: 248, y: -56, duration: .7, delay: .6 }], [chip('HOT', A)]]; }],

    // LeadWin, sito: il prodotto disegnato in HTML, veloce sui telefoni, leggibile da motori e AI
    '01-site-0': u => [`<defs><clipPath id="k${u}"><rect x="31" y="72" width="338" height="189" rx="4"/></clipPath></defs>` + box(30, 40, 340, 222) +
      [46, 60, 74].map(x => `<circle cx="${x}" cy="56" r="4" fill="#48484A"/>`).join('') +
      `<g clip-path="url(#k${u})"><g class="mk">` + ['LEADS', 'HOT', 'BOOKED'].map((l, k) => `<rect class="kp" x="${46 + k * 106}" y="86" width="96" height="56" rx="6" fill="${G}"/>` + t(56 + k * 106, 106, l, M, 'class="kp"') + t(56 + k * 106, 132, ['1,284', '312', '47'][k], W, 'class="kp"', 26)).join('') +
      `<rect x="46" y="156" width="308" height="92" rx="6" fill="${G}"/>` + ln('M58 230C100 220 120 180 160 190S230 170 260 176S320 150 342 166', 'cv', A, 'stroke-width="2"') + '</g></g>' +
      tag(30, 288, 'HTML + CSS · 0 PNG', 'tg'),
      [['.mk', 'init', { scale: 1, svgOrigin: '94 114' }], ['.kp', 'in', { stagger: .06 }], ['.cv', 'draw', { duration: 1 }],
        ['.mk', 'to', { scale: 2.4, svgOrigin: '94 114', duration: 1.2, delay: .4, ease: 'power3.inOut' }], ['.tg', 'pop'],
        ['.mk', 'to', { scale: 1, svgOrigin: '94 114', duration: .9, delay: 1.2, ease: 'power3.inOut' }]]],
    '01-site-1': () => [`<circle cx="200" cy="124" r="72" stroke="${G}" stroke-width="10"/><circle class="ga" cx="200" cy="124" r="72" stroke="${A}" stroke-width="10" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" transform="rotate(-90 200 124)"/>` +
      t(200, 142, '0', W, 'class="n" text-anchor="middle"', 54) + t(200, 226, 'MOBILE · LIGHTHOUSE', M, 'text-anchor="middle"') +
      ['98', '100', '100', '100'].map((v, k) => `<g class="sm"><circle cx="${110 + k * 60}" cy="262" r="15" stroke="${A}" stroke-width="2"/>${t(110 + k * 60, 267, v, W, 'text-anchor="middle"', 14)}</g>`).join(''),
      [['.ga', 'draw', { strokeDashoffset: .02, duration: 1.4 }], ['.n', 'count', { to: 98, duration: 1.4 }, '<'], ['.sm', 'pop', { stagger: .12 }]]],
    '01-site-2': () => [box(24, 36, 352, 228, 'ACCESS LOG') +
      [['GOOGLEBOT', '/sitemap.xml'], ['GPTBOT', '/llms.txt'], ['CLAUDEBOT', '/llms.txt'], ['GOOGLEBOT', '/features'], ['BINGBOT', '/faq']]
        .map(([a, p], k) => `<g class="rw">${t(40, 100 + k * 32, a, M)}${t(150, 100 + k * 32, 'GET ' + p)}${t(360, 100 + k * 32, '200', A, 'text-anchor="end"')}</g>`).join(''),
      [['.rw', 'in', { stagger: .35 }]]],

    // Traccio: prima la spec e i dati, un campo per iniziare, sensazione nativa
    '02-0': () => [box(16, 36, 150, 228, 'MVP-SPEC.MD') + [96, 120, 80, 110, 64, 100, 88].map((w, k) => bar(30, 82 + k * 24, w, 'sl')).join('') +
      box(182, 36, 202, 228, 'LATENCY · MIN') +
      [['A', 130, '47'], ['B', 34, '12'], ['C', 85, '31']].map(([n, w, v], k) => t(196, 110 + k * 48, n, M) + bar(216, 100 + k * 48, w, 'b', n === 'B' ? A : 'rgba(255,255,255,.3)', 12) + t(372, 110 + k * 48, v, W, 'class="v" text-anchor="end"')).join('') +
      tag(196, 252, 'PICKED: B', 'pk'),
      [['.sl', 'grow', { stagger: .1 }], ['.b', 'grow', { stagger: .15, duration: .7 }], ['.v', 'in'], ['.pk', 'pop']]],
    '02-1': () => [phone(128, 14, 144, 272) + `<rect x="142" y="48" width="116" height="28" rx="14" fill="${G}"/>` + t(154, 67, 'TRACKING NO.', M, 'class="tn"', 15) +
      tag(142, 102, 'PASTE', 'ps', D2, W) +
      `<g class="mp"><rect x="142" y="116" width="116" height="112" rx="10" fill="#1C1C1E"/><path d="M150 210C170 190 180 200 196 170S230 150 250 128" stroke="rgba(255,255,255,.18)" stroke-width="2" stroke-dasharray="3 4"/></g>` +
      ln('M150 210C170 190 180 200 196 170S230 150 250 128', 'rt', A, 'stroke-width="2.5"') + `<circle class="pin" cx="250" cy="128" r="6" fill="${A}"/>` + tag(142, 254, 'BY FRI 18:00', 'dl'),
      [['.ps', 'pop'], ['.tn', 'type', { text: '1Z999AA10123', placeholder: 'TRACKING NO.' }], ['.mp', 'in'], ['.rt', 'draw', { duration: 1 }], ['.pin', 'pop'], ['.dl', 'pop']]],
    '02-2': () => [phone(128, 14, 144, 272) +
      ['M172 92V80H184', 'M216 80H228V92', 'M228 116V128H216', 'M184 128H172V116'].map(d => ln(d, 'fi', W, 'stroke-width="3" stroke-linecap="round"')).join('') +
      ln('M188 104l8 8 16-18', 'ok', A, 'stroke-width="3" stroke-linecap="round"') +
      [0, 1].map(k => `<rect class="cd" x="142" y="${150 + k * 40}" width="116" height="32" rx="8" fill="${G}"/>`).join('') +
      `<rect x="144" y="238" width="112" height="34" rx="17" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.3)"/><rect class="pill" x="148" y="242" width="36" height="26" rx="13" fill="rgba(255,255,255,.22)"/>` +
      [166, 200, 234].map(x => `<circle cx="${x}" cy="255" r="4" fill="${W}"/>`).join('') + tag(286, 108, 'FACE ID', 'f1') + tag(282, 258, 'LIQUID GLASS', 'f2'),
      [['.pill', 'init', { x: 0 }], ['.fi', 'draw', { stagger: .08 }], ['.ok', 'draw', { duration: .3 }], ['.f1', 'pop'], ['.fi,.ok', 'to', { opacity: 0, duration: .3, delay: .4 }],
        ['.cd', 'in'], ['.pill', 'to', { x: 34, duration: .45, delay: .3 }], ['.pill', 'to', { x: 68, duration: .45, delay: .3 }], ['.f2', 'pop']]],

    // InTessuto: profilo leggibile, dati ripuliti, classifica che classifica
    '03-0': () => { const ch = ['PETS', 'WASHABLE', 'WARM ROOMS'], cr = ['DURABLE', 'EASY CARE', 'WARM PALETTE'];
      return [ch.map((c, k) => tag(20, 100 + k * 64, c, 'ch', D2, W)).join('') + box(206, 40, 176, 224, 'STYLE PROFILE') +
        cr.map((c, k) => { const y = 96 + k * 64; return ln(`M${32 + ch[k].length * 8} ${y}C170 ${y} 180 ${y} 206 ${y}`, 'cn' + k) + `<g class="cr${k}">${t(220, y + 4, c)}</g>` + bar(220, y + 14, 140, 'cb' + k, A); }).join(''),
        [['.ch', 'in', { stagger: .15 }], ...[0, 1, 2].flatMap(k => [['.cn' + k, 'draw', { duration: .5 }], ['.cr' + k, 'in'], ['.cb' + k, 'grow']])]]; },
    '03-1': () => {
      let sw = '';
      for (let i = 0; i < 8; i++) for (let j = 0; j < 5; j++) sw += `<rect class="sw" x="${20 + i * 29}" y="${48 + j * 29}" width="24" height="24" rx="3" fill="${D2}" data-c="${pal[(i * 7 + j * 3) % 10]}"/>`;
      return [sw + `<rect class="sc" x="18" y="44" width="3" height="146" fill="${A}"/>` +
        box(268, 44, 114, 72) + t(280, 66, 'SWATCHES', M) + t(280, 102, '0', W, 'class="n1"', 30) +
        box(268, 128, 114, 72) + t(280, 150, 'PDF SHEETS', M) + t(280, 186, '0', W, 'class="n2"', 30) + tag(20, 238, 'COLOUR FILTERS ON', 'cf'),
        [['.sw', 'init', { attr: { fill: D2 } }], ['.sc', 'init', { x: 0 }], ['.sc', 'to', { x: 234, duration: 1.6, ease: 'none' }],
          ['.sw', 'to', { attr: { fill: (i, e) => e.getAttribute('data-c') }, duration: .25, stagger: .04 }, '<'],
          ['.n1', 'count', { to: 1486, duration: 1.6, fmt: n => Math.round(n).toLocaleString('en-US') }, '<'], ['.n2', 'count', { to: 81, duration: 1 }], ['.cf', 'pop']]];
    },
    '03-2': () => { const fab = ['F-1021', 'F-2208', 'F-0715', 'F-3340', 'F-1187'], w2 = [70, 180, 120, 150, 95];
      const rank = w2.map(w => w2.filter(z => z > w).length);
      return [t(24, 44, 'BEFORE: EVERY FABRIC 1.00', M, 'class="lb"') +
        fab.map((f, k) => `<g class="rw" transform="translate(0 ${84 + k * 40})">${t(24, 0, f)}<rect class="br" x="100" y="-12" width="180" height="12" rx="6" fill="rgba(255,255,255,.3)"/>${t(376, 0, '1.00', W, 'class="sv" text-anchor="end"')}</g>`).join(''),
        s => { const lb = s.querySelector('.lb'), sv = $$(s, '.sv');
          return [['.rw', 'init', { y: i => 84 + i * 40 }], ['.br', 'init', { attr: { width: 180, fill: 'rgba(255,255,255,.3)' } }],
            [() => { lb.textContent = 'BEFORE: EVERY FABRIC 1.00'; sv.forEach(e => (e.textContent = '1.00')); }, 0],
            ['.br', 'grow', { stagger: .08 }], wait(1),
            [() => { lb.textContent = 'AFTER: SHARE OF MATCHING COLOURS'; sv.forEach((e, k) => (e.textContent = (w2[k] / 180).toFixed(2))); }],
            ['.br', 'to', { attr: { width: i => w2[i] }, duration: .7 }], ['.rw', 'to', { y: i => 84 + rank[i] * 40, duration: .7, delay: .2 }],
            ['.br', 'to', { attr: { fill: i => rank[i] ? 'rgba(255,255,255,.3)' : A }, duration: .3 }]]; }]; },

    // FinishDecor Discover: schermo grande, passaggio al telefono, niente like
    '04-0': () => [`<rect x="132" y="12" width="136" height="252" rx="8" fill="#0B0B0C" stroke="${L}"/><path d="M200 264V284M172 286H228" stroke="${L}"/>` +
      `<g class="scr">` + bar(148, 32, 70, '', 'rgba(255,255,255,.4)', 8) + `<rect x="148" y="50" width="104" height="96" rx="6" fill="${G}"/>` + bar(148, 158, 90) + bar(148, 172, 60, '', 'rgba(255,255,255,.2)') +
      `<rect x="148" y="196" width="104" height="26" rx="13" fill="${A}"/><rect x="148" y="228" width="104" height="26" rx="13" fill="${G}"/></g>` +
      `<circle class="tp" cx="200" cy="209" r="4" fill="${W}" opacity="0"/>` + tag(20, 214, 'TARGET 88 PX', 'tg') +
      `<circle cx="330" cy="70" r="26" stroke="${G}" stroke-width="5"/><circle class="ir" cx="330" cy="70" r="26" stroke="${A}" stroke-width="5" pathLength="1" stroke-dasharray="1" transform="rotate(-90 330 70)"/>` +
      t(330, 76, '2:00', W, 'class="it" text-anchor="middle"', 18) + t(330, 118, 'IDLE', M, 'text-anchor="middle"') + tag(304, 150, 'RESET', 'rs'),
      [['.ir', 'init', { strokeDashoffset: 0 }], ['.scr', 'init', { opacity: 1 }], ['.tg', 'pop'],
        ['.tp', 'fromTo', [{ attr: { r: 4 }, opacity: 1 }, { attr: { r: 22 }, opacity: 0, duration: .6 }]],
        ['.ir', 'to', { strokeDashoffset: 1, duration: 2.4, ease: 'none' }],
        ['.it', 'count', { from: 120, to: 0, duration: 2.4, ease: 'none', fmt: n => { n = Math.round(n); return Math.floor(n / 60) + ':' + String(n % 60).padStart(2, '0'); } }, '<'],
        ['.scr', 'to', { opacity: .25, duration: .3 }], ['.rs', 'pop'], ['.scr', 'to', { opacity: 1, duration: .4, delay: .4 }]]],
    '04-1': () => {
      let qr = '';
      for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
        const finder = (i < 2 && j < 2) || (i > 4 && j < 2) || (i < 2 && j > 4);
        if (finder || (i * 5 + j * 3 + i * j) % 3 === 0) qr += `<rect class="qr" x="${52 + i * 12}" y="${96 + j * 12}" width="11" height="11" fill="${W}"/>`;
      }
      return [box(24, 40, 140, 224, 'SCAN TO TAKE IT') + qr +
        ln('M140 140C190 116 220 144 258 152', 'pt', A, 'stroke-width="2"') + phone(258, 60, 104, 196) +
        [0, 1, 2].map(r => `<g class="pl">${[0, 1, 2, 3].map(c => `<rect x="${272 + c * 20}" y="${96 + r * 44}" width="16" height="32" rx="3" fill="${pal[(r * 4 + c * 3) % 10]}"/>`).join('')}</g>`).join('') +
        t(310, 242, '?P=4E7A2C', M, 'class="url" text-anchor="middle"', 15) + tag(24, 290, 'NO LOGIN', 'n1') + tag(118, 290, 'NO FORM', 'n2'),
        [['.qr', 'in', { stagger: .008, duration: .2 }], ['.pt', 'draw', { duration: .8 }], ['.pl', 'in', { stagger: .2 }], ['.url', 'in'], ['.n1', 'pop'], ['.n2', 'pop']]];
    },
    '04-2': () => [`<rect x="110" y="24" width="180" height="188" rx="12" fill="${G}"/><rect x="140" y="120" width="120" height="30" rx="8" fill="rgba(255,255,255,.12)"/><rect x="130" y="140" width="140" height="44" rx="8" fill="rgba(255,255,255,.18)"/>` +
      `<g class="st"><rect x="196" y="40" width="80" height="32" rx="4" stroke="${W}" stroke-width="2" transform="rotate(12 236 56)"/>${t(214, 64, 'LIKE', W, 'transform="rotate(12 236 56)"', 22)}</g>` +
      ln('M190 78L284 36', 'sx', W, 'stroke-width="2.5"') +
      `<circle cx="150" cy="248" r="16" stroke="${L}"/><path d="M144 242l12 12M156 242l-12 12" stroke="${W}"/><circle cx="200" cy="248" r="16" stroke="${L}"/><ellipse cx="200" cy="248" rx="7" ry="4" stroke="${W}"/>` +
      `<circle cx="250" cy="248" r="16" stroke="${L}"/><circle cx="250" cy="248" r="6" stroke="${W}"/>` +
      `<circle class="rg" cx="250" cy="248" r="22" stroke="${A}" stroke-width="3" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" transform="rotate(-90 250 248)"/>` +
      cur(330, 290) + tag(130, 292, 'STYLE, NOT LIKES', 'tg'),
      [['.cu', 'init', { x: 330, y: 290 }], ['.rg', 'init', { strokeDashoffset: 1 }], ['.st', 'pop'], ['.sx', 'draw', { duration: .35 }], ['.st,.sx', 'to', { opacity: 0, duration: .3, delay: .3 }],
        ['.cu', 'to', { x: 256, y: 254, duration: .6 }], ...[.66, .33, 0].flatMap(o => [click, ['.rg', 'to', { strokeDashoffset: o, duration: .3 }], wait(.25)]), ['.tg', 'pop']]],

    // ManyTask: permessi nel database, bug che solo i test trovano, board e calendario
    '05-0': () => { const roles = ['ADMIN', 'MANAGER', 'MEMBER', 'CLIENT'], vis = [8, 8, 4, 2];
      return [`<rect class="hl" x="16" y="70" width="108" height="30" rx="5" fill="${A}" fill-opacity=".18" stroke="${A}"/>` + roles.map((r, k) => t(28, 90 + k * 44, r)).join('') +
        `<rect x="146" y="60" width="56" height="190" rx="6" fill="${P}" stroke="${A}" stroke-dasharray="4 4"/>` + t(174, 160, 'RLS', A, 'text-anchor="middle"', 22) +
        box(226, 36, 156, 232, 'TASKS') + [...Array(8)].map((_, k) => `<rect class="row" x="238" y="${80 + k * 22}" width="132" height="14" rx="3" fill="rgba(255,255,255,.22)"/>`).join('') +
        t(226, 290, 'ROWS: 8', M, 'class="rc"'),
        s => [['.hl', 'init', { y: 0 }], ['.row', 'init', { opacity: 1 }], ...roles.flatMap((r, k) => [['.hl', 'to', { y: k * 44, duration: .4 }],
          ['.row', 'to', { opacity: i => i < vis[k] ? 1 : .08, duration: .35 }], [() => (s.querySelector('.rc').textContent = `ROWS: ${vis[k]}  (${r})`)], wait(.9)])]]; },
    '05-1': () => [t(24, 40, 'TEST: CONTRACT STARTED IN JAN', M) + `<path d="M40 224H376" stroke="${L}"/>` +
      ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'].map((m, k) => t(52 + k * 56, 248, m, M) + `<rect class="bx b${k}" x="${42 + k * 56}" y="150" width="48" height="56" rx="5" fill="rgba(255,255,255,.25)"/>`).join('') +
      `<circle cx="52" cy="224" r="5" fill="${A}"/>` + t(40, 274, 'START', A) + tag(24, 96, 'BEFORE: 1 OF 6', 't1', D2, W) + tag(24, 96, 'AFTER: 6 OF 6', 't2'),
      [['.bx', 'init', { opacity: 0, attr: { fill: 'rgba(255,255,255,.25)' } }], ['.b5', 'to', { opacity: 1, duration: .4, delay: .3 }], ['.t1', 'pop'], wait(1),
        ['.t1', 'to', { opacity: 0, duration: .3 }], ['.bx', 'set', { opacity: 0, attr: { fill: A } }], ['.bx', 'to', { opacity: 1, duration: .3, stagger: .18 }], ['.t2', 'pop']]],
    '05-2': () => { const tri = (x, y, d) => ({ l: `M${x + 19} ${y + 7}L${x + 11} ${y + 13}L${x + 19} ${y + 19}Z`, r: `M${x + 11} ${y + 7}L${x + 19} ${y + 13}L${x + 11} ${y + 19}Z`, u: `M${x + 9} ${y + 17}L${x + 15} ${y + 9}L${x + 21} ${y + 17}Z`, d: `M${x + 9} ${y + 9}L${x + 15} ${y + 17}L${x + 21} ${y + 9}Z` }[d]);
      return [tag(20, 26, 'DRAG · OR KEYS', 'kt') + ['MON', 'TUE', 'WED', 'THU', 'FRI'].map((d, k) => t(84 + k * 58, 58, d, M)).join('') +
        ['SB', 'LR', 'MM'].map((p, r) => `<circle cx="40" cy="${94 + r * 60}" r="15" fill="${D2}"/>` + t(40, 99 + r * 60, p, W, 'text-anchor="middle"', 15) +
          [0, 1, 2, 3, 4].map(k => `<rect x="${70 + k * 58}" y="${70 + r * 60}" width="54" height="48" rx="4" fill="#161618" stroke="${L}"/>`).join('')).join('') +
        `<rect class="tb" x="72" y="74" width="50" height="40" rx="5" fill="${A}" fill-opacity=".85"/>` +
        ['l', 'r', 'u', 'd'].map((d, k) => `<rect class="k${k}" x="${140 + k * 36}" y="252" width="30" height="26" rx="4" fill="${D2}" stroke="${L}"/><path d="${tri(140 + k * 36, 252, d)}" fill="${W}"/>`).join(''),
        [['.tb', 'init', { x: 0, y: 0 }], ['.k1,.k3', 'init', { attr: { fill: D2 } }], ['.kt', 'pop'], ['.tb', 'in'],
          ...[['.k1', { x: 58 }], ['.k1', { x: 116 }], ['.k3', { y: 60 }], ['.k1', { x: 174 }]].flatMap(([k, m]) => [['' + k, 'to', { attr: { fill: A }, duration: .1, delay: .25 }], ['.tb', 'to', { ...m, duration: .35 }], ['' + k, 'to', { attr: { fill: D2 }, duration: .2 }]])]]; },

    // FinishDecor Trend: un gesto per esplorare, sempre la fonte, telefono prima di tutto
    '06-0': () => { const pins = [[20, -140], [40, -60], [-10, 40], [50, 100], [10, 160]], [g, draw] = globe(200, 132, 96, pins);
      return [g + `<g class="cd"><rect x="110" y="214" width="180" height="70" rx="10" fill="#1C1C1E" stroke="${L}"/>` + t(124, 238, 'FEZ · ZELLIGE') + bar(124, 250, 130) + bar(124, 264, 90, '', 'rgba(255,255,255,.2)') + '</g>' +
        tag(290, 30, 'LIST VIEW', 'lv', D2, W) + cur(120, 150),
        s => { const o = { r: 0 }, up = () => draw(s, o.r);
          return [[o, 'init', { r: 0 }], [up, 0], ['.cu', 'init', { x: 120, y: 150 }], ['.cd', 'init', { y: 60, opacity: 0 }],
            [o, 'to', { r: 140, duration: 1.8, ease: 'power2.inOut', onUpdate: up, delay: .3 }], ['.cu', 'to', { x: 280, y: 150, duration: 1.8, ease: 'power2.inOut' }, '<'],
            ['.cu', 'to', { x: 198, y: 104, duration: .5 }], click, ['.cd', 'to', { y: 0, opacity: 1, duration: .5 }], ['.lv', 'pop']]; }]; },
    '06-1': () => [box(24, 36, 176, 232) + `<rect x="36" y="48" width="152" height="84" rx="6" fill="${G}"/>` + t(36, 152, 'FEZ, MOROCCO', M, '', 15) + t(36, 176, 'ZELLIGE TILES') +
      bar(36, 188, 140) + bar(36, 202, 100, '', 'rgba(255,255,255,.2)') + `<rect x="36" y="222" width="152" height="30" rx="15" fill="${A}"/>` + t(112, 242, 'READ SOURCE', K, 'text-anchor="middle"') +
      ln('M188 237C220 237 222 150 246 150', 'lk', A, 'stroke-width="2"') +
      `<g class="ar">` + box(246, 52, 136, 200) + `<circle cx="258" cy="66" r="3" fill="#48484A"/><circle cx="268" cy="66" r="3" fill="#48484A"/>` + t(258, 92, 'ORIGINAL ARTICLE', M, '', 14) +
      bar(258, 106, 110) + bar(258, 120, 96) + `<rect x="258" y="136" width="112" height="56" rx="4" fill="${G}"/>` + bar(258, 204, 104) + '</g>' +
      `<rect class="hi" x="256" y="216" width="96" height="10" rx="2" fill="${A}" fill-opacity=".55"/>` + cur(300, 290),
      [['.cu', 'init', { x: 300, y: 290 }], ['.cu', 'to', { x: 150, y: 240, duration: .7, delay: .3 }], click, ['.lk', 'draw', { duration: .5 }], ['.ar', 'in'], ['.hi', 'grow']]],
    '06-2': () => [`<rect class="wn" x="30" y="50" width="340" height="200" rx="8" fill="${P}" stroke="${L}"/>` +
      `<rect x="152" y="64" width="96" height="172" rx="10" fill="#0B0B0C" stroke="${A}"/>` + bar(162, 80, 60) + `<circle cx="200" cy="150" r="30" stroke="${A}" stroke-opacity=".6"/>` + bar(162, 206, 76, '', 'rgba(255,255,255,.2)') +
      tag(30, 36, '9:16 LOCKED', 'lk') + t(370, 276, 'W 1360', M, 'class="wv" text-anchor="end"'),
      s => { const o = { w: 340 }, wn = s.querySelector('.wn'), wv = s.querySelector('.wv');
        const up = () => { at(wn, { x: 200 - o.w / 2, width: o.w }); wv.textContent = 'W ' + Math.round(o.w * 4); };
        return [[o, 'init', { w: 340 }], [up, 0], ['.lk', 'pop'], [o, 'to', { w: 120, duration: 1.6, ease: 'power2.inOut', onUpdate: up, delay: .4 }],
          [o, 'to', { w: 340, duration: 1.6, ease: 'power2.inOut', onUpdate: up, delay: .6 }]]; }],

    // Never Before: motion che spiega, leggero sui telefoni, pagine da un'unica fonte
    '07-0': () => { const N = [[176, 140, 'BRIEF'], [262, 72, 'STRATEGY'], [262, 208, 'CONTENT'], [350, 140, 'RESULT']];
      return [`<g class="ph"><rect x="20" y="96" width="110" height="80" rx="4" fill="${G}"/><path d="M28 168L60 128L82 150L98 134L122 168Z" fill="rgba(255,255,255,.2)"/><circle cx="104" cy="114" r="7" fill="rgba(255,255,255,.25)"/></g>` +
        ln('M20 96L130 176M130 96L20 176', 'px', W, 'stroke-width="2"') + t(20, 200, 'STOCK PHOTO', M, 'class="pl"') +
        [[0, 1], [0, 2], [1, 3], [2, 3]].map(([a, b]) => ln(`M${N[a][0]} ${N[a][1]}L${N[b][0]} ${N[b][1]}`, 'ed', A, 'stroke-width="2"')).join('') +
        N.map(([x, y, l]) => `<circle class="nd" cx="${x}" cy="${y}" r="14" fill="${P}" stroke="${A}" stroke-width="2"/>` + t(x, y + 32, l, W, 'class="nl" text-anchor="middle"', 15)).join(''),
        [['.ph', 'in'], ['.pl', 'in'], ['.px', 'draw', { duration: .4, delay: .3 }], ['.ph,.px,.pl', 'to', { opacity: .25, duration: .3 }],
          ['.nd', 'pop', { stagger: .15 }], ['.ed', 'draw', { stagger: .15, duration: .5 }], ['.nl', 'in', { stagger: .1 }]]]; },
    '07-1': u => [`<defs><clipPath id="v${u}"><rect x="140" y="28" width="120" height="244" rx="12"/></clipPath></defs>` + phone(130, 16, 140, 268) +
      `<g clip-path="url(#v${u})"><g class="tl">` + [0, 1, 2].map(k => { const y = 40 + k * 100;
        return `<rect class="tt" x="146" y="${y}" width="108" height="86" rx="6" fill="${G}" stroke="${L}"/>` +
          `<path class="pi" d="M194 ${y + 30}L210 ${y + 40}L194 ${y + 50}Z" fill="${A}"/><path class="pa" d="M194 ${y + 30}V${y + 50}M206 ${y + 30}V${y + 50}" stroke="rgba(255,255,255,.5)" stroke-width="4"/>` +
          bar(152, y + 72, 96, '', 'rgba(255,255,255,.15)', 4) + bar(152, y + 72, 96, 'pg', A, 4); }).join('') + '</g></g>' + tag(20, 30, 'PLAYING 1 / 3', 'ptg'),
      s => { const o = { s: 0 }, tl = s.querySelector('.tl'), pg = $$(s, '.pg'), lab = s.querySelector('.ptg text');
        const up = () => { const a = Math.round(o.s); gsap.set(tl, { y: -o.s * 100 });
          $$(s, '.pi').forEach((e, k) => e.setAttribute('opacity', k === a ? 1 : 0)); $$(s, '.pa').forEach((e, k) => e.setAttribute('opacity', k === a ? 0 : 1));
          $$(s, '.tt').forEach((e, k) => e.setAttribute('stroke', k === a ? A : L)); lab.textContent = `PLAYING ${a + 1} / 3`; };
        return [[o, 'init', { s: 0 }], [pg, 'init', { scaleX: 0, transformOrigin: '0% 50%' }], [up, 0], ['.ptg', 'pop'],
          ...[0, 1, 2].flatMap(k => [[[pg[k]], 'to', { scaleX: 1, duration: 1.1, ease: 'none' }], ...(k < 2 ? [[o, 'to', { s: k + 1, duration: .7, onUpdate: up }]] : [])])]; }],
    '07-2': () => [`<g class="src">` + box(18, 96, 106, 120, 'HOME.HTML') + `<rect class="hf" x="28" y="138" width="86" height="8" rx="2" fill="${A}"/>` + bar(28, 156, 70) + bar(28, 168, 80) + `<rect class="hf" x="28" y="196" width="86" height="8" rx="2" fill="${A}"/></g>` +
      ln('M124 156H160', 'a1', A, 'stroke-width="2"') + `<g class="bd">` + box(160, 128, 76, 56) + t(198, 161, 'BUILD', W, 'text-anchor="middle"') + '</g>' + ln('M236 156H252', 'a2', A, 'stroke-width="2"') +
      ['SERVIZI', 'PROGETTI', 'CHI SIAMO', 'CONTATTI'].map((p, k) => { const x = 256 + (k % 2) * 66, y = 40 + Math.floor(k / 2) * 116;
        return `<g class="pg"><rect x="${x}" y="${y}" width="58" height="92" rx="4" fill="${P}" stroke="${L}"/><rect class="hf" x="${x + 6}" y="${y + 8}" width="46" height="6" rx="2" fill="${A}"/>` +
          bar(x + 6, y + 26, 34 + k * 3) + bar(x + 6, y + 38, 40) + `<rect class="hf" x="${x + 6}" y="${y + 76}" width="46" height="6" rx="2" fill="${A}"/>` + t(x, y + 106, p, M, '', 13) + '</g>'; }).join(''),
      [['.hf', 'init', { attr: { fill: A } }], ['.src', 'in'], ['.a1', 'draw'], ['.bd', 'pop'], ['.a2', 'draw'], ['.pg', 'in', { stagger: .15 }],
        ['.hf', 'to', { attr: { fill: '#FFD6B0' }, duration: .2, yoyo: true, repeat: 1 }]]],

    // Beeyond: numeri prima, due lingue con gli stessi termini, un modulo che arriva alle persone
    // i quattro numeri con cui apre la home del sito
    '08-0': () => { const N = [['MIN. CAKE DRYNESS', 20, n => Math.round(n) + '%'], ['SLUDGE, G/L', 50, n => '2-' + Math.round(n)], ['KW INSTALLED', 8.2, n => '0.2-' + n.toFixed(1)], ['UNATTENDED', 24, n => Math.round(n) + '/7']];
      return [N.map(([l], k) => { const x = 20 + (k % 2) * 184, y = 40 + Math.floor(k / 2) * 116;
        return `<g class="tile">${box(x, y, 176, 104)}${t(x + 14, y + 86, l, M)}</g>` + t(x + 14, y + 58, '0', A, `class="n${k}"`, 42); }).join(''),
        [['.tile', 'in', { stagger: .1 }], ...N.map(([, to, fmt], k) => ['.n' + k, 'count', { to, fmt, duration: 1.2 }, k ? '<.2' : undefined])]]; },
    '08-1': () => { const T = [['FANGO', 'SLUDGE'], ['PRESSA A COCLEA', 'SCREW PRESS'], ['DISIDRATAZIONE', 'DEWATERING']];
      return [t(16, 40, 'IT', M) + t(384, 40, 'EN', M, 'text-anchor="end"') + t(200, 40, 'BROCHURE', M, 'text-anchor="middle"') + box(170, 52, 60, 208) +
        T.map(([it, en], k) => { const y = 112 + k * 60;
          return t(150, y, it, W, `class="it${k}" text-anchor="end"`) + ln(`M154 ${y - 5}H170`, 'l' + k) + t(200, y, 'T-0' + (k + 1), A, 'class="gl" text-anchor="middle"') + ln(`M230 ${y - 5}H246`, 'r' + k) + t(250, y, en, W, `class="en${k}"`); }).join(''),
        [['.gl', 'in', { stagger: .15 }], ...[0, 1, 2].flatMap(k => [['.it' + k, 'in'], ['.l' + k, 'draw', { duration: .3 }], ['.r' + k, 'draw', { duration: .3 }], ['.en' + k, 'in']])]]; },
    '08-2': () => [box(16, 36, 150, 228, 'ENQUIRY') + [70, 96, 60].map((w, k) => `<rect x="28" y="${80 + k * 40}" width="126" height="26" rx="4" fill="${G}"/>` + bar(36, 90 + k * 40, w, 'fv', W)).join('') +
      `<rect class="sb" x="28" y="210" width="126" height="30" rx="15" fill="${A}"/>` + t(91, 230, 'SEND', K, 'text-anchor="middle"') +
      `<path d="M228 126L250 134V152C250 166 240 174 228 180C216 174 206 166 206 152V134Z" stroke="${A}"/>` + t(228, 202, 'SPAM CHECK', M, 'text-anchor="middle"', 14) + ln('M220 152l6 6 10-12', 'ck', A, 'stroke-width="2.5"') +
      `<path d="M250 152C266 152 268 85 284 85M250 152C266 152 268 217 284 217" stroke="${L}" stroke-dasharray="3 4"/>` +
      box(284, 50, 98, 70) + t(296, 76, 'SALES') + ln('M352 92l6 6 12-14', 'tk', A, 'stroke-width="2.5"') +
      box(284, 182, 98, 70) + t(296, 208, 'SENDER COPY', W, '', 14) + ln('M352 224l6 6 12-14', 'tk', A, 'stroke-width="2.5"') +
      `<g class="env"><rect x="150" y="140" width="34" height="24" rx="3" fill="${W}"/><path d="M150 141L167 154L184 141" stroke="${K}" stroke-width="1.5"/></g>`,
      [['.env', 'init', { x: 0, y: 0, opacity: 0 }], ['.sb', 'init', { attr: { fill: A } }], ['.fv', 'grow', { stagger: .25 }],
        ['.sb', 'to', { attr: { fill: '#FFC08A' }, duration: .12, yoyo: true, repeat: 1 }], ['.env', 'to', { opacity: 1, duration: .1 }], ['.env', 'to', { x: 61, duration: .5 }],
        ['.ck', 'draw', { duration: .3 }], ['.env', 'to', { x: 166, y: -67, opacity: 0, duration: .6 }], ['.tk', 'draw', { stagger: .15, duration: .3 }]]],

    // Blackshape Store: un negozio, testi modificabili dal cliente, fedele al marchio
    '09-0': () => [tag(20, 40, 'BROCHURE', 'br', D2, W) + ln('M16 34H108', 'bx', W, 'stroke-width="2"') +
      ['HOME', 'CATEGORY', 'PRODUCT', 'CART'].map((n, k) => `<g class="nd">${box(12 + k * 98, 118, 82, 64)}${t(53 + k * 98, 155, n, W, 'text-anchor="middle"')}</g>` +
        (k < 3 ? ln(`M${94 + k * 98} 150H${110 + k * 98}`, 'aw', A, 'stroke-width="2"') : '')).join('') +
      `<g class="bd"><circle cx="388" cy="118" r="11" fill="${A}"/>${t(388, 123, '1', K, 'text-anchor="middle"')}</g>` + cur(53, 200),
      [['.cu', 'init', { x: 53, y: 200 }], ['.br', 'pop'], ['.bx', 'draw', { duration: .3 }], ['.nd', 'in', { stagger: .12 }], ['.aw', 'draw', { stagger: .12, duration: .25 }],
        ...[1, 2, 3].map(k => ['.cu', 'to', { x: 53 + k * 98, duration: .45, delay: .15 }]), click, ['.bd', 'pop']]],
    '09-1': () => [box(16, 36, 176, 228, 'WP ADMIN · PRODUCT') + t(28, 92, 'TITLE', M, '', 15) + `<rect x="28" y="100" width="152" height="28" rx="4" fill="${G}" stroke="${A}"/>` + t(38, 119, '', W, 'class="ti"') +
      t(28, 158, 'PRICE', M, '', 15) + `<rect x="28" y="166" width="152" height="28" rx="4" fill="${G}"/>` + t(38, 185, '', W, 'class="pr"') +
      box(208, 36, 176, 228, 'LIVE PAGE') + `<rect x="220" y="78" width="152" height="100" rx="6" fill="${G}"/>` + t(220, 204, '', W, 'class="ti"', 20) + t(220, 228, '', A, 'class="pr"') +
      tag(28, 288, 'NO PAGE BUILDER', 'nb'),
      [['.ti', 'type', { text: 'CAPPELLINO' }], ['.pr', 'type', { text: '35 EUR' }], ['.nb', 'pop']]],
    '09-2': () => [['#050505', '#3A3A3C', '#8E8E93', '#D1D1D6', '#FFFFFF'].map((c, k) => `<rect class="gs" x="${20 + k * 64}" y="40" width="52" height="52" rx="6" fill="${c}" stroke="${L}"/>` + t(46 + k * 64, 112, c, M, 'class="gl" text-anchor="middle"', 13)).join('') +
      `<rect class="ac" x="340" y="40" width="52" height="52" rx="6" fill="${A}"/>` + ln('M340 40L392 92M392 40L340 92', 'acx', W, 'stroke-width="2"') +
      `<rect class="cd" x="120" y="150" width="200" height="118" rx="16" fill="${G}" stroke="${L}"/>` + ln('M120 166A16 16 0 0 1 136 150', 'ra', A, 'stroke-width="3"') + tag(150, 292, 'R = AIRCRAFT SITE', 'rt'),
      [['.gs', 'in', { stagger: .08 }], ['.gl', 'in'], ['.ac', 'pop'], ['.acx', 'draw', { duration: .3 }], ['.ac,.acx', 'to', { opacity: .15, duration: .3 }], ['.cd', 'in'], ['.ra', 'draw', { duration: .4 }], ['.rt', 'pop']]],

    // Blackshape Aircraft: prima i prodotti, pubblico internazionale, spazio per crescere
    '10-0': () => [box(40, 20, 320, 260) + [54, 206].map(x => `<g class="tl"><rect x="${x}" y="36" width="140" height="120" rx="6" fill="${G}"/><path d="M${x + 62} 80L${x + 82} 94L${x + 62} 108Z" fill="${W}"/></g>` +
      bar(x + 10, 140, 120, '', 'rgba(255,255,255,.15)', 4) + bar(x + 10, 140, 120, 'pg', A, 4)).join('') + tag(54, 178, 'PRIME', 'tg') + tag(206, 178, 'GABRIEL', 'tg') +
      [292, 240, 270, 180].map((w, k) => bar(54, 200 + k * 18, w, 'rl', 'rgba(255,255,255,.12)', 10)).join(''),
      [['.tl', 'in', { stagger: .15 }], ['.tg', 'pop', { stagger: .15 }], ['.pg', 'grow', { duration: 1.6, ease: 'none', stagger: 0 }], ['.rl', 'in', { stagger: .08 }, '<.3']]],
    '10-1': () => { const [g] = globe(160, 150, 100, [[38, -47], [42, 42], [47, 40], [41, 59], [52, 30]]);
      return [`<g class="gb">${g}</g>` + `<rect x="290" y="24" width="90" height="30" rx="15" fill="${G}"/><rect class="lp" x="292" y="26" width="44" height="26" rx="13" fill="${A}"/>` +
        t(314, 44, 'EN', K, 'text-anchor="middle"') + t(358, 44, 'IT', W, 'text-anchor="middle"') + tag(270, 280, 'ENGLISH FIRST', 'ef'),
        [['.gb', 'in'], ['.pn', 'pop', { stagger: .2 }], ['.lp', 'in'], ['.ef', 'pop']]]; },
    '10-2': () => [box(30, 26, 340, 248, 'EVENTS &amp; MEDIA') + `<g class="ad"><rect x="270" y="32" width="92" height="22" rx="11" fill="${A}"/>${t(316, 48, '+ ADD', K, 'text-anchor="middle"')}</g>` +
      [['JUL', 'EAA AIRVENTURE'], ['SEP', 'IFTE ISTANBUL']].map(([d, n], k) => `<g class="ex"><rect x="42" y="${82 + k * 44}" width="316" height="34" rx="4" fill="${G}"/>${t(54, 104 + k * 44, d, M)}${t(110, 104 + k * 44, n)}</g>`).join('') +
      `<g class="nw"><rect x="42" y="82" width="316" height="34" rx="4" fill="${G}" stroke="${A}"/>${t(54, 104, 'NOV', M)}${t(110, 104, '', W, 'class="nt"')}</g>` +
      tag(30, 296, 'EDITED BY THE CLIENT', 'ec', D2, W) + cur(330, 140),
      [['.ex', 'init', { y: 0 }], ['.cu', 'init', { x: 330, y: 140 }], ['.cu', 'to', { x: 316, y: 46, duration: .6, delay: .4 }], click,
        ['.ex', 'to', { y: 44, duration: .4 }], ['.nw', 'in'], ['.nt', 'type', { text: 'NEW EVENT' }], ['.ec', 'pop']]],

    // Punto Gold: dalla fabbrica al cantiere, prodotti per sistema, preventivo in un passo
    '11-0': () => [tag(20, 40, 'FOOTAGE FROM THE FLOOR', 'ft', D2, W) + `<path d="M70 150H330" stroke="${L}" stroke-width="3"/>` + ln('M70 150H330', 'pl', A, 'stroke-width="3"') +
      ['PRODUCTION', 'SUPPLY', 'INSTALLATION'].map((n, k) => `<circle class="st s${k}" cx="${70 + k * 130}" cy="150" r="20" fill="${P}" stroke="${L}" stroke-width="2"/>` + t(70 + k * 130, 196, n, M, 'text-anchor="middle"')).join('') +
      `<g class="wi"><rect x="56" y="88" width="28" height="36" rx="2" fill="${P}" stroke="${W}" stroke-width="2"/><path d="M70 88V124M56 106H84" stroke="${W}" stroke-width="2"/></g>`,
      [['.wi', 'init', { x: 0 }], ['.st', 'init', { attr: { fill: P, stroke: L } }], ['.ft', 'pop'], ['.s0', 'to', { attr: { fill: A, stroke: A }, duration: .2 }],
        ['.wi', 'to', { x: 130, duration: .8, delay: .3 }], ['.pl', 'draw', { strokeDashoffset: .5, duration: .8, ease: 'power2.inOut' }, '<'], ['.s1', 'to', { attr: { fill: A, stroke: A }, duration: .2 }],
        ['.wi', 'to', { x: 260, duration: .8, delay: .3 }], ['.pl', 'to', { strokeDashoffset: 0, duration: .8 }, '<'], ['.s2', 'to', { attr: { fill: A, stroke: A }, duration: .2 }]]],
    '11-1': () => { const T = [['a', 'w'], ['a', 's'], ['p', 'w'], ['p', 's'], ['a', 'w'], ['p', 's'], ['a', 's'], ['p', 'w']];
      const chip = (x, y, s, c) => `<g><rect class="${c}" x="${x}" y="${y - 15}" width="${s.length * 8 + 16}" height="22" rx="11" fill="${D2}"/>${t(x + 8, y, s)}</g>`;
      return [chip(20, 46, 'ALUMINIUM', 'ca') + chip(124, 46, 'PVC', 'cp') + chip(20, 82, 'WINDOWS', 'cw') + chip(112, 82, 'SLIDING', 'cs') +
        T.map((_, k) => { const x = 20 + (k % 4) * 92, y = 112 + Math.floor(k / 4) * 84;
          return `<g class="tile"><rect x="${x}" y="${y}" width="84" height="72" rx="6" fill="${P}" stroke="${L}"/><rect x="${x + 28}" y="${y + 14}" width="28" height="40" rx="2" stroke="${W}"/><path d="M${x + 42} ${y + 14}V${y + 54}" stroke="${W}"/></g>`; }).join('') +
        tag(296, 104, 'LIVINGSLIDE', 'lv'),
        [['.ca,.cp,.cw,.cs', 'init', { attr: { fill: D2 } }], ['.tile', 'init', { opacity: 1 }], wait(.6),
          ['.ca', 'to', { attr: { fill: A }, duration: .2 }], ['.tile', 'to', { opacity: i => T[i][0] === 'a' ? 1 : .12, duration: .35 }], wait(.8),
          ['.ca', 'to', { attr: { fill: D2 }, duration: .2 }], ['.cp,.cs', 'to', { attr: { fill: A }, duration: .2 }],
          ['.tile', 'to', { opacity: i => T[i][0] === 'p' && T[i][1] === 's' ? 1 : .12, duration: .35 }], ['.lv', 'pop']]]; },
    '11-2': u => [`<defs><clipPath id="q${u}"><rect x="61" y="21" width="278" height="258" rx="8"/></clipPath></defs>` + box(60, 20, 280, 260) +
      `<g clip-path="url(#q${u})"><g class="ct">` + [...Array(14)].map((_, k) => k % 4 === 0 ? `<rect x="76" y="${40 + k * 40}" width="248" height="64" rx="6" fill="${G}"/>` : bar(76, 52 + k * 40, 120 + (k * 37) % 120)).join('') + '</g></g>' +
      `<g class="bt"><rect x="214" y="234" width="114" height="30" rx="15" fill="${A}"/>${t(271, 254, 'GET A QUOTE', K, 'text-anchor="middle"')}</g>` +
      `<g class="ok"><rect x="110" y="110" width="180" height="70" rx="10" fill="#1C1C1E" stroke="${A}"/>${t(200, 152, 'REQUEST SENT', W, 'text-anchor="middle"')}</g>` +
      t(60, 296, 'IN REACH ON EVERY PAGE', M) + cur(330, 300),
      [['.ct', 'init', { y: 0 }], ['.cu', 'init', { x: 330, y: 300 }], ['.ct', 'to', { y: -300, duration: 2.6, ease: 'none' }],
        ['.cu', 'to', { x: 266, y: 252, duration: .6 }], click, ['.ok', 'pop']]],
  };

  // sequenza dei passi: in (entra), pop, grow (cresce in larghezza), draw (si disegna), count, type, to, fromTo, set, init (stato a inizio giro)
  const from = {
    in: [{ opacity: 0, y: 8 }, { opacity: 1, y: 0 }],
    pop: [{ opacity: 0, scale: .6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1 }],
    grow: [{ scaleX: 0, opacity: 1, transformOrigin: '0% 50%' }, { scaleX: 1 }],
    draw: [{ strokeDashoffset: 1, opacity: 1 }, { strokeDashoffset: 0 }],
  };
  const run = (root, tl, list) => {
    tl.set(root, { opacity: 1 }, 0);
    for (const [q, kind, v = {}, pos] of list) {
      if (typeof q === 'function') { tl.call(q, null, kind); continue; } // [funzione, posizione]
      const els = typeof q === 'string' ? $$(root, q) : q;
      if (from[kind]) { tl.set(els, from[kind][0], 0); tl.to(els, { ...from[kind][1], duration: .5, ease: 'power2.out', stagger: .12, ...v }, pos); }
      else if (kind === 'init') tl.set(els, v, 0);
      else if (kind === 'set') tl.set(els, v, pos);
      else if (kind === 'fromTo') tl.fromTo(els, v[0], { ease: 'power2.out', ...v[1] }, pos);
      else if (kind === 'count' || kind === 'type') {
        const fmt = v.fmt || (n => Math.round(n)), o = { n: 0 };
        const show = n => els.forEach(e => (e.textContent = kind === 'type' ? v.text.slice(0, Math.round(n)) : fmt(n)));
        tl.call(() => { show(v.from || 0); if (v.placeholder) els.forEach(e => { e.textContent = v.placeholder; e.setAttribute('fill', M); }); }, null, 0);
        tl.fromTo(o, { n: v.from || 0 }, { n: kind === 'type' ? v.text.length : v.to, duration: v.duration || (kind === 'type' ? v.text.length * .07 : 1.2), ease: v.ease || (kind === 'type' ? 'none' : 'power1.out'),
          onStart: () => kind === 'type' && els.forEach(e => e.setAttribute('fill', e.getAttribute('fill') === M ? W : e.getAttribute('fill'))), onUpdate: () => show(o.n) }, pos);
      } else tl.to(els, { duration: .6, ease: 'power2.inOut', ...v }, pos);
    }
    tl.addLabel('end');
    tl.to({}, { duration: 1.8 });
    tl.to(root, { opacity: 0, duration: .35 });
  };

  const names = Object.keys(F);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let uid = 0;
  window.motivo = (el, which) => {
    const sc = H[which], u = ++uid;
    const [svg, play] = sc ? sc(u) : F[typeof which === 'number' ? names[which % names.length] : which]();
    el.innerHTML = `<svg viewBox="0 0 400 300" fill="none" aria-hidden="true">${svg}</svg>`;
    if (!window.gsap || (still && !sc)) return;
    const root = el.firstElementChild, tl = gsap.timeline({ paused: true, repeat: -1 });
    if (sc) run(root, tl, typeof play === 'function' ? play(root) : play); else play(root, tl);
    if (still) { tl.seek('end'); return; } // movimento ridotto: la scena ferma a fine racconto
    new IntersectionObserver(([e]) => e.isIntersecting ? tl.play() : tl.pause()).observe(el);
  };
  window.motivo.has = k => k in H;
})();

// logo come testo in un editor: all'apertura si scrive lettera per lettera; scorrendo giù si cancella fino a "N"
// col cursore che lampeggia, e si riscrive tornando su o passandoci sopra col mouse
(() => {
  const el = document.querySelector('.hdr .word');
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  el.innerHTML = [...el.textContent].map(c => `<span>${c}</span>`).join('') + '<i style="display:none;width:2px;height:.9em;margin-left:2px;vertical-align:-.08em;background:var(--accent)"></i>';
  const ls = [...el.children].slice(1, -1), caret = el.lastElementChild;
  gsap.to(caret, { opacity: 0, duration: .5, repeat: -1, yoyo: true, ease: 'steps(1)' });
  const tl = gsap.timeline({ paused: true }).set(caret, { display: 'inline-block' }, 0);
  ls.reverse().forEach((s, i) => tl.set(s, { display: 'none' }, .06 + i * .06));
  let hover = false, shut = true;
  const upd = () => { const c = scrollY > 80 && !hover; if (c !== shut) { shut = c; c ? tl.play() : tl.reverse(); } };
  tl.progress(1); gsap.delayedCall(.4, upd); // parte cancellato e si scrive
  addEventListener('scroll', upd, { passive: true });
  const a = el.closest('a');
  a.addEventListener('pointerenter', () => { hover = true; upd(); });
  a.addEventListener('pointerleave', () => { hover = false; upd(); });
})();

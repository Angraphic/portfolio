// dati condivisi tra home (index.html) e scheda (progetto.html). Testi in inglese.
// Anteprime: assets/lavori/<id>.webm (video in loop) + <id>.jpg (poster), registrate dai siti veri.
// video: false = niente registrazione (resta il riquadro grigio). tall: true = video verticale (app 9:16).
// extra: seconda registrazione mostrata nella scheda (es. sito marketing accanto all'app).
// c: colore del riquadro in cui si mostra il prodotto (device.css).
const works = [
  {
    id: '01', c: '#8CCFF8', n: 'LeadWin', t: ['SaaS', 'Lead management'], kind: 'Web app + marketing site', at: 'Never Before Italia', status: 'Live, used by client companies', ai: true,
    url: 'https://leadwin.it', extra: { id: '01-site', label: 'Marketing site' }, label: 'Product',
    sum: 'A lead management platform for companies that advertise on Meta and Google: leads land in real time, get routed into pipelines, scored and assigned to sales agents, who follow up on WhatsApp and book appointments in the same place.',
    role: ['Product and UI design', 'Front-end development', 'Meta developer: the LeadWin Meta app (official Tech Provider)', 'Integrations: Google Ads, Google Calendar, Make.com', 'Marketing site, design and build'],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Supabase (Postgres, Edge Functions)', 'Make.com', 'Meta Graph API', 'Meta Lead Ads', 'WhatsApp Business Platform', 'Google Ads API', 'MCP'],
    points: [
      ['AI where the work happens', '"Ask Leady" answers questions about your own leads with your permissions, a WhatsApp agent qualifies contacts and books visits, and a read-only MCP server lets clients query their data from Claude or ChatGPT.'],
      ['Meta developer', 'I built and maintain the LeadWin Meta app: Facebook Login, Lead Ads webhooks routed to the right client by Page, ad insights and the WhatsApp Business Platform with Embedded Signup, so a client connects everything in a few clicks. LeadWin is an official Meta Tech Provider.'],
      ['Built for the sales floor', 'Pipelines, lead scoring (hot / warm / cold), a team calendar with conflict-free booking and an inbox for WhatsApp, so agents never leave the app.'],
      ['A marketing site that loads fast', 'Static site, 95–100 on mobile Lighthouse, structured data and an llms.txt, so both search engines and AI assistants can read it.'],
    ],
  },
  {
    id: '02', c: '#C6FF2D', n: 'Traccio', t: ['Mobile app', 'Logistics'], kind: 'iOS and Android app', at: 'Personal project', status: 'In development, tested on device',
    url: 'https://traccio-landing-six.vercel.app', label: 'Landing page',
    sum: 'My own product: an app that follows parcels across every carrier and only notifies you when you have to do something: held at a pickup point, failed delivery, handover to another carrier. Everything else stays quiet.',
    role: ['Product idea and written spec', 'Interface design', 'Mobile and back-end development', 'Landing page'],
    stack: ['Expo (React Native)', 'TypeScript', 'Supabase (Edge Functions, pg_cron, Realtime)', 'AfterShip and 17TRACK APIs', 'OpenFreeMap'],
    points: [
      ['Spec first, then data', 'I wrote the MVP spec before any screen, then compared tracking providers on real parcels: the provider was chosen on measured latency, not on its documentation.'],
      ['One field to start', 'Paste a tracking number, or let the app read it from the clipboard, and get a live parcel page with the route on a map and the pickup deadline.'],
      ['Feels native', 'iOS 26 Liquid Glass tabs, Face ID lock, Google sign-in and a two-scene onboarding.'],
    ],
  },
  {
    id: '03', c: '#E8C6A0', n: 'InTessuto', t: ['Configurator', 'Interiors'], kind: 'Web app', at: 'Never Before Italia', status: 'Live demo', ai: true,
    url: 'https://intessuto.vercel.app',
    sum: 'A guided fabric configurator for upholstery. Instead of a catalogue of 84 fabrics and 1,700 colours, a few questions and a visual path that turns instinctive choices into a style profile, then a render of your own sofa in the chosen fabric.',
    role: ['Interface design', 'Front-end and back-end development', 'Data pipeline for colours and datasheets'],
    stack: ['Next.js', 'Material 3', 'Supabase', 'sharp', 'Image generation API'],
    points: [
      ['A profile you can read', 'The style profile is rule-based, not a black box: every criterion shows the choice that produced it.'],
      ['Real data, cleaned up', 'Dominant colours extracted from 1,486 swatches, so fabrics named with codes finally show up in colour filters. Datasheets parsed from 81 PDFs in three different templates.'],
      ['Ranking that actually ranks', 'A test showed one criterion was true for every fabric, so all scored the same. Now it weighs the share of matching colours.'],
    ],
  },
  {
    id: '04', c: '#F5A623', n: 'FinishDecor Discover', t: ['Kiosk app', 'Interiors'], kind: 'Showroom touch screen', at: 'Never Before Italia', status: 'Prototype, shown to the client', ai: true, tall: true,
    sum: 'A guided experience on a vertical touch screen in a finishes showroom. Visitors pick a kind of space, react to images and compare pairs; the system proposes three colour palettes, hands them to the phone with a QR code while they touch the real samples, then shows them in AI-generated rooms.',
    role: ['Flow and interface design', 'Development', 'AI integration'],
    stack: ['HTML, CSS, JavaScript', 'Vercel Functions', 'Gemini API'],
    points: [
      ['Designed for a big screen', 'Type and touch targets sized for a tall monitor viewed standing up; it resets itself after two idle minutes.'],
      ['Phone handoff without an account', 'The palettes travel inside the QR link: no login, no form.'],
      ['An interior tool, not a dating app', 'No stamps or likes on the photos: the only feedback is a ring that fills up, so the choice stays about style.'],
    ],
  },
  {
    id: '05', c: '#FF9C7A', n: 'ManyTask', t: ['SaaS', 'Operations'], kind: 'Web app', at: 'Never Before Italia', status: 'Internal prototype', video: false,
    sum: 'Operations software for an agency: tasks, clients and contracts in one place. Activating a contract generates its recurring tasks and payment schedule, and every client gets a read-only portal on their own work.',
    role: ['Product and UI design', 'Full-stack development', 'Database and permissions design'],
    stack: ['Next.js', 'Supabase (Postgres, row-level security)', 'shadcn/ui', 'Tailwind', 'Resend', 'Meta Graph API'],
    points: [
      ['Permissions live in the database', 'Four roles enforced with row-level security, plus automated checks run against the real database.'],
      ['Bugs only tests find', 'A contract started months ago only generated the current month; the generator now backfills from the start date.'],
      ['Board and team calendar', 'Drag and drop board with an accessible fallback for touch and keyboard, and a calendar with one row per person.'],
    ],
  },
  {
    id: '06', c: '#9C98F2', n: 'FinishDecor Trend', t: ['Mobile web app', 'Interiors'], kind: 'Mobile web app', at: 'Never Before Italia', status: 'Live', ai: true, tall: true,
    url: 'https://finish-decor.vercel.app',
    sum: 'A globe of finishing and interior design trends, each pinned to the city it comes from. Tap a pin to read the story and jump to the original source. The content is refreshed by a script that queries an AI search API.',
    role: ['Concept and UI design', 'Development'],
    stack: ['HTML, CSS, JavaScript', 'Canvas', 'TopoJSON', 'Perplexity API'],
    points: [
      ['One gesture to explore', 'Spin the globe, tap a city, read: the list view is there for whoever prefers it.'],
      ['Always the source', 'Every trend links to the article it comes from.'],
      ['Phone first', 'The frame is locked to 9:16 on purpose, also on desktop: it is meant to be shared and opened on a phone.'],
    ],
  },
  {
    id: '07', c: '#EDE6DC', n: 'Never Before', t: ['Website', 'Agency'], kind: 'Website', at: 'Never Before Italia', status: 'Live preview',
    url: 'https://neverbefore-site.vercel.app',
    sum: 'The new website of the agency I work for, built around motion: a reel that opens full screen and settles into the headline, services as animated diagrams and a draggable wall of projects.',
    role: ['Art direction and UI design', 'Motion design', 'Development'],
    stack: ['HTML, CSS, JavaScript', 'GSAP', 'Lenis', 'Matter.js', 'SVG animation', 'View Transitions'],
    points: [
      ['Motion that explains', 'Each service is an animated SVG diagram instead of a stock photo.'],
      ['Light on phones', 'Only one video plays at a time, off-screen animations pause and heavy effects are reduced on touch devices.'],
      ['Pages from one source', 'Inner pages are generated by a small build script from the home page, so header, menu and footer never drift apart.'],
    ],
  },
  {
    id: '08', c: '#9FE3EA', n: 'Beeyond', t: ['Website', 'Industrial'], kind: 'Website', at: 'Never Before Italia', status: 'Live',
    url: 'https://beeyond-eight.vercel.app/en/',
    sum: 'A bilingual website for a company that builds sludge dewatering machines. The job was to make industrial technology readable for plant managers and procurement, with numbers first.',
    role: ['UI design', 'Development', 'Copy edits with the client across three rounds of revisions'],
    stack: ['HTML, CSS, JavaScript', 'Vercel', 'Resend'],
    points: [
      ['Numbers first', 'The home page opens with the four figures a buyer compares: cake dryness, sludge concentration, installed power, unattended operation.'],
      ['Two languages, one source of terms', 'Italian and English with terminology aligned to the official product brochure.'],
      ['A form that reaches people', 'Enquiries are sent by email through Resend, with spam filtering and a copy to the sender.'],
    ],
  },
  {
    id: '09', c: '#D9D9DE', n: 'Blackshape Store', t: ['E-commerce', 'Aviation'], kind: 'E-commerce', at: 'Never Before Italia', status: 'Live prototype',
    url: 'https://antonionocellanb4.github.io/blackshape-shop/',
    sum: 'The official merchandise store of an Italian aircraft manufacturer: apparel and gear for pilots. Two design directions, then the chosen one rebuilt as a custom WooCommerce theme the client can edit without a page builder.',
    role: ['Interface design', 'Front-end development', 'WordPress and WooCommerce theme'],
    stack: ['HTML, CSS, JavaScript', 'WordPress', 'WooCommerce', 'ACF'],
    points: [
      ['A shop, not a brochure', 'The first draft looked like a corporate site; the client wanted a store, so every page follows e-commerce structure: product, category, cart.'],
      ['Editable by the client', 'Product and home page texts are plain fields: no paid plugins, no page builder.'],
      ['True to the brand', 'Monochrome, no accent colour, radii taken from the aircraft website.'],
    ],
  },
  {
    id: '10', c: '#BFD4EA', n: 'Blackshape Aircraft', t: ['Website', 'Aviation'], kind: 'Website', at: 'Never Before Italia', status: 'Live',
    url: 'https://blackshapeaircraft.com',
    sum: 'The corporate website of Blackshape, an Italian manufacturer of ultralight and certified aircraft: models, operations, service and dealer network.',
    role: ['UI design', 'WordPress development'],
    stack: ['WordPress', 'Custom theme'],
    points: [
      ['Product first', 'The two aircraft series lead the page, with video from the field.'],
      ['International audience', 'English-first content for dealers and pilots worldwide.'],
      ['Room to grow', 'Events and media sections the client updates on their own.'],
    ],
  },
  {
    id: '11', c: '#FFD84D', n: 'Punto Gold', t: ['Website', 'Manufacturing'], kind: 'Website', at: 'Never Before Italia', status: 'Live',
    url: 'https://www.puntogold.it',
    sum: 'The website of a window contractor near Bari that manufactures, supplies and installs aluminium and PVC windows, following builders and homeowners from design to site.',
    role: ['UI design', 'WordPress development'],
    stack: ['WordPress', 'Elementor', 'Custom theme'],
    points: [
      ['From factory to site', 'Production, supply and installation told as one process, with footage from the factory floor.'],
      ['Products by system', 'Windows and sliding doors organised by material and system, the way technicians ask for them.'],
      ['Quote in one step', 'A request button that stays in reach on every page.'],
    ],
  },
];
const services = [
  ['Product design', 'From a fuzzy brief to flows people finish: research, specs, prototypes, and the small decisions that make an app feel obvious.', ['User flows', 'Specs', 'Prototyping', 'Usability']],
  ['UI and motion',         'Grids, type, colour and motion that explain something, from design systems to a single screen.',                                  ['UI design', 'Design systems', 'Material 3', 'Motion', 'SVG']],
  ['Building in code',      'I build what I design, so the prototype is the product: web apps, mobile apps, sites and the integrations behind them.',           ['React', 'Next.js', 'Expo', 'Supabase', 'WordPress']],
];
const workType = w => w.kind;
const workUrl = w => `progetto.html?id=${w.id}`;
const media = id => `assets/lavori/${id}`;

// anteprima del lavoro: video in loop (parte solo quando è a schermo) col poster jpg; still = solo l'immagine
const workPic = (w, alt = w.n, { still = false, id = w.id } = {}) => w.video === false ? ''
  : still ? `<img src="${media(id)}.jpg" alt="${alt}" loading="lazy" onerror="this.remove()">`
  : `<video src="${media(id)}.webm" poster="${media(id)}.jpg" muted loop playsinline preload="none" data-auto aria-label="${alt}"></video>`;

// i video partono solo se visibili e si fermano fuori schermo (con movimento ridotto restano fermi sul poster)
const autoplay = (root = document) => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = autoplay.io || (autoplay.io = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
  }), { rootMargin: '120px' }));
  root.querySelectorAll('video[data-auto]').forEach(v => io.observe(v));
};

// il prodotto nel suo riquadro colorato: telefono per le app verticali, finestra da browser per il resto
const SB = '<div class="sb"><span>9:41</span><svg width="54" height="12" viewBox="0 0 54 12" fill="#fff" aria-hidden="true"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="1" width="3" height="11" rx="1"/><path d="M28 3.5a8 8 0 0 1 9 0l-1.3 1.6a6 6 0 0 0-6.4 0zM30.3 6.3a4.3 4.3 0 0 1 4.4 0L32.5 9z"/><rect x="41" y="1.5" width="11" height="9" rx="2.5" fill="none" stroke="#fff"/><rect x="42.8" y="3.3" width="7.4" height="5.4" rx="1.2"/></svg></div>';
const device = (w, { id = w.id, tall = w.tall } = {}) => {
  const tag = w.at === 'Personal project' ? 'Personal project' : /prototype/i.test(w.status) ? 'Prototype' : '';
  const scr = `<div class="scr">${w.video === false ? '<span class="soon">Recording coming soon</span>' : workPic(w, w.n, { id })}</div>`;
  return `<div class="dev" style="--c:${w.c}">${tall ? `<div class="phone">${SB}${scr}</div>` : `<div class="win"><div class="bar"><i></i><i></i><i></i></div>${scr}</div>`}${tag ? `<span class="dtag">${tag}</span>` : ''}</div>`;
};

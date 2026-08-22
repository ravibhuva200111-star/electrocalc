// ElectroCalc shared navigation
// To add a new calculator: just add one line to CALCULATORS below.
// Every page's nav menu updates automatically - no need to edit individual HTML files.

const CALCULATORS = [
  { category: "📐 Basics", items: [
    { href: "ohms-law.html", name: "Ohm's Law Calculator", desc: "Solve voltage, current, resistance or power from any two known values." },
    { href: "voltage-divider.html", name: "Voltage Divider", desc: "Calculate output voltage across two resistors in series." },
  ]},
  { category: "🎨 Component Codes", items: [
    { href: "resistor-color-code.html", name: "Resistor Color Code", desc: "Decode 4, 5 or 6-band resistors into ohms, or reverse it." },
    { href: "capacitor.html", name: "Capacitor Code Reader", desc: "Convert 3-digit capacitor codes into pF, nF, or µF." },
  ]},
  { category: "🔋 Resistors & Power", items: [
    { href: "series-parallel.html", name: "Series / Parallel R", desc: "Combine resistor values in series or parallel instantly." },
    { href: "circuit-solver.html", name: "Resistor Network Solver", desc: "Solve total resistance for complex resistor networks." },
    { href: "led-resistor.html", name: "LED Resistor Calculator", desc: "Find the right series resistor for any LED and supply voltage." },
    { href: "power-converter.html", name: "Power Converter", desc: "Convert between kW, kVA, and horsepower." },
  ]},
  { category: "⚡ Wiring & Safety", items: [
    { href: "wire-gauge.html", name: "Wire Gauge / Voltage Drop", desc: "Size AWG wire and calculate voltage drop over distance." },
  ]},
  { category: "🔁 AC / Reactive Circuits", items: [
    { href: "rc-time-constant.html", name: "RC Time Constant", desc: "Calculate charge/discharge time constant for RC circuits." },
  ]},
  { category: "📡 RF & Signal", items: [
    { href: "frequency-wavelength.html", name: "Frequency / Wavelength", desc: "Convert between frequency and wavelength for RF work." },
  ]},
  { category: "🔌 Transformers & Motors", items: [
    { href: "transformer.html", name: "Transformer Ratio", desc: "Calculate turns ratio and primary/secondary voltage or current." },
  ]},
  { category: "🔋 Batteries & Energy", items: [
    { href: "battery-life.html", name: "Battery Life Calculator", desc: "Estimate runtime from battery capacity and load current." },
  ]},
];

function renderNav(){
  const dropdown = document.getElementById('navDropdown');
  if(!dropdown) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  let html = '';

  CALCULATORS.forEach(group => {
    html += `<div class="nav-category">${group.category}</div>`;
    group.items.forEach(item => {
      const cls = item.href === currentPage ? ' class="nav-current"' : '';
      html += `<a href="${item.href}"${cls}>${item.name}</a>`;
    });
  });

  html += `<div class="nav-divider"></div>`;
  html += `<a href="about.html"${currentPage==='about.html'?' class="nav-current"':''}>About</a>`;
  html += `<a href="contact.html"${currentPage==='contact.html'?' class="nav-current"':''}>Contact</a>`;
  html += `<a href="privacy-policy.html"${currentPage==='privacy-policy.html'?' class="nav-current"':''}>Privacy Policy</a>`;
  html += `<a href="terms.html"${currentPage==='terms.html'?' class="nav-current"':''}>Terms of Service</a>`;
  html += `<a href="disclaimer.html"${currentPage==='disclaimer.html'?' class="nav-current"':''}>Disclaimer</a>`;

  dropdown.innerHTML = html;
}

function renderToolGrid(){
  const grid = document.getElementById('toolGrid');
  if(!grid) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const all = [];
  CALCULATORS.forEach(group => group.items.forEach(item => all.push(item)));

  const others = all.filter(item => item.href !== currentPage);
  let html = '';
  others.forEach(item => {
    html += `<a class="tool-card" href="${item.href}"><div class="tname">${item.name}</div></a>`;
  });
  grid.innerHTML = html;
}

function renderHub(containerId){
  const container = document.getElementById(containerId || 'hubContainer');
  if(!container) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  let html = '';
  CALCULATORS.forEach(group => {
    const items = group.items.filter(item => item.href !== currentPage);
    if(items.length === 0) return;
    html += `<div class="hub-cat"><div class="hub-cat-title">${group.category}</div><div class="hub-grid">`;
    items.forEach(item => {
      html += `<a class="hub-card" href="${item.href}"><div class="hname">${item.name}</div><div class="hdesc">${item.desc || ''}</div></a>`;
    });
    html += `</div></div>`;
  });
  container.innerHTML = html;
}

function renderRelatedGrid(){
  const grid = document.getElementById('relatedGrid');
  if(!grid) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  let currentCategory = null;
  CALCULATORS.forEach(group => {
    if(group.items.some(item => item.href === currentPage)) currentCategory = group;
  });

  let related = [];
  if(currentCategory){
    related = currentCategory.items.filter(item => item.href !== currentPage);
  }

  if(related.length < 3){
    const all = [];
    CALCULATORS.forEach(group => group.items.forEach(item => all.push(item)));
    const others = all.filter(item => item.href !== currentPage && !related.includes(item));
    related = related.concat(others.slice(0, 3 - related.length));
  }

  let html = '';
  related.slice(0, 5).forEach(item => {
    html += `<a class="tool-card" href="${item.href}"><div class="tname">${item.name}</div></a>`;
  });
  grid.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function(){
  renderNav();
  renderToolGrid();
  renderRelatedGrid();
  renderHub();
  initTheme();

  document.addEventListener('click', function(e){
    const wrap = document.querySelector('.nav-menu-wrap');
    const dropdown = document.getElementById('navDropdown');
    if(wrap && dropdown && !wrap.contains(e.target)){
      dropdown.classList.remove('open');
    }
  });

  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = '© ' + new Date().getFullYear();
});

function initTheme(){
  const btn = document.getElementById('themeToggleBtn');
  if(!btn) return;

  const saved = localStorage.getItem('electrocalc-theme');
  const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = saved || (systemPrefersLight ? 'light' : 'dark');

  applyTheme(initial);

  btn.addEventListener('click', function(){
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('electrocalc-theme', next);
  });
}

function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggleBtn');
  if(btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
}

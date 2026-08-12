// ElectroCalc shared navigation
// To add a new calculator: just add one line to CALCULATORS below.
// Every page's nav menu updates automatically - no need to edit individual HTML files.

const CALCULATORS = [
  { category: "📐 Basics", items: [
    { href: "ohms-law.html", name: "Ohm's Law Calculator" },
    { href: "voltage-divider.html", name: "Voltage Divider" },
  ]},
  { category: "🎨 Component Codes", items: [
    { href: "resistor-color-code.html", name: "Resistor Color Code" },
    { href: "capacitor.html", name: "Capacitor Code Reader" },
  ]},
  { category: "🔋 Resistors & Power", items: [
    { href: "series-parallel.html", name: "Series / Parallel R" },
    { href: "circuit-solver.html", name: "Resistor Network Solver" },
    { href: "led-resistor.html", name: "LED Resistor Calculator" },
    { href: "power-converter.html", name: "Power Converter" },
  ]},
  { category: "⚡ Wiring & Safety", items: [
    { href: "wire-gauge.html", name: "Wire Gauge / Voltage Drop" },
  ]},
  { category: "🔁 AC / Reactive Circuits", items: [
    { href: "rc-time-constant.html", name: "RC Time Constant" },
  ]},
  { category: "📡 RF & Signal", items: [
    { href: "frequency-wavelength.html", name: "Frequency / Wavelength" },
  ]},
  { category: "🔌 Transformers & Motors", items: [
    { href: "transformer.html", name: "Transformer Ratio" },
  ]},
  { category: "🔋 Batteries & Energy", items: [
    { href: "battery-life.html", name: "Battery Life Calculator" },
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

document.addEventListener('DOMContentLoaded', function(){
  renderNav();
  renderToolGrid();
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

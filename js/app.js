// Main app: render tools/CTF/resources/commands from data/database.json
// Mobile menu toggle + service worker registration.
// Blue & White Theme — Three.js particles use blue shades.

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.toggle('hidden');
  menu.classList.toggle('flex');
}

// === Tools page ===
async function renderTools() {
  const grid = document.getElementById('toolsGrid');
  if (!grid) return;
  try {
    const db = await fetch('../data/database.json').catch(() => fetch('data/database.json'));
    const data = await db.json();
    const all = [];
    for (const cat in data.tools) {
      data.tools[cat].forEach(t => all.push({ ...t, _cat: cat }));
    }
    const render = (filter, search) => {
      grid.innerHTML = all.filter(t =>
        (filter === 'all' || t._cat === filter) &&
        (!search || (t.name + ' ' + t.description + ' ' + (t.tags || []).join(' ')).toLowerCase().includes(search.toLowerCase()))
      ).map(t => `
        <article class="glass-card p-6" data-category="${t._cat}">
          <div class="flex items-start justify-between mb-3">
            <h3 class="text-xl font-black text-slate-900">${t.name}</h3>
            <span class="chip">${t.difficulty}</span>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">${t.description}</p>
          <div class="flex flex-wrap gap-1 mb-3">
            ${(t.tags || []).slice(0, 3).map(tag => `<span class="chip-soft text-xs">#${tag}</span>`).join('')}
          </div>
          <div class="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
            <span><i class="fa-solid fa-${t.platform.includes('Linux') ? 'linux' : 'desktop'} ml-1 text-blue-600"></i>${t.platform}</span>
            <a href="${t.website}" target="_blank" rel="noopener" class="text-blue-600 font-bold hover:text-blue-700">الموقع ←</a>
          </div>
        </article>
      `).join('');
    };
    render('all', '');

    document.querySelectorAll('#toolsTabs .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#toolsTabs .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render(btn.dataset.category, document.getElementById('toolsSearch')?.value || '');
      });
    });
    document.getElementById('toolsSearch')?.addEventListener('input', (e) => {
      const active = document.querySelector('#toolsTabs .filter-btn.active')?.dataset.category || 'all';
      render(active, e.target.value);
    });
  } catch (err) {
    grid.innerHTML = '<p class="text-slate-600 col-span-full text-center">تعذّر تحميل الأدوات.</p>';
  }
}

// === CTF page ===
async function renderCTF() {
  const grid = document.getElementById('ctfGrid');
  if (!grid) return;
  try {
    const db = await fetch('../data/database.json').catch(() => fetch('data/database.json'));
    const data = await db.json();
    grid.innerHTML = data.ctf.map(c => `
      <a href="${c.url}" target="_blank" rel="noopener" class="glass-card p-6 block hover:scale-105 transition">
        <div class="w-12 h-12 mb-4 rounded-xl bg-blue-100 flex items-center justify-center">
          <i class="fa-solid fa-flag text-2xl text-blue-600"></i>
        </div>
        <h3 class="text-xl font-black mb-2 text-slate-900">${c.name}</h3>
        <p class="text-slate-600 text-sm mb-4 leading-relaxed">${c.description}</p>
        <div class="flex items-center justify-between text-xs">
          <span class="chip">${c.difficulty}</span>
          <span class="text-slate-500">${c.price}</span>
        </div>
      </a>
    `).join('');
  } catch (err) {
    grid.innerHTML = '<p class="text-slate-600 col-span-full text-center">تعذّر التحميل.</p>';
  }
}

// === Resources page ===
async function renderResources() {
  try {
    const db = await fetch('../data/database.json').catch(() => fetch('data/database.json'));
    const data = await db.json();
    const yt = document.getElementById('youtubeGrid');
    if (yt) yt.innerHTML = data.resources.youtube.map(v => `
      <a href="${v.url}" target="_blank" rel="noopener" class="glass-card p-5 block hover:scale-105 transition">
        <div class="flex items-center gap-2 mb-2">
          <i class="fa-brands fa-youtube text-red-500 text-xl"></i>
          <span class="chip-soft">${v.language}</span>
        </div>
        <h3 class="font-black mb-1 text-slate-900">${v.name}</h3>
        <p class="text-xs text-slate-500">${v.subscribers} مشترك</p>
        <p class="text-sm text-slate-600 mt-2">${v.description}</p>
      </a>
    `).join('');

    const courses = document.getElementById('coursesGrid');
    if (courses) courses.innerHTML = data.resources.courses.map(c => `
      <a href="${c.url}" target="_blank" rel="noopener" class="glass-card p-6 block hover:scale-105 transition">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-black text-slate-900">${c.name}</h3>
          <span class="chip">${c.price}</span>
        </div>
        <p class="text-slate-600 text-sm mb-3">${c.description}</p>
        <span class="text-xs text-slate-500">${c.level}</span>
      </a>
    `).join('');

    const books = document.getElementById('booksGrid');
    if (books) books.innerHTML = data.resources.books.map(b => `
      <article class="glass-card p-5">
        <i class="fa-solid fa-book text-blue-600 text-2xl mb-3"></i>
        <h3 class="font-black mb-1 leading-tight text-slate-900">${b.title}</h3>
        <p class="text-xs text-slate-500 mb-2">${b.author} • ${b.year}</p>
        <p class="text-sm text-slate-600">${b.description}</p>
        <span class="inline-block mt-3 chip">${b.level}</span>
      </article>
    `).join('');

    const certs = document.getElementById('certsGrid');
    if (certs) certs.innerHTML = data.resources.certifications.map(c => `
      <article class="glass-card p-5">
        <i class="fa-solid fa-certificate text-blue-600 text-2xl mb-3"></i>
        <h3 class="font-black mb-2 text-slate-900">${c.name}</h3>
        <p class="text-sm text-slate-600 mb-3">${c.description}</p>
        <div class="flex items-center justify-between text-xs">
          <span class="chip">${c.level}</span>
          <span class="text-slate-500 font-bold">${c.cost}</span>
        </div>
      </article>
    `).join('');
  } catch (err) { /* silent */ }
}

// === Commands page ===
async function renderCommands() {
  const grid = document.getElementById('commandsGrid');
  if (!grid) return;
  try {
    const db = await fetch('../data/database.json').catch(() => fetch('data/database.json'));
    const data = await db.json();
    grid.innerHTML = data.commands.map(cat => `
      <article class="glass-card p-6">
        <h3 class="text-xl font-black mb-4 flex items-center gap-2 text-slate-900">
          <i class="fa-solid fa-terminal text-blue-600"></i>
          ${cat.category}
        </h3>
        <div class="space-y-3">
          ${cat.commands.map(cmd => `
            <div class="cmd-block">
              <code>${cmd.cmd}</code>
              <p class="text-xs text-slate-600 mt-1">${cmd.description}</p>
            </div>
          `).join('')}
        </div>
      </article>
    `).join('');
  } catch (err) { /* silent */ }
}

// === Three.js background — Blue & White particles ===
function initBackground() {
  const container = document.getElementById('canvas-container');
  if (!container || typeof THREE === 'undefined') return;
  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    const particles = new THREE.BufferGeometry();
    const count = 600;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 100;
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    // Blue palette
    const mat = new THREE.PointsMaterial({ color: 0x2563eb, size: 0.18, transparent: true, opacity: 0.5 });
    const points = new THREE.Points(particles, mat);
    scene.add(points);
    camera.position.z = 30;
    function animate() {
      requestAnimationFrame(animate);
      points.rotation.y += 0.0008;
      points.rotation.x += 0.0003;
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  } catch (e) { /* silent */ }
}

// === Service Worker ===
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  initBackground();
  renderTools();
  renderCTF();
  renderResources();
  renderCommands();
});
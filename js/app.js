// ===== GLOBAL VARIABLES =====
let bugBountyMarkmap = null;
let currentSoftwareFilter = 'all';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  renderLinuxTools();
  renderCategoryTabs();
  renderSoftwareGrid();
  initializeLaptopGuide();
  initializeBugBountyMap();
});

// ===== 1. IP WITH SECURITY FLAIR =====
fetch('https://api.ipify.org?format=json')
  .then(r => r.json())
  .then(d => { document.getElementById('user-ip').textContent = d.ip; })
  .catch(() => { 
    const ipElement = document.getElementById('user-ip');
    ipElement.textContent = "Protected Connection"; 
    ipElement.classList.replace('text-slate-400', 'text-emerald-400');
  });

// ===== 2. TYPEWRITER EFFECT =====
const txt = "Cyber Security Specialist";
let i = 0;
function typeWriter() { 
  if(i < txt.length) { 
    document.getElementById('typewriter').textContent += txt.charAt(i); 
    i++; 
    setTimeout(typeWriter, 100); 
  } 
}
window.addEventListener('load', typeWriter);

// ===== 3. COPY FUNCTION =====
window.copyCode = function(btn, code) { 
  navigator.clipboard.writeText(code).then(() => { 
    let old = btn.innerHTML; 
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'; 
    setTimeout(() => btn.innerHTML = old, 2000); 
  }); 
};

// ===== 4. BACKGROUND THREE.JS (OPTIMIZED) =====
const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!rm) {
  const sc = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const ren = new THREE.WebGLRenderer({antialias:true, alpha:true});

  ren.setSize(window.innerWidth, window.innerHeight); 
  document.getElementById("canvas-container").appendChild(ren.domElement);

  const sp = new THREE.Mesh(
    new THREE.IcosahedronGeometry(20, 1), 
    new THREE.MeshBasicMaterial({color:0x2563eb, wireframe:true, transparent:true, opacity:0.1})
  );
  sc.add(sp); 
  cam.position.z = 46;

  let animationId;
  let isAnimating = true;

  function animate() { 
    if (!isAnimating) return;
    animationId = requestAnimationFrame(animate); 
    sp.rotation.y += 0.001; 
    sp.rotation.x += 0.00045; 
    ren.render(sc, cam); 
  }
  animate();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      isAnimating = false;
      cancelAnimationFrame(animationId);
    } else {
      isAnimating = true;
      animate();
    }
  });

  window.addEventListener("resize", () => { 
    cam.aspect = window.innerWidth/window.innerHeight; 
    cam.updateProjectionMatrix(); 
    ren.setSize(window.innerWidth, window.innerHeight); 
  });
}

// ===== 5. TAB SYSTEM =====
window.openTab = function(e, id) {
  document.querySelectorAll(".nav-btn").forEach(b => { 
    b.classList.remove("active-tab"); 
    b.setAttribute("aria-selected","false"); 
  });
  document.querySelectorAll(".tab-content").forEach(p => p.classList.remove("active"));
  e.currentTarget.classList.add("active-tab"); 
  document.getElementById("panel-"+id).classList.add("active");

  if (id === 'bugbounty') {
    setTimeout(() => {
      initializeBugBountyMap();
      if (bugBountyMarkmap) bugBountyMarkmap.fit();
    }, 100);
  }

  if(!rm) window.scrollTo({top: 380, behavior: "smooth"});
};

// ===== 6. RENDER LINUX TOOLS =====
function renderLinuxTools() {
  const container = document.getElementById('tools-container');
  if (!container) return;

  container.innerHTML = linuxToolsData.map(tool => `
    <article class="glass p-7 md:p-8 rounded-3xl tool-card" ${tool.borderColor ? `style="border-right-color:${tool.borderColor};"` : ''}>
      <div class="flex items-start justify-between gap-4 mb-4">
        <h3 class="text-xl font-black ${tool.color} flex items-center gap-2"><i data-lucide="${tool.icon}" class="w-5 h-5"></i> ${tool.category}</h3>
        <span class="badge text-emerald-300 border-emerald-500/20 bg-emerald-500/10">${tool.badge}</span>
      </div>
      <div class="terminal mt-5 group relative">
        <div class="term-bar">
          <div class="flex gap-2"><span class="dot bg-red-500"></span><span class="dot bg-yellow-500"></span><span class="dot bg-green-500"></span></div>
          <button class="copy-btn opacity-0 group-hover:opacity-100" onclick="copyCode(this, \`${tool.commands}\`)">
            <i data-lucide="copy" class="w-4 h-4"></i>
          </button>
        </div>
        <div class="term-body">
          <code>${tool.commands.replace(/\n/g, '<br>')}</code>
        </div>
      </div>
    </article>
  `).join('');

  lucide.createIcons();
}

// ===== 7. TECH TOP FUNCTIONS =====
function renderCategoryTabs() {
  const tabsContainer = document.getElementById('categoryTabs');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = '<div class="category-tab active" onclick="filterSoftware(\'all\')">الكل</div>';

  softwareCategories.forEach(cat => {
    tabsContainer.innerHTML += `<div class="category-tab" onclick="filterSoftware('${cat.id}')">${cat.name}</div>`;
  });
}

function renderSoftwareGrid(filter = 'all', search = '') {
  const grid = document.getElementById('softwareGrid');
  if (!grid) return;

  let filtered = softwareList;

  if (filter !== 'all') {
    filtered = filtered.filter(sw => sw.category === filter);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(sw =>
      sw.name.toLowerCase().includes(searchLower) ||
      sw.nameAr.includes(search) ||
      sw.description.includes(search)
    );
  }

  document.getElementById('softwareCount').textContent = `عرض ${filtered.length} برنامج`;

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="col-span-full text-center py-12 text-slate-400">لا توجد نتائج</div>';
    return;
  }

  grid.innerHTML = filtered.map(sw => `
    <div class="software-card">
      <div class="software-icon">${sw.icon}</div>
      <div class="software-name">${sw.name}</div>
      <div class="software-name-ar">${sw.nameAr}</div>
      <div class="software-desc">${sw.description}</div>
      <div class="software-meta">
        <span class="software-badge">${sw.version}</span>
        ${sw.official ? '<span class="software-badge">رسمي</span>' : ''}
        ${sw.free ? '<span class="software-badge">مجاني</span>' : ''}
        <div class="software-rating">
          <i class="fas fa-star"></i>
          <span>${sw.rating}</span>
        </div>
      </div>
      <a href="${sw.url}" target="_blank" class="software-link">
        <span>تحميل</span>
        <i class="fas fa-external-link-alt"></i>
      </a>
    </div>
  `).join('');
}

window.filterSoftware = function(filter) {
  currentSoftwareFilter = filter;

  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  event.currentTarget.classList.add('active');

  const search = document.getElementById('softwareSearch').value;
  renderSoftwareGrid(filter, search);
};

window.copyAllLinks = function() {
  const links = softwareList.map(sw => `${sw.name} (${sw.nameAr}): ${sw.url}`).join('\n');
  navigator.clipboard.writeText(links).then(() => {
    alert('تم نسخ جميع الروابط!');
  });
};

document.getElementById('softwareSearch')?.addEventListener('input', function(e) {
  renderSoftwareGrid(currentSoftwareFilter, e.target.value);
});

// ===== 8. LAPTOP GUIDE FUNCTIONS =====
function initializeLaptopGuide() {
  const select = document.getElementById('usecase');
  if (!select) return;

  select.innerHTML = Object.keys(laptopData).map(key => 
    `<option value="${key}">${laptopData[key].title} (${laptopData[key].sub})</option>`
  ).join('');

  select.addEventListener('change', updateLaptopGuide);
  updateLaptopGuide();
}

function updateLaptopGuide() {
  const key = document.getElementById('usecase').value;
  const data = laptopData[key];

  document.getElementById('resultTitle').textContent = data.title;
  document.getElementById('resultSub').textContent = data.sub;

  document.getElementById('minSpecs').innerHTML = data.min.map(([k,v]) => 
    `<div class="spec-row"><div class="text-slate-400 font-bold">${k}</div><div class="text-slate-200 font-black">${v}</div></div>`
  ).join('');

  document.getElementById('recSpecs').innerHTML = data.rec.map(([k,v]) => 
    `<div class="spec-row"><div class="text-slate-400 font-bold">${k}</div><div class="text-slate-200 font-black">${v}</div></div>`
  ).join('');

  document.getElementById('realTips').innerHTML = data.tips.map(t => `<li>• ${t}</li>`).join('');
}

// ===== 9. BUG BOUNTY MAP FUNCTIONS =====
function initializeBugBountyMap() {
  if (bugBountyMarkmap) return;

  const { Transformer } = window.markmap;
  const transformer = new Transformer();
  const { root, features } = transformer.transform(bugBountyMarkdown);
  const { Markmap, loadCSS, loadJS } = window.markmap;

  if (features.styles) loadCSS(features.styles);
  if (features.scripts) loadJS(features.scripts, { getMarkmap: () => window.markmap });

  bugBountyMarkmap = Markmap.create('#mindmap', {
    autoFit: false,
    fitRatio: 0.9,
    duration: 500,
    nodeMinHeight: 30,
    spacingHorizontal: 100,
    spacingVertical: 25,
    paddingX: 15,
    color: (node) => {
      const depth = node.d || 0;
      const colors = ['#58a6ff', '#1f6feb', '#3fb950', '#f85149', '#d29922', '#a371f7'];
      return colors[depth] || colors[colors.length - 1];
    },
  }, root);

  enhanceBugBountyNodes();
  setupBugBountyControls();
}

function enhanceBugBountyNodes() {
  d3.selectAll('.markmap-foreign').each(function() {
    const node = d3.select(this);
    const text = node.text();
    const parent = node.node().parentNode;

    const depth = parent.getAttribute('data-depth') || 0;
    node.attr('data-depth', depth);

    if (text.includes('Recon') || text.includes('Amass') || text.includes('FFuF')) node.classed('recon', true);
    else if (text.includes('Attack') || text.includes('SQL') || text.includes('XSS')) node.classed('attack', true);
    else if (text.includes('Mobile') || text.includes('Android') || text.includes('iOS')) node.classed('mobile', true);
    else if (text.includes('Cloud') || text.includes('AWS') || text.includes('Azure')) node.classed('cloud', true);
    else if (text.includes('Scanner') || text.includes('Burp') || text.includes('ZAP')) node.classed('scanner', true);

    node.on('click', function(event) {
      event.stopPropagation();
      d3.selectAll('.markmap-foreign').classed('active', false);
      node.classed('active', true);
      showBugBountyTooltip(node, event);
    });

    node.on('mouseover', function(event) { showBugBountyTooltip(node, event); });
    node.on('mouseout', function() { hideBugBountyTooltip(); });
  });

  document.getElementById('nodeCount').textContent = d3.selectAll('.markmap-foreign').size();
}

const bugBountyTooltip = document.getElementById('tooltip');

function showBugBountyTooltip(node, event) {
  const text = node.text();
  const rect = node.node().getBoundingClientRect();

  let content = `<h4>${text}</h4>`;
  let category = '';

  if (text.includes('Recon')) category = 'الاستطلاع';
  else if (text.includes('Attack') || text.includes('SQL') || text.includes('XSS')) category = 'أداة هجوم';
  else if (text.includes('Mobile')) category = 'أمن الهواتف';
  else if (text.includes('Cloud')) category = 'أمن السحابة';
  else if (text.includes('Scanner') || text.includes('Burp')) category = 'ماسح/بروكسي';
  else if (text.includes('Report')) category = 'التوثيق';
  else if (text.includes('OS')) category = 'نظام تشغيل';

  let description = '';
  if (text.includes('Amass')) description = 'أداة متقدمة لرسم خريطة سطح الهجوم واكتشاف الأصول';
  else if (text.includes('SQLMap')) description = 'أداة آلية لحقن SQL والسيطرة على قواعد البيانات';
  else if (text.includes('FFuF')) description = 'أداة فحص سريعة للويب لاكتشاف المجلدات والمعلمات';
  else if (text.includes('Burp')) description = 'المعيار الصناعي لفحص الثغرات والبروكسي';
  else if (text.includes('Nuclei')) description = 'ماسح سريع ومخصص للثغرات';
  else if (text.includes('MobSF')) description = 'إطار عمل لاختبار أمن التطبيقات المحمولة';

  if (description) content += `<p>${description}</p>`;
  if (category) content += `<div class="category">${category}</div>`;

  bugBountyTooltip.innerHTML = content;
  bugBountyTooltip.style.opacity = '1';
  bugBountyTooltip.style.left = (rect.left + rect.width + 10) + 'px';
  bugBountyTooltip.style.top = (rect.top) + 'px';
}

function hideBugBountyTooltip() {
  bugBountyTooltip.style.opacity = '0';
}

function setupBugBountyControls() {
  document.getElementById('zoomIn')?.addEventListener('click', () => {
    if (bugBountyMarkmap) { bugBountyMarkmap.fit(); bugBountyMarkmap.zoom(1.2); }
  });

  document.getElementById('zoomOut')?.addEventListener('click', () => {
    if (bugBountyMarkmap) { bugBountyMarkmap.fit(); bugBountyMarkmap.zoom(0.8); }
  });

  document.getElementById('resetView')?.addEventListener('click', () => {
    if (bugBountyMarkmap) bugBountyMarkmap.fit();
  });

  document.getElementById('searchInput')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    d3.selectAll('.markmap-foreign').each(function() {
      const node = d3.select(this);
      const text = node.text().toLowerCase();

      if (searchTerm && text.includes(searchTerm)) {
        node.classed('bugbounty-pulse', true);
        node.style('filter', 'brightness(1.3)');
      } else {
        node.classed('bugbounty-pulse', false);
        node.style('filter', 'brightness(1)');
      }
    });
  });
}

// ===== KEYBOARD SHORTCUTS FOR BUG BOUNTY =====
document.addEventListener('keydown', (e) => {
  if (document.getElementById('panel-bugbounty')?.classList.contains('active')) {
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      document.getElementById('searchInput')?.focus();
    }
    if (e.key === 'Escape') {
      document.getElementById('searchInput').value = '';
      document.getElementById('searchInput')?.dispatchEvent(new Event('input'));
      document.getElementById('searchInput')?.blur();
    }
    if (e.key === '+' || e.key === '=') {
      if (bugBountyMarkmap) bugBountyMarkmap.zoom(1.2);
    }
    if (e.key === '-' || e.key === '_') {
      if (bugBountyMarkmap) bugBountyMarkmap.zoom(0.8);
    }
    if (e.key === '0') {
      if (bugBountyMarkmap) bugBountyMarkmap.fit();
    }
  }
});

window.addEventListener('resize', () => {
  if (bugBountyMarkmap && document.getElementById('panel-bugbounty')?.classList.contains('active')) {
    bugBountyMarkmap.fit();
  }
});

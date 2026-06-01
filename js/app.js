// =============================================
// CYBERSECURITY PORTFOLIO - APP.JS
// Interactive Features & Rendering
// =============================================

// Global State
let currentToolFilter = 'all';
let currentPathId = null;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeIcons();
  initializeThreeJS();
  initializeStats();
  initializeLearningPaths();
  initializeTools();
  initializeCTF();
  initializeResources();
  initializeCommands();
  initializeScrollAnimations();
  initializeSmoothScroll();
});

// Initialize Lucide Icons
function initializeIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// ===== THREE.JS BACKGROUND =====
function initializeThreeJS() {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (rm) return;

  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create Matrix-style particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.6
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add a central glowing sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    camera.position.z = 3;

    // Animation
    let animationId;
    let isAnimating = true;

    function animate() {
      if (!isAnimating) return;
      animationId = requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      sphere.rotation.y += 0.002;
      sphere.rotation.x += 0.001;

      renderer.render(scene, camera);
    }
    animate();

    // Handle visibility
    document.addEventListener("visibilitychange", () => {
      isAnimating = document.hidden ? false : true;
      if (!document.hidden) animate();
    });

    // Handle resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  } catch (e) {
    console.log('Three.js not available');
  }
}

// ===== ANIMATE STATS COUNTER =====
function initializeStats() {
  const targets = {
    tools: platformStats.tools,
    paths: platformStats.paths,
    challenges: platformStats.challenges
  };

  Object.keys(targets).forEach(key => {
    animateCounter(`stat${key.charAt(0).toUpperCase() + key.slice(1)}`, targets[key]);
  });
}

function animateCounter(elementId, target) {
  const element = document.getElementById(elementId);
  if (!element) return;

  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 30);
}

// ===== LEARNING PATHS =====
function initializeLearningPaths() {
  const grid = document.getElementById('pathsGrid');
  if (!grid) return;

  grid.innerHTML = learningPaths.map(path => `
    <div class="glass-card p-8 rounded-3xl path-card cursor-pointer" 
         style="--accent-color: ${path.color}"
         onclick="openPath('${path.id}')">
      <div class="path-icon" style="background: ${path.color}20; color: ${path.color}">
        ${path.icon}
      </div>
      <span class="path-level" style="background: ${path.color}20; color: ${path.color}">
        ${path.level}
      </span>
      <h3 class="text-xl font-black mt-4 mb-3">${path.title}</h3>
      <p class="text-slate-400 text-sm mb-6 leading-relaxed">${path.description}</p>
      
      <div class="space-y-3">
        ${path.topics.map(topic => `
          <div class="flex items-start gap-3">
            <span class="text-lg">${topic.icon}</span>
            <div>
              <div class="font-bold text-sm">${topic.title}</div>
              <div class="text-xs text-slate-500">${topic.items.length} موضوع</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
        <span class="text-xs text-slate-500">
          <i data-lucide="clock" class="w-4 h-4 inline-block ml-1"></i>
          ${path.duration}
        </span>
        <span class="text-cyan-400 text-sm font-bold flex items-center gap-1">
          ابدأ الآن
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
        </span>
      </div>
    </div>
  `).join('');

  initializeIcons();
}

function openPath(pathId) {
  const path = learningPaths.find(p => p.id === pathId);
  if (!path) return;

  // Scroll to first topic detail (expandable in future)
  const toolsSection = document.getElementById('tools');
  if (toolsSection) {
    toolsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// ===== TOOLS LIBRARY =====
function initializeTools() {
  renderToolTabs();
  renderTools();
  setupToolSearch();
}

function renderToolTabs() {
  const tabsContainer = document.getElementById('toolsTabs');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = toolCategories.map(cat => `
    <button class="tool-category-tab ${cat.id === 'all' ? 'active' : ''}"
            onclick="filterTools('${cat.id}')"
            style="${cat.color ? `--tab-color: ${cat.color}` : ''}">
      <span class="ml-1">${cat.icon}</span>
      ${cat.name}
    </button>
  `).join('');
}

function renderTools(filter = 'all', search = '') {
  const grid = document.getElementById('toolsGrid');
  if (!grid) return;

  let filtered = tools;

  if (filter !== 'all') {
    filtered = filtered.filter(t => t.category === filter);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(searchLower) ||
      t.nameAr.includes(search) ||
      t.description.includes(search)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <p class="text-slate-400">لم نجد أي أداة بهذه المواصفات</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(tool => `
    <div class="glass-card p-6 rounded-2xl tool-card" style="--tool-color: ${tool.color}">
      <div class="tool-icon" style="background: ${tool.color}20; color: ${tool.color}">
        ${tool.icon}
      </div>
      <h3 class="text-lg font-black mb-1">${tool.name}</h3>
      <p class="text-cyan-400 text-sm mb-3">${tool.nameAr}</p>
      <p class="text-slate-400 text-sm mb-4 leading-relaxed">${tool.description}</p>

      <div class="flex flex-wrap gap-2 mb-4">
        <span class="badge badge-official">
          <i data-lucide="tag" class="w-3 h-3"></i>
          v${tool.version}
        </span>
        ${tool.free ? '<span class="badge badge-free"><i data-lucide="gift" class="w-3 h-3"></i>مجاني</span>' : ''}
      </div>

      <div class="bg-black/30 rounded-xl p-3 mb-4 font-mono text-xs text-slate-400">
        ${tool.commands.split('\n').slice(0, 2).join('<br>')}
      </div>

      <a href="${tool.url}" target="_blank" class="tool-link" style="--tool-color: ${tool.color}">
        <span>زيارة الموقع</span>
        <i data-lucide="external-link" class="w-4 h-4"></i>
      </a>
    </div>
  `).join('');

  initializeIcons();
}

function filterTools(category) {
  currentToolFilter = category;
  const searchInput = document.getElementById('toolsSearch');
  renderTools(category, searchInput?.value || '');

  // Update active tab
  document.querySelectorAll('.tool-category-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  event.currentTarget.classList.add('active');
}

function setupToolSearch() {
  const searchInput = document.getElementById('toolsSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    renderTools(currentToolFilter, e.target.value);
  });
}

// ===== CTF SECTION =====
function initializeCTF() {
  const grid = document.getElementById('ctfGrid');
  if (!grid) return;

  grid.innerHTML = ctfPlatforms.map(platform => `
    <a href="${platform.url}" target="_blank" 
       class="glass-card p-6 rounded-2xl ctf-card block"
       style="--difficulty-color: ${platform.color}">
      <div class="flex items-start justify-between mb-4">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
             style="background: ${platform.color}20">
          ${platform.icon}
        </div>
        <span class="difficulty-badge difficulty-${platform.difficulty}">
          ${platform.difficulty === 'easy' ? 'سهل' : platform.difficulty === 'medium' ? 'متوسط' : 'صعب'}
        </span>
      </div>

      <h3 class="text-xl font-black mb-1">${platform.name}</h3>
      <p class="text-slate-400 text-sm mb-1">${platform.nameAr}</p>
      <p class="text-slate-500 text-sm mb-4">${platform.description}</p>

      <div class="flex items-center gap-4 text-xs text-slate-500 mb-4">
        <span>
          <i data-lucide="layers" class="w-4 h-4 inline-block ml-1"></i>
          ${platform.challenges}
        </span>
        <span>
          <i data-lucide="zap" class="w-4 h-4 inline-block ml-1"></i>
          ${platform.type}
        </span>
      </div>

      <span class="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
            style="background: ${platform.color}20; color: ${platform.color}">
        <i data-lucide="external-link" class="w-4 h-4"></i>
        ابدأ الآن
      </span>
    </a>
  `).join('');

  initializeIcons();
}

// ===== RESOURCES SECTION =====
function initializeResources() {
  // YouTube
  const ytContainer = document.getElementById('youtubeResources');
  if (ytContainer) {
    ytContainer.innerHTML = youtubeChannels.map(ch => `
      <a href="${ch.url}" target="_blank" class="resource-link">
        <i class="fab fa-youtube text-red-500"></i>
        <div class="flex-1">
          <div class="font-bold text-sm">${ch.name}</div>
          <div class="text-xs text-slate-500">${ch.arabic}</div>
        </div>
        <i data-lucide="external-link" class="w-4 h-4 text-slate-500"></i>
      </a>
    `).join('');
  }

  // Courses
  const coursesContainer = document.getElementById('coursesResources');
  if (coursesContainer) {
    coursesContainer.innerHTML = courses.map(course => `
      <a href="${course.url}" target="_blank" class="resource-link">
        <i data-lucide="graduation-cap" class="text-cyan-400"></i>
        <div class="flex-1">
          <div class="font-bold text-sm">${course.title}</div>
          <div class="text-xs text-slate-500">${course.arabic}</div>
        </div>
        ${course.free ? '<span class="badge badge-free text-xs">مجاني</span>' : ''}
      </a>
    `).join('');
  }

  // Books
  const booksContainer = document.getElementById('booksResources');
  if (booksContainer) {
    booksContainer.innerHTML = books.map(book => `
      <a href="${book.url}" target="_blank" class="resource-link">
        <i data-lucide="book-open" class="text-amber-400"></i>
        <div class="flex-1">
          <div class="font-bold text-sm">${book.title}</div>
          <div class="text-xs text-slate-500">${book.author}</div>
        </div>
      </a>
    `).join('');
  }

  initializeIcons();
}

// ===== COMMANDS SECTION =====
function initializeCommands() {
  const grid = document.getElementById('commandsGrid');
  if (!grid) return;

  grid.innerHTML = linuxCommands.map(cmd => `
    <div class="glass-card p-6 rounded-2xl command-card" style="--cmd-color: ${cmd.color}">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-black flex items-center gap-2" style="color: ${cmd.color}">
          <span class="text-xl">${cmd.icon}</span>
          ${cmd.category}
        </h3>
        <span class="text-xs px-3 py-1 rounded-full" style="background: ${cmd.color}20; color: ${cmd.color}">
          ${cmd.badge}
        </span>
      </div>

      <div class="command-terminal">
        <div class="command-header">
          <div class="command-dots">
            <span class="command-dot" style="background: #ef4444"></span>
            <span class="command-dot" style="background: #eab308"></span>
            <span class="command-dot" style="background: #22c55e"></span>
          </div>
          <button class="copy-btn" onclick="copyCommands(this, \`${cmd.commands.replace(/`/g, '\\`')}\`)">
            <i data-lucide="copy" class="w-4 h-4 inline-block ml-1"></i>
            نسخ
          </button>
        </div>
        <div class="command-body">
          ${cmd.commands.replace(/\n/g, '<br>').replace(/\$/g, '<span style="color: #22d3ee">$</span>')}
        </div>
      </div>
    </div>
  `).join('');

  initializeIcons();
}

// ===== COPY FUNCTION =====
window.copyCommands = function(btn, commands) {
  navigator.clipboard.writeText(commands.replace(/<[^>]*>/g, '')).then(() => {
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="check" class="w-4 h-4 inline-block ml-1"></i> تم!';
    btn.style.background = '#22c55e';
    btn.style.color = '#0a0a0f';
    btn.style.borderColor = '#22c55e';
    initializeIcons();
    
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
      initializeIcons();
    }, 2000);
  });
};

// ===== SMOOTH SCROLL =====
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ===== MOBILE MENU =====
window.toggleMobileMenu = function() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('flex');
    menu.classList.toggle('hidden');
  }
};

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    if (window.scrollY > 100) {
      nav.classList.add('shadow-lg');
    } else {
      nav.classList.remove('shadow-lg');
    }
  }
});

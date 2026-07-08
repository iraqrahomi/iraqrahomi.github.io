// Articles loader for the homepage and blog page
// Fetches articles from data/articles.json and renders them as cards.

(async function () {
  const grid = document.getElementById('latestArticles') || document.getElementById('articlesGrid');
  if (!grid) return;

  try {
    const res = await fetch('../data/articles.json').catch(() => fetch('data/articles.json'));
    const articles = await res.json();

    // Detect current page location to build correct relative URLs
    const inPagesFolder = window.location.pathname.includes('/pages/');
    const urlPrefix = inPagesFolder ? '' : 'pages/';

    grid.innerHTML = articles.map(a => {
      const url = a.url ? (urlPrefix + a.url.replace(/^pages\//, '')) : '#';
      return `
      <article class="glass-card p-6 overflow-hidden hover:scale-105 transition" data-category="${a.category}" data-level="${a.level}">
        <div class="flex items-center gap-2 mb-3">
          <span class="chip">${a.level}</span>
          <span class="text-xs text-slate-500">${a.readingTime}</span>
        </div>
        <h3 class="text-xl font-black mb-3 leading-tight text-slate-900">${a.title}</h3>
        <p class="text-slate-600 text-sm leading-relaxed mb-4">${a.excerpt}</p>
        <div class="flex flex-wrap gap-1 mb-4">
          ${a.tags.slice(0, 3).map(t => `<span class="chip-soft text-xs">#${t}</span>`).join('')}
        </div>
        <div class="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
          <span><i class="fa-regular fa-calendar ml-1"></i>${a.date}</span>
          <a href="${url}" class="text-blue-600 font-bold hover:text-blue-700">اقرأ ←</a>
        </div>
      </article>
    `;
    }).join('');

    // Filtering
    const filters = document.querySelectorAll('#articleFilters .filter-btn');
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        document.querySelectorAll('#articlesGrid article').forEach(card => {
          card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
        });
      });
    });
  } catch (err) {
    grid.innerHTML = '<p class="text-slate-600 text-center col-span-full">تعذّر تحميل المقالات. حاول لاحقاً.</p>';
  }
})();
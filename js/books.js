// Books library page: render books from data/books.json with filtering & search
(async function () {
  const grid = document.getElementById('booksGrid');
  const statsGrid = document.getElementById('statsGrid');
  if (!grid) return;

  try {
    const res = await fetch('../data/books.json').catch(() => fetch('data/books.json'));
    const data = await res.json();

    // Category icon/color lookup
    const catMap = {};
    data.categories.forEach(c => catMap[c.id] = c);

    // Stats
    if (statsGrid) {
      statsGrid.innerHTML = `
        <div class="glass-card p-5 text-center">
          <div class="text-3xl font-black text-blue-600 mb-1">${data.books.length}</div>
          <div class="text-xs text-slate-500 uppercase tracking-wider">كتاب</div>
        </div>
        <div class="glass-card p-5 text-center">
          <div class="text-3xl font-black text-blue-700 mb-1">${data.categories.length}</div>
          <div class="text-xs text-slate-500 uppercase tracking-wider">فئة</div>
        </div>
        <div class="glass-card p-5 text-center">
          <div class="text-3xl font-black text-sky-600 mb-1">${data.stats.totalSize}</div>
          <div class="text-xs text-slate-500 uppercase tracking-wider">حجم إجمالي</div>
        </div>
        <div class="glass-card p-5 text-center">
          <div class="text-3xl font-black text-blue-600 mb-1">مجاني</div>
          <div class="text-xs text-slate-500 uppercase tracking-wider">100%</div>
        </div>
      `;
    }

    const colorClasses = {
      red: 'border-red-500',
      blue: 'border-blue-500',
      emerald: 'border-emerald-500',
      yellow: 'border-yellow-500',
      purple: 'border-purple-500',
      slate: 'border-slate-500',
      cyan: 'border-cyan-500',
      indigo: 'border-indigo-500',
      orange: 'border-orange-500',
      amber: 'border-amber-500',
      pink: 'border-pink-500'
    };
    const chipColor = {
      red: 'bg-red-50 text-red-700',
      blue: 'bg-blue-50 text-blue-700',
      emerald: 'bg-emerald-50 text-emerald-700',
      yellow: 'bg-yellow-50 text-yellow-700',
      purple: 'bg-purple-50 text-purple-700',
      slate: 'bg-slate-100 text-slate-700',
      cyan: 'bg-cyan-50 text-cyan-700',
      indigo: 'bg-indigo-50 text-indigo-700',
      orange: 'bg-orange-50 text-orange-700',
      amber: 'bg-amber-50 text-amber-700',
      pink: 'bg-pink-50 text-pink-700'
    };

    const render = (filter, search) => {
      grid.innerHTML = data.books.filter(b => {
        const matchCat = filter === 'all' || b.category === filter;
        const matchSearch = !search ||
          (b.title + ' ' + (b.description || '') + ' ' + (b.tags || []).join(' ')).toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
      }).map(b => {
        const cat = catMap[b.category] || { title: b.category, icon: 'fa-book', color: 'blue' };
        const borderClass = colorClasses[cat.color] || 'border-blue-500';
        const chipCls = chipColor[cat.color] || 'bg-blue-50 text-blue-700';
        return `
        <article class="glass-card p-6 border-r-4 ${borderClass}" data-category="${b.category}">
          <div class="flex items-start justify-between mb-3">
            <span class="chip ${chipCls}">${cat.title}</span>
            <span class="chip-soft">${b.level}</span>
          </div>
          <h3 class="text-lg font-black mb-2 text-slate-900 leading-tight">${b.title}</h3>
          <p class="text-sm text-slate-600 leading-relaxed mb-4">${b.description || ''}</p>
          <div class="flex flex-wrap gap-1 mb-4">
            ${(b.tags || []).slice(0, 3).map(t => `<span class="chip-soft text-xs">#${t}</span>`).join('')}
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-slate-100">
            <span class="text-xs text-slate-500">
              <i class="fa-solid fa-file-pdf text-red-500 ml-1"></i>${b.language || 'English'}
            </span>
            <div class="flex gap-3">
              ${b.summaryUrl ? `<a href="${b.summaryUrl}" class="text-blue-700 font-bold hover:text-blue-800 text-sm"><i class="fa-solid fa-book-open ml-1"></i>اقرأ الملخص</a>` : ''}
              <span class="text-xs text-slate-400"><i class="fa-solid fa-archive ml-1"></i>متاح قريباً</span>
            </div>
          </div>
        </article>
      `}).join('');

      if (!grid.innerHTML) {
        grid.innerHTML = '<p class="text-slate-500 col-span-full text-center py-12">لا توجد كتب مطابقة للبحث.</p>';
      }
    };
    render('all', '');

    // Filters
    document.querySelectorAll('#categoryFilters .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#categoryFilters .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render(btn.dataset.category, document.getElementById('bookSearch')?.value || '');
      });
    });
    document.getElementById('bookSearch')?.addEventListener('input', (e) => {
      const active = document.querySelector('#categoryFilters .filter-btn.active')?.dataset.category || 'all';
      render(active, e.target.value);
    });
  } catch (err) {
    grid.innerHTML = '<p class="text-slate-600 col-span-full text-center">تعذّر تحميل الكتب. حاول لاحقاً.</p>';
  }
})();
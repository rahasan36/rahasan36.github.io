// Dual-filter publication system: theme × status, with live counts
  const themeBtns = document.querySelectorAll('[data-filter-group="theme"] button');
  const statusBtns = document.querySelectorAll('[data-filter-group="status"] button');
  const pubItems = document.querySelectorAll('.pub-item');

  let activeTheme = 'all';
  let activeStatus = 'all';

  // Test whether an item passes a given (theme, status) combo
  function itemMatches(item, theme, status) {
    const tags = item.dataset.tags || '';
    const itemStatus = item.dataset.status || '';
    const themeOk = (theme === 'all') || tags.split(' ').includes(theme);
    const statusOk = (status === 'all') || itemStatus === status;
    return themeOk && statusOk;
  }

  // Apply the current filters and update the count badges
  function applyFilters() {
    pubItems.forEach(item => {
      item.style.display = itemMatches(item, activeTheme, activeStatus) ? '' : 'none';
    });

    // Update theme button counts (counted against the currently active status)
    themeBtns.forEach(btn => {
      const f = btn.dataset.filter;
      let n = 0;
      pubItems.forEach(item => { if (itemMatches(item, f, activeStatus)) n++; });
      btn.querySelector('.count').textContent = n;
    });

    // Update status button counts (counted against the currently active theme)
    statusBtns.forEach(btn => {
      const f = btn.dataset.filter;
      let n = 0;
      pubItems.forEach(item => { if (itemMatches(item, activeTheme, f)) n++; });
      btn.querySelector('.count').textContent = n;
    });
  }

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTheme = btn.dataset.filter;
      applyFilters();
    });
  });

  statusBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      statusBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeStatus = btn.dataset.filter;
      applyFilters();
    });
  });

  // Initialize counts on first paint
  applyFilters();

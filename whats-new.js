/* ====================================================
   WHAT'S NEW
   ----------------------------------------------------
   Shows three announcements at a time, and only the first
   nine cards in the HTML (three pages). Add a new card at
   the top and the oldest one beyond nine drops out of view
   on its own; delete it from the HTML when convenient.

   Pages rotate, with a one-inch bar below split evenly
   among the pages for jumping between them. Rotation pauses on hover and on keyboard focus,
   and is disabled under prefers-reduced-motion.
   ==================================================== */
(function () {
  var grid = document.querySelector('[data-news]');
  if (!grid) return;

  var MAX = 9;
  var all = Array.prototype.slice.call(grid.children);
  all.slice(MAX).forEach(function (c) { c.hidden = true; });
  var cards = all.slice(0, MAX);
  var PER = 3;
  var pages = Math.ceil(cards.length / PER);
  if (pages < 2) return;                       // three or fewer: nothing to rotate

  var page = 0, timer = null, paused = false;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var dots = document.createElement('div');
  dots.className = 'news-dots';
  dots.setAttribute('role', 'tablist');
  dots.setAttribute('aria-label', 'Announcement pages');
  for (var i = 0; i < pages; i++) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Show announcements ' + (i * PER + 1) + '–' + Math.min((i + 1) * PER, cards.length));
    b.dataset.page = i;
    b.addEventListener('click', function () { go(+this.dataset.page); restart(); });
    dots.appendChild(b);
  }
  grid.parentNode.insertBefore(dots, grid.nextSibling);

  function go(p) {
    page = (p % pages + pages) % pages;
    cards.forEach(function (c, i) {
      var on = Math.floor(i / PER) === page;
      c.hidden = !on;
    });
    Array.prototype.forEach.call(dots.children, function (d, i) {
      d.classList.toggle('is-active', i === page);
      d.setAttribute('aria-selected', i === page ? 'true' : 'false');
    });
  }

  function restart() {
    clearInterval(timer);
    if (reduce) return;
    timer = setInterval(function () { if (!paused) go(page + 1); }, 7000);
  }

  ['mouseenter', 'focusin'].forEach(function (e) {
    grid.addEventListener(e, function () { paused = true; });
  });
  ['mouseleave', 'focusout'].forEach(function (e) {
    grid.addEventListener(e, function () { paused = false; });
  });

  go(0);
  restart();
})();

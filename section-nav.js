/* ====================================================
   SECTION RAIL
   ----------------------------------------------------
   Drives the fixed right-hand page navigation on any
   page that has a <nav class="section-nav">. Each link
   carries data-target="<element id>".

   Highlights whichever target occupies the most of the
   viewport, and smooth-scrolls on click. Degrades to a
   plain anchor list if IntersectionObserver is missing.
   ==================================================== */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.section-nav a'));
  if (!links.length) return;

  var targets = [];
  links.forEach(function (link) {
    var el = document.getElementById(link.dataset.target);
    if (el) targets.push(el);
  });
  if (!targets.length) return;

  function setActive(id) {
    links.forEach(function (l) { l.classList.toggle('active', l.dataset.target === id); });
  }

  if ('IntersectionObserver' in window) {
    var ratios = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        ratios[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0;
      });
      var best = null, bestRatio = 0;
      Object.keys(ratios).forEach(function (id) {
        if (ratios[id] > bestRatio) { bestRatio = ratios[id]; best = id; }
      });
      if (best) setActive(best);
    }, { threshold: [0, 0.15, 0.35, 0.6, 0.9], rootMargin: '-90px 0px -35% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (ev) {
      var el = document.getElementById(link.dataset.target);
      if (!el) return;
      ev.preventDefault();
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      setActive(link.dataset.target);
      history.replaceState(null, '', '#' + link.dataset.target);
    });
  });
})();

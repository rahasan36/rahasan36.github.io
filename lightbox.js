/* ====================================================
   LIGHTBOX
   ----------------------------------------------------
   Click any photo in a travel album or research theme
   to open it full size on a dimmed backdrop.

   Close:    the close button, Esc, or a backdrop tap
             (clicking the image itself does nothing, so
             you cannot dismiss it while looking at it)
   Navigate: left/right arrow keys, or the chevrons.
             Wraps within the group the photo came from.
   ==================================================== */
(function () {
  var GROUP_SELECTOR = '.trip-gallery, .theme-figures';

  var groups = [];
  Array.prototype.forEach.call(document.querySelectorAll(GROUP_SELECTOR), function (container) {
    var items = [];
    Array.prototype.forEach.call(container.querySelectorAll('figure'), function (fig) {
      var img = fig.querySelector('img');
      if (!img) return;                       // placeholder tiles have no image
      var cap = fig.querySelector('figcaption');
      items.push({
        fig: fig,
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt') || '',
        caption: cap ? cap.innerHTML : ''
      });
    });
    if (items.length) groups.push(items);
  });
  if (!groups.length) return;

  // ---- overlay, built once ----
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image viewer');
  overlay.hidden = true;
  overlay.innerHTML =
    '<button class="lb-btn lb-close" type="button" aria-label="Close viewer">&#10005;</button>' +
    '<button class="lb-btn lb-prev" type="button" aria-label="Previous image">&#8249;</button>' +
    '<figure class="lb-stage">' +
      '<img alt="" />' +
      '<figcaption></figcaption>' +
      '<div class="lb-count" aria-live="polite"></div>' +
    '</figure>' +
    '<button class="lb-btn lb-next" type="button" aria-label="Next image">&#8250;</button>';
  document.body.appendChild(overlay);

  var stageImg = overlay.querySelector('.lb-stage img');
  var stageCap = overlay.querySelector('.lb-stage figcaption');
  var stageNum = overlay.querySelector('.lb-count');
  var btnClose = overlay.querySelector('.lb-close');
  var btnPrev  = overlay.querySelector('.lb-prev');
  var btnNext  = overlay.querySelector('.lb-next');

  var current = null;   // { items, index }
  var lastFocused = null;

  function show(items, index) {
    var n = items.length;
    index = (index % n + n) % n;             // wrap both directions
    var item = items[index];
    current = { items: items, index: index };
    stageImg.src = item.src;
    stageImg.alt = item.alt;
    stageCap.innerHTML = item.caption;
    stageCap.style.display = item.caption ? '' : 'none';
    stageNum.textContent = n > 1 ? (index + 1) + ' / ' + n : '';
    var many = n > 1;
    btnPrev.style.display = many ? '' : 'none';
    btnNext.style.display = many ? '' : 'none';
  }

  function open(items, index) {
    lastFocused = document.activeElement;
    show(items, index);
    overlay.hidden = false;
    document.documentElement.classList.add('lb-open');
    btnClose.focus();
  }

  function close() {
    overlay.hidden = true;
    document.documentElement.classList.remove('lb-open');
    stageImg.removeAttribute('src');
    current = null;
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function step(delta) {
    if (current) show(current.items, current.index + delta);
  }

  // ---- open handlers ----
  groups.forEach(function (items) {
    items.forEach(function (item, i) {
      item.fig.classList.add('is-zoomable');
      item.fig.tabIndex = 0;
      item.fig.setAttribute('role', 'button');
      item.fig.setAttribute('aria-label', 'Enlarge: ' + (item.alt || 'image'));
      item.fig.addEventListener('click', function () { open(items, i); });
      item.fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          open(items, i);
        }
      });
    });
  });

  // ---- close / navigate ----
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { step(-1); });
  btnNext.addEventListener('click', function () { step(1); });

  // a tap on the backdrop closes; a tap on the image or controls does not
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === overlay.querySelector('.lb-stage')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (overlay.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'Tab') {
      // keep focus inside the dialog
      var focusable = [btnClose, btnPrev, btnNext].filter(function (b) {
        return b.style.display !== 'none';
      });
      var i = focusable.indexOf(document.activeElement);
      e.preventDefault();
      var next = e.shiftKey ? i - 1 : i + 1;
      focusable[(next % focusable.length + focusable.length) % focusable.length].focus();
    }
  });
})();

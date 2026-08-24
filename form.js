/* ====================================================
   CONTACT FORM
   ----------------------------------------------------
   Submits to Formspree in the background so the visitor
   stays on the page, then shows a confirmation toast.

   Without JavaScript the form still works: the plain
   POST to the action URL is left untouched as a fallback.
   ==================================================== */
(function () {
  var forms = document.querySelectorAll('form.contact-form');
  if (!forms.length || !window.fetch) return;      // no fetch -> normal POST

  // ---- toast, built once ----
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.hidden = true;
  toast.innerHTML =
    '<span class="toast-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" width="22" height="22">' +
        '<path class="toast-check" d="M20 6.5L9.2 17.3 4 12.1" fill="none" stroke="currentColor" ' +
        'stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>' +
    '</span>' +
    '<span class="toast-body"><strong class="toast-title"></strong>' +
    '<span class="toast-text"></span></span>' +
    '<button class="toast-close" type="button" aria-label="Dismiss">&#10005;</button>';
  document.body.appendChild(toast);

  var elTitle = toast.querySelector('.toast-title');
  var elText  = toast.querySelector('.toast-text');
  var hideTimer = null;

  function show(kind, title, text, sticky) {
    clearTimeout(hideTimer);
    toast.classList.remove('is-error', 'is-visible');
    if (kind === 'error') toast.classList.add('is-error');
    elTitle.textContent = title;
    elText.textContent = text;
    toast.hidden = false;
    // reflow so the entry transition runs every time
    void toast.offsetWidth;
    toast.classList.add('is-visible');
    if (!sticky) hideTimer = setTimeout(hide, 6000);
  }

  function hide() {
    clearTimeout(hideTimer);
    toast.classList.remove('is-visible');
    setTimeout(function () { toast.hidden = true; }, 260);
  }

  toast.querySelector('.toast-close').addEventListener('click', hide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !toast.hidden) hide();
  });

  Array.prototype.forEach.call(forms, function (form) {
    var button = form.querySelector('button[type="submit"]');
    var original = button ? button.innerHTML : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (button) { button.disabled = true; button.innerHTML = 'Sending&hellip;'; }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          show('success', 'Message sent',
               'Thanks for writing. I usually reply within a day or two.');
        } else {
          return res.json().then(function (data) {
            var msg = (data && data.errors && data.errors.length)
              ? data.errors.map(function (x) { return x.message; }).join(', ')
              : 'Something went wrong sending that.';
            show('error', 'Not sent', msg + ' You can email rahasan@esri.com instead.', true);
          });
        }
      }).catch(function () {
        show('error', 'Not sent',
             'That did not go through — check your connection, or email rahasan@esri.com instead.', true);
      }).then(function () {
        if (button) { button.disabled = false; button.innerHTML = original; }
      });
    });
  });
})();

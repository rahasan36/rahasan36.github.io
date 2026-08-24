/* Cursor-following orb: feeds the pointer position to the CSS gradient. */
document.addEventListener('mousemove', function (e) {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});

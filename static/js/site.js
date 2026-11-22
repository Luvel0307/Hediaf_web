(function () {
  var nav = document.querySelector('.nav');
  var fab = document.querySelector('.fab');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  function onScroll() {
    var y = window.scrollY || 0;
    nav.classList.toggle('solid', y > 40);
    if (fab) fab.classList.toggle('show', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // menú móvil
  function closeMenu() {
    menu.classList.remove('open');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });

  // aparición al hacer scroll + barras animadas
  var items = document.querySelectorAll('.reveal, .bar');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // contadores
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var counters = document.querySelectorAll('[data-count]');
  function runCounter(el) {
    var end = parseInt(el.getAttribute('data-count'), 10);
    if (reduce) { el.textContent = end; return; }
    var t0 = null, dur = 1400;
    function tick(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  }

  // formulario -> mailto
  var form = document.getElementById('mailForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = 'Contacto HeDiaF - ' + (d.get('nombre') || '');
      var body = (d.get('msg') || '') + '\n\n— ' + (d.get('nombre') || '') +
        (d.get('inst') ? '\n' + d.get('inst') : '');
      window.location.href = 'mailto:' + window.HEDIAF_EMAIL +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();

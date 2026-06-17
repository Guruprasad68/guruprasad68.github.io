(function () {
  var KEY = 'theme';
  var root = document.documentElement;

  function current() {
    try { return localStorage.getItem(KEY) || 'auto'; } catch (e) { return 'auto'; }
  }

  function apply(mode) {
    if (mode === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', mode);
    }
    var btns = document.querySelectorAll('.theme-toggle button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', btns[i].dataset.theme === mode ? 'true' : 'false');
    }
  }

  apply(current());

  document.addEventListener('DOMContentLoaded', function () {
    apply(current());
    var btns = document.querySelectorAll('.theme-toggle button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (e) {
        var mode = e.currentTarget.dataset.theme;
        try { localStorage.setItem(KEY, mode); } catch (err) {}
        apply(mode);
      });
    }
  });
})();

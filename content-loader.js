(function () {
  var OVERRIDES_KEY = 'mb_site_content_overrides';

  function mergeIntoTranslations(list) {
    if (!window.translations || !list) return;
    list.forEach(function (item) {
      if (!item || !item.key) return;
      if (!window.translations[item.key]) window.translations[item.key] = {};
      if (item.en) window.translations[item.key].en = item.en;
      if (item.es) window.translations[item.key].es = item.es;
    });
  }

  function applyLocalDraft() {
    try {
      var ov = JSON.parse(localStorage.getItem(OVERRIDES_KEY) || '{}');
      if (!window.translations) window.translations = {};
      Object.keys(ov).forEach(function (key) {
        if (!window.translations[key]) window.translations[key] = {};
        Object.assign(window.translations[key], ov[key]);
      });
    } catch (e) {}
  }

  function refresh() {
    applyLocalDraft();
    if (!window.applyLang) {
      window.applyLang = function () {
        var lang = document.documentElement.lang || 'en';
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
          var key = el.getAttribute('data-i18n');
          if (window.translations && window.translations[key] && window.translations[key][lang])
            el.textContent = window.translations[key][lang];
        });
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
          var key = el.getAttribute('data-i18n-html');
          if (window.translations && window.translations[key] && window.translations[key][lang])
            el.innerHTML = window.translations[key][lang];
        });
      };
    }
    window.applyLang();
  }

  // Cargar desde data/content.js si existe, o fetch para sitios desplegados
  if (window.__content && window.__content.texts) {
    mergeIntoTranslations(window.__content.texts);
    refresh();
  } else if (window.location.protocol !== 'file:') {
    var baseUrl = function() {
      var scripts = document.getElementsByTagName('script');
      var src = scripts[scripts.length - 1].src;
      return src.substring(0, src.lastIndexOf('/') + 1);
    }();
    fetch(baseUrl + 'data/content.json', { cache: 'no-store' })
      .then(function (res) { return res.ok ? res.json() : {}; })
      .then(function (data) {
        mergeIntoTranslations(data && data.texts);
        refresh();
      })
      .catch(function () { refresh(); });
  } else {
    refresh();
  }
})();
(function () {
  var gallery = window.__gallery || {};
  var baseUrl = function() {
    var scripts = document.getElementsByTagName('script');
    var src = scripts[scripts.length - 1].src;
    return src.substring(0, src.lastIndexOf('/') + 1);
  }();
  function resolveSrc(path) {
    if (!path) return path;
    if (path.indexOf('://') !== -1 || path.indexOf('//') === 0) return path;
    if (path.indexOf('/') === 0) return baseUrl + path.slice(1);
    return baseUrl + path;
  }

  // Cargar datos actualizados desde gallery.json (lo que edita el /admin)
  function loadGalleryJson() {
    if (window.location.protocol === 'file:') return;
    fetch(baseUrl + 'data/gallery.json', { cache: 'no-store' })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (jsonData) {
        if (jsonData) {
          Object.keys(jsonData).forEach(function (key) {
            if (jsonData[key] && jsonData[key].src) {
              gallery[key] = jsonData[key];
              if (!jsonData[key + '-en'] || !jsonData[key + '-en'].src) {
                gallery[key + '-en'] = jsonData[key];
              }
              if (!jsonData[key + '-es'] || !jsonData[key + '-es'].src) {
                gallery[key + '-es'] = jsonData[key];
              }
            }
          });
        }
        renderGallery();
      })
      .catch(function () { renderGallery(); });
  }

  function renderGallery() {
  document.querySelectorAll('[data-media-slot]').forEach(function (slot) {
    var key = slot.getAttribute('data-media-slot');
    var item = gallery[key];
    if (!item || !item.src) return;

    if (slot.querySelector('.se-upload-label')) return;

    var existingVideo = slot.querySelector('video');

    var el;
    if (item.type === 'video') {
      if (existingVideo) {
        el = existingVideo;
        el.src = resolveSrc(item.src);
        el.muted = true;
        el.playsInline = true;
        el.loop = true;
        el.autoplay = true;
        el.style.width = '100%';
        el.style.height = '100%';
        el.style.objectFit = 'cover';
        el.play().catch(function () {});
        if (!slot.querySelector('.hero-video-btn')) {
          var btn2 = document.createElement('button');
          btn2.className = 'hero-video-btn';
          btn2.textContent = '🔇';
          btn2.title = 'Activar sonido';
          btn2.style.cssText = 'position:absolute;bottom:16px;right:16px;z-index:5;background:rgba(0,0,0,0.6);color:#fff;border:none;border-radius:50%;width:44px;height:44px;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;';
          btn2.addEventListener('click', function (e) {
            e.stopPropagation();
            el.muted = !el.muted;
            btn2.textContent = el.muted ? '🔇' : '🔊';
            btn2.title = el.muted ? 'Activar sonido' : 'Silenciar';
          });
          slot.appendChild(btn2);
        }
        return;
      }
      el = document.createElement('video');
      el.src = resolveSrc(item.src);
      el.muted = true;
      el.playsInline = true;
      el.loop = true;
      el.autoplay = true;
      el.style.width = '100%';
      el.style.height = '100%';
      el.style.objectFit = 'cover';
      el.controls = false;
      el.style.position = 'absolute';
      el.style.top = '0';
      el.style.left = '0';
      el.style.width = '100%';
      el.style.height = '100%';
      el.style.objectFit = 'cover';
      if (key === 'hero-main-en' || key === 'hero-main-es') {
        slot.style.background = '#13132a';
      }
      slot.innerHTML = '';
      slot.appendChild(el);
      el.play().catch(function () {});
      if (!slot.querySelector('.hero-video-btn')) {
        var btn = document.createElement('button');
        btn.className = 'hero-video-btn';
        btn.textContent = '🔇';
        btn.title = 'Activar sonido';
        btn.style.cssText = 'position:absolute;bottom:16px;right:16px;z-index:5;background:rgba(0,0,0,0.6);color:#fff;border:none;border-radius:50%;width:44px;height:44px;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;';
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          el.muted = !el.muted;
          btn.textContent = el.muted ? '🔇' : '🔊';
          btn.title = el.muted ? 'Activar sonido' : 'Silenciar';
        });
        slot.appendChild(btn);
      }
      return;
    } else {
      el = document.createElement('img');
      el.src = resolveSrc(item.src);
      el.alt = item.alt || '';
      el.loading = 'lazy';
      el.style.width = '100%';
      el.style.height = '100%';
      el.style.objectFit = 'cover';
    }
    slot.innerHTML = '';
    slot.appendChild(el);
  });

  function renderFlexGrid(containerId, items, type) {
    var container = document.getElementById(containerId);
    if (!container) return;
    if (!items || !items.length) {
      container.style.display = 'none';
      return;
    }
    container.innerHTML = '';
    items.forEach(function (item) {
      if (!item || !item.src) return;
      var card = document.createElement('div');
      card.className = 'gallery-item';
      var media;
      if (type === 'video') {
        media = document.createElement('video');
        media.src = resolveSrc(item.src);
        media.controls = true;
        media.muted = true;
        media.playsInline = true;
      } else {
        media = document.createElement('img');
        media.src = resolveSrc(item.src);
        media.alt = item.alt || '';
        media.loading = 'lazy';
      }
      media.style.width = '100%';
      media.style.height = '100%';
      media.style.objectFit = 'cover';
      card.appendChild(media);
      if (item.caption) {
        var cap = document.createElement('div');
        cap.className = 'gallery-caption';
        cap.textContent = item.caption;
        card.appendChild(cap);
      }
      container.appendChild(card);
    });
  }

  renderFlexGrid('gallery-photos-grid', gallery.gallery_photos, 'image');
  renderFlexGrid('gallery-videos-grid', gallery.gallery_videos, 'video');
  }

  renderGallery();
  loadGalleryJson();
})();
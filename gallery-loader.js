(function () {
  var gallery = window.__gallery || {};

  document.querySelectorAll('[data-media-slot]').forEach(function (slot) {
    var key = slot.getAttribute('data-media-slot');
    var item = gallery[key];
    if (!item || !item.src) return;

    if (slot.querySelector('.se-upload-label') || slot.querySelector('img, video')) return;

    var el;
    if (item.type === 'video') {
      el = document.createElement('video');
      el.src = item.src;
      el.muted = true;
      el.playsInline = true;
      el.loop = true;
      el.autoplay = true;
      el.style.width = '100%';
      el.style.height = '100%';
      el.style.objectFit = 'cover';
      if (key === 'hero-main') {
        el.controls = false;
        el.style.position = 'absolute';
        el.style.top = '0';
        el.style.left = '0';
        el.style.width = '100%';
        el.style.height = '100%';
        el.style.objectFit = 'cover';
        slot.style.background = '#13132a';
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
      }
    } else {
      el = document.createElement('img');
      el.src = item.src;
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
        media.src = item.src;
        media.controls = true;
        media.muted = true;
        media.playsInline = true;
      } else {
        media = document.createElement('img');
        media.src = item.src;
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
})();
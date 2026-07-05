(function () {
  var LS_PREFIX = 'mb_media_';

  function lsKey(k) { return LS_PREFIX + k; }

  function lsSave(key, value) {
    try { localStorage.setItem(lsKey(key), JSON.stringify(value)); return true; } catch(e) { return false; }
  }

  function lsGet(key) {
    try {
      var raw = localStorage.getItem(lsKey(key));
      return raw ? JSON.parse(raw) : null;
    } catch(e) { return null; }
  }

  function lsDelete(key) {
    try { localStorage.removeItem(lsKey(key)); } catch(e) {}
  }

  function blobToDataUrl(blob) {
    return new Promise(function (resolve) {
      if (typeof blob === 'string') return resolve(blob);
      var r = new FileReader();
      r.onload = function () { resolve(r.result); };
      r.readAsDataURL(blob);
    });
  }

  function renderInSlot(slot, item) {
    var isVideo = item.type && item.type.indexOf('video') === 0;
    var el = document.createElement(isVideo ? 'video' : 'img');
    if (isVideo) { el.controls = true; el.muted = true; el.playsInline = true; }
    if (item.dataUrl) {
      el.src = item.dataUrl;
    } else if (item.blob && typeof item.blob !== 'string') {
      el.src = URL.createObjectURL(item.blob);
    } else {
      el.src = item.src || '';
    }
    var posY = (item.posY === undefined) ? 50 : item.posY;
    el.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;' +
      'object-fit:cover;object-position:center ' + posY + '%;';
    el.setAttribute('data-pos-y', posY);
    slot.style.overflow = 'hidden';
    var old = slot.querySelector('img, video');
    if (old) old.remove();
    slot.insertBefore(el, slot.firstChild);
    var label = slot.querySelector('.se-upload-label');
    if (label) {
      var span = label.querySelector('span');
      if (span) span.textContent = '📷 Cambiar foto/video';
      label.style.cssText = 'position:absolute;bottom:8px;left:8px;right:8px;' +
        'text-align:center;background:#a855f7;color:#fff;font-size:11px;font-weight:700;' +
        'padding:8px 6px;border-radius:6px;cursor:pointer;z-index:20;' +
        'font-family:Inter,Arial,sans-serif;';
    }
  }

  function renderFlexCard(grid, item, group, index, editable) {
    var card = document.createElement('div');
    card.className = 'gallery-item local-preview-item';
    card.style.position = 'relative';
    var isVideo = item.type && item.type.indexOf('video') === 0;
    var el = document.createElement(isVideo ? 'video' : 'img');
    if (isVideo) { el.controls = true; el.muted = true; el.playsInline = true; }
    if (item.dataUrl) {
      el.src = item.dataUrl;
    } else if (item.blob && typeof item.blob !== 'string') {
      el.src = URL.createObjectURL(item.blob);
    } else {
      el.src = item.src || '';
    }
    el.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;' +
      'object-fit:cover;object-position:center;';
    card.appendChild(el);
    if (editable) {
      var delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'se-media-btn';
      delBtn.textContent = '🗑️';
      delBtn.title = 'Borrar solo esta foto/video';
      delBtn.style.cssText = 'display:none;position:absolute;bottom:8px;right:8px;z-index:20;' +
        'background:#ef4444;color:#fff;border:none;width:30px;height:30px;border-radius:6px;cursor:pointer;font-size:13px;';
      delBtn.onclick = function () {
        if (!confirm('¿Borrar esta foto/video de prueba?')) return;
        window.LocalMedia.removeFromFlexGroup(group, index).then(function () {
          renderFlexGroup(group, grid.id);
        });
      };
      card.appendChild(delBtn);
    }
    grid.appendChild(card);
  }

  function renderFlexGroup(group, gridId) {
    var grid = document.getElementById(gridId);
    if (!grid) return;
    var list = lsGet('flex:' + group);
    grid.querySelectorAll('.local-preview-item').forEach(function (el) { el.remove(); });
    if (!list || !list.length) return;
    grid.style.display = '';
    list.forEach(function (item, i) { renderFlexCard(grid, item, group, i, true); });
  }

  function applyAll() {
    document.querySelectorAll('[data-media-slot]').forEach(function (slot) {
      var key = 'slot:' + slot.getAttribute('data-media-slot');
      var item = lsGet(key);
      if (item) renderInSlot(slot, item);
    });
    [['gallery_photos', 'gallery-photos-grid'], ['gallery_videos', 'gallery-videos-grid']]
      .forEach(function (pair) { renderFlexGroup(pair[0], pair[1]); });
  }

  window.LocalMedia = {
    saveSlot: function (slotKey, file, posY) {
      var value = { type: file.type, posY: (posY === undefined ? 50 : posY) };
      return blobToDataUrl(file).then(function (dataUrl) {
        value.dataUrl = dataUrl;
        var ok = lsSave('slot:' + slotKey, value);
        if (!ok) alert('La foto es muy grande. Usa una imagen más pequeña (menos de 5MB).');
        return value;
      });
    },
    setSlotPosition: function (slotKey, posY) {
      var item = lsGet('slot:' + slotKey);
      if (!item) return Promise.resolve(null);
      item.posY = posY;
      lsSave('slot:' + slotKey, item);
      return Promise.resolve(item);
    },
    addToFlexGroup: function (group, file) {
      var item = { type: file.type };
      return blobToDataUrl(file).then(function (dataUrl) {
        item.dataUrl = dataUrl;
        var list = lsGet('flex:' + group) || [];
        list.push(item);
        lsSave('flex:' + group, list);
      });
    },
    removeFromFlexGroup: function (group, index) {
      var list = lsGet('flex:' + group) || [];
      list.splice(index, 1);
      lsSave('flex:' + group, list);
      return Promise.resolve();
    },
    renderFlexGroup: renderFlexGroup,
    clearSlot: function (slotKey) {
      lsDelete('slot:' + slotKey);
      return Promise.resolve();
    },
    clearAll: function () {
      for (var i = localStorage.length - 1; i >= 0; i--) {
        var k = localStorage.key(i);
        if (k.indexOf(LS_PREFIX) === 0) localStorage.removeItem(k);
      }
      return Promise.resolve();
    },
    applyAll: applyAll
  };

  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(applyAll, 300);
  });
})();
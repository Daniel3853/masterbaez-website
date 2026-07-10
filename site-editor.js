/**
 * site-editor.js
 * Botón "✏️ EDITAR" flotante, igual al de master-baez-sistema.html, pero
 * funcionando sobre el sitio real (index.html) en vez de un generador aparte.
 *
 * Cómo se usa:
 *  1) Ve al final de la página, en el footer verás un enlace "Admin".
 *  2) Haz clic en "Admin" y te pedirá la contraseña (por defecto: admin123).
 *  3) Clic en "✏️ EDITAR" (abajo a la derecha). Todos los textos del sitio
 *     quedan marcados con un borde morado punteado y se pueden editar
 *     haciendo clic directo sobre ellos, como en un documento de Word.
 *  3) "💾 Guardar" guarda el cambio en ESTE navegador (borrador, nadie más
 *     lo ve todavía).
 *  4) "⬇️ Descargar content.json" descarga el archivo actualizado con TODOS
 *     los textos (los de siempre + tus cambios). Ese archivo se sube a
 *     GitHub reemplazando /data/content.json (arrastra y suelta, igual que
 *     con las fotos — ver README-ADMIN.md). 1-2 minutos después el cambio
 *     se ve en el sitio para TODOS los visitantes.
 *  5) También puedes editar los mismos textos desde /admin sin tocar código.
 */
(function () {
  var OVERRIDES_KEY = 'mb_site_content_overrides';
  var EDITOR_PASSWORD = window.__ADMIN_PASSWORD || 'admin123';
  var authorized = false;
  var editMode = false;

  var adminLink = null;
  // Botón de acceso al editor
  function crearBotonAdmin() {
    adminLink = document.createElement('a');
    adminLink.href = '#';
    adminLink.textContent = '⚙ Admin';
    adminLink.title = 'Editar contenido del sitio';
    adminLink.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:99999999;' +
      'background:#fbbf24;color:#1a1a2e;' +
      'padding:6px 12px;border-radius:8px;font-size:12px;font-weight:700;' +
      'text-decoration:none;font-family:Inter,Arial,sans-serif;' +
      'border:none;' +
      'transition:all 0.3s;';
    adminLink.onmouseover = function() { adminLink.style.background = '#fcd34d'; adminLink.style.color = '#000'; };
    adminLink.onmouseout = function() { adminLink.style.background = '#fbbf24'; adminLink.style.color = '#1a1a2e'; };
    adminLink.onclick = function(e) {
      e.preventDefault();
      if (authorized) { toggleEditMode(); return; }
      var pwd = prompt('Ingresa la contraseña para editar el sitio:');
      if (pwd === EDITOR_PASSWORD) {
        authorized = true;
        buildUI();
        buildMediaPreviewButtons();
        addFlexGalleryButtons();
        toggleEditMode();
        adminLink.style.display = 'none';
      } else if (pwd !== null) {
        alert('Contraseña incorrecta.');
      }
    };
    document.body.appendChild(adminLink);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (!authorized) crearBotonAdmin();
    });
  } else {
    if (!authorized) crearBotonAdmin();
  }

  // Soporte para ?edit=1 como acceso directo
  var params = new URLSearchParams(window.location.search);
  if (params.get('edit') === '1') {
    var pwd = prompt('Ingresa la contraseña para editar el sitio:');
    if (pwd === EDITOR_PASSWORD) {
      authorized = true;
      buildUI();
      buildMediaPreviewButtons();
      addFlexGalleryButtons();
      toggleEditMode();
    } else if (pwd !== null) {
      alert('Contraseña incorrecta.');
    }
  }

  function getOverrides() {
    try { return JSON.parse(localStorage.getItem(OVERRIDES_KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function setOverrides(ov) {
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(ov));
  }

  function buildUI() {
    var btn = document.createElement('button');
    btn.id = 'se-toggle';
    btn.textContent = '✏️ EDITAR';
    btn.title = 'Haz clic para editar textos, fotos y videos del sitio';
    btn.style.cssText = 'position:fixed;bottom:22px;right:22px;z-index:999999;' +
      'background:#a855f7;color:#fff;border:none;padding:14px 22px;border-radius:30px;' +
      'font-weight:800;font-size:14px;cursor:pointer;box-shadow:0 6px 24px rgba(168,85,247,.55);' +
      'font-family:Inter,Arial,sans-serif;' +
      'transition:transform 0.2s, box-shadow 0.2s;';
    btn.onmouseover = function() { btn.style.transform = 'scale(1.05)'; btn.style.boxShadow = '0 8px 28px rgba(168,85,247,0.7)'; };
    btn.onmouseout = function() { btn.style.transform = ''; btn.style.boxShadow = ''; };
    document.body.appendChild(btn);

    var bar = document.createElement('div');
    bar.id = 'se-bar';
    bar.style.cssText = 'display:none;position:fixed;left:0;right:0;bottom:0;z-index:999998;' +
      'background:#12121c;border-top:2px solid #a855f7;padding:14px 18px;' +
      'align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;' +
      'font-family:Inter,Arial,sans-serif;';
    bar.innerHTML =
      '<span style="color:#fff;font-size:13px;margin-right:auto;">🖊️ Modo edición — haz clic en textos marcados. Sube fotos/videos con 📷.</span>' +
      '<button id="se-save" style="background:#22c55e;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer;">💾 Guardar borrador</button>' +
      '<button id="se-download" style="background:#3b82f6;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer;">⬇️ Descargar content.json</button>' +
      '<button id="se-reset" style="background:#ef4444;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer;">↩️ Deshacer cambios</button>' +
      '<button id="se-reset-media" style="background:#f97316;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer;">🗑️ Borrar fotos/videos</button>' +
      '<button id="se-config" style="background:#6c5ce7;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer;">⚙️ Configurar Programas</button>' +
      '<button id="se-copy-html" style="background:#a855f7;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer;">📋 Copiar HTML del blog</button>';
    document.body.appendChild(bar);

    btn.onclick = toggleEditMode;
    document.getElementById('se-save').onclick = saveDraft;
    document.getElementById('se-download').onclick = downloadContentJson;
    document.getElementById('se-reset').onclick = resetDraft;
    document.getElementById('se-reset-media').onclick = resetMediaPreview;
    document.getElementById('se-config').onclick = openProgramConfig;
    document.getElementById('se-copy-html').onclick = copyBlogHTML;
  }

  var BLOG_OVERRIDES_KEY = 'mb_blog_overrides';

  document.addEventListener('click', function (e) {
    var card = e.target.closest('.blog-card');
    if (card && editMode) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }, true);

  function editableEls() {
    var els = Array.from(document.querySelectorAll('[data-i18n], [data-i18n-html]'));
    var article = document.querySelector('article.article-content');
    if (article) {
      article.querySelectorAll('h1, h2, h3, p, li, blockquote, .highlight-box, .article-meta span, .tag, .date, .featured, .category').forEach(function (el) {
        els.push(el);
      });
    }
    return els;
  }

  function toggleEditMode() {
    if (editMode) {
      // Exit → quitar editor y mostrar botón amarillo ⚙ Admin
      editMode = false;
      var toggleBtn = document.getElementById('se-toggle');
      if (toggleBtn) toggleBtn.remove();
      var bar = document.getElementById('se-bar');
      if (bar) bar.remove();
      if (adminLink) adminLink.style.display = '';
      return;
    }
    editMode = true;
    document.getElementById('se-bar').style.display = 'flex';
    document.getElementById('se-toggle').textContent = '✅ SALIR';
    editableEls().forEach(function (el) {
      el.contentEditable = 'true';
      el.style.outline = '2px dashed #a855f7';
      el.style.cursor = 'text';
    });
  }

  function saveDraft() {
    var ov = getOverrides();
    var lang = document.documentElement.lang || 'en';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!ov[key]) ov[key] = {};
      ov[key][lang] = el.textContent.trim();
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (!ov[key]) ov[key] = {};
      ov[key][lang] = el.innerHTML.trim();
    });
    setOverrides(ov);
    // Also save blog article content
    var article = document.querySelector('article.article-content');
    if (article) {
      var blogOv = {};
      try { blogOv = JSON.parse(localStorage.getItem(BLOG_OVERRIDES_KEY) || '{}'); } catch (e) {}
      blogOv[window.location.pathname] = article.innerHTML;
      localStorage.setItem(BLOG_OVERRIDES_KEY, JSON.stringify(blogOv));
    }
    alert('✅ Guardado en este navegador. Ahora descarga "content.json" y súbelo a GitHub (carpeta /data) para que el cambio se vea en todo el sitio.');
  }

  function downloadContentJson() {
    var merged = window.translations || {};
    var texts = Object.keys(merged).map(function (key) {
      return { key: key, en: merged[key].en || '', es: merged[key].es || '' };
    });
    var blob = new Blob([JSON.stringify({ texts: texts }, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'content.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function resetDraft() {
    if (!confirm('¿Borrar los cambios de texto sin publicar guardados en este navegador?')) return;
    localStorage.removeItem(OVERRIDES_KEY);
    localStorage.removeItem(BLOG_OVERRIDES_KEY);
    location.reload();
  }

  function resetMediaPreview() {
    if (!confirm('¿Borrar todas las fotos/videos de prueba guardados en este navegador?')) return;
    if (window.LocalMedia) {
      window.LocalMedia.clearAll().then(function () { location.reload(); });
    } else {
      location.reload();
    }
  }

  function openProgramConfig() {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Inter,Arial,sans-serif;';
    var panel = document.createElement('div');
    panel.style.cssText = 'background:#1a1a2e;border-radius:24px;max-width:600px;width:100%;max-height:90vh;overflow-y:auto;padding:32px;color:#e0e0f0;border:1px solid #3a3a50;';
    var keys = ['tiny_tigers', 'kids', 'adults', 'after_school'];
    var names = ['Tiny Tigers (4-6)', 'Kids Martial Arts (7-12)', 'Adult Fitness (13+)', 'After School (6-12)'];
    var html = '<h2 style="font-size:22px;font-weight:800;margin-bottom:4px;">⚙️ Configurar Programas</h2>' +
      '<p style="font-size:14px;color:#8a8aaa;margin-bottom:20px;">Completa las URLs para cada programa. Se guardan en este navegador como borrador.</p>';
    var cfg = window.PROGRAM_LINKS || {};
    keys.forEach(function (k, i) {
      var v = cfg[k] || {};
      html += '<div style="background:#13132a;border-radius:16px;padding:20px;margin-bottom:16px;border:1px solid #2a2a40;">' +
        '<h3 style="font-size:16px;font-weight:700;margin-bottom:12px;color:#a855f7;">' + names[i] + '</h3>' +
        '<div class="form-group" style="margin-bottom:10px;"><label style="font-size:12px;font-weight:600;color:#8a8aaa;display:block;margin-bottom:4px;">🎬 Video URL</label>' +
        '<input id="se-cfg-' + k + '-video" value="' + (v.video || '') + '" placeholder="https://youtube.com/... o videos/programa.mp4" style="width:100%;padding:10px 14px;border:2px solid #3a3a50;border-radius:10px;font-size:13px;background:#1a1a30;color:#e0e0f0;"></div>' +
        '<div class="form-group" style="margin-bottom:10px;"><label style="font-size:12px;font-weight:600;color:#8a8aaa;display:block;margin-bottom:4px;">🔗 Link de lead page</label>' +
        '<input id="se-cfg-' + k + '-link" value="' + (v.link || '') + '" placeholder="tinytiger.html o https://..." style="width:100%;padding:10px 14px;border:2px solid #3a3a50;border-radius:10px;font-size:13px;background:#1a1a30;color:#e0e0f0;"></div>' +
        '<div class="form-group" style="margin-bottom:10px;"><label style="font-size:12px;font-weight:600;color:#8a8aaa;display:block;margin-bottom:4px;">🛒 Checkout URL (después del formulario)</label>' +
        '<input id="se-cfg-' + k + '-checkout" value="' + (v.checkout || '') + '" placeholder="https://tupago.com/checkout" style="width:100%;padding:10px 14px;border:2px solid #3a3a50;border-radius:10px;font-size:13px;background:#1a1a30;color:#e0e0f0;"></div>' +
        '</div>';
    });
    html += '<div style="display:flex;gap:10px;">' +
      '<button id="se-cfg-save" style="background:#22c55e;color:#fff;border:none;padding:12px 24px;border-radius:12px;font-weight:700;cursor:pointer;flex:1;">💾 Guardar configuración</button>' +
      '<button id="se-cfg-close" style="background:#3a3a50;color:#fff;border:none;padding:12px 24px;border-radius:12px;font-weight:600;cursor:pointer;">Cerrar</button>' +
      '</div>';
    panel.innerHTML = html;
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    document.getElementById('se-cfg-close').onclick = function () { overlay.remove(); };
    document.getElementById('se-cfg-save').onclick = function () {
      var newCfg = {};
      keys.forEach(function (k) {
        newCfg[k] = {
          video: document.getElementById('se-cfg-' + k + '-video').value.trim(),
          link: document.getElementById('se-cfg-' + k + '-link').value.trim(),
          checkout: document.getElementById('se-cfg-' + k + '-checkout').value.trim()
        };
      });
      localStorage.setItem('mb_program_links', JSON.stringify(newCfg));
      if (window.PROGRAM_LINKS) {
        Object.assign(window.PROGRAM_LINKS, newCfg);
      }
      overlay.remove();
      alert('✅ Configuración guardada en este navegador. Los cambios se verán al recargar la página.');
    };
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
  }

  // ===== Vista previa local de fotos/videos (solo para ver cómo queda) =====
  // No sube nada a ningún lado, no se guarda. Se borra si recargas la página.
  // La subida real de fotos/videos siempre es desde /admin cuando el sitio
  // esté en línea (GitHub + Netlify conectados).
  function buildMediaPreviewButtons() {
    document.querySelectorAll('[data-media-slot]').forEach(function (slot) {
      if (slot.querySelector('.se-upload-label')) return; // ya tiene botón de subir
      if (getComputedStyle(slot).position === 'static') slot.style.position = 'relative';
      var slotKey = slot.getAttribute('data-media-slot');

      var label = document.createElement('label');
      label.className = 'se-media-btn se-upload-label';
      label.style.cssText = 'display:none;position:absolute;z-index:20;cursor:pointer;' +
        'font-family:Inter,Arial,sans-serif;';

      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,video/*';
      input.style.display = 'none';
      input.onchange = function (e) {
        var file = e.target.files[0];
        if (!file) return;
        window.LocalMedia.saveSlot(slotKey, file, 50).then(function (item) {
          renderSlotPreview(slot, item);
          updateUploadLabelStyle(slot, label);
          label.style.display = label.getAttribute('data-show-display') || 'block';
        });
      };
      label.appendChild(input);
      slot.appendChild(label);
      updateUploadLabelStyle(slot, label);

      // Botones de mover arriba/abajo (solo sirven si ya hay una foto puesta)
      var moveWrap = document.createElement('div');
      moveWrap.className = 'se-media-btn se-move-wrap';
      moveWrap.style.cssText = 'display:none;position:absolute;top:8px;right:8px;z-index:20;' +
        'display:none;flex-direction:column;gap:4px;';
      var upBtn = document.createElement('button');
      upBtn.type = 'button';
      upBtn.textContent = '⬆️';
      var downBtn = document.createElement('button');
      downBtn.type = 'button';
      downBtn.textContent = '⬇️';
      [upBtn, downBtn].forEach(function (b) {
        b.style.cssText = 'background:rgba(0,0,0,0.6);color:#fff;border:none;width:30px;height:30px;' +
          'border-radius:6px;cursor:pointer;font-size:13px;';
      });
      upBtn.onclick = function () { adjustPosition(slot, slotKey, -10); };
      downBtn.onclick = function () { adjustPosition(slot, slotKey, 10); };
      moveWrap.appendChild(upBtn);
      moveWrap.appendChild(downBtn);
      moveWrap.classList.add('se-media-btn');
      slot.appendChild(moveWrap);

      // Botón 🗑️ para borrar SOLO esta foto/video (no las demás)
      var delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'se-media-btn';
      delBtn.textContent = '🗑️';
      delBtn.title = 'Borrar solo esta foto/video';
      delBtn.style.cssText = 'display:none;position:absolute;bottom:8px;right:8px;z-index:20;' +
        'background:#ef4444;color:#fff;border:none;width:30px;height:30px;border-radius:6px;' +
        'cursor:pointer;font-size:13px;';
      delBtn.onclick = function () {
        if (!confirm('¿Borrar esta foto/video de prueba?')) return;
        window.LocalMedia.clearSlot(slotKey).then(function () {
          var el = slot.querySelector('img, video');
          if (el) el.remove();
          updateUploadLabelStyle(slot, label);
          label.style.display = label.getAttribute('data-show-display') || 'block';
        });
      };
      slot.appendChild(delBtn);

      // Botón para ocultar/mostrar el texto del caption
      var overlay = findCaptionOverlay(slot);
      if (overlay) {
        var overlayKey = 'mb_caption_hidden_' + slotKey;
        var overlayBtn = document.createElement('button');
        overlayBtn.type = 'button';
        overlayBtn.className = 'se-media-btn';
        overlayBtn.textContent = '🔤 Ocultar/mostrar texto';
        overlayBtn.style.cssText = 'display:none;position:absolute;top:8px;left:8px;z-index:20;' +
          'background:#3b82f6;color:#fff;border:none;padding:6px 10px;border-radius:6px;' +
          'font-size:11px;font-weight:700;cursor:pointer;font-family:Inter,Arial,sans-serif;';
        overlayBtn.onclick = function () {
          var hidden = overlay.style.display === 'none';
          overlay.style.display = hidden ? '' : 'none';
          localStorage.setItem(overlayKey, hidden ? '0' : '1');
        };
        slot.appendChild(overlayBtn);
      }
    });
  }

  function findCaptionOverlay(slot) {
    var parent = slot.parentElement;
    if (!parent) return null;
    return parent.querySelector('.media-caption-overlay');
  }

  function renderSlotPreview(slot, item) {
    var isVideo = item.type.indexOf('video') === 0;
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
    slot.style.overflow = 'hidden';
    var old = slot.querySelector('img, video');
    if (old) old.remove();
    slot.insertBefore(el, slot.firstChild);
  }

  function adjustPosition(slot, slotKey, delta) {
    var el = slot.querySelector('img, video');
    if (!el) { alert('Primero sube una foto o video en este espacio.'); return; }
    var current = parseInt(el.getAttribute('data-pos-y') || '50', 10);
    var next = Math.max(0, Math.min(100, current + delta));
    window.LocalMedia.setSlotPosition(slotKey, next).then(function (item) {
      if (item) renderSlotPreview(slot, item);
      var newEl = slot.querySelector('img, video');
      if (newEl) newEl.setAttribute('data-pos-y', next);
    });
  }

  function addFlexGalleryButtons() {
    ['gallery-photos-grid', 'gallery-videos-grid'].forEach(function (id) {
      var grid = document.getElementById(id);
      if (!grid) return;
      var btnId = 'se-add-' + id;
      if (document.getElementById(btnId)) return;
      var addBtn = document.createElement('button');
      addBtn.id = btnId;
      addBtn.className = 'se-flex-add';
      addBtn.textContent = '+ Agregar (vista previa local)';
      addBtn.style.cssText = 'display:none;margin:12px auto;padding:10px 16px;' +
        'background:#a855f7;color:#fff;border:none;border-radius:8px;font-weight:700;' +
        'cursor:pointer;font-family:Inter,Arial,sans-serif;';
      addBtn.onclick = function () {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,video/*';
        input.onchange = function (e) {
          var file = e.target.files[0];
          if (!file) return;
          var group = id === 'gallery-photos-grid' ? 'gallery_photos' : 'gallery_videos';
          window.LocalMedia.addToFlexGroup(group, file).then(function () {
            window.LocalMedia.renderFlexGroup(group, id);
          });
        };
        input.click();
      };
      grid.parentNode.insertBefore(addBtn, grid.nextSibling);
    });
  }

  function updateUploadLabelStyle(slot, label) {
    var hasMedia = !!slot.querySelector('img, video');
    // Preservar el input type="file" que ya está dentro del label
    var fileInput = label.querySelector('input[type="file"]');
    if (hasMedia) {
      label.innerHTML = '<span>📷 Cambiar foto/video</span>';
      label.setAttribute('data-show-display', 'block');
      label.style.cssText = 'position:absolute;bottom:8px;left:8px;right:8px;' +
        'text-align:center;background:#a855f7;color:#fff;font-size:11px;font-weight:700;' +
        'padding:8px 6px;border-radius:6px;cursor:pointer;z-index:20;font-family:Inter,Arial,sans-serif;';
    } else {
      label.innerHTML = '<span>📷 Clic aquí para subir tu foto o video</span>';
      label.setAttribute('data-show-display', 'flex');
      label.style.cssText = 'position:absolute;inset:0;align-items:center;justify-content:center;' +
        'text-align:center;padding:20px;background:rgba(168,85,247,0.22);' +
        'border:3px dashed #a855f7;color:#fff;font-size:15px;font-weight:800;' +
        'cursor:pointer;z-index:20;font-family:Inter,Arial,sans-serif;';
    }
    // Restaurar el input dentro del label (innerHTML lo borra)
    if (fileInput) label.appendChild(fileInput);
    label.style.display = 'block';
  }

  function copyBlogHTML() {
    var article = document.querySelector('article.article-content');
    if (!article) { alert('No hay contenido de blog en esta página.'); return; }
    var html = '<article class="article-content"><div class="article-container">\n' + article.innerHTML.trim() + '\n</div></article>';
    navigator.clipboard.writeText(html).then(function () {
      alert('✅ HTML del blog copiado al portapapeles. Pégalo en el archivo .html para guardarlo permanentemente.');
    }).catch(function () {
      // Fallback for file:// protocol
      var ta = document.createElement('textarea');
      ta.value = html;
      ta.style.position = 'fixed'; ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      alert('✅ HTML copiado (método alternativo). Pégalo en el archivo .html.');
    });
  }

  function toggleMediaPreviewUI(show) {
    document.querySelectorAll('.se-media-btn, .se-flex-add').forEach(function (el) {
      var showAs = el.getAttribute('data-show-display') || 'block';
      el.style.display = 'block';
    });
  }

  // Always show media upload buttons (even without edit mode)
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      document.querySelectorAll('.se-media-btn, .se-flex-add').forEach(function (el) {
        el.style.display = 'block';
      });
    }, 500);
  });

  // Restore blog article content from local draft
  function applyBlogOverrides() {
    try {
      var blogOv = JSON.parse(localStorage.getItem(BLOG_OVERRIDES_KEY) || '{}');
      var path = window.location.pathname;
      if (blogOv[path]) {
        var article = document.querySelector('article.article-content');
        if (article) {
          article.innerHTML = blogOv[path];
        }
      }
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyBlogOverrides();
    // Cargar configuración de programas guardada en este navegador
    try {
      var saved = JSON.parse(localStorage.getItem('mb_program_links') || '{}');
      if (Object.keys(saved).length && window.PROGRAM_LINKS) {
        Object.assign(window.PROGRAM_LINKS, saved);
      }
    } catch(e) {}

  });

  // Enganchar la vista previa de medios al mismo botón EDITAR
  var _origToggle = toggleEditMode;
  toggleEditMode = function () {
    _origToggle();
    toggleMediaPreviewUI(editMode);
  };
})();

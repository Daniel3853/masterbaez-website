/* ============================================================
   local-media-preview.js
   Sube fotos/videos a Firebase Storage y guarda la URL en
   Firebase Realtime Database, para que se vean en CUALQUIER
   navegador y CUALQUIER dispositivo (no solo en el tuyo).

   ANTES de usar este archivo:
   1. Agrega el SDK de Firebase en el <head> de tu index.html,
      ARRIBA de la línea donde cargas este archivo:

      <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
      <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js"></script>
      <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js"></script>

   2. Rellena FIREBASE_CONFIG abajo con los datos de tu proyecto
      "crm-leads-baez" (Firebase console > ícono de engranaje >
      Configuración del proyecto > "Tus apps" > Config del SDK).

   3. En Firebase console, activa "Storage" (menú lateral) si
      todavía no lo has hecho.
   ============================================================ */
(function () {
  // ==== 1) CONFIGURA AQUÍ TU FIREBASE (copia/pega desde la consola) ====
  var FIREBASE_CONFIG = {
    apiKey: "PON_AQUI_TU_API_KEY",
    authDomain: "crm-leads-baez.firebaseapp.com",
    databaseURL: "https://crm-leads-baez-default-rtdb.firebaseio.com",
    projectId: "crm-leads-baez",
    storageBucket: "crm-leads-baez.appspot.com",
    messagingSenderId: "PON_AQUI_TU_SENDER_ID",
    appId: "PON_AQUI_TU_APP_ID"
  };
  // ======================================================================

  var _initialized = false;
  var _mediaCache = null; // cache local de siteContent/media

  function ensureFirebase() {
    if (_initialized) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      if (typeof firebase === "undefined") {
        reject(new Error("Firebase SDK no está cargado. Revisa los <script> en el <head> del HTML."));
        return;
      }
      try {
        if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
        _initialized = true;
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  // Sube un archivo (foto o video) al slot indicado
  function saveSlot(slotKey, file, maxSizeMB) {
    return ensureFirebase()
      .then(function () {
        var maxBytes = (maxSizeMB || 50) * 1024 * 1024;
        if (file.size > maxBytes) {
          alert("El archivo pesa demasiado. Máximo permitido: " + maxSizeMB + "MB.");
          return Promise.reject(new Error("Archivo muy pesado"));
        }

        var safeName = Date.now() + "_" + file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        var path = "siteMedia/" + slotKey + "/" + safeName;
        var storageRef = firebase.storage().ref(path);

        return storageRef.put(file).then(function (snapshot) {
          return snapshot.ref.getDownloadURL();
        });
      })
      .then(function (url) {
        var type = file.type.indexOf("video") === 0 ? "video" : "image";
        var entry = { url: url, type: type, uploadedAt: Date.now() };
        return firebase
          .database()
          .ref("siteContent/media/" + slotKey)
          .set(entry)
          .then(function () {
            if (_mediaCache) _mediaCache[slotKey] = entry;
            return url;
          });
      })
      .catch(function (err) {
        console.error("Error subiendo a Firebase:", err);
        alert("No se pudo subir el archivo. Revisa tu conexión a internet o la configuración de Firebase (mira la consola del navegador con F12 para más detalle).");
        throw err;
      });
  }

  // Trae TODOS los medios guardados desde Firebase
  function loadAllMedia() {
    return ensureFirebase()
      .then(function () {
        return firebase.database().ref("siteContent/media").once("value");
      })
      .then(function (snap) {
        _mediaCache = snap.val() || {};
        return _mediaCache;
      })
      .catch(function (err) {
        console.error("Error leyendo medios de Firebase:", err);
        _mediaCache = _mediaCache || {};
        return _mediaCache;
      });
  }

  function renderSlot(el, entry) {
    if (!entry || !entry.url) return;
    el.innerHTML = "";
    if (entry.type === "video") {
      var v = document.createElement("video");
      v.src = entry.url;
      v.controls = true;
      v.playsInline = true;
      v.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;";
      el.appendChild(v);
    } else {
      var img = document.createElement("img");
      img.src = entry.url;
      img.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;";
      el.appendChild(img);
    }
  }

  // Aplica todos los medios guardados a los elementos [data-media-slot] en la página
  function applyAll() {
    var run = _mediaCache ? Promise.resolve(_mediaCache) : loadAllMedia();
    return run.then(function (media) {
      var slots = document.querySelectorAll("[data-media-slot]");
      slots.forEach(function (el) {
        var key = el.getAttribute("data-media-slot");
        if (media[key]) renderSlot(el, media[key]);
      });
      return media;
    });
  }

  window.LocalMedia = {
    saveSlot: saveSlot,
    applyAll: applyAll,
    loadAllMedia: loadAllMedia
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyAll();
  });
})();

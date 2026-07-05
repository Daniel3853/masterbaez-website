# Cómo activar tu panel para subir fotos y videos (/admin)

Tu página ahora tiene un panel de administración en `tusitio.com/admin` donde
puedes subir fotos y videos sin tocar código. Pero como es un sitio HTML puro
(sin servidor propio todavía), ese panel necesita "engancharse" a un lugar
gratuito que guarde los cambios. La opción más simple y gratis es **Netlify**.

Esto se hace UNA sola vez. Después, subir fotos es solo entrar a `/admin`,
hacer clic y arrastrar el archivo.

## Paso 1 — Sube estos archivos a GitHub (gratis)
1. Crea una cuenta en https://github.com (si no tienes).
2. Crea un repositorio nuevo, por ejemplo `masterbaez-website`.
3. Sube ahí TODOS los archivos de esta carpeta (arrastra y suelta en la
   página de GitHub, o pide ayuda a alguien técnico si prefieres).

## Paso 2 — Conecta ese repositorio a Netlify (gratis)
1. Crea una cuenta en https://netlify.com (puedes entrar directo con tu
   cuenta de GitHub).
2. Clic en "Add new site" → "Import an existing project" → elige tu
   repositorio de GitHub.
3. Como es HTML puro, deja los campos de "build command" vacíos y el
   "publish directory" como `/` (la raíz). Clic en "Deploy".
4. En unos segundos tu página estará viva en una URL tipo
   `tusitio.netlify.app`. Luego puedes conectar tu dominio real
   (masterbaezmartialarts.com) desde "Domain settings" en Netlify.

## Paso 3 — Activa el login del panel (Identity + Git Gateway)
1. Dentro de tu sitio en Netlify, ve a **Site configuration → Identity**
   y haz clic en "Enable Identity".
2. Baja a "Registration" y ponlo en **Invite only** (para que solo tú
   puedas entrar al panel).
3. Ve a **Identity → Services → Git Gateway** y haz clic en "Enable Git
   Gateway".
4. En la pestaña **Identity**, invita tu propio correo como usuario
   ("Invite users").
5. Revisa tu correo, acepta la invitación y crea tu contraseña.

## Paso 4 — ¡Listo! Ya puedes subir fotos y videos
1. Entra a `tusitio.com/admin` (o `tusitio.netlify.app/admin` mientras
   conectas tu dominio).
2. Inicia sesión con el correo que invitaste.
3. Verás las 6 fotos/video fijas de la portada (Foto 1, Foto 2, Foto 3,
   Video, Foto 4, Foto de Entrenamiento Atlético) — arrastra tu archivo en
   cada una y guarda ("Publish").
4. Además verás **dos listas sin límite**: "Galería de Fotos" y "Galería
   de Videos". Ahí haces clic en "Add" tantas veces como quieras — no hay
   número máximo. Aparecen solas en una nueva sección "Galería" de tu
   página. También puedes borrar cualquiera cuando quieras.
5. En 1-2 minutos el cambio se ve reflejado en tu página en vivo — sin
   que nadie tenga que tocar código.

## Notas importantes
- El panel está bloqueado para buscadores (`robots.txt` lo excluye), así
  que no aparecerá en Google ni confundirá a las IAs.
- Los videos deben ser formato **MP4** y pesar idealmente menos de 20-30 MB
  para que la página cargue rápido (puedes comprimirlos gratis en
  https://www.freeconvert.com/video-compressor antes de subirlos).
- Si en algún momento cambias de proveedor de hosting (por ejemplo pasas a
  WordPress o Wix), este panel específico de Netlify ya no te serviría —
  pero es fácil de reemplazar por el editor de medios que traiga esa
  plataforma. Avísame si llegas a ese punto y te ayudo a migrarlo.
- Si prefieres que **yo mismo** te suba las fotos una vez las tengas,
  simplemente compártemelas en el chat y las dejo listas en el HTML —
  no necesitas el panel para eso, es solo por si quieres poder cambiarlas
  tú mismo cuando quieras, sin depender de mí cada vez.

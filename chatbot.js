/* ============================================================
   CHATBOT - Master Baez Martial Arts (100% GRATIS)
   Este bot LEE AUTOMÁTICAMENTE el texto de tu página y busca
   ahí la respuesta a cada pregunta. No usa ninguna IA de pago,
   no necesita API key, no necesita servidor ni función serverless.
   ============================================================ */

/* ============================================================
   CONFIGURACIÓN - Edita esto según tu despliegue
   ============================================================ */
var MB_CONFIG = {
  // Solo se usa si aiEnabled = true (requiere backend propio)
  apiEndpoint: "/api/chat",

  // GRATIS: el bot SOLO usa la búsqueda local dentro del texto de
  // tu página (sin IA, sin costo, sin necesidad de backend ni API key).
  aiEnabled: false,

  // Cuántos caracteres del texto de la página se envían como
  // contexto a la IA (para no hacer el mensaje demasiado grande).
  maxContextChars: 8000,

  // Tiempo máximo de espera a la IA antes de usar el respaldo local (ms)
  aiTimeoutMs: 9000,

  // Teléfono / info de contacto usada en los mensajes de respaldo
  phone: "954-380-1340"
};

/* Preguntas y respuestas fijas para los temas más comunes — responden
   siempre igual y correctamente, sin depender de cómo esté redactada
   tu página. Puedes seguir agregando aquí con el mismo formato.
   Todo lo que NO esté cubierto aquí, el bot lo busca en el resto
   del texto de tu página. */
var MB_QA = [
  { palabras: ["what programs","program do you","offer","classes do you","programas","ofrecen","tipos de clase","que programas"],
    en: "We offer:\n• Tiny Tigers (ages 4-6)\n• Kids Martial Arts (ages 7-12)\n• Adult Fitness (ages 13+)\n• After School Program (ages 6-12)\n\nStart with 2 FREE classes today!",
    es: "Ofrecemos:\n• Tigres Pequeños (4-6 años)\n• Artes Marciales para Niños (7-12)\n• Fitness para Adultos (13+)\n• Programa Extraescolar (6-12)\n\n¡Empieza con 2 clases GRATIS!" },
  { palabras: ["which program","best program","best fit","cual programa","que programa","mejor programa","recomiendan"],
    en: "It depends on your child's age! Tiny Tigers (4-6), Kids Martial Arts (7-12), or Adult Fitness (13+). The best way to know is to try a free class — our coaches can recommend the right fit in person.",
    es: "Depende de la edad de tu hijo: Tigres Pequeños (4-6), Artes Marciales para Niños (7-12), o Fitness para Adultos (13+). La mejor forma de saber es probar una clase gratis — nuestros entrenadores te recomiendan lo ideal en persona." },
  { palabras: ["beginner","principiante","never done","nunca ha practicado","no experience","sin experiencia","too late","muy tarde","need experience","necesito experiencia","behind","atras","atrás"],
    en: "Every champion starts as a beginner! It's never too late, no experience needed, and every student — kids or adults — progresses at their own pace with our coaches' full support.",
    es: "¡Todo campeón comienza como principiante! Nunca es tarde, no necesitas experiencia, y cada estudiante progresa a su propio ritmo con el apoyo de nuestros entrenadores." },
  { palabras: ["family class","family classes","toda la familia","clases familiares","clases en familia"],
    en: "Yes! We welcome families training together — a great way to bond while building discipline and fitness as a family. Ask us for the best schedule to train alongside your child.",
    es: "¡Sí! Recibimos familias que entrenan juntas — una excelente forma de compartir mientras desarrollan disciplina y estado físico en familia. Pregúntanos por el mejor horario para entrenar junto a tu hijo." },
  { palabras: ["private lesson","private class","clase privada","clases privadas","one on one","uno a uno"],
    en: "Yes, we offer private lessons for personalized, one-on-one attention. Call 954-380-1340 to ask about availability and pricing.",
    es: "Sí, ofrecemos clases privadas con atención personalizada uno a uno. Llama al 954-380-1340 para preguntar por disponibilidad y precio." },
  { palabras: ["summer camp","campamento de verano","summer program","campamento"],
    en: "Yes, we offer a Summer Camp program combining martial arts, games, and character development to keep kids active and engaged during the break. Call 954-380-1340 for dates and pricing.",
    es: "Sí, ofrecemos Campamento de Verano combinando artes marciales, juegos y desarrollo personal para mantener a los niños activos durante las vacaciones. Llama al 954-380-1340 para fechas y precios." },
  { palabras: ["ages","age limit","edades","edad limite","límite de edad","4 years old","6 years old","4 años","6 años","teenager","teenagers","adolescente","aceptan","start with no experience"],
    en: "We serve ages 4 and up:\n• Tiny Tigers: 4-6\n• Kids: 7-12\n• Teens & Adults: 13+\n\nThere's no upper age limit, and adults can start with zero experience.",
    es: "Aceptamos desde los 4 años:\n• Tigres Pequeños: 4-6\n• Niños: 7-12\n• Adolescentes y Adultos: 13+\n\nNo hay límite de edad máxima, y los adultos pueden empezar sin experiencia." },
  { palabras: ["cost","price","pricing","cuanto cuesta","cuánto cuesta","precios","monthly price","mensualidad","cual es el precio","cuál es el precio","cuanto cobran","cuánto cobran","tuition","monthly fee","what do you charge"],
    en: "Special offer: 2 FREE classes + 3 months for $149 (includes uniform). 100% money-back guarantee!",
    es: "Oferta especial: 2 clases GRATIS + 3 meses por $149 (incluye uniforme). ¡Garantía de devolución del 100%!" },
  { palabras: ["registration fee","cuota de inscripcion","cuota de inscripción","discount","descuento","family discount","descuento familiar","military discount","descuento militar","what's included","que incluye","qué incluye","membership include"],
    en: "Our current special (2 FREE classes + 3 months for $149) already includes the uniform. Call 954-380-1340 to ask about family or military discounts and what's included in your membership.",
    es: "Nuestra oferta actual (2 clases GRATIS + 3 meses por $149) ya incluye el uniforme. Llama al 954-380-1340 para preguntar por descuentos familiares o militares y qué incluye tu membresía." },
  { palabras: ["schedule","class times","horarios","horario de clase","evening class","clase de noche","saturday","sabado","sábado","different days","diferentes dias","diferentes días","how many classes","cuantas clases","cuántas clases","hours","when","cuando","cuándo"],
    en: "Please call 954-380-1340 for current class schedules, including evening and Saturday options. We have classes throughout the week for all ages, and you're welcome to attend on different days.",
    es: "Llama al 954-380-1340 para horarios actuales, incluyendo opciones en la tarde/noche y sábados. Tenemos clases durante toda la semana para todas las edades, y puedes asistir en diferentes días." },
  { palabras: ["location","address","ubicacion","ubicación","donde estan","dónde están","located","ubicados","direccion","dirección","griffin","parking","estacionamiento","near","cerca de","high school","davie"],
    en: "9450 Griffin Rd, Cooper City, FL 33328\nPhone: 954-380-1340\n\nWe have parking on site. Call us for directions from your area.",
    es: "9450 Griffin Rd, Cooper City, FL 33328\nTeléfono: 954-380-1340\n\nContamos con estacionamiento en el lugar. Llámanos para indicaciones desde tu zona." },
  { palabras: ["phone","telefono","teléfono","call us","llamar","contact","contacto","reach"],
    en: "Call us at 954-380-1340 or visit 9450 Griffin Rd, Cooper City, FL",
    es: "Llama al 954-380-1340 o visita 9450 Griffin Rd, Cooper City, FL" },
  { palabras: ["after school","extraescolar","aftercare","pick up","recogen","que escuelas","qué escuelas","transportation","transporte","snack","merienda","end time","hasta que hora","hasta qué hora","waiting list","lista de espera"],
    en: "After School Program (ages 6-12): we pick up from select local schools, provide a snack, and combine homework time with martial arts and character development until pickup. Call 954-380-1340 to confirm your child's school and current openings.",
    es: "Programa Extraescolar (6-12 años): recogemos en escuelas locales seleccionadas, ofrecemos merienda, y combinamos tiempo de tarea con artes marciales y desarrollo personal hasta la hora de recogida. Llama al 954-380-1340 para confirmar la escuela de tu hijo y cupos disponibles." },
  { palabras: ["guarantee","garantia","garantía","refund","devolucion","devolución","money back"],
    en: "100% Money-Back Guarantee: If your child doesn't love their first week, we refund every penny. No questions asked.",
    es: "Garantía de devolución del 100%: Si tu hijo no ama su primera semana, devolvemos cada centavo. Sin preguntas." },
  { palabras: ["free trial","free class","prueba gratis","clase gratis","watch a class","ver una clase","try before","probar antes","first class","primera clase","que pasa en la primera","qué pasa en la primera","schedule a free class","agendar clase gratis"],
    en: "You can start with 2 completely FREE classes! You're also welcome to watch a class beforehand. On your first day, expect a warm welcome, a fun intro to basics, and no pressure to sign up on the spot.",
    es: "¡Puedes empezar con 2 clases completamente GRATIS! También puedes venir a observar una clase antes. En tu primer día tendrás una bienvenida cálida, una introducción divertida a lo básico, y sin presión de inscribirte de inmediato." },
  { palabras: ["confidence","self-esteem","autoestima","focus","enfoque","discipline","disciplina","respect","respeto","listening skills","escuchar","self-control","autocontrol","get more active","mas activo","más activo","coordination","coordinacion","coordinación","benefits","beneficios"],
    en: "Martial arts builds confidence, focus, discipline, respect for others, listening skills, self-control, and coordination — all while keeping kids active and having fun. It's one of the most well-rounded activities for child development.",
    es: "Las artes marciales desarrollan confianza, enfoque, disciplina, respeto hacia los demás, capacidad de escucha, autocontrol y coordinación — mientras mantienen a los niños activos y se divierten. Es una de las actividades más completas para el desarrollo infantil." },
  { palabras: ["adhd","tdah","autism","autismo","anxiety","ansiedad","behavioral issue","problemas de conducta","trouble focusing","dificultad para concentrarse","special needs","necesidades especiales"],
    en: "We welcome children with ADHD, autism, anxiety, or other needs. We're not a medical or therapeutic program, but many parents tell us our structured, positive environment helps their child build focus, confidence, and self-regulation over time. We recommend a free trial class so our coaches can personally get to know your child and see if it's a good fit.",
    es: "Recibimos a niños con TDAH, autismo, ansiedad u otras necesidades. No somos un programa médico ni terapéutico, pero muchos padres nos cuentan que nuestro ambiente estructurado y positivo ayuda a sus hijos a desarrollar enfoque, confianza y autorregulación con el tiempo. Recomendamos una clase de prueba gratis para que nuestros entrenadores conozcan a tu hijo y veamos si es un buen encaje." },
  { palabras: ["shy","timido","tímido","quiet","callado","reserved","reservado","social skills"],
    en: "Absolutely! Martial arts is one of the best activities for shy children. Our supportive environment helps them come out of their shell at their own pace.",
    es: "¡Absolutamente! Las artes marciales son ideales para niños tímidos. Nuestro ambiente de apoyo les ayuda a salir de su caparazón a su propio ritmo." },
  { palabras: ["safe","seguro","get hurt","lastimar","lesion","lesión","contact sparring","sparring de contacto","protective equipment","equipo de proteccion","equipo de protección","certified instructor","instructor certificado","do beginners spar"],
    en: "Safety is our top priority. Classes are age-appropriate and supervised by certified instructors, students wear protective equipment when sparring, and beginners ease into contact gradually under close guidance.",
    es: "La seguridad es nuestra prioridad. Las clases son apropiadas para cada edad y supervisadas por instructores certificados, los estudiantes usan equipo de protección al hacer sparring, y los principiantes se introducen al contacto gradualmente con supervisión cercana." },
  { palabras: ["difference","different school","diferente","why choose","porque elegir","por qué elegir","unique","better","mejor que otras","diferencia con otras"],
    en: "Master Baez combines elite athletic training with character development. Founded in 1991, serving Cooper City for over 30 years. We use modern, gamified approaches and partner with parents.",
    es: "Master Baez combina entrenamiento de élite con desarrollo de carácter. Fundado en 1991, sirviendo a Cooper City por más de 30 años." },
  { palabras: ["violent","violencia","violento","aggressive","agresivo","fighting","peleas","teach to fight"],
    en: "No! Martial arts teaches self-control, discipline and respect. It builds confidence and reduces the likelihood of aggressive behavior.",
    es: "¡No! Las artes marciales enseñan autocontrol, disciplina y respeto. Desarrollan confianza y reducen la agresividad." },
  { palabras: ["how long to see results","resultados","how much time","cuanto tiempo para ver","cuánto tiempo para ver","change","cambio","how long does it take"],
    en: "Many parents notice changes in confidence within the first few weeks. Real transformation builds over months through our belt system.",
    es: "Muchos padres notan cambios en confianza en las primeras semanas. La transformación real se construye en meses a través de nuestro sistema." },
  { palabras: ["uniform","uniforme","need to buy","comprar uniforme","when do i need","cuando necesito el uniforme","cuándo necesito el uniforme","sell uniforms","venden uniformes","what should my child wear","que debe llevar","qué debe llevar","equipment required","equipo requerido"],
    en: "Our current special includes the uniform, so you don't need to buy anything beforehand. For your first free class, just wear comfortable athletic clothes — we'll guide you from there.",
    es: "Nuestra oferta actual incluye el uniforme, así que no necesitas comprar nada antes. Para tu primera clase gratis, solo lleva ropa cómoda deportiva — nosotros te guiamos desde ahí." },
  { palabras: ["belt","cinturon","cinturón","test","exam","examen","promotion","stripes","franjas","black belt","cinturon negro","cinturón negro","how long to earn","tests included","examenes incluidos","exámenes incluidos"],
    en: "Belt tests happen every 2-3 months and are included in your membership. Students earn stripes as they progress. Reaching black belt typically takes a few years of consistent training, minimum 2 days per week recommended.",
    es: "Los exámenes de cinturón son cada 2-3 meses y están incluidos en tu membresía. Los estudiantes ganan franjas al progresar. Llegar a cinturón negro toma normalmente unos años de entrenamiento constante, mínimo 2 días por semana recomendado." },
  { palabras: ["tiny tigers","tigres pequenos","tigres pequeños","little dragons","dragoncitos","age 4","age 5","age 6"],
    en: "Tiny Tigers (ages 4-6): builds motor skills, social interaction, and a love for physical activity in a fun environment.",
    es: "Tigres Pequeños (4-6 años): desarrolla habilidades motoras, interacción social y amor por la actividad física." },
  { palabras: ["kids martial","children program","ninos program","niños programa","hijo programa","hija programa"],
    en: "Kids Martial Arts (ages 7-12): advanced technique, leadership development, and character building.",
    es: "Artes Marciales para Niños (7-12 años): técnica avanzada, liderazgo y formación de carácter." },
  { palabras: ["adult fitness","adultos fitness","teen program","teens class","programa para adolescentes"],
    en: "Adult Fitness (ages 13+): elite training in martial arts, strength conditioning, and leadership.",
    es: "Fitness para Adultos (13+): entrenamiento de élite en artes marciales, condición física y liderazgo." },
  { palabras: ["special","149","promotion","descuento especial","oferta especial","deal"],
    en: "SPECIAL OFFER: 2 FREE classes + 3 months for $149! Includes uniform. 100% money-back guarantee.",
    es: "OFERTA ESPECIAL: 2 clases GRATIS + 3 meses por $149. Incluye uniforme. ¡Garantía de devolución!" },
  { palabras: ["how do i enroll","sign up online","inscribirme en linea","inscribirme en línea","documents needed","documentos necesarios","start today","empezar hoy","is there a contract","hay contrato","como me inscribo","cómo me inscribo","register","inscribir"],
    en: "You can enroll by clicking 'Start Today' on our website or calling 954-380-1340. No long-term contract required to start with our trial offer — just bring a photo ID for the parent/guardian.",
    es: "Puedes inscribirte haciendo clic en 'Empieza Hoy' en nuestro sitio o llamando al 954-380-1340. No se requiere contrato a largo plazo para empezar con nuestra oferta de prueba — solo trae una identificación del padre/madre o tutor." },
  { palabras: ["can parents watch","pueden ver los padres","parents participate","padres participar","stay during class","quedarse durante la clase","observation area","area para observar"],
    en: "Yes, parents are always welcome to watch class from our observation area. Some programs also welcome parent participation — just ask your instructor.",
    es: "Sí, los padres siempre pueden observar la clase desde nuestra área de observación. Algunos programas también permiten la participación de los padres — solo pregúntale a tu instructor." },
  { palabras: ["compete","competir","tournament","torneo","competencia","required to compete","obligatorio competir","self-defense or competition","defensa personal o competencia"],
    en: "Competing is optional, never required. We focus primarily on self-defense, discipline and personal growth, but students who enjoy competition are welcome to join tournaments with our support.",
    es: "Competir es opcional, nunca obligatorio. Nos enfocamos principalmente en defensa personal, disciplina y crecimiento personal, pero los estudiantes que disfrutan competir pueden participar en torneos con nuestro apoyo." },
  { palabras: ["testimonials","testimonios","reviews","resenas","reseñas","opiniones","google","rating"],
    en: "4.9/5 stars with over 100 Google reviews. Parents love the transformation in their children!",
    es: "4.9/5 estrellas con más de 100 reseñas en Google. ¡Los padres aman la transformación de sus hijos!" },
  { palabras: ["bullying","acoso","bully","bullies","self-defense","defensa personal"],
    en: "We teach children to recognize, avoid and respond to bullying with confidence. Our program builds awareness and self-defense skills.",
    es: "Enseñamos a los niños a reconocer, evitar y responder al acoso con confianza. Desarrollamos conciencia y defensa personal." },
  { palabras: ["owner","founder","fundador","baez","master","grandmaster","daniel","instructor certified"],
    en: "Founded in 1991 by Grand Master Daniel Baez. Over 30 years helping thousands of students build confidence and leadership.",
    es: "Fundado en 1991 por el Gran Maestro Daniel Baez. Más de 30 años ayudando a miles de estudiantes." }
];

/* ============================================================
   No edites nada de aquí en adelante
   ============================================================ */
(function(){
  var lang = 'en', opened = false, PAGE_CONTEXT = '';

  var STOPWORDS = {
    "the":1,"and":1,"for":1,"with":1,"that":1,"this":1,"you":1,"are":1,"our":1,"your":1,
    "de":1,"la":1,"el":1,"que":1,"para":1,"con":1,"los":1,"las":1,"en":1,"un":1,"una":1,
    "es":1,"del":1,"se":1,"por":1,"como":1,"mas":1,"más":1,"muy":1,"al":1,"lo":1,"y":1,"a":1
  };

  function detectLang(t){
    var w = ['hola','gracias','favor','puedes','necesito','qué','eres','hijo','hija','niño','niña','clases','programas','precios','horarios','dirección','teléfono','artes','marciales','tímido','tdah','confianza','disciplina','cinturón','garantía','devolución','opiniones','reseñas','comenzar','empezar','inscribir','registrar','prueba','gratis','uniforme','pago','mensualidad','cuánto','cuál','dónde','cómo','ubicados','oferta','extraescolar','pequeños','tigres','acoso','violencia','atrás','resultados','horario','abierto','fundador','dueño','reseña','pembroke','pines','davie','plantation','weston','saber','palabras','tipos','edad','años'];
    t = t.toLowerCase();
    for(var i=0;i<w.length;i++){if(t.indexOf(w[i])!==-1) return 'es';}
    return 'en';
  }

  /* -------- 1. LEER TODA LA PÁGINA -------- */
  function extractPageContext(){
    try{
      var clone = document.body.cloneNode(true);
      var widget = clone.querySelector('#mbChatWidget');
      if(widget) widget.parentNode.removeChild(widget);
      var junk = clone.querySelectorAll('script,style,noscript,svg,iframe');
      for(var i=0;i<junk.length;i++){ junk[i].parentNode && junk[i].parentNode.removeChild(junk[i]); }
      var text = clone.innerText || clone.textContent || '';
      text = text.replace(/\n{3,}/g,'\n\n').replace(/[ \t]{2,}/g,' ').trim();
      if(text.length > MB_CONFIG.maxContextChars) text = text.slice(0, MB_CONFIG.maxContextChars);
      return text;
    }catch(e){ return document.title || ''; }
  }

  /* -------- 2. RESPUESTA RÁPIDA (lista corta de arriba) -------- */
  function quickAnswer(q){
    var best = null, bestScore = 0;
    for(var i=0;i<MB_QA.length;i++){
      var score = 0;
      for(var j=0;j<MB_QA[i].palabras.length;j++){
        if(q.indexOf(MB_QA[i].palabras[j].toLowerCase()) !== -1) score++;
      }
      if(score > bestScore){ bestScore = score; best = MB_QA[i]; }
    }
    return (best && bestScore > 0) ? (lang==='es'?best.es:best.en) : null;
  }

  /* -------- 3. BÚSQUEDA LOCAL EN EL TEXTO DE LA PÁGINA (respaldo sin IA) -------- */
  function tokenize(t){
    return t.toLowerCase().replace(/[¿?¡!.,;:()"""'']/g,' ').split(/\s+/)
      .filter(function(w){ return w.length>2 && !STOPWORDS[w]; });
  }

  function localPageSearch(q){
    if(!PAGE_CONTEXT) return null;
    var qWords = tokenize(q);
    if(!qWords.length) return null;

    var chunks = PAGE_CONTEXT.split(/\n+/).map(function(c){return c.trim();}).filter(function(c){return c.length>5;});
    var scored = [];
    for(var i=0;i<chunks.length;i++){
      var chunkWords = chunks[i].toLowerCase();
      var score = 0;
      for(var j=0;j<qWords.length;j++){ if(chunkWords.indexOf(qWords[j])!==-1) score++; }
      if(score > 0) scored.push({ text: chunks[i], score: score, idx: i });
    }
    if(!scored.length) return null;

    scored.sort(function(a,b){ return b.score - a.score; });

    // Toma el mejor fragmento y, si el que le sigue en la página es
    // relevante (o inmediatamente después), lo agrega para dar más contexto.
    var top = scored.slice(0, 2);
    top.sort(function(a,b){ return a.idx - b.idx; });

    var seen = {};
    var result = [];
    for(var k=0;k<top.length;k++){
      if(!seen[top[k].text]){ result.push(top[k].text); seen[top[k].text]=true; }
    }
    return result.join('\n');
  }

  /* -------- 4. PREGUNTAR A LA IA (basado en TODA la página) -------- */
  function askAI(q){
    return new Promise(function(resolve, reject){
      if(!MB_CONFIG.aiEnabled){ reject('ai_disabled'); return; }

      var controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
      var timeoutId = setTimeout(function(){ if(controller) controller.abort(); }, MB_CONFIG.aiTimeoutMs);

      fetch(MB_CONFIG.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller ? controller.signal : undefined,
        body: JSON.stringify({
          question: q,
          context: PAGE_CONTEXT,
          lang: lang
        })
      }).then(function(res){
        clearTimeout(timeoutId);
        if(!res.ok) throw new Error('bad_status_'+res.status);
        return res.json();
      }).then(function(data){
        if(data && data.answer) resolve(data.answer);
        else reject('no_answer');
      }).catch(function(err){
        clearTimeout(timeoutId);
        reject(err);
      });
    });
  }

  /* -------- FLUJO PRINCIPAL -------- */
  function handleSend(){
    var input = document.getElementById('mbIn');
    var raw = input.value.trim();
    if(!raw) return;
    input.value = '';
    lang = detectLang(raw);
    addMessage(raw, true);

    var q = raw.toLowerCase().replace(/[¿?¡!.,;:]/g,'').trim();

    // 1) respuesta rápida instantánea
    var quick = quickAnswer(q);
    if(quick){ addMessage(quick, false); return; }

    // 2) mostrar "escribiendo..." y probar con la IA
    document.getElementById('mbTg').style.display='flex';

    askAI(raw).then(function(answer){
      document.getElementById('mbTg').style.display='none';
      addMessage(answer, false);
    }).catch(function(){
      // 3) respaldo: búsqueda local en el texto de la página
      setTimeout(function(){
        document.getElementById('mbTg').style.display='none';
        var local = localPageSearch(raw);
        if(local){
          addMessage(local, false);
        } else {
          addMessage(
            lang==='es'
              ? 'No encontré esa información. Llámanos al <strong>'+MB_CONFIG.phone+'</strong> o <a href="#trial" style="color:#a855f7;">prueba una clase gratis</a>.'
              : 'I couldn\'t find that. Call us at <strong>'+MB_CONFIG.phone+'</strong> or <a href="#trial" style="color:#a855f7;">try a free class</a>.',
            false);
        }
      }, 200);
    });
  }

  function addMessage(text, isUser){
    var chat = document.getElementById('mbChatMessages') || document.getElementById('mbM');
    if(!chat) return;
    var msg = document.createElement('div');
    msg.className = 'mb-msg ' + (isUser?'mb-user':'mb-bot');
    msg.innerHTML = isUser ? '<span style="color:#8a8aaa;">You:</span> '+tEscape(text) : text;
    msg.style.whiteSpace = 'pre-wrap';
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  }
  function tEscape(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML;}

  function createUI(){
    if(document.getElementById('mbChatWidget')) return;
    var d = document.createElement('div');
    d.id='mbChatWidget';
    d.innerHTML='<style>'+
      '#mbT{position:fixed;bottom:210px;right:20px;z-index:99998;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#6c5ce7,#a855f7);border:none;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 20px rgba(108,92,231,0.4);transition:transform .2s;display:flex;align-items:center;justify-content:center}'+
      '#mbT::before{content:"";position:absolute;inset:-4px;border-radius:50%;border:2px solid rgba(168,85,247,0.5);animation:mbPulse 2s ease-out infinite;pointer-events:none}'+
      '#mbT::after{content:"";position:absolute;inset:-8px;border-radius:50%;border:2px solid rgba(168,85,247,0.25);animation:mbPulse 2s ease-out .5s infinite;pointer-events:none}'+
      '#mbT:hover{transform:scale(1.05)}'+
      '#mbB{position:fixed;bottom:276px;right:20px;z-index:99997;width:360px;height:440px;max-height:calc(100vh-300px);background:#13132a;border:1px solid #2a2a50;border-radius:16px;overflow:hidden;display:none;flex-direction:column;box-shadow:0 8px 40px rgba(0,0,0,0.5)}'+
      '.mb-h{background:linear-gradient(135deg,#1a1a3a,#23234d);padding:16px 20px;border-bottom:1px solid #2a2a50}'+
      '.mb-h h3{margin:0;font-size:16px;font-weight:700;color:#e0e0f0}'+
      '.mb-h p{margin:2px 0 0;font-size:12px;color:#6b6b8b}'+
      '#mbM{flex:1;overflow-y:auto;padding:16px 20px;scrollbar-width:thin;scrollbar-color:#2a2a50 transparent}'+
      '#mbM::-webkit-scrollbar{width:4px}#mbM::-webkit-scrollbar-thumb{background:#2a2a50;border-radius:4px}'+
      '.mb-msg{margin-bottom:12px;line-height:1.5;font-size:13.5px}'+
      '.mb-user{text-align:right;color:#a78bfa}'+
      '.mb-bot{color:#c0c0d0}'+
      '.mb-bot a{color:#a855f7}'+
      '.mb-i{padding:12px 16px;border-top:1px solid #2a2a50;display:flex;gap:8px;background:#0d0d1a}'+
      '#mbIn{flex:1;padding:10px 14px;border-radius:100px;border:1px solid #2a2a50;background:#1a1a30;color:#e0e0f0;font-size:13px;outline:none}'+
      '#mbIn:focus{border-color:#6c5ce7}#mbIn::placeholder{color:#4a4a6a}'+
      '#mbS{width:38px;height:38px;border-radius:50%;border:none;background:linear-gradient(135deg,#6c5ce7,#a855f7);color:#fff;font-size:16px;cursor:pointer}'+
      '#mbTg{display:none;align-items:center;gap:4px;padding:0 20px 8px;font-size:12px;color:#6b6b8b}'+
      '#mbTg span{width:6px;height:6px;border-radius:50%;background:#6b6b8b;animation:mbP 1.2s infinite}'+
      '#mbTg span:nth-child(2){animation-delay:.2s}#mbTg span:nth-child(3){animation-delay:.4s}'+
      '@keyframes mbP{0%,60%,100%{opacity:.3}20%{opacity:1}}'+
      '@keyframes mbPulse{0%{transform:scale(1);opacity:1}100%{transform:scale(1.6);opacity:0}}'+
      '@media(max-width:480px){#mbT{bottom:200px;right:10px;width:48px;height:48px;font-size:20px}#mbT::before{inset:-3px}#mbT::after{inset:-6px}#mbB{width:calc(100vw-32px);right:10px;bottom:256px;height:380px;max-height:calc(100vh - 280px)}}'+
      '@media(max-width:400px){#mbT{bottom:225px}#mbB{bottom:281px}}'+
      '</style>'+
      '<button id="mbT">💬</button>'+
      '<div id="mbB">'+
        '<div class="mb-h"><h3>🤖 Asistente</h3><p>Master Baez Martial Arts</p></div>'+
        '<div id="mbM"><div class="mb-msg mb-bot">👋 ¡Pregúntame sobre programas, precios, horarios y más!<br><br>👋 Ask me about programs, pricing, schedules and more!</div></div>'+
        '<div id="mbTg"><span></span><span></span><span></span> <span style="margin-left:6px">...</span></div>'+
        '<div class="mb-i"><input id="mbIn" placeholder="Escribe tu pregunta..."><button id="mbS">➤</button></div>'+
      '</div>';
    document.body.appendChild(d);
    document.getElementById('mbT').onclick=function(){
      opened=!opened;
      document.getElementById('mbB').style.display=opened?'flex':'none';
      this.textContent=opened?'✕':'💬';
    };
    document.getElementById('mbS').onclick=handleSend;
    document.getElementById('mbIn').onkeydown=function(e){if(e.key==='Enter')handleSend();};

    // Lee la página UNA VEZ que todo esté cargado (incluye contenido
    // agregado dinámicamente si esperas un poco con setTimeout).
    PAGE_CONTEXT = extractPageContext();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',createUI);
  else createUI();
})();

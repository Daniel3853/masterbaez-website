/* ============================================================
   CHATBOT - Edita las preguntas y respuestas aquí abajo
   Para agregar más, copia el formato:
   { palabras: ["word1","word2"], en: "...", es: "..." }
   ============================================================ */
var MB_QA = [
  { palabras: ["programs","offer","classes","programas","ofrecen","tipos"],
    en: "We offer:\n• Tiny Tigers (ages 4-6)\n• Kids Martial Arts (ages 7-12)\n• Adult Fitness (ages 13+)\n• After School Program (ages 6-12)\n\nStart with 2 FREE classes today!",
    es: "Ofrecemos:\n• Tigres Pequeños (4-6 años)\n• Artes Marciales para Niños (7-12)\n• Fitness para Adultos (13+)\n• Programa Extraescolar (6-12)\n\n¡Empieza con 2 clases GRATIS!" },
  { palabras: ["cost","price","pricing","cuanto","cuesta","precios","costs","dollars","precio","mensualidad","pago"],
    en: "Special offer: 2 FREE classes + 3 months for $149 (includes uniform). 100% money-back guarantee!",
    es: "Oferta especial: 2 clases GRATIS + 3 meses por $149 (incluye uniforme). ¡Garantía de devolución del 100%!" },
  { palabras: ["ages","age","edades","edad","old","years","start","year"],
    en: "We serve ages 4 and up:\n• Tiny Tigers: 4-6\n• Kids: 7-12\n• Teens & Adults: 13+",
    es: "Aceptamos desde los 4 años:\n• Tigres Pequeños: 4-6\n• Niños: 7-12\n• Adolescentes y Adultos: 13+" },
  { palabras: ["location","address","ubicacion","donde","located","ubicados","direccion","griffin"],
    en: "9450 Griffin Rd, Cooper City, FL 33328\nPhone: 954-380-1340",
    es: "9450 Griffin Rd, Cooper City, FL 33328\nTeléfono: 954-380-1340" },
  { palabras: ["phone","telefono","teléfono","call","llamar","contact","contacto","reach"],
    en: "Call us at 954-380-1340 or visit 9450 Griffin Rd, Cooper City, FL",
    es: "Llama al 954-380-1340 o visita 9450 Griffin Rd, Cooper City, FL" },
  { palabras: ["guarantee","garantia","refund","devolucion","money","back","garantía","devolución"],
    en: "100% Money-Back Guarantee: If your child doesn't love their first week, we refund every penny. No questions asked.",
    es: "Garantía de devolución del 100%: Si tu hijo no ama su primera semana, devolvemos cada centavo. Sin preguntas." },
  { palabras: ["trial","free","prueba","gratis","sample","risk","riesgo"],
    en: "You can start with 2 completely FREE classes! After that, 3 months for $149 with uniform included.",
    es: "¡Puedes empezar con 2 clases completamente GRATIS! Después, 3 meses por $149 con uniforme incluido." },
  { palabras: ["adhd","tdah","focus","enfoque","attention","hyper","hiper"],
    en: "Yes! Martial arts is highly effective for kids with ADHD. The structured environment helps channel energy while building focus and self-regulation skills.",
    es: "¡Sí! Las artes marciales son muy efectivas para niños con TDAH. El ambiente estructurado ayuda a canalizar la energía mientras desarrollan enfoque." },
  { palabras: ["shy","timido","tímido","quiet","callado","reserved","reservado","social"],
    en: "Absolutely! Martial arts is one of the best activities for shy children. Our supportive environment helps them come out of their shell at their own pace.",
    es: "¡Absolutamente! Las artes marciales son ideales para niños tímidos. Nuestro ambiente de apoyo les ayuda a salir de su caparazón a su propio ritmo." },
  { palabras: ["difference","different","diferente","why","porque","unique","better","mejor","diferencia"],
    en: "Master Baez combines elite athletic training with character development. Founded in 1991, serving Cooper City for over 30 years. We use modern, gamified approaches and partner with parents.",
    es: "Master Baez combina entrenamiento de élite con desarrollo de carácter. Fundado en 1991, sirviendo a Cooper City por más de 30 años." },
  { palabras: ["beginner","principiante","never","nunca","first","primera","new","nuevo","behind","atras"],
    en: "Every champion starts as a beginner! Our coaches welcome new students at any level. Everyone progresses at their own pace.",
    es: "¡Todo campeón comienza como principiante! Nuestros entrenadores reciben estudiantes de cualquier nivel. Cada uno progresa a su propio ritmo." },
  { palabras: ["violent","violencia","violento","aggressive","agresivo","fighting","peleas"],
    en: "No! Martial arts teaches self-control, discipline and respect. It builds confidence and reduces the likelihood of aggressive behavior.",
    es: "¡No! Las artes marciales enseñan autocontrol, disciplina y respeto. Desarrollan confianza y reducen la agresividad." },
  { palabras: ["results","resultados","time","tiempo","how long","see","ver","change","cambio"],
    en: "Many parents notice changes in confidence within the first few weeks. Real transformation builds over months through our belt system.",
    es: "Muchos padres notan cambios en confianza en las primeras semanas. La transformación real se construye en meses a través de nuestro sistema." },
  { palabras: ["belt","cinturon","cinturón","test","exam","examen","promotion","stripes","franjas"],
    en: "Belt tests every 2-3 months. Students earn stripes as they progress. Minimum 2 days per week recommended.",
    es: "Exámenes de cinturón cada 2-3 meses. Los estudiantes ganan franjas al progresar. Mínimo 2 días por semana." },
  { palabras: ["tiny","tigers","tigres","pequenos","pequeños","age 4","age 5","age 6"],
    en: "Tiny Tigers (ages 4-6): builds motor skills, social interaction, and a love for physical activity in a fun environment.",
    es: "Tigres Pequeños (4-6 años): desarrolla habilidades motoras, interacción social y amor por la actividad física." },
  { palabras: ["kids","children","ninos","niños","child","hijo","hija","kids martial"],
    en: "Kids Martial Arts (ages 7-12): advanced technique, leadership development, and character building.",
    es: "Artes Marciales para Niños (7-12 años): técnica avanzada, liderazgo y formación de carácter." },
  { palabras: ["adult","adults","adultos","teen","teens","fitness","adulto","adolescentes"],
    en: "Adult Fitness (ages 13+): elite training in martial arts, strength conditioning, and leadership.",
    es: "Fitness para Adultos (13+): entrenamiento de élite en artes marciales, condición física y liderazgo." },
  { palabras: ["after","school","extraescolar","aftercare"],
    en: "After School Program (ages 6-12): structured care combining martial arts and character development.",
    es: "Programa Extraescolar (6-12 años): cuidado estructurado combinando artes marciales y desarrollo personal." },
  { palabras: ["offer","special","149","promotion","descuento","especial","oferta","deal"],
    en: "SPECIAL OFFER: 2 FREE classes + 3 months for $149! Includes uniform. 100% money-back guarantee.",
    es: "OFERTA ESPECIAL: 2 clases GRATIS + 3 meses por $149. Incluye uniforme. ¡Garantía de devolución!" },
  { palabras: ["register","inscribir","sign up","enroll","join","unirse","empezar","comenzar","start today"],
    en: "Click 'Start Today' on our website or call 954-380-1340 to reserve your spot!",
    es: "¡Haz clic en 'Empieza Hoy' o llama al 954-380-1340 para reservar!" },
  { palabras: ["testimonials","testimonios","reviews","resenas","reseñas","opiniones","google","rating"],
    en: "4.9/5 stars with over 100 Google reviews. Parents love the transformation in their children!",
    es: "4.9/5 estrellas con más de 100 reseñas en Google. ¡Los padres aman la transformación de sus hijos!" },
  { palabras: ["bullying","acoso","bully","bullies","self-defense","defensa personal"],
    en: "We teach children to recognize, avoid and respond to bullying with confidence. Our program builds awareness and self-defense skills.",
    es: "Enseñamos a los niños a reconocer, evitar y responder al acoso con confianza. Desarrollamos conciencia y defensa personal." },
  { palabras: ["hours","horarios","schedule","horario","open","abierto","when","cuando","days","dias"],
    en: "Please call 954-380-1340 for current class schedules. We have classes throughout the week for all ages.",
    es: "Llama al 954-380-1340 para horarios actuales. Tenemos clases durante la semana para todas las edades." },
  { palabras: ["owner","founder","fundador","baez","master","grandmaster","daniel","instructor"],
    en: "Founded in 1991 by Grand Master Daniel Baez. Over 30 years helping thousands of students build confidence and leadership.",
    es: "Fundado en 1991 por el Gran Maestro Daniel Baez. Más de 30 años ayudando a miles de estudiantes." }
];

/* ============================================================
   No edites nada de aquí en adelante
   ============================================================ */
(function(){
  var lang = 'en', opened = false;

  function detectLang(t){
    var w = ['hola','gracias','favor','puedes','necesito','qué','eres','hijo','hija','niño','niña','clases','programas','precios','horarios','dirección','teléfono','artes','marciales','tímido','tdah','confianza','disciplina','cinturón','garantía','devolución','opiniones','reseñas','comenzar','empezar','inscribir','registrar','prueba','gratis','uniforme','pago','mensualidad','cuánto','cuál','dónde','cómo','ubicados','oferta','extraescolar','pequeños','tigres','acoso','violencia','atrás','resultados','horario','abierto','fundador','dueño','reseña','pembroke','pines','davie','plantation','weston','saber','palabras','tipos','edad','años'];
    t = t.toLowerCase();
    for(var i=0;i<w.length;i++){if(t.indexOf(w[i])!==-1) return 'es';}
    return 'en';
  }

  function findAnswer(input){
    var q = input.toLowerCase().replace(/[¿?¡!.,;:]/g,'').trim();
    var best = null, bestScore = 0;

    for(var i=0;i<MB_QA.length;i++){
      var score = 0;
      for(var j=0;j<MB_QA[i].palabras.length;j++){
        var p = MB_QA[i].palabras[j].toLowerCase();
        if(q.indexOf(p) !== -1) score++;
      }
      if(score > bestScore){ bestScore = score; best = MB_QA[i]; }
    }

    if(best && bestScore > 0) return lang==='es'?best.es:best.en;
    return null;
  }

  function handleSend(){
    var input = document.getElementById('mbInput');
    var q = input.value.trim();
    if(!q) return;
    input.value = '';
    lang = detectLang(q);
    addMessage(q, true, true);
    document.getElementById('mbTyping').style.display='flex';
    setTimeout(function(){
      document.getElementById('mbTyping').style.display='none';
      var a = findAnswer(q);
      if(a) addMessage(a, false, false);
      else addMessage(
        lang==='es'?'No encontré esa información. Llámanos al <strong>954-380-1340</strong> o <a href="#trial" style="color:#a855f7;">prueba una clase gratis</a>.':
        'I couldn\'t find that. Call us at <strong>954-380-1340</strong> or <a href="#trial" style="color:#a855f7;">try a free class</a>.',
        false, false);
    }, 400+Math.random()*300);
  }

  function addMessage(text, isUser){
    var chat = document.getElementById('mbChatMessages');
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
      '#mbT{position:fixed;bottom:24px;right:24px;z-index:99998;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#6c5ce7,#a855f7);border:none;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 20px rgba(108,92,231,0.4);transition:transform .2s;display:flex;align-items:center;justify-content:center}'+
      '#mbT:hover{transform:scale(1.05)}'+
      '#mbB{position:fixed;bottom:90px;right:24px;z-index:99997;width:360px;height:520px;max-height:calc(100vh-120px);background:#13132a;border:1px solid #2a2a50;border-radius:16px;overflow:hidden;display:none;flex-direction:column;box-shadow:0 8px 40px rgba(0,0,0,0.5)}'+
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
      '@media(max-width:480px){#mbB{width:calc(100vw-32px);right:16px;bottom:80px}}'+
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
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',createUI);
  else createUI();
})();

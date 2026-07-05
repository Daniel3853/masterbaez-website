(function(){
  var kb = [];
  var lang = 'en';
  var opened = false;
  var messages = [];

  function detectLang(text){
    var esWords = ['hola','gracias','por','favor','puedes','ayudar','querría','necesito','quién','cómo','cuándo','dónde','cuánto','cuál','qué','eres','tienes','hijo','hija','niño','niña','clases','programas','precios','horarios','dirección','teléfono','artes','marciales','cooper','city','tímido','tda','tdah','confianza','disciplina','cinturón','garantía','devolución','opiniones','reseñas','comenzar','empezar','inscribir','registrar','prueba','gratis','uniforme','pago','mensualidad','clase'];
    text = text.toLowerCase();
    var count = esWords.some(function(w){ return text.indexOf(w) !== -1; });
    if(count) return 'es';
    return 'en';
  }

  function t(en, es){
    return lang === 'es' ? es : en;
  }

  var STRINGS = {
    title: { en: 'AI Assistant', es: 'Asistente IA' },
    subtitle: { en: 'Ask me anything about Master Baez', es: 'Pregúntame sobre Master Baez' },
    placeholder: { en: 'Type your question...', es: 'Escribe tu pregunta...' },
    greeting: { en: 'Hi! I\'m the AI assistant for Master Baez Martial Arts. I can help you with programs, pricing, schedules, and more. What would you like to know?', es: '¡Hola! Soy el asistente IA de Master Baez Martial Arts. Puedo ayudarte con programas, precios, horarios y más. ¿Qué te gustaría saber?' },
    notFound: { en: 'I\'m not sure about that. Would you like to call us at <strong>954-380-1340</strong> or <a href="#trial" style="color:#a855f7;">start a free trial</a>?', es: 'No estoy seguro de eso. ¿Te gustaría llamarnos al <strong>954-380-1340</strong> o <a href="#trial" style="color:#a855f7;">empezar una prueba gratis</a>?' },
    suggestions: { en: ['What programs do you offer?', 'How much does it cost?', 'What ages do you serve?', 'Where are you located?', 'Do you have a money-back guarantee?'], es: ['¿Qué programas ofrecen?', '¿Cuánto cuesta?', '¿Qué edades aceptan?', '¿Dónde están ubicados?', '¿Tienen garantía de devolución?'] },
    typing: { en: 'Thinking...', es: 'Pensando...' },
    thanks: { en: 'You\'re welcome! Anything else I can help with? 😊', es: '¡De nada! ¿Algo más en lo que pueda ayudar? 😊' }
  };

  function getBestAnswer(q){
    q = q.toLowerCase().replace(/[¿?¡!,.]/g,'').trim();
    var best = null;
    var bestScore = 0;

    var qWords = q.split(/\s+/).filter(function(w){ return w.length > 2; });

    kb.forEach(function(item){
      var keywords = item.k.join(' ');
      var score = 0;
      qWords.forEach(function(w){
        if(keywords.indexOf(w) !== -1) score++;
        if(item.en.toLowerCase().indexOf(w) !== -1) score += 0.5;
        if(item.es && item.es.toLowerCase().indexOf(w) !== -1) score += 0.5;
      });
      if(score > bestScore){
        bestScore = score;
        best = item;
      }
    });

    var threshold = 1;
    if(best && bestScore >= threshold){
      return lang === 'es' && best.es ? best.es : best.en;
    }

    return null;
  }

  function buildKB(){
    var content = window.__MB_CONTENT || [];
    content.forEach(function(item){
      var key = item.key || '';
      var en = item.en || '';
      var es = item.es || '';
      var keywords = [];
      var parts = key.split('_');
      parts.forEach(function(p){ if(p.length > 2) keywords.push(p); });
      (en+' '+es).toLowerCase().split(/\s+/).forEach(function(w){
        w = w.replace(/<[^>]*>/g,'').replace(/[^a-záéíóúñ]/g,'');
        if(w.length > 3 && keywords.indexOf(w) === -1) keywords.push(w);
      });
      ['programs','programas','pricing','precios','cost','costo','price','precio','ages','edades','location','ubicación','address','dirección','phone','teléfono','hours','horarios','schedule','guarantee','garantía','refund','devolución','trial','prueba','gratis','free','class','clase','belt','cinturón','confidence','confianza','discipline','disciplina','adhd','tdah','shy','tímido','bullying','acoso','self-defense','defensa','personal','testimonials','testimonios','review','reseña','beginner','principiante','start','empezar','register','inscribir','uniform','uniforme','tour','visita','enroll','inscripción','black','belt','negro','master','baez','cooper','city','florida','pembroke','pines','davie','plantation'].forEach(function(w){
        if(keywords.indexOf(w) === -1 && (en.toLowerCase().indexOf(w) !== -1 || (es && es.toLowerCase().indexOf(w) !== -1))) keywords.push(w);
      });
      kb.push({ k: keywords, en: en, es: es, key: key });
    });
  }

  function getStaticAnswer(q){
    var l = q.toLowerCase();
    if(l.indexOf('hello') !== -1 || l.indexOf('hi ') !== -1 || l.indexOf('hey') !== -1 || l.indexOf('hola') !== -1 || l.indexOf('buenas') !== -1) return STRINGS.greeting[lang];
    if(l.indexOf('thank') !== -1 || l.indexOf('gracias') !== -1 || l.indexOf('thanks') !== -1) return STRINGS.thanks[lang];
    return null;
  }

  function generateAnswer(q){
    var staticA = getStaticAnswer(q);
    if(staticA) return staticA;

    var answer = getBestAnswer(q);
    if(answer){
      answer = answer.replace(/<[^>]*>/g, '').trim();
      if(answer.length > 300) answer = answer.substring(0, 300) + '...';
      return answer;
    }

    return STRINGS.notFound[lang];
  }

  function addMessage(text, isUser){
    var chat = document.getElementById('mbChatMessages');
    if(!chat) return;
    var msg = document.createElement('div');
    msg.className = 'mb-msg ' + (isUser ? 'mb-user' : 'mb-bot');
    msg.innerHTML = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  }

  function handleSend(){
    var input = document.getElementById('mbInput');
    var q = input.value.trim();
    if(!q) return;
    input.value = '';

    lang = detectLang(q);
    addMessage('<span style="color:#8a8aaa;">You:</span> ' + escapeHtml(q), true);

    var typing = document.getElementById('mbTyping');
    if(typing) typing.style.display = 'flex';

    setTimeout(function(){
      if(typing) typing.style.display = 'none';
      var answer = generateAnswer(q);
      addMessage(answer, false);
    }, 400 + Math.random() * 600);
  }

  function escapeHtml(t){
    var d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
  }

  function createUI(){
    var existing = document.getElementById('mbChatWidget');
    if(existing) return;

    var container = document.createElement('div');
    container.id = 'mbChatWidget';
    container.innerHTML =
      '<style>' +
      '#mbChatToggle{' +
      'position:fixed;bottom:24px;right:24px;z-index:99998;' +
      'width:56px;height:56px;border-radius:50%;' +
      'background:linear-gradient(135deg,#6c5ce7,#a855f7);' +
      'border:none;color:#fff;font-size:24px;cursor:pointer;' +
      'box-shadow:0 4px 20px rgba(108,92,231,0.4);' +
      'transition:transform 0.2s,box-shadow 0.2s;' +
      'display:flex;align-items:center;justify-content:center;' +
      '}' +
      '#mbChatToggle:hover{transform:scale(1.05);box-shadow:0 6px 28px rgba(108,92,231,0.55);}' +
      '#mbChatBox{' +
      'position:fixed;bottom:90px;right:24px;z-index:99997;' +
      'width:360px;height:520px;max-height:calc(100vh - 120px);' +
      'background:#13132a;border:1px solid #2a2a50;' +
      'border-radius:16px;overflow:hidden;' +
      'display:none;flex-direction:column;' +
      'box-shadow:0 8px 40px rgba(0,0,0,0.5);' +
      '}' +
      '.mb-header{' +
      'background:linear-gradient(135deg,#1a1a3a,#23234d);' +
      'padding:16px 20px;border-bottom:1px solid #2a2a50;' +
      '}' +
      '.mb-header h3{margin:0;font-size:16px;font-weight:700;color:#e0e0f0;}' +
      '.mb-header p{margin:2px 0 0;font-size:12px;color:#6b6b8b;}' +
      '#mbChatMessages{' +
      'flex:1;overflow-y:auto;padding:16px 20px;' +
      'scrollbar-width:thin;scrollbar-color:#2a2a50 transparent;' +
      '}' +
      '#mbChatMessages::-webkit-scrollbar{width:4px;}' +
      '#mbChatMessages::-webkit-scrollbar-thumb{background:#2a2a50;border-radius:4px;}' +
      '.mb-msg{margin-bottom:12px;line-height:1.5;font-size:13.5px;}' +
      '.mb-user{text-align:right;color:#a78bfa;}' +
      '.mb-bot{color:#c0c0d0;}' +
      '.mb-bot a{color:#a855f7;}' +
      '.mb-input-area{' +
      'padding:12px 16px;border-top:1px solid #2a2a50;' +
      'display:flex;gap:8px;background:#0d0d1a;' +
      '}' +
      '#mbInput{' +
      'flex:1;padding:10px 14px;border-radius:100px;border:1px solid #2a2a50;' +
      'background:#1a1a30;color:#e0e0f0;font-size:13px;outline:none;' +
      '}' +
      '#mbInput:focus{border-color:#6c5ce7;}' +
      '#mbInput::placeholder{color:#4a4a6a;}' +
      '#mbSend{' +
      'width:38px;height:38px;border-radius:50%;border:none;' +
      'background:linear-gradient(135deg,#6c5ce7,#a855f7);' +
      'color:#fff;font-size:16px;cursor:pointer;flex-shrink:0;' +
      '}' +
      '#mbSend:hover{opacity:0.9;}' +
      '#mbTyping{display:none;align-items:center;gap:4px;padding:0 20px 8px;font-size:12px;color:#6b6b8b;}' +
      '#mbTyping span{width:6px;height:6px;border-radius:50%;background:#6b6b8b;animation:mbPulse 1.2s infinite;}' +
      '#mbTyping span:nth-child(2){animation-delay:0.2s;}' +
      '#mbTyping span:nth-child(3){animation-delay:0.4s;}' +
      '@keyframes mbPulse{0%,60%,100%{opacity:0.3}20%{opacity:1}}' +
      '.mb-suggestions{display:flex;flex-wrap:wrap;gap:6px;padding:4px 20px 12px;}' +
      '.mb-suggestions button{' +
      'padding:5px 12px;border-radius:100px;border:1px solid #2a2a50;' +
      'background:transparent;color:#7a7a9a;font-size:11px;cursor:pointer;' +
      'transition:all 0.2s;white-space:nowrap;' +
      '}' +
      '.mb-suggestions button:hover{border-color:#6c5ce7;color:#a855f7;}' +
      '@media(max-width:480px){#mbChatBox{width:calc(100vw - 32px);right:16px;bottom:80px;}}' +
      '</style>' +
      '<button id="mbChatToggle" aria-label="Toggle AI chat">💬</button>' +
      '<div id="mbChatBox">' +
        '<div class="mb-header">' +
          '<h3>' + STRINGS.title.en + '</h3>' +
          '<p>' + STRINGS.subtitle.en + '</p>' +
        '</div>' +
        '<div id="mbChatMessages">' +
          '<div class="mb-msg mb-bot">' + STRINGS.greeting.en + '</div>' +
        '</div>' +
        '<div id="mbTyping"><span></span><span></span><span></span> <span style="margin-left:6px;">' + STRINGS.typing.en + '</span></div>' +
        '<div class="mb-suggestions" id="mbSuggestions"></div>' +
        '<div class="mb-input-area">' +
          '<input id="mbInput" type="text" placeholder="' + STRINGS.placeholder.en + '" autocomplete="off">' +
          '<button id="mbSend">➤</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(container);

    var toggle = document.getElementById('mbChatToggle');
    var box = document.getElementById('mbChatBox');
    var input = document.getElementById('mbInput');
    var send = document.getElementById('mbSend');
    var suggestions = document.getElementById('mbSuggestions');

    toggle.onclick = function(){
      opened = !opened;
      box.style.display = opened ? 'flex' : 'none';
      toggle.textContent = opened ? '✕' : '💬';
      if(opened){
        lang = 'en';
        if(suggestions.children.length === 0){
          STRINGS.suggestions[lang].forEach(function(s){
            var btn = document.createElement('button');
            btn.textContent = s;
            btn.onclick = function(){ input.value = s; handleSend(); };
            suggestions.appendChild(btn);
          });
        }
      }
    };

    send.onclick = handleSend;
    input.onkeydown = function(e){ if(e.key === 'Enter') handleSend(); };

    setTimeout(function(){
      kb = [];
      buildKB();
    }, 500);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', createUI);
  } else {
    createUI();
  }
})();

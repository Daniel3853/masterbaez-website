(function(){
  var kb = [];
  var lang = 'en';
  var opened = false;

  var FAQ_PAIRS = {
    faq_q1: 'faq_a1', faq_q2: 'faq_a2', faq_q3: 'faq_a3',
    faq_q4: 'faq_a4', faq_q5: 'faq_a5', faq_q6: 'faq_a6',
    faq_q7: 'faq_a7', faq_q8: 'faq_a8'
  };

  var esWords = ['hola','gracias','por','favor','puedes','ayudar','querría','necesito','quién','cómo','cuándo','dónde','cuánto','cuál','qué','eres','tienes','hijo','hija','niño','niña','clases','programas','precios','horarios','dirección','teléfono','artes','marciales','cooper','city','tímido','tdah','confianza','disciplina','cinturón','garantía','devolución','opiniones','reseñas','comenzar','empezar','inscribir','registrar','prueba','gratis','uniforme','pago','mensualidad'];

  function detectLang(text){
    text = text.toLowerCase();
    for(var i=0;i<esWords.length;i++){
      if(text.indexOf(esWords[i])!==-1) return 'es';
    }
    return 'en';
  }

  var LANG = {
    title: {en:'AI Assistant',es:'Asistente IA'},
    subtitle: {en:'Ask me about Master Baez',es:'Pregúntame sobre Master Baez'},
    placeholder: {en:'Ask a question...',es:'Haz una pregunta...'},
    greeting: {en:'👋 Hi! I\'m the AI assistant for <strong>Master Baez Martial Arts</strong>. I can answer questions about programs, pricing, schedules, and more. What would you like to know?',es:'👋 ¡Hola! Soy el asistente IA de <strong>Master Baez Martial Arts</strong>. Puedo responder preguntas sobre programas, precios, horarios y más. ¿Qué te gustaría saber?'},
    notFound: {en:'I\'m not sure about that. Would you like to call us at <strong>954-380-1340</strong> or <a href="#trial" style="color:#a855f7;">start a free trial</a>?',es:'No estoy seguro. ¿Te gustaría llamarnos al <strong>954-380-1340</strong> o <a href="#trial" style="color:#a855f7;">probar una clase gratis</a>?'},
    typing: {en:'Thinking...',es:'Pensando...'},
    thanks: {en:'You\'re welcome! 😊',es:'¡De nada! 😊'}
  };

  var FAQ_QUESTIONS = [
    {q:{en:'What programs do you offer?',es:'¿Qué programas ofrecen?'},a:'faq_a3'},
    {q:{en:'What ages do you serve?',es:'¿Qué edades aceptan?'},a:'faq_a3'},
    {q:{en:'How much does it cost?',es:'¿Cuánto cuesta?'},a:'faq_a5'},
    {q:{en:'Where are you located?',es:'¿Dónde están ubicados?'},a:'loc'},
    {q:{en:'Is there a money-back guarantee?',es:'¿Tienen garantía?'},a:'faq_a5'},
    {q:{en:'Can martial arts help with ADHD?',es:'¿Ayuda con TDAH?'},a:'faq_a2'},
    {q:{en:'Is it good for shy kids?',es:'¿Es bueno para niños tímidos?'},a:'faq_a1'},
    {q:{en:'How is Master Baez different?',es:'¿Cómo es diferente?'},a:'faq_a4'},
    {q:{en:'When can I see results?',es:'¿Cuándo veo resultados?'},a:'faq_a6'},
    {q:{en:'My child has never done martial arts',es:'Mi hijo nunca ha hecho artes marciales'},a:'faq_a7'},
    {q:{en:'Is martial arts violent?',es:'¿Son violentas las artes marciales?'},a:'faq_a8'},
    {q:{en:'What is the Tiny Tigers program?',es:'¿Qué es Tigres Pequeños?'},a:'prog_tiny'},
    {q:{en:'Do you have adult classes?',es:'¿Tienen clases para adultos?'},a:'prog_adult'},
    {q:{en:'What is the after school program?',es:'¿Qué es el programa extraescolar?'},a:'prog_after'},
    {q:{en:'How do belt tests work?',es:'¿Cómo funcionan los exámenes?'},a:'belt_info'},
    {q:{en:'What is the special offer?',es:'¿Cuál es la oferta especial?'},a:'offer_info'}
  ];

  var allContent = {};

  function buildKB(data){
    data.forEach(function(item){
      var key = item.key || '';
      allContent[key] = {en: item.en || '', es: item.es || ''};
      var en = item.en || '';
      var es = item.es || '';
      var words = {};
      (en+' '+es).toLowerCase().split(/\s+/).forEach(function(w){
        w = w.replace(/<[^>]*>/g,'').replace(/[^a-z0-9áéíóúñ]/g,'');
        if(w.length > 2) words[w] = true;
      });
      kb.push({key:key,words:words,en:en,es:es, len: en.length + (es?es.length:0)});
    });
  }

  function getEntry(key){
    return allContent[key] || null;
  }

  function getStaticAnswer(q){
    var l = q.toLowerCase().trim();
    if(l==='hello'||l==='hi'||l==='hey'||l==='hola'||l==='buenas') return LANG.greeting[lang];
    if(l.indexOf('thank')!==-1||l.indexOf('gracias')!==-1||l.indexOf('thanks')!==-1) return LANG.thanks[lang];
    return null;
  }

  function textMatch(text, words){
    var t = text.toLowerCase().replace(/<[^>]*>/g,'');
    var count = 0;
    for(var w in words){
      if(words.hasOwnProperty(w) && t.indexOf(w)!==-1) count++;
    }
    return count;
  }

  function generateAnswer(input){
    var s = getStaticAnswer(input);
    if(s) return s;

    var q = input.toLowerCase().replace(/[¿?¡!.,]/g,'').trim();
    var qWords = {};
    q.split(/\s+/).forEach(function(w){
      w = w.replace(/[^a-z0-9áéíóúñ]/g,'');
      if(w.length>2) qWords[w]=true;
    });

    // First: try FAQ question matching
    var bestFAQ = null; var bestFAQScore = 0;
    FAQ_QUESTIONS.forEach(function(faq){
      var faqText = faq.q[lang].toLowerCase();
      var score = textMatch(faqText, qWords);
      if(score > bestFAQScore){ bestFAQScore = score; bestFAQ = faq; }
    });
    if(bestFAQ && bestFAQScore >= 2){
      if(bestFAQ.a === 'loc'){
        var addr = getEntry('hero_address');
        var phone = getEntry('hero_phone');
        if(addr) return lang==='es'?addr.es:addr.en;
      }
      if(bestFAQ.a === 'prog_tiny'){
        var name = getEntry('prog_1_name');
        var desc = getEntry('prog_1_desc');
        var age = getEntry('prog_1_age');
        if(desc){
          var r = (name?name[lang]+': ':'') + (desc?desc[lang]:'');
          if(age) r += ' ('+age[lang]+')';
          return r;
        }
      }
      if(bestFAQ.a === 'prog_adult'){
        var name = getEntry('prog_3_name');
        var desc = getEntry('prog_3_desc');
        var age = getEntry('prog_3_age');
        if(desc){
          var r = (name?name[lang]+': ':'') + (desc?desc[lang]:'');
          if(age) r += ' ('+age[lang]+')';
          return r;
        }
      }
      if(bestFAQ.a === 'prog_after'){
        var name = getEntry('prog_4_name');
        var desc = getEntry('prog_4_desc');
        var age = getEntry('prog_4_age');
        if(desc){
          var r = (name?name[lang]+': ':'') + (desc?desc[lang]:'');
          if(age) r += ' ('+age[lang]+')';
          return r;
        }
      }
      if(bestFAQ.a === 'belt_info'){
        var d1 = getEntry('belt_detail_1');
        var d2 = getEntry('belt_detail_2');
        var d3 = getEntry('belt_detail_3');
        var r = '';
        if(d1) r += '• ' + d1[lang].replace(/<[^>]*>/g,'') + '\n';
        if(d2) r += '• ' + d2[lang].replace(/<[^>]*>/g,'') + '\n';
        if(d3) r += '• ' + d3[lang].replace(/<[^>]*>/g,'');
        return r || LANG.notFound[lang];
      }
      if(bestFAQ.a === 'offer_info'){
        var offer = getEntry('offer_title');
        var items = [getEntry('offer_1'),getEntry('offer_2'),getEntry('offer_3'),getEntry('offer_4')];
        var guarantee = getEntry('offer_guarantee');
        var r = offer?offer[lang]+'\n':'';
        items.forEach(function(it){ if(it) r += '• '+it[lang]+'\n'; });
        if(guarantee) r += '\n'+guarantee[lang];
        return r;
      }
      var faqEntry = getEntry(bestFAQ.a);
      if(faqEntry) return faqEntry[lang];
    }

    // Second: search content by keywords
    var best = null; var bestScore = 0;
    kb.forEach(function(item){
      var score = 0;
      for(var w in qWords){
        if(qWords.hasOwnProperty(w) && item.words[w]) score++;
      }
      if(score > bestScore){ bestScore = score; best = item; }
      else if(score === bestScore && best && item.len > best.len){ best = item; }
    });

    if(best && bestScore >= 2){
      // Prefer answer over question for FAQs
      var answerKey = FAQ_PAIRS[best.key];
      if(answerKey){
        var ans = getEntry(answerKey);
        if(ans) return ans[lang];
      }
      // Prefer descriptions over titles
      if(best.key.indexOf('_title')!==-1 || best.key.indexOf('_name')!==-1 || best.key.indexOf('_label')!==-1 || best.key.indexOf('_tag')!==-1 || best.key.indexOf('_level')!==-1 || best.key.indexOf('_time')!==-1 || best.key.indexOf('_age')!==-1){
        var betterKey = best.key.replace('_title','_desc').replace('_name','_desc').replace('_label','_desc').replace('_tag','_desc');
        if(betterKey !== best.key){
          var better = getEntry(betterKey);
          if(better) return better[lang];
        }
      }
      return best[lang];
    }

    return LANG.notFound[lang];
  }

  function addMessage(text, isUser){
    var chat = document.getElementById('mbChatMessages');
    if(!chat) return;
    var msg = document.createElement('div');
    msg.className = 'mb-msg ' + (isUser?'mb-user':'mb-bot');
    if(isUser) msg.innerHTML = '<span style="color:#8a8aaa;">You:</span> ' + escapeHtml(text);
    else msg.innerHTML = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  }

  function handleSend(){
    var input = document.getElementById('mbInput');
    var q = input.value.trim();
    if(!q) return;
    input.value = '';
    lang = detectLang(q);
    addMessage(q, true);
    var typing = document.getElementById('mbTyping');
    if(typing) typing.style.display='flex';
    setTimeout(function(){
      if(typing) typing.style.display='none';
      addMessage(generateAnswer(q), false);
    }, 300+Math.random()*400);
  }

  function escapeHtml(t){
    var d = document.createElement('div');
    d.textContent = t; return d.innerHTML;
  }

  function createUI(){
    var existing = document.getElementById('mbChatWidget');
    if(existing) return;

    var div = document.createElement('div');
    div.id = 'mbChatWidget';
    div.innerHTML = '<style>'+
    '#mbChatToggle{position:fixed;bottom:24px;right:24px;z-index:99998;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#6c5ce7,#a855f7);border:none;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 20px rgba(108,92,231,0.4);transition:transform .2s,box-shadow .2s;display:flex;align-items:center;justify-content:center}'+
    '#mbChatToggle:hover{transform:scale(1.05);box-shadow:0 6px 28px rgba(108,92,231,0.55)}'+
    '#mbChatBox{position:fixed;bottom:90px;right:24px;z-index:99997;width:360px;height:520px;max-height:calc(100vh - 120px);background:#13132a;border:1px solid #2a2a50;border-radius:16px;overflow:hidden;display:none;flex-direction:column;box-shadow:0 8px 40px rgba(0,0,0,0.5)}'+
    '.mb-header{background:linear-gradient(135deg,#1a1a3a,#23234d);padding:16px 20px;border-bottom:1px solid #2a2a50}'+
    '.mb-header h3{margin:0;font-size:16px;font-weight:700;color:#e0e0f0}'+
    '.mb-header p{margin:2px 0 0;font-size:12px;color:#6b6b8b}'+
    '#mbChatMessages{flex:1;overflow-y:auto;padding:16px 20px;scrollbar-width:thin;scrollbar-color:#2a2a50 transparent}'+
    '#mbChatMessages::-webkit-scrollbar{width:4px}'+
    '#mbChatMessages::-webkit-scrollbar-thumb{background:#2a2a50;border-radius:4px}'+
    '.mb-msg{margin-bottom:12px;line-height:1.5;font-size:13.5px;white-space:pre-wrap}'+
    '.mb-user{text-align:right;color:#a78bfa}'+
    '.mb-bot{color:#c0c0d0}'+
    '.mb-bot a{color:#a855f7}'+
    '.mb-input-area{padding:12px 16px;border-top:1px solid #2a2a50;display:flex;gap:8px;background:#0d0d1a}'+
    '#mbInput{flex:1;padding:10px 14px;border-radius:100px;border:1px solid #2a2a50;background:#1a1a30;color:#e0e0f0;font-size:13px;outline:none}'+
    '#mbInput:focus{border-color:#6c5ce7}'+
    '#mbInput::placeholder{color:#4a4a6a}'+
    '#mbSend{width:38px;height:38px;border-radius:50%;border:none;background:linear-gradient(135deg,#6c5ce7,#a855f7);color:#fff;font-size:16px;cursor:pointer;flex-shrink:0}'+
    '#mbSend:hover{opacity:.9}'+
    '#mbTyping{display:none;align-items:center;gap:4px;padding:0 20px 8px;font-size:12px;color:#6b6b8b}'+
    '#mbTyping span{width:6px;height:6px;border-radius:50%;background:#6b6b8b;animation:mbPulse 1.2s infinite}'+
    '#mbTyping span:nth-child(2){animation-delay:.2s}'+
    '#mbTyping span:nth-child(3){animation-delay:.4s}'+
    '@keyframes mbPulse{0%,60%,100%{opacity:.3}20%{opacity:1}}'+
    '@media(max-width:480px){#mbChatBox{width:calc(100vw - 32px);right:16px;bottom:80px}}'+
    '</style>'+
    '<button id="mbChatToggle">💬</button>'+
    '<div id="mbChatBox">'+
      '<div class="mb-header"><h3>'+LANG.title.en+'</h3><p>'+LANG.subtitle.en+'</p></div>'+
      '<div id="mbChatMessages"><div class="mb-msg mb-bot">'+LANG.greeting.en+'</div></div>'+
      '<div id="mbTyping"><span></span><span></span><span></span> <span style="margin-left:6px">'+LANG.typing.en+'</span></div>'+
      '<div class="mb-input-area"><input id="mbInput" placeholder="'+LANG.placeholder.en+'"><button id="mbSend">➤</button></div>'+
    '</div>';
    document.body.appendChild(div);

    var toggle = document.getElementById('mbChatToggle');
    var box = document.getElementById('mbChatBox');
    var input = document.getElementById('mbInput');
    var send = document.getElementById('mbSend');

    toggle.onclick = function(){
      opened = !opened;
      box.style.display = opened?'flex':'none';
      toggle.textContent = opened?'✕':'💬';
    };
    send.onclick = handleSend;
    input.onkeydown = function(e){ if(e.key==='Enter') handleSend(); };

    fetch('data/content.json').then(function(r){return r.json();}).then(function(d){
      if(d && d.texts) buildKB(d.texts);
    }).catch(function(){});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',createUI);
  else createUI();
})();

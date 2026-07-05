(function(){
  var lang = 'en';
  var opened = false;

  function detectLang(t){
    var w = ['hola','gracias','favor','puedes','querría','necesito','qué','eres','hijo','hija','niño','niña','clases','programas','precios','horarios','dirección','teléfono','artes','marciales','tímido','tdah','confianza','disciplina','cinturón','garantía','devolución','opiniones','reseñas','comenzar','empezar','inscribir','registrar','prueba','gratis','uniforme','pago','mensualidad','cuánto','cuál','dónde','cómo','ubicados','oferta','extraescolar','pequeños','tigres','acoso'];
    t = t.toLowerCase();
    for(var i=0;i<w.length;i++){ if(t.indexOf(w[i])!==-1) return 'es'; }
    return 'en';
  }

  // Load data
  function findAnswer(input){
    var data = window.__CHATBOT_DATA || [];
    var q = input.toLowerCase().replace(/[¿?¡!.,]/g,'').trim();
    var best = null, bestScore = 0;

    for(var i=0;i<data.length;i++){
      var score = 0;
      for(var j=0;j<data[i].q.length;j++){
        if(q.indexOf(data[i].q[j]) !== -1) score++;
      }
      if(score > bestScore){ bestScore = score; best = data[i]; }
    }

    if(best && bestScore > 0) return best;
    return null;
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

  function escapeHtml(t){ var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

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
      var answer = findAnswer(q);
      if(answer){
        addMessage(lang==='es'?answer.es:answer.en, false);
      } else {
        addMessage(lang==='es'?
          'No estoy seguro de eso. ¿Te gustaría llamarnos al <strong>954-380-1340</strong> o <a href="#trial" style="color:#a855f7;">probar una clase gratis</a>?' :
          'I\'m not sure about that. Would you like to call us at <strong>954-380-1340</strong> or <a href="#trial" style="color:#a855f7;">start a free trial</a>?',
          false);
      }
    }, 300+Math.random()*400);
  }

  function createUI(){
    if(document.getElementById('mbChatWidget')) return;

    var div = document.createElement('div');
    div.id = 'mbChatWidget';
    div.innerHTML =
      '<style>' +
      '#mbChatToggle{position:fixed;bottom:24px;right:24px;z-index:99998;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#6c5ce7,#a855f7);border:none;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 20px rgba(108,92,231,0.4);transition:transform .2s,box-shadow .2s;display:flex;align-items:center;justify-content:center}' +
      '#mbChatToggle:hover{transform:scale(1.05);box-shadow:0 6px 28px rgba(108,92,231,0.55)}' +
      '#mbChatBox{position:fixed;bottom:90px;right:24px;z-index:99997;width:360px;height:520px;max-height:calc(100vh - 120px);background:#13132a;border:1px solid #2a2a50;border-radius:16px;overflow:hidden;display:none;flex-direction:column;box-shadow:0 8px 40px rgba(0,0,0,0.5)}' +
      '.mb-header{background:linear-gradient(135deg,#1a1a3a,#23234d);padding:16px 20px;border-bottom:1px solid #2a2a50}' +
      '.mb-header h3{margin:0;font-size:16px;font-weight:700;color:#e0e0f0}' +
      '.mb-header p{margin:2px 0 0;font-size:12px;color:#6b6b8b}' +
      '#mbChatMessages{flex:1;overflow-y:auto;padding:16px 20px;scrollbar-width:thin;scrollbar-color:#2a2a50 transparent}' +
      '#mbChatMessages::-webkit-scrollbar{width:4px}' +
      '#mbChatMessages::-webkit-scrollbar-thumb{background:#2a2a50;border-radius:4px}' +
      '.mb-msg{margin-bottom:12px;line-height:1.5;font-size:13.5px;white-space:pre-wrap}' +
      '.mb-user{text-align:right;color:#a78bfa}' +
      '.mb-bot{color:#c0c0d0}' +
      '.mb-bot a{color:#a855f7}' +
      '.mb-input-area{padding:12px 16px;border-top:1px solid #2a2a50;display:flex;gap:8px;background:#0d0d1a}' +
      '#mbInput{flex:1;padding:10px 14px;border-radius:100px;border:1px solid #2a2a50;background:#1a1a30;color:#e0e0f0;font-size:13px;outline:none}' +
      '#mbInput:focus{border-color:#6c5ce7}' +
      '#mbInput::placeholder{color:#4a4a6a}' +
      '#mbSend{width:38px;height:38px;border-radius:50%;border:none;background:linear-gradient(135deg,#6c5ce7,#a855f7);color:#fff;font-size:16px;cursor:pointer;flex-shrink:0}' +
      '#mbSend:hover{opacity:.9}' +
      '#mbTyping{display:none;align-items:center;gap:4px;padding:0 20px 8px;font-size:12px;color:#6b6b8b}' +
      '#mbTyping span{width:6px;height:6px;border-radius:50%;background:#6b6b8b;animation:mbPulse 1.2s infinite}' +
      '#mbTyping span:nth-child(2){animation-delay:.2s}' +
      '#mbTyping span:nth-child(3){animation-delay:.4s}' +
      '@keyframes mbPulse{0%,60%,100%{opacity:.3}20%{opacity:1}}' +
      '@media(max-width:480px){#mbChatBox{width:calc(100vw - 32px);right:16px;bottom:80px}}' +
      '</style>' +
      '<button id="mbChatToggle">💬</button>' +
      '<div id="mbChatBox">' +
        '<div class="mb-header"><h3>💬 Asistente</h3><p>Pregunta sobre Master Baez</p></div>' +
        '<div id="mbChatMessages"><div class="mb-msg mb-bot">👋 ¡Hola! Pregúntame sobre programas, precios, horarios y más.<br><br>👋 Hi! Ask me about programs, pricing, schedules, and more.</div></div>' +
        '<div id="mbTyping"><span></span><span></span><span></span> <span style="margin-left:6px">...</span></div>' +
        '<div class="mb-input-area"><input id="mbInput" placeholder="Escribe tu pregunta / Type your question..."><button id="mbSend">➤</button></div>' +
      '</div>';
    document.body.appendChild(div);

    document.getElementById('mbChatToggle').onclick = function(){
      opened = !opened;
      document.getElementById('mbChatBox').style.display = opened?'flex':'none';
      this.textContent = opened?'✕':'💬';
    };
    document.getElementById('mbSend').onclick = handleSend;
    document.getElementById('mbInput').onkeydown = function(e){ if(e.key==='Enter') handleSend(); };
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',createUI);
  else createUI();
})();

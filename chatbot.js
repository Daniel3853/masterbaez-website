(function(){
  var lang = 'en', opened = false, kb = [];

  var esHints = ['hola','gracias','favor','puedes','querría','necesito','qué','eres','hijo','hija','niño','niña','clases','programas','precios','horarios','dirección','teléfono','artes','marciales','tímido','tdah','confianza','disciplina','cinturón','garantía','devolución','opiniones','reseñas','comenzar','empezar','inscribir','registrar','prueba','gratis','uniforme','pago','mensualidad','cuánto','cuál','dónde','cómo','ubicados','oferta','extraescolar','pequeños','tigres','acoso','violencia','atrás','resultados','horario','abierto','fundador','dueño','reseña','pembroke','pines','davie','plantation','weston','sabermás','saber'];

  function detectLang(t){
    t = t.toLowerCase();
    for(var i=0;i<esHints.length;i++){if(t.indexOf(esHints[i])!==-1) return 'es';}
    return 'en';
  }

  function stripHtml(s){ return s.replace(/<[^>]*>/g,'').trim(); }

  function partialMatch(haystack, needle){
    haystack = haystack.toLowerCase();
    needle = needle.toLowerCase();
    if(haystack.indexOf(needle) !== -1) return true;
    if(needle.length < 4) return false;
    var parts = haystack.split(/\s+/);
    for(var p=0;p<parts.length;p++){
      if(parts[p].length < 4) continue;
      if(parts[p].indexOf(needle) !== -1 || needle.indexOf(parts[p]) !== -1) return true;
    }
    return false;
  }

  function buildKB(){
    kb = [];
    var trans = window.translations || {};
    Object.keys(trans).forEach(function(key){
      var en = (trans[key].en || '').trim();
      var es = (trans[key].es || '').trim();
      if(!en && !es) return;
      var searchText = key.replace(/_/g,' ') + ' ' + en + ' ' + es;
    kb.push({key:key, en:en, es:es, search:searchText, len: Math.max(en.length, es.length)});
  });
  console.log('Chatbot: loaded ' + kb.length + ' entries');
}

  function findBestAnswer(input){
    buildKB(); // Always rebuild to use latest translations
    if(!kb.length) return null;

    var q = input.toLowerCase().replace(/[¿?¡!.,;:]/g,'').trim();
    var qWords = q.split(/\s+/).filter(function(w){return w.length>1;});

    var scored = [];
    for(var i=0;i<kb.length;i++){
      var item = kb[i];
      var matchCount = 0;
      for(var j=0;j<qWords.length;j++){
        if(partialMatch(item.search, qWords[j])) matchCount++;
      }
      if(matchCount === 0) continue;

      var bonus = 0;
      // FAQ questions -> deprioritize
      if(/^faq_q\d+$/.test(item.key)) bonus -= 5;
      // Priority: descriptive content
      if(/(_desc|_p\d+|_text|_name)$/.test(item.key) || /^faq_a/.test(item.key) || /^pillar_/.test(item.key) || /^comp_muv/.test(item.key) || /^offer_/.test(item.key)) bonus += 3;
      // Labels/tags -> deprioritize
      if(/_tag$|_label$|_level$|_time$|_age$/.test(item.key)) bonus -= 2;
      // Short entries penalty
      if(item.len < 20) bonus -= 1;
      if(item.len > 80) bonus += 2;

      scored.push({key:item.key, en:item.en, es:item.es, len:item.len, score:matchCount + bonus, matchCount:matchCount});
    }

    scored.sort(function(a,b){ return b.score - a.score; });

    if(scored.length){
      console.log('Chatbot: top match for "'+input+'" =', scored[0].key, 'score:', scored[0].score, 'matchCount:', scored[0].matchCount);
    } else {
      console.log('Chatbot: no matches for "'+input+'"');
    }

    if(scored.length && scored[0].score >= 1){
      var best = scored[0];

      // FAQ question -> return answer
      if(/^faq_q\d+$/.test(best.key)){
        var aKey = best.key.replace('faq_q','faq_a');
        for(var i=0;i<kb.length;i++){
          if(kb[i].key === aKey){
            return stripHtml(lang==='es'?(kb[i].es||kb[i].en):(kb[i].en||kb[i].es));
          }
        }
      }

      // Prefer _desc over _title
      if(/_title$|_name$/.test(best.key)){
        var better = best.key.replace(/_title$/,'_desc').replace(/_name$/,'_desc');
        for(var i=0;i<kb.length;i++){
          if(kb[i].key === better && kb[i].len > 20){
            return stripHtml(lang==='es'?(kb[i].es||kb[i].en):(kb[i].en||kb[i].es));
          }
        }
      }

      return stripHtml(lang==='es'?(best.es||best.en):(best.en||best.es));
    }
    return null;
  }

  function handleSend(){
    var input = document.getElementById('mbInput');
    var q = input.value.trim();
    if(!q) return;
    input.value = '';
    lang = detectLang(q);
    addMessage(q, true);
    document.getElementById('mbTyping').style.display='flex';
    setTimeout(function(){
      document.getElementById('mbTyping').style.display='none';
      var a = findBestAnswer(q);
      if(a){
        addMessage(a, false);
      } else {
        addMessage(lang==='es'?
          'No encontré esa información. Llámanos al <strong>954-380-1340</strong> o <a href="#trial" style="color:#a855f7;">prueba una clase gratis</a>.':
          'I couldn\'t find that. Call us at <strong>954-380-1340</strong> or <a href="#trial" style="color:#a855f7;">try a free class</a>.', false);
      }
    }, 300+Math.random()*400);
  }

  function addMessage(text, isUser){
    var chat = document.getElementById('mbChatMessages');
    if(!chat) return;
    var msg = document.createElement('div');
    msg.className = 'mb-msg ' + (isUser?'mb-user':'mb-bot');
    msg.innerHTML = isUser ? '<span style="color:#8a8aaa;">You:</span> '+escapeHtml(text) : text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  }
  function escapeHtml(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML;}

  function createUI(){
    if(document.getElementById('mbChatWidget')) return;
    var div = document.createElement('div');
    div.id='mbChatWidget';
    div.innerHTML='<style>'+
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
        '<div class="mb-header"><h3>🤖 AI Asistente</h3><p>Master Baez Martial Arts</p></div>'+
        '<div id="mbChatMessages"><div class="mb-msg mb-bot">👋 ¡Pregúntame cualquier cosa sobre Master Baez!</div></div>'+
        '<div id="mbTyping"><span></span><span></span><span></span> <span style="margin-left:6px">...</span></div>'+
        '<div class="mb-input-area"><input id="mbInput" placeholder="Escribe tu pregunta..."><button id="mbSend">➤</button></div>'+
      '</div>';
    document.body.appendChild(div);
    document.getElementById('mbChatToggle').onclick=function(){
      opened=!opened;
      document.getElementById('mbChatBox').style.display=opened?'flex':'none';
      this.textContent=opened?'✕':'💬';
    };
    document.getElementById('mbSend').onclick=handleSend;
    document.getElementById('mbInput').onkeydown=function(e){if(e.key==='Enter')handleSend();};
  }

  // Wait for content-loader to populate window.translations
  function init(){
    if(window.translations && Object.keys(window.translations).length > 10){
      createUI();
    } else {
      setTimeout(init, 200);
    }
  }
  init();
})();

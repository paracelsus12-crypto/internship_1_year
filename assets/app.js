/* Спільна логіка порталу */
function toggleMenu(){
  var n=document.getElementById('nav'); if(n) n.classList.toggle('open');
}

/* Чек-листи: рахує відмічені пункти в контейнері за id */
function updateChecklist(id){
  var box=document.getElementById(id); if(!box) return;
  var items=box.querySelectorAll('input[type="checkbox"]');
  var done=0; items.forEach(function(c){ if(c.checked) done++; });
  var pill=document.getElementById(id+'-pill');
  if(pill){
    pill.textContent=done+'/'+items.length+' виконано';
    pill.classList.toggle('done', done===items.length && items.length>0);
  }
}

/* Тренажер кейсів. Дані передаються через window.CASES на сторінці */
var _caseIdx=0;
function renderCase(){
  var C=window.CASES; if(!C||!C.length) return;
  var c=C[_caseIdx], el=document.getElementById('case-box'); if(!el) return;
  var h='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">'+
    '<span class="badge emerald">Кейс '+(_caseIdx+1)+' з '+C.length+'</span>'+
    '<span style="color:#94a3b8;font-size:.75rem">Практичний тренажер</span></div>'+
    '<h3 style="margin:.2rem 0 .5rem;font-size:1.2rem;font-weight:700">'+c.title+'</h3>'+
    '<p style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:.7rem;padding:1rem;color:#334155;font-size:.92rem">'+c.setting+'</p>'+
    '<p style="font-weight:700;margin:1rem 0 .5rem">'+c.question+'</p><div style="display:grid;gap:.6rem">';
  c.options.forEach(function(o,i){
    h+='<button class="case-opt" onclick="pickOption('+i+')"><span class="letter">'+
      String.fromCharCode(65+i)+'</span><span>'+o.text+'</span></button>';
  });
  h+='</div><div id="case-fb"></div>';
  el.innerHTML=h;
}
function pickOption(i){
  var c=window.CASES[_caseIdx], o=c.options[i], fb=document.getElementById('case-fb');
  if(o.correct){
    fb.className='feedback ok';
    fb.innerHTML='<strong>✓ Вірно!</strong> '+o.feedback+
      '<div style="margin-top:.9rem"><button class="btn green" onclick="nextCase()">Наступний кейс →</button></div>';
  }else{
    fb.className='feedback no';
    fb.innerHTML='<strong>✗ Помилка.</strong> '+o.feedback;
  }
}
function nextCase(){ _caseIdx=(_caseIdx+1)%window.CASES.length; renderCase(); }

/* Пошук у сітці глосарію: дані у window.GLOSSARY */
function renderGlossary(filter){
  var g=window.GLOSSARY, grid=document.getElementById('gloss-grid'); if(!g||!grid) return;
  filter=(filter||'').toLowerCase();
  var f=g.filter(function(x){
    return x.term.toLowerCase().indexOf(filter)>=0 || x.def.toLowerCase().indexOf(filter)>=0;
  });
  if(!f.length){ grid.innerHTML='<div style="grid-column:1/-1;text-align:center;color:#94a3b8;padding:2rem">Нічого не знайдено.</div>'; return; }
  grid.innerHTML=f.map(function(x){
    return '<div class="card"><span class="badge violet">'+(x.tag||'Термін')+'</span>'+
      '<h3 style="margin-top:.6rem">'+x.term+'</h3><p style="margin-top:.4rem">'+x.def+'</p></div>';
  }).join('');
}
function filterGlossary(){ renderGlossary(document.getElementById('gloss-search').value); }

document.addEventListener('DOMContentLoaded',function(){
  if(window.CASES) renderCase();
  if(window.GLOSSARY) renderGlossary('');
});

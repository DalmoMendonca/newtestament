const families = {
  synoptic: {label:'Synoptic Gospels', color:'#f2c94c'},
  johnGospel: {label:'Gospel of John', color:'#b88a00'},
  acts: {label:'Acts / Luke–Acts', color:'#d59c36'},
  paulCore: {label:'Undisputed Paul', color:'#173f8a'},
  paulDisputed: {label:'Disputed Pauline', color:'#4d72b8'},
  pastorals: {label:'Pastoral Epistles', color:'#8fb7e8'},
  hebrews: {label:'Hebrews', color:'#7a4aa5'},
  james: {label:'James', color:'#7d8a3e'},
  peter: {label:'Petrine Letters', color:'#3e8b57'},
  johnLetters: {label:'Johannine Letters', color:'#e68a3a'},
  jude: {label:'Jude', color:'#168c8c'},
  revelation: {label:'Revelation', color:'#b8403a'}
};

const dimensions = {
  date:{label:'Probable date',kind:'date',min:45,max:125,left:'earlier',right:'later',description:'Approximate composition date in CE. Error bars show a deliberately broad plausible range.'},
  words:{label:'Greek length',kind:'number',min:0,max:20000,left:'shorter',right:'longer',description:'Approximate Greek word count; exact totals vary slightly by critical edition.'},
  torah:{label:'Torah orientation',kind:'score',left:'Torah relativized',right:'Torah continuity',description:'How strongly the document foregrounds ongoing Torah observance, Jewish scriptural practice, or continuity with Israel’s law.'},
  audience:{label:'Jewish ↔ Gentile orientation',kind:'score',left:'Gentile-facing',right:'Jewish-facing',description:'A comparative estimate of the social and rhetorical world presupposed by the document.'},
  eschatology:{label:'Eschatological imminence',kind:'score',left:'realized / deferred',right:'imminent',description:'How intensely the document expects decisive eschatological action in the near horizon.'},
  christology:{label:'Christological explicitness',kind:'score',left:'implicit / functional',right:'explicit / cosmic',description:'How extensively the text articulates Jesus in preexistent, cosmic, divine, or metaphysical terms.'},
  church:{label:'Ecclesial structure',kind:'score',left:'fluid / charismatic',right:'institutional / structured',description:'How formalized offices, hierarchy, succession, and household order appear in the text.'},
  rome:{label:'Posture toward imperial order',kind:'score',left:'accommodating',right:'confrontational',description:'A comparative reading of accommodation to, critique of, or resistance to imperial power.'},
  wealth:{label:'Wealth critique',kind:'score',left:'muted',right:'strong',description:'How forcefully wealth, status, accumulation, or elite privilege are criticized.'},
  household:{label:'Household-order emphasis',kind:'score',left:'disruptive / egalitarian',right:'order / hierarchy',description:'How much the text reinscribes conventional household roles and authority structures.'},
  universal:{label:'Universal scope',kind:'score',left:'bounded / particular',right:'universal',description:'How explicitly the text imagines salvation, mission, or divine purpose extending across peoples and boundaries.'},
  genre:{label:'Narrative ↔ discourse',kind:'score',left:'discursive',right:'narrative',description:'A formal-literary axis from argument/exhortation toward sustained narrative.'},
  autobiographical:{label:'Autobiographical voice',kind:'score',left:'impersonal',right:'strongly autobiographical',description:'How much the authorial “I/we,” personal history, and self-presentation shape the work.'},
  theology:{label:'Theological elaboration',kind:'score',left:'situational / aphoristic',right:'fully worked through',description:'How extensively the document develops and integrates its theological claims into a sustained conceptual system.'},
  apocalypse:{label:'Apocalyptic intensity',kind:'score',left:'low',right:'high',description:'Density of visions, cosmic conflict, angelic mediation, symbolic catastrophe, and end-time imagery.'}
};

const B = (name,short,family,dates,words,scores,profile,refs,confidence=.72)=>({name,short,family,dateMin:dates[0],dateMax:dates[1],date:(dates[0]+dates[1])/2,words,...scores,profile,refs,confidence});
const books = [
B('Matthew','Matt','synoptic',[80,95],18345,{torah:88,audience:90,eschatology:78,christology:72,church:72,rome:58,wealth:76,household:58,universal:78,genre:94,autobiographical:8,theology:76,apocalypse:66},'A deeply Jewish Gospel that intensifies Torah rather than simply discarding it, while ending with a universal mission. It also contains unusually explicit church language and strong judgment imagery.','Matt 5–7; 16:18; 23; 24–25; 28:16–20'),
B('Mark','Mark','synoptic',[65,75],11304,{torah:54,audience:54,eschatology:88,christology:56,church:26,rome:62,wealth:73,household:34,universal:67,genre:96,autobiographical:5,theology:52,apocalypse:72},'The earliest canonical Gospel in the standard critical chronology: urgent, narratively compressed, apocalyptic, and less institutionally developed than Matthew or Luke.','Mark 1:14–15; 7:1–23; 10:17–31; 13; 15:39'),
B('Luke','Luke','synoptic',[80,95],19482,{torah:65,audience:45,eschatology:58,christology:70,church:55,rome:38,wealth:92,household:45,universal:92,genre:97,autobiographical:7,theology:74,apocalypse:53},'Luke strongly emphasizes reversal, poverty, the marginalized, and the inclusion of outsiders. Its eschatology remains active but is narrated within a broader salvation-historical horizon.','Luke 1–2; 4:16–30; 6:20–26; 16; 19:1–10; 21'),
B('John','John','johnGospel',[90,105],15634,{torah:46,audience:62,eschatology:36,christology:99,church:43,rome:50,wealth:40,household:24,universal:76,genre:91,autobiographical:10,theology:96,apocalypse:34},'John pushes Christology and theological integration to the foreground: Logos, preexistence, mutual indwelling, signs, and realized eternal life.','John 1:1–18; 5; 8:48–59; 10:30; 13–17; 20:30–31'),
B('Acts','Acts','acts',[80,95],18451,{torah:61,audience:34,eschatology:44,christology:67,church:70,rome:25,wealth:82,household:52,universal:96,genre:97,autobiographical:22,theology:66,apocalypse:39},'Acts narrates the movement from Jerusalem toward Rome, portraying Christianity as socially disruptive yet repeatedly non-seditious before Roman authorities.','Acts 2:42–47; 4:32–37; 10–15; 17; 21–28'),
B('Romans','Rom','paulCore',[55,58],7114,{torah:42,audience:38,eschatology:72,christology:83,church:44,rome:20,wealth:56,household:45,universal:96,genre:10,autobiographical:62,theology:98,apocalypse:47},'Paul’s most sustained theological argument, wrestling with Torah, Gentile inclusion, Israel, Adam, justification, participation in Christ, and the shape of communal life.','Rom 1–8; 9–11; 12–13; 14–15'),
B('1 Corinthians','1 Cor','paulCore',[53,55],6830,{torah:38,audience:28,eschatology:82,christology:79,church:42,rome:52,wealth:78,household:34,universal:82,genre:12,autobiographical:72,theology:86,apocalypse:52},'Highly situational but theologically rich: faction, status, bodies, sex, food, worship, gifts, resurrection, and Paul’s own contested authority all collide.','1 Cor 1–4; 6–8; 11–15'),
B('2 Corinthians','2 Cor','paulCore',[55,57],4477,{torah:30,audience:24,eschatology:68,christology:77,church:36,rome:58,wealth:63,household:28,universal:76,genre:8,autobiographical:96,theology:82,apocalypse:50},'The most autobiographically exposed Pauline letter, centered on weakness, suffering, reconciliation, generosity, apostolic legitimacy, and power made strange by the cross.','2 Cor 1–7; 8–9; 10–13'),
B('Galatians','Gal','paulCore',[48,55],2230,{torah:10,audience:26,eschatology:82,christology:80,church:20,rome:47,wealth:44,household:18,universal:95,genre:7,autobiographical:88,theology:88,apocalypse:42},'Paul’s sharpest canonical argument against requiring Gentile Christ-followers to adopt circumcision and Torah as ethnic boundary markers.','Gal 1–3; 4:21–31; 5–6'),
B('Philippians','Phil','paulCore',[54,62],1629,{torah:26,audience:20,eschatology:80,christology:92,church:34,rome:66,wealth:56,household:22,universal:76,genre:8,autobiographical:84,theology:82,apocalypse:40},'A prison letter combining affection, self-narration, participation in Christ’s self-emptying, and a politically resonant confession of Jesus as Lord.','Phil 1; 2:5–11; 3; 4'),
B('Colossians','Col','paulDisputed',[60,85],1582,{torah:22,audience:18,eschatology:38,christology:98,church:64,rome:30,wealth:35,household:76,universal:89,genre:7,autobiographical:48,theology:90,apocalypse:30},'Cosmic Christology and realized participation in Christ sit beside a more ordered household ethic. Authorship and date remain debated.','Col 1:15–20; 2; 3:1–4:1'),
B('Ephesians','Eph','paulDisputed',[70,95],2422,{torah:24,audience:18,eschatology:34,christology:97,church:88,rome:24,wealth:34,household:90,universal:93,genre:5,autobiographical:32,theology:95,apocalypse:36},'Ephesians presents a highly integrated cosmic ecclesiology: one new humanity, the church as Christ’s body, spiritual conflict, and formal household codes.','Eph 1–3; 4:1–16; 5:21–6:9; 6:10–20'),
B('1 Thessalonians','1 Thess','paulCore',[49,51],1481,{torah:30,audience:20,eschatology:98,christology:72,church:26,rome:61,wealth:37,household:25,universal:72,genre:7,autobiographical:74,theology:66,apocalypse:72},'Probably the earliest surviving Pauline letter, dominated by communal encouragement and an intensely near eschatological horizon.','1 Thess 1–2; 4:13–5:11'),
B('2 Thessalonians','2 Thess','paulDisputed',[60,95],823,{torah:28,audience:18,eschatology:72,christology:72,church:52,rome:50,wealth:34,household:54,universal:66,genre:6,autobiographical:38,theology:64,apocalypse:76},'Its eschatology is paradoxically vivid but also delays the end by inserting prerequisite events. Authorship is disputed.','2 Thess 1–3'),
B('1 Timothy','1 Tim','pastorals',[90,110],1591,{torah:20,audience:18,eschatology:25,christology:71,church:98,rome:15,wealth:64,household:96,universal:70,genre:5,autobiographical:26,theology:72,apocalypse:17},'The Pastorals strongly foreground offices, respectability, household order, sound teaching, and boundary maintenance within a maturing institutional church.','1 Tim 2–6'),
B('2 Timothy','2 Tim','pastorals',[90,110],1238,{torah:19,audience:17,eschatology:44,christology:73,church:87,rome:38,wealth:40,household:79,universal:68,genre:5,autobiographical:61,theology:70,apocalypse:27},'More personal and valedictory than 1 Timothy, but still deeply concerned with succession, trustworthy teaching, endurance, and institutional continuity.','2 Tim 1–4'),
B('Titus','Titus','pastorals',[90,110],659,{torah:17,audience:16,eschatology:29,christology:75,church:96,rome:12,wealth:42,household:94,universal:74,genre:4,autobiographical:22,theology:67,apocalypse:15},'A compact program of appointing elders, policing teaching, and rendering Christian households socially respectable.','Titus 1–3'),
B('Philemon','Phlm','paulCore',[54,62],335,{torah:24,audience:22,eschatology:55,christology:66,church:18,rome:53,wealth:61,household:18,universal:72,genre:3,autobiographical:91,theology:50,apocalypse:15},'A personal letter in which Paul negotiates hierarchy, kinship, debt, and slavery through the social logic of life “in Christ.”','Phlm 1–25'),
B('Hebrews','Heb','hebrews',[60,90],4953,{torah:44,audience:88,eschatology:73,christology:99,church:58,rome:64,wealth:57,household:40,universal:76,genre:10,autobiographical:10,theology:99,apocalypse:55},'A sophisticated homily that rereads Israel’s scriptures through priesthood, covenant, sacrifice, heavenly sanctuary, pilgrimage, and the exalted Son.','Heb 1; 4–10; 11–13'),
B('James','Jas','james',[70,100],1742,{torah:90,audience:96,eschatology:70,christology:42,church:50,rome:62,wealth:99,household:42,universal:48,genre:8,autobiographical:8,theology:58,apocalypse:34},'Wisdom-rich, Torah-positive, and relentlessly focused on enacted righteousness, speech, partiality, exploitation, and the danger of wealth.','Jas 1–5'),
B('1 Peter','1 Pet','peter',[70,95],1684,{torah:58,audience:44,eschatology:74,christology:81,church:63,rome:28,wealth:47,household:82,universal:74,genre:6,autobiographical:15,theology:78,apocalypse:37},'A theology of exilic identity and suffering that mixes resistance at the level of allegiance with substantial accommodation to household and civic order.','1 Pet 1–2; 2:11–3:7; 4–5'),
B('2 Peter','2 Pet','peter',[100,125],1099,{torah:44,audience:38,eschatology:53,christology:82,church:76,rome:40,wealth:35,household:62,universal:65,genre:4,autobiographical:28,theology:73,apocalypse:68},'Usually dated latest among canonical writings in critical scholarship; it defends apostolic memory, combats false teachers, and explains the apparent delay of the parousia.','2 Pet 1–3'),
B('1 John','1 John','johnLetters',[90,110],2141,{torah:35,audience:56,eschatology:44,christology:94,church:48,rome:45,wealth:58,household:20,universal:62,genre:4,autobiographical:12,theology:91,apocalypse:34},'A tightly woven Johannine meditation on incarnation, love, truth, sin, testing spirits, communal rupture, and eternal life already possessed.','1 John 1–5'),
B('2 John','2 John','johnLetters',[90,110],245,{torah:32,audience:52,eschatology:40,christology:91,church:51,rome:43,wealth:31,household:25,universal:52,genre:3,autobiographical:20,theology:60,apocalypse:25},'A short boundary-maintenance letter: love and truth are inseparable from refusing teachers who deny Christ’s coming in the flesh.','2 John 1–13'),
B('3 John','3 John','johnLetters',[90,110],219,{torah:26,audience:48,eschatology:30,christology:68,church:63,rome:36,wealth:28,household:32,universal:50,genre:3,autobiographical:33,theology:48,apocalypse:12},'A glimpse into local authority conflict, hospitality, itinerant teachers, and competing models of ecclesial leadership.','3 John 1–15'),
B('Jude','Jude','jude',[70,100],461,{torah:63,audience:67,eschatology:78,christology:64,church:58,rome:68,wealth:45,household:38,universal:48,genre:4,autobiographical:12,theology:54,apocalypse:91},'A compressed apocalyptic polemic drawing on Jewish scriptural and extra-canonical traditions to frame false teachers as part of a cosmic rebellion.','Jude 1–25'),
B('Revelation','Rev','revelation',[90,96],9852,{torah:70,audience:72,eschatology:99,christology:97,church:67,rome:100,wealth:95,household:24,universal:84,genre:70,autobiographical:46,theology:90,apocalypse:100},'The canon’s most explicit anti-imperial apocalypse: Rome becomes Babylon, worship is political, economic seduction is judged, and the Lamb conquers through faithful witness.','Rev 1–3; 5; 12–14; 17–19; 21–22')
];

const xSelect=document.getElementById('xSelect');
const ySelect=document.getElementById('ySelect');
const chart=document.getElementById('chart');
const uncertaintyToggle=document.getElementById('uncertaintyToggle');
const drawer=document.getElementById('drawer');
const drawerContent=document.getElementById('drawerContent');
const scrim=document.getElementById('scrim');
const legend=document.getElementById('legend');
let lastPlotPoints=[];
const tooltip=document.createElement('div');
tooltip.className='tooltip';
document.body.appendChild(tooltip);

for(const [key,d] of Object.entries(dimensions)){
  const a=document.createElement('option'); a.value=key; a.textContent=d.label; xSelect.appendChild(a);
  const b=document.createElement('option'); b.value=key; b.textContent=d.label; ySelect.appendChild(b);
}

const query=new URLSearchParams(location.search);
xSelect.value=dimensions[query.get('x')]?query.get('x'):'date';
ySelect.value=dimensions[query.get('y')]?query.get('y'):'torah';
if(xSelect.value===ySelect.value) ySelect.value=xSelect.value==='torah'?'apocalypse':'torah';

let selectedBook=null;
let uncertaintyOn=true;

function valueFor(book,key){ return book[key] ?? 0; }
function domainFor(key){ const d=dimensions[key]; return d.kind==='score'?[0,100]:[d.min,d.max]; }
function formatValue(book,key){
  if(key==='date') return book.dateMin+'–'+book.dateMax+' CE';
  if(key==='words') return book.words.toLocaleString()+' words';
  return Math.round(book[key])+'/100';
}
function scale(v,a,b,c,d){ return c+(v-a)*(d-c)/(b-a); }
function esc(s){ return String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

function syncUrl(){
  const u=new URL(location.href);
  u.searchParams.set('x',xSelect.value);
  u.searchParams.set('y',ySelect.value);
  history.replaceState(null,'',u);
}
function syncUncertaintyControl(){
  const relevant=xSelect.value==='date'||ySelect.value==='date';
  uncertaintyToggle.disabled=!relevant;
  uncertaintyToggle.classList.toggle('is-on',relevant&&uncertaintyOn);
  uncertaintyToggle.setAttribute('aria-pressed',String(relevant&&uncertaintyOn));
}

function intersects(a,b,pad=2){
  return !(a.r+pad<b.l || a.l-pad>b.r || a.b+pad<b.t || a.t-pad>b.b);
}
function placeLabels(points, bounds){
  const occupied=[];
  const candidates=[
    {dx:8,dy:-8,anchor:'start'},
    {dx:8,dy:13,anchor:'start'},
    {dx:-8,dy:-8,anchor:'end'},
    {dx:-8,dy:13,anchor:'end'},
    {dx:0,dy:-13,anchor:'middle'},
    {dx:0,dy:19,anchor:'middle'}
  ];
  return points.map((p,idx)=>{
    const tw=Math.max(20,p.b.short.length*6.1), th=11;
    let chosen=null, box=null;
    for(const c of candidates){
      const tx=p.x+c.dx, ty=p.y+c.dy;
      let l=tx, r=tx+tw;
      if(c.anchor==='end'){ l=tx-tw; r=tx; }
      if(c.anchor==='middle'){ l=tx-tw/2; r=tx+tw/2; }
      const test={l,r,t:ty-th,b:ty+2};
      if(test.l<bounds.l || test.r>bounds.r || test.t<bounds.t || test.b>bounds.b) continue;
      if(!occupied.some(o=>intersects(test,o,1))){
        chosen=c; box=test; break;
      }
    }
    if(!chosen){
      chosen=candidates[idx%candidates.length];
      const tx=p.x+chosen.dx, ty=p.y+chosen.dy;
      let l=tx, r=tx+tw;
      if(chosen.anchor==='end'){ l=tx-tw; r=tx; }
      if(chosen.anchor==='middle'){ l=tx-tw/2; r=tx+tw/2; }
      box={l,r,t:ty-th,b:ty+2};
    }
    occupied.push(box);
    return chosen;
  });
}

function renderChart(){
  syncUncertaintyControl();
  const xKey=xSelect.value, yKey=ySelect.value, xd=dimensions[xKey], yd=dimensions[yKey];
  const w=Math.max(280,chart.clientWidth||360);
  const h=Math.max(330,chart.clientHeight||520);
  const mobile=w<700;
  const m=mobile?{l:38,r:14,t:18,b:34}:{l:52,r:22,t:22,b:38};
  const pw=w-m.l-m.r, ph=h-m.t-m.b;
  const [xmin,xmax]=domainFor(xKey), [ymin,ymax]=domainFor(yKey);
  const sx=v=>scale(v,xmin,xmax,m.l,m.l+pw);
  const sy=v=>scale(v,ymin,ymax,m.t+ph,m.t);
  const steps=mobile?4:5;
  const tickFmt=(key,v)=>key==='date'?Math.round(v):key==='words'?(Math.round(v/100)/10)+'k':Math.round(v);

  const points=books.map((b,i)=>({b,i,x:sx(valueFor(b,xKey)),y:sy(valueFor(b,yKey))}));
  lastPlotPoints=points;
  const placements=placeLabels(points,{l:m.l+2,r:m.l+pw-2,t:m.t+2,b:m.t+ph-2});

  let svg='<svg viewBox="0 0 '+w+' '+h+'" aria-hidden="true">';
  for(let i=0;i<=steps;i++){
    const tx=m.l+pw*i/steps, ty=m.t+ph*i/steps;
    svg+='<line x1="'+tx+'" y1="'+m.t+'" x2="'+tx+'" y2="'+(m.t+ph)+'" stroke="#e5e2d9" stroke-width="1"/>';
    svg+='<line x1="'+m.l+'" y1="'+ty+'" x2="'+(m.l+pw)+'" y2="'+ty+'" stroke="#e5e2d9" stroke-width="1"/>';
  }
  svg+='<line x1="'+m.l+'" y1="'+(m.t+ph)+'" x2="'+(m.l+pw)+'" y2="'+(m.t+ph)+'" stroke="#77766f" stroke-width="1"/>';
  svg+='<line x1="'+m.l+'" y1="'+m.t+'" x2="'+m.l+'" y2="'+(m.t+ph)+'" stroke="#77766f" stroke-width="1"/>';

  for(let i=0;i<=steps;i++){
    const xv=xmin+(xmax-xmin)*i/steps, yv=ymax-(ymax-ymin)*i/steps;
    svg+='<text x="'+(m.l+pw*i/steps)+'" y="'+(m.t+ph+16)+'" text-anchor="middle" font-family="var(--mono)" font-size="'+(mobile?8:9)+'" fill="#77766f">'+esc(tickFmt(xKey,xv))+'</text>';
    svg+='<text x="'+(m.l-7)+'" y="'+(m.t+ph*i/steps+3)+'" text-anchor="end" font-family="var(--mono)" font-size="'+(mobile?8:9)+'" fill="#77766f">'+esc(tickFmt(yKey,yv))+'</text>';
  }

  svg+='<text x="'+(m.l+3)+'" y="'+(m.t+11)+'" text-anchor="start" font-family="var(--mono)" font-size="'+(mobile?7.5:8.5)+'" fill="#77766f">'+esc(yd.right)+'</text>';
  svg+='<text x="'+(m.l+3)+'" y="'+(m.t+ph-6)+'" text-anchor="start" font-family="var(--mono)" font-size="'+(mobile?7.5:8.5)+'" fill="#77766f">'+esc(yd.left)+'</text>';
  svg+='<text x="'+m.l+'" y="'+(h-5)+'" text-anchor="start" font-family="var(--mono)" font-size="'+(mobile?7.5:8.5)+'" fill="#77766f">'+esc(xd.left)+'</text>';
  svg+='<text x="'+(m.l+pw)+'" y="'+(h-5)+'" text-anchor="end" font-family="var(--mono)" font-size="'+(mobile?7.5:8.5)+'" fill="#77766f">'+esc(xd.right)+'</text>';

  points.forEach((p,idx)=>{
    const b=p.b, c=families[b.family].color, x=p.x, y=p.y;
    if(uncertaintyOn && xKey==='date'){
      svg+='<line x1="'+sx(b.dateMin)+'" y1="'+y+'" x2="'+sx(b.dateMax)+'" y2="'+y+'" stroke="'+c+'" stroke-width="1.2" opacity=".42"/>';
      svg+='<line x1="'+sx(b.dateMin)+'" y1="'+(y-3)+'" x2="'+sx(b.dateMin)+'" y2="'+(y+3)+'" stroke="'+c+'" opacity=".52"/>';
      svg+='<line x1="'+sx(b.dateMax)+'" y1="'+(y-3)+'" x2="'+sx(b.dateMax)+'" y2="'+(y+3)+'" stroke="'+c+'" opacity=".52"/>';
    }
    if(uncertaintyOn && yKey==='date'){
      svg+='<line x1="'+x+'" y1="'+sy(b.dateMin)+'" x2="'+x+'" y2="'+sy(b.dateMax)+'" stroke="'+c+'" stroke-width="1.2" opacity=".42"/>';
      svg+='<line x1="'+(x-3)+'" y1="'+sy(b.dateMin)+'" x2="'+(x+3)+'" y2="'+sy(b.dateMin)+'" stroke="'+c+'" opacity=".52"/>';
      svg+='<line x1="'+(x-3)+'" y1="'+sy(b.dateMax)+'" x2="'+(x+3)+'" y2="'+sy(b.dateMax)+'" stroke="'+c+'" opacity=".52"/>';
    }
    const chosen=placements[idx];
    const tx=x+chosen.dx, ty=y+chosen.dy;
    const selected=selectedBook===b.name?' selected':'';
    svg+='<g class="point'+selected+'" data-book="'+p.i+'" tabindex="0" role="button" aria-label="'+esc(b.name)+'">';
    svg+='<circle class="dot-ring" cx="'+x+'" cy="'+y+'" r="9.5" fill="none" stroke="'+c+'" stroke-width="1.2"/>';
    svg+='<circle cx="'+x+'" cy="'+y+'" r="'+(mobile?5.2:5.7)+'" fill="'+c+'" stroke="#f7f6f1" stroke-width="1.3"/>';
    svg+='<circle class="hit" cx="'+x+'" cy="'+y+'" r="'+(mobile?14:13)+'" fill="transparent"/>';
    svg+='<text class="point-label" x="'+tx+'" y="'+ty+'" text-anchor="'+chosen.anchor+'">'+esc(b.short)+'</text>';
    svg+='</g>';
  });
  svg+='</svg>';
  chart.innerHTML=svg;

  chart.querySelectorAll('.point').forEach(el=>{
    const b=books[+el.dataset.book];
    const move=e=>{
      const px=e.clientX||window.innerWidth/2, py=e.clientY||window.innerHeight/2;
      tooltip.style.left=Math.min(px+12,window.innerWidth-240)+'px';
      tooltip.style.top=Math.min(py+12,window.innerHeight-90)+'px';
    };
    const show=e=>{
      tooltip.innerHTML='<strong>'+esc(b.name)+'</strong>'+esc(dimensions[xKey].label)+': '+esc(formatValue(b,xKey))+'<br>'+esc(dimensions[yKey].label)+': '+esc(formatValue(b,yKey));
      tooltip.style.opacity='1'; move(e);
    };
    el.addEventListener('mouseenter',show);
    el.addEventListener('mousemove',move);
    el.addEventListener('mouseleave',()=>tooltip.style.opacity='0');
    el.addEventListener('click',()=>openDrawer(b));
    el.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openDrawer(b); } });
  });
}

function openDrawer(b){
  selectedBook=b.name;
  const f=families[b.family], xKey=xSelect.value, yKey=ySelect.value;
  const scoreKeys=['torah','audience','eschatology','christology','church','rome','wealth','household','universal','genre','autobiographical','theology','apocalypse'];
  drawer.style.setProperty('--book-color',f.color);
  drawerContent.innerHTML=
    '<div class="drawer-kicker">Document</div>'+
    '<h2 class="drawer-title">'+esc(b.name)+'</h2>'+
    '<div class="family-line">'+esc(f.label)+'</div>'+
    '<p class="profile">'+esc(b.profile)+'</p>'+
    '<div class="current-values">'+
      '<div class="current-value"><small>'+esc(dimensions[xKey].label)+'</small><strong>'+esc(formatValue(b,xKey))+'</strong></div>'+
      '<div class="current-value"><small>'+esc(dimensions[yKey].label)+'</small><strong>'+esc(formatValue(b,yKey))+'</strong></div>'+
    '</div>'+
    '<div class="score-table">'+scoreKeys.map(k=>'<div class="score-row"><span>'+esc(dimensions[k].label)+'</span><div class="score-num">'+Math.round(b[k])+'</div></div>').join('')+'</div>'+
    '<div class="refs"><strong>Passages to inspect:</strong> '+esc(b.refs)+'</div>';
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden','false');
  scrim.hidden=false;
  renderChart();
}
function closeDrawer(){
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden','true');
  scrim.hidden=true;
  renderChart();
}


chart.addEventListener('click',e=>{
  if(e.target.closest&&e.target.closest('.point')) return;
  if(!lastPlotPoints.length) return;
  const rect=chart.getBoundingClientRect();
  const px=(e.clientX-rect.left)*(chart.clientWidth/rect.width);
  const py=(e.clientY-rect.top)*(chart.clientHeight/rect.height);
  let nearest=null, best=Infinity;
  for(const p of lastPlotPoints){
    const d=Math.hypot(p.x-px,p.y-py);
    if(d<best){ best=d; nearest=p; }
  }
  if(nearest&&best<=30) openDrawer(nearest.b);
});
document.getElementById('drawerClose').addEventListener('click',closeDrawer);
scrim.addEventListener('click',closeDrawer);
document.getElementById('swapBtn').addEventListener('click',()=>{
  const a=xSelect.value; xSelect.value=ySelect.value; ySelect.value=a; syncUrl(); renderChart();
});
xSelect.addEventListener('change',()=>{ if(xSelect.value===ySelect.value) ySelect.value=xSelect.value==='torah'?'apocalypse':'torah'; syncUrl(); renderChart(); });
ySelect.addEventListener('change',()=>{ if(ySelect.value===xSelect.value) xSelect.value=ySelect.value==='date'?'words':'date'; syncUrl(); renderChart(); });
uncertaintyToggle.addEventListener('click',()=>{
  if(uncertaintyToggle.disabled) return;
  uncertaintyOn=!uncertaintyOn;
  renderChart();
});

Object.values(families).forEach(f=>{
  legend.insertAdjacentHTML('beforeend','<div class="legend-item"><span class="legend-swatch" style="background:'+f.color+'"></span>'+esc(f.label)+'</div>');
});

const legendDialog=document.getElementById('legendDialog');
document.getElementById('legendBtn').addEventListener('click',()=>legendDialog.showModal());
document.getElementById('legendClose').addEventListener('click',()=>legendDialog.close());
const methodDialog=document.getElementById('methodDialog');
document.getElementById('methodBtn').addEventListener('click',()=>methodDialog.showModal());
document.getElementById('methodClose').addEventListener('click',()=>methodDialog.close());

for(const dialog of [legendDialog,methodDialog]){
  dialog.addEventListener('click',e=>{ if(e.target===dialog) dialog.close(); });
}
window.addEventListener('keydown',e=>{ if(e.key==='Escape'&&drawer.classList.contains('open')) closeDrawer(); });

const ro=new ResizeObserver(()=>renderChart());
ro.observe(chart);
syncUrl();
renderChart();

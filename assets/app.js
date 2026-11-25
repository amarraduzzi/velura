(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(e=>io.observe(e));
const nv=$('header.nv');const onS=()=>nv.classList.toggle('sc',scrollY>20);
addEventListener('scroll',onS,{passive:true});onS();

/* Hero: weiche Farbkugeln in allen Hauttönen, schweben und folgen der Maus */
const cv=$('#orbs');
if(cv){const c=cv.getContext('2d'),hero=cv.parentElement;let W,H,S=[],mx=-999,my=-999,t=0;
 const cols=[['246,220,203',.7],['236,190,160',.6],['214,155,120',.5],['176,114,82',.38],['128,80,58',.28],['233,168,184',.5],['196,160,200',.45],['170,200,182',.45]];
 const size=()=>{const r=hero.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1.5);W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;c.setTransform(d,0,0,d,0,0);
  const n=W<600?9:14,k=W<600?.62:1;
  S=Array.from({length:n},(_,i)=>{const cl=cols[i%cols.length];return{x:W*(.22+.78*Math.random()),y:H*(.08+.84*Math.random()),r:(90+Math.random()*150)*k,c:cl[0],a:cl[1],p:Math.random()*6.28,sp:.35+Math.random()*.6,m:30+Math.random()*50,z:.3+Math.random()*.9}})};
 size();addEventListener('resize',()=>{size();if(rm)draw()});
 const draw=()=>{c.clearRect(0,0,W,H);const sy=scrollY*.12;
  for(const s of S){let x=s.x+Math.sin(t*s.sp+s.p)*s.m,y=s.y+Math.cos(t*s.sp*.8+s.p)*s.m*.8-sy*s.z;
   const dx=mx-x,dy=my-y,d=Math.sqrt(dx*dx+dy*dy);if(d<420){const f=1-d/420;x+=dx*f*.16;y+=dy*f*.16}
   const g=c.createRadialGradient(x,y,0,x,y,s.r);g.addColorStop(0,'rgba('+s.c+','+s.a+')');g.addColorStop(1,'rgba('+s.c+',0)');c.fillStyle=g;c.beginPath();c.arc(x,y,s.r,0,6.283);c.fill()}};
 hero.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=hero.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
 hero.addEventListener('pointerleave',()=>{mx=my=-999});
 const loop=()=>{if(scrollY<H&&!document.hidden){t+=.006;draw()}requestAnimationFrame(loop)};
 if(rm)draw();else loop()}

const seg=(root,cb)=>$$('.seg',root).forEach((sg,gi)=>$$('button',sg).forEach((b,i)=>b.onclick=()=>{$$('button',sg).forEach((x,j)=>x.setAttribute('aria-pressed',j==i));cb(gi,i)}));

/* Sonnen-Check */
const calc=$('#calc');
if(calc){const cfg=JSON.parse(calc.dataset.cfg),st=[1,1,1],out=$('.cres',calc);
 const run=()=>{out.innerHTML=cfg.c.map((g,gi)=>{const it=g[st[gi]];return `<div class="cc"><small>${cfg.l[gi]}</small><b class="w">${it[0]}</b><span>${it[1]}</span></div>`}).join('')};
 seg(calc,(g,i)=>{st[g]=i;run()});run()}

/* Einführungsplan */
const pc=$('#pcalc');
if(pc){const cfg=JSON.parse(pc.dataset.cfg),L=cfg.lang,out=$('.cres',pc),sl={};
 $$('.sl',pc).forEach(s=>sl[s.dataset.k]={i:$('input',s),o:$('output',s),u:s.dataset.u});
 const run=()=>{const n=+sl.n.i.value,iv=+sl.iv.i.value;sl.n.o.textContent=n+' '+sl.n.u;sl.iv.o.textContent=iv+' '+sl.iv.u;
  out.innerHTML=Array.from({length:n},(_,i)=>{const d=new Date();d.setDate(d.getDate()+i*iv);return `<div class="cc"><small>${cfg.pr} ${i+1}</small><b>${d.toLocaleDateString(L,{day:'numeric',month:'short'})}</b><span>${cfg.dy} ${i*iv}</span></div>`}).join('')};
 for(const k in sl)sl[k].i.oninput=run;run()}

/* Hauttyp-Check */
const ck=$('#check .ckb');
if(ck){let i=0,sum=0;const qs=$$('.cq',ck),dots=$$('.cdots i',ck);dots[0].classList.add('on');
 $$('.co button',ck).forEach(b=>b.onclick=()=>{sum+=+b.dataset.v;qs[i].hidden=true;i++;
  if(i<3){qs[i].hidden=false;dots[i].classList.add('on')}else{dots.forEach(d=>d.classList.add('on'));const k=sum<=1?'oily':sum<=4?'bal':'dry';$('.cr[data-k='+k+']',ck).hidden=false;$('.cf2',ck).hidden=false}});
 $('.cagain',ck).onclick=()=>{i=0;sum=0;qs.forEach((q,j)=>q.hidden=j>0);$$('.cr',ck).forEach(r=>r.hidden=true);$('.cf2',ck).hidden=true;dots.forEach((d,j)=>d.classList.toggle('on',j==0))}}

/* Pflegeritual: Ringe schließen sich mit jeder Gewohnheit */
const rt=$('#pflege');
if(rt){const t=$$('.tile',rt),lock=$('.lock',rt),st=$$('.lk .on',rt),msg=$('.rmsg',rt),cnt=$('.rcount',rt),ms=msg.dataset.m.split('|');
 t.forEach(b=>b.onclick=()=>{b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!='true');const n=t.filter(x=>x.getAttribute('aria-pressed')=='true').length;
  lock.style.setProperty('--p',n/t.length);st.forEach((p,i)=>{p.style.transitionDelay=(i*.07)+'s';p.style.strokeDashoffset=i<n?0:100});
  msg.textContent=ms[n==0?0:n<=2?1:n<=5?2:n<8?3:4];cnt.textContent=n+' / '+t.length+' '+cnt.dataset.u})}

/* Mythen */
$$('.mc').forEach(b=>b.onclick=()=>b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!='true'));
/* Artikel-Checkliste */
const cl=$('.chk');
if(cl){const bx=$$('input',cl),d=$('.done');bx.forEach(x=>x.onchange=()=>{d.hidden=!bx.every(y=>y.checked)})}
})();

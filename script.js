(function(){
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    },{threshold:0.12});
    reveals.forEach(r=>io.observe(r));
  })();

  (function(){
    const el = document.getElementById('subtitle');
    const phrase = "UI/UX Designer • Frontend Creative";
    let i=0, forward=true;

    function tick(){
      if(forward){
        i++;
        el.textContent = phrase.slice(0,i);
        if(i===phrase.length){ forward=false; setTimeout(tick,1200); return; }
      } else {
        i--;
        el.textContent = phrase.slice(0,i);
        if(i===0){ forward=true; }
      }
      setTimeout(tick, forward?60:40);
    }

    setTimeout(tick,400);
  })();

  (function(){
    const panel = document.getElementById('skillsPanel');
    if(!panel) return;

    const nodes = Array.from(panel.children);
    nodes.forEach(n => panel.appendChild(n.cloneNode(true)));

    let speed = 32;
    let translate = 0;
    let last = null;
    let paused = false;

    function widthOriginal(){ return panel.scrollWidth / 2; }

    function frame(ts){
      if(last === null) last = ts;
      const dt = (ts - last)/1000;
      last = ts;

      if(!paused){
        translate += speed * dt;
        const wrap = widthOriginal();
        if(translate >= wrap) translate -= wrap;
        panel.style.transform = `translateX(${-translate}px)`;
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    panel.addEventListener('mouseenter', ()=> paused = true);
    panel.addEventListener('mouseleave', ()=> paused = false);
    panel.addEventListener('touchstart', ()=> paused = true, {passive:true});
    panel.addEventListener('touchend', ()=> paused = false, {passive:true});

    window.addEventListener('resize', ()=>{ last = null; });
  })();

  (function(){
    const offcanvasEl = document.getElementById('offcanvasMenu');
    if(!offcanvasEl) return;

    offcanvasEl.addEventListener('click', (e)=>{
      if(e.target.matches('.nav-link')){
        const bs = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if(bs) bs.hide();
      }
    });

 
    offcanvasEl.addEventListener('show.bs.offcanvas', () => {
      document.body.classList.add('offcanvas-open');
    });
    offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
      document.body.classList.remove('offcanvas-open');
    });
  })();

  function handleContact(e){
    e.preventDefault();
    const btn = e.target.querySelector('.send-btn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(()=>{
      alert('Message simulated as sent — thank you!');
      btn.disabled = false;
      btn.textContent = 'Send Message';
      e.target.reset();
    },900);
  }

  document.documentElement.style.overflowX='hidden';
  document.body.style.overflowX='hidden';

  document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.querySelector('a[href="#hero"]');
    const navHeight = document.querySelector('.site-nav').offsetHeight;

    if(homeLink){
      homeLink.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector('#hero').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        window.scrollBy(0, -navHeight);
      });
    }
  });

  // Image modal preview for tour images
  (function(){
    const modalEl = document.getElementById('imageModal');
    if(!modalEl) return;
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const bsModal = new bootstrap.Modal(modalEl);

    document.querySelectorAll('.tour-images img').forEach(img => {
      img.addEventListener('click', function(){
        const src = this.getAttribute('src') || '';
        const alt = this.getAttribute('alt') || '';
        modalImage.src = src;
        modalImage.alt = alt;
        modalCaption.textContent = alt;
        bsModal.show();
      });
    });
  })();




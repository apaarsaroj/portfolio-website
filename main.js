// Small UI helpers for the portfolio
document.addEventListener('DOMContentLoaded', function(){
  // set current year
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // theme toggle
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if(saved === 'dark') document.body.classList.add('dark');
  if(toggle){
    toggle.addEventListener('click', ()=>{
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal, .stagger');
  if(revealEls.length){
    const observer = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold:0.2, rootMargin:'0px 0px -10% 0px'});
    revealEls.forEach(el=>observer.observe(el));
  }

  // basic contact form handler (client-side only)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      const email = data.get('email');
      const message = data.get('message');
      if(!name || !email || !message){
        alert('Please complete all fields.');
        return;
      }
      const targetEmail = form.getAttribute('data-email') || 'apaarsaroj@gmail.com';
      const mailto = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent('Portfolio contact from ' + name)}&body=${encodeURIComponent(message + '\n\n' + '— ' + name + ' (' + email + ')')}`;
      window.location.href = mailto;
    });
  }

  // subtle hero parallax
  const heroCard = document.querySelector('.hero-card');
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(heroCard && !prefersReduced){
    const onScroll = ()=>{
      const rect = heroCard.getBoundingClientRect();
      const viewHeight = window.innerHeight || 1;
      const progress = Math.min(Math.max((viewHeight - rect.top) / (viewHeight + rect.height), 0), 1);
      const offset = (progress - 0.5) * 14;
      heroCard.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }
});

/* =========================================
   TERRASTONE — MAIN JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAV scroll shadow ---- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ---- Mobile burger ---- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  const spans = burger.querySelectorAll('span');

  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    // Animate burger to X
    if (open) {
      spans[0].style.cssText = 'transform: translateY(7px) rotate(45deg)';
      spans[1].style.cssText = 'opacity: 0';
      spans[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      spans.forEach(s => s.style.cssText = '');
    });
  });

  /* ---- Active nav highlight ---- */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--orange)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));

  /* ---- Product filter ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      productCards.forEach((card, i) => {
        const show = filter === 'all' || card.dataset.category === filter;
        if (show) {
          card.classList.remove('hidden');
          card.style.animationDelay = `${i * 0.07}s`;
          card.style.animation = 'none';
          // Trigger reflow
          void card.offsetWidth;
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---- Product quick view modal ---- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose   = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');

  const productDetails = {
    'Negro Absoluto':    { desc: 'Granito importado con acabado pulido espejo. Ideal para interiores de alto impacto. Resistente a manchas y muy fácil de limpiar.', size: '60×60 cm', finish: 'Pulido', use: 'Interior' },
    'Travertino Beige':  { desc: 'Porcelanato de alta densidad que imita travertino natural. Perfecto para espacios luminosos y modernos.', size: '80×80 cm', finish: 'Mate', use: 'Interior / Exterior' },
    'Rústico Oxido':     { desc: 'Línea símil piedra con tonos tierra y oxido. Textura rugosa que aporta calidez y carácter a cualquier espacio.', size: '30×60 cm', finish: 'Texturado', use: 'Interior / Exterior' },
    'Arena Sahara':      { desc: 'Baldosa de exterior con tratamiento antideslizante certificado. Tonos cálidos que se integran con entornos naturales.', size: '45×45 cm', finish: 'Antideslizante', use: 'Exterior' },
    'Blanco Carrara':    { desc: 'Porcelanato premium que imita la veta del mármol de Carrara. Elegancia atemporal para cocinas, baños y living.', size: '60×120 cm', finish: 'Satinado', use: 'Interior' },
    'Café Imperial':     { desc: 'Granito con vetas doradas sobre fondo café oscuro. Acabado flameado que resalta la textura natural de la piedra.', size: '60×60 cm', finish: 'Flameado', use: 'Exterior' },
  };

  document.querySelectorAll('.product-card__quick').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card   = btn.closest('.product-card');
      const name   = card.querySelector('h3').textContent;
      const sub    = card.querySelector('p').textContent;
      const badge  = card.querySelector('.product-card__badge').textContent;
      const imgBg  = card.querySelector('.product-card__img').style.background;
      const detail = productDetails[name] || {};

      modalContent.innerHTML = `
        <div style="height:180px;border-radius:8px;margin-bottom:24px;background:${imgBg};position:relative;overflow:hidden;">
          <span style="position:absolute;top:14px;left:14px;background:var(--dark);color:#fff;font-family:var(--font-cond);font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;border-radius:4px;">${badge}</span>
        </div>
        <h2 style="font-family:var(--font-display);font-size:1.8rem;margin-bottom:8px;color:var(--dark);">${name}</h2>
        <p style="color:var(--gray);margin-bottom:20px;font-size:0.9rem;">${sub}</p>
        <p style="color:var(--dark);line-height:1.7;font-size:0.95rem;margin-bottom:24px;">${detail.desc || ''}</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px;">
          <div style="background:var(--off-white);padding:12px;border-radius:8px;text-align:center;">
            <div style="font-family:var(--font-cond);font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--gray);margin-bottom:4px;">Tamaño</div>
            <div style="font-weight:600;font-size:0.9rem;color:var(--dark);">${detail.size || '—'}</div>
          </div>
          <div style="background:var(--off-white);padding:12px;border-radius:8px;text-align:center;">
            <div style="font-family:var(--font-cond);font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--gray);margin-bottom:4px;">Acabado</div>
            <div style="font-weight:600;font-size:0.9rem;color:var(--dark);">${detail.finish || '—'}</div>
          </div>
          <div style="background:var(--off-white);padding:12px;border-radius:8px;text-align:center;">
            <div style="font-family:var(--font-cond);font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--gray);margin-bottom:4px;">Uso</div>
            <div style="font-weight:600;font-size:0.9rem;color:var(--dark);">${detail.use || '—'}</div>
          </div>
        </div>
        <a href="#contacto" class="btn btn--primary btn--full" onclick="closeModal()">Consultar precio</a>
      `;

      openModal();
    });
  });

  function openModal() {
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.closeModal = closeModal;

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---- Contact form ---- */
  const submitBtn = document.getElementById('submitBtn');
  const toast     = document.getElementById('toast');

  submitBtn.addEventListener('click', () => {
    const nombre   = document.getElementById('nombre').value.trim();
    const email    = document.getElementById('email').value.trim();
    const proyecto = document.getElementById('proyecto').value.trim();

    if (!nombre || !email || !proyecto) {
      shakeMissingFields();
      return;
    }

    // Simulate submission
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = '✓ Enviado';
      submitBtn.style.background = '#2a9d5c';

      // Clear form
      ['nombre', 'email', 'telefono', 'proyecto'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });

      // Show toast
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);

      // Reset button
      setTimeout(() => {
        submitBtn.textContent = 'Enviar consulta';
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 3000);
    }, 1200);
  });

  function shakeMissingFields() {
    const fields = [
      { id: 'nombre',   val: document.getElementById('nombre').value.trim() },
      { id: 'email',    val: document.getElementById('email').value.trim() },
      { id: 'proyecto', val: document.getElementById('proyecto').value.trim() },
    ];
    fields.forEach(f => {
      if (!f.val) {
        const el = document.getElementById(f.id);
        el.style.borderColor = '#e53e3e';
        el.style.animation = 'shake 0.4s ease';
        setTimeout(() => {
          el.style.animation = '';
          el.style.borderColor = '';
        }, 600);
      }
    });
  }

  // Add shake keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-6px); }
      40%      { transform: translateX(6px); }
      60%      { transform: translateX(-4px); }
      80%      { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll(
    '.producto-card, .project-card, .proceso-step, .empresa__stat, .section__title, .section__label'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  /* ---- Smooth anchor scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ---- Project cards hover tilt ---- */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `scale(1.02) perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  console.log('%cTerrastone — Calidad, Estilo y Exclusividad', 'color:#E85D04;font-family:serif;font-size:1.2rem;font-weight:bold;');
});

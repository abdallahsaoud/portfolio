// Comportements du design « Tableau blanc » : copie de l'e-mail, chiffres qui comptent, frise du parcours.
import { copy, countUp } from './kit.js';

const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-copy]').forEach((b) => copy(b, b.dataset.copy));

// Les chiffres comptent quand leur bloc arrive à l'écran.
if (!calm) {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const host = el.closest('[data-play]');
    if (!host) return;
    if (host.classList.contains('play')) countUp(el);
    else host.addEventListener('kit:play', () => countUp(el), { once: true });
  });
}

// La frise du parcours se trace au rythme du défilement ; chaque étape s'allume au passage du feutre.
const frise = document.querySelector('[data-frise]');
if (frise) {
  const steps = [...frise.querySelectorAll('[data-step]')];
  const update = () => {
    const r = frise.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (innerHeight * 0.62 - r.top) / r.height));
    frise.style.setProperty('--p', p.toFixed(4));
    const tip = p * r.height;
    steps.forEach((s) => {
      const lit = tip >= s.offsetTop + 12;
      s.classList.toggle('lit', lit);
      if (lit) s.classList.add('seen');
    });
  };
  let t = 0;
  addEventListener('scroll', () => { if (!t) t = requestAnimationFrame(() => { t = 0; update(); }); }, { passive: true });
  addEventListener('resize', update);
  update();
}

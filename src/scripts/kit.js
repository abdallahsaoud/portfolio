// Outils d'animation du site.
//  - <html class="touch"> sur téléphone (ou avec ?touch dans l'URL), "mouse" sinon
//  - [data-play]  reçoit .play une fois, quand l'élément arrive à l'écran (+ évènement "kit:play")
//  - [data-hover] reçoit .on au survol ; sur mobile, quand l'élément passe au milieu de l'écran
//  - copy(btn, texte) ; countUp(el) ; refresh() après un ajout au DOM
const root = document.documentElement;
export const touch = matchMedia('(hover: none)').matches || /[?&]touch\b/.test(location.search);
root.classList.add(touch ? 'touch' : 'mouse');

const once = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add('play');
  once.unobserve(e.target);
  e.target.dispatchEvent(new CustomEvent('kit:play'));
}), { threshold: 0.15 });

let hovers = [];
// En haut et en bas de page, la bande « milieu d'écran » s'étend pour que le premier et le dernier élément puissent s'activer.
const mid = () => {
  const lo = scrollY < 4 ? 0 : innerHeight * 0.3;
  const hi = scrollY + innerHeight > root.scrollHeight - 4 ? innerHeight : innerHeight * 0.62;
  // Un seul élément à la fois : le plus proche du milieu de la bande.
  const aim = (lo + hi) / 2;
  let best = null, gap = Infinity;
  hovers.forEach((el) => {
    const r = el.getBoundingClientRect(), c = r.top + r.height / 2;
    if (c > lo && c < hi && Math.abs(c - aim) < gap) { best = el; gap = Math.abs(c - aim); }
  });
  hovers.forEach((el) => el.classList.toggle('on', el === best));
};
export const refresh = () => {
  document.querySelectorAll('[data-play]:not(.play)').forEach((el) => once.observe(el));
  hovers = [...document.querySelectorAll('[data-hover]')];
  if (touch) return mid();
  hovers.forEach((el) => {
    if (el._kit) return;
    el._kit = true;
    el.addEventListener('mouseenter', () => el.classList.add('on'));
    el.addEventListener('mouseleave', () => el.classList.remove('on'));
  });
};
if (touch) {
  let t = 0;
  addEventListener('scroll', () => { if (!t) t = requestAnimationFrame(() => { t = 0; mid(); }); }, { passive: true });
}

export const copy = (btn, text) => btn.addEventListener('click', (e) => {
  e.preventDefault(); e.stopPropagation();
  // writeText rejette si le document n'a pas le focus : on ignore, le libellé confirme quand même le clic.
  try { navigator.clipboard.writeText(text).catch(() => {}); } catch (err) {}
  const old = btn.textContent;
  btn.textContent = 'Copié ✓';
  setTimeout(() => { btn.textContent = old; }, 1600);
});

// Compte de 0 à la valeur affichée (« ≈ 420 », « ≈ 30 % », « 15 ») ; ignore les textes sans nombre en tête.
export const countUp = (el, ms = 1300) => {
  const m = el.textContent.match(/^([≈ ]*)(\d+)(.*)$/);
  if (!m) return;
  const to = +m[2], t0 = performance.now();
  const tick = (t) => {
    const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
    el.textContent = m[1] + Math.round(to * e) + m[3];
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', refresh); else refresh();

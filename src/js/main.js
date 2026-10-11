// Бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
nav?.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });

// Форми заявки: відправка через Formspree без перезавантаження
document.querySelectorAll('[data-form]').forEach(form => {
  const ok = form.querySelector('.form__ok');
  const err = form.querySelector('.form__err');

  // Підстановка виробу з адреси ?product=Назва
  const product = new URLSearchParams(location.search).get('product');
  if (product) {
    const msg = form.querySelector('[name=message]');
    if (msg && !msg.value) msg.value = 'Виріб: ' + product + '\n';
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    ok.hidden = err.hidden = true;
    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true;
    try {
      const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error(r.status);
      form.reset();
      ok.hidden = false;
    } catch {
      err.hidden = false;
    } finally {
      btn.disabled = false;
    }
  });
});

// Відео: плеєр YouTube підвантажується тільки після кліку
document.querySelectorAll('[data-video]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + el.dataset.video + '?autoplay=1&rel=0';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    f.title = el.getAttribute('aria-label');
    el.replaceChildren(f);
  }, { once: true });
});

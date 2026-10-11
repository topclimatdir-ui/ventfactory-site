import { esc, photo } from './lib.mjs';
import { layout, leadForm } from './layout.mjs';

const crumbs = (site, items) => `<nav class="crumbs container" aria-label="Навігація"><a href="${site.base}/">Головна</a>${items.map(i => ` <span>/</span> ${i.href ? `<a href="${site.base}${i.href}">${esc(i.title)}</a>` : `<span>${esc(i.title)}</span>`}`).join('')}</nav>`;

// Розділ «Вентиляція»: список підрозділів
export function ventHub({ site, vent }) {
  const b = site.base;
  const body = `
${crumbs(site, [{ title: 'Вентиляція' }])}
<section class="section section--tight">
  <div class="container">
    <h1>${esc(vent.hub.h1)}</h1>
    <p class="lead">${esc(vent.hub.lead)}</p>
    <div class="cards cards--5">
      ${vent.items.map(i => `<a class="card" href="${b}/ventyliatsiia/${i.slug}/">
        ${photo(site, i.photo, { ratio: '3/2' })}
        <h3>${esc(i.title)}</h3><p>${esc(i.short)}</p>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>
<section class="section section--gray" id="zayavka-block">
  <div class="container form-block">
    <div><h2>Отримати прорахунок</h2><p class="section__intro">Розкажіть, що потрібно, і ми зв'яжемося.</p>
    <p><a class="phone-big" href="tel:${site.phoneRaw}">${esc(site.phone)}</a></p></div>
    ${leadForm(site)}
  </div>
</section>`;
  return layout(site, { title: vent.hub.seo.title, description: vent.hub.seo.description, path: '/ventyliatsiia/', body });
}

// Підрозділ вентиляції
export function ventPage({ site, vent }, item) {
  const b = site.base;
  const path = `/ventyliatsiia/${item.slug}/`;
  const others = vent.items.filter(i => i.slug !== item.slug);
  const gallery = item.gallery?.length
    ? item.gallery.map(src => photo(site, { src, label: `Фото: ${item.title}` }, { ratio: '4/3' })).join('')
    : [1, 2, 3].map(n => photo(site, `Фото об'єкта ${n}: ${item.title.toLowerCase()}`, { ratio: '4/3' })).join('');
  const body = `
${crumbs(site, [{ title: 'Вентиляція', href: '/ventyliatsiia/' }, { title: item.title }])}
<section class="section section--tight">
  <div class="container hero__in">
    <div class="hero__text">
      <h1>${esc(item.h1)}</h1>
      <p class="lead">${esc(item.lead)}</p>
      <div class="hero__btns"><a class="btn" href="#zayavka">Отримати прорахунок</a><a class="btn btn--ghost" href="tel:${site.phoneRaw}">${esc(site.phone)}</a></div>
    </div>
    <div class="hero__photo">${photo(site, item.photo, { ratio: '4/3', eager: true })}</div>
  </div>
</section>
<section class="section section--gray">
  <div class="container two-col">
    <div><h2>Що ми робимо</h2><ul class="ticks">${item.tasks.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>
    <div><h2>Як працюємо</h2>
      <ol class="steps steps--list">${item.includes.map((s, i) => `<li><span class="steps__n">${i + 1}</span><div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div></li>`).join('')}</ol></div>
  </div>
</section>
<section class="section">
  <div class="container"><h2>Наші роботи</h2><div class="gallery">${gallery}</div></div>
</section>
<section class="section section--gray" id="zayavka-block">
  <div class="container form-block">
    <div><h2>Отримати прорахунок</h2><p class="section__intro">Опишіть об'єкт або прикріпіть креслення. Зв'яжемося, уточнимо деталі і порахуємо вартість.</p>
    <p><a class="phone-big" href="tel:${site.phoneRaw}">${esc(site.phone)}</a></p>
    <p><a href="${site.telegram}" target="_blank" rel="noopener">Написати в Telegram</a></p></div>
    ${leadForm(site, { topic: item.form })}
  </div>
</section>
<section class="section">
  <div class="container"><h2>Інші напрями</h2>
    <div class="chips">${others.map(o => `<a class="chip" href="${b}/ventyliatsiia/${o.slug}/">${esc(o.title)}</a>`).join('')}</div></div>
</section>`;
  return layout(site, { title: item.seo.title, description: item.seo.description, path, body });
}

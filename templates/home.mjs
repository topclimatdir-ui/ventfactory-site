import { esc, photo, video } from './lib.mjs';
import { layout, leadForm } from './layout.mjs';

export function homePage({ site, home, products, services, objects }) {
  const b = site.base;
  const body = `
<section class="hero">
  <div class="container hero__in">
    <div class="hero__text">
      <h1>${esc(home.hero.title)}</h1>
      <p class="lead">${esc(home.hero.text)}</p>
      <div class="hero__btns">
        <a class="btn" href="#zayavka">Отримати прорахунок</a>
        <a class="btn btn--ghost" href="tel:${site.phoneRaw}">${esc(site.phone)}</a>
      </div>
    </div>
    <div class="hero__photo">${photo(site, home.hero.photo, { ratio: '16/11', eager: true })}</div>
  </div>
</section>

<section class="facts">
  <div class="container facts__grid">
    ${home.facts.map(f => `<div class="fact"><b>${esc(f.title)}</b><span>${esc(f.text)}</span></div>`).join('\n    ')}
  </div>
</section>

<section class="section">
  <div class="container">
    <h2>${esc(home.servicesTitle)}</h2>
    <p class="section__intro">${esc(home.servicesIntro)}</p>
    <div class="cards cards--4">
      ${services.items.map(s => `<a class="card" href="${b}/${s.slug}/">
        ${photo(site, s.photo, { ratio: '3/2' })}
        <h3>${esc(s.title)}</h3><p>${esc(s.short)}</p>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--gray">
  <div class="container">
    <h2>${esc(home.advantagesTitle)}</h2>
    <p class="section__intro">${esc(home.advantagesIntro)}</p>
    <ol class="steps">
      ${home.steps.map((s, i) => `<li><span class="steps__n">${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

${home.videos?.length ? `<section class="section">
  <div class="container">
    <h2>${esc(home.videosTitle)}</h2>
    <p class="section__intro">${esc(home.videosIntro)}</p>
    <div class="cards cards--3">
      ${home.videos.map(v => video(v)).join('\n      ')}
    </div>
  </div>
</section>` : ''}

<section class="section section--gray">
  <div class="container">
    <div class="section__head"><h2>${esc(home.catalogTitle)}</h2><a class="more" href="${b}/produktsiya/">Увесь каталог →</a></div>
    <div class="cards cards--3 cards--tiles">
      ${products.categories.map(c => `<a class="card card--tile" href="${b}/${c.slug}/">
        ${photo(site, c.photo, { ratio: '1/1' })}
        <h3>${esc(c.title)}</h3><p>${esc(c.short)}</p>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--gray">
  <div class="container">
    <div class="section__head"><h2>${esc(home.objectsTitle)}</h2><a class="more" href="${b}/obiekty/">Усі об'єкти →</a></div>
    <div class="cards cards--3">
      ${objects.items.map(o => `<a class="card" href="${b}/obiekty/#${o.slug}">
        ${photo(site, o.after, { ratio: '3/2' })}
        <h3>${esc(o.title)}</h3><p>${esc(o.place)}, ${esc(o.year)}</p>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section" id="zayavka-block">
  <div class="container form-block">
    <div>
      <h2>${esc(home.formTitle)}</h2>
      <p class="section__intro">${esc(home.formText)}</p>
      <p><a class="phone-big" href="tel:${site.phoneRaw}">${esc(site.phone)}</a></p>
      <p><a href="${site.telegram}" target="_blank" rel="noopener">Написати в Telegram</a></p>
    </div>
    ${leadForm(site)}
  </div>
</section>`;
  return layout(site, { title: home.seo.title, description: home.seo.description, path: '/', body });
}

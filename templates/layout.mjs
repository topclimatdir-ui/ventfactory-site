import { esc } from './lib.mjs';

const tgIcon = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M21.5 3.5 2.9 10.7c-1 .4-1 1.1-.2 1.3l4.7 1.5 1.8 5.6c.2.6.4.8.8.8.4 0 .6-.2.9-.4l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8L22.9 5c.3-1.2-.4-1.7-1.4-1.5ZM9 13.4l9.3-5.9c.4-.3.8-.1.5.2l-7.6 6.9-.3 3.2-1.9-4.4Z"/></svg>`;

export function layout(site, { title, description, path = '/', body, schema = true }) {
  const b = site.base;
  const canonical = `https://${site.domain}${path}`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    url: `https://${site.domain}/`,
    telephone: site.phoneRaw,
    email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: 'вул. Вільної Ічкерії, 15', addressLocality: site.city, addressCountry: 'UA' }
  };
  return `<!doctype html>
<html lang="uk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="uk_UA">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<link rel="icon" href="${b}/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${b}/css/style.css">
${schema ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : ''}
</head>
<body>
<header class="header">
  <div class="container header__in">
    <a class="logo" href="${b}/" aria-label="${esc(site.name)} — на головну">ВЕНТ<span>ФЕКТОРІ</span></a>
    <nav class="nav" id="nav" aria-label="Основне меню">
      ${site.nav.map(n => `<a href="${b}${n.href}"${n.href === path ? ' aria-current="page"' : ''}>${esc(n.title)}</a>`).join('\n      ')}
      <a class="nav__phone-m" href="tel:${site.phoneRaw}">${esc(site.phone)}</a>
    </nav>
    <a class="header__phone" href="tel:${site.phoneRaw}">${esc(site.phone)}</a>
    <a class="btn btn--sm header__cta" href="${b}/kontakty/#zayavka">Прорахунок</a>
    <button class="burger" id="burger" aria-label="Меню" aria-expanded="false" aria-controls="nav"><i></i><i></i><i></i></button>
  </div>
</header>
<main>
${body}
</main>
<footer class="footer">
  <div class="container footer__grid">
    <div>
      <div class="logo logo--light">ВЕНТ<span>ФЕКТОРІ</span></div>
      <p>Виробництво повітроводів, розкрій металу, поставка обладнання і монтаж вентиляції під ключ.</p>
    </div>
    <div>
      <h4>Контакти</h4>
      <p><a href="tel:${site.phoneRaw}">${esc(site.phone)}</a></p>
      <p><a href="mailto:${site.email}">${esc(site.email)}</a></p>
      <p><a href="${site.telegram}" target="_blank" rel="noopener">Telegram</a></p>
      <p>${esc(site.address)}</p>
      <p class="muted">${esc(site.hours)}</p>
    </div>
    <div>
      <h4>Розділи</h4>
      ${site.nav.map(n => `<p><a href="${b}${n.href}">${esc(n.title)}</a></p>`).join('\n      ')}
    </div>
  </div>
  <div class="container footer__bottom">© ${new Date().getFullYear()} ${esc(site.name)}</div>
</footer>
<a class="tg-float" href="${site.telegram}" target="_blank" rel="noopener" aria-label="Написати в Telegram">${tgIcon}<span>Telegram</span></a>
<script src="${b}/js/main.js" defer></script>
</body>
</html>`;
}

// Форма заявки (використовується на головній і в контактах)
export function leadForm(site, { id = 'zayavka' } = {}) {
  return `<form class="form" id="${id}" data-form action="${esc(site.formAction)}" method="POST" enctype="multipart/form-data">
  <div class="form__row">
    <label>Ім'я<input name="name" type="text" required autocomplete="name"></label>
    <label>Телефон<input name="phone" type="tel" required autocomplete="tel" placeholder="+38 0__ ___ __ __"></label>
  </div>
  <label>Що потрібно
    <select name="topic" required>
      <option value="">Оберіть…</option>
      ${site.formTopics.map(t => `<option>${esc(t)}</option>`).join('')}
    </select>
  </label>
  <label>Опис<textarea name="message" rows="4" placeholder="Розміри, кількість, об'єкт, терміни"></textarea></label>
  <label>Файл (PDF, DWG, JPG, Excel)<input name="file" type="file" accept=".pdf,.dwg,.jpg,.jpeg,.png,.xls,.xlsx"></label>
  <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
  <input type="hidden" name="_subject" value="Нова заявка з сайту ${esc(site.domain)}">
  <button class="btn" type="submit">Надіслати заявку</button>
  <p class="form__note">Натискаючи кнопку, ви погоджуєтесь на обробку наданих даних для зв'язку з вами.</p>
  <p class="form__ok" hidden role="status">Дякуємо, зв'яжемося!</p>
  <p class="form__err" hidden role="alert">Не вдалося надіслати. Зателефонуйте ${esc(site.phone)} або напишіть у Telegram.</p>
</form>`;
}

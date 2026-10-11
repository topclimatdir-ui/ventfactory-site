// Спільні допоміжні функції шаблонів
export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Фото або сіра заглушка з підписом. Щоб замінити: вкажіть шлях у "src" (напр. "/images/hero.jpg").
export function photo(site, p, { ratio = '4/3', cls = '', eager = false } = {}) {
  const label = typeof p === 'string' ? p : p.label;
  const src = typeof p === 'string' ? '' : p.src;
  if (src) {
    return `<img class="photo ${cls}" style="aspect-ratio:${ratio}" src="${/^https?:/.test(src) ? esc(src) : site.base + esc(src)}" alt="${esc(label)}" ${eager ? '' : 'loading="lazy"'} decoding="async">`;
  }
  return `<div class="ph ${cls}" style="aspect-ratio:${ratio}" role="img" aria-label="${esc(label)}"><span>${esc(label)}</span></div>`;
}

export const link = (site, href) => site.base + href;

// Відео YouTube: у JSON вкажіть лише "id" (те, що після v= у посиланні). Плеєр вантажиться після кліку.
export function video(v, { ratio = '16/9' } = {}) {
  // Власне відео: вкажіть "src" (mp4 у src/video/) і "poster" (обкладинка)
  if (v.src) return `<video class="video" style="aspect-ratio:${ratio}" src="${esc(v.src)}" poster="${esc(v.poster || '')}" controls muted loop playsinline preload="metadata" aria-label="${esc(v.title)}"></video>`;
  const url = `https://www.youtube.com/watch?v=${esc(v.id)}`;
  return `<a class="video" data-video="${esc(v.id)}" href="${url}" target="_blank" rel="noopener" style="aspect-ratio:${ratio};background-image:url(https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg)" aria-label="Дивитися відео: ${esc(v.title)}"><span class="video__play" aria-hidden="true"></span><span class="video__title">${esc(v.title)}</span></a>`;
}

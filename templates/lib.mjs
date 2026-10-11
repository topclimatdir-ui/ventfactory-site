// Спільні допоміжні функції шаблонів
export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Фото або сіра заглушка з підписом. Щоб замінити: вкажіть шлях у "src" (напр. "/images/hero.jpg").
export function photo(site, p, { ratio = '4/3', cls = '', eager = false } = {}) {
  const label = typeof p === 'string' ? p : p.label;
  const src = typeof p === 'string' ? '' : p.src;
  if (src) {
    return `<img class="photo ${cls}" style="aspect-ratio:${ratio}" src="${site.base}${esc(src)}" alt="${esc(label)}" ${eager ? '' : 'loading="lazy"'} decoding="async">`;
  }
  return `<div class="ph ${cls}" style="aspect-ratio:${ratio}" role="img" aria-label="${esc(label)}"><span>${esc(label)}</span></div>`;
}

export const link = (site, href) => site.base + href;

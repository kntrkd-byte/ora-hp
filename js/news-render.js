async function renderNews(containerId, limit = 0) {
  const el = document.getElementById(containerId);
  if (!el) return;
  try {
    const res = await fetch('data/news.json');
    const items = await res.json();
    const list = limit ? items.slice(0, limit) : items;
    el.innerHTML = list.map(item => `
      <article class="news-item fade-in">
        <div class="news-meta">
          <time class="news-date">${item.date}</time>
          <span class="news-cat">${item.category}</span>
        </div>
        <h3 class="news-title">${item.title}</h3>
        <p class="news-body">${item.body}</p>
      </article>
    `).join('');
  } catch (e) {
    el.innerHTML = '<p style="color:var(--color-muted);">お知らせを読み込めませんでした</p>';
  }
}

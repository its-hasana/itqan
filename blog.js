(() => {
  const cfg = window.ITQAN_CONFIG;
  const list = document.getElementById('blog-list');
  const search = document.getElementById('blog-search');
  const empty = document.getElementById('blog-empty');

  const formatDate = value => new Date(`${value}T00:00:00`).toLocaleDateString('en-GB', {day:'numeric', month:'short', year:'numeric'});

  function render(posts) {
    list.innerHTML = posts.map(post => `
      <a class="blog-card in-view" href="article.html?slug=${encodeURIComponent(post.slug)}">
        <div class="blog-meta"><b>${post.category}</b><span>${formatDate(post.date)}</span><span>${post.readTime}</span></div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <span class="read-more">Read article →</span>
      </a>`).join('');
    empty.hidden = posts.length !== 0;
  }

  render(cfg.blogPosts);
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    const posts = !q ? cfg.blogPosts : cfg.blogPosts.filter(p => [p.title,p.category,p.excerpt].join(' ').toLowerCase().includes(q));
    render(posts);
  });
})();

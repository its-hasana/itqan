(() => {
  const cfg = window.ITQAN_CONFIG;
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const post = cfg.blogPosts.find(x => x.slug === slug) || cfg.blogPosts[0];
  const formatDate = value => new Date(`${value}T00:00:00`).toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'});

  document.title = `${post.title} | Itqan Plus`;
  document.querySelector('meta[name="description"]').setAttribute('content', post.excerpt);
  document.getElementById('article-category').textContent = post.category;
  document.getElementById('article-title').textContent = post.title;
  document.getElementById('article-excerpt').textContent = post.excerpt;
  document.getElementById('article-date').textContent = formatDate(post.date);
  document.getElementById('article-time').textContent = post.readTime;
  document.getElementById('article-body').innerHTML = post.body.map(block => block.type === 'h2' ? `<h2>${block.text}</h2>` : `<p>${block.text}</p>`).join('');
  document.getElementById('article-whatsapp').href = `https://wa.me/${cfg.brand.whatsapp}?text=${encodeURIComponent(`Hello Itqan Plus, I read your article "${post.title}" and want to discuss a project.`)}`;
})();

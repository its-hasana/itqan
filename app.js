(() => {
  const cfg = window.ITQAN_CONFIG;
  const byId = id => document.getElementById(id);
  const money = n => new Intl.NumberFormat('en-US').format(n);
  const waUrl = `https://wa.me/${cfg.brand.whatsapp}`;

  ['header-whatsapp','hero-whatsapp','contact-whatsapp','footer-whatsapp','cta-whatsapp'].forEach(id => {
    const el = byId(id);
    if (el) el.href = waUrl;
  });
  if (byId('display-phone')) byId('display-phone').textContent = cfg.brand.displayPhone;
  if (byId('bkash-number')) byId('bkash-number').textContent = cfg.brand.bkash;
  if (byId('footer-whatsapp')) byId('footer-whatsapp').textContent = cfg.brand.displayPhone;
  if (byId('footer-bkash')) byId('footer-bkash').textContent = `bKash: ${cfg.brand.bkash}`;
  if (byId('year')) byId('year').textContent = new Date().getFullYear();

  const pricingGrid = byId('pricing-grid');
  if (pricingGrid) {
    pricingGrid.innerHTML = cfg.packages.map(pkg => `
      <article class="price-card ${pkg.featured ? 'featured' : ''}">
        ${pkg.featured ? '<span class="popular">Most Popular</span>' : ''}
        <span class="price-category">${pkg.category}</span>
        <h3>${pkg.name}</h3>
        <p>${pkg.description}</p>
        <div class="price"><small>BDT</small>${money(pkg.price)}<span>${pkg.suffix}</span></div>
        <div class="features">${pkg.features.map(f => `<span><i>✓</i>${f}</span>`).join('')}</div>
        ${pkg.addon ? `<div class="addon">${pkg.addon}</div>` : ''}
        <a class="btn ${pkg.featured ? 'btn-primary' : 'btn-outline'}" href="#contact" data-package="${pkg.name}">Choose this package <span>→</span></a>
      </article>`).join('');
  }

  const individualGrid = byId('individual-grid');
  if (individualGrid) {
    individualGrid.innerHTML = cfg.individualServices.map(item => `
      <div class="individual-item">
        <span><b>${item.name}</b><small>${item.meta}</small></span>
        <strong>${item.price}</strong>
      </div>`).join('');
  }

  const testimonialGrid = byId('testimonial-grid');
  if (testimonialGrid) {
    testimonialGrid.innerHTML = cfg.testimonials.map(item => {
      const initials = item.name.split(' ').map(x => x[0]).slice(0,2).join('');
      return `
        <article class="testimonial-card">
          ${item.demo ? '<span class="testimonial-badge">Sample review layout</span>' : ''}
          <blockquote>“${item.quote}”</blockquote>
          <div class="testimonial-person"><span class="testimonial-avatar">${initials}</span><div><b>${item.name}</b><small>${item.role}</small></div></div>
        </article>`;
    }).join('');
  }

  const blogPreview = byId('blog-preview');
  if (blogPreview) {
    blogPreview.innerHTML = cfg.blogPosts.slice(0,3).map(post => `
      <a class="blog-card" href="article.html?slug=${encodeURIComponent(post.slug)}">
        <div class="blog-meta"><b>${post.category}</b><span>${formatDate(post.date)}</span><span>${post.readTime}</span></div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <span class="read-more">Read article →</span>
      </a>`).join('');
  }

  const portfolioGrid = byId('portfolio-grid');
  const filterWrap = byId('portfolio-filters');
  const modal = byId('portfolio-modal');

  function renderPortfolio(category = 'All') {
    if (!portfolioGrid) return;
    const items = category === 'All' ? cfg.portfolio : cfg.portfolio.filter(item => item.category === category);
    portfolioGrid.innerHTML = items.map(item => `
      <button class="portfolio-card" type="button" data-portfolio-index="${cfg.portfolio.indexOf(item)}" aria-label="View ${item.title}">
        <img src="${item.image}" alt="${item.alt}" loading="lazy" />
        <span class="portfolio-overlay"><span>${item.category}</span><b>${item.title}</b></span>
      </button>`).join('');
    observeAnimated();
  }

  if (filterWrap) {
    const cats = ['All', ...new Set(cfg.portfolio.map(x => x.category))];
    filterWrap.innerHTML = cats.map((cat, i) => `<button type="button" class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${cat}">${cat}</button>`).join('');
    filterWrap.addEventListener('click', e => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      filterWrap.querySelectorAll('.filter-btn').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      renderPortfolio(btn.dataset.filter);
    });
    renderPortfolio();
  }

  if (portfolioGrid && modal) {
    portfolioGrid.addEventListener('click', e => {
      const card = e.target.closest('[data-portfolio-index]');
      if (!card) return;
      const item = cfg.portfolio[Number(card.dataset.portfolioIndex)];
      byId('modal-image').src = item.image;
      byId('modal-image').alt = item.alt;
      byId('modal-category').textContent = item.category;
      byId('modal-title').textContent = item.title;
      modal.showModal();
    });
    byId('modal-close')?.addEventListener('click', () => modal.close());
    modal.addEventListener('click', e => {
      const rect = modal.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) modal.close();
    });
  }

  const select = byId('service-select');
  if (select) {
    const serviceGroups = [
      'Social Media Management',
      'Website & Landing Pages',
      'Content & SEO Articles',
      'Graphics & Branding',
      'Reels & Promotional Video',
      'Local SEO',
      'LinkedIn Management',
      'Paid Campaign Management',
      'Client Lead Generation'
    ];
    const choices = [
      ...cfg.packages.map(p => p.name),
      ...serviceGroups,
      ...cfg.individualServices.map(s => s.name),
      'Custom Combined Package',
      'Custom Service'
    ];
    select.innerHTML = [...new Set(choices)].map(x => `<option>${x}</option>`).join('');

    const customWrap = byId('custom-wrap');
    select.addEventListener('change', () => {
      if (customWrap) customWrap.hidden = select.value !== 'Custom Service';
    });

    document.addEventListener('click', e => {
      const packageLink = e.target.closest('[data-package]');
      const serviceLink = e.target.closest('[data-service]');
      if (packageLink) select.value = packageLink.dataset.package;
      if (serviceLink) select.value = serviceLink.dataset.service;
    });
  }

  const form = byId('lead-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const service = data.get('service') === 'Custom Service' ? data.get('customService') : data.get('service');
      const message = [
        'Hello Itqan Plus, I want to discuss a service/package.',
        '',
        `Name: ${data.get('name') || ''}`,
        `Business / Brand: ${data.get('business') || 'Not provided'}`,
        `WhatsApp: ${data.get('phone') || ''}`,
        `Interested in: ${service || 'Custom service'}`,
        `Requirement: ${data.get('notes') || 'No extra notes'}`
      ].join('\n');
      window.open(`${waUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    });
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  }), {threshold:.08}) : null;

  function observeAnimated() {
    const items = document.querySelectorAll('.reveal-on-scroll,.service-group,.price-card,.process-grid article,.portfolio-card,.testimonial-card,.blog-card,.trust-grid article');
    items.forEach(el => {
      if (el.dataset.observed) return;
      el.dataset.observed = '1';
      if (observer) observer.observe(el); else el.classList.add('in-view');
    });
  }
  observeAnimated();

  function formatDate(value) {
    const date = new Date(`${value}T00:00:00`);
    return date.toLocaleDateString('en-GB', {day:'numeric', month:'short', year:'numeric'});
  }
})();

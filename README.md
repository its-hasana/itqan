# Itqan Plus Vercel Website

A light-theme, vivid-orange static website for **Itqan Plus**. The site is ready for Vercel and does not require a backend for the current WhatsApp enquiry flow.

## Pages

- `index.html` — main agency website
- `blog.html` — searchable blog index
- `article.html?slug=...` — individual blog article template
- `404.html` — fallback page

## Included sections

The homepage follows the same broad section flow as the supplied Grow reference: hero, channel strip, connected-service overview, services/features, portfolio, agency/about, service comparison, outcomes/social proof style section, process, pricing, testimonials, article/case-study style content, FAQ, project CTA and footer.

## Change package prices

Open `config.js` and edit the `price` value inside `packages`.

Example:

```js
{
  name: "Social Media Growth",
  price: 5000,
  suffix: "/month"
}
```

Change `5000` to any new BDT amount. The website updates automatically.

## Change individual service prices

In `config.js`, edit `individualServices`:

```js
{ name: "30–60 sec Reel Edit", price: "1,200 BDT", meta: "per video" }
```

## Add or replace portfolio work

1. Put the new image inside `/assets/`.
2. Open `config.js`.
3. Add/edit an item in `portfolio`:

```js
{
  title: "Campaign Name",
  category: "Social Media Design",
  image: "assets/your-image.webp",
  alt: "Description of the design"
}
```

Portfolio filters are created automatically from the categories.

## Add a blog post

Open `config.js` and add a new object inside `blogPosts`:

```js
{
  slug: "your-article-slug",
  category: "Social Media",
  title: "Your Article Title",
  excerpt: "Short introduction for the blog card.",
  date: "2026-09-18",
  readTime: "5 min read",
  body: [
    { type: "p", text: "Opening paragraph..." },
    { type: "h2", text: "Section heading" },
    { type: "p", text: "Section paragraph..." }
  ]
}
```

The post will automatically appear on the blog page. The newest items at the top of `blogPosts` also appear in the homepage Insights section.

## Testimonials

The included Bangladeshi names and quotes are visibly marked **Sample testimonial** for layout preview. Replace them with verified client feedback before publishing. In `config.js`, set `demo: false` for real verified testimonials if you do not want the sample label.

## WhatsApp and bKash

Both currently use:

- WhatsApp: `+880 1776-165161`
- bKash: `01776165161`

Edit them in `config.js` under `brand` if needed.

## Contact form

The form does not send data to a server. It creates a pre-filled message and opens WhatsApp to the Itqan Plus number.

## Deploy to Vercel

### Option 1: GitHub

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. In Vercel, choose **Add New Project** and import the repository.
4. Framework preset: **Other**.
5. No build command is required.
6. Deploy.

### Option 2: Vercel CLI

From this folder:

```bash
npx vercel
```

Follow the prompts. No build step is needed.

## Brand assets

The supplied Itqan Plus logo is in `assets/itqan-plus-logo.png`. The five supplied design samples are optimized as WebP files in the same folder.

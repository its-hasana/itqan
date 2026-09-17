# Itqan Plus — Vercel-ready website

This is a static, Vercel-ready website for **Itqan Plus**. The homepage is fully English and uses the supplied Itqan Plus logo and five supplied portfolio designs.

## Homepage order

1. Hero
2. Packages & pricing
3. Contact / WhatsApp enquiry form
4. Services
5. Portfolio
6. Process
7. Trust points
8. Review layout
9. Blog preview
10. FAQ
11. Final CTA and footer

The layout intentionally keeps pricing and the enquiry form near the top of the page and uses tighter section spacing so the page does not feel empty.

## Change package prices

Open `config.js` and edit only the values in `packages` and `individualServices`.

Example:

```js
price: 5000
```

Change `5000` to the new price. The pricing card and contact-form options are generated from the same configuration.

## WhatsApp and bKash

Both are configured in `config.js`:

```js
whatsapp: "8801776165161",
bkash: "01776165161"
```

The contact form does not store customer data on a server. It creates a pre-filled WhatsApp message and opens WhatsApp.

## Portfolio

Portfolio images are in `/assets` and entries are controlled in `config.js` under `portfolio`.

## Reviews

The current Bangladeshi-name reviews are clearly marked as sample review layouts. Replace them with verified client feedback in `config.js` before presenting them as real testimonials. Set `demo: false` after replacing a sample with a real review.

## Blog

- `blog.html` — article listing and search
- `article.html` — individual article page
- `blog.js` — blog listing logic
- `article.js` — article rendering logic

Add new posts inside `blogPosts` in `config.js`.

## Deploy to Vercel

1. Extract the ZIP.
2. Upload **the files inside the folder** to the root of your GitHub repository. Do not upload the containing folder as another nested directory.
3. Import the repository in Vercel.
4. Framework Preset: `Other`.
5. Keep Root Directory at the repository root.
6. No build command is required.
7. Deploy.

`vercel.json` is already included.

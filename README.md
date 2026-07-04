# Faizyab Ahmad — Portfolio

Plain HTML / CSS / JS. No build step, no frameworks — works straight on GitHub Pages.

## Files
- `index.html` — all content/structure
- `style.css` — the whole design system (colors, type, layout, responsive rules)
- `script.js` — mobile nav, scroll reveal, stat count-up, skill bar animation, portfolio filter, contact form

## Put it on GitHub Pages (5 minutes)
1. Create a new repo on GitHub, e.g. `faizyab-portfolio`.
2. Upload these three files (and any images you add) to the repo root — or `git push` them.
3. In the repo: **Settings → Pages → Source → Deploy from branch → main / (root)** → Save.
4. Your site goes live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

No domain needed — this URL works as-is.

## Swap in your real photos
Search `index.html` for the six `.gallery__frame` blocks (the colored placeholder tiles in the "Design Studio" section) —
each currently says `REPLACE WITH IMAGE` in the corner. Replace the `<div class="gallery__frame" style="...">TEXT</div>`
with:
```html
<div class="gallery__frame">
  <img src="images/your-file.jpg" alt="Describe the image">
</div>
```
and add this to `style.css` if you do:
```css
.gallery__frame img{ width:100%; height:100%; object-fit:cover; }
```
Do the same for a hero portrait if you want one — there isn't one currently, by design (the rotating
"approved" stamp badge fills that role), but you're free to add a photo next to the hero text.

## Make the contact form actually deliver mail silently
Right now, submitting the form opens the visitor's email client with everything pre-filled (works with
zero backend — good enough for most portfolios). If you'd rather it submit silently in the background:

1. Sign up free at [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com/).
2. Formspree is simplest: create a form, get your endpoint URL, then in `index.html` change:
   ```html
   <form class="contact__form" id="contactForm">
   ```
   to:
   ```html
   <form class="contact__form" id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
3. Remove the `e.preventDefault()` line in `script.js`'s submit handler (or just delete the whole
   `Contact form` block) so the browser does a normal POST.

## Customizing colors / fonts
Everything is driven by CSS variables at the top of `style.css`:
```css
--ink, --ink-2, --ink-3   → background layers
--paper                   → main text color
--stamp                   → the red/orange "approval" accent
--teal                    → the secondary creative accent
--f-display / --f-body / --f-mono → the three fonts in use
```
Change these and the whole site re-themes.

## Notes
- Fully responsive (mobile nav collapses to a hamburger under 720px).
- Respects `prefers-reduced-motion` — animations turn off automatically for people who've asked for that.
- No external JS libraries — just vanilla JS, so there's nothing to install or keep updated.

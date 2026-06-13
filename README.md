# De Shane Chiropractic and Health Institute — Website

Single-page marketing website for **De Shane Chiropractic and Health Institute**, a
chiropractic clinic in Sarnia, ON (Dr. Dave de Shane).

- **Live site:** _GitHub Pages (enable in repo Settings → Pages → Branch: `main` / root)_
- **Tech:** Vanilla single-file HTML/CSS/JS — no build step. Open `index.html` in a browser.

## Business details
- Phone: (519) 332-0200
- Address: 500 Exmouth St, Unit 13, Sarnia, ON
- Hours: Mon 9–1 · 3–6 | Tue 9–1 | Wed Closed | Thu 9–1 · 3–6 | Fri 9–1 | Sat 9–12 | Sun Closed
- Rating: 4.9/5 from 630+ reviews

## To do before launch
- [ ] Confirm street address (443 vs 500 Exmouth St) and update if needed
- [ ] Replace the **About** photo placeholder with a real photo of Dr. de Shane / the clinic
- [ ] Replace the three sample **reviews** with real Google reviews
- [ ] Buy domain, add a `CNAME` file with the domain, and point DNS to GitHub Pages

## Custom domain (when ready)
1. Add a file named `CNAME` containing only your domain, e.g. `deshanechiro.com`
2. At your registrar, create DNS records:
   - **A** records for the apex domain → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** for `www` → `devish6.github.io`
3. In repo Settings → Pages, set the custom domain and enable "Enforce HTTPS".

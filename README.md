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
- [x] Real photo of Dr. de Shane in the About section
- [x] Real Google/RateMDs reviews
- [ ] Connect SheetDB so the admin panel works (see below)
- [ ] Set a real admin password in `config.js`
- [ ] Buy domain, add a `CNAME` file with the domain, and point DNS to GitHub Pages

## Admin panel + alert bar (`admin.html`)

The site has a hidden control panel at **`/admin.html`** where staff can:
- turn a scrolling **alert bar** on/off and set its message,
- update the **address**, and
- update the **office hours**.

Changes are stored in a Google Sheet (via [SheetDB](https://sheetdb.io)) so they show
to **all visitors**. The public page reads the sheet on load; the admin page writes to it.

> **Security note:** This is a *soft* gate — on a static site the password lives in
> `config.js` (visible in this public repo). Fine for an announcement bar; for stronger
> security you'd need a serverless function.

### One-time setup
1. **Create a Google Sheet** with a tab named `Sheet1`. In **row 1**, put these exact
   column headers (one per cell, left to right):

   ```
   id  alert_enabled  alert_text  address  hours_mon  hours_tue  hours_wed  hours_thu  hours_fri  hours_sat  hours_sun
   ```

2. **Add one data row** (row 2) with starting values:

   ```
   1  FALSE  (leave blank)  500 Exmouth St, Unit 13, Sarnia, ON  9–1 · 3–6  9 – 1  Closed  9–1 · 3–6  9 – 1  9 – 12  Closed
   ```

3. Go to **https://sheetdb.io**, sign in with Google, and **create an API** from that sheet.
   Copy the API URL (looks like `https://sheetdb.io/api/v1/abc123`).

4. Open **`config.js`** and paste it into `SHEETDB_API`, then set a real `ADMIN_PASSWORD`.
   Commit and push.

5. Visit `/admin.html`, log in, and you're live. (Saving updates row `id = 1`.)

If SheetDB isn't connected yet, the public site simply shows the built-in default
address/hours and no alert bar — nothing breaks.

## Custom domain (when ready)
1. Add a file named `CNAME` containing only your domain, e.g. `deshanechiro.com`
2. At your registrar, create DNS records:
   - **A** records for the apex domain → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** for `www` → `devish6.github.io`
3. In repo Settings → Pages, set the custom domain and enable "Enforce HTTPS".

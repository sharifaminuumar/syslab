<p align="center">
  <img src="assets/logo.png" alt="SLD — Quality Service With Care" width="140">
</p>

<h1 align="center">SysLab Diagnostics And Wellness Hub</h1>

<p align="center">
  <strong>Quality Service With Care</strong><br>
  Laboratory services, ultrasonography, health packages, patient support, laboratory consultancy and healthcare supplies, all in one place.
</p>

<p align="center">
  <a href="https://sharifaminuumar.github.io/syslab/">Live site</a> ·
  <a href="https://wa.me/233209600738">WhatsApp</a> ·
  <a href="mailto:ricus74@yahoo.com">Email</a>
</p>

---

## Contents

- [Project overview](#project-overview)
- [Key features](#key-features)
- [Design & accessibility (Apple HIG)](#design--accessibility-apple-hig)
- [Architecture & tech stack](#architecture--tech-stack)
- [Local preview](#local-preview)
- [Deployment](#deployment)
- [Custom domain setup](#custom-domain-setup)
- [Maintaining the site](#maintaining-the-site)
- [Contact](#contact)

---

## Project overview

This repository holds the public website of **SysLab Diagnostics And Wellness Hub**, a diagnostics and wellness provider on Katamanso Amrahia Road.

The site lets patients, healthcare professionals and organisations:

- browse the full range of services,
- request an appointment,
- and ask for help.

Every request goes straight to the clinic's WhatsApp, so no back-end, database or patient-data storage is needed.

| Service area | Highlights |
| --- | --- |
| Laboratory Services | Hematology, clinical chemistry, microbiology, parasitology, urinalysis, routine testing, PCR for paternity dispute |
| Ultrasonography / Imaging | General, abdominal, pelvic, obstetric, thyroid, small parts and other imaging |
| Health Packages | General health screening, wellness, family and corporate screening |
| Patient Support | Appointment assistance, test preparation guidance, general enquiries |
| Laboratory Consultancy | Laboratory setup, quality management, workflow and technical consultation |
| Equipment, Reagents & Consumables | Analyzers, microscopes, centrifuges, reagents, testing kits, gloves, syringes, sample containers |
| Corporate Health Services | Employee screening, corporate packages, health campaigns, on-site support |

---

## Key features

- **WhatsApp-integrated workflows.**
  - The *Book Your Visit* and *Ask for Help* forms turn what the visitor enters into a structured message.
  - The message opens in WhatsApp, addressed to **+233 209600738** (`wa.me`); the visitor reviews it and taps Send.
  - If a browser blocks the new tab, WhatsApp opens in the same tab instead.
- **Dynamic form validation.**
  - Required fields, email format, phone format, and an appointment date no earlier than today in the visitor's own time zone.
  - Errors appear inline in plain language, and the cursor moves to the first field that needs attention.
  - Fields re-check themselves as the visitor corrects them.
- **Responsive layout.** Fluid type and spacing, CSS Grid layouts that reflow from three columns to one, and a mobile menu on screens of 1040px and narrower. Tested at 1440px and 390px with no horizontal scrolling.
- **Native dark mode.** A complete second set of colour tokens follows the visitor's system setting automatically, with no toggle to manage.
- **Brand presence.** The SLD logo appears in the navigation, hero card and footer, and as the favicon and Apple touch icon.

---

## Design & accessibility (Apple HIG)

The interface follows Apple's Human Interface Guidelines. Each principle below maps to something concrete in the code:

| Principle | Implementation |
| --- | --- |
| **Translucent floating navbar** | Sticky, rounded navigation bar with `backdrop-filter: saturate(1.4) blur(24px)`. Translucency is used only on this floating layer; content cards stay opaque, as the HIG advises. |
| **44px minimum touch targets** | Every button, nav link, the logo link and the menu toggle is at least 44 × 44 px; mobile menu rows are 48px. |
| **WCAG AA contrast** | Body and secondary text are at least 4.5:1 on their backgrounds. WhatsApp actions use `#0e7a43` (**5.4:1** with white text) instead of stock `#25d366` (about 2:1, which fails). The primary red `#b91c1c` is about 6.5:1. |
| **Reduced motion** | `prefers-reduced-motion` removes transitions, hover lifts, scroll reveals and smooth scrolling. |
| **Reduced transparency & increased contrast** | `prefers-reduced-transparency` makes the navbar opaque, and so does a browser without `backdrop-filter`. `prefers-contrast: more` strengthens borders and secondary text. |
| **SF-style vector icons** | An inline SVG sprite of 22 line icons (1.75 stroke, rounded caps and joins) replaces emoji, so icons look the same on every device and scale sharply. |
| **Typography** | Apple's system font stack (`-apple-system`, `SF Pro Display`, `SF Pro Text`, `system-ui`) with fluid `clamp()` sizes, tight tracking on large headings and 17px body text. |
| **Colour semantics** | One colour, one meaning: emerald `#064e3b` for the brand, red for the primary booking action and errors, sage `#f0fdf4` for ambient surfaces. |
| **Semantic, assistive-friendly HTML** | Landmarks, a skip link, labelled sections, and an associated `<label>` for every field. `aria-invalid` and `aria-describedby` carry error text, `aria-expanded` is set on the menu, `aria-current` marks the active section, and `role="status"` announces form messages. |
| **Motion** | 200ms `cubic-bezier(0.2, 0.8, 0.2, 1)` transitions, press scaling on buttons and a visible focus ring for keyboard users. |

---

## Architecture & tech stack

A plain static site: **HTML, CSS and vanilla JavaScript, with no frameworks, no package manager and no build step.**

```text
syslab/
├── index.html          # Semantic markup, content and the inline SVG icon sprite
├── css/
│   └── styles.css      # Design tokens (light/dark), layout, components, media queries
├── js/
│   └── main.js         # WhatsApp message builders, validation, navigation behaviour
├── assets/
│   ├── logo.png        # SLD logo (480px wide)
│   ├── icon-180.png    # Apple touch icon
│   └── favicon-64.png  # Browser favicon
└── README.md
```

**Key configuration points**

| What | Where |
| --- | --- |
| WhatsApp number | `WHATSAPP_NUMBER` at the top of `js/main.js`, in international format with no `+` or spaces |
| Message templates | The appointment and help submit handlers in `js/main.js` |
| Colours, radii, shadows, motion | The `:root` tokens at the top of `css/styles.css`, with dark-mode overrides directly below |
| Services, appointment times, form options | `index.html` |

All paths are relative, so the site works at a domain root or in a sub-folder such as `/syslab/`.

---

## Local preview

No installation is needed. From the repository root:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

> Opening `index.html` directly in a browser also works. A local server is closer to how the site behaves when hosted.

**Checklist before publishing changes:**

1. Resize the window to phone width (about 390px) and confirm the menu, forms and cards fit without sideways scrolling.
2. Switch your operating system to dark mode and confirm the colours.
3. Submit both forms empty and confirm the inline errors appear.
4. Fill in both forms and confirm WhatsApp opens with the expected message.

---

## Deployment

### GitHub Pages (recommended, free)

1. Go to **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose **Branch:** `main` and **Folder:** `/ (root)`, then click **Save**.
4. After 1–2 minutes the site is live at **<https://sharifaminuumar.github.io/syslab/>**.

The same setting can be applied with the GitHub CLI:

```bash
gh api -X POST repos/sharifaminuumar/syslab/pages \
  -f "source[branch]=main" -f "source[path]=/"

gh api repos/sharifaminuumar/syslab/pages --jq '.status, .html_url'   # "built" = live
```

Every push to `main` redeploys the site automatically.

### Vercel

1. **Add New → Project**, then import `sharifaminuumar/syslab`.
2. Set **Framework Preset** to **Other**, leave **Build Command** empty, and leave **Output Directory** as `./`.
3. Click **Deploy**. Each pull request also gets its own preview URL.

### Netlify

1. **Add new site → Import an existing project**, then choose this GitHub repository.
2. Leave **Build command** empty and set **Publish directory** to `/`.
3. Click **Deploy site**. Pull requests get Deploy Previews automatically.

### Any static host

Upload `index.html` and the `css/`, `js/` and `assets/` folders, keeping the same structure.

---

## Custom domain setup

These steps attach a domain you own, for example `syslabdiagnostics.com`, to the GitHub Pages site. The examples use that placeholder; replace it with your real domain.

### 1. Choose the address

| Option | Visitors see | DNS needed |
| --- | --- | --- |
| **Apex + www** (recommended) | `syslabdiagnostics.com`, with `www` redirecting to it | `A`/`AAAA` records **and** a `www` `CNAME` |
| **Subdomain only** | e.g. `www.syslabdiagnostics.com` | One `CNAME` record |

### 2. Verify the domain (recommended)

1. Open your **account** settings (not the repository's): **Settings → Pages → Add a domain**.
2. Enter the domain. GitHub shows a `TXT` record.
3. Add that `TXT` record at your DNS provider, then click **Verify**.

Verification stops anyone else from claiming the domain for their own Pages site.

### 3. Create the DNS records

At your domain registrar or DNS provider (for example Cloudflare, Namecheap, GoDaddy or Squarespace), add:

**Apex domain** (`syslabdiagnostics.com`, host `@`):

| Type | Host | Value |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |

**www subdomain:**

| Type | Host | Value |
| --- | --- | --- |
| `CNAME` | `www` | `sharifaminuumar.github.io` |

> Point the `CNAME` at `sharifaminuumar.github.io` **without** `/syslab`; DNS records never contain paths.
>
> Remove any old `A`, `AAAA` or `CNAME` records on the same hosts that point elsewhere, such as a registrar parking page.
>
> On Cloudflare, set these records to **DNS only** (grey cloud) until GitHub has issued the HTTPS certificate.

### 4. Tell GitHub Pages about the domain

1. Go to **Repository → Settings → Pages → Custom domain**.
2. Enter `syslabdiagnostics.com` (or your `www` address) and click **Save**.

With the **Deploy from a branch** source, GitHub commits a `CNAME` file to the root of `main` containing that domain. You can also add it yourself:

```bash
echo "syslabdiagnostics.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push origin main
```

The file contains only the bare domain, with no `https://` and no trailing slash. Keep it in the repository: deleting it removes the custom domain.

### 5. Enable HTTPS

Once the DNS check passes (usually minutes, up to 24 hours), tick **Enforce HTTPS** on the same Pages settings screen. GitHub provisions a free Let's Encrypt certificate automatically.

### 6. Confirm it works

```bash
dig +short syslabdiagnostics.com A          # four 185.199.10x.153 addresses
dig +short www.syslabdiagnostics.com CNAME  # sharifaminuumar.github.io.
curl -I https://syslabdiagnostics.com       # HTTP/2 200
```

After this, `https://sharifaminuumar.github.io/syslab/` redirects to the custom domain automatically.

**Troubleshooting**

| Symptom | Fix |
| --- | --- |
| "Domain's DNS record could not be retrieved" | DNS is still propagating. Wait, then click **Check again**. |
| **Enforce HTTPS** is greyed out | The certificate is still being issued. Wait up to 24 hours after DNS resolves. |
| 404 on the custom domain | Confirm the `CNAME` file exists on `main` and that Pages is publishing from `main` / root. |
| Works on `www` but not the apex (or the reverse) | Make sure both the `A`/`AAAA` records and the `www` `CNAME` exist. |

> **Using Vercel or Netlify instead?** Add the domain in the project's **Domains** settings and create the records that dashboard shows. Those hosts don't need a `CNAME` file.

---

## Maintaining the site

- **Changing the WhatsApp number:** edit `WHATSAPP_NUMBER` in `js/main.js`, then search `index.html` for `233209600738` and update the visible numbers and `wa.me` links.
- **Adding a service:** copy an existing `<article class="service-card">` block in `index.html`. To add a new icon, add a `<symbol>` to the sprite at the top of the page and reference it with `<use href="#i-your-icon">`.
- **Adding a form option:** add an `<option>` to the relevant `<select>` in `index.html`. Its text appears in the WhatsApp message as written.
- **Brand colours:** edit the tokens in `:root` in `css/styles.css`, and their dark-mode equivalents. Re-check contrast after any change, aiming for at least 4.5:1 for text.

---

## Contact

| | |
| --- | --- |
| **WhatsApp** | [+233 209600738](https://wa.me/233209600738) |
| **Email** | [ricus74@yahoo.com](mailto:ricus74@yahoo.com) |
| **Location** | Katamanso Amrahia Road |

<p align="center"><sub>© 2026 SysLab Diagnostics. All rights reserved.</sub></p>

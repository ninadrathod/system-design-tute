# System Design Masterclass

A comprehensive 5–6 hour digital course covering **High-Level Design (HLD)** and **Low-Level Design (LLD)** — from networking foundations to production case studies. Built as a static site with Tailwind CSS, inline SVG diagrams, and interactive quizzes.

## Project Structure

```
system-design-tute/
├── index.html      # Course content, layout, and inline diagrams
├── script.js       # Navigation, progress tracking, dynamic quiz engine
├── CNAME           # Custom domain for GitHub Pages (optional)
└── README.md       # This file
```

## Local Preview

No build step required. Open the site locally with any static file server:

```bash
# Option 1: Python built-in server
cd system-design-tute
python3 -m http.server 8080
# Visit http://localhost:8080

# Option 2: Node.js (if npx is available)
npx serve .
```

Alternatively, open `index.html` directly in a browser — most features work, though a local server is recommended for consistent behavior.

---

## Hosting on GitHub Pages

### Important: Private Repository Implications

This repository is currently **private**. GitHub Pages behavior depends on your account plan:

| Account Type | Private Repo GitHub Pages |
|---|---|
| **GitHub Free** | ❌ Not available. You must make the repository **public** to use free GitHub Pages. |
| **GitHub Pro / Team / Enterprise** | ✅ Available. You can deploy from a private repo, but the published site itself will be **publicly accessible** on the internet. |

> **Key takeaway:** Even with a paid plan, GitHub Pages sites are always public. Making the repo private only hides the *source code* from public view — not the deployed website. If your course content should not be publicly readable, GitHub Pages is not the right hosting choice.

### Recommended Path: Make Repository Public (Free Tier)

If you are on the free tier or want the simplest setup:

#### Step 1 — Review the repository for secrets

Before changing visibility, confirm no secrets are committed:

```bash
git log --all --full-history -- "*.env" "*.pem" "credentials*"
```

Remove any sensitive files from git history if found.

#### Step 2 — Change repository visibility to Public

1. Go to your repository on GitHub: `https://github.com/<your-username>/system-design-tute`
2. Click **Settings** (top navigation)
3. Scroll to the **Danger Zone** at the bottom
4. Click **Change repository visibility** → select **Public**
5. Confirm by typing the repository name

#### Step 3 — Push your course files

```bash
git add index.html script.js CNAME README.md
git commit -m "Add system design masterclass static site"
git push origin main
```

> Use `master` instead of `main` if that is your default branch name.

#### Step 4 — Enable GitHub Pages

1. In the repository, go to **Settings** → **Pages** (left sidebar)
2. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or `master`) → `/ (root)` folder
3. Click **Save**
4. Wait 1–3 minutes. GitHub displays your live URL:
   `https://<your-username>.github.io/system-design-tute/`

#### Step 5 — Verify deployment

Visit the URL above. Confirm:
- Sidebar navigation works on desktop
- Mobile drawer opens and closes
- Quizzes render with shuffled options
- Progress bar updates on scroll

---

### Alternative Path: Private Repo with GitHub Pro

If you have **GitHub Pro** ($4/month) and want to keep source code private:

1. Ensure your account is on GitHub Pro
2. Push files to the private repository (Step 3 above)
3. Go to **Settings** → **Pages**
4. Under **Build and deployment**, select your branch and root folder
5. The site deploys at the same `github.io` URL — publicly accessible despite the private repo

---

## Custom Domain Setup (Optional)

The included `CNAME` file contains a placeholder domain:

```
www.yourcustomdomain.com
```

### To use your own domain:

1. **Edit `CNAME`** — replace the placeholder with your actual domain:
   ```
   www.yourcustomdomain.com
   ```

2. **Configure DNS** at your domain registrar:
   - For `www` subdomain: add a **CNAME** record pointing to `<your-username>.github.io`
   - For apex domain (`yourcustomdomain.com`): add **A records** pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Enable HTTPS** — In repository **Settings** → **Pages**, check **Enforce HTTPS** (available after DNS propagates, usually within 24 hours).

4. **Commit and push** the updated `CNAME` file.

---

## Extending the Course

Modules 1–20 are complete — the full System Design Masterclass including three case studies, interview framework, and capstone review.

1. Add HTML content inside a new `<article id="section-N">` block in `index.html`
2. Add a quiz container: `<div id="quiz-section-N" class="quiz-container" data-quiz-id="section-N"></div>`
3. Append quiz questions to `QUIZ_DATA` in `script.js`
4. Update `COURSE_MODULES` — set `available: true` for the new module

The quiz engine automatically shuffles options using a seeded Fisher-Yates algorithm keyed to each question ID, ensuring even distribution of correct answers across positions A–D.

---

## Tech Stack

- **HTML5** — semantic structure
- **Tailwind CSS** (CDN) — utility-first styling, beach/island theme
- **Vanilla JavaScript** — no build tools, no dependencies
- **Inline SVG** — architecture and flow diagrams
- **GitHub Pages** — static hosting

---

## License

Course content is for personal and educational use. Adapt and extend freely for your own learning journey.

# Abhay Pratap — Portfolio

Personal portfolio for **Abhay Pratap, MERN Stack Developer**. Built with React + Vite, Tailwind CSS v4, Framer Motion and Lucide icons.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Editing content

Almost all text lives in **`src/data/portfolio.js`**: profile links, about text, experience, projects, skills, cloud projects and education.

- **Skills honesty:** each skill has `level: 'practical'` (solid chip: used in internships/projects) or `'explored'` (dashed chip: studied). Move a skill between the two as your experience grows.
- **Profile photo:** replace `src/assets/abhay-pratap.webp` (portrait, about 640×856, 4:5). Keep the same filename, or update the import in `src/components/Hero.jsx`.
- **Social preview image:** `public/og-image.jpg` (1200×630).

## Project structure

```
src/
  data/portfolio.js        all content
  components/
    Navbar, Hero, About, Experience, Projects, Skills,
    CloudDevOps, Education, Contact, Footer
    ui/Section.jsx         section wrapper + scroll reveal
    ui/motion.js           shared animation variants
    ui/BrandIcons.jsx      GitHub / LinkedIn SVGs
  App.jsx, main.jsx, index.css (theme tokens + components)
```

## Contact

The Contact section shows your email (mailto link + copy button), phone, LinkedIn and GitHub. No form, backend or API key is needed.

## Deploy to Vercel

### Option A: through GitHub (recommended; every push redeploys)

1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Abhay-Pratap200001/portfolio.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new, sign in with GitHub, and **Import** the repository.
3. Vercel detects **Vite** automatically. Check these settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. Your site will be live at `https://<project>.vercel.app`.
5. Optional: add a custom domain under *Project → Settings → Domains*.


### Option B: Vercel CLI

```bash
npm i -g vercel
vercel                # first run links the project
vercel --prod
```

## After deploying

- Click the email link and check it opens a new message to you.
- Open both **Live Demo** links. They are hosted on Render's free tier and can take 30–60s to wake up.
- Paste your URL into https://www.opengraph.xyz to check the link preview.

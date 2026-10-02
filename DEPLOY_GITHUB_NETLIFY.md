# Workly: GitHub থেকে Netlify Publish করার সম্পূর্ণ গাইড

এই projectটি Vite + React ভিত্তিক। ZIP extract করার পর GitHub-এ push করে Netlify-তে publish করা যাবে।

## ১. ZIP extract করুন

ZIP download করে extract করুন। এরপর terminal বা Command Prompt-এ project folder-এ যান:

```bash
cd workly
```

## ২. Netlify URL পাওয়ার আগে SEO origin আপডেট করুন

বর্তমান project-এর canonical, sitemap, Open Graph এবং Twitter URL-গুলো বর্তমান Manus preview domain-এ রাখা আছে। Netlify deploy করার পর আপনার আসল domain দিয়ে এগুলো replace করতে হবে।

এই চারটি file-এ preview origin খুঁজে replace করুন:

- `index.html`
- `src/main.jsx`
- `public/robots.txt`
- `public/sitemap.xml`

Search করার text:

```text
https://8328-imqkntv1ahfb7k61bdig1-d3466311.us1.manus.computer
```

Netlify domain পাওয়ার পর উদাহরণ:

```text
https://your-workly-site.netlify.app
```

> `https://` রাখবেন, শেষে extra `/` দেবেন না।

## ৩. Local build check করুন

Node.js 20 বা 22 ব্যবহার করুন:

```bash
node -v
npm install
npm run build
```

Build সফল হলে `dist` folder তৈরি হবে। Netlify-তে `dist` folder-ই publish হবে।

Local preview দেখতে:

```bash
npm run preview
```

## ৪. GitHub repository তৈরি করুন

### GitHub website দিয়ে

1. https://github.com/new খুলুন।
2. Repository name দিন, যেমন `workly-job-platform`।
3. Public বা Private নির্বাচন করুন।
4. নতুন repository-তে README/`.gitignore` auto-create না করাই ভালো।
5. **Create repository** চাপুন।

### Terminal দিয়ে GitHub-এ push

```bash
git init
git branch -M main
git add .
git commit -m "Prepare Workly for Netlify"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

`YOUR_USERNAME` এবং `YOUR_REPOSITORY` আপনার GitHub তথ্য দিয়ে replace করবেন।

যদি GitHub CLI ব্যবহার করেন:

```bash
gh repo create workly-job-platform --public --source=. --remote=origin --push
```

## ৫. Netlify-তে GitHub repository connect করুন

1. https://app.netlify.com/ এ sign in করুন।
2. **Add new project** → **Import an existing project** নির্বাচন করুন।
3. **GitHub** নির্বাচন করে repository authorize করুন।
4. আপনার Workly repository নির্বাচন করুন।
5. Build settings যাচাই করুন:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `22` |
| Branch | `main` |

`netlify.toml` থাকায় Netlify সাধারণত এগুলো নিজে থেকেই পড়ে নেবে।

6. **Deploy Workly** চাপুন।

## ৬. Deploy হওয়ার পর SEO URL ঠিক করুন

Netlify একটি URL দেবে, যেমন:

```text
https://your-workly-site.netlify.app
```

এই URL পাওয়ার পর local project-এ preview origin replace করুন:

```bash
# macOS/Linux/Git Bash
OLD='https://8328-imqkntv1ahfb7k61bdig1-d3466311.us1.manus.computer'
NEW='https://your-workly-site.netlify.app'
grep -rl "$OLD" index.html src/main.jsx public/robots.txt public/sitemap.xml | xargs sed -i "s#$OLD#$NEW#g"
```

তারপর:

```bash
npm run build
git add index.html src/main.jsx public/robots.txt public/sitemap.xml
git commit -m "Update SEO URLs for Netlify domain"
git push origin main
```

Netlify automatically নতুন commit deploy করবে।

## ৭. Deploy verification checklist

Deploy শেষে এগুলো খুলে দেখুন:

```text
https://your-workly-site.netlify.app/
https://your-workly-site.netlify.app/jobs
https://your-workly-site.netlify.app/jobs/partner/partner-14
https://your-workly-site.netlify.app/create-profile
https://your-workly-site.netlify.app/signin
https://your-workly-site.netlify.app/robots.txt
https://your-workly-site.netlify.app/sitemap.xml
```

বিশেষভাবে যাচাই করবেন:

- Homepage ও job detail page refresh করলে 404 না আসে।
- Mobile hamburger menu কাজ করে।
- Create Profile এবং Sign In form responsive থাকে।
- `robots.txt`-এর Sitemap URL Netlify domain দেখায়।
- `sitemap.xml`-এর সব URL Netlify domain দেখায়।
- Page source বা browser inspector-এ canonical, Open Graph, Twitter Card এবং JSON-LD আছে।
- Google PageSpeed Insights-এ final Netlify URL test করুন।

## ৮. Custom domain ব্যবহার করলে

Netlify-এর **Domain management** থেকে custom domain connect করুন। এরপর একই SEO origin replacement আবার custom domain দিয়ে করুন, যেমন:

```text
https://jobs.example.com
```

তারপর commit/push করুন এবং Google Search Console-এ sitemap submit করুন:

```text
https://jobs.example.com/sitemap.xml
```

## গুরুত্বপূর্ণ নিরাপত্তা নোট

- GitHub-এ `node_modules`, `.env`, secret key বা private credential upload করবেন না।
- এই project-এর affiliate এবং Ads Sterra URLs public source-এ আছে; এগুলো পরিবর্তন করতে `src/main.jsx` edit করুন।
- Netlify deploy-এর পরে canonical ও sitemap অবশ্যই final domain-এ update করুন।

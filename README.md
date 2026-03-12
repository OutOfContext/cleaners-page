# Glänzende Sauberkeit – Cleaning Company Website

A modern, professional landing page for a German cleaning company, built with pure HTML, CSS, and JavaScript. Ready to deploy on [GitHub Pages](https://pages.github.com/).

---

## 📁 Project Structure

```
cleaners-page/
├── index.html       # Main HTML file (all sections)
├── styles.css       # Responsive stylesheet (mobile-first)
├── script.js        # Mobile menu, smooth scroll, form validation
├── images/
│   └── hero-bg.jpg  # Hero background image (add your own)
└── README.md        # This file
```

---

## 🚀 Deploy to GitHub Pages

### Step 1 – Clone or fork this repository

```bash
git clone https://github.com/<your-username>/cleaners-page.git
cd cleaners-page
```

### Step 2 – (Optional) Add a hero image

Place a high-quality landscape photo named `hero-bg.jpg` inside the `images/` folder.  
Without it the hero section displays a blue gradient background.

### Step 3 – Commit & push to GitHub

```bash
git add .
git commit -m "Initial website"
git push origin main
```

### Step 4 – Enable GitHub Pages

1. Open your repository on **GitHub**.
2. Go to **Settings → Pages**.
3. Under **Source**, select the branch `main` and the folder `/ (root)`.
4. Click **Save**.
5. After a minute, your site will be live at:  
   `https://<your-username>.github.io/cleaners-page/`

---

## ✏️ Customization

| What to change | Where |
|---|---|
| Company name / copy | `index.html` |
| Colors & fonts | `styles.css` → `:root` variables |
| Hero image | `images/hero-bg.jpg` |
| Form backend / email | `script.js` → form submit handler |

---

## 🌐 Features

- **Fully responsive** – mobile-first, works on all screen sizes
- **Sticky navigation** with hamburger menu on mobile
- **Hero section** with overlay gradient and CTA buttons
- **Services grid** – Büroreinigung, Haushaltsreinigung, Fensterreinigung, Grundreinigung
- **Why Choose Us** section with stats
- **Testimonials** section
- **Contact form** with client-side validation
- **Smooth scrolling** and accessible markup
- **No frameworks** – pure HTML / CSS / JavaScript

---

## 📄 License

MIT – free to use and modify.

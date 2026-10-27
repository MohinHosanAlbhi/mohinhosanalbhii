# Md. Mohin Hosan Albhi — Portfolio

Plain HTML, CSS and JavaScript. No build step, no framework, free to host on GitHub Pages.

## Put it online (GitHub Pages, free)

1. Sign in at github.com and click **New repository**.
2. Name it exactly `YOUR-USERNAME.github.io` (replace with your GitHub username). Keep it **Public**.
3. Click **uploading an existing file**, drag in **everything inside this folder** (index.html, style.css, app.js, data.js, photo-fallback.js, the img folder, the CV PDF, .nojekyll), then **Commit changes**.
4. Open **Settings → Pages**, set Source to **Deploy from a branch**, choose branch `main` and folder `/ (root)`, then **Save**.
5. After a minute or two the site is live at `https://YOUR-USERNAME.github.io`.

## Update your content

Open `data.js` on GitHub (pencil icon), edit the text, and commit. The page updates in about a minute. Layout lives in `index.html` / `style.css` and does not need to change.

- Replace your photo: upload a new image as `img/photo.jpg`. If that file is ever missing, the page automatically shows the backup copy stored in `photo-fallback.js`, so the photo never disappears.
- Replace your CV: upload a new PDF named `Md_Mohin_Hosan_Albhi_CV.pdf`.

## What's dynamic

Light/dark theme (remembers your choice), scroll progress bar, active-section highlighting, animated counters, experience filter tabs, responsibility filters by focus area, live "current role" duration, training filter by year, skills explorer (filter by hard skill / soft skill / language, plus live search), a 4-step thesis story with keyboard support, click-to-reveal phone, copy-email, save-contact (vCard), and a message form that opens your email app.

## Product range (add pictures)

1. Put each picture inside `img/products/` (JPG, around 900 px wide keeps the page fast).
2. Open `data.js`, find `products:` and add one line per picture inside `items: [ ... ]`:
   `{ file: "img/products/henley-top.jpg", name: "Henley top" },`
3. Optional: add `category: "Tops"` to a line and filter buttons appear automatically.

While `items` is empty the whole Product range section (and its menu link) stays hidden. Hovering a picture shows the item name; clicking enlarges it, and the arrow keys move between pictures.

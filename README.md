# Medical Claim Assistant

An installable, offline-capable web app that turns the **CSN Expatriate/Inpatriate Medical Expense Claim Form (MECF-0414)** into a guided, mobile-first tool. Fill your details once, snap or upload your medical bills, and export a completed claim form as a PDF — no accounts, no servers, and no data leaving your device.

---

## Features

- **Saves your details** — personal info, bank details, and claim defaults persist on your device between sessions. Bills and expenses are cleared each session for privacy.
- **On-device bill scanning** — reads the date, amount, and currency from photos, PDFs, and receipts using in-browser OCR. Your images never leave your phone.
- **Auto-fills every line** — set the patient, illness description, and currency once; every expense line inherits them, and blank fields fall back to your defaults at export time.
- **Live running total** of all claimed expenses.
- **Exact PDF export** — populates the real claim form's fields and flattens to a print-ready, submittable PDF that matches the original layout.
- **Installable PWA** — add it to your home screen on iOS and Android and use it offline.

---

## How it works

1. **Your details** and **Bank details** are entered once and remembered on the device (`localStorage`).
2. **Claim defaults** (patient, injury/illness description, currency) are applied to each expense line automatically.
3. **Bills** are captured by camera or file upload. Images are read with OCR; PDFs are rasterized first, then read. Extracted values are shown in a review step so you can correct anything before adding.
4. **Generate PDF** fills the claim form's fields, computes the total, and exports a flattened, print-ready file.

---

## Tech stack

| Purpose | Library |
| --- | --- |
| PDF form fill & export | [pdf-lib](https://github.com/Hopding/pdf-lib) |
| On-device OCR | [Tesseract.js](https://github.com/naptha/tesseract.js) |
| PDF rasterization (for scanning PDF bills) | [pdf.js](https://github.com/mozilla/pdf.js) |
| Persistence | `localStorage` |
| Offline support | Service Worker + Web App Manifest |

No build step, no framework — plain HTML, CSS, and JavaScript.

---

## Project structure

```
.
├── index.html            # The full app
├── manifest.webmanifest  # PWA metadata (name, icons, display mode)
├── sw.js                 # Service worker for offline caching
├── icon-192.png          # App icon
├── icon-512.png          # App icon (large / maskable)
└── icon-180.png          # Apple touch icon
```

---

## Getting started

Because the app installs as a PWA and works offline, it should be served from a URL (not opened as a local file).

### Option A — GitHub Pages
1. Push these files to a repository.
2. In **Settings → Pages**, set the source to your default branch (root).
3. Open the published URL on your phone.

### Option B — Netlify Drop
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag in all the files together.
3. Open the generated link on your phone.

### Install on your phone
- **iPhone (Safari):** Share → **Add to Home Screen**.
- **Android (Chrome):** menu (⋮) → **Install app** / **Add to Home screen**.

The on-device scanner downloads a small engine the first time it reads a bill (needs internet once); after that it is cached for offline use.

---

## Privacy

- All data stays on your device. There is no backend and no analytics.
- Bill images are processed locally by the OCR engine and are never uploaded.
- Saved details live in your browser's `localStorage`; clearing site data removes them.

---

## Limitations

- On-device OCR is approximate — always review each scanned line before adding it.
- The claim form provides **13 expense lines**; larger claims should be split across multiple forms.
- iOS only offers **Add to Home Screen** for hosted URLs, so an iPhone install requires hosting (Option A or B above).

---

## Disclaimer

This project is **not affiliated with or endorsed by Corporate Services Network (CSN)**. It is an unofficial helper for filling a publicly used claim form. Always review the generated PDF for accuracy before submitting your claim.

---

## License

Add a license of your choice (e.g. [MIT](https://choosealicense.com/licenses/mit/)) as a `LICENSE` file.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Anonymous website stars

The website star button uses a Cloudflare Pages Function at `/api/stars` and a D1 database. Visitors do not need an account. A random HttpOnly browser cookie is used to allow one star per browser; clearing browser data or using another browser can create another vote.

1. Create a D1 database from the Cloudflare dashboard, or run `npx wrangler d1 create resume-builder-stars`.
2. Apply `migrations/0001_create_stars.sql` to that database. With Wrangler, run `npx wrangler d1 execute resume-builder-stars --remote --file=migrations/0001_create_stars.sql`.
3. In Cloudflare Pages, open the `Make-My-Resume` project settings, go to **Functions > D1 database bindings**, and bind the database as `STARS_DB` or `stars_db`. The current Cloudflare configuration uses `stars_db`, which is supported.
4. Redeploy the Pages project so the Function receives the binding.

Until the D1 binding is active and the schema is applied, the star control reports that counting is unavailable and does not record a vote.

## Import an existing resume

The editor can import PDF, DOCX, TXT, JPG/JPEG, PNG, WebP, BMP, and TIFF resumes. Parsing and OCR happen in the browser; the file is not uploaded. Detected contact details, summary, skills, experience, and education are shown in an editable review dialog before they are applied. Empty or unrecognized fields keep their existing values. OCR uses English recognition data from the Tesseract data CDN, which may download on first use and requires an internet connection. Scanned PDFs are limited to five pages for OCR; text-based PDFs support up to 25 pages. Image files are limited to 12 MB.

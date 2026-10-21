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
3. In Cloudflare Pages, open the `Make-My-Resume` project settings, go to **Functions > D1 database bindings**, and add a binding named `STARS_DB` connected to the database.
4. Redeploy the Pages project so the Function receives the binding.

Until the `STARS_DB` binding is configured and the schema is applied, the star control reports that counting is unavailable and does not record a vote.

English | [日本語](README.ja.md)

# astro-notion-blog

[![GitHub stars](https://img.shields.io/github/stars/otoyo/astro-notion-blog)](https://github.com/otoyo/astro-notion-blog/stargazers)
[![GitHub license](https://img.shields.io/github/license/otoyo/astro-notion-blog)](https://github.com/otoyo/astro-notion-blog/blob/main/LICENSE)
[![GitHub sponsors](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/otoyo)

<img src="https://user-images.githubusercontent.com/1063435/213838069-c9654c32-ec9b-4e82-a3b5-2acbd665b16a.png" width="480" alt="astro-notion-blog screenshot" />

astro-notion-blog is a statically generated blog starter powered by [Astro](https://astro.build/) and [Notion](https://www.notion.so/).
It reads your content directly from a Notion database through the official Notion APIs and deploys seamlessly to Cloudflare Pages.

## ✨ Features

- ⚡️ **Blazing fast** static pages built with Astro and served from Cloudflare's global edge
- 📝 **Write posts in Notion** using the provided database template
- 🧩 **Customisable UI** with flexible components, layouts and styles in the `src/` directory
- ✅ **Official Notion API** integration, including caching utilities for reliable builds
- 🛠️ **Developer-friendly tooling** (ESLint, Prettier and Nx-powered Notion cache helpers)

## 🌐 Demo

Visit [astro-notion-blog.pages.dev](https://astro-notion-blog.pages.dev) to see the latest demo deployment.

## 📸 Screenshots

### Desktop

<img src="https://github.com/otoyo/astro-notion-blog/assets/1063435/967bbc23-014c-427d-b6cd-02c41822fb45" width="600" alt="Desktop screenshot" />

### Smartphone

<img src="https://github.com/otoyo/astro-notion-blog/assets/1063435/bf1add06-1f1c-42ca-88c9-decb8c0dcf8f" width="300" alt="Mobile screenshot" />

## 🚀 Getting started

### Prerequisites

- A Notion workspace where you can duplicate databases
- A Cloudflare account with access to [Cloudflare Pages](https://pages.cloudflare.com/)
- Node.js **v18.16.0 or higher** and Git if you want to develop locally

### Prepare your Notion database

1. Give this repository a ⭐️&nbsp;star if you find it useful – it helps a lot!
2. Duplicate the [blog template](https://otoyo.notion.site/e2c5fa2e8660452988d6137ba57fd974?v=abe305cd8b3d467285e91a2a85f4d8de) into your workspace.
3. Update the icon, title and description of the duplicated database to match your blog.
4. Copy the value of `DATABASE_ID` from the duplicated database URL (`https://notion.so/your-account/<DATABASE_ID>?v=xxxx`).
5. [Create a Notion integration](https://developers.notion.com/docs/create-a-notion-integration#step-1-create-an-integration) and note the **Internal Integration Token** as `NOTION_API_SECRET`.
6. Share the duplicated database with your integration so it can read the content.

### Deploy to Cloudflare Pages

1. Fork this repository into your own GitHub account.
2. In Cloudflare Pages, create a new project and connect it to `<your-account>/astro-notion-blog`.
3. In the build settings choose the **Astro** framework preset.
4. Add the following environment variables under **Environment Variables (advanced)**:

   | Key | Value |
   | --- | --- |
   | `NODE_VERSION` | `v18.16.0` or higher |
   | `NOTION_API_SECRET` | Internal Integration Token from Notion |
   | `DATABASE_ID` | Database ID copied from your Notion URL |
   | `CACHE_CONCURRENCY` (optional) | Number of concurrent fetches when warming the cache |

5. Leave the default build command (`npm run build:cached`) and output directory (`dist`).
6. Click **Save and Deploy**. Your site will be published when the build completes.

> **Note**
> Notion content changes require a redeploy. Trigger a manual build from the Cloudflare Pages dashboard or schedule deployments via CI (e.g. GitHub Actions).

## 🧑‍💻 Local development

1. Export your Notion secrets locally:

   ```bash
   export NOTION_API_SECRET=<YOUR_NOTION_API_SECRET>
   export DATABASE_ID=<YOUR_DATABASE_ID>
   # Optional: tune cache concurrency when warming the cache
   export CACHE_CONCURRENCY=4
   ```

2. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:4321](http://localhost:4321) to preview your blog. Stop the server with `Ctrl+C`.

### Helpful scripts

| Command | Description |
| ------- | ----------- |
| `npm run build` | Generate a production build in `dist/`. |
| `npm run build:cached` | Warm the Notion cache before building (used in Cloudflare Pages). |
| `npm run cache:fetch` | Cache Notion page content locally using Nx to speed up repeated builds. |
| `npm run cache:purge` | Clear cached Notion responses (`nx reset` + remove `tmp/*`). |
| `npm run lint` | Run ESLint against the `src/` directory. |
| `npm run preview` | Preview the production build locally. |

## 🎨 Customisation guide

The project follows Astro's standard structure:

- `src/pages/` – top-level pages such as the home page and RSS feeds
- `src/components/` – reusable UI components (navigation, cards, headers, etc.)
- `src/layouts/` – page layouts shared across templates
- `src/styles/` – global and component-level stylesheets
- `src/lib/` – Notion helpers, data fetching utilities and constants
- `public/` – static assets served as-is

Feel free to tailor colours, typography, metadata and components to match your brand.
If you add new content types in Notion, extend the data utilities in `src/lib/` and corresponding components to render them.

## 🐞 Support & contributions

- Found a bug or have a feature request? [Open an issue](https://github.com/otoyo/astro-notion-blog/issues). English and Japanese are both welcome.
- Contributions are encouraged! Fork the repo, create a feature branch and open a pull request describing your changes.

## ❤️ Sponsorship

If astro-notion-blog helps you build a great blog, please consider supporting the project through [GitHub Sponsors](https://github.com/sponsors/otoyo).

---

astro-notion-blog is based on [otoyo/notion-blog](https://github.com/otoyo/notion-blog).

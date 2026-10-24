<div align="center">

<img src="client/public/favicon.svg" width="72" height="72" alt="Vorcove logo">

# Vorcove

**We engineer software that directly expands your business revenue.**

The company website for Vorcove: a single-page React site with a video hero, scroll animations and live product demos, backed by an Express + MongoDB API that stores contact-form enquiries.

![React](https://img.shields.io/badge/React-18-0A171E?logo=react&logoColor=FF8A3D)
![Vite](https://img.shields.io/badge/Vite-6-0A171E?logo=vite&logoColor=FF8A3D)
![Express](https://img.shields.io/badge/Express-4-0A171E?logo=express&logoColor=FF8A3D)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-0A171E?logo=mongodb&logoColor=FF8A3D)
![Node](https://img.shields.io/badge/Node.js-20%2B-0A171E?logo=nodedotjs&logoColor=FF8A3D)

![Vorcove homepage](docs/screenshot.png)

</div>

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [API reference](#api-reference)
- [Editing the website](#editing-the-website)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)
- [License](#license)

## Features

**Website**

- **Video hero slider.** Three slides with autoplay, progress bars, and pause, next and previous controls.
- **Mega menus.** Services, Industries and Products menus, plus a slide-in drawer on mobile.
- **Product showcases.** Leadsmith and EventSmith walkthrough videos that:
  - play while they are on screen;
  - have play/pause, sound and full-screen controls;
  - only let one video play sound at a time.
- **Smooth scrolling** with [Lenis](https://github.com/darkroomengineering/lenis).
- **Scroll animations** with [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/):
  - product frames zoom in;
  - background photos move slower than the page (parallax);
  - the hero text fades as you scroll.
- **Other interactive sections:**
  - animated counters;
  - fade-up reveals;
  - industry tabs;
  - a process timeline that fills as you scroll;
  - an FAQ accordion.
- **Responsive** from mobile to wide desktop.
- **Accessible:**
  - keyboard focus styles;
  - ARIA labels on controls;
  - respects `prefers-reduced-motion`.
- **Harbor Beacon brand system.** Deep sea-ink backgrounds, one Beacon orange accent (`#FF8A3D`), and three fonts: Bricolage Grotesque for headlines, Instrument Sans for body text and JetBrains Mono for labels.

**Backend**

- **Contact form API.** Enquiries are validated and saved to MongoDB.
- **Spam protection:**
  - a hidden honeypot field;
  - at most 10 enquiries per IP address every 15 minutes.
- **Security headers** with [Helmet](https://helmetjs.github.io/), including a content security policy.
- **Admin endpoint** that lists saved enquiries, protected by a bearer token.
- **Zero-setup development.** When no database is configured, an in-memory MongoDB starts automatically.
- **One server in production.** Express serves the built React site and the API together.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite 6, plain CSS (custom properties) |
| Motion | Lenis (smooth scrolling), GSAP 3 + ScrollTrigger |
| Backend | Node.js, Express 4, Helmet, express-rate-limit |
| Database | MongoDB with Mongoose 8; `mongodb-memory-server` for local development |
| Tooling | npm workspaces, concurrently |

## Project structure

```
.
├── client/                    # React website (Vite)
│   ├── index.html
│   ├── public/
│   │   ├── favicon.svg
│   │   └── media/             # product videos and poster images
│   ├── src/
│   │   ├── App.jsx            # page layout: all sections in order
│   │   ├── main.jsx           # React entry point
│   │   ├── index.css          # all styles; brand colours and fonts at the top
│   │   ├── components/        # one file per section (Header, Hero, Products, Contact, ...)
│   │   ├── data/content.js    # every piece of website text, image and video URL
│   │   └── lib/motion.js      # smooth scrolling, reveals and scroll animations
│   └── vite.config.js         # dev server + /api proxy to Express
├── server/                    # Express API
│   ├── .env.example
│   └── src/
│       ├── index.js           # app setup, security headers, static hosting
│       ├── db.js              # MongoDB connection (with in-memory fallback)
│       ├── models/Lead.js     # enquiry schema
│       └── routes/leads.js    # POST /api/leads, GET /api/leads
├── docs/screenshot.png
└── package.json               # npm workspaces + root scripts
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer, with npm.
- MongoDB is **optional** for local development. Without it, a temporary in-memory database is used.

### 1. Clone and install

```bash
git clone <your-repo-url> vorcove
cd vorcove
npm install
```

`npm install` at the root installs the client and the server together, because npm workspaces link them.

### 2. Configure the server (optional for development)

```bash
cp server/.env.example server/.env
```

Then fill in the values you need. See [Environment variables](#environment-variables).

### 3. Run in development

```bash
npm run dev
```

| Service | URL |
| --- | --- |
| Website (with hot reload) | http://localhost:5173 |
| API | http://localhost:5000 |

Vite forwards every `/api/*` request to Express, so the contact form works from port 5173.

> **Note:** the first run downloads a MongoDB binary for the in-memory database (about 600 MB), so it can take a few minutes.

## Environment variables

Set these in `server/.env`.

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `MONGODB_URI` | In production | *(empty)* | MongoDB connection string, e.g. `mongodb+srv://user:pass@cluster.mongodb.net/vorcove`. If empty in development, an in-memory database is used and its data is lost when the server stops. |
| `PORT` | No | `5000` | Port the Express server listens on. |
| `ADMIN_TOKEN` | No | *(empty)* | Secret for `GET /api/leads`. If empty, that endpoint is switched off. |
| `NODE_ENV` | In production | — | Set to `production` to require `MONGODB_URI`. |
| `MONGOMS_VERSION` | No | — | Development only: the MongoDB version the in-memory database uses. It is useful to reuse a binary you already have, e.g. `7.0.14`. |

`server/.env` is listed in `.gitignore`. Never commit real credentials.

## Scripts

Run these from the project root.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the API (with auto-restart) and the Vite dev server together. |
| `npm run build` | Builds the React site into `client/dist`. |
| `npm start` | Starts the Express server. If `client/dist` exists, it serves the site too. |
| `npm run dev -w server` | Starts the API only. |
| `npm run dev -w client` | Starts the website only. |

## API reference

All responses are JSON and include an `ok` boolean.

### `GET /api/health`

Checks that the server and the database are up.

```json
{ "ok": true, "db": "connected" }
```

### `POST /api/leads`

Saves an enquiry from the contact form. Each IP address can send at most 10 requests every 15 minutes.

**Body**

| Field | Type | Rules |
| --- | --- | --- |
| `business` | string | Required, up to 120 characters. |
| `email` | string | Required, a valid email address, up to 160 characters. |
| `message` | string | Required, up to 3000 characters. |
| `website` | string | Honeypot. Leave empty; when it is filled in, the request is silently ignored. |

```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"business":"Acme Fabrication","email":"owner@acme.co.uk","message":"We lose quotes after sending them."}'
```

| Status | Response |
| --- | --- |
| `201` | `{ "ok": true }` |
| `400` | `{ "ok": false, "errors": { "email": "Please enter a valid email address." } }` |
| `429` | Too many requests from this IP. |
| `500` | `{ "ok": false, "error": "Something went wrong. Please try again." }` |

### `GET /api/leads`

Lists the 200 most recent enquiries, newest first. It needs `ADMIN_TOKEN`.

```bash
curl -H "Authorization: Bearer <ADMIN_TOKEN>" http://localhost:5000/api/leads
```

| Status | Meaning |
| --- | --- |
| `200` | `{ "ok": true, "leads": [ { "business", "email", "message", "status", "createdAt", ... } ] }` |
| `401` | Missing or wrong token. |
| `404` | `ADMIN_TOKEN` is not set, so the endpoint is off. |

Each saved lead has a `status` of `new`, `contacted` or `closed`, and starts as `new`.

## Editing the website

| To change | Edit |
| --- | --- |
| Any text, headline, FAQ, service, industry or product copy | `client/src/data/content.js` |
| Hero videos, section photos | URLs in `client/src/data/content.js` |
| Product videos and posters | Files in `client/public/media/` |
| Colours and fonts | The `:root` variables at the top of `client/src/index.css` |
| Section order | `client/src/App.jsx` |
| Logo | `client/src/components/Logo.jsx` and `client/public/favicon.svg` |
| Scroll animations | `client/src/lib/motion.js` |

Brand colour tokens in `index.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0A171E` | Deep sea-ink backgrounds |
| `--navy` | `#0F222B` | Cards and buttons on light sections |
| `--mint` | `#FF8A3D` | Beacon orange accent on dark backgrounds |
| `--accent` | `#B4500F` | Darker orange, for readable text on light backgrounds |
| `--sand` | `#F4F2EE` | Light section backgrounds |

> Several colours also have an `-rgb` version (for example `--ink-rgb`), used for transparent overlays. Update both when you change a colour.

## Deployment

In production one Node process serves both the website and the API.

```bash
npm install
npm run build
NODE_ENV=production MONGODB_URI="mongodb+srv://..." ADMIN_TOKEN="..." npm start
```

On Windows PowerShell, set the variables in `server/.env` instead of inline.

**Recommended setup**

1. **Database:** create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas), then copy its connection string.
2. **Host:** use any Node host that runs a long-lived server, such as [Render](https://render.com), [Railway](https://railway.app), Fly.io or a VPS.
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Environment: `NODE_ENV=production`, `MONGODB_URI`, `ADMIN_TOKEN`
3. **Domain:** point your domain at the host and turn on HTTPS.

**Before going live**

- [ ] Download the Pexels hero videos and photos into `client/public/media/` and update the URLs in `content.js`, instead of loading them from Pexels' servers.
- [ ] Set a long, random `ADMIN_TOKEN`.
- [ ] Add email notifications for new enquiries, if needed (not built in yet).
- [ ] Check the content security policy in `server/src/index.js` if you add new third-party services.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `Port 5000 is already in use` | Another server is running. Close it, or set a different `PORT` in `server/.env`. |
| `running scripts is disabled on this system` (Windows) | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or use `npm.cmd run dev`. |
| The first `npm run dev` is slow, or `Could NOT download ... mongodb` | The in-memory database is downloading MongoDB. Retry on a stable connection, set `MONGOMS_VERSION` to a version you already have, or set `MONGODB_URI` to skip it. |
| `MONGODB_URI is required in production` | Set `MONGODB_URI` when `NODE_ENV=production`. |
| The contact form shows "Your message didn't send" | The API is not running or not reachable. Check the terminal running `npm run dev`. |

## Credits

- Hero videos and section photos: [Pexels](https://www.pexels.com) (free to use under the Pexels licence).
- Fonts: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque), [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts.
- Open-source libraries: [Lenis](https://github.com/darkroomengineering/lenis) and [GSAP](https://github.com/greensock/GSAP).

## License

© 2026 Vorcove. All rights reserved.

The Vorcove name, logo, product names (Leadsmith, EventSmith) and website content are proprietary. Third-party libraries and media keep their own licences.
#   V o r c o v e  
 
# URL Shortener

A React + Vite URL shortener app with Ant Design and Tailwind CSS.

## Features

- User: register, login, home page, account page (paginated URL list)
- Admin: login, view/edit any user by email or user ID

## Getting Started

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

## Production

### 1. Build

```bash
npm run build
```

Outputs static files to the `dist/` folder.

### 2. Preview build locally

```bash
npm run preview
```

### 3. Serve in production

Use a static file server to serve the `dist/` folder.

**Option A — using `serve` (Node.js)**

```bash
npm install -g serve
serve dist
```

**Option B — using nginx**

Copy the `dist/` folder to your server and point nginx at it:

```nginx
server {
    listen 80;
    root /var/www/url-shortener/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Option C — deploy to Vercel**

```bash
npm install -g vercel
vercel --prod
```

**Option D — deploy to Netlify**

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

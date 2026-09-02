# Icon @ Peakwood

Client-facing website rebuild and maintenance workflow prototype for Icon @ Peakwood.

## Local preview

```bash
npm install
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

Then open `http://localhost:4173/`.

The resident maintenance view is at `/maintenance-portal`. The private staff preview is at `/maintenance-portal/staff` with the temporary credentials `admin` / `admin`.

For the configured Windows host, double-click `START-MAINTENANCE-SERVER.bat`. It starts the production website server, opens the resident maintenance portal, and starts the local Cloudflare tunnel when the host has the private tunnel config installed.

## Routes

- `/` — main website
- `/floor-plans` — floor-plan page
- `/maintenance` — maintenance information page
- `/maintenance-portal` — resident maintenance intake
- `/maintenance-portal/staff` — staff dashboard preview

## Validation

```bash
npm run build
npm run test:sites
```

# Fly-To-Heavens

A full-stack **flight reservation** web app: search flights, view details and seat layouts, sign in (including Google OAuth), manage a profile, leave reviews, and use admin tools to create or update flights and manage users. The stack is **MongoDB**, **Express**, **React**, and **Node.js** (MERN), with **Vite** on the frontend.

For deeper product behavior and planned work, see [`flight_reservation_system_documentation.txt`](flight_reservation_system_documentation.txt).

---

## Features

- **Guests**: browse the landing page, read reviews, browse flights and flight detail pages.
- **Registered users**: sign up / log in, JWT + HTTP-only cookie auth, password reset flow, profile, Google sign-in.
- **Flights**: list flights, slug-based flight pages, optional admin create/update flows with image upload handling.
- **Reviews**: API-backed reviews surfaced on the home page and a dedicated reviews page.
- **Admin-style routes** (enforced by your backend role checks): create flight, update flight, manage users.

Roadmap-style items (from project docs) include richer booking/payments, seat locking, and further dashboard polish.

---

## Tech stack

| Layer    | Technologies |
|----------|----------------|
| Frontend | React 18, React Router 6, Vite 8, React Toastify, `@react-oauth/google`, `jwt-decode` |
| Backend  | Express 5, Mongoose 9, JWT (`jsonwebtoken`), bcrypt, cookies (`cookie-parser`), CORS, Multer + Sharp, Nodemailer, Google Auth Library |
| Data     | MongoDB |

---

## Project layout

```
Fly-To-Heavens/
├── backend/           # Express API (port 5000 by default)
│   ├── app.js         # Middleware, CORS, route mounting
│   ├── server.js      # DB connect + HTTP server
│   ├── config.env     # Environment variables (do not commit real secrets)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── data/          # Optional seed scripts + JSON fixtures
├── frontend/          # Vite + React (port 5173 by default)
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── .env           # VITE_* variables for the dev server
└── flight_reservation_system_documentation.txt
```

---

## Prerequisites

- **Node.js** (LTS recommended)
- **MongoDB** running locally or a connection string to a hosted cluster

---

## Quick start

### 1. Clone and install

```bash
git clone https://github.com/Rayyan-Arif/Fly-To-Heavens.git
cd Fly-To-Heavens
```

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd ../frontend
npm install
```

### 2. Configure environment

**Backend** — edit `backend/config.env` (or copy it to a local file you keep out of version control):

| Variable | Purpose |
|----------|---------|
| `DATABASE_LOCAL` | MongoDB connection string (e.g. `mongodb://127.0.0.1:27017/flytoheavens`) |
| `JWT_SECRET` | Secret for signing JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `90d`) |
| `JWT_COOKIE_EXPIRES_IN` | Cookie max-age in days |
| `EMAIL_*` / `EMAIL_USER` | Nodemailer / Mailtrap (or your provider) for transactional email |
| `FRONTEND_URL` | Frontend origin used by the backend (e.g. `http://localhost:5173`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID (must match the frontend) |

**Frontend** — ensure `frontend/.env` exists with:

```env
VITE_API_URL=http://localhost:5000
VITE_CLIENT_ID=<your-google-oauth-client-id>
```

The API is expected **without** a trailing `/api` suffix; the app calls paths like `${VITE_API_URL}/api/...`.

### 3. Run MongoDB

Start your local `mongod` instance or point `DATABASE_LOCAL` at your cluster.

### 4. Start the servers

From `backend/` (the app loads `./config.env` relative to this folder):

```bash
node server.js
```

From `frontend/`:

```bash
npm run dev
```

- **API**: `http://localhost:5000`  
- **UI**: `http://localhost:5173`

CORS in `backend/app.js` allows credentials from `http://localhost:5173`. If you change the Vite port or deploy, update `origin` there and align `FRONTEND_URL` / `VITE_API_URL`.

### 5. Optional: seed sample data

The script `backend/data/insertToDB.js` can load JSON fixtures into MongoDB. Run it from the `backend/data` directory so `../config.env` resolves correctly:

```bash
cd backend/data
node insertToDB.js
```

Review the script before running: it may delete or overwrite collections (e.g. flights).

---

## API overview

Routes are mounted under:

- `/api/users` — auth, profile, admin user actions (see `userRoutes.js`)
- `/api/flights` — flights CRUD and related operations (see `flightRoutes.js`)
- `/api/reviews` — reviews (see `reviewRoutes.js`)

Unknown paths return a JSON 404 from the global handler.

---

## Frontend routes (high level)

| Path | Page |
|------|------|
| `/` | Home |
| `/login`, `/signup` | Auth |
| `/reviews` | All reviews |
| `/flights` | Flight list |
| `/flights/:slug` | Single flight |
| `/me` | Profile |
| `/reset-password/:token` | Password reset |
| `/admin/create-flight` | Create flight (admin) |
| `/flights/update/:slug` | Update flight (admin) |
| `/admin/manage-users` | User management (admin) |
| `*` | 404 |

---

## Production build (frontend)

```bash
cd frontend
npm run build
npm run preview   # optional local preview of the build
```

Serve the built assets with your hosting of choice and point `VITE_API_URL` (at build time) to your deployed API.

---

## Security note

Replace any placeholder or sample secrets in `config.env` before sharing the repo or deploying. Prefer environment variables or a secrets manager in production, and never commit real credentials.

---

## License

See `backend/package.json` and `frontend/package.json` for package metadata. Add a root `LICENSE` if you want an explicit project license.

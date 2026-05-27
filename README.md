# 📚 Deployment Guide – MyBookings

## Backend (Vercel)

1. Open the Vercel dashboard → **my‑bookings‑three** project.
2. Go to **Settings → Environment Variables**.
3. Add:

| Key            | Value                                 |
|----------------|---------------------------------------|
| `FRONTEND_URL` | `https://mybookings‑in.onrender.com` |

4. Click **Save**.
5. Trigger a **Redeploy** (button on the Deployments page).

## Frontend (Render)

1. Open the Render dashboard → **mybookings‑in** service.
2. Go to **Environment → Add Environment Variable**.
3. Add:

| Key                | Value                                 |
|--------------------|---------------------------------------|
| `REACT_APP_API_URL`| `https://my‑bookings‑three.vercel.app` |

4. Save and click **Manual Deploy** (or push a small commit).

## Verify

- Visit `https://mybookings‑in.onrender.com` → login → OTP should succeed without CORS errors.
- Open the Train Payment page (`/train/payment`) → you should see the new gradient UI, animated header, and responsive layout.

---

## Optional: Local testing script

If you want to spin up both projects locally with the same settings, run:

```bash
./scripts/deploy.sh
```

(See the script for details.)

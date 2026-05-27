#!/usr/bin/env bash
# ------------------------------------------------------------
# Quick local test script for MyBookings
# ------------------------------------------------------------

# 1️⃣ Frontend – set env var for local dev
export REACT_APP_API_URL="http://localhost:5000"   # Vercel backend dev port
echo "🟢 Frontend env REACT_APP_API_URL set to $REACT_APP_API_URL"

# 2️⃣ Backend – set env var for local dev
export FRONTEND_URL="http://localhost:3000"   # Render frontend dev port
echo "🟢 Backend env FRONTEND_URL set to $FRONTEND_URL"

# 3️⃣ Install & run (if you haven't already)
cd backend
npm install
npm run dev &   # run in background
BACK_PID=$!

cd ../frontend
npm install
npm start &    # run in background
FRONT_PID=$!

echo "🚀 Both servers started. Frontend PID=$FRONT_PID, Backend PID=$BACK_PID"
echo "Visit http://localhost:3000 to test locally."

# When you press Ctrl+C, clean up
trap "kill $BACK_PID $FRONT_PID; exit" SIGINT
wait

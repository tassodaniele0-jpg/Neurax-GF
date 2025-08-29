@echo off
echo 🚀 NEURAX GF FOR ALL - Smart Deploy
echo.

set API_KEY=rnd_nQM7i6sLLAPomuyQqtob51Zpu1XR
set REPO_URL=https://github.com/tassodaniele0-jpg/Neurax-GF

echo 👤 Getting user info...
curl -s -H "Authorization: Bearer %API_KEY%" "https://api.render.com/v1/owners" > user_info.json

echo 📦 Creating backend service...
curl -X POST "https://api.render.com/v1/services" ^
  -H "Authorization: Bearer %API_KEY%" ^
  -H "Content-Type: application/json" ^
  -d @backend-config.json

echo.
echo ⏳ Waiting 10 seconds for backend...
timeout /t 10 /nobreak >nul

echo 🎨 Creating frontend service...
curl -X POST "https://api.render.com/v1/static-sites" ^
  -H "Authorization: Bearer %API_KEY%" ^
  -H "Content-Type: application/json" ^
  -d @frontend-config.json

echo.
echo 🎉 Deploy completed!
echo 🌐 Frontend: https://neurax-gf-frontend.onrender.com
echo 🔧 Backend: https://neurax-gf-backend.onrender.com
echo.
echo ⏳ Check status at https://dashboard.render.com
pause

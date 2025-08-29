@echo off
echo 🚀 NEURAX GF FOR ALL - Automated Deploy
echo.

set API_KEY=rnd_nQM7i6sLLAPomuyQqtob51Zpu1XR
set REPO_URL=https://github.com/tassodaniele0-jpg/Neurax-GF

echo 📦 Creating backend service...

curl -X POST "https://api.render.com/v1/services" ^
  -H "Authorization: Bearer %API_KEY%" ^
  -H "Content-Type: application/json" ^
  -d "{\"type\":\"web_service\",\"name\":\"neurax-gf-backend\",\"repo\":\"%REPO_URL%\",\"branch\":\"main\",\"rootDir\":\"r3f-virtual-girlfriend-backend-main/r3f-virtual-girlfriend-backend-main\",\"runtime\":\"node\",\"buildCommand\":\"npm install\",\"startCommand\":\"node index.js\",\"plan\":\"free\",\"region\":\"oregon\",\"envVars\":[{\"key\":\"NODE_ENV\",\"value\":\"production\"},{\"key\":\"OPENROUTER_API_KEY\",\"value\":\"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\"},{\"key\":\"ELEVEN_LABS_API_KEY\",\"value\":\"sk_15e62c5ee2974e46e90ed214e5353b7485784974475b03b0\"},{\"key\":\"OPENROUTER_MODEL\",\"value\":\"deepseek/deepseek-r1:free\"},{\"key\":\"ELEVENLABS_VOICE_ID\",\"value\":\"21m00Tcm4TlvDq8ikWAM\"}]}"

echo.
echo ⏳ Waiting 5 seconds...
timeout /t 5 /nobreak >nul

echo 🎨 Creating frontend service...

curl -X POST "https://api.render.com/v1/static-sites" ^
  -H "Authorization: Bearer %API_KEY%" ^
  -H "Content-Type: application/json" ^
  -d "{\"type\":\"static_site\",\"name\":\"neurax-gf-frontend\",\"repo\":\"%REPO_URL%\",\"branch\":\"main\",\"rootDir\":\"r3f-virtual-girlfriend-frontend-main/r3f-virtual-girlfriend-frontend-main\",\"buildCommand\":\"npm install && npm run build\",\"publishPath\":\"dist\",\"envVars\":[{\"key\":\"VITE_API_URL\",\"value\":\"https://neurax-gf-backend.onrender.com\"}]}"

echo.
echo 🎉 Deploy completed!
echo 🌐 Frontend: https://neurax-gf-frontend.onrender.com
echo 🔧 Backend: https://neurax-gf-backend.onrender.com
echo.
echo ⏳ Services are building... Check status at https://dashboard.render.com
pause

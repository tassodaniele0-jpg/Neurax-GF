# NEURAX GF FOR ALL - Automated Deploy Script
# This script creates services on Render using the REST API

$ErrorActionPreference = "Stop"

# Configuration
$GITHUB_REPO = "https://github.com/tassodaniele0-jpg/Neurax-GF"
$RENDER_API_BASE = "https://api.render.com/v1"

# Render API Key
$RENDER_API_KEY = "rnd_nQM7i6sLLAPomuyQqtob51Zpu1XR"

$headers = @{
    "Authorization" = "Bearer $RENDER_API_KEY"
    "Content-Type" = "application/json"
}

Write-Host "🚀 Starting NEURAX GF FOR ALL deployment..." -ForegroundColor Green

# Create Backend Service
Write-Host "📦 Creating backend service..." -ForegroundColor Yellow

$backendPayload = @{
    type = "web_service"
    name = "neurax-gf-backend"
    repo = $GITHUB_REPO
    branch = "main"
    rootDir = "r3f-virtual-girlfriend-backend-main/r3f-virtual-girlfriend-backend-main"
    runtime = "node"
    buildCommand = "npm install"
    startCommand = "node index.js"
    plan = "free"
    region = "oregon"
    envVars = @(
        @{ key = "NODE_ENV"; value = "production" }
        @{ key = "OPENROUTER_API_KEY"; value = "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" }
        @{ key = "ELEVEN_LABS_API_KEY"; value = "sk_15e62c5ee2974e46e90ed214e5353b7485784974475b03b0" }
        @{ key = "OPENROUTER_MODEL"; value = "deepseek/deepseek-r1:free" }
        @{ key = "ELEVENLABS_VOICE_ID"; value = "21m00Tcm4TlvDq8ikWAM" }
    )
} | ConvertTo-Json -Depth 10

try {
    $backendResponse = Invoke-RestMethod -Uri "$RENDER_API_BASE/services" -Method POST -Headers $headers -Body $backendPayload
    $backendUrl = "https://$($backendResponse.service.name).onrender.com"
    Write-Host "✅ Backend created: $backendUrl" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to create backend: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Wait a moment for backend to be ready
Start-Sleep -Seconds 2

# Create Frontend Service
Write-Host "🎨 Creating frontend service..." -ForegroundColor Yellow

$frontendPayload = @{
    type = "static_site"
    name = "neurax-gf-frontend"
    repo = $GITHUB_REPO
    branch = "main"
    rootDir = "r3f-virtual-girlfriend-frontend-main/r3f-virtual-girlfriend-frontend-main"
    buildCommand = "npm install; npm run build"
    publishPath = "dist"
    envVars = @(
        @{ key = "VITE_API_URL"; value = $backendUrl }
    )
} | ConvertTo-Json -Depth 10

try {
    $frontendResponse = Invoke-RestMethod -Uri "$RENDER_API_BASE/static-sites" -Method POST -Headers $headers -Body $frontendPayload
    $frontendUrl = "https://$($frontendResponse.staticSite.name).onrender.com"
    Write-Host "✅ Frontend created: $frontendUrl" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to create frontend: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 NEURAX GF FOR ALL deployed successfully!" -ForegroundColor Green
Write-Host "🌐 Frontend: $frontendUrl" -ForegroundColor Cyan
Write-Host "🔧 Backend: $backendUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏳ Services are building... Check status at https://dashboard.render.com" -ForegroundColor Yellow

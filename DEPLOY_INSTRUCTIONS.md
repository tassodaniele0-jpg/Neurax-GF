# 🚀 Deploy Instructions for NEURAX GF FOR ALL

## Step 1: Push to GitHub

```bash
# Add GitHub remote (replace with your username)
git remote add origin https://github.com/YOUR_USERNAME/neurax-gf-for-all.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `neurax-gf-backend`
   - **Root Directory**: `r3f-virtual-girlfriend-backend-main/r3f-virtual-girlfriend-backend-main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Plan**: `Free`

5. **Environment Variables**:
   ```
   NODE_ENV=production
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   ELEVEN_LABS_API_KEY=your-elevenlabs-key-here
   OPENROUTER_MODEL=deepseek/deepseek-r1:free
   ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
   ```

6. Click **"Create Web Service"**

## Step 3: Deploy Frontend on Render

1. Click **"New"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure:
   - **Name**: `neurax-gf-frontend`
   - **Root Directory**: `r3f-virtual-girlfriend-frontend-main/r3f-virtual-girlfriend-frontend-main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Environment Variables**:
   ```
   VITE_API_URL=https://neurax-gf-backend.onrender.com
   ```

5. Click **"Create Static Site"**

## Step 4: Update CORS (After Backend Deploy)

Once the backend is deployed, update the CORS configuration with the actual frontend URL.

## 🎉 Your App Will Be Live At:

- **Frontend**: `https://neurax-gf-frontend.onrender.com`
- **Backend**: `https://neurax-gf-backend.onrender.com`

## 🔧 API Keys Setup

### OpenRouter (Free)
1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up and get your API key
3. Add to backend environment variables

### ElevenLabs (Optional)
1. Go to [elevenlabs.io](https://elevenlabs.io)
2. Sign up and get your API key
3. Add to backend environment variables

## 🎵 Voice Options

Default voice is Rachel (`21m00Tcm4TlvDq8ikWAM`). Other options:
- Bella: `EXAVITQu4vr4xnSDxMaL`
- Elli: `MF3mGyEYCl7XYWbV9V6O`
- Nicole: `piTKgcLEGmPE4e6mEKli`
- Freya: `jsCqWAovK2LkecY7zXl4`

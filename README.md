# 🎭 NEURAX GF FOR ALL

**The Ultimate Virtual Girlfriend Experience with AI and 3D Avatar**

A complete virtual girlfriend application featuring:
- 🤖 **Free AI** powered by DeepSeek R1 via OpenRouter
- 🎵 **Voice Synthesis** with ElevenLabs (5 female voices)
- 💋 **Advanced Lip-Sync** using Rhubarb 1.14.0
- 🎭 **3D Avatar** with facial expressions and animations
- 💬 **Real-time Chat** with emotional responses
- 🎨 **Modern UI** with React + Three.js

## 🚀 Quick Deploy to Render

### Prerequisites
1. **OpenRouter API Key** (Free) - Get from [openrouter.ai](https://openrouter.ai)
2. **ElevenLabs API Key** (Optional) - Get from [elevenlabs.io](https://elevenlabs.io)
3. **Render Account** - Sign up at [render.com](https://render.com)

### Deploy Steps

1. **Fork this repository** to your GitHub account

2. **Connect to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Select this repository

3. **Set Environment Variables**:
   ```env
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   ELEVEN_LABS_API_KEY=your-elevenlabs-key-here
   ```

4. **Deploy**: Render will automatically deploy both services using `render.yaml`

## 🏗️ Architecture

### Backend Service (`neurax-gf-backend`)
- **Runtime**: Node.js
- **Port**: 10000 (Render default)
- **Features**:
  - OpenRouter integration (DeepSeek R1)
  - ElevenLabs voice synthesis
  - FFmpeg audio processing
  - Rhubarb lip-sync generation
  - CORS configured for production

### Frontend Service (`neurax-gf-frontend`)
- **Type**: Static Site
- **Build**: Vite + React
- **Features**:
  - Three.js 3D rendering
  - Real-time chat interface
  - Avatar animations
  - Responsive design

## 🎵 Voice Configuration

The app includes 5 pre-configured female voices:

| Voice | ID | Description |
|-------|----|-----------| 
| Rachel | `21m00Tcm4TlvDq8ikWAM` | Warm and friendly (default) |
| Bella | `EXAVITQu4vr4xnSDxMaL` | Young and sweet |
| Elli | `MF3mGyEYCl7XYWbV9V6O` | Soft and gentle |
| Nicole | `piTKgcLEGmPE4e6mEKli` | Professional |
| Freya | `jsCqWAovK2LkecY7zXl4` | Mature |

## 🔧 Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd neurax-gf-for-all

# Install backend dependencies
cd r3f-virtual-girlfriend-backend-main/r3f-virtual-girlfriend-backend-main
npm install

# Install frontend dependencies  
cd ../../r3f-virtual-girlfriend-frontend-main/r3f-virtual-girlfriend-frontend-main
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start backend (terminal 1)
npm run dev

# Start frontend (terminal 2)
cd ../../r3f-virtual-girlfriend-frontend-main/r3f-virtual-girlfriend-frontend-main
npm run dev
```

## 📱 Features

- ✅ **Completely Free AI** (DeepSeek R1)
- ✅ **Professional Voice Synthesis**
- ✅ **Advanced Lip-Sync Technology**
- ✅ **3D Avatar with Emotions**
- ✅ **Real-time Chat Interface**
- ✅ **Responsive Design**
- ✅ **Production Ready**

## 🌐 Live Demo

After deployment, your app will be available at:
- **Frontend**: `https://neurax-gf-frontend.onrender.com`
- **Backend**: `https://neurax-gf-backend.onrender.com`

## 📄 License

MIT License - Feel free to use and modify!

---

**Made with ❤️ by NEURAX**

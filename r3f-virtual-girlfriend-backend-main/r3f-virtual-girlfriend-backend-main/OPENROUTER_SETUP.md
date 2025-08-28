# 🚀 OpenRouter Setup Guide - Virtual Girlfriend App

## 📋 Overview
This project has been updated to use **OpenRouter** instead of OpenAI directly, allowing you to use **completely free AI models** for your virtual girlfriend app!

## 🆓 Why OpenRouter?
- **Free Models**: Access to powerful models like DeepSeek R1 at no cost
- **Multiple Providers**: Choose from various AI providers through one API
- **Better Rates**: Even paid models are often cheaper than direct provider APIs
- **Reliability**: Automatic failover between providers

## 🔑 Getting Your OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up for a free account
3. Go to [API Keys](https://openrouter.ai/keys)
4. Create a new API key
5. Copy the key (starts with `sk-or-v1-`)

## ⚙️ Configuration

### 1. Environment Variables
Create a `.env` file in the backend root directory:

```env
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
ELEVEN_LABS_API_KEY=your-elevenlabs-key-here

# Optional: Choose a specific model (defaults to deepseek/deepseek-r1:free)
OPENROUTER_MODEL=deepseek/deepseek-r1:free
```

### 2. Available Free Models (August 2025)

| Model | ID | Best For |
|-------|----|---------| 
| **DeepSeek R1** | `deepseek/deepseek-r1:free` | 🏆 **Recommended** - Most advanced |
| **Llama 3.2 3B** | `meta-llama/llama-3.2-3b-instruct:free` | Fast responses |
| **DeepSeek R1 Distill 70B** | `deepseek/deepseek-r1-distill-llama-70b:free` | Balanced performance |
| **DeepSeek R1 Distill 8B** | `deepseek/deepseek-r1-distill-llama-8b:free` | Lightweight |

### 3. Model Selection
You can change the model by setting the `OPENROUTER_MODEL` environment variable:

```bash
# Use DeepSeek R1 (default - most advanced)
OPENROUTER_MODEL=deepseek/deepseek-r1:free

# Use Llama 3.2 3B (faster)
OPENROUTER_MODEL=meta-llama/llama-3.2-3b-instruct:free
```

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   cd r3f-virtual-girlfriend-backend-main/r3f-virtual-girlfriend-backend-main
   yarn install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys
   ```

3. **Download Rhubarb binary:**
   - Download from [Rhubarb Releases](https://github.com/DanielSWolf/rhubarb-lip-sync/releases)
   - Extract to `bin/` folder
   - Ensure `bin/rhubarb` is executable

4. **Start the server:**
   ```bash
   yarn dev
   ```

## 🔍 Testing Your Setup

Visit these endpoints to verify everything works:

- `http://localhost:3000/health` - Check API key status
- `http://localhost:3000/models` - See current model configuration
- `http://localhost:3000/voices` - Test ElevenLabs connection

## 💡 Benefits of This Setup

✅ **Completely Free**: DeepSeek R1 is free with no usage limits  
✅ **High Quality**: DeepSeek R1 is one of the most advanced models available  
✅ **Easy Switching**: Change models via environment variable  
✅ **Robust Parsing**: Handles different response formats automatically  
✅ **Future Proof**: Easy to add new models as they become available  

## 🚨 Troubleshooting

**"Please add your API keys" message?**
- Check your `.env` file exists and has the correct keys
- Verify your OpenRouter API key starts with `sk-or-v1-`
- Restart the server after changing environment variables

**Model not responding correctly?**
- Try switching to `meta-llama/llama-3.2-3b-instruct:free` 
- Check the `/health` endpoint for API key status
- Look at server console for error messages

## 🔄 Switching Back to OpenAI (if needed)

If you want to use OpenAI instead:
1. Change `OPENROUTER_API_KEY` to `OPENAI_API_KEY` in `.env`
2. Update the model to `gpt-3.5-turbo` or `gpt-4`
3. Remove the `baseURL` and `defaultHeaders` from the OpenAI configuration

---

**Happy chatting with your AI girlfriend! ❤️**

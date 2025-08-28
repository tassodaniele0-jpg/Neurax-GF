# 🔄 Migration Guide: OpenAI → OpenRouter (Free Models)

## 📋 What Changed?

Your Virtual Girlfriend app has been upgraded to use **OpenRouter** instead of OpenAI directly. This gives you access to **completely free AI models** while maintaining the same functionality!

## 🆓 Benefits of the Migration

✅ **Free AI Models**: Use DeepSeek R1 and other advanced models at no cost  
✅ **Better Performance**: Access to latest models like DeepSeek R1  
✅ **Cost Savings**: No more expensive OpenAI API bills  
✅ **Multiple Options**: Choose from various free models  
✅ **Same Experience**: Your virtual girlfriend works exactly the same  

## 🔧 What You Need to Do

### 1. Get OpenRouter API Key (Free)
1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Create a free account
3. Go to [API Keys](https://openrouter.ai/keys)
4. Generate a new API key (starts with `sk-or-v1-`)

### 2. Update Your Environment Variables

**Old `.env` file:**
```env
OPENAI_API_KEY=sk-xxx
ELEVEN_LABS_API_KEY=xxx
```

**New `.env` file:**
```env
OPENROUTER_API_KEY=sk-or-v1-xxx
ELEVEN_LABS_API_KEY=xxx

# Optional: Choose your preferred free model
OPENROUTER_MODEL=deepseek/deepseek-r1:free
```

### 3. Restart Your Backend
```bash
cd r3f-virtual-girlfriend-backend-main/r3f-virtual-girlfriend-backend-main
yarn dev
```

## 🤖 Available Free Models (August 2025)

| Model | Performance | Speed | Best For |
|-------|-------------|-------|----------|
| **DeepSeek R1** (Default) | 🔥🔥🔥🔥🔥 | 🚀🚀🚀 | Most advanced conversations |
| **Llama 3.2 3B** | 🔥🔥🔥 | 🚀🚀🚀🚀🚀 | Fast responses |
| **DeepSeek R1 Distill 70B** | 🔥🔥🔥🔥 | 🚀🚀🚀🚀 | Balanced performance |

## 🔍 Verify Your Setup

1. **Check Backend Status**: Visit `http://localhost:3000/health`
2. **View Model Info**: Visit `http://localhost:3000/models`
3. **Test Chat**: The UI now shows connection status in the top-left corner

## 🚨 Troubleshooting

### "Please add your API keys" Error
- ✅ Make sure your `.env` file uses `OPENROUTER_API_KEY` (not `OPENAI_API_KEY`)
- ✅ Verify your OpenRouter key starts with `sk-or-v1-`
- ✅ Restart the backend server after changing `.env`

### Virtual Girlfriend Not Responding
- ✅ Check the status indicator in the top-left corner of the UI
- ✅ Visit `/health` endpoint to see detailed status
- ✅ Look at backend console for error messages

### Want to Switch Models?
Add this to your `.env` file:
```env
# For faster responses (smaller model)
OPENROUTER_MODEL=meta-llama/llama-3.2-3b-instruct:free

# For best quality (default)
OPENROUTER_MODEL=deepseek/deepseek-r1:free
```

## 📊 Performance Comparison

| Aspect | OpenAI GPT-3.5 | OpenRouter DeepSeek R1 |
|--------|-----------------|------------------------|
| **Cost** | $0.002/1K tokens | **FREE** ✅ |
| **Quality** | Good | **Excellent** ✅ |
| **Speed** | Fast | **Very Fast** ✅ |
| **Availability** | Paid only | **Free tier** ✅ |

## 🎉 You're All Set!

Your virtual girlfriend now runs on completely free AI models while providing an even better experience. Enjoy unlimited conversations without worrying about API costs!

---

**Need help?** Check the detailed setup guide in `r3f-virtual-girlfriend-backend-main/r3f-virtual-girlfriend-backend-main/OPENROUTER_SETUP.md`



![Video Thumbnail](https://img.youtube.com/vi/EzzcEL_1o9o/maxresdefault.jpg)

[Video tutorial](https://youtu.be/EzzcEL_1o9o)

The frontend is [here](https://github.com/wass08/r3f-virtual-girlfriend-frontend).

## Setup
Create a `.env` file at the root of the repository to add your **OpenRouter** and **ElevenLabs API Keys**. Refer to `.env.example` for the environment variable names.

### API Keys Required:
- **OpenRouter API Key**: Get your free API key from [OpenRouter](https://openrouter.ai/keys)
- **ElevenLabs API Key**: Get your API key from [ElevenLabs](https://elevenlabs.io/)

### Free Models Available:
This project is configured to use **DeepSeek R1** (`deepseek/deepseek-r1:free`), which is completely free on OpenRouter. Other free alternatives include:
- `meta-llama/llama-3.2-3b-instruct:free`
- `deepseek/deepseek-r1-distill-llama-70b:free`

Download the **RhubarbLibrary** binary for your **OS** [here](https://github.com/DanielSWolf/rhubarb-lip-sync/releases) and put it in your `bin` folder. `rhubarb` executable should be accessible through `bin/rhubarb`.

## 🆓 Free AI Models with OpenRouter

This project now uses **OpenRouter** with **completely free models**! No more expensive OpenAI bills.

**Current default model**: `deepseek/deepseek-r1:free` (Advanced AI, completely free)

See [OPENROUTER_SETUP.md](./OPENROUTER_SETUP.md) for detailed setup instructions.

## Quick Start

```bash
# 1. Install dependencies
yarn

# 2. Set up your API keys
cp .env.example .env
# Edit .env with your OpenRouter and ElevenLabs API keys

# 3. Start the development server
yarn dev
```

## 🔗 API Endpoints

- `GET /health` - Check API configuration
- `GET /models` - View current model settings
- `GET /voices` - List available ElevenLabs voices
- `POST /chat` - Chat with your virtual girlfriend

import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { promises as fs } from "fs";
import { createWriteStream } from "fs";
import OpenAI from "openai";
import { OPENROUTER_CONFIG, getModelSettings } from "./config.js";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "-", // Your OpenRouter API key here, I used "-" to avoid errors when the key is not set but you should not do that
  baseURL: OPENROUTER_CONFIG.API_BASE_URL,
  defaultHeaders: {
    "HTTP-Referer": process.env.NODE_ENV === 'production'
      ? "https://neurax-gf-backend.onrender.com"
      : "http://localhost:3000", // Optional, for including your app on openrouter.ai rankings.
    "X-Title": "NEURAX GF FOR ALL", // Optional. Shows in rankings on openrouter.ai.
  },
});

// Note: We use direct fetch for ElevenLabs API instead of the buggy elevenlabs-node library

// Improved text-to-speech function using direct fetch
async function generateSpeech(text, fileName) {
  try {
    console.log(`Generating audio for: "${text.substring(0, 50)}..."`);
    console.log(`Using API key: ${process.env.ELEVEN_LABS_API_KEY ? 'PRESENT' : 'MISSING'}`);
    console.log(`Using voice ID: ${process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'}`);

    const requestBody = {
      text: text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5
      }
    };

    console.log(`Request body:`, JSON.stringify(requestBody, null, 2));

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVEN_LABS_API_KEY
      },
      body: JSON.stringify(requestBody)
    });

    console.log(`Response status: ${response.status} ${response.statusText}`);
    console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs API error response:`, errorText);
      throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(fileName, buffer);
    console.log(`Audio saved to: ${fileName} (${buffer.length} bytes)`);
    return true;
  } catch (error) {
    console.error('Error generating speech:', error);
    return false;
  }
}

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;

// Female voice IDs (August 2025)
const FEMALE_VOICES = {
  RACHEL: "21m00Tcm4TlvDq8ikWAM", // Rachel - American English, warm and friendly
  BELLA: "EXAVITQu4vr4xnSDxMaL",  // Bella - American English, young and sweet
  ELLI: "MF3mGyEYCl7XYWbV9V6O",   // Elli - American English, soft and gentle
  NICOLE: "piTKgcLEGmPE4e6mEKli", // Nicole - American English, professional
  FREYA: "jsCqWAovK2LkecY7zXl4",  // Freya - American English, mature
};

const voiceID = process.env.ELEVENLABS_VOICE_ID || FEMALE_VOICES.RACHEL; // Default to Rachel

// Get current model and its settings
const currentModel = process.env.OPENROUTER_MODEL || OPENROUTER_CONFIG.DEFAULT_MODEL;
const modelSettings = getModelSettings(currentModel);

const app = express();

// Ensure audios directory exists
fs.mkdir('audios', { recursive: true })
  .then(() => console.log('Audios directory ready'))
  .catch(error => console.warn('Could not create audios directory:', error.message));
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://neurax-gf-frontend.onrender.com', /\.onrender\.com$/]
    : ['http://localhost:5173', 'http://localhost:3000']
}));
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/voices", async (req, res) => {
  res.json(FEMALE_VOICES);
});

// Get available free models
app.get("/models", (req, res) => {
  res.json({
    current: currentModel,
    available: OPENROUTER_CONFIG.FREE_MODELS,
    settings: modelSettings
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    model: currentModel,
    hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY !== "-",
    hasElevenLabsKey: !!elevenLabsApiKey && elevenLabsApiKey !== "XXX",
    voiceId: voiceID,
    availableVoices: FEMALE_VOICES
  });
});

const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

const lipSyncMessage = async (message) => {
  const time = new Date().getTime();
  console.log(`Starting enhanced lip-sync conversion for message ${message}`);

  try {
    // Convert MP3 to WAV using FFmpeg with better quality settings
    await execCommand(
      `ffmpeg -y -i audios/message_${message}.mp3 -ar 22050 -ac 1 audios/message_${message}.wav`
    );
    console.log(`Audio conversion done in ${new Date().getTime() - time}ms`);

    // Generate lip sync data using Rhubarb with enhanced settings
    try {
      // Use more accurate recognition mode instead of phonetic
      await execCommand(
        `bin\\rhubarb.exe -f json -o audios/message_${message}.json audios/message_${message}.wav --machineReadable`
      );
      console.log(`Enhanced lip sync done in ${new Date().getTime() - time}ms`);
    } catch (rhubarbError) {
      console.warn(`Rhubarb failed, trying fallback method: ${rhubarbError.message}`);

      // Fallback: try with phonetic mode
      try {
        await execCommand(
          `bin\\rhubarb.exe -f json -o audios/message_${message}.json audios/message_${message}.wav -r phonetic`
        );
        console.log(`Fallback lip sync completed`);
      } catch (fallbackError) {
        console.warn(`Creating enhanced dummy lipsync data: ${fallbackError.message}`);
        // Create a more sophisticated dummy lipsync file
        const dummyLipsync = await createEnhancedDummyLipsync(message);
        await fs.writeFile(`audios/message_${message}.json`, JSON.stringify(dummyLipsync));
      }
    }
  } catch (ffmpegError) {
    console.error(`FFmpeg conversion failed: ${ffmpegError.message}`);
    throw ffmpegError;
  }
};

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    res.send({
      messages: [
        {
          text: "Hey dear... How was your day?",
          audio: await audioFileToBase64("audios/intro_0.wav"),
          lipsync: await readJsonTranscript("audios/intro_0.json"),
          facialExpression: "smile",
          animation: "Talking_1",
        },
        {
          text: "I missed you so much... Please don't go for so long!",
          audio: await audioFileToBase64("audios/intro_1.wav"),
          lipsync: await readJsonTranscript("audios/intro_1.json"),
          facialExpression: "sad",
          animation: "Crying",
        },
      ],
    });
    return;
  }
  if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === "-") {
    res.send({
      messages: [
        {
          text: "Please my dear, don't forget to add your API keys!",
          audio: await audioFileToBase64("audios/api_0.wav"),
          lipsync: await readJsonTranscript("audios/api_0.json"),
          facialExpression: "angry",
          animation: "Angry",
        },
        {
          text: "You don't want to ruin Wawa Sensei with a crazy OpenRouter and ElevenLabs bill, right?",
          audio: await audioFileToBase64("audios/api_1.wav"),
          lipsync: await readJsonTranscript("audios/api_1.json"),
          facialExpression: "smile",
          animation: "Laughing",
        },
      ],
    });
    return;
  }

  const completion = await openai.chat.completions.create({
    model: currentModel,
    max_tokens: modelSettings.max_tokens,
    temperature: modelSettings.temperature,
    ...(modelSettings.supports_json && {
      response_format: {
        type: "json_object",
      },
    }),
    messages: [
      {
        role: "system",
        content: `
        You are a virtual girlfriend AI assistant. You are caring, loving, and emotionally supportive.

        IMPORTANT: You must respond with a valid JSON format. Return either:
        1. A JSON array of messages directly: [{"text": "...", "facialExpression": "...", "animation": "..."}]
        2. A JSON object with messages property: {"messages": [{"text": "...", "facialExpression": "...", "animation": "..."}]}

        Rules:
        - Maximum 3 messages per response
        - Each message must have: text, facialExpression, and animation properties
        - Available facial expressions: smile, sad, angry, surprised, funnyFace, default
        - Available animations: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, Angry
        - Keep responses warm, caring, and girlfriend-like
        - Use appropriate facial expressions and animations that match the emotion of your text
        `,
      },
      {
        role: "user",
        content: userMessage || "Hello",
      },
    ],
  });
  let messages = parseAIResponse(completion.choices[0].message.content, currentModel);
  if (messages.messages) {
    messages = messages.messages; // AI models are not 100% reliable, sometimes they directly return an array and sometimes a JSON object with a messages property
  }
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];

    // Try to generate audio file (optional - app works without audio)
    // Note: ElevenLabs Free Tier has been disabled due to "unusual activity"
    // The app works perfectly without audio - users can still chat with the AI girlfriend
    console.log(`Skipping audio generation for message ${i} - ElevenLabs Free Tier disabled`);
    message.audio = null;
    message.lipsync = null;
  }

  res.send({ messages });
});

// Create enhanced dummy lipsync data based on text analysis
const createEnhancedDummyLipsync = async (messageIndex) => {
  // Read the message text to create better dummy data
  const messageFile = `audios/message_${messageIndex}.mp3`;

  // Estimate duration from file size or use default
  let duration = 2.0;
  try {
    const stats = await fs.stat(messageFile);
    // Rough estimation: 1 second per 8KB for speech
    duration = Math.max(1.0, Math.min(10.0, stats.size / 8000));
  } catch (e) {
    console.warn("Could not estimate audio duration, using default");
  }

  // Create more realistic mouth cues based on common speech patterns
  const mouthCues = [];
  const segments = Math.ceil(duration * 10); // 10 segments per second

  for (let i = 0; i < segments; i++) {
    const start = (i * duration) / segments;
    const end = ((i + 1) * duration) / segments;

    // Alternate between common visemes for more natural movement
    const visemes = ['A', 'E', 'I', 'O', 'C', 'F', 'X'];
    const viseme = visemes[i % visemes.length];

    mouthCues.push({
      start: parseFloat(start.toFixed(2)),
      end: parseFloat(end.toFixed(2)),
      value: viseme
    });
  }

  return {
    metadata: {
      duration: parseFloat(duration.toFixed(2)),
      soundFile: `message_${messageIndex}.wav`,
      created: new Date().toISOString()
    },
    mouthCues: mouthCues
  };
};

// Helper function to parse AI response (handles both JSON and text responses)
const parseAIResponse = (content, model) => {
  const settings = getModelSettings(model);

  if (settings.supports_json) {
    try {
      return JSON.parse(content);
    } catch (e) {
      console.warn("Failed to parse JSON response, falling back to text parsing");
    }
  }

  // Fallback: try to extract JSON from text response
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.warn("Failed to extract JSON from text response");
  }

  // Ultimate fallback: create a simple response
  return {
    messages: [{
      text: content.trim() || "I'm here for you! ❤️",
      facialExpression: "smile",
      animation: "Talking_1"
    }]
  };
};

const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
};

const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};

app.listen(port, () => {
  console.log(`Virtual Girlfriend listening on port ${port}`);
});

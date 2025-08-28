#!/usr/bin/env node

/**
 * Test script for OpenRouter configuration
 * Run with: node test-openrouter.js
 */

import dotenv from "dotenv";
import OpenAI from "openai";
import { OPENROUTER_CONFIG, getModelSettings } from "./config.js";

dotenv.config();

const testOpenRouterConnection = async () => {
  console.log("🧪 Testing OpenRouter Configuration...\n");

  // Check environment variables
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || OPENROUTER_CONFIG.DEFAULT_MODEL;

  console.log("📋 Configuration:");
  console.log(`   API Key: ${apiKey ? "✅ Set" : "❌ Missing"}`);
  console.log(`   Model: ${model}`);
  console.log(`   Base URL: ${OPENROUTER_CONFIG.API_BASE_URL}\n`);

  if (!apiKey || apiKey === "-") {
    console.error("❌ Error: OPENROUTER_API_KEY not set in .env file");
    console.log("💡 Solution: Add your OpenRouter API key to .env file");
    console.log("   Get one free at: https://openrouter.ai/keys\n");
    return;
  }

  // Initialize OpenAI client with OpenRouter
  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: OPENROUTER_CONFIG.API_BASE_URL,
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Virtual Girlfriend App Test",
    },
  });

  try {
    console.log("🚀 Testing AI model connection...");
    
    const modelSettings = getModelSettings(model);
    console.log(`   Settings: ${JSON.stringify(modelSettings, null, 2)}`);

    const completion = await openai.chat.completions.create({
      model: model,
      max_tokens: 100,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: "You are a test assistant. Respond with a simple greeting in JSON format: {\"message\": \"your greeting\", \"status\": \"success\"}"
        },
        {
          role: "user",
          content: "Hello, are you working?"
        }
      ],
      ...(modelSettings.supports_json && {
        response_format: {
          type: "json_object",
        },
      }),
    });

    const response = completion.choices[0].message.content;
    console.log("✅ AI Response received:");
    console.log(`   ${response}\n`);

    // Test parsing
    try {
      const parsed = JSON.parse(response);
      console.log("✅ JSON parsing successful");
      console.log(`   Parsed: ${JSON.stringify(parsed, null, 2)}\n`);
    } catch (e) {
      console.log("⚠️  JSON parsing failed, but text response received");
      console.log("   This is normal for some models\n");
    }

    console.log("🎉 OpenRouter connection test PASSED!");
    console.log("   Your virtual girlfriend should work perfectly!\n");

  } catch (error) {
    console.error("❌ OpenRouter connection test FAILED:");
    console.error(`   Error: ${error.message}\n`);
    
    if (error.message.includes("401")) {
      console.log("💡 Solution: Check your OpenRouter API key");
    } else if (error.message.includes("429")) {
      console.log("💡 Solution: Rate limit reached, try again in a moment");
    } else if (error.message.includes("model")) {
      console.log("💡 Solution: Try a different model from the free tier");
    }
  }
};

// Available models info
const showAvailableModels = () => {
  console.log("🤖 Available Free Models on OpenRouter (August 2025):");
  console.log("");
  
  Object.entries(OPENROUTER_CONFIG.FREE_MODELS).forEach(([name, id]) => {
    const settings = getModelSettings(id);
    console.log(`   ${name}:`);
    console.log(`     ID: ${id}`);
    console.log(`     Max Tokens: ${settings.max_tokens}`);
    console.log(`     JSON Support: ${settings.supports_json ? "✅" : "⚠️"}`);
    console.log("");
  });
};

// Main execution
const main = async () => {
  console.log("🎮 Virtual Girlfriend - OpenRouter Test Suite\n");
  
  showAvailableModels();
  await testOpenRouterConnection();
  
  console.log("📚 Next Steps:");
  console.log("   1. Start backend: yarn dev");
  console.log("   2. Start frontend: cd ../frontend && yarn dev");
  console.log("   3. Open http://localhost:5173");
  console.log("   4. Chat with your virtual girlfriend! ❤️");
};

main().catch(console.error);

// Configuration for OpenRouter models
export const OPENROUTER_CONFIG = {
  // Free models available on OpenRouter (August 2025)
  FREE_MODELS: {
    DEEPSEEK_R1: "deepseek/deepseek-r1:free",
    LLAMA_3_2_3B: "meta-llama/llama-3.2-3b-instruct:free",
    DEEPSEEK_R1_DISTILL_70B: "deepseek/deepseek-r1-distill-llama-70b:free",
    DEEPSEEK_R1_DISTILL_8B: "deepseek/deepseek-r1-distill-llama-8b:free",
  },
  
  // Default model for the virtual girlfriend
  DEFAULT_MODEL: "deepseek/deepseek-r1:free",
  
  // OpenRouter API configuration
  API_BASE_URL: "https://openrouter.ai/api/v1",
  
  // Model-specific settings
  MODEL_SETTINGS: {
    "deepseek/deepseek-r1:free": {
      max_tokens: 1000,
      temperature: 0.6,
      supports_json: true,
    },
    "meta-llama/llama-3.2-3b-instruct:free": {
      max_tokens: 800,
      temperature: 0.7,
      supports_json: false, // May need different handling
    },
  },
};

// Get model settings for a specific model
export const getModelSettings = (modelName) => {
  return OPENROUTER_CONFIG.MODEL_SETTINGS[modelName] || {
    max_tokens: 1000,
    temperature: 0.6,
    supports_json: true,
  };
};

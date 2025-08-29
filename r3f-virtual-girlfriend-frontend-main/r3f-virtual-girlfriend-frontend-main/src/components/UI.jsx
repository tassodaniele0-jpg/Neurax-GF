import { useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useBackendStatus } from "../hooks/useBackendStatus";
import VoiceInput from "./VoiceInput";

export const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();
  const { isOnline, model, hasOpenRouterKey, hasElevenLabsKey, error } = useBackendStatus();
  const [isListening, setIsListening] = useState(false);

  const sendMessage = () => {
    const text = input.current.value;
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };

  const handleVoiceInput = (voiceText) => {
    if (!loading && !message && voiceText.trim()) {
      console.log('Sending voice message:', voiceText);
      input.current.value = voiceText;
      chat(voiceText);
      input.current.value = "";
    }
  };
  if (hidden) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-xl">NEURAX GF FOR ALL</h1>
          <p>I will always love you ❤️</p>
          <div className="text-xs text-gray-600 mt-1 space-y-1">
            <p>Powered by OpenRouter (Free AI)</p>
            {isOnline ? (
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Online - {model?.split('/')[1] || 'DeepSeek R1'}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>Offline {error && `- ${error}`}</span>
              </div>
            )}
            {!hasOpenRouterKey && (
              <p className="text-red-600">⚠️ OpenRouter API key missing</p>
            )}
            {!hasElevenLabsKey && (
              <p className="text-red-600">⚠️ ElevenLabs API key missing</p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col items-end justify-center gap-4">
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-md"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>
          <button
            onClick={() => {
              const body = document.querySelector("body");
              if (body.classList.contains("greenScreen")) {
                body.classList.remove("greenScreen");
              } else {
                body.classList.add("greenScreen");
              }
            }}
            className="pointer-events-auto bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className={`w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md ${
              isListening ? 'border-2 border-pink-400 bg-pink-50' : ''
            }`}
            placeholder={isListening ? "🎤 Listening..." : "Type a message or use voice..."}
            ref={input}
            disabled={isListening}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          {/* Voice Input Button - Compact version */}
          <VoiceInput
            onVoiceInput={handleVoiceInput}
            isListening={isListening}
            setIsListening={setIsListening}
            compact={true}
          />

          <button
            disabled={loading || message || isListening}
            onClick={sendMessage}
            className={`bg-pink-500 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
              loading || message || isListening ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

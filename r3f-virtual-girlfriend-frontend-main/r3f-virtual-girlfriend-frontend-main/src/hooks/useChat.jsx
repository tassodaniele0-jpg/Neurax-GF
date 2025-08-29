import { createContext, useContext, useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const chat = async (message) => {
    setLoading(true);
    try {
      const data = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!data.ok) {
        throw new Error(`HTTP ${data.status}: ${data.statusText}`);
      }

      const resp = (await data.json()).messages;
      setMessages((messages) => [...messages, ...resp]);
    } catch (error) {
      console.error('Backend error:', error);

      // Fallback response when backend is down
      const fallbackResponses = [
        {
          text: "I'm sorry darling, I'm having some connection issues right now... 💔",
          facialExpression: "sad",
          animation: "Crying",
          audio: null,
          lipsync: null
        },
        {
          text: "But I'm still here with you! Try again in a moment, my love. ❤️",
          facialExpression: "smile",
          animation: "Talking_1",
          audio: null,
          lipsync: null
        }
      ];

      setMessages((messages) => [...messages, ...fallbackResponses]);
    }
    setLoading(false);
  };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

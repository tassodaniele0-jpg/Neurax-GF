import { useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useBackendStatus = () => {
  const [status, setStatus] = useState({
    isOnline: false,
    model: null,
    hasOpenRouterKey: false,
    hasElevenLabsKey: false,
    loading: true,
    error: null
  });

  const checkStatus = async () => {
    try {
      setStatus(prev => ({ ...prev, loading: true, error: null }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${backendUrl}/health`, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setStatus({
        isOnline: true,
        model: data.model,
        hasOpenRouterKey: data.hasOpenRouterKey,
        hasElevenLabsKey: data.hasElevenLabsKey,
        loading: false,
        error: null
      });
    } catch (error) {
      const errorMessage = error.name === 'AbortError' ? 'Backend sleeping/timeout' : error.message;
      setStatus({
        isOnline: false,
        model: null,
        hasOpenRouterKey: false,
        hasElevenLabsKey: false,
        loading: false,
        error: errorMessage
      });
    }
  };

  useEffect(() => {
    checkStatus();
    // Check status every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return { ...status, refresh: checkStatus };
};

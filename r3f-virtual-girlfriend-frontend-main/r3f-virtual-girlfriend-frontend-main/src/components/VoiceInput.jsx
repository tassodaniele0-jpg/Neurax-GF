import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceInput = ({ onVoiceInput, isListening, setIsListening }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState(null);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  useEffect(() => {
    // Check if speech recognition is supported
    setIsSupported(browserSupportsSpeechRecognition);

    // Check microphone availability (this is handled by the hook)
    if (browserSupportsSpeechRecognition) {
      setHasPermission(true); // We'll check permission when user tries to use it
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    // Update parent component listening state
    setIsListening(listening);
  }, [listening, setIsListening]);

  useEffect(() => {
    // When transcript changes and we have content, send it
    if (transcript && !listening) {
      console.log('Voice input received:', transcript);
      onVoiceInput(transcript);
      resetTranscript();
    }
  }, [transcript, listening, onVoiceInput, resetTranscript]);

  const startListening = () => {
    try {
      setError(null);
      // Configure speech recognition for optimal girlfriend chat experience
      SpeechRecognition.startListening({
        continuous: false, // Stop after user finishes speaking
        language: 'en-US', // Primary language
        interimResults: false // Only final results
      });
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setError('Failed to start voice recognition. Please check microphone permissions.');
      setHasPermission(false);
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Don't render if not supported
  if (!isSupported) {
    return (
      <div className="voice-input-unsupported">
        <p>🎤 Voice input not supported in this browser</p>
        <p>Try Chrome, Edge, or Safari for voice features</p>
      </div>
    );
  }

  return (
    <div className="voice-input-container">
      <button
        className={`voice-button ${listening ? 'listening' : ''} ${!isMicrophoneAvailable ? 'disabled' : ''}`}
        onClick={toggleListening}
        disabled={!isMicrophoneAvailable}
        title={listening ? 'Stop listening' : 'Start voice input'}
      >
        {listening ? (
          <div className="listening-animation">
            🎤 <span className="pulse">●</span>
          </div>
        ) : (
          '🎤 Speak'
        )}
      </button>
      
      {transcript && (
        <div className="transcript-preview">
          <p>"{transcript}"</p>
        </div>
      )}
      
      {!isMicrophoneAvailable && (
        <p className="permission-message">
          Please allow microphone access to use voice input
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}
      
      <style jsx>{`
        .voice-input-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin: 10px 0;
        }
        
        .voice-button {
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          border: none;
          border-radius: 25px;
          padding: 12px 24px;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
          min-width: 120px;
        }
        
        .voice-button:hover:not(.disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
        }
        
        .voice-button.listening {
          background: linear-gradient(135deg, #ff4757, #ff3838);
          animation: pulse-glow 1.5s infinite;
        }
        
        .voice-button.disabled {
          background: #ccc;
          cursor: not-allowed;
          opacity: 0.6;
        }
        
        .listening-animation {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .pulse {
          color: #fff;
          animation: pulse-dot 1s infinite;
        }
        
        .transcript-preview {
          background: rgba(255, 255, 255, 0.9);
          padding: 10px 15px;
          border-radius: 15px;
          border: 2px solid #ff6b9d;
          max-width: 300px;
          text-align: center;
        }
        
        .transcript-preview p {
          margin: 0;
          font-style: italic;
          color: #333;
        }
        
        .permission-message {
          font-size: 12px;
          color: #666;
          text-align: center;
          max-width: 250px;
        }

        .error-message {
          font-size: 12px;
          color: #dc3545;
          text-align: center;
          max-width: 250px;
          background: rgba(220, 53, 69, 0.1);
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid rgba(220, 53, 69, 0.3);
        }
        
        .voice-input-unsupported {
          text-align: center;
          padding: 15px;
          background: rgba(255, 193, 7, 0.1);
          border-radius: 10px;
          border: 1px solid #ffc107;
        }
        
        .voice-input-unsupported p {
          margin: 5px 0;
          color: #856404;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
          }
          50% {
            box-shadow: 0 4px 25px rgba(255, 71, 87, 0.6);
          }
        }
        
        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default VoiceInput;

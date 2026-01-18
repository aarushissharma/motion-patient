/**
 * AI Voice Assistant for Motion Patient App
 * Activates when fall is detected, allowing patient to speak
 */

class VoiceAssistant {
  constructor() {
    this.isRecording = false;
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.currentTranscript = '';
    this.fallAlertId = null;
    this.apiBaseUrl = this.getApiBaseUrl();
    
    this.initSpeechRecognition();
  }

  /**
   * Get API base URL (Vercel or local)
   */
  getApiBaseUrl() {
    // Check if we're on Vercel
    const isVercel = window.location.hostname.includes('vercel.app');
    if (isVercel) {
      return window.location.origin; // Use same domain for Vercel
    }
    
    // For local, use the same logic as the main app
    if (typeof getWatchfulApiUrl === 'function') {
      return getWatchfulApiUrl();
    }
    
    // Fallback
    return 'http://localhost:5001';
  }

  /**
   * Initialize Web Speech Recognition API
   */
  initSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    
    this.recognition.continuous = false; // Stop after user stops speaking
    this.recognition.interimResults = false; // Only final results
    this.recognition.lang = 'en-US'; // Language

    // Event handlers
    this.recognition.onstart = () => {
      console.log('🎤 Voice recording started');
      this.isRecording = true;
      this.updateUI('listening');
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.currentTranscript = transcript;
      console.log('📝 Transcript:', transcript);
      this.updateUI('processing', transcript);
      
      // Process with AI
      this.processWithAI(transcript);
    };

    this.recognition.onerror = (event) => {
      console.error('❌ Speech recognition error:', event.error);
      this.updateUI('error', event.error);
      this.isRecording = false;
    };

    this.recognition.onend = () => {
      console.log('🔇 Voice recording ended');
      this.isRecording = false;
      this.updateUI('idle');
    };
  }

  /**
   * Activate voice assistant when fall is detected
   */
  activateOnFall(fallAlertId) {
    this.fallAlertId = fallAlertId;
    
    // Show voice assistant UI
    const voiceDiv = document.getElementById('voice-assistant');
    if (voiceDiv) {
      voiceDiv.style.display = 'block';
      voiceDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Speak initial message
    this.speak(
      "I've detected a fall. Are you okay? Please tell me what happened or if you need help.",
      () => {
        // Start listening after speaking
        setTimeout(() => {
          this.startListening();
        }, 500);
      }
    );
  }

  /**
   * Start listening to patient's voice
   */
  startListening() {
    if (!this.recognition) {
      console.error('Speech recognition not available');
      this.showError('Voice recognition not supported in this browser');
      return;
    }

    if (this.isRecording) {
      console.warn('Already recording');
      return;
    }

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
      this.showError('Failed to start voice recording. Please check microphone permissions.');
    }
  }

  /**
   * Stop listening
   */
  stopListening() {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
    }
  }

  /**
   * Process transcript with AI
   */
  async processWithAI(transcript) {
    try {
      this.updateUI('ai-thinking');
      
      // Send to AI endpoint
      const response = await fetch(`${this.apiBaseUrl}/api/voice/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: transcript,
          fallAlertId: this.fallAlertId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        // Store transcript with alert
        await this.storeTranscript(transcript, result.data.aiResponse);
        
        // Speak AI response
        this.speak(result.data.aiResponse);
        
        // Update UI
        this.updateUI('complete', {
          transcript,
          response: result.data.aiResponse,
        });
      } else {
        throw new Error(result.error || 'AI processing failed');
      }
    } catch (error) {
      console.error('❌ AI processing error:', error);
      this.showError('Failed to process your message. Please try again.');
      
      // Fallback: just store the transcript
      await this.storeTranscript(transcript, null);
    }
  }

  /**
   * Store voice transcript with fall alert
   */
  async storeTranscript(transcript, aiResponse) {
    try {
      await fetch(`${this.apiBaseUrl}/api/voice/transcript`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fallAlertId: this.fallAlertId,
          transcript: transcript,
          aiResponse: aiResponse,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('❌ Failed to store transcript:', error);
    }
  }

  /**
   * Text-to-Speech: Speak message to patient
   */
  speak(text, onEnd = null) {
    if (!this.synthesis) {
      console.warn('Speech synthesis not available');
      return;
    }

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';

    utterance.onend = () => {
      console.log('✅ Finished speaking');
      if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
      console.error('❌ Speech synthesis error:', event.error);
    };

    this.synthesis.speak(utterance);
  }

  /**
   * Update UI based on voice assistant state
   */
  updateUI(state, data = null) {
    const voiceIndicator = document.getElementById('voice-indicator');
    const voiceTranscript = document.getElementById('voice-transcript');
    const voiceResponse = document.getElementById('voice-response');

    if (!voiceIndicator) return;

    // Remove all state classes
    voiceIndicator.className = 'voice-indicator';
    
    switch (state) {
      case 'listening':
        voiceIndicator.classList.add('listening');
        voiceIndicator.textContent = '🎤 Listening...';
        if (voiceTranscript) {
          voiceTranscript.style.display = 'none';
          voiceTranscript.textContent = '';
        }
        if (voiceResponse) {
          voiceResponse.style.display = 'none';
          voiceResponse.textContent = '';
        }
        break;

      case 'processing':
        voiceIndicator.classList.add('processing');
        voiceIndicator.textContent = '⏳ Processing...';
        if (voiceTranscript && data) {
          voiceTranscript.style.display = 'block';
          voiceTranscript.innerHTML = `<strong>You said:</strong><p>${data}</p>`;
        }
        break;

      case 'ai-thinking':
        voiceIndicator.classList.add('ai-thinking');
        voiceIndicator.textContent = '🤔 AI is thinking...';
        break;

      case 'complete':
        voiceIndicator.classList.add('complete');
        voiceIndicator.textContent = '✅ Complete';
        if (data && voiceTranscript) {
          voiceTranscript.style.display = 'block';
          voiceTranscript.innerHTML = `<strong>You said:</strong><p>${data.transcript}</p>`;
        }
        if (data && voiceResponse) {
          voiceResponse.style.display = 'block';
          voiceResponse.innerHTML = `<strong>Response:</strong><p>${data.response}</p>`;
        }
        break;

      case 'error':
        voiceIndicator.classList.add('error');
        voiceIndicator.textContent = '❌ Error';
        if (data) {
          console.error('Voice error:', data);
        }
        break;

      case 'idle':
      default:
        voiceIndicator.classList.add('idle');
        voiceIndicator.textContent = '🎤 Ready';
        break;
    }
  }

  /**
   * Show error message
   */
  showError(message) {
    const errorDiv = document.getElementById('voice-error');
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 5000);
    }
    console.error(message);
  }
}

// Global instance
window.VoiceAssistant = VoiceAssistant;

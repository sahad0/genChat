import {create} from 'zustand';
import {ChatState, Message} from '../types';

interface ChatStore extends ChatState {
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  sendMessage: (text: string) => void;
  simulateAIResponse: (userMessage: string) => void;
  clearMessages: () => void;
  setTyping: (isTyping: boolean) => void;
  stopGeneration: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// Store the current streaming interval
let currentStreamInterval: ReturnType<typeof setInterval> | null = null;

const getAIResponse = (
  userMessage: string,
): {text: string; memoryTags?: string[]} => {
  const message = userMessage.toLowerCase();

  if (message.includes('hi') || message.includes('hello')) {
    return {text: "Hey! Good to see you again. What's on your mind?"};
  }

  if (message.includes('startup') || message.includes('company')) {
    return {
      text: "I remember you're building AiRA. How's that going?",
      memoryTags: ['career'],
    };
  }

  if (message.includes('help') || message.includes('advice')) {
    return {
      text: "I'm here to help! I can assist you with questions, provide advice, help with problem-solving, or just have a conversation. What would you like to explore today?",
    };
  }

  return {text: "That's interesting. Tell me more about that."};
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isTyping: false,
  currentStreamingMessage: undefined,

  addMessage: messageData => {
    const message: Message = {
      ...messageData,
      id: generateId(),
      timestamp: new Date(),
    };

    set(state => ({
      messages: [...state.messages, message],
    }));
  },

  sendMessage: (text: string) => {
    const {addMessage, simulateAIResponse} = get();

    // Add user message
    addMessage({
      text,
      isUser: true,
    });

    // Simulate AI response
    setTimeout(() => {
      simulateAIResponse(text);
    }, 500);
  },

  simulateAIResponse: (userMessage: string) => {
    const {addMessage, setTyping} = get();
    const response = getAIResponse(userMessage);

    setTyping(true);

    // Create streaming message
    const streamingMessage: Message = {
      id: generateId(),
      text: '',
      isUser: false,
      timestamp: new Date(),
      isStreaming: true,
      memoryTags: response.memoryTags,
    };

    set({currentStreamingMessage: streamingMessage});

    // Simulate character-by-character streaming
    let currentText = '';
    let charIndex = 0;

    currentStreamInterval = setInterval(() => {
      if (charIndex < response.text.length) {
        currentText += response.text[charIndex];
        charIndex++;

        set(state => ({
          currentStreamingMessage: {
            ...state.currentStreamingMessage!,
            text: currentText,
          },
        }));
      } else {
        if (currentStreamInterval) {
          clearInterval(currentStreamInterval);
          currentStreamInterval = null;
        }
        setTyping(false);

        // Add final message
        addMessage({
          text: response.text,
          isUser: false,
          memoryTags: response.memoryTags,
        });

        set({currentStreamingMessage: undefined});
      }
    }, 150);
  },

  clearMessages: () => {
    set({messages: [], currentStreamingMessage: undefined});
  },

  setTyping: (isTyping: boolean) => {
    set({isTyping});
  },

  stopGeneration: () => {
    if (currentStreamInterval) {
      clearInterval(currentStreamInterval);
      currentStreamInterval = null;
    }

    const {addMessage, setTyping} = get();
    const currentMessage = get().currentStreamingMessage;

    if (currentMessage) {
      // Add the partial message as final
      addMessage({
        text: currentMessage.text,
        isUser: false,
        memoryTags: currentMessage.memoryTags,
      });

      set({currentStreamingMessage: undefined});
    }

    setTyping(false);
  },
}));

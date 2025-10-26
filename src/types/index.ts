export interface User {
  id: string;
  email: string;
  name?: string;
  isAuthenticated: boolean;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  memoryTags?: string[];
  isStreaming?: boolean;
}

export interface Memory {
  id: string;
  category: 'About You' | 'Preferences' | 'Conversations';
  text: string;
  date: Date;
  icon: string;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  currentStreamingMessage?: Message;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface MemoryState {
  memories: Memory[];
  categories: string[];
}

export interface RootState {
  auth: AuthState;
  chat: ChatState;
  memory: MemoryState;
}

export type NavigationParamList = {
  Login: undefined;
  Chat: undefined;
  Memory: undefined;
  Main: undefined;
  MessageInput: {prefilledText?: string} | undefined;
};

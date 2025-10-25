// import {Memory} from '../types';

export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Today';
  if (diffDays === 2) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays - 1} days ago`;
  return date.toLocaleDateString();
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getCategoryColor = (category: string): [string, string] => {
  switch (category) {
    case 'About You':
      return ['#3b82f6', '#1d4ed8'];
    case 'Preferences':
      return ['#10b981', '#059669'];
    case 'Conversations':
      return ['#f59e0b', '#d97706'];
    default:
      return ['#6b7280', '#4b5563'];
  }
};

export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'About You':
      return 'person';
    case 'Preferences':
      return 'favorite';
    case 'Conversations':
      return 'chat';
    default:
      return 'memory';
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const getAIResponse = (
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
      text: "I'm here to help. What specifically are you thinking about?",
    };
  }

  return {text: "That's interesting. Tell me more about that."};
};

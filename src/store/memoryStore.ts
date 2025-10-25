import {create} from 'zustand';
import {MemoryState, Memory} from '../types';

interface MemoryStore extends MemoryState {
  addMemory: (memory: Omit<Memory, 'id' | 'date'>) => void;
  removeMemory: (id: string) => void;
  getMemoriesByCategory: (category: string) => Memory[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const mockMemories: Memory[] = [
  {
    id: '1',
    category: 'About You',
    text: 'Building AiRA - an AI that feels alive',
    date: new Date('2024-01-15'),
    icon: 'bag',
  },
  {
    id: '2',
    category: 'About You',
    text: 'Passionate about conversational AI',
    date: new Date('2024-01-10'),
    icon: 'robot',
  },
  {
    id: '3',
    category: 'Preferences',
    text: 'Prefers detailed technical discussions',
    date: new Date('2024-01-12'),
    icon: 'gear',
  },
  {
    id: '4',
    category: 'Preferences',
    text: 'Likes morning productivity sessions',
    date: new Date('2024-01-08'),
    icon: 'sunrise',
  },
  {
    id: '5',
    category: 'Conversations',
    text: 'Discussed mobile app architecture',
    date: new Date('2024-01-14'),
    icon: 'phone',
  },
  {
    id: '6',
    category: 'Conversations',
    text: 'Talked about React Native best practices',
    date: new Date('2024-01-13'),
    icon: 'atom',
  },
];

export const useMemoryStore = create<MemoryStore>((set, get) => ({
  memories: mockMemories,
  categories: ['About You', 'Preferences', 'Conversations'],

  addMemory: memoryData => {
    const memory: Memory = {
      ...memoryData,
      id: generateId(),
      date: new Date(),
    };

    set(state => ({
      memories: [...state.memories, memory],
    }));
  },

  removeMemory: (id: string) => {
    set(state => ({
      memories: state.memories.filter(memory => memory.id !== id),
    }));
  },

  getMemoriesByCategory: (category: string) => {
    const {memories} = get();
    return memories.filter(memory => memory.category === category);
  },
}));

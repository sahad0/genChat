import {create} from 'zustand';
import {AuthState, User} from '../types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    console.log('AuthStore - Login called with:', email, password);
    set({isLoading: true, error: null});

    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      // Mock authentication - hardcoded success for test@aira.ai / password
      if (email === 'test@aira.ai' && password === 'password') {
        const user: User = {
          id: '1',
          email,
          name: 'Test User',
          isAuthenticated: true,
        };

        console.log('AuthStore - Setting user:', user);
        set({user, isLoading: false, error: null});
        console.log('AuthStore - User set successfully');
        return true;
      } else {
        console.log('AuthStore - Invalid credentials');
        set({
          error: 'Invalid credentials. Use test@aira.ai / password',
          isLoading: false,
        });
        return false;
      }
    } catch (error) {
      console.log('AuthStore - Login error:', error);
      set({
        error: 'Login failed. Please try again.',
        isLoading: false,
      });
      return false;
    }
  },

  logout: () => {
    set({user: null, error: null});
  },

  clearError: () => {
    set({error: null});
  },
}));

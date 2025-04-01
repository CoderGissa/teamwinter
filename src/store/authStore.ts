import { create } from 'zustand';

interface AuthState {
  accessCode: string | null;
  isValidAccessCode: (code: string) => boolean;
  setAccessCode: (code: string | null) => void;
}

const VALID_ACCESS_CODE = 'WINTER2025';

export const useAuthStore = create<AuthState>((set) => ({
  accessCode: null,
  isValidAccessCode: (code: string) => code === VALID_ACCESS_CODE,
  setAccessCode: (code) => set({ accessCode: code }),
}));
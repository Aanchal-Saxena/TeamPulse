const STORAGE_KEYS = {
  MEMBERS: 'teampulse_members',
  THEME: 'teampulse_theme',
  ROLE: 'teampulse_role'
} as const;

export const localStorage = {
  // Generic storage functions
  setItem: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  getItem: <T>(key: string): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  // App-specific functions
  saveMembers: (members: any[]) => {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, members);
  },

  getMembers: () => {
    return localStorage.getItem<any[]>(STORAGE_KEYS.MEMBERS);
  },

  saveTheme: (isDarkMode: boolean) => {
    localStorage.setItem(STORAGE_KEYS.THEME, isDarkMode);
  },

  getTheme: () => {
    return localStorage.getItem<boolean>(STORAGE_KEYS.THEME);
  },

  saveRole: (role: string) => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  },

  getRole: () => {
    return localStorage.getItem<string>(STORAGE_KEYS.ROLE);
  }
};
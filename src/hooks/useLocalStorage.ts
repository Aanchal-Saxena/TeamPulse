import { useEffect, useState } from 'react';
import { localStorage } from '../utils/localStorage';

// Custom hook for localStorage with automatic sync
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem<T>(key);
    return saved !== null ? saved : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};
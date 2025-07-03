import { createSlice } from '@reduxjs/toolkit';
import { localStorage } from '../../utils/localStorage';

interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: localStorage.getTheme() ?? false
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.saveTheme(state.isDarkMode);
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
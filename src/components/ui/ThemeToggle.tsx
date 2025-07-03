import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleTheme } from '../../redux/slices/themeSlice';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  return (
    <button 
      className="theme-toggle"
      onClick={() => dispatch(toggleTheme())}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
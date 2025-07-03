import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './redux/store';
import Dashboard from './pages/Dashboard';
import { ThemeToggle } from './components';
import './App.css';

// Main app content with theme management
const AppContent: React.FC = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <>
      <ThemeToggle />
      <Dashboard />
    </>
  );
};

function App() {
  // Expose store for development/testing (remove in production)
  if (process.env.NODE_ENV === 'development') {
    (window as any).store = store;
  }
  
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
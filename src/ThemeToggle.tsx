import React from 'react';

export const ThemeToggle = () => {
  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 p-2 bg-gray-300 dark:bg-gray-700 rounded"
    >
      Toggle Theme
    </button>
  );
};

import { useState, useEffect } from 'react';

export function ModeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Set theme based on localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200">
      {theme === 'light' ? (
        <span className="text-gray-800">🌙</span> 
      ) : (
        <span className="text-yellow-400">🌞</span> 
      )}
    </button>
  );
}

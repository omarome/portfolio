import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (_) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim() || (theme === 'dark' ? '#000000' : '#ffffff');
      meta.setAttribute('content', bg);
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <Button
      size="small"
      variant="contained"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      startIcon={theme === 'dark' ? <WbSunnyOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
      sx={{
        ml: 2,
        textTransform: 'capitalize',
        backgroundColor: theme === 'dark' ? 'var(--secondary-color)' : '#000000',
        color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-white)',
        '&:hover': {
          backgroundColor: theme === 'dark' ? 'var(--background-tertiary)' : '#111111'
        }
      }}
    >
      {theme === 'dark' ? 'light' : 'dark'}
    </Button>
  );
};

export default ThemeToggle;



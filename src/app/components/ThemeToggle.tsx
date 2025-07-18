'use client';

import { MoonIcon as MoonIconSolid } from '@heroicons/react/16/solid';
import { MoonIcon } from '@heroicons/react/24/outline';
import useDarkMode from '../hooks/useDarkMode';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { isDark, toggleTheme } = useDarkMode();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className='flex justify-center gap-2 px-4 py-2 active:opacity-40 hover:opacity-70 cursor-pointer'
    >
      {isDark ? (
        <MoonIconSolid data-testid='dark moon icon' height={18} width={16} />
      ) : (
        <MoonIcon data-testid='light moon icon' height={18} width={16} />
      )}
      <p className='font-semibold'>Dark Mode</p>
    </button>
  );
}

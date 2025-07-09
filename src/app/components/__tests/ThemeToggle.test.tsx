import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../../components/ThemeToggle';
import * as hook from '../../hooks/useDarkMode';
import { describe, expect, it, vi } from 'vitest';

describe('ThemeToggle', () => {
  it('use theme toggle and update theme', () => {
    const toggle = vi.fn();
    vi.spyOn(hook, 'default').mockReturnValue({
      isDark: false,
      toggleTheme: toggle
    });
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveTextContent('Dark Mode');
    fireEvent.click(screen.getByRole('button'));
    expect(toggle).toHaveBeenCalled();
  });

  it('Validate icon when is dark mode', () => {
    const toggle = vi.fn();
    vi.spyOn(hook, 'default').mockReturnValue({
      isDark: true,
      toggleTheme: toggle
    });
    render(<ThemeToggle />);
    const icon = screen.getByTestId('dark moon icon');
    expect(icon).toBeInTheDocument();
  });

  it('Validate icon when is light mode', () => {
    const toggle = vi.fn();
    vi.spyOn(hook, 'default').mockReturnValue({
      isDark: false,
      toggleTheme: toggle
    });
    render(<ThemeToggle />);
    const icon = screen.getByTestId('light moon icon');
    expect(icon).toBeInTheDocument();
  });
});

import { fireEvent, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useDarkMode from '../useDarkMode';

function TestComponent() {
  const { isDark, toggleTheme } = useDarkMode();
  return (
    <>
      <div data-testid='mode'>{isDark ? 'dark' : 'light'}</div>
      <button data-testid='btn' onClick={toggleTheme}>
        toggle
      </button>
    </>
  );
}

describe('useDarkMode', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('use the default system preference', async () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));

    const { findByTestId } = render(<TestComponent />);
    const mode = await findByTestId('mode');
    expect(mode.textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBeNull();
  });

  it('use the localStorage dark mode value', async () => {
    localStorage.setItem('theme', 'light');
    vi.stubGlobal('matchMedia', () => ({
      matches: true,
      addListener: vi.fn(),
      removeListener: vi.fn()
    }));

    const { findByTestId } = render(<TestComponent />);
    const mode = await findByTestId('mode');
    expect(mode.textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggleTheme change the theme and save the value in localStorage', async () => {
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn()
    }));

    const { findByTestId } = render(<TestComponent />);
    const mode = await findByTestId('mode');
    expect(mode.textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    const btn = await findByTestId('btn');
    fireEvent.click(btn);

    expect(mode.textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(btn);
    expect(mode.textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});

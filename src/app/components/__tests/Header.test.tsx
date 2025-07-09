import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import Header from '../Header';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}));

vi.mock('../ThemeToggle', () => ({
  __esModule: true,
  default: () => <button data-testid='theme-toggle'>Toggle Theme</button>
}));

describe('Header component', () => {
  it('should render the banner to validate the aria-label', () => {
    render(<Header />);
    const banner = screen.getByRole('banner', { name: /main header/i });
    expect(banner).toBeInTheDocument();
  });

  it('should render the title', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: /go to the home page/i });
    fireEvent.click(homeLink);
    expect(homeLink).toHaveAttribute('href', '/');

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /where in the world\?/i
    });
    expect(heading).toBeInTheDocument();
  });

  it('includes the ThemeToggle component', () => {
    render(<Header />);
    const toggle = screen.getByTestId('theme-toggle');
    expect(toggle).toBeInTheDocument();
  });
});

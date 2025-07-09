// src/app/layout.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RootLayout, { metadata } from '../layout';

vi.mock('../components/Header', () => ({
  __esModule: true,
  default: () => <nav data-testid='navbar-mock' />
}));

vi.mock('next/font/google', () => {
  return {
    Nunito_Sans: vi.fn(() => ({
      className: 'nunito-sans-font',
      variable: '--font-nunito-sans'
    }))
  };
});

describe('Metadata', () => {
  it('Render initial metadata', () => {
    expect(metadata.title).toBe('Countries app');
    expect(metadata.description).toBe('A complete app to search for countries');
  });
});

describe('RootLayout', () => {
  it('Render the navbar and basic children', () => {
    render(
      <RootLayout>
        <span data-testid='children'>Countries</span>
      </RootLayout>
    );

    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toHaveTextContent('Countries');
  });
});

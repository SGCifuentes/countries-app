import { mockCountry } from '@/app/mocks/country';
import { Country } from '@/app/types/Country';
import { fireEvent, render, screen } from '@testing-library/react';
import * as nextNav from 'next/navigation';
import { AnchorHTMLAttributes } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CountryCardClient from '../CountryCard/client';

describe('CountryCard', () => {
  const push = vi.fn();
  vi.mock('next/link', () => {
    return {
      __esModule: true,
      default: ({
        href,
        children,
        ...props
      }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
          {...props}
          href={href}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {children}
        </a>
      )
    };
  });

  beforeEach(() => {
    push.mockClear();
    vi.spyOn(nextNav, 'useRouter').mockReturnValue({
      push,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn()
    });

    vi.spyOn(nextNav, 'useSearchParams').mockReturnValue({
      get: vi.fn(),
      getAll: vi.fn(),
      has: vi.fn(),
      entries: vi.fn(),
      keys: vi.fn(),
      values: vi.fn(),
      toString: vi.fn(),
      forEach: vi.fn(),
      append: vi.fn(),
      delete: vi.fn(),
      set: vi.fn(),
      sort: vi.fn()
    } as unknown as nextNav.ReadonlyURLSearchParams);

    vi.spyOn(nextNav, 'usePathname').mockReturnValue('');
  });

  vi.mock('next/navigation', () => {
    const actual = vi.importActual('next/navigation');
    return {
      ...actual,
      useRouter: vi.fn(() => ({
        push: vi.fn()
      })),
      useSearchParams: vi.fn(() => ({
        get: vi.fn()
      })),
      usePathname: vi.fn()
    };
  });

  it('Should render country data', () => {
    render(<CountryCardClient country={mockCountry as Country} id={0} />);
    const img = screen.getByAltText(
      'The flag of Colombia is a horizontal tricolor of yellow, blue and red.'
    );
    expect(img).toBeInTheDocument();
    expect(screen.getByText('Colombia')).toBeInTheDocument();
    expect(screen.getByText('Population:')).toBeInTheDocument();
    expect(screen.getByText('50,882,884')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Bogotá')).toBeInTheDocument();
  });

  it('Should change the url with the country name', () => {
    render(<CountryCardClient country={mockCountry as Country} id={0} />);
    const link = screen.getByTestId(`${mockCountry.name.common}-card`);
    fireEvent.click(link);
    expect(link).toHaveAttribute('href', `/${mockCountry.name.common}`);
  });

  it('Show image with different alt value', async () => {
    render(
      <CountryCardClient
        country={{ ...mockCountry, flags: { ...mockCountry.flags, alt: '' } }}
        id={6}
      />
    );
    const img = screen.getByAltText('Flag of Colombia');
    expect(img).toBeInTheDocument();
  });
});

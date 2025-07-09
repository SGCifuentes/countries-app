import { fireEvent, render, screen } from '@testing-library/react';
import * as nextNav from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockCountry } from '../mocks/country';
import Home from '../page';
import { Country } from '../types/Country';

vi.mock('../components/CountryCard/server', () => ({
  __esModule: true,
  default: ({ country }: { country: Country; id: number }) => (
    <div data-testid={`country-${country.name.common}`}>
      <p>{country.name.common}</p>
      <p>{country.region}</p>
    </div>
  )
}));

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

describe('Home Page', () => {
  const push = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
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

  it('Should render empty country list', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        json: () => Promise.resolve([])
      })
    );

    const element = await Home({
      searchParams: Promise.resolve({ name: '', region: '' })
    });
    render(<>{element}</>);
    expect(screen.getByText('No countries found.')).toBeInTheDocument();
  });

  it('Should render filter and can click an option', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        json: () => Promise.resolve([])
      })
    );

    const element = await Home({
      searchParams: Promise.resolve({ name: '', region: '' })
    });
    render(<>{element}</>);
    const filterButton = screen.getByRole('button', {
      name: /Filter by Region/i
    });
    expect(filterButton).toBeInTheDocument();
    fireEvent.click(filterButton);
    expect(screen.getByText('Africa')).toBeInTheDocument();
    const filterOption = screen.getByRole('button', {
      name: /Africa/i
    });
    fireEvent.click(filterOption);
    expect(screen.queryByText('Africa')).not.toBeInTheDocument();
  });

  it('Should render searchbar', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        json: () => Promise.resolve([])
      })
    );

    const element = await Home({
      searchParams: Promise.resolve({ name: '', region: '' })
    });
    render(<>{element}</>);
    expect(
      screen.getByPlaceholderText('Search for a country...')
    ).toBeInTheDocument();
  });

  it('Should render country list', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        json: () =>
          Promise.resolve([
            mockCountry,
            { name: { common: 'Spain' }, borders: [] },
            { name: { common: 'Chile' }, borders: [] }
          ])
      })
    );

    const element = await Home({
      searchParams: Promise.resolve({ name: '', region: '' })
    });
    render(<>{element}</>);

    expect(screen.getByTestId('country-Spain')).toBeInTheDocument();
  });

  it('Should render country list with input filter', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        json: () =>
          Promise.resolve([
            mockCountry,
            { name: { common: 'Armenia' }, region: 'Asia' },
            { name: { common: 'Chile' }, region: 'Americas' }
          ])
      })
    );

    const element = await Home({
      searchParams: Promise.resolve({ name: 'Armenia', region: '' })
    });
    render(<>{element}</>);

    expect(
      screen.getByPlaceholderText('Search for a country...')
    ).toBeInTheDocument();

    expect(screen.getByTestId('country-Armenia')).toBeInTheDocument();
  });

  it('Should render country list with filter select', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        json: () =>
          Promise.resolve([
            mockCountry,
            { name: { common: 'Armenia' }, region: 'Asia' },
            { name: { common: 'Chile' }, region: 'Americas' },
            { name: { common: 'Japan' }, region: 'Asia' }
          ])
      })
    );

    const element = await Home({
      searchParams: Promise.resolve({ name: '', region: 'Asia' })
    });
    render(<>{element}</>);

    expect(screen.queryByText('country-Chile')).not.toBeInTheDocument();
    expect(screen.queryByText('country-Colombia')).not.toBeInTheDocument();
    expect(screen.getByTestId('country-Japan')).toBeInTheDocument();
  });
});

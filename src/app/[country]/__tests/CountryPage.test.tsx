import { Country } from '@/app/types/Country';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Page, { generateMetadata } from '../page';
import { BASE_URL } from '@/const/const';

vi.mock('../../components/CountryDetail/server', () => ({
  __esModule: true,
  default: ({ country }: { country: Country }) => (
    <div data-testid='country-detail'>
      {country.name.common} – {JSON.stringify(country.borders)}
    </div>
  )
}));

describe('generateMetadata', () => {
  it('return meta title and meta description for the selected country', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ country: 'Brazil' })
    });
    expect(meta.title).toBe('Brazil Details');
    expect(meta.description).toBe('Details about the country: Brazil');
  });
});

describe('Country Detail Page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render Country without borders', async () => {
    const fakeCountry = {
      name: { common: 'Spain' },
      borders: []
    };
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        json: () => Promise.resolve([fakeCountry])
      })
    );

    const element = await Page({
      params: Promise.resolve({ country: 'Spain' })
    });
    render(<>{element}</>);
    expect(screen.getByRole('link', { name: /back/i })).toBeInTheDocument();

    expect(screen.getByTestId('country-detail').textContent).toContain(
      'Spain – []'
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/name/Spain`, {
      cache: 'force-cache'
    });
  });

  it('should render with borders', async () => {
    const baseCountry = {
      name: { common: 'Chile' },
      borders: ['ARG', 'PER']
    };
    const borderData = [
      { name: { common: 'Argentina' } },
      { name: { common: 'Peru' } }
    ];

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({ json: () => Promise.resolve([baseCountry]) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(borderData) })
    );

    const element = await Page({
      params: Promise.resolve({ country: 'Chile' })
    });
    render(<>{element}</>);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, `${BASE_URL}/name/Chile`, {
      cache: 'force-cache'
    });
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      `${BASE_URL}/alpha?codes=ARG,PER`,
      { cache: 'force-cache' }
    );

    const detail = screen.getByTestId('country-detail').textContent!;
    expect(detail).toContain('Chile');
    expect(detail).toMatch(/Argentina.*Peru/);
  });
});

import { mockCountry } from '@/app/mocks/country';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CountryDetailClient from '../CountryDetail/client';
import { getFirstElement } from '@/app/utils/getFirstElement';

describe('CountryDetail', () => {
  it('Show all the country data', async () => {
    render(<CountryDetailClient country={mockCountry} />);

    const img = screen.getByAltText(
      'The flag of Colombia is a horizontal tricolor of yellow, blue and red.'
    );
    expect(img).toBeInTheDocument();
    expect(screen.getByText(mockCountry.name.common)).toBeInTheDocument();
    expect(screen.getByText('Native name:')).toBeInTheDocument();
    expect(
      screen.getByText(
        getFirstElement(mockCountry.name.nativeName)?.official || 'N/A'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockCountry?.population.toLocaleString('en-US'))
    ).toBeInTheDocument();
    expect(screen.getByText(mockCountry?.tld?.[0])).toBeInTheDocument();
  });

  it('Show image with different alt value', async () => {
    render(
      <CountryDetailClient
        country={{ ...mockCountry, flags: { ...mockCountry.flags, alt: '' } }}
      />
    );
    const img = screen.getByAltText('Flag of Colombia');
    expect(img).toBeInTheDocument();
  });
});

import { mockCountry } from '@/app/mocks/country';
import { describe, expect, it } from 'vitest';
import { getFirstElement } from '../getFirstElement';

describe('getFirstElement', () => {
  it('returns the first currency of the country', () => {
    const result = getFirstElement(mockCountry.currencies);
    expect(result).toBe(mockCountry.currencies['COP']);
  });

  it('returns the first translation of the country', () => {
    const result = getFirstElement(mockCountry.translations);
    expect(result).toBe(mockCountry.translations['spa']);
    expect(result).not.toBe(mockCountry.translations['eng']);
  });

  it('returns the first demonym of the country', () => {
    const male = getFirstElement(mockCountry.demonyms)?.m;
    const female = getFirstElement(mockCountry.demonyms)?.m;
    expect(male).toBe('Colombian');
    expect(female).toBe('Colombian');
  });

  it('returns null when don`t sent value', () => {
    const result = getFirstElement();
    expect(result).toBeNull();
  });

  it('returns null when a value is empty', () => {
    const result = getFirstElement(mockCountry.languages);
    expect(result).toBeNull();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SearchInput from '../SearchInput';
import * as nextNav from 'next/navigation';

describe('SearchInput', () => {
  const push = vi.fn();

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

  it('Show initial value amd update the url when write', () => {
    render(<SearchInput defaultValue='col' />);

    const input = screen.getByPlaceholderText(/search for a country/i);
    expect(input).toHaveValue('col');

    fireEvent.change(input, { target: { value: 'arg' } });
    expect(push).toHaveBeenCalledWith('/?name=arg');
  });

  it('Show empty initial value amd don`t add query in the url', () => {
    render(<SearchInput defaultValue='' />);

    const input = screen.getByPlaceholderText(/search for a country/i);
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: '' } });
    expect(push).toHaveBeenCalledWith('/');
  });
});

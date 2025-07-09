import { fireEvent, render, screen } from '@testing-library/react';
import * as nextNav from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FilterSelect from '../FilterSelect';

describe('FilterSelect', () => {
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

  it('open the filter select and select an option', () => {
    render(<FilterSelect defaultValue='' />);

    fireEvent.click(screen.getByRole('button', { name: /filter by region/i }));
    fireEvent.click(screen.getByText('Africa'));
    expect(push).toHaveBeenCalledWith('/?region=Africa');
  });

  it('select another option', () => {
    render(<FilterSelect defaultValue='' />);

    fireEvent.click(screen.getByRole('button', { name: /filter by region/i }));
    fireEvent.click(screen.getByText('Africa'));
    expect(push).toHaveBeenCalledWith('/?region=Africa');

    fireEvent.click(screen.getByRole('button', { name: /filter by region/i }));
    fireEvent.click(screen.getByText('Americas'));
    expect(push).toHaveBeenCalledWith('/?region=Americas');
  });
});

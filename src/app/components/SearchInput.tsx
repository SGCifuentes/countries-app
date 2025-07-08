'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SearchInputProps {
  defaultValue: string;
}

const SearchInput = ({ defaultValue }: SearchInputProps) => {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set('name', value);
    } else {
      params.delete('name');
    }

    router.push(`/?${params.toString()}`);
  }, [router, searchParams, value]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue, searchParams]);

  return (
    <div className='flex md:max-w-[40%] shadow-md border-1 border-gray-200 gap-4 rounded-lg w-full px-8 py-4 bg-[var(--dark-blue)] dark:border-none'>
      <MagnifyingGlassIcon height={20} width={20} />
      <input
        type='text'
        placeholder='Search for a country...'
        className='w-full outline-0 placeholder:text-[var(--foreground)] placeholder:font-light'
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default SearchInput;

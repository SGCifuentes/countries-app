'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

interface FilterSelectProps {
  defaultValue?: string;
}

const FilterSelect = ({ defaultValue }: FilterSelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState<string | null>(defaultValue || null);
  const [open, setOpen] = useState(false);

  const handleSelect = (region: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (region) {
      params.set('region', region);
    } else {
      params.delete('region');
    }

    router.push(`/?${params.toString()}`);
    setOpen(false);
  };

  useEffect(() => {
    setSelected(defaultValue || null);
  }, [defaultValue]);

  return (
    <div className='relative border-1 border-gray-200 inline-block text-left w-54 dark:border-none'>
      <button
        onClick={() => setOpen(!open)}
        className='w-full outline-0 flex justify-between shadow-md items-center bg-[var(--dark-blue)] p-4 rounded-lg'
      >
        {selected || 'Filter by Region'}
        <ChevronDownIcon height={16} width={16} />
      </button>

      {open && (
        <div className='absolute border-1 border-gray-200 mt-2 w-full flex justify-between shadow-md items-center bg-[var(--dark-blue)] py-4 px-6 rounded-lg dark:border-none'>
          <ul className='w-full'>
            {regions.map((region) => (
              <li key={region}>
                <button onClick={() => handleSelect(region)} className='py-1'>
                  {region}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterSelect;

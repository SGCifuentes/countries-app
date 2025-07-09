'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CountryCardProps } from './props';

export default function CountryCardClient({ country, id }: CountryCardProps) {
  return (
    <Link
      aria-label={`See ${country.name.common} details`}
      className='w-full h-full'
      href={`/${country.name.common}`}
      data-testid={`${country.name.common}-card`}
    >
      <div className='w-full h-full bg-white border-1 border-gray-200 shadow-md rounded-lg mb-4 dark:bg-[var(--dark-blue)] dark:border-none'>
        <Image
          width={1000}
          height={1000}
          className='rounded-t-lg w-full aspect-video'
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          loading={id < 5 ? 'eager' : 'lazy'}
          priority={id < 5}
        />
        <div className='px-6 py-6 flex flex-col gap-2 text-xl lg:text-sm'>
          <h2 className='text-3xl font-extrabold mb-2 lg:text-base'>
            {country.name.common}
          </h2>
          <p className='font-light'>
            <b className='font-semibold'>Population:</b>{' '}
            {country.population.toLocaleString('en-US')}
          </p>
          <p className='font-light'>
            <b className='font-semibold'>Region:</b> {country.region}
          </p>
          <p className='font-light'>
            <b className='font-semibold'>Capital:</b> {country.capital?.[0]}
          </p>
        </div>
      </div>
    </Link>
  );
}

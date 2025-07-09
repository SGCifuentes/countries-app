'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getFirstElement } from '../../utils/getFirstElement';
import { CountryDetailsProps } from './props';

export default function CountryDetailClient({ country }: CountryDetailsProps) {
  return (
    <div className='text-base flex flex-col gap-8 md:flex-row md:items-center md:gap-12'>
      <Image
        src={country?.flags?.png}
        alt={country.flags?.alt || `Flag of ${country.name.common}`}
        width={600}
        height={400}
        className='w-full h-68 sm:h-84 shadow-md mt-8 mb-2'
      />
      <div className='w-full flex flex-col gap-4'>
        <h2 className='text-2xl font-extrabold'>{country?.name.common}</h2>
        <div className='flex flex-col md:flex-row md:justify-between gap-6'>
          <div className='flex flex-col gap-2'>
            <p>
              <b>Native name: </b>
              {getFirstElement(country.name.nativeName)?.official}
            </p>
            <p>
              <b>Population: </b>
              {country?.population.toLocaleString('en-US')}
            </p>
            <p>
              <b>Region: </b>
              {country?.region}
            </p>
            <p>
              <b>Sub Region: </b>
              {country?.subregion}
            </p>
            <p>
              <b>Capital: </b>
              {country?.capital?.[0]}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <p>
              <b>Top Level Domain: </b>
              {country?.tld?.[0]}
            </p>
            <p>
              <b>Currency: </b>
              {getFirstElement(country?.currencies)?.name}
            </p>
            <p>
              <b>Languages: </b>
              {Object.values(country?.languages)
                .map((lang) => lang)
                .join(', ')}
            </p>
          </div>
        </div>
        {country?.borders && (
          <div className='mt-6 flex flex-col gap-2'>
            <h3>Border countries:</h3>
            <ul className='w-full flex flex-wrap gap-2'>
              {country.borders.map((border) => (
                <li
                  key={border}
                  className='border-1 border-gray-200 py-2 text-xs min-w-[6rem] text-center bg-[var(--dark-blue)] rounded-md flex items-center justify-center shadow-md dark:border-none'
                >
                  <Link
                    href={`/${border}`}
                    aria-label={`Go to ${border} details`}
                  >
                    {border}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

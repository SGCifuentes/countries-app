import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { Metadata } from 'next';
import Link from 'next/link';
import CountryDetailServer from '../components/CountryDetail/server';
import { Country } from '../types/Country';

type Props = {
  params: Promise<{ country: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;

  return {
    title: `${country} Details`,
    description: `Details about the country: ${country}`
  };
}

export default async function Page({
  params
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const res = await fetch('https://restcountries.com/v3.1/name/' + country, {
    cache: 'force-cache'
  });

  const countries: Country[] = await res.json();
  let countryData: Country = countries[0];

  if (countryData?.borders && countryData?.borders.length > 0) {
    const bordersCode = countryData?.borders?.join(',');
    const codes = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${bordersCode}`,
      { cache: 'force-cache' }
    );
    const borders: Country[] = await codes.json();

    countryData = {
      ...countryData,
      borders: borders
        .map((c: Country) => c.name.common)
        .sort((a: string, b: string) => a.localeCompare(b))
    };
  }

  return (
    <main className='px-8 py-12 lg:px-20 lg:py-12 flex flex-col gap-8 lg:gap-14'>
      <Link
        className='border-1 border-gray-200 w-fit px-6 py-2 flex items-center gap-2 bg-[var(--dark-blue)] rounded-sm shadow-md hover:bg-[var(--dark-blue-hover)] transition-colors dark:border-none'
        href={`/`}
        aria-label={`Go back to the home page`}
      >
        <ArrowLeftIcon height={16} width={16} /> <p>Back</p>
      </Link>
      {countryData && <CountryDetailServer country={countryData} />}
    </main>
  );
}

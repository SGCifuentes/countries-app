import Image from 'next/image';
import Link from 'next/link';
import { Country } from '../types/Country';

const CountryCard = ({ country, id }: { country: Country; id: number }) => {
  return (
    <Link
      aria-label={`See ${country.name.common} details`}
      className='w-full h-full'
      href={`/${country.name.common}`}
    >
      <div className='w-full h-full bg-white border-1 border-gray-200 shadow-md rounded-lg mb-4 dark:bg-[var(--dark-blue)] dark:border-none'>
        <Image
          width={1000}
          height={1000}
          className='rounded-t-lg w-full aspect-video'
          src={country.flags.png}
          alt='The flag of Germany is composed of three equal horizontal bands of black, red and gold.'
          loading={id < 5 ? 'eager' : 'lazy'}
          priority={id < 5}
        />
        <div className='px-6 py-6 flex flex-col gap-2 text-xl lg:text-sm'>
          <h2 className='text-3xl font-extrabold mb-2 lg:text-base'>
            {country.name.common}
          </h2>
          <p className='font-light'>
            <b className='font-semibold'>Population:</b>{' '}
            {country.population.toLocaleString()}
          </p>
          <p className='font-light'>
            <b className='font-semibold'>Region:</b> {country.region}
          </p>
          <p className='font-light'>
            <b className='font-semibold'>Capital:</b>{' '}
            {country.capital?.[0] || 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;

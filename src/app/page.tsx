import CountryCard from './components/CountryCard/server';
import FilterSelect from './components/FilterSelect';
import SearchInput from './components/SearchInput';
import { Country } from './types/Country';

interface Props {
  searchParams?: Promise<{
    name?: string;
    region?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags',
    { cache: 'force-cache' }
  );
  const countries: Country[] = await res.json();

  const filtered = countries
    .sort((a, b) => a.name.common.localeCompare(b.name.common))
    .filter((country) => {
      const matchesName = params?.name
        ? country.name.common.toLowerCase().includes(params?.name.toLowerCase())
        : true;
      const matchesRegion = params?.region
        ? country.region.toLowerCase() === params?.region.toLowerCase()
        : true;
      return matchesName && matchesRegion;
    });

  return (
    <main className='p-6 md:px-8 lg:px-20 lg:py-12 flex flex-col gap-8 lg:gap-14'>
      <div className='flex flex-col sm:flex-row justify-between gap-8'>
        <SearchInput defaultValue={params?.name || ''} />
        <FilterSelect defaultValue={params?.region || ''} />
      </div>

      <div className='w-full md:w-full mx-auto grid grid-cols-1 sm:w-3/4 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-18 gap-4'>
        {filtered?.map((country, id) => (
          <CountryCard country={country} key={id} id={id} />
        ))}
        {filtered.length === 0 && (
          <div className='col-span-full text-center text-gray-500'>
            No countries found.
          </div>
        )}
      </div>
    </main>
  );
}

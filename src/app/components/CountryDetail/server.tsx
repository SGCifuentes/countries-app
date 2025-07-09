import { Country } from '../../types/Country';
import CountryDetailClient from './client';

export default async function CountryDetailServer({
  country
}: {
  country: Country;
}) {
  return <CountryDetailClient country={country} />;
}

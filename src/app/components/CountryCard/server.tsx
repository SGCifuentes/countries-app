import CountryCardClient from './client';
import { CountryCardProps } from './props';

export default async function CountryCardServer({
  country,
  id
}: CountryCardProps) {
  return <CountryCardClient country={country} id={id} />;
}

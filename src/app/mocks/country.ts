import { Country } from '../types/Country';

export const mockCountry: Country = {
  name: {
    common: 'Colombia',
    official: 'Republic of Colombia',
    nativeName: {
      spa: {
        official: 'República de Colombia',
        common: 'Colombia'
      }
    }
  },
  tld: ['.co'],
  cca2: 'CO',
  ccn3: '170',
  cioc: 'COL',
  independent: true,
  status: 'officially-assigned',
  unMember: true,
  currencies: {
    COP: {
      symbol: '$',
      name: 'Colombian peso'
    }
  },
  idd: {
    root: '+5',
    suffixes: ['7']
  },
  capital: ['Bogotá'],
  altSpellings: ['CO', 'Republic of Colombia', 'República de Colombia'],
  region: 'Americas',
  subregion: 'South America',
  languages: {},
  latlng: [4.0, -72.0],
  landlocked: false,
  borders: ['PAN', 'VEN', 'BRA', 'ECU', 'PER'],
  area: 1141748,
  demonyms: {
    eng: {
      f: 'Colombian',
      m: 'Colombian'
    }
  },
  cca3: 'COL',
  translations: {
    spa: {
      official: 'República de Colombia',
      common: 'Colombia'
    },
    eng: {
      official: 'Republic of Colombia',
      common: 'Colombia'
    },
    fra: {
      official: 'République de Colombie',
      common: 'Colombie'
    }
  },
  flag: '🇨🇴',
  maps: {
    googleMaps: 'https://goo.gl/maps/5nrDei6r63AayLZEA',
    openStreetMaps: 'https://www.openstreetmap.org/relation/120027'
  },
  population: 50882884,
  fifa: 'COL',
  car: {
    signs: ['CO'],
    side: 'right'
  },
  timezones: ['UTC-05:00'],
  continents: ['South America'],
  flags: {
    png: 'https://flagcdn.com/w320/co.png',
    svg: 'https://flagcdn.com/co.svg',
    alt: 'The flag of Colombia is a horizontal tricolor of yellow, blue and red.'
  },
  coatOfArms: {
    png: 'https://mainfacts.com/media/images/coats_of_arms/co.png',
    svg: 'https://mainfacts.com/media/images/coats_of_arms/co.svg'
  },
  startOfWeek: 'monday',
  capitalInfo: {
    latlng: [4.71, -74.07]
  },
  postalCode: {
    format: null,
    regex: null
  }
};

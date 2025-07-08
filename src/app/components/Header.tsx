import Link from 'next/link';
import { FC } from 'react';
import ThemeToggle from './ThemeToggle';

const Header: FC = () => (
  <header
    className='flex items-center justify-between px-4 md:px-8 lg:px-20 py-6 lg:py-6 bg-white shadow-md dark:bg-[var(--dark-blue)]'
    role='banner'
    aria-label='Main header'
  >
    <Link href='/' aria-label={`Go to the home page`}>
      <h1 className='font-extrabold text-lg lg:text-2xl'>
        Where in the world?
      </h1>
    </Link>
    <ThemeToggle />
  </header>
);

export default Header;

import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import { PropsWithChildren } from 'react';
import Navbar from './components/Header';
import './styles/globals.css';

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  weight: ['300', '600', '800'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Countries app',
  description: 'A complete app to search for countries'
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='en'>
      <body className={`${nunitoSans.variable} text-sm`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

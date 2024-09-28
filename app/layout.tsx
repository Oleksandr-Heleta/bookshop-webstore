import './globals.css';
import 'keen-slider/keen-slider.min.css';

import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { InfoProvider } from '@/providers/info-provider';
import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';

const font = Montserrat({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'Магазин дитячих книг Мишка',
  description:
    'Широкий асортимент дитячих книг для розвитку та зростання маленьких читачів',
  // base: process.env.DOMAIN,
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? new URL(`${process.env.DOMAIN}`)
      : new URL('http://localhost:3000'),
  referrer: 'origin-when-cross-origin',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    'книги',
    'книжки',
    'дитячі книги',
    'магазин книг',
    'магазин дитячих книг',
    'магазин книг для дітей',
    'магазин дитячої книги',
    'купити книжку',
    'купити книгу',
    'купити дитячу книгу',
  ],
  authors: [{ name: 'Oleksandr Heleta' }],
  openGraph: {
    type: 'website',
    title: 'Магазин дитячих книг МИШКА | Купити дитячі книги онлайн',
    url: `${process.env.DOMAIN}`,
    images: [
      {
        url: `${process.env.DOMAIN}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: 'Логотип книжкового магазину Мишка',
      },
    ],
    siteName: 'Магазин дитячих книг МИШКА',
    description: 'Книги для маленьких читачів',
  },
};

export const viewport: Viewport = {
  themeColor: '#fde68a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk-UA">
      <head>
        <meta
          name="google-site-verification"
          content="rtC2Y-KwU_b3dFPCMXUietWdKtzJ9PWNMO-fe1e1bIk"
        />
        {/* <!-- Google tag (gtag.js) -->  */}
        <Script
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16704672073"
        />
        <Script
          id="gtag-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16704672073');
            `,
          }}
        />
        {/* <base href={process.env.DOMAIN} /> */}
        {/* <meta name='viewport' content='width=device-width, initial-scale=1' /> */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <InfoProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow mt-20 md:mt-0">{children}</main>
            <Footer />
          </div>
        </InfoProvider>
      </body>
    </html>
  );
}

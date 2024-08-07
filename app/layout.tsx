import type { Metadata, Viewport } from "next";
import { Urbanist, Montserrat } from "next/font/google";
import "./globals.css";
import 'keen-slider/keen-slider.min.css';


import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import {InfoProvider} from "@/providers/info-provider";

const font = Montserrat({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: "Мишка",
  description: "Магазин дитячої книги",
  // base: process.env.DOMAIN,
  metadataBase: process.env.NODE_ENV === 'production' ? new URL(`${process.env.DOMAIN}`) : new URL('http://localhost:3000'),
  referrer: 'origin-when-cross-origin',
  // viewport: "width=device-width, initial-scale=1",
  
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
  keywords: ['книги', 'книжки', 'дитячі книги', 'магазин книг', 'магазин дитячих книг', 'магазин книг для дітей', 'магазин дитячої книги', 'купити книжку', 'купити книгу', 'купити дитячу книгу',],
  authors: [{ name: 'Oleksandr Heleta', }],
  // viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    type: 'website',
    url: `${process.env.DOMAIN}`,
    images: [{
      url: `${process.env.DOMAIN}/logo.png`,
      width: 600,
      height: 600,
      alt: 'Логотип книжкового магазину Мишка',
    
    }],
    siteName: 'Мишка',
    description: 'Магазин дитячої книги',
  },
};
 
export const viewport : Viewport = {
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
        {/* <base href={process.env.DOMAIN} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
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
        <Navbar />
        {children}
        <Footer />
        </InfoProvider>
      </body>
    </html>
  );
}

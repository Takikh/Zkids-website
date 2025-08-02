'use client';

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <title>Z-Kids - Mode Enfantine à Medea, Algérie</title>
        <meta name="description" content="Découvrez Z-Kids, votre boutique de vêtements pour enfants à Medea, Berrouaghia. Mode garçons, filles et accessoires de qualité." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
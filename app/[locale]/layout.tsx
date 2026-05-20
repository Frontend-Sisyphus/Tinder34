import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import { NextIntlClientProvider } from 'next-intl';

import { getTranslations } from 'next-intl/server';

import "../globals.css";

interface PageParams {
  params: Promise<{
    locale: string;
  }>;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      "rule34",
      "rule",
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: "https://swipe34.vercel.app",
      siteName: "swipe34.vercel.app",
      images: [
        {
          url: "https://i.ibb.co.com/rRhNpSSg/Open-Graph-Big.png",
          width: 1200,
          height: 630,
          alt: t('title'),
        },
        {
          url: "https://i.ibb.co.com/svNnxxv5/Open-Graph-Small.png",
          width: 800,
          height: 800,
          alt: t('title'),
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      creator: "@frontendsisyphus",
      images: ["https://i.ibb.co.com/svNnxxv5/Open-Graph-Small.png"],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        "max-image-preview": "large",
      },
    },
    category: "technology",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

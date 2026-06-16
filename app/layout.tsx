import type { Metadata } from 'next';
import './globals.css';
import { getGlobalComponent } from '@/lib/contentstack-api';
import { HeaderData, FooterData } from '@/lib/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Portfolio | Software Developer',
  description: 'Personal portfolio of a software developer',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let headerData: HeaderData | null = null;
  let footerData: FooterData | null = null;

  try {
    headerData = (await getGlobalComponent('header')) as HeaderData;
  } catch (e) {
    console.error('Failed to fetch header:', e);
  }

  try {
    footerData = (await getGlobalComponent('footer')) as FooterData;
  } catch (e) {
    console.error('Failed to fetch footer:', e);
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-base text-white min-h-screen">
        <div className="relative min-h-screen">
          {/* Ambient glow background */}
          <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background:
                'radial-gradient(ellipse at bottom left, rgba(30,60,180,0.25) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10">
            <Header data={headerData} />
            <main>{children}</main>
            <Footer data={footerData} />
          </div>
        </div>
      </body>
    </html>
  );
}
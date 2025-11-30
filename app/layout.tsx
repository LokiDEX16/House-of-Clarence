import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'House of Clarence - Luxury Interior Products',
  description: 'Premium home decor and furniture for modern living',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-900 text-base-content`}
      >
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

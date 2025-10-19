import './globals.css'
import TanstackProvider from '@/components/TanStackProvider/TanStackProvider'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import AuthProvider from '@/components/AuthProvider/AuthProvider';


const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});


interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub — це сучасний застосунок для створення, пошуку та організації ваших нотаток з підтримкою тегів і зручним інтерфейсом.',
  openGraph: {
    title: 'NoteHub',
    description: 'Організуйте свої думки та завдання з NoteHub — швидко, зручно, ефективно.',
    url: 'https://notehub.com',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub preview',
      },
    ],
  },
};



export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanstackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
            <div id="sidebar-root" />
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
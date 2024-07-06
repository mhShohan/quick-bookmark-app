import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { Toaster } from 'sonner';

// mui
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

// project imports
import Providers from '@/lib/Providers/Providers';
import '@/styles/scrollBar.css';

const ubuntu = Ubuntu({ subsets: ['cyrillic'], weight: ['300', '400', '500', '700'] });

export const metadata: Metadata = {
  title: 'Next.js MUI5 Starter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang='en'>
        <body className={ubuntu.className}>
          <AppRouterCacheProvider>
            <>
              <CssBaseline />
              <Toaster richColors duration={1000} />
              {children}
            </>
          </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
}

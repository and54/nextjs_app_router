import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UsersProvider } from './_context/userContext';

export const metadata: Metadata = {
  title: 'Amex Random Users',
  description: 'Created by Andres Munoz',
}

const RootLayout = ({ children }: { children: ReactNode }) =>
  <html lang="en">
    <body style={{ margin: 0, padding: 0 }} suppressHydrationWarning>
      <UsersProvider>
        {children}
      </UsersProvider>
    </body>
  </html>

export default RootLayout
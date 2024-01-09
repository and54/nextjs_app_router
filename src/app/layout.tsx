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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} style={{ margin: 0, padding: 0 }}>
        <UsersProvider>
          {children}
        </UsersProvider>
      </body>
    </html>
  )
}

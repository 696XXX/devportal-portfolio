// src/pages/_app.tsx
import '@/styles/globals.css';
import { ThemeProvider } from '@/lib/theme';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

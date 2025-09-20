import '@/styles/globals.css';
import '@/index.css';
import '@/styles/frame-builder.css';
import type { AppProps } from 'next/app';
import { CartProvider } from '@/contexts/CartContext';
import CartPanel from '@/components/CartPanel';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <CartPanel />
    </CartProvider>
  );
}
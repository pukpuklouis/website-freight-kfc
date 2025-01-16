import { Outlet } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';

export const meta: MetaFunction = () => {
  return [
    { title: 'KFC Freight - Global Logistics Solutions' },
    { name: 'description', content: 'Your trusted partner in global logistics and freight solutions.' },
  ];
};

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { Outlet } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Services - KFC FreightXX' },
    { name: 'description', content: 'Explore our comprehensive freight and logistics services.' },
  ];
};

export default function ServicesLayout() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Outlet />
    </div>
  );
}

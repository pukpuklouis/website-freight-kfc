import { Outlet } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { useTheme, themes } from '~/utils/theme';

export const meta: MetaFunction = () => {
  return [
    { title: 'Services - KFC FreightXX' },
    { name: 'description', content: 'Explore our comprehensive freight and logistics services.' },
  ];
};

export default function ServicesLayout() {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-[var(--accent-2)] text-[var(--accent-12)]' 
        : 'bg-[var(--accent-1)] text-[var(--accent-12)]'
    }`}>
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="relative">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:75px_75px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
          
          {/* Content */}
          <div className="relative">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

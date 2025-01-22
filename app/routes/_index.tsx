import { json } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { ArrowRight, Truck, Ship, Plane } from 'lucide-react';
import { HeroSection } from '~/components/hero-section';
import { FeatureSection } from '~/components/_index_feature_section';
import { BenefitSection } from '~/components/_index_benefit_section';
import { HowItWork } from '~/components/_index_howitwork';

interface Service {
  title: string;
  description: string;
  iconType: 'truck' | 'ship' | 'plane';
  link: string;
}

const IconMap: Record<Service['iconType'], typeof Truck> = {
  truck: Truck,
  ship: Ship,
  plane: Plane,
};

export const meta: MetaFunction = () => {
  return [
    { title: 'KFC Freight' },
    { name: 'description', content: 'Welcome to KFC Freight!' },
  ];
};

export async function loader() {
  return json({
    services: [
      {
        title: 'Road Freight',
        description: '提供全面的陸運服務，包括整車運輸和零擔運輸。',
        iconType: 'truck',
        link: '/services/road-freight',
      },
      {
        title: 'Sea Freight',
        description: '提供全球海運服務，包括整櫃和拼箱運輸。',
        iconType: 'ship',
        link: '/services/sea-freight',
      },
      {
        title: 'Air Freight',
        description: '提供快速可靠的空運服務，適合緊急和高價值貨物。',
        iconType: 'plane',
        link: '/services/air-freight',
      },
    ],
  });
}

export default function Index() {
  const { services } = useLoaderData<typeof loader>();

  return (
    <main className="flex-1">
      <HeroSection />
      <FeatureSection />
      <BenefitSection />
      <HowItWork />
      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">我們的服務</h2>
            <p className="text-gray-600">
              我們提供全方位的物流解決方案，滿足您的所有運輸需求。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = IconMap[service.iconType as 'truck' | 'ship' | 'plane'];
              return (
                <Link
                  key={service.title}
                  to={service.link}
                  className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

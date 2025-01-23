import { json } from '@remix-run/node';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { HeroSection } from '~/components/_index_hero_section';
import { FeatureSection } from '~/components/_index_feature_section';
import { BenefitSection } from '~/components/_index_benefit_section';
import { HowItWorks } from '~/components/_index_howitwork';
import { ServiceSection } from '~/components/_index_service_section';

interface Service {
  title: string;
  description: string;
  iconType: 'truck' | 'ship' | 'plane';
  link: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: 'KFC Freight' },
    { name: 'description', content: 'Welcome to KFC Freight!' },
  ];
};

export const loader: LoaderFunction = async () => {
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
      <HowItWorks />
      <ServiceSection services={services} />
    </main>
  );
}

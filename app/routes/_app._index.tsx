import { json } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { ArrowRight, Globe, Clock, Shield, Truck, Ship, Plane } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroSection } from '~/components/hero-section';

interface Feature {
  title: string;
  description: string;
  iconType: 'globe' | 'clock' | 'shield';
}

interface Service {
  title: string;
  description: string;
  iconType: 'truck' | 'ship' | 'plane';
  link: string;
}

const IconMap = {
  globe: Globe,
  clock: Clock,
  shield: Shield,
  truck: Truck,
  ship: Ship,
  plane: Plane,
} as const;

export const meta: MetaFunction = () => {
  return [
    { title: 'KFC Freight - Home' },
    { name: 'description', content: 'Discover our comprehensive freight and logistics solutions.' },
  ];
};

export async function loader() {
  return json({
    features: [
      {
        title: 'Global Coverage',
        description: 'Access to worldwide shipping routes with reliable partners in over 150 countries',
        iconType: 'globe',
      },
      {
        title: 'Real-time Tracking',
        description: 'Advanced tracking system providing 24/7 visibility of your shipments',
        iconType: 'clock',
      },
      {
        title: 'Secure Handling',
        description: "State-of-the-art security measures ensuring your cargo's safety",
        iconType: 'shield',
      },
    ] as Feature[],
    services: [
      {
        title: 'Road Freight',
        description: 'Efficient ground transportation solutions across continents',
        iconType: 'truck',
        link: '/services/road-freight',
      },
      {
        title: 'Sea Freight',
        description: 'Cost-effective ocean freight services for global trade',
        iconType: 'ship',
        link: '/services/sea-freight',
      },
      {
        title: 'Air Freight',
        description: 'Express air cargo services for time-sensitive deliveries',
        iconType: 'plane',
        link: '/services/air-freight',
      },
    ] as Service[],
  });
}

export default function Index() {
  const { features, services } = useLoaderData<typeof loader>();

  return (
    <main className="flex-1">
      <HeroSection />
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600">
              Experience the difference with our comprehensive logistics solutions designed
              to meet your unique business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = IconMap[feature.iconType];
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-lg border bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600">
              Comprehensive freight solutions tailored to your business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = IconMap[service.iconType];
              return (
                <Link
                  key={service.title}
                  to={service.link}
                  className="group p-6 rounded-lg border bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-4 flex justify-between items-center">
                    <Icon className="w-8 h-8 text-primary" />
                    <ArrowRight className="w-5 h-5 text-gray-400 transform group-hover:translate-x-1 transition-transform" />
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

import { json } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { ArrowRight, Globe, Clock, Shield, Truck, Ship, Plane } from 'lucide-react';

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
        title: 'Ocean Freight',
        description: 'Reliable sea freight services for global trade',
        iconType: 'ship',
        link: '/services/ocean-freight',
      },
      {
        title: 'Air Freight',
        description: 'Fast and secure air cargo transportation',
        iconType: 'plane',
        link: '/services/air-freight',
      },
    ] as Service[],
  });
}

export default function Index() {
  const { features, services } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
          Global Freight Solutions
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Your trusted partner in worldwide logistics
        </p>
        <Button asChild size="lg">
          <Link to="/contact">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = IconMap[feature.iconType];
              return (
                <div
                  key={feature.title}
                  className="flex flex-col items-center rounded-lg bg-white p-6 shadow-sm"
                >
                  <Icon className="mb-4 h-12 w-12 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-center text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => {
            const Icon = IconMap[service.iconType];
            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-lg border bg-white p-6 transition-all hover:shadow-lg"
              >
                <Icon className="mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="mb-4 text-gray-600">{service.description}</p>
                <Button asChild variant="outline">
                  <Link to={service.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

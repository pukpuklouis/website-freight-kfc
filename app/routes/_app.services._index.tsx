import { json } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Truck, Ship, Plane } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  iconType: 'truck' | 'ship' | 'plane';
  link: string;
  features: string[];
}

const IconMap = {
  truck: Truck,
  ship: Ship,
  plane: Plane,
} as const;

export const meta: MetaFunction = () => {
  return [
    { title: 'Our Services - KFC Freight' },
    { name: 'description', content: 'Comprehensive overview of our freight and logistics services.' },
  ];
};

export async function loader() {
  return json({
    services: [
      {
        title: 'Road Freight',
        description: 'Efficient ground transportation solutions across continents with reliable tracking and flexible delivery options.',
        iconType: 'truck',
        link: '/services/road-freight',
        features: [
          'Door-to-door delivery',
          'Full truckload (FTL) services',
          'Less than truckload (LTL) options',
          'Real-time tracking',
          'Temperature-controlled transport'
        ]
      },
      {
        title: 'Ocean Freight',
        description: 'Comprehensive sea freight services for global trade, offering both FCL and LCL solutions.',
        iconType: 'ship',
        link: '/services/ocean-freight',
        features: [
          'FCL (Full Container Load)',
          'LCL (Less Container Load)',
          'Port-to-port service',
          'Custom clearance assistance',
          'Special equipment handling'
        ]
      },
      {
        title: 'Air Freight',
        description: 'Fast and secure air cargo transportation for time-sensitive shipments worldwide.',
        iconType: 'plane',
        link: '/services/air-freight',
        features: [
          'Express air freight',
          'Charter services',
          'Dangerous goods handling',
          'Priority shipping options',
          'Temperature-sensitive cargo'
        ]
      }
    ] as Service[]
  });
}

export default function Services() {
  const { services } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our comprehensive range of freight and logistics solutions designed to meet your specific needs.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {services.map((service) => {
          const Icon = IconMap[service.iconType];
          return (
            <div
              key={service.title}
              className="border rounded-lg p-6 space-y-4 bg-white hover:shadow-lg transition-shadow"
            >
              <Icon className="h-12 w-12 text-primary" />
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full">
                <Link to={service.link}>Learn More</Link>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { json } from '@remix-run/node';
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
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6 relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold">
                Global Freight Solutions for Your Business
              </h1>
              <p className="text-xl text-gray-600">
                Reliable, efficient, and sustainable logistics services tailored to your needs.
                Transform your supply chain with our innovative solutions.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link to="/get-started" className="group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/hero-image.jpg"
                  alt="Freight Services"
                  className="object-cover w-full h-full transform transition-transform hover:scale-105 duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
              Comprehensive freight solutions tailored to your specific requirements,
              ensuring efficient and reliable delivery worldwide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = IconMap[service.iconType];
              return (
                <Link
                  key={service.title}
                  to={service.link}
                  className="group p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-4 transform transition-transform group-hover:scale-110">
                    <Icon className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <span className="text-primary font-medium inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-primary-50 mb-8">
              Transform your logistics operations with our innovative solutions.
              Contact us today for a personalized quote.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/10" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

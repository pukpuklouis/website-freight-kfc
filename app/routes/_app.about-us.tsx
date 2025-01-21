import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'About Us - KFC Freight Services' },
    { name: 'description', content: 'Learn about KFC Freight Services, our history, values, and commitment to excellence in freight solutions.' },
  ];
};

interface AboutUsData {
  sections: {
    title: string;
    content: string;
  }[];
}

export const loader = async () => {
  const aboutData: AboutUsData = {
    sections: [
      {
        title: 'Our Story',
        content: 'KFC Freight Services has been a trusted name in the freight industry for years, delivering excellence and reliability in every shipment.',
      },
      {
        title: 'Our Mission',
        content: 'To provide innovative and efficient freight solutions while maintaining the highest standards of service and customer satisfaction.',
      },
      {
        title: 'Our Values',
        content: 'Integrity, Excellence, Innovation, and Customer Focus drive everything we do at KFC Freight Services.',
      },
    ],
  };

  return json(aboutData);
};

export default function AboutUs() {
  const { sections } = useLoaderData<AboutUsData>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Us</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.title}</h2>
            <p className="text-gray-600 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Experienced Team</h3>
              <p className="mt-2 text-gray-600">Our team brings years of industry expertise to every project.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Global Network</h3>
              <p className="mt-2 text-gray-600">Extensive network of partners worldwide for seamless logistics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

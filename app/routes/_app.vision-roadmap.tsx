import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Vision & Roadmap - KFC Freight Services' },
    { name: 'description', content: 'Discover our vision for the future of freight services and our strategic roadmap for growth and innovation.' },
  ];
};

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface VisionRoadmapData {
  vision: string;
  milestones: Milestone[];
}

export const loader = async () => {
  const data: VisionRoadmapData = {
    vision: 'To revolutionize the freight industry through technological innovation and sustainable practices, becoming the most trusted partner in global logistics solutions.',
    milestones: [
      {
        year: '2024',
        title: 'Digital Transformation',
        description: 'Launch of our advanced tracking system and customer portal.',
      },
      {
        year: '2025',
        title: 'Sustainable Operations',
        description: 'Implementation of eco-friendly practices and green logistics solutions.',
      },
      {
        year: '2026',
        title: 'Global Expansion',
        description: 'Establishing new operational hubs in key markets worldwide.',
      },
    ],
  };

  return json(data);
};

export default function VisionRoadmap() {
  const { vision, milestones } = useLoaderData<VisionRoadmapData>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Vision & Roadmap</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{vision}</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

        {/* Milestones */}
        <div className="space-y-16">
          {milestones.map((milestone, index) => (
            <div 
              key={index}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500"></div>

              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <span className="text-blue-500 font-bold text-lg">{milestone.year}</span>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2">{milestone.title}</h3>
                  <p className="text-gray-600 mt-2">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 bg-gray-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Strategic Focus Areas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
              <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">Leveraging cutting-edge technology for improved efficiency</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
              <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600">Commitment to environmental responsibility</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 inline-block mb-4">
              <svg className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-600">Expanding our international presence</p>
          </div>
        </div>
      </div>
    </div>
  );
}

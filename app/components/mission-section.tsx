import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface MissionFeature {
  number: string;
  tagline: string;
  heading: string;
  description: string;
}

interface MissionSectionProps {
  features: MissionFeature[];
}

export function MissionSection({ features }: MissionSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={ref} className="px-[5%] py-24 pb-32 md:py-32 md:pb-40 lg:py-40 lg:pb-48 bg-white">
      <div className="container mx-auto">
        <div className="relative grid gap-x-8 gap-y-12 md:grid-cols-[0.4fr_1fr] lg:grid-cols-[0.5fr_1fr] lg:gap-x-20">
          <div className="static top-[15%] hidden h-80 md:sticky md:flex md:items-start">
            <div className="text-center relative h-full w-full overflow-hidden flex items-start justify-center pt-8">
              {features.map((feature, index) => {
                const opacity = useTransform(
                  scrollYProgress,
                  [
                    index * 0.3,
                    index * 0.3 + 0.05,
                    (index + 1) * 0.3 - 0.05,
                    (index + 1) * 0.3
                  ],
                  [0, 1, 1, 0]
                );

                return (
                  <motion.h1
                    key={index}
                    style={{ opacity }}
                    className="text-[8rem] font-bold leading-[1] md:text-[12rem] lg:text-[14rem] text-gray-900 absolute top-0"
                  >
                    {feature.number}
                  </motion.h1>
                );
              })}
            </div>
          </div>
          <div className="grid gap-y-40 md:gap-y-56">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ number, tagline, heading, description }: MissionFeature) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });
  
  const animatedWidth = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 20 
  });
  
  const width = useTransform(animatedWidth, [0, 1], ['0%', '100%']);

  return (
    <div className="flex flex-col items-start justify-center py-8 md:py-0">
      <div className="mt-10 flex text-[6rem] font-bold leading-[1] md:mt-0 md:hidden">
        {number}
      </div>
      <div ref={ref} className="mb-8 mt-8 h-0.5 w-full bg-gray-200 md:mt-0">
        <motion.div 
          className="h-0.5 bg-gray-900" 
          style={{ width }}
        />
      </div>
      <div className="max-w-2xl">
        <p className="mb-3 font-semibold text-gray-600 md:mb-4">{tagline}</p>
        <h2 className="mb-5 text-4xl font-bold text-gray-900 md:mb-6 md:text-5xl lg:text-6xl">
          {heading}
        </h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

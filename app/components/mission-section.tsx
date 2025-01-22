import "./mission-section.css";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

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
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      className="px-[5%] py-24 pb-24 md:py-16 md:pb-32 lg:py-12 lg:pb-16 bg-white relative MissionSection_section1"
    >
      <div className="container mx-auto MissionSection_div2">
        <div className="relative grid gap-x-8 gap-y-12 md:grid-cols-[0.4fr_1fr] lg:grid-cols-[0.5fr_1fr] lg:gap-x-20 MissionSection_div3">
          <div className="static top-[15%] hidden h-80 md:sticky md:flex md:items-start">
            <div className="text-center relative h-full w-full overflow-hidden flex items-start justify-center pt-8">
              {features.map((feature, index) => {
                // Calculate segment size based on number of features
                const segmentSize = 1.3 / features.length;
                // Add padding between segments
                const padding = 0.1;

                // For first number (index 0), start immediately
                const points =
                  index === 0
                    ? [0, 0, segmentSize - padding, segmentSize] // First number points
                    : [
                        // Other numbers points
                        index * segmentSize,
                        index * segmentSize + padding,
                        (index + 1) * segmentSize - padding,
                        (index + 1) * segmentSize,
                      ];

                const opacity = useTransform(
                  scrollYProgress,
                  points,
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
          <div className="grid gap-y-24 md:gap-y-32 mb-24">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  number,
  tagline,
  heading,
  description,
}: MissionFeature) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const animatedWidth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  const width = useTransform(animatedWidth, [0, 1], ["0%", "100%"]);

  return (
    <div className="flex flex-col items-start justify-center py-8 md:py-0">
      <div className="mt-10 flex text-[6rem] font-bold leading-[1] md:mt-0 md:hidden">
        {number}
      </div>
      <div ref={ref} className="mb-8 mt-8 h-0.5 w-full bg-gray-200 md:mt-0">
        <motion.div className="h-0.5 bg-gray-900" style={{ width }} />
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

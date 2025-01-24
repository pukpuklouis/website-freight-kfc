import "./mission-section.css";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTheme, themes } from "~/utils/theme";

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
    offset: ["start center", "end center"],
  });

  return (
    <section
      ref={ref}
      className="px-[5%] py-24 pb-24 md:py-16 md:pb-32 lg:py-12 lg:pb-16 bg-[var(--accent-2)] relative"
    >
      <div className="container mx-auto">
        <div className="relative grid gap-x-8 gap-y-12 md:grid-cols-[0.4fr_1fr] lg:grid-cols-[0.5fr_1fr] lg:gap-x-20">
          <div className="static top-[15%] hidden h-80 md:sticky md:flex md:items-start">
            <div className="text-center relative h-full w-full overflow-hidden flex items-start justify-center pt-8">
              {features.map((feature, index) => {
                // === ANIMATION TIMING CONTROLS ===
                // Increase this value to make all animations take longer
                const totalDuration = 1.2; // Total scroll duration
                
                // Decrease this value to make numbers appear more quickly in sequence
                const segmentDuration = totalDuration / features.length;
                
                // Increase this value (0.1 to 0.4) to make numbers overlap more
                const overlapFactor = 0.08; 

                // === FIRST NUMBER TIMING ADJUSTMENTS ===
                // For earlier first number appearance:
                // 1. Decrease this offset for the first number (index === 0)
                const startOffset = index === 0 ? -0.02 : (index * segmentDuration);
                
                // Calculate animation points
                // Decrease these values for earlier first number appearance
                const start = Math.max(0, startOffset - (overlapFactor * segmentDuration));
                const peak1 = start + (segmentDuration * 0.2);  // Adjust 0.2 to change fade-in speed
                const peak2 = start + (segmentDuration * 0.8);  // Adjust 0.8 to change how long number stays visible
                const end = Math.min(totalDuration, start + segmentDuration + (overlapFactor * segmentDuration));

                // === ANIMATION SMOOTHNESS CONTROLS ===
                // Adjust these values to change animation feel
                const springConfig = { 
                  stiffness: 100,  // Higher = more reactive
                  damping: 30,     // Lower = more bouncy
                  restDelta: 0.001 // Lower = more precise
                };
                
                const opacity = useSpring(
                  useTransform(
                    scrollYProgress,
                    [start, peak1, peak2, end],
                    [0, 1, 1, 0]
                  ),
                  springConfig
                );

                // Add scale animation for more dynamic effect
                const scale = useSpring(
                  useTransform(
                    scrollYProgress,
                    [start, peak1, peak2, end],
                    [0.7, 0.9, 0.9, 0.7]
                  ),
                  springConfig
                );

                // Add Y position animation for subtle floating effect
                const y = useSpring(
                  useTransform(
                    scrollYProgress,
                    [start, peak1, peak2, end],
                    [20, 0, 0, 20]
                  ),
                  springConfig
                );

                return (
                  <motion.h1
                    key={index}
                    style={{ 
                      opacity,
                      scale,
                      y,
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      x: '-50%'
                    }}
                    className="text-[8rem] font-bold leading-[1] md:text-[12rem] lg:text-[14rem] text-[var(--accent-10)]"
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
      <div ref={ref} className="mb-8 mt-8 h-0.5 w-full bg-[var(--gray-6)] md:mt-0">
        <motion.div className="h-0.5 bg-[var(--accent-7)]" style={{ width }} />
      </div>
      <div className="max-w-2xl">
        <p className="mb-3 font-semibold text-[var(--gray-10)] md:text-gray- md:mb-4">{tagline}</p>
        <h2 className="mb-5 md:mb-6 text-[clamp(2rem,4vw+0.6rem,5rem)] font-bold text-[var(--accent-12)]">
          {heading}
        </h2>
        <p className="text-[var(--gray-11)]">{description}</p>
      </div>
    </div>
  );
}

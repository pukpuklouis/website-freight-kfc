import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTheme, themes } from "~/utils/theme";
import { useHydrated } from "~/hooks/use-hydrated";

interface Feature {
  number: string; // Using this as a unique identifier
  tagline: string;
  heading: string;
  description: string;
}

interface MissionSectionProps {
  features: Feature[];
}

export function MissionSection({ features }: MissionSectionProps) {
  const isHydrated = useHydrated();
  const ref = useRef<HTMLDivElement>(null);

  // Only enable scroll animations on client-side
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  if (!isHydrated) {
    // Server-side or pre-hydration render
    return (
      <section
        className="relative px-[5%] py-16 md:py-24 lg:py-28"
        data-oid="9s-k2pi"
      >
        <div className="container" data-oid="qwu2cs:">
          <div className="grid gap-8" data-oid="_gaqun.">
            {features.map((feature) => (
              <div
                key={feature.number}
                className="opacity-100"
                data-oid="9fveb8x"
              >
                <p
                  className="text-sm text-[var(--accent-9)]"
                  data-oid="godmv9-"
                >
                  {feature.tagline}
                </p>
                <h2 className="mt-2 text-2xl font-bold" data-oid="z0:zrof">
                  {feature.heading}
                </h2>
                <p className="mt-4 text-[var(--accent-11)]" data-oid="q1m1ue-">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative px-[5%] py-16 md:py-24 lg:py-28"
      data-oid="pydbysw"
    >
      <div className="container" data-oid="ut:thst">
        <div className="grid gap-8" data-oid="e2228_q">
          {features.map((feature, index) => {
            const totalDuration = 1;
            const segmentDuration = totalDuration / features.length;
            const overlapFactor = 0.8;

            const start = index * segmentDuration * (1 - overlapFactor);
            const peak1 = start + segmentDuration * 0.4;
            const peak2 = start + segmentDuration * 0.6;
            const end = Math.min(
              totalDuration,
              start + segmentDuration + overlapFactor * segmentDuration,
            );

            const springConfig = {
              stiffness: 100,
              damping: 30,
              restDelta: 0.001,
            };

            const opacity = useSpring(
              useTransform(
                scrollYProgress,
                [start, peak1, peak2, end],
                [0, 1, 1, 0],
              ),
              springConfig,
            );

            const scale = useSpring(
              useTransform(
                scrollYProgress,
                [start, peak1, peak2, end],
                [0.7, 0.9, 0.9, 0.7],
              ),
              springConfig,
            );

            const y = useSpring(
              useTransform(
                scrollYProgress,
                [start, peak1, peak2, end],
                [20, 0, 0, 20],
              ),
              springConfig,
            );

            return (
              <motion.div
                key={feature.number}
                style={{ opacity, scale, y }}
                className="transform-gpu"
                data-oid="0g0ba3_"
              >
                <p
                  className="text-sm text-[var(--accent-9)]"
                  data-oid="wp3d-nj"
                >
                  {feature.tagline}
                </p>
                <h2 className="mt-2 text-2xl font-bold" data-oid="63p9e5t">
                  {feature.heading}
                </h2>
                <p className="mt-4 text-[var(--accent-11)]" data-oid="bbk3_n_">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ number, tagline, heading, description }: Feature) {
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
    <div
      className="flex flex-col items-start justify-center py-8 md:py-0"
      data-oid="5qv86be"
    >
      <div
        className="mt-10 flex text-[6rem] font-bold leading-[1] md:mt-0 md:hidden"
        data-oid="3mzs6z:"
      >
        {number}
      </div>
      <div
        ref={ref}
        className="mb-8 mt-8 h-0.5 w-full bg-[var(--gray-6)] md:mt-0"
        data-oid="70s51sb"
      >
        <motion.div
          className="h-0.5 bg-[var(--accent-7)]"
          style={{ width }}
          data-oid="417b0d7"
        />
      </div>
      <div className="max-w-2xl" data-oid="cnl4k5-">
        <p
          className="mb-3 font-semibold text-[var(--gray-10)] md:text-gray- md:mb-4"
          data-oid="9sdu_3u"
        >
          {tagline}
        </p>
        <h2
          className="mb-5 md:mb-6 text-[clamp(2rem,4vw+0.6rem,5rem)] font-bold text-[var(--accent-12)]"
          data-oid="q:hbx0k"
        >
          {heading}
        </h2>
        <p className="text-[var(--gray-11)]" data-oid="8z6u_qu">
          {description}
        </p>
      </div>
    </div>
  );
}

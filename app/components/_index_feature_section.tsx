import "./_index_feature_section.css";
import { memo } from "react";
import type { LucideIcon } from "lucide-react";
import { Tilt } from "~/components/ui/tilt";
import { Spotlight } from "~/components/ui/spotlight";

interface ImageData {
  readonly src: string;
  readonly alt: string;
}

interface FeatureCardProps {
  readonly image: ImageData;
  readonly title: string;
  readonly description: string;
  readonly className?: string;
}

interface FeatureSectionProps {
  readonly tagline?: string;
  readonly heading?: string;
  readonly description?: string;
  readonly features?: FeatureCardProps[];
  readonly className?: string;
}

const FeatureCard = memo(function FeatureCard({
  image,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <Tilt
      rotationFactor={8}
      isRevese
      springOptions={{
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
      className={className}
    >
      <div
        className={`
          group relative overflow-hidden rounded-xl border border-gray-100
          transition-all duration-300 hover:border-gray-200 hover:shadow-lg
          h-full
        `}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/70 transition-all duration-300 group-hover:from-black/10 group-hover:via-black/20 group-hover:to-black/80" />

        {/* Spotlight Effect */}
        <Spotlight
          className="z-10 from-white/30 via-white/10 to-transparent blur-2xl"
          size={200}
          springOptions={{
            stiffness: 300,
            damping: 20,
            mass: 0.5,
          }}
        />

        {/* Image with grayscale effect */}
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
        />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="mb-2 text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-gray-100 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            {description}
          </p>
        </div>
      </div>
    </Tilt>
  );
});

// Default values for the feature section
const defaultFeatures: FeatureCardProps[] = [
  {
    image: {
      src: "https://placehold.co/600x400?text=Global+Logistics",
      alt: "全球物流網絡",
    },
    title: "全球網絡",
    description:
      "我們的服務遍布全球150多個國家，確保您的貨物可以安全高效地運送到世界各地。",
  },
  {
    image: {
      src: "https://placehold.co/600x400?text=Tracking+System",
      alt: "即時追蹤系統",
    },
    title: "即時追蹤",
    description: "透過我們的先進追蹤系統，全天候監控您的貨物。",
  },
  {
    image: {
      src: "https://placehold.co/600x400?text=Secure+Freight",
      alt: "安全貨運處理",
    },
    title: "安全處理",
    description: "採用最先進的安全措施保護您的貴重貨物。",
  },
];

export const FeatureSection = memo(function FeatureSection({
  tagline = "為什麼選擇我們",
  heading = "Make logistics disappear like magic.",
  description = "體驗我們創新的全球貨運服務和專業團隊。",
  features = defaultFeatures,
  className,
}: FeatureSectionProps) {
  return (
    <section className="relative px-[10%] py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="relative mb-8 md:mb-8 lg:mb-8">
          <Tilt
            rotationFactor={4}
            isRevese
            springOptions={{
              stiffness: 26.7,
              damping: 4.1,
              mass: 0.2,
            }}
            className="group relative overflow-hidden rounded-2xl"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="https://placehold.co/1920x600?text=Header+Background"
                alt="Background"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
            </div>

            {/* Spotlight Effect */}
            <Spotlight
              className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
              size={400}
              springOptions={{
                stiffness: 26.7,
                damping: 4.1,
                mass: 0.2,
              }}
            />

            {/* Content Card */}
            <div className="relative z-20 py-16 md:py-20 lg:py-24 px-6 md:px-12">
              <div className="mx-auto max-w-3xl">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 transform-gpu transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
                  <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-200 md:mb-4">
                    {tagline}
                  </p>
                  <h2 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl tracking-tight">
                    {heading.split(" ").map((word, index, array) => (
                      <span key={index}>
                        {index === array.length - 1 ? (
                          <span className="italic text-gray-100">{word}</span>
                        ) : (
                          <span>{word} </span>
                        )}
                      </span>
                    ))}
                  </h2>
                  <p className="text-gray-200 md:text-lg max-w-2xl">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </Tilt>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={`feature-${index}`}
              {...feature}
              className={
                index === 0
                  ? "md:col-span-2 lg:col-span-1 aspect-[16/9] md:aspect-[2/1] lg:aspect-[16/9]"
                  : "aspect-[16/9]"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
});

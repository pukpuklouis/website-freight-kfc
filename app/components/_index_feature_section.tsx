import { memo } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Tilt } from "~/components/ui/tilt";
import { Spotlight } from "~/components/ui/spotlight";
import { useTheme, themes } from "~/utils/theme";
import { FeatureLgCard } from "./feature-lg-card";
import { Link } from "@remix-run/react";

interface ImageData {
  readonly src: string;
  readonly alt: string;
}

interface FeatureCardProps {
  readonly image: ImageData;
  readonly title: string;
  readonly description: string;
  readonly className?: string;
  readonly url?: string;
}

interface FeatureSectionProps {
  readonly tagline?: string;
  readonly heading?: string;
  readonly description?: string;
  readonly features?: FeatureCardProps[];
  readonly className?: string;
}

interface CardWrapperProps {
  children: React.ReactNode;
  className: string;
  to?: string;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children, className, to }) => {
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
};

const defaultFeatures: FeatureCardProps[] = [
  {
    image: {
      src: "https://images.unsplash.com/photo-1596188126441-41279e8f5e46?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "兩岸三地海快、空運",
    },
    title: "兩岸三地海快、空運",
    description: "專精大中華區，確保貨物安全高效地運送到目的地。",
    url: "service/cross-strait-three-regions-sea-express-air-transport",
  },
  {
    image: {
      src: "/images/services/city-1909892_1920.webp",
      alt: "台灣快遞海運菲律賓",
    },
    title: "台灣快遞海運菲律賓",
    description: "海運服務，深入菲律賓地區確保貨物安全高效送到目的地。",
    url: "service/taiwan-express-delivery-and-sea-freight-to-philippines",
  },
  {
    image: {
      src: "https://images.unsplash.com/photo-1653029431060-4a5909fdf59d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "日本海快到台灣",
    },
    title: "日本海快到台灣",
    description: "透過我們的先進追蹤系統，全天候監控您的貨物。",
    url: "service/japan-sea-express-to-taiwan",
  },
  {
    image: {
      src: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "台灣倉儲配送",
    },
    title: "台灣倉儲配送",
    description: "採用最先進的安全措施保護您的貴重貨物。",
    url: "service/Taiwan-logistics-solutions",
  },
];

const FeatureCard = memo(function FeatureCard({
  image,
  title,
  description,
  url,
  className = "",
}: FeatureCardProps & { className?: string }) {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Tilt
        rotationFactor={6}
        isRevese
        springOptions={{
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
        className="h-full"
      >
        <CardWrapper 
          to={url} 
          className="feature-card group relative overflow-hidden rounded-xl h-full block transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* Background Image */}
          <img
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Spotlight Effect */}
          <Spotlight
            className="feature-spotlight z-10 blur-2xl"
            size={100}
            springOptions={{
              stiffness: 300,
              damping: 20,
              mass: 0.5,
            }}
          />

          {/* Content overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--gray-12)] to-transparent"
          >
            <h3
              className="mb-1 text-xl font-black tracking-tight text-[var(--gray-1)]"
            >
              {title}
            </h3>
            <p
              className="text-[var(--gray-3)] font-normal tracking-tightest opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
            >
              {description}
            </p>
          </div>
        </CardWrapper>
      </Tilt>
    </motion.div>
  );
});

export const FeatureSection = memo(function FeatureSection({
  tagline = "Our services",
  heading = "我們的服務",
  description = "體驗我們的全球貨運服務和專業團隊。",
  features = defaultFeatures,
  className,
}: FeatureSectionProps) {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];

  return (
    <section className="relative px-[10%] py-16 md:py-24 bg-[var(--accent-2)]">
      <div className="container relative">
        {/* Hero Feature Card */}
        <FeatureLgCard
          tagline={tagline}
          heading={heading}
          description={description}
          imageUrl="https://images.unsplash.com/photo-1617952739858-28043cecdae3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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

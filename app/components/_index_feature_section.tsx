import { memo } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Tilt } from "~/components/ui/tilt";
import { Spotlight } from "~/components/ui/spotlight";
import { useTheme, themes } from "~/utils/theme";

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

const defaultFeatures: FeatureCardProps[] = [
  {
    image: {
      src: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds",
      alt: "全球物流網絡",
    },
    title: "全球網路",
    description: "專精大中華區，確保貨物安全高效地運送到目的地。",
  },
  {
    image: {
      src: "https://images.unsplash.com/photo-1581089781785-603411fa81e5?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "即時追蹤系統",
    },
    title: "即時追蹤",
    description: "透過我們的先進追蹤系統，全天候監控您的貨物。",
  },
  {
    image: {
      src: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "安全貨運處理",
    },
    title: "安全處理",
    description: "採用最先進的安全措施保護您的貴重貨物。",
  },
];

const FeatureCard = memo(function FeatureCard({
  image,
  title,
  description,
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
      data-oid="ph.1ed4"
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
        data-oid="q396zq."
      >
        <div
          className="feature-card group relative overflow-hidden rounded-xl h-full"
          data-oid="4o2.zh1"
        >
          {/* Background Image */}
          <img
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 h-full w-full object-cover"
            data-oid="a10apc0"
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
            data-oid="c7g-lrm"
          />

          {/* Content overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--gray-12)] to-transparent"
            data-oid="zgfj5-z"
          >
            <h3
              className="mb-2 text-2xl font-black tracking-tight text-[var(--gray-1)]"
              data-oid="vl7xxmf"
            >
              {title}
            </h3>
            <p
              className="text-[var(--gray-3)] font-light opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
              data-oid="wu_pgij"
            >
              {description}
            </p>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
});

export const FeatureSection = memo(function FeatureSection({
  tagline = "為什麼選擇我們",
  heading = "Make logistics disappear like magic.",
  description = "體驗我們創新的全球貨運服務和專業團隊。",
  features = defaultFeatures,
  className,
}: FeatureSectionProps) {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];

  return (
    <section
      className="feature-section relative px-[10%] py-16 md:py-24 lg:py-32 bg-[var(--accent-2)]"
      data-oid="i6yjniz"
    >
      <div className="container mx-auto" data-oid="e1h34vy">
        {/* Header Section */}
        <div className="relative mb-8 md:mb-8 lg:mb-8" data-oid="593ibi-">
          <Tilt
            rotationFactor={4}
            isRevese
            springOptions={{
              stiffness: 26.7,
              damping: 4.1,
              mass: 0.2,
            }}
            className="group relative overflow-hidden rounded-2xl"
            data-oid="i6c-ruo"
          >
            {/* Background Image */}
            <div className="absolute inset-0" data-oid="x9ys:r_">
              <img
                src="https://images.unsplash.com/photo-1617952739858-28043cecdae3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Background"
                className="w-full h-full object-cover transition-all duration-700 group-hover:grayscale-7"
                data-oid="qyjacee"
              />

              <div
                className="feature-card-gradient absolute inset-0"
                data-oid="9edjk08"
              />
            </div>

            {/* Spotlight Effect */}
            <Spotlight
              className="feature-spotlight z-10 blur-3xl"
              size={200}
              springOptions={{
                stiffness: 26.7,
                damping: 4.1,
                mass: 0.2,
              }}
              data-oid="j49993t"
            />

            {/* Content Card */}
            <div
              className="relative z-20 py-16 md:py-20 lg:py-24 px-6 md:px-12"
              data-oid="vho7k8_"
            >
              <div className="mx-auto max-w-3xl" data-oid="9xu5nra">
                <div
                  className="rounded-2xl p-8 md:p-12 border border-[var(--accent-9)] bg-[var(--accent-6)]/50 backdrop-blur-sm transform-gpu transition-all duration-500"
                  data-oid="te.cyzh"
                >
                  <p
                    className="mb-3 text-sm font-medium uppercase tracking-widest md:mb-4 text-[var(--accent-10)]"
                    data-oid="7w2ztit"
                  >
                    {tagline}
                  </p>
                  <h2
                    className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl tracking-tight text-[var(--accent-9)]"
                    data-oid="c1:rm68"
                  >
                    {heading.split(" ").map((word, index, array) => (
                      <span key={index} data-oid="97pic-0">
                        {index === array.length - 1 ? (
                          <span className="italic" data-oid="ypl1su-">
                            {word}
                          </span>
                        ) : (
                          <span data-oid="rqo_4jz">{word} </span>
                        )}
                      </span>
                    ))}
                  </h2>
                  <p
                    className="md:text-lg max-w-2xl text-gray-300"
                    data-oid="g.7t6qx"
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </Tilt>
        </div>

        {/* Features Grid */}
        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          data-oid="28ruqco"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={`feature-${index}`}
              {...feature}
              className={
                index === 0
                  ? "md:col-span-2 lg:col-span-1 aspect-[16/9] md:aspect-[2/1] lg:aspect-[16/9]"
                  : "aspect-[16/9]"
              }
              data-oid="6w:gidq"
            />
          ))}
        </div>
      </div>
    </section>
  );
});

import { Tilt } from "~/components/ui/tilt";
import { Spotlight } from "~/components/ui/spotlight";

interface FeatureLgCardProps {
  tagline: string;
  heading: string;
  description: string;
  imageUrl: string;
  className?: string;
}

export function FeatureLgCard({
  tagline,
  heading,
  description,
  imageUrl,
  className = "",
}: FeatureLgCardProps) {
  return (
    <div className={`relative mb-8 md:mb-8 lg:mb-8 ${className}`}>
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
            src={imageUrl}
            alt="Background"
            className="w-full h-full object-cover transition-all duration-700 group-hover:grayscale-7"
          />

          <div className="feature-card-gradient absolute inset-0" />
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
        />

        {/* Content Card */}
        <div className="relative z-20 py-16 md:py-20 lg:py-24 px-6 md:px-12">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl p-8 md:p-12 border border-[var(--accent-9)] bg-[var(--accent-6)]/50 backdrop-blur-sm transform-gpu transition-all duration-500">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest md:mb-4 text-[var(--accent-10)]">
                {tagline}
              </p>
              <h2 className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl tracking-tight text-[var(--accent-9)]">
                {heading.split(" ").map((word, index, array) => (
                  <span key={index}>
                    {index === array.length - 1 ? (
                      <span className="italic">{word}</span>
                    ) : (
                      <span>{word} </span>
                    )}
                  </span>
                ))}
              </h2>
              <p className="md:text-lg max-w-2xl text-gray-300">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
}

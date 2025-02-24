import { motion } from "framer-motion";
import { useTheme, themes } from "~/utils/theme";

interface FeatureVisionProps {
  heading: string;
  description: string;
  features: {
    path: string;
    text: string;
  }[];
  image: {
    src: string;
    alt: string;
  };
}

export function FeatureVision({
  heading,
  description,
  features,
  image,
}: FeatureVisionProps) {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28" data-oid="48tldij">
      <div className="container mx-auto" data-oid="2e4k2lh">
        <div
          className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20"
          data-oid="j6f5dy."
        >
          <div data-oid="ekyo_3o">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 md:mb-6 font-bold leading-tight text-[var(--gray-12)] text-[clamp(1.4rem,3.9vw,4rem)]"
              data-oid="bawbx2_"
            >
              {heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 md:mb-6 md:text-md text-[var(--gray-11)]"
              data-oid="l:_3z-w"
            >
              {description}
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 gap-4 py-2"
              data-oid="sz8-gk5"
            >
              {features.map((feature, index) => (
                <li key={index} className="flex self-start" data-oid="ai-9meu">
                  <div className="mr-4 flex-none self-start" data-oid=":.xjvxn">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="size-6 stroke-[var(--gray-11)]"
                      data-oid="z_wz9f5"
                    >
                      <path d={feature.path} data-oid="6e52pah" />
                    </svg>
                  </div>
                  <p className="text-[var(--gray-11)]" data-oid=":fpqz07">
                    {feature.text}
                  </p>
                </li>
              ))}
            </motion.ul>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative aspect-[4/3]"
            data-oid="m:ofuzt"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 h-full w-full rounded-2xl bg-zinc-100 object-cover"
              data-oid="ah733qd"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

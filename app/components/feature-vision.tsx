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
    <section className="px-[5%] py-16 md:py-24 lg:py-28" data-oid="8u-wgm2">
      <div className="container mx-auto" data-oid="wwbwfop">
        <div
          className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20"
          data-oid="g3uy0lh"
        >
          <div data-oid="0ff2dnj">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 md:mb-6 font-bold leading-tight text-[var(--gray-12)] text-[clamp(1.4rem,3.9vw,4rem)]"
              data-oid="dn4ba-w"
            >
              {heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 md:mb-6 md:text-md text-[var(--gray-11)]"
              data-oid="xli.oqv"
            >
              {description}
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 gap-4 py-2"
              data-oid="nhb5tow"
            >
              {features.map((feature, index) => (
                <li key={index} className="flex self-start" data-oid="7q_jaaf">
                  <div className="mr-4 flex-none self-start" data-oid="ohjxra3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="size-6 stroke-[var(--gray-11)]"
                      data-oid="_869:z5"
                    >
                      <path d={feature.path} data-oid="5asbug3" />
                    </svg>
                  </div>
                  <p className="text-[var(--gray-11)]" data-oid="fjmn__q">
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
            data-oid="2e16alu"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 h-full w-full rounded-2xl bg-zinc-100 object-cover"
              data-oid="dbn2usi"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

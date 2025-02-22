import { memo } from "react";
import { Tilt } from "~/components/ui/tilt";
import { Spotlight } from "~/components/ui/spotlight";
import { motion } from "framer-motion";
import { useTheme, themes } from "~/utils/theme";

interface BenefitItem {
  readonly title: string;
  readonly description: string;
}

interface BenefitSectionProps {
  readonly heading?: string;
  readonly description?: string;
  readonly benefits?: BenefitItem[];
  readonly className?: string;
  readonly imageSrc?: string;
}

const defaultBenefits: BenefitItem[] = [
  {
    title: "時間節省",
    description: "使用我們的服務，讓您的業務運行更順暢。",
  },
  {
    title: "成本效益",
    description: "提供具競爭力的價格，助您降低運輸成本。",
  },
];

const BenefitCard = memo(function BenefitCard({
  title,
  description,
}: BenefitItem) {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      data-oid="-efkxg_"
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
        data-oid="nqr286o"
      >
        <div
          className="group relative h-full overflow-hidden rounded-2xl border bg-[var(--gray-2)] p-8 transition-all duration-300 hover:shadow-lg"
          style={
            {
              borderColor: `var(--accent-8)`,
              "--spotlight-color": `var(--accent-1)`,
            } as React.CSSProperties
          }
          data-oid="v_xno-8"
        >
          <Spotlight
            className="z-10 blur-2xl"
            size={200}
            springOptions={{
              stiffness: 300,
              damping: 20,
              mass: 0.5,
            }}
            data-oid="86nh2n3"
          />

          <div className="relative z-20" data-oid="e:9pc-e">
            <motion.h3
              className="mb-4 text-2xl font-bold tracking-tight bg-gradient-to-r from-[var(--accent-11)] to-[var(--accent-5)] bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              data-oid="u:j-hvy"
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-[var(--theme-gray-11)]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              data-oid="tv66rkd"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
});

export const BenefitSection = memo(function BenefitSection({
  heading = "選擇卡菲斯體驗無縫物流",
  description = "使用卡菲斯的服務，您可以節省大量時間，讓物流過程變得簡單高效。我們的專業團隊確保每一個貨物都能安全準時送達。",
  benefits = defaultBenefits,
  className,
  imageSrc = "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}: BenefitSectionProps) {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];

  return (
    <section
      className="relative px-[10%] py-16 md:py-24 lg:py-32 bg-[var(--accent-2)]"
      data-oid="hq73zd:"
    >
      <div className="container mx-auto" data-oid="p01oan6">
        <div
          className="grid gap-12 lg:grid-cols-2 items-center"
          data-oid="vl14o3s"
        >
          {/* Left Column - Content */}
          <div className="space-y-12" data-oid="b-jrnkt">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
              data-oid="wlo.ql:"
            >
              <div className="relative z-20" data-oid="cf-ff7r">
                <motion.h2
                  className="mb-6 font-bold tracking-tight text-[var(--accent-10)] text-[clamp(1.7rem,3vw+0.2rem,3.5rem)] leading-[1.1]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  data-oid="3fnejgx"
                >
                  {heading}
                </motion.h2>
                <motion.p
                  className="text-lg text-[var(--theme-gray-11)] md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  data-oid="bonjkrn"
                >
                  {description}
                </motion.p>
              </div>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid gap-8" data-oid="ucyq:ur">
              {benefits.map((benefit, index) => (
                <BenefitCard
                  key={`benefit-${index}`}
                  {...benefit}
                  data-oid="iufs92v"
                />
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            data-oid="79vt020"
          >
            <Tilt
              rotationFactor={4}
              isRevese
              springOptions={{
                stiffness: 300,
                damping: 20,
                mass: 0.5,
              }}
              className="relative overflow-hidden rounded-2xl w-full"
              data-oid="h8dsa5l"
            >
              <motion.div
                className="relative z-20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                data-oid="0d8ot8k"
              >
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[var(--gray-12)]/10 to-transparent"
                  data-oid="sqy8-r5"
                />

                <img
                  src={imageSrc}
                  alt="Logistics Benefits"
                  className="w-full rounded-2xl shadow-2xl aspect-[9/11] transition-all duration-300 group-hover:shadow-3xl object-cover"
                  data-oid="0_e::6n"
                />
              </motion.div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

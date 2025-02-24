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
      data-oid="yy.1dzz"
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
        data-oid="djvt.si"
      >
        <div
          className="group relative h-full overflow-hidden rounded-2xl border bg-[var(--gray-2)] p-8 transition-all duration-300 hover:shadow-lg"
          style={
            {
              borderColor: `var(--accent-8)`,
              "--spotlight-color": `var(--accent-1)`,
            } as React.CSSProperties
          }
          data-oid="i7lkl4t"
        >
          <Spotlight
            className="z-10 blur-2xl"
            size={200}
            springOptions={{
              stiffness: 300,
              damping: 20,
              mass: 0.5,
            }}
            data-oid=".kgzi3v"
          />

          <div className="relative z-20" data-oid="nsrf18i">
            <motion.h3
              className="mb-4 text-2xl font-bold tracking-tight bg-gradient-to-r from-[var(--accent-11)] to-[var(--accent-5)] bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              data-oid="cx7h338"
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-[var(--theme-gray-11)]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              data-oid="00jmkb0"
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
      data-oid="jzxj7n_"
    >
      <div className="container mx-auto" data-oid="s7-dk_j">
        <div
          className="grid gap-12 lg:grid-cols-2 items-center"
          data-oid="mjd.pg."
        >
          {/* Left Column - Content */}
          <div className="space-y-12" data-oid="1hb-4jv">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
              data-oid="nma40ib"
            >
              <div className="relative z-20" data-oid="2l6yezt">
                <motion.h2
                  className="mb-6 font-bold tracking-tight text-[var(--accent-10)] text-[clamp(1.7rem,3vw+0.2rem,3.5rem)] leading-[1.1]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  data-oid="9czwdba"
                >
                  {heading}
                </motion.h2>
                <motion.p
                  className="text-lg text-[var(--theme-gray-11)] md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  data-oid="nn_2.:u"
                >
                  {description}
                </motion.p>
              </div>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid gap-8" data-oid="x.7rzbn">
              {benefits.map((benefit, index) => (
                <BenefitCard
                  key={`benefit-${index}`}
                  {...benefit}
                  data-oid="ad7ak2s"
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
            data-oid="1i8ic_s"
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
              data-oid="w6v0kjq"
            >
              <motion.div
                className="relative z-20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                data-oid="tzk0imq"
              >
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[var(--gray-12)]/10 to-transparent"
                  data-oid="w-nzy18"
                />

                <img
                  src={imageSrc}
                  alt="Logistics Benefits"
                  className="w-full rounded-2xl shadow-2xl aspect-[9/11] transition-all duration-300 group-hover:shadow-3xl object-cover"
                  data-oid="bil88ge"
                />
              </motion.div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

import { memo } from 'react';
import { Tilt } from '~/components/ui/tilt';
import { Spotlight } from '~/components/ui/spotlight';
import { motion } from 'framer-motion';

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
    title: '時間節省',
    description: '使用我們的服務，讓您的業務運行更順暢。',
  },
  {
    title: '成本效益',
    description: '我們提供具競爭力的價格，助您降低運輸成本。',
  },
];

const BenefitCard = memo(function BenefitCard({ title, description }: BenefitItem) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
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
        <div className="group relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-gray-200 hover:shadow-lg">
          <Spotlight
            className="z-10 from-zinc-200/40 via-zinc-200/20 to-transparent blur-2xl"
            size={200}
            springOptions={{
              stiffness: 300,
              damping: 20,
              mass: 0.5,
            }}
          />
          <div className="relative z-20">
            <motion.h3 
              className="mb-4 text-2xl font-bold tracking-tight text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title}
            </motion.h3>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
  heading = '選擇卡菲斯體驗無縫物流',
  description = '使用卡菲斯的服務，您可以節省大量時間，讓物流過程變得簡單高效。我們的專業團隊確保每一個貨物都能安全準時送達。',
  benefits = defaultBenefits,
  className,
  imageSrc = 'https://placehold.co/800x600?text=Logistics+Image',
}: BenefitSectionProps) {
  return (
    <section className="relative px-[10%] py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Column - Content */}
          <div className="space-y-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <div className="relative z-20">
                <motion.h2 
                  className="mb-6 font-bold tracking-tight text-gray-900 text-[clamp(2rem,3.5vw,4rem)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {heading}
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-600 md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {description}
                </motion.p>
              </div>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid gap-8">
              {benefits.map((benefit, index) => (
                <BenefitCard
                  key={`benefit-${index}`}
                  {...benefit}
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
          >
            <Tilt
              rotationFactor={4}
              isRevese
              springOptions={{
                stiffness: 300,
                damping: 20,
                mass: 0.5,
              }}
              className="relative overflow-hidden rounded-2xl"
            >
              <motion.div
                className="relative z-20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={imageSrc}
                  alt="Logistics Benefits"
                  className="w-full rounded-2xl shadow-2xl transition-all duration-300 group-hover:shadow-3xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-black/10 to-transparent" />
              </motion.div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

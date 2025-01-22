import { memo } from 'react';
import { motion } from 'framer-motion';
import { Package2, Warehouse, Truck, Clock } from 'lucide-react';

interface TimelineItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface HowItWorkProps {
  readonly className?: string;
  readonly heading?: string;
  readonly tagline?: string;
  readonly steps?: TimelineItem[];
}

const defaultSteps: TimelineItem[] = [
  {
    title: '採購流程',
    description: '我們的採購團隊確保提供最佳供應商，並以合理的價格獲得高品質的貨物。這一程序為後續的運輸奠定了堅實的基礎。',
    icon: <Package2 className="w-6 h-6" />,
  },
  {
    title: '集散倉庫',
    description: '貨物會被集中到我們的集散倉庫，進行整理和分類。這樣可以提高運輸效率，確保每一件貨物都能準時發送。',
    icon: <Warehouse className="w-6 h-6" />,
  },
  {
    title: '運輸安排',
    description: '我們根據客戶的需求制定運輸計劃，選擇最佳的運輸方式。無論是空運還是海運，我們都能提供適治的解決方案。',
    icon: <Truck className="w-6 h-6" />,
  },
  {
    title: '準時交付',
    description: '我們的專業團隊確保貨物時刻送達客戶手中。客戶可以隨時追蹤貨物狀態，享受無縫的物流體驗。',
    icon: <Clock className="w-6 h-6" />,
  },
];

const TimelineStep = memo(function TimelineStep({
  item,
  index,
  total,
}: {
  item: TimelineItem;
  index: number;
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline line */}
      {index !== total - 1 && (
        <div className="absolute left-6 top-14 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gray-200 to-gray-100" />
      )}

      <div className="relative flex gap-6 pb-8">
        {/* Icon */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-900"
          >
            {item.icon}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 pt-1.5">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            className="text-xl font-bold text-gray-900 mb-2"
          >
            {item.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
            className="text-gray-600"
          >
            {item.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
});

export const HowItWork = memo(function HowItWork({
  className,
  heading = '我們的運作流程',
  tagline = 'how we work',
  steps = defaultSteps,
}: HowItWorkProps) {
  return (
    <section className="relative px-[10%] py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <div className="lg:sticky lg:top-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium uppercase tracking-widest text-gray-600 mb-3"
            >
              {tagline}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-bold tracking-tight text-gray-900 text-[clamp(2rem,3.5vw,4rem)] mb-6"
            >
              {heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              我們的運作流程以高效的採購開始，然後將貨物集中到倉庫，按需，我們將貨物運送到台北，並確保準時交付給客戶。
            </motion.p>
          </div>

          {/* Right Column - Timeline */}
          <div className="relative">
            {steps.map((step, index) => (
              <TimelineStep
                key={step.title}
                item={step}
                index={index}
                total={steps.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

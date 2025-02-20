import { memo } from "react";
import { motion } from "framer-motion";
import { Package2, Warehouse, Truck, Clock } from "lucide-react";
import { useTheme, themes } from "~/utils/theme";
import "@radix-ui/themes/styles.css";

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
    title: "採購流程",
    description:
      "我們的採購團隊確保提供最佳供應商，並以合理的價格獲得高品質的貨物。這一程序為後續的運輸奠定了堅實的基礎。",
    icon: <Package2 className="w-6 h-6" data-oid="gydgv1m" />,
  },
  {
    title: "集散倉庫",
    description:
      "貨物會被集中到我們的集散倉庫，進行整理和分類。這樣可以提高運輸效率，確保每一件貨物都能準時發送。",
    icon: <Warehouse className="w-6 h-6" data-oid="y62u0af" />,
  },
  {
    title: "運輸安排",
    description:
      "我們根據客戶的需求制定運輸計劃，選擇最佳的運輸方式。無論是空運還是海運，我們都能提供適治的解決方案。",
    icon: <Truck className="w-6 h-6" data-oid="rftpxuy" />,
  },
  {
    title: "準時交付",
    description:
      "我們的專業團隊確保貨物時刻送達客戶手中。客戶可以隨時追蹤貨物狀態，享受無縫的物流體驗。",
    icon: <Clock className="w-6 h-6" data-oid="ksvtay3" />,
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
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      data-oid="ix574i:"
    >
      {/* Timeline line */}
      {index !== total - 1 && (
        <div
          className="absolute left-6 top-14 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[var(--accent-6)] to-[var(--accent-4)]"
          data-oid="rjuf12o"
        />
      )}

      <div className="relative flex gap-6 pb-8" data-oid="gqpmkrh">
        {/* Icon */}
        <div className="relative" data-oid="nz:329j">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-4)] text-[var(--accent-11)]"
            data-oid="1bsr8qp"
          >
            {item.icon}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 pt-1.5" data-oid="xga_i-e">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            className="text-xl font-bold text-[var(--accent-11)] mb-2"
            data-oid="qzxzm:w"
          >
            {item.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
            className="text-[var(--gray-11)]"
            data-oid="azwdmsn"
          >
            {item.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
});

export const HowItWorks = memo(function HowItWorks({
  className,
  heading = "我們的運作流程",
  tagline = "how we work",
  steps = defaultSteps,
}: HowItWorkProps) {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];

  return (
    <section
      className="relative px-[10%] py-16 md:py-24 lg:py-32 bg-[var(--accent-2)]"
      data-oid=":29prke"
    >
      <div className="container mx-auto" data-oid="6:v4ts0">
        <div
          className="grid lg:grid-cols-2 gap-12 items-start"
          data-oid="uoxf591"
        >
          {/* Left Column - Content */}
          <div className="lg:sticky lg:top-8" data-oid="j6ukcjd">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium uppercase tracking-widest text-[var(--gray-11)] mb-3"
              data-oid=".q_.7ed"
            >
              {tagline}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-bold tracking-tight text-[var(--accent-10)] text-[clamp(1.7rem,3vw+0.2rem,3.5rem)] leading-[1.1] mb-6"
              data-oid="j0zmz62"
            >
              {heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[var(--gray-11)]"
              data-oid="1-knkk5"
            >
              我們的運作流程以高效的採購開始，然後將貨物集中到倉庫，按需，我們將貨物運送到台北，並確保準時交付給客戶。
            </motion.p>
          </div>

          {/* Right Column - Timeline */}
          <div className="relative" data-oid="msc8:ii">
            {steps.map((step, index) => (
              <TimelineStep
                key={step.title}
                item={step}
                index={index}
                total={steps.length}
                data-oid="46p131d"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

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
    title: "詢問報價",
    description:
      "我們將以最快的速度回覆您的詢價，並提供清晰、全面的報價資訊，讓您輕鬆掌握採購成本",
    icon: <Package2 className="w-6 h-6" data-oid="4s:8o4h" />,
  },
  {
    title: "集散倉庫",
    description:
      "貨物會被集中到我們的集散倉庫，進行整理和分類。這樣可以提高運輸效率，確保每一件貨物都能準時發送。",
    icon: <Warehouse className="w-6 h-6" data-oid="_j71ifr" />,
  },
  {
    title: "運輸安排",
    description:
      "我們根據客戶的需求制定運輸計劃，選擇最佳的運輸方式。無論是空運還是海運，我們都能提供適治的解決方案。",
    icon: <Truck className="w-6 h-6" data-oid="3m6w-h:" />,
  },
  {
    title: "準時交付",
    description:
      "我們的專業團隊確保貨物時刻送達客戶手中。客戶可以隨時追蹤貨物狀態，享受無縫的物流體驗。",
    icon: <Clock className="w-6 h-6" data-oid="djhfxm." />,
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
      data-oid="a981a_i"
    >
      {/* Timeline line */}
      {index !== total - 1 && (
        <div
          className="absolute left-6 top-14 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[var(--accent-6)] to-[var(--accent-4)]"
          data-oid="4mnpdn7"
        />
      )}

      <div className="relative flex gap-6 pb-8" data-oid="564n-l5">
        {/* Icon */}
        <div className="relative" data-oid="kz-3j2d">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-4)] text-[var(--accent-11)]"
            data-oid="jtf_mq3"
          >
            {item.icon}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 pt-1.5" data-oid="wkwiayv">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            className="text-xl font-bold text-[var(--accent-11)] mb-2"
            data-oid="bx0-1cn"
          >
            {item.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
            className="text-[var(--gray-11)]"
            data-oid="6pow.py"
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
      data-oid="a0k15ls"
    >
      <div className="container mx-auto" data-oid="wl9x5xo">
        <div
          className="grid lg:grid-cols-2 gap-12 items-start"
          data-oid="zn_3:fm"
        >
          {/* Left Column - Content */}
          <div className="lg:sticky lg:top-8" data-oid="f-asf-t">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium uppercase tracking-widest text-[var(--gray-11)] mb-3"
              data-oid="xx2l497"
            >
              {tagline}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-bold tracking-tight text-[var(--accent-10)] text-[clamp(1.7rem,3vw+0.2rem,3.5rem)] leading-[1.1] mb-6"
              data-oid="yv1y-wa"
            >
              {heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[var(--gray-11)]"
              data-oid="gmlfr8z"
            >
              我們的運作流程從詢問報價開始，然後將貨物集中到倉庫，按需，我們將貨物運送到台北，並確保準時交付給客戶。
            </motion.p>
          </div>

          {/* Right Column - Timeline */}
          <div className="relative" data-oid=":cz.:ie">
            {steps.map((step, index) => (
              <TimelineStep
                key={step.title}
                item={step}
                index={index}
                total={steps.length}
                data-oid="tyz1b_f"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

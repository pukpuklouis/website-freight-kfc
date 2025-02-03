import { motion } from "framer-motion";
import { ArrowRight, Globe, Clock, Shield } from "lucide-react";
import { useTheme, themes } from "~/utils/theme";
import { Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Link } from "@remix-run/react";

export function HeroSection() {
  const { theme } = useTheme();
  const { accent, gray, } = themes[theme];

  // Create gradient colors for the accent theme
  const gradient1 = `var(--accent-9)`;
  const gradient2 = `var(--accent-a4)`;

  const heroCTA = "貨發出錢進來";

  const featureItems = [
    { icon: Shield, text: '安全跨境運輸' },
    { icon: Globe, text: '大中華區跨境首選' },
    { icon: Clock, text: '24/7  客戶服務' },
  ] as const;

  const FeatureItem = ({ icon: Icon, text }: { icon: typeof Shield | typeof Globe | typeof Clock, text: string }) => (
    <motion.div
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Icon className="h-5 w-5 text-[var(--accent-9)]" />
      <span className="text-[var(--accent-10)] text-[clamp(0.2rem,2vw+0.5rem,1rem)]">{text}</span>
    </motion.div>
  );

  interface HeroImageProps {
    src: string;
    alt: string;
    location: string;
    className: string;
    style?: React.CSSProperties;
    initial?: any;
    animate?: any;
    transition?: any;
  }

  const HeroImage = ({ src, alt, location, className, style, initial, animate, transition }: HeroImageProps) => (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      style={style}
    >
      <div className="relative">
        <img
          src={src}
          alt={alt}
          className="aspect-square w-full object-cover rounded-2xl shadow-2xl"
        />
        <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-end justify-end p-4">
          <span className="text-[var(--gray-1)] text-3xl font-bold">{location}</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-[var(--accent-6)] via-[var(--accent-2)] to-transparent overflow-show bg-[var(--accent-2)]">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:75px_75px] [mask-image:linear-gradient(to_bottom,white,transparent)] z-[-1]" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 mt-4"
        >
          <motion.h1
            style={{
              background: `linear-gradient(170deg, ${gradient1}, ${gradient2})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            className="text-[clamp(1.75rem,5vw+1rem,5rem)] font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            跨境運輸 連接四方
          </motion.h1>
          <motion.p
            style={{ color: gray[12] }}
            className="text-xl max-w-2xl mx-auto "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            卡菲斯國際運輸提供無縫的跨境運輸解決方案，讓您出貨無憂。
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="4"
              variant="solid"
              className="group transition-all duration-200 shadow-lg bg-[var(--accent-9)] text-[var(--accent-contrast)] hover:bg-[var(--accent-10)] hover:border-[var(--accent-9)]"
              asChild
            >
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2"
              >
                {heroCTA}
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex justify-center gap-6 sm:gap-8 md:gap-0 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <HeroImage
            src="https://images.unsplash.com/photo-1578245093109-472875396a2a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Logistics Services"
            location="上海"
            className="absolute bottom-0 left-0 z-10 w-2/5"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ transform: "translateY(-16%)" }}
          />
          <HeroImage
            src="https://images.unsplash.com/photo-1510681916233-314f497f3301?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Global Network"
            location="菲律賓"
            className="mx-[10%] mb-[10%] w-1/2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ transform: "translateY(15.5%)" }}
          />
          <HeroImage
            src="https://images.unsplash.com/photo-1509810505-b88f10b18375?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="japan port"
            location="日本"
            className="absolute right-0 top-[10%] w-2/5"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ transform: "translateY(12%)" }}
          />
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center mt-24 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {featureItems.map((item) => (
            <FeatureItem key={item.text} {...item} />
          ))}
        </motion.div>
      </div>
      
    </section>
  );
}

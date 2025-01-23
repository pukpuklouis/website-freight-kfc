import "./_index_hero_section.css";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Clock, Shield } from "lucide-react";
// import { Button } from "~/components/ui/button";
import { useTheme, themes } from "~/utils/theme";
import { Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export function HeroSection() {
  const { theme } = useTheme();
  const { accent, gray, } = themes[theme];

  // Create a lighter version of the accent color for gradient
  const accentColor = accent === 'tomato' ? '#FF3B1F' : '#E01543';
  const lighterAccent = accent === 'tomato' ? '#FF6B4D' : '#FF2E5C';

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

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-[var(--accent-4)] via-[var(--accent-2)] to-transparent overflow-show bg-[var(--accent-2)]">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:75px_75px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 mt-4"
        >
          <motion.h1
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${lighterAccent})`,
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
              className="shadow-lg bg-[var(--accent-9)] border-[var(--accent-8)] text-[var(--accent-contrast)] hover:bg-[var(--accent-10)] hover:border-[var(--accent-9)]"
              asChild
            >
              <Link to="/contact-us" className="group" >
                {heroCTA}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
          <motion.div
            className="absolute bottom-0 left-0 z-10 w-2/5"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ transform: "translateY(-16%)" }}
          >
            <img
              src="https://placehold.co/600x600/1a365d/ffffff?text=Logistics"
              alt="Logistics Services"
              className="aspect-square w-full object-cover rounded-2xl shadow-xl"
            />
          </motion.div>
          <motion.div
            className="mx-[10%] mb-[10%] w-1/2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ transform: "translateY(15.5%)" }}
          >
            <img
              src="https://placehold.co/800x800/2a4365/ffffff?text=Global+Network"
              alt="Global Network"
              className="aspect-square w-full object-cover rounded-2xl shadow-xl"
            />
          </motion.div>
          <motion.div
            className="absolute right-0 top-[10%] w-2/5"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ transform: "translateY(12%)" }}
          >
            <img
              src="https://placehold.co/600x450/1a365d/ffffff?text=Supply+Chain"
              alt="Supply Chain Solutions"
              className="aspect-[4/3] w-full object-cover rounded-2xl shadow-xl"
            />
          </motion.div>
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

import { motion } from "framer-motion";
import { ArrowRight, Globe, Clock, Shield, Ship } from "lucide-react";
import { useTheme, themes } from "~/utils/theme";
import { Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";

export function HeroSection() {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Create gradient colors for the accent theme
  const gradient1 = `var(--accent-9)`;
  const gradient2 = `var(--accent-a4)`;

  const heroCTA = "貨發出錢進來";

  const featureItems = [
    { icon: Shield, text: "安全跨境運輸" },
    { icon: Globe, text: "大中華區跨境首選" },
    { icon: Clock, text: "24/7  客戶服務" },
  ] as const;

  const FeatureItem = ({
    icon: Icon,
    text,
  }: {
    icon: typeof Shield | typeof Globe | typeof Clock;
    text: string;
  }) => (
    <motion.div
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Icon className="h-5 w-5 text-[var(--accent-9)]" />
      <span className="text-[var(--accent-10)] text-[clamp(0.2rem,2vw+0.5rem,1rem)]">
        {text}
      </span>
    </motion.div>
  );

  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1578245093109-472875396a2a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Logistics Services",
      location: "兩岸三地"
    },
    {
      src: "https://images.unsplash.com/photo-1510681916233-314f497f3301?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Global Network",
      location: "菲律賓"
    },
    {
      src: "https://images.unsplash.com/photo-1509810505-b88f10b18375?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "japan port",
      location: "日本"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
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
              <Link to="/contact-us" className="inline-flex items-center gap-2">
                {heroCTA}
                <Ship className="h-5 w-5 transition-transform duration-200 group-hover:scale-[1.2]" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <div className="relative border border-1 border-separate border-[var(--accent-7)] w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-xl sm:rounded-3xl md:rounded-4xl">
          {heroImages.map((image, index) => (
            <motion.div
              key={image.src}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: currentImageIndex === index ? 1 : 0,
                scale: currentImageIndex === index ? 1 : 1.1,
              }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-end justify-end p-4">
                <span className="absolute bottom-8 right-8 text-gray-300 lg:text-5xl md:text-3xl sm:text-3xl font-bold">{image.location}</span>
              </div>
            </motion.div>
          ))}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {heroImages.map((_, index) => (
                <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentImageIndex === index 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
        </div>

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

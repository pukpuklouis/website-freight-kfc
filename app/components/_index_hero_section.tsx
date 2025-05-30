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

  const heroCTA = "聯絡我們";

  const featureItems = [
    { icon: Shield, text: "安全跨境運輸" },
    { icon: Globe, text: "大中華區跨境首選" },
    { icon: Clock, text: "客戶服務" },
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
      data-oid="6-wh2ky"
    >
      <Icon className="h-5 w-5 text-[var(--accent-9)]" data-oid="yfi0.8g" />
      <span
        className="text-[var(--accent-10)] text-[clamp(0.2rem,2vw+0.5rem,1rem)]"
        data-oid="6-s4pk0"
      >
        {text}
      </span>
    </motion.div>
  );

  const heroImages = [
    {
      src: "images/banner/KFC-freight-banner-China-to-Taiwan-M-v2.avif",
      alt: "Logistics Services",
      location: "兩岸三地",
    },
    {
      src: "images/banner/KFC-freight-banner-Taiwna-to-Philippines-clp.avif",
      alt: "Global Network",
      location: "菲律賓",
    },
    {
      src: "images/banner/KFC-freight-banner-Taiwan-to-Japan.avif",
      alt: "japan port",
      location: "日本",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-[var(--accent-6)] via-[var(--accent-2)] to-transparent overflow-show bg-[var(--accent-2)]"
      data-oid="o:fq5__"
    >
      <div
        className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:75px_75px] [mask-image:linear-gradient(to_bottom,white,transparent)] z-[-1]"
        data-oid="fc0n0-t"
      />

      <div className="container mx-auto px-4" data-oid=".ieiqe_">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 mt-4"
          data-oid="vm2v57k"
        >
          <motion.h1
            style={{
              background: `linear-gradient(170deg, ${gradient1}, ${gradient2})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            className="text-[clamp(1.75rem,7vw+1rem,5rem)] font-bold tracking-tight text-balance mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            data-oid="-lqdk.2"
          >
            跨境運輸 連接四方
          </motion.h1>
          <motion.p
            style={{ color: gray[9] }}
            className="text-lg md:text-xl max-w-2xl mx-auto font-light text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            data-oid="n51s784"
          >
            卡菲斯國際運輸提供無縫的跨境運輸解決方案，讓您出貨無憂
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            data-oid="smmaaq2"
          >
            <Button
              size="4"
              variant="solid"
              className="group transition-all duration-200 shadow-lg bg-[var(--accent-9)] text-[var(--accent-contrast)] hover:bg-[var(--accent-10)] hover:border-[var(--accent-9)]"
              asChild
              data-oid="yvrfzdl"
            >
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2"
                data-oid="dw9c2cn"
              >
                {heroCTA}
                <Ship
                  className="h-5 w-5 transition-transform duration-200 group-hover:scale-[1.2]"
                  data-oid="nqrgn.r"
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <div
          className="relative border-1 border-separate border-[var(--accent-7)] w-[100%] md:w-[90%] lg:w-[80%] aspect-[4/3] mx-0 md:mx-auto overflow-hidden rounded-2xl"
          data-oid="av6he11"
        >
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
              data-oid="9sdzp.0"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                data-oid="dx6m4q0"
              />

              <div
                className="absolute inset-0 bg-black/10 rounded-2xl flex items-end justify-end p-4"
                data-oid="465o2-v"
              >
                <span
                  className="absolute bottom-8 left-8 text-gray-300 lg:text-5xl md:text-3xl sm:text-3xl font-bold"
                  data-oid="l3l:ft:"
                >
                  {image.location}
                </span>
              </div>
            </motion.div>
          ))}
          <div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
            data-oid="rfn92al"
          >
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentImageIndex === index
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                data-oid="my7ti3x"
              />
            ))}
          </div>
        </div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center mt-24 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          data-oid="v..hiog"
        >
          {featureItems.map((item) => (
            <FeatureItem key={item.text} {...item} data-oid="h.j6pze" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { Outlet } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { useTheme, themes } from '~/utils/theme';
import { motion } from "framer-motion";
import { Link } from "@remix-run/react";

const services = [
  {
    id: 1,
    title: "海運服務",
    description: "提供完整的海運服務，包括整櫃、併櫃、散貨等多元化的運輸選擇",
    tags: ["整櫃", "併櫃", "散貨"],
    image: "https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "空運服務",
    description: "快速可靠的空運服務，全球航線覆蓋，為您的貨物提供最佳運輸方案",
    tags: ["快遞", "空運", "全球配送"],
    image: "https://images.unsplash.com/photo-1571086291540-b137111fa1c7?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: "倉儲物流",
    description: "專業的倉儲管理和配送服務，確保您的貨物安全存儲和及時配送",
    tags: ["倉儲", "配送", "物流管理"],
    image: "https://images.unsplash.com/photo-1601598852806-524f0060508e?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

export const meta: MetaFunction = () => {
  return [
    { title: 'Services - KFC Freight' },
    { name: 'description', content: 'Explore our comprehensive freight and logistics services.' },
  ];
};

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-[var(--accent-3)] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative w-full pt-[75%]">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[var(--accent-11)] mb-3">
          {service.title}
        </h3>
        <p className="text-[var(--accent-11)] mb-4">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-[var(--accent-4)] text-[var(--accent-11)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesLayout() {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];
  


  return (
    <div className="min-h-screen bg-[var(--accent-2)] py-16 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--accent-11)] sm:text-5xl md:text-6xl">
            我們的服務
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-[var(--accent-11)]">
            提供全方位的物流運輸解決方案
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

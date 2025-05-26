import type { MetaDescriptor } from "@remix-run/node";

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
  type?: "website" | "article";
  locale?: string;
  twitterHandle?: string;
  author?: string;
}

const DEFAULT_CONFIG = {
  siteName: "卡菲斯國際",
  defaultTitle: "卡菲斯國際 | 專營中國日本菲律賓三地運輸",
  defaultDescription: "卡菲斯國際專營中國、日本、菲律賓三地運輸服務。提供專業貨運、物流配送、清關服務，安全快速，價格優惠。立即聯繫我們獲取報價！",
  defaultKeywords: "卡菲斯國際,中國運輸,日本運輸,菲律賓運輸,國際貨運,物流服務,清關服務,三地運輸,貨物配送",
  baseUrl: "https://www.kabayan.com.tw",
  defaultOgImage: "https://www.kabayan.com.tw/og-image.png",
  locale: "zh_TW",
  twitterHandle: "@kabayan",
  author: "卡菲斯國際",
};

export function generateSEOMeta(config: SEOConfig = {}): MetaDescriptor[] {
  const {
    title = DEFAULT_CONFIG.defaultTitle,
    description = DEFAULT_CONFIG.defaultDescription,
    keywords = DEFAULT_CONFIG.defaultKeywords,
    ogImage = DEFAULT_CONFIG.defaultOgImage,
    url = DEFAULT_CONFIG.baseUrl,
    type = "website",
    locale = DEFAULT_CONFIG.locale,
    twitterHandle = DEFAULT_CONFIG.twitterHandle,
    author = DEFAULT_CONFIG.author,
  } = config;

  // Create full title with site name if custom title provided
  const fullTitle = title === DEFAULT_CONFIG.defaultTitle 
    ? title 
    : `${title} | ${DEFAULT_CONFIG.siteName}`;

  return [
    // Basic Meta Tags
    { title: fullTitle },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "viewport", content: "width=device-width,initial-scale=1,viewport-fit=cover" },
    { name: "theme-color", content: "#ffffff" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    
    // Open Graph Meta Tags
    { property: "og:type", content: type },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:site_name", content: DEFAULT_CONFIG.siteName },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: `${DEFAULT_CONFIG.siteName} - ${title}` },
    { property: "og:locale", content: locale },
    
    // Twitter Card Meta Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { name: "twitter:image:alt", content: `${DEFAULT_CONFIG.siteName} - ${title}` },
    { name: "twitter:site", content: twitterHandle },
    { name: "twitter:creator", content: twitterHandle },
    { name: "twitter:url", content: url },
    { name: "twitter:locale", content: locale },
    
    // Additional SEO Meta Tags
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "author", content: author },
    { name: "language", content: locale },
    { name: "geo.region", content: "TW" },
    { name: "geo.placename", content: "Taiwan" },
    
    // Canonical URL
    { tagName: "link", rel: "canonical", href: url },
    
    // Favicon and Apple Touch Icons
    { tagName: "link", rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { tagName: "link", rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { tagName: "link", rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
    { tagName: "link", rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
    { tagName: "link", rel: "manifest", href: "/site.webmanifest" },
  ];
}

// Predefined page configurations for common pages
export const PAGE_SEO_CONFIGS = {
  home: {
    title: "卡菲斯國際 | 專營中國日本菲律賓三地運輸",
    description: "卡菲斯國際專營中國、日本、菲律賓三地運輸服務。提供專業貨運、物流配送、清關服務，安全快速，價格優惠。立即聯繫我們獲取報價！",
    url: "https://www.kabayan.com.tw",
  },
  aboutUs: {
    title: "關於我們 | 卡菲斯國際",
    description: "了解卡菲斯國際的企業理念、服務團隊與專業經驗。我們致力於提供最優質的中國、日本、菲律賓三地運輸服務。",
    url: "https://www.kabayan.com.tw/about-us",
  },
  services: {
    title: "服務項目 | 卡菲斯國際",
    description: "卡菲斯國際提供完整的國際運輸服務，包括海運、空運、快遞、清關等專業物流解決方案。",
    url: "https://www.kabayan.com.tw/services",
  },
  contactUs: {
    title: "聯絡我們 | 卡菲斯國際",
    description: "聯繫卡菲斯國際獲取專業運輸服務報價。我們提供24小時客服支援，為您解答所有物流需求。",
    url: "https://www.kabayan.com.tw/contact-us",
  },
} as const;

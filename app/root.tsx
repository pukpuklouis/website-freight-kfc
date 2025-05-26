import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  json,
} from "@remix-run/react";
import type {
  LinksFunction,
  MetaFunction,
  LoaderFunction,
} from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import "./tailwind.css";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "~/components/ThemeProvider";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { getThemeFromCookie, Theme } from "~/utils/theme";
import { getServiceLinks } from "~/utils/service-menu";
import { FAB } from "~/components/ui/fab-component";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "卡菲斯國際 | 專營中國日本菲律賓三地運輸" },
    {
      name: "description",
      content: "卡菲斯國際專營中國、日本、菲律賓三地運輸服務。提供專業貨運、物流配送、清關服務，安全快速，價格優惠。立即聯繫我們獲取報價！",
    },
    {
      name: "keywords",
      content: "卡菲斯國際,中國運輸,日本運輸,菲律賓運輸,國際貨運,物流服務,清關服務,三地運輸,貨物配送",
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,viewport-fit=cover",
    },
    { name: "theme-color", content: "#ffffff" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    
    // Open Graph Meta Tags
    { property: "og:type", content: "website" },
    { property: "og:title", content: "卡菲斯國際 | 專營中國日本菲律賓三地運輸" },
    {
      property: "og:description",
      content: "卡菲斯國際專營中國、日本、菲律賓三地運輸服務。提供專業貨運、物流配送、清關服務，安全快速，價格優惠。",
    },
    { property: "og:url", content: "https://www.kabayan.com.tw" },
    { property: "og:site_name", content: "卡菲斯國際" },
    { property: "og:image", content: "https://www.kabayan.com.tw/og-image.png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "卡菲斯國際 - 專營中國日本菲律賓三地運輸" },
    { property: "og:locale", content: "zh_TW" },
    
    // Twitter Card Meta Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "卡菲斯國際 | 專營中國日本菲律賓三地運輸" },
    {
      name: "twitter:description",
      content: "卡菲斯國際專營中國、日本、菲律賓三地運輸服務。提供專業貨運、物流配送、清關服務，安全快速，價格優惠。",
    },
    { name: "twitter:image", content: "https://www.kabayan.com.tw/og-image.png" },
    { name: "twitter:image:alt", content: "卡菲斯國際 - 專營中國日本菲律賓三地運輸" },
    { name: "twitter:site", content: "@kabayan" },
    { name: "twitter:creator", content: "@kabayan" },
    { name: "twitter:url", content: "https://www.kabayan.com.tw" },
    { name: "twitter:locale", content: "zh_TW" },
    
    // Additional SEO Meta Tags
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "author", content: "卡菲斯國際" },
    { name: "language", content: "zh-TW" },
    { name: "geo.region", content: "TW" },
    { name: "geo.placename", content: "Taiwan" },
    
    // Canonical URL
    { tagName: "link", rel: "canonical", href: "https://www.kabayan.com.tw" },
    
    // Favicon and Apple Touch Icons
    { tagName: "link", rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { tagName: "link", rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { tagName: "link", rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
    { tagName: "link", rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
    { tagName: "link", rel: "manifest", href: "/site.webmanifest" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getThemeFromCookie(request);
  const serviceLinks = await getServiceLinks();
  return json({ theme, serviceLinks });
};

export function ErrorBoundary() {
  return (
    <html lang="en" data-oid="_50tu_f">
      <head data-oid="uii0e:z">
        <title data-oid="oosgdn1">Oops! Something went wrong</title>
        <Meta data-oid="gi0vai7" />
        <Links data-oid=":na3lfy" />
      </head>
      <body className="h-full" data-oid="6a81.27">
        <ThemeProvider data-oid="noisnm-">
          <div
            className="flex min-h-screen flex-col items-center justify-center p-4"
            data-oid=":i3cwmg"
          >
            <h1 className="text-2xl font-bold" data-oid="lk5.itu">
              Oops! Something went wrong
            </h1>
            <p className="mt-4 text-gray-600" data-oid="s1_5g::">
              Please try refreshing the page
            </p>
          </div>
        </ThemeProvider>
        <Scripts data-oid="9h5uzye" />
      </body>
    </html>
  );
}

export default function App() {
  const { theme, serviceLinks } = useLoaderData<{ theme: Theme; serviceLinks: any }>();

  return (
    <html lang="zh-TW" className={theme} data-oid="x3:jcql">
      <head data-oid="kbb:8p:">
        <meta charSet="utf-8" data-oid="eby.pg_" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          data-oid="kyt110v"
        />

        <Meta data-oid="p6j67ls" />
        <Links data-oid="2ke.af5" />
      </head>
      <body className="h-full" data-oid="b554mn3">
        <ThemeProvider initialTheme={theme} data-oid="y1s3.lj">
          <div className="flex min-h-screen flex-col" data-oid="pezlp7z">
            <Header serviceLinks={serviceLinks} data-oid="suoq5h8" />
            <main className="flex-1" data-oid="w5u8f:a">
              <Outlet data-oid="4x6o1bc" />
              <FAB qrValue="https://line.me/R/ti/p/@217iielg" position="responsive" />
            </main>
            <Footer data-oid="5qaouwl" />
          </div>
        </ThemeProvider>
        <ScrollRestoration data-oid="i_jh419" />
        <Scripts data-oid="9hq3nn8" />
      </body>
    </html>
  );
}

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
import { generateSEOMeta, PAGE_SEO_CONFIGS } from "~/utils/seo";

export const GTM_ID = "GTM-KC6ZWC4B";


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
  return generateSEOMeta(PAGE_SEO_CONFIGS.home);
};

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getThemeFromCookie(request);
  const serviceLinks = await getServiceLinks();
  return json({ theme, serviceLinks });
};

export function ErrorBoundary() {
  return (
    <html lang="zh-TW" data-oid="_50tu_f">
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `
          }}
        />
      </head>
      <body className="h-full" data-oid="b554mn3">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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

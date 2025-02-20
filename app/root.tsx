import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
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
    { title: "KFC Freight" },
    {
      name: "description",
      content: "Welcome to KFC Freight!",
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,viewport-fit=cover",
    },
    { name: "theme-color", content: "#ffffff" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getThemeFromCookie(request);
  return { theme };
};

export function ErrorBoundary() {
  return (
    <html lang="en" data-oid="iefngxy">
      <head data-oid="x5ntvmf">
        <title data-oid=".3zhbib">Oops! Something went wrong</title>
        <Meta data-oid="i__ymyu" />
        <Links data-oid="cb1q.uq" />
      </head>
      <body className="h-full" data-oid="k5qk0p9">
        <ThemeProvider data-oid=".u:qgki">
          <div
            className="flex min-h-screen flex-col items-center justify-center p-4"
            data-oid="5771vla"
          >
            <h1 className="text-2xl font-bold" data-oid="v-g2:b1">
              Oops! Something went wrong
            </h1>
            <p className="mt-4 text-gray-600" data-oid="6l9o04z">
              Please try refreshing the page
            </p>
          </div>
        </ThemeProvider>
        <Scripts data-oid="o8_-bll" />
      </body>
    </html>
  );
}

export default function App() {
  const { theme } = useLoaderData<{ theme: Theme }>();

  return (
    <html lang="en" className={theme} data-oid="vbt7.78">
      <head data-oid="szwds9y">
        <meta charSet="utf-8" data-oid="4l_pvyl" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          data-oid="hi-:km:"
        />

        <Meta data-oid="79jf7l2" />
        <Links data-oid="17vcywx" />
      </head>
      <body className="h-full" data-oid="htv:pcd">
        <ThemeProvider initialTheme={theme} data-oid="8m1r7q0">
          <div className="flex min-h-screen flex-col" data-oid="s11tmn8">
            <Header data-oid="vbc055u" />
            <main className="flex-1" data-oid="8d5xens">
              <Outlet data-oid="hiu4ly3" />
            </main>
            <Footer data-oid="ti7khxe" />
          </div>
        </ThemeProvider>
        <ScrollRestoration data-oid="0n0p:2:" />
        <Scripts data-oid="c_5icx2" />
        <LiveReload data-oid=".44th_k" />
      </body>
    </html>
  );
}

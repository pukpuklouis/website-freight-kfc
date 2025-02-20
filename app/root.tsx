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
    <html lang="en" data-oid="x3aeuys">
      <head data-oid="vex29y:">
        <title data-oid="xpslwv8">Oops! Something went wrong</title>
        <Meta data-oid="41_vfk0" />
        <Links data-oid="7aoga57" />
      </head>
      <body className="h-full" data-oid="7hv2wkh">
        <ThemeProvider data-oid="yn0yy-n">
          <div
            className="flex min-h-screen flex-col items-center justify-center p-4"
            data-oid="5v_83_t"
          >
            <h1 className="text-2xl font-bold" data-oid="inho1-g">
              Oops! Something went wrong
            </h1>
            <p className="mt-4 text-gray-600" data-oid="csdri2r">
              Please try refreshing the page
            </p>
          </div>
        </ThemeProvider>
        <Scripts data-oid="63lta03" />
      </body>
    </html>
  );
}

export default function App() {
  const { theme } = useLoaderData<{ theme: Theme }>();

  return (
    <html lang="en" className={theme} data-oid="0o6ypxd">
      <head data-oid="56ktecs">
        <meta charSet="utf-8" data-oid="ii6qeo2" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          data-oid="3n4t761"
        />
        <Meta data-oid="y.um7ok" />
        <Links data-oid="eh6xncv" />
      </head>
      <body className="h-full" data-oid="1fjip0y">
        <ThemeProvider initialTheme={theme} data-oid="p9jmy06">
          <div className="flex min-h-screen flex-col" data-oid="wwdjo6h">
            <Header data-oid="zqtw-8z" />
            <main className="flex-1" data-oid="cvjuc8g">
              <Outlet data-oid="48-v-.h" />
            </main>
            <Footer data-oid="2hpnbs5" />
          </div>
        </ThemeProvider>
        <ScrollRestoration data-oid=":6muc6q" />
        <Scripts data-oid="51tnqj8" />
        <LiveReload data-oid="rxm:9e7" />
      </body>
    </html>
  );
}

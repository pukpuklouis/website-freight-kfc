import {
  Links,
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
    <html lang="en" data-oid="yzqnny1">
      <head data-oid="rgysxhn">
        <title data-oid="ttgpgam">Oops! Something went wrong</title>
        <Meta data-oid="pwuu4f6" />
        <Links data-oid="yn00ekg" />
      </head>
      <body className="h-full" data-oid="k:nz3c8">
        <ThemeProvider data-oid=":tc.9a4">
          <div
            className="flex min-h-screen flex-col items-center justify-center p-4"
            data-oid="gmpw344"
          >
            <h1 className="text-2xl font-bold" data-oid="ilgy1h8">
              Oops! Something went wrong
            </h1>
            <p className="mt-4 text-gray-600" data-oid="cu0hoih">
              Please try refreshing the page
            </p>
          </div>
        </ThemeProvider>
        <Scripts data-oid="h_4j:-c" />
      </body>
    </html>
  );
}

export default function App() {
  const { theme } = useLoaderData<{ theme: Theme }>();

  return (
    <html lang="en" className={theme} data-oid="yz0629g">
      <head data-oid="dscn-hm">
        <meta charSet="utf-8" data-oid="_5hmw_e" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          data-oid="b16uik_"
        />

        <Meta data-oid="u4hp9r8" />
        <Links data-oid="f8im8ch" />
      </head>
      <body className="h-full" data-oid="_i7uexq">
        <ThemeProvider initialTheme={theme} data-oid="ebi_9_r">
          <div className="flex min-h-screen flex-col" data-oid="e0gwi55">
            <Header data-oid="3n6q8dd" />
            <main className="flex-1" data-oid="6ia.izw">
              <Outlet data-oid="g9:4tp8" />
            </main>
            <Footer data-oid="_0ft88t" />
          </div>
        </ThemeProvider>
        <ScrollRestoration data-oid="6oe7rlr" />
        <Scripts data-oid="hwuf-uz" />
      </body>
    </html>
  );
}

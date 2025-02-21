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
    <html lang="en">
      <head>
        <title>Oops! Something went wrong</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
            <p className="mt-4 text-gray-600">Please try refreshing the page</p>
          </div>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { theme } = useLoaderData<{ theme: Theme }>();

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <ThemeProvider initialTheme={theme}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

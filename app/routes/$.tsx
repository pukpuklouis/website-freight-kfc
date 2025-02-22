import { useRouteError } from "@remix-run/react";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html data-oid="yf97is9">
      <head data-oid="in9a--n">
        <title data-oid="9b4ro0n">Oops!</title>
      </head>
      <body data-oid="9yw5v1b">
        <h1 data-oid="1wvulxa">App Error</h1>
        <p data-oid="9w1ls3u">Something went wrong!</p>
      </body>
    </html>
  );
}

export default function CatchAllRoute() {
  return (
    <div data-oid="gcpstyy">
      <h1 data-oid="5vtljzg">Not Found</h1>
      <p data-oid="f91zyse">
        Looks like you've hit a route that doesn't exist.
      </p>
    </div>
  );
}

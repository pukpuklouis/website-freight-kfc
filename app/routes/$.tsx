import { useRouteError } from "@remix-run/react";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html data-oid="21bf0br">
      <head data-oid="v:g2s3r">
        <title data-oid="k91em-5">Oops!</title>
      </head>
      <body data-oid="bi6l8s0">
        <h1 data-oid="7tq1n:i">App Error</h1>
        <p data-oid="sdvzcbp">Something went wrong!</p>
      </body>
    </html>
  );
}

export default function CatchAllRoute() {
  return (
    <div data-oid="d3xojf2">
      <h1 data-oid="sqgcrni">Not Found</h1>
      <p data-oid="7t9y.7m">
        Looks like you've hit a route that doesn't exist.
      </p>
    </div>
  );
}

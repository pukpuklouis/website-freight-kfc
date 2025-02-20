import { useRouteError } from "@remix-run/react";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html data-oid="lg.dduc">
      <head data-oid="6crult_">
        <title data-oid="xnko1ua">Oops!</title>
      </head>
      <body data-oid="23cdtlv">
        <h1 data-oid="f4l6xtr">App Error</h1>
        <p data-oid="8t59d_i">Something went wrong!</p>
      </body>
    </html>
  );
}

export default function CatchAllRoute() {
  return (
    <div data-oid="-jy0ej1">
      <h1 data-oid="b.d:zlu">Not Found</h1>
      <p data-oid="57uqgfl">
        Looks like you've hit a route that doesn't exist.
      </p>
    </div>
  );
}

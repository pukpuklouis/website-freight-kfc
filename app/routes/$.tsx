import { useRouteError } from "@remix-run/react";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html data-oid="65dv__1">
      <head data-oid="m7o30jk">
        <title data-oid="0mbbl_v">Oops!</title>
      </head>
      <body data-oid="nuw-0yb">
        <h1 data-oid="r.npgto">App Error</h1>
        <p data-oid="l7_ji:a">Something went wrong!</p>
      </body>
    </html>
  );
}

export default function CatchAllRoute() {
  return (
    <div data-oid="t1ynkf:">
      <h1 data-oid="y2bzaqq">Not Found</h1>
      <p data-oid="lpm448m">
        Looks like you've hit a route that doesn't exist.
      </p>
    </div>
  );
}

import { useRouteError } from "@remix-run/react";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oops!</title>
      </head>
      <body>
        <h1>App Error</h1>
        <p>Something went wrong!</p>
      </body>
    </html>
  );
}

export default function CatchAllRoute() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>Looks like you've hit a route that doesn't exist.</p>
    </div>
  );
}

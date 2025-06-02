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
        <h1 data-oid="7tq1n:i">應用程式錯誤</h1>
        <p data-oid="sdvzcbp">發生錯誤，請稍後再試。</p>
      </body>
    </html>
  );
}

import { Link } from "@remix-run/react";

export default function CatchAllRoute() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="text-9xl font-bold text-[var(--accent-9)]">404</div>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--accent-8)] sm:text-5xl">
            頁面不存在
          </h1>
          <p className="text-lg text-muted-foreground">
            您要找的頁面不存在或已被移動。
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-[var(--accent-9)] px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-[var(--accent-11)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            回到首頁
          </Link>
          <Link
            to="/contact-us"
            className="inline-flex items-center justify-center rounded-md border border-[var(--accent-6)] px-6 py-3 text-sm font-medium shadow-sm bg-[var(--accent-2)] transition-colors hover:bg-[var(--accent-3)] hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            聯絡我們
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-row gap-2 items-center justify-center">
          <p className="text-sm text-[var(--gray-11)]">
            需要幫助嗎？{' '}
          </p>
          <div className=" my-2 hover:scale-105 transition-all duration-300 ease-in-out">
            <Link to="/contact-us" className="text-sm text-[var(--accent-8)]">
              聯絡我們的客服
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

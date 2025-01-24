import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

// Define your redirects map
const REDIRECTS: Record<string, string> = {
  '/old-contact': '/contact',
  '/old-about': '/about',
  // Add more redirects as needed
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const path = url.pathname.toLowerCase();

  // Remove trailing slashes (except for the root path)
  if (path.length > 1 && path.endsWith('/')) {
    return redirect(path.slice(0, -1), 301);
  }

  // Check if we have a redirect for this path
  const redirectTo = REDIRECTS[path];
  if (redirectTo) {
    return redirect(redirectTo, 301);
  }

  // If no redirect is found, throw a 404
  throw new Response('Not Found', { status: 404 });
};

export default function CatchAllRoute() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="mt-4 text-gray-600">The page you're looking for doesn't exist.</p>
    </div>
  );
}

import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }

  const protocol = host.includes("localhost") ? "http" : "https";
  const domain = `${protocol}://${host}`;

  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${domain}/sitemap.xml

# Block access to admin or private areas (if any)
# Disallow: /admin
# Disallow: /private

# Crawl delay (optional - be respectful to search engines)
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      // Cache for 24 hours
      "Cache-Control": "public, max-age=86400",
    },
  });
}

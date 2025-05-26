import type { LoaderFunctionArgs } from "@remix-run/node";
import { readdir } from "fs/promises";
import { join } from "path";

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }

  const protocol = host.includes("localhost") ? "http" : "https";
  const domain = `${protocol}://${host}`;

  // Static routes from your app
  const staticRoutes: SitemapEntry[] = [
    {
      url: `${domain}/`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      url: `${domain}/about-us`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}/services`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: `${domain}/contact-us`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.7,
    },
  ];

  // Get dynamic service routes
  const dynamicRoutes = await getDynamicServiceRoutes(domain);
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemap = generateSitemap(allRoutes);

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      "encoding": "UTF-8",
      // Cache for 24 hours
      "Cache-Control": "public, max-age=86400",
    },
  });
}

function generateSitemap(routes: SitemapEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    return `  <url>
    <loc>${route.url}</loc>
    ${route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>` : ""}
    ${route.changefreq ? `    <changefreq>${route.changefreq}</changefreq>` : ""}
    ${route.priority ? `    <priority>${route.priority}</priority>` : ""}
  </url>`;
  })
  .join("\n")}
</urlset>`;
}

// Helper function to get dynamic service routes
async function getDynamicServiceRoutes(domain: string): Promise<SitemapEntry[]> {
  try {
    // Get all markdown files from content/service directory
    const contentDir = join(process.cwd(), "content", "service");
    const files = await readdir(contentDir);
    
    const serviceRoutes: SitemapEntry[] = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        // Remove .md extension to get the slug
        const slug = file.replace('.md', '');
        return {
          url: `${domain}/service/${slug}`,
          lastmod: new Date().toISOString(),
          changefreq: "monthly" as const,
          priority: 0.7,
        };
      });

    return serviceRoutes;
  } catch (error) {
    console.error("Error reading service files:", error);
    return [];
  }
}

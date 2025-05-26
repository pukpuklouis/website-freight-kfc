import type { LoaderFunctionArgs } from "@remix-run/node";

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
    {
      url: `${domain}/vision-roadmap`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.6,
    },
  ];

  // You can add dynamic routes here in the future
  // For example, if you have blog posts or services from a database:
  // const dynamicRoutes = await getDynamicRoutes(domain);
  // const allRoutes = [...staticRoutes, ...dynamicRoutes];
  
  const allRoutes = staticRoutes;

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

// Helper function for future dynamic content
// async function getDynamicRoutes(domain: string): Promise<SitemapEntry[]> {
//   // Example: Fetch blog posts, services, or other dynamic content
//   // const posts = await db.post.findMany({ where: { published: true } });
//   // return posts.map(post => ({
//   //   url: `${domain}/blog/${post.slug}`,
//   //   lastmod: post.updatedAt.toISOString(),
//   //   changefreq: "weekly" as const,
//   //   priority: 0.6,
//   // }));
//   return [];
// }

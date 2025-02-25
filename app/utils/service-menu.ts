import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

export interface ServiceLink {
  title: string;
  url: string;
}

const APP_DIR = join(process.cwd(), "app");
const ROUTES_DIR = join(APP_DIR, "routes");

export async function getServiceLinks(): Promise<ServiceLink[]> {
  try {
    // Read all MDX files in the routes directory
    const files = await readdir(ROUTES_DIR);
    const mdxFiles = files.filter(file => 
      file.endsWith(".mdx") && 
      file.startsWith("service.") && 
      !file.startsWith("_")
    );

    const serviceLinks = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = join(ROUTES_DIR, file);
        const content = await readFile(filePath, "utf-8");
        const { data } = matter(content);

        if (!data.title) {
          console.warn(`Missing title in ${file}`);
          return null;
        }

        // Convert filename to route path
        // e.g., "service.china-shipping.mdx" -> "/service/china-shipping"
        const url = file
          .replace(/\.mdx$/, '')  // Remove .mdx extension
          .replace(/^service\./, 'service/');  // Convert service. prefix to service/

        return {
          title: data.title,
          url: `/${url}`,
        };
      })
    );

    return serviceLinks
      .filter((link): link is ServiceLink => link !== null)
      .sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error reading service links:", error);
    return [];
  }
}

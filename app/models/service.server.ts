import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

export interface ServiceMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
}

export interface ServiceLink {
  title: string;
  url: string;
}

const APP_DIR = join(process.cwd(), "app");
const ROUTES_DIR = join(APP_DIR, "routes");

export async function getServiceMeta(slug: string): Promise<ServiceMeta | null> {
  try {
    const filePath = join(ROUTES_DIR, `${slug}.mdx`);
    const source = await readFile(filePath, "utf-8");
    const { data } = matter(source);
    
    // Validate the required fields
    if (!data.title || !data.description || !data.date || !Array.isArray(data.tags)) {
      console.error(`Invalid service metadata in ${slug}.mdx`);
      return null;
    }
    
    return {
      title: String(data.title),
      description: String(data.description),
      date: String(data.date),
      tags: data.tags.map(String),
      image: data.image ? String(data.image) : undefined
    };
  } catch (error) {
    console.error(`Error reading service metadata for ${slug}:`, error);
    return null;
  }
}

export async function getAllServiceLinks(): Promise<ServiceLink[]> {
  try {
    const files = await readdir(ROUTES_DIR);
    const mdxFiles = files.filter(file => 
      file.endsWith(".mdx") && 
      file.startsWith("services.") && 
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
        // e.g., "services.china-shipping.mdx" -> "/services/china-shipping"
        const routePath = file
          .replace(/\.mdx$/, '')  // Remove .mdx extension
          .split('.')             // Split by dots
          .join('/');            // Join with slashes

        return {
          title: data.title,
          url: `/${routePath}`,
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

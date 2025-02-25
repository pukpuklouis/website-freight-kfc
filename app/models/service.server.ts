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

const CONTENT_DIR = join(process.cwd(), "content");
const SERVICE_DIR = join(CONTENT_DIR, "service");

export async function getServiceMeta(slug: string): Promise<ServiceMeta | null> {
  try {
    const filePath = join(SERVICE_DIR, `${slug}.md`);
    const source = await readFile(filePath, "utf-8");
    const { data } = matter(source);
    
    // Validate the required fields
    if (!data.title || !data.description || !data.date || !Array.isArray(data.tags)) {
      console.error(`Invalid service metadata in ${slug}.md`);
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
    const files = await readdir(SERVICE_DIR);
    const mdFiles = files.filter(file => file.endsWith(".md"));

    const serviceLinks = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = join(SERVICE_DIR, file);
        const content = await readFile(filePath, "utf-8");
        const { data } = matter(content);

        if (!data.title) {
          console.warn(`Missing title in ${file}`);
          return null;
        }

        // Remove the .md extension to get the slug
        const slug = file.replace(/\.md$/, "");

        return {
          title: data.title,
          url: `/service/${slug}`,
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

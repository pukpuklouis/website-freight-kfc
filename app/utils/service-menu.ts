import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

export interface ServiceLink {
  title: string;
  url: string;
}

const CONTENT_DIR = join(process.cwd(), "content");
const SERVICE_DIR = join(CONTENT_DIR, "service");

export async function getServiceLinks(): Promise<ServiceLink[]> {
  try {
    // Read all MD files in the content/service directory
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

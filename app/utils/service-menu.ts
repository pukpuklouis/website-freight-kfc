import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

export interface ServiceLink {
  title: string;
  url: string;
}

const CONTENT_DIR = join(process.cwd(), "content");
const SERVICES_DIR = join(CONTENT_DIR, "services");

export async function getServiceLinks(): Promise<ServiceLink[]> {
  // Read all MDX files in the services directory
  const files = await readdir(SERVICES_DIR);
  const mdxFiles = files.filter(file => file.endsWith(".mdx") && !file.startsWith("_"));

  const serviceLinks: ServiceLink[] = [];

  for (const file of mdxFiles) {
    const filePath = join(SERVICES_DIR, file);
    const content = await readFile(filePath, "utf-8");
    const { data } = matter(content);

    if (data.title) {
      serviceLinks.push({
        title: data.title,
        url: `/services/${file.replace(".mdx", "")}`,
      });
    }
  }

  // Sort by title
  return serviceLinks.sort((a, b) => a.title.localeCompare(b.title));
}

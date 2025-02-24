import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

export interface ServiceMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface ServiceLink {
  title: string;
  url: string;
}

const CONTENT_DIR = join(process.cwd(), "content");
const SERVICES_DIR = join(CONTENT_DIR, "services");

export async function getServiceMeta(slug: string): Promise<ServiceMeta | null> {
  try {
    const filePath = join(SERVICES_DIR, `${slug}.mdx`);
    const source = await readFile(filePath, "utf-8");
    const { data } = matter(source);
    return data as ServiceMeta;
  } catch {
    return null;
  }
}

export async function getAllServiceLinks(): Promise<ServiceLink[]> {
  const files = await readdir(SERVICES_DIR);
  const mdxFiles = files.filter(file => 
    file.endsWith(".mdx") && !file.startsWith("_")
  );

  const serviceLinks = await Promise.all(
    mdxFiles.map(async (file) => {
      const meta = await getServiceMeta(file.replace(".mdx", ""));
      if (!meta?.title) return null;
      
      return {
        title: meta.title,
        url: `/services/${file.replace(".mdx", "")}`,
      };
    })
  );

  return serviceLinks
    .filter((link): link is ServiceLink => link !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

import matter from "gray-matter";

export interface ServiceLink {
  title: string;
  url: string;
}

export async function getServiceLinks(): Promise<ServiceLink[]> {
  try {
    // Use import.meta.glob to load all markdown files
    const mdModules = import.meta.glob<string>("/content/service/*.md", { 
      query: '?raw',
      import: 'default'
    });

    const serviceLinks = await Promise.all(
      Object.entries(mdModules).map(async ([path, loadContent]) => {
        try {
          const content = await loadContent();
          const { data } = matter(content);

          if (!data.title) {
            console.warn(`Missing title in ${path}`);
            return null;
          }

          // Extract slug from file path
          const slug = path.replace('/content/service/', '').replace('.md', '');

          return {
            title: data.title,
            url: `/service/${slug}`,
          };
        } catch (error) {
          console.error(`Error processing ${path}:`, error);
          return null;
        }
      })
    );

    // Filter out any null entries and sort by title
    return serviceLinks
      .filter((link): link is ServiceLink => link !== null)
      .sort((a, b) => a.title.localeCompare(b.title));

  } catch (error) {
    console.error("Error reading service links:", error);
    return [];
  }
}

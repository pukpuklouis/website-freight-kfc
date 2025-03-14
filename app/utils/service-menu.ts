import matter from "gray-matter";

export interface ServiceMatter {
  title: string;
  order?: number;
  date?: string;
  [key: string]: any;  // Allow additional frontmatter fields
}

export interface ServiceLink {
  title: string;
  url: string;
  order?: number;
  date?: string;
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
          const { data } = matter(content) as { data: ServiceMatter };

          if (!data.title) {
            console.warn(`Missing title in ${path}`);
            return null;
          }

          // Extract slug from file path
          const slug = path.replace('/content/service/', '').replace('.md', '');

          return {
            title: data.title,
            url: `/service/${slug}`,
            order: data.order,
            date: data.date
          };
        } catch (error) {
          console.error(`Error processing ${path}:`, error);
          return null;
        }
      })
    );

    // Filter out any null entries and sort by order, date, then title
    return serviceLinks
      .filter((link): link is ServiceLink => link !== null)
      .sort((a, b) => {
        // First sort by order if available
        if (typeof a.order === 'number' && typeof b.order === 'number') {
          return a.order - b.order;
        }
        // Then sort by date if available
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        // Finally sort by title
        return a.title.localeCompare(b.title);
      });

  } catch (error) {
    console.error("Error reading service links:", error);
    return [];
  }
}

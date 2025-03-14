import matter from "gray-matter";

export interface ServiceMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
}

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

export async function getServiceMeta(slug: string): Promise<ServiceMeta | null> {
  try {
    const mdModules = import.meta.glob<string>("/content/service/*.md", { 
      query: '?raw',
      import: 'default'
    });

    const matchingPath = `/content/service/${slug}.md`;
    const loadContent = mdModules[matchingPath];

    if (!loadContent) {
      console.error(`No matching service found for slug: ${slug}`);
      return null;
    }

    const source = await loadContent();
    const { data } = matter(source);
    
    // Validate the required fields
    if (!data.title || !data.description || !data.date || !Array.isArray(data.tags)) {
      console.error(`Invalid service metadata in ${slug}.md`);
      return null;
    }

    return {
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags,
      image: data.image,
    };
  } catch (error) {
    console.error(`Error reading service metadata for ${slug}:`, error);
    return null;
  }
}

export async function getAllServiceLinks(): Promise<ServiceLink[]> {
  try {
    const mdModules = import.meta.glob<string>("/content/service/*.md", { 
      query: '?raw',
      import: 'default'
    });

    const serviceLinks = await Promise.all(
      Object.entries(mdModules).map(async ([path, loadContent]) => {
        try {
          const source = await loadContent();
          const matterResult = matter(source);
          const data = matterResult.data as ServiceMatter;

          if (!data.title) {
            console.warn(`Missing title in ${path}`);
            return null;
          }

          // Extract slug from file path
          const slug = path.replace('/content/service/', '').replace('.md', '');

          const link: ServiceLink = {
            title: data.title,
            url: `/service/${slug}`,
            order: data.order,
            date: data.date
          };

          return link;
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

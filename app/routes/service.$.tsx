import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import styles from "~/styles/markdown.css";
import { markdownComponents } from "~/components/MarkdownComponents";

interface LoaderData {
  content: string;
  frontmatter: {
    title: string;
    description?: string;
    date: string;
    tags: string[];
    image?: string;
  };
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const slug = params["*"];
    
    // Use import.meta.glob to load markdown content
    const mdModules = import.meta.glob<string>("/content/service/*.md", { 
      query: '?raw',
      import: 'default'
    });

    const matchingPath = `/content/service/${slug}.md`;
    const loadContent = mdModules[matchingPath];

    if (!loadContent) {
      throw new Error(`No matching service found for slug: ${slug}`);
    }

    const source = await loadContent();
    const { content, data } = matter(source);

    return json<LoaderData>({
      content,
      frontmatter: {
        title: String(data.title),
        description: String(data.description),
        date: String(data.date),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        image: data.image ? String(data.image) : undefined
      },
    });
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function ServiceRoute() {
  const { content, frontmatter } = useLoaderData<LoaderData>();

  return (
    <div className="max-w-4xl mx-auto px-4 py-40">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
        {frontmatter.description && (
          <p className="text-xl text-gray-600">{frontmatter.description}</p>
        )}
        {frontmatter.image && (
          <img
            src={frontmatter.image}
            alt={frontmatter.title}
            className="w-full h-64 object-cover rounded-lg mt-6"
          />
        )}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex gap-2 mt-4">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <article className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}

// Add error boundary
export function ErrorBoundary() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-red-600">Service Not Found</h1>
      <p className="mt-2">Sorry, we couldn't find the service you're looking for.</p>
    </div>
  );
}

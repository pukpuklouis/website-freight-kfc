import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getServiceMeta } from "~/models/service.server";
import { motion } from "framer-motion";

interface LoaderData {
  meta: {
    title: string;
    description: string;
    date: string;
    tags: string[];
    image?: string;
  };
  mdxModule: any;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params["*"];
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  // Construct the full path for the MDX file
  const fullSlug = `service.${slug}`;
  const meta = await getServiceMeta(fullSlug);
  if (!meta) {
    throw new Response("Not Found", { status: 404 });
  }

  // Import the MDX file
  const mdxModule = await import(`~/routes/service.${slug}.mdx`);

  return json<LoaderData>({ meta, mdxModule });
};

export default function ServiceLayout() {
  const { meta, mdxModule } = useLoaderData<typeof loader>();
  const MDXContent = mdxModule.default;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Hero Section */}
      <div className="mb-8">
        {meta.image && (
          <div className="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden">
            <img
              src={meta.image}
              alt={meta.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4 text-[var(--gray-12)]">
          {meta.title}
        </h1>
        <p className="text-xl text-[var(--gray-11)] mb-4">
          {meta.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1 text-sm bg-[var(--accent-4)] text-[var(--accent-11)] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* MDX Content */}
      <div className="prose prose-lg max-w-none">
        <MDXContent />
      </div>
    </motion.article>
  );
}

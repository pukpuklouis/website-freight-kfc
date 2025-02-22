import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
  Link,
} from "@remix-run/react";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { useMemo } from "react";
import invariant from "tiny-invariant";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import React from "react";
import type { Root } from "mdast";

// Types
interface MDXComponentProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

interface MDXWrapperProps {
  components?: Record<string, React.ComponentType<MDXComponentProps>>;
  [key: string]: any;
}

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  image?: string;
  tags: string[];
}

const CONTENT_DIR = join(process.cwd(), "content", "services");

// Meta function for setting page metadata
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "服務不存在 | KFC Freight" },
      { name: "description", content: "找不到您要查看的服務" },
    ];
  }

  const { frontmatter } = data;
  return [
    { title: `${frontmatter.title} | KFC Freight` },
    { name: "description", content: frontmatter.description },
  ];
};

// Loader with basic error handling
export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.slug, "服務 ID 是必需的");

  try {
    const rawSource = await readFile(
      join(CONTENT_DIR, `${params.slug}.mdx`),
      "utf-8",
    );

    // Extract frontmatter and content
    const lines = rawSource.split('\n');
    let inFrontmatter = false;
    let mdxContent = '';
    let yamlContent = '';

    for (const line of lines) {
      if (line.trim() === '---') {
        inFrontmatter = !inFrontmatter;
        continue;
      }
      if (inFrontmatter) {
        yamlContent += line + '\n';
      } else {
        mdxContent += line + '\n';
      }
    }

    console.log("Reading MDX file:", params.slug);
    const { code, frontmatter } = await bundleMDX<Frontmatter>({
      source: mdxContent,
      cwd: CONTENT_DIR,
      mdxOptions(options) {
        options.remarkPlugins = [remarkGfm];
        options.rehypePlugins = [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ];
        return options;
      },
      esbuildOptions(options) {
        options.target = "es2020";
        options.platform = "neutral";
        options.format = "iife";
        options.bundle = true;
        options.write = false;
        options.minify = false;
        options.sourcemap = false;
        options.metafile = false;
        options.outdir = undefined;
        options.splitting = false;
        options.define = {
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        };
        return options;
      },
    });
    console.log("MDX bundling successful");

    if (!frontmatter || typeof frontmatter !== "object") {
      throw new Error("Invalid or missing frontmatter");
    }

    return json({ code, frontmatter });
  } catch (error) {
    console.error("MDX bundling error:", error);
    throw json({ message: "無法載入服務內容" }, { status: 404 });
  }
};

// Error Boundary Component
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="container mx-auto px-4 py-20" data-oid="7cvm91.">
      <div className="max-w-2xl mx-auto text-center" data-oid="vza15zr">
        <h1
          className="text-4xl font-bold mb-4 text-[var(--accent-11)]"
          data-oid="6w2rk:k"
        >
          {isRouteErrorResponse(error) ? "找不到服務" : "發生錯誤"}
        </h1>
        <p className="text-xl text-[var(--gray-11)] mb-8" data-oid="u1_xkly">
          {isRouteErrorResponse(error) ? error.data.message : "請稍後再試"}
        </p>
        <Link
          to="/services"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[var(--accent-9)] hover:bg-[var(--accent-10)] rounded-lg transition-colors"
          data-oid="xrgn3-5"
        >
          返回服務列表
        </Link>
      </div>
    </div>
  );
}

// Main Page Component
export default function ServicePage() {
  const { code, frontmatter } = useLoaderData<typeof loader>();
  const Component = useMemo(() => {
    try {
      return getMDXComponent(code, {
        useMDXComponents: () => ({
          wrapper: ({ children }: { children: React.ReactNode }) => (
            <div className="mdx-content" data-oid="sgthr1_">
              {children}
            </div>
          ),
        }),
      });
    } catch (error) {
      console.error("Error creating MDX component:", error);
      return () => <div data-oid="_ze0txk">Error rendering content</div>;
    }
  }, [code]);

  return (
    <article className="min-h-screen bg-[var(--gray-1)] pt-8" data-oid="jwc-6_p">
      <div className="max-w-5xl mx-auto px-4" data-oid="oy:jtb6">
        {/* Hero Image Section */}
        {frontmatter.image && (
          <div
            className="relative h-[400px] mx-auto overflow-hidden rounded-xl mb-8"
            data-oid="cby5uy-"
          >
            <img
              src={frontmatter.image}
              alt={frontmatter.title}
              className="w-full h-full object-cover"
              data-oid="3gkiakx"
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              data-oid="a05_rw."
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4" data-oid="ho7dvn8">
          {/* Content Card */}
          <div
            className={`bg-white rounded-2xl shadow-xl p-8 md:p-12 relative z-10 ${
              frontmatter.image ? '-mt-16' : 'mt-8'
            }`}
            data-oid="cq8gbtw"
          >
            {/* Header */}
            <header className="mb-12 not-prose" data-oid="xrh::g-">
              <h1
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--accent-11)] to-[var(--accent-9)] bg-clip-text text-transparent"
                data-oid="uskaxxy"
              >
                {frontmatter.title}
              </h1>
              {frontmatter.description && (
                <p className="text-xl text-[var(--gray-11)]" data-oid="glw6_x4">
                  {frontmatter.description}
                </p>
              )}
            </header>

            {/* MDX Content */}
            <div className="prose prose-lg max-w-none" data-oid="oarlhbc">
              <Component
                components={{
                  // Override default markdown components
                  h1: ({ children, ...props }: MDXComponentProps) => (
                    <h1
                      {...props}
                      className="text-3xl font-bold mb-6 text-[var(--gray-12)]"
                      data-oid="-f:n1f-"
                    >
                      {children}
                    </h1>
                  ),

                  h2: ({ children, ...props }: MDXComponentProps) => (
                    <h2
                      {...props}
                      className="text-2xl font-semibold mb-4 text-[var(--accent-11)]"
                      data-oid="aj.xwaa"
                    >
                      {children}
                    </h2>
                  ),

                  p: ({ children, ...props }: MDXComponentProps) => (
                    <p
                      {...props}
                      className="mb-6 text-[var(--gray-11)] leading-relaxed"
                      data-oid="onn_3a_"
                    >
                      {children}
                    </p>
                  ),

                  ul: ({ children, ...props }) => (
                    <ul
                      {...props}
                      className="mb-6 list-disc pl-6 space-y-2"
                      data-oid="ymr28lf"
                    >
                      {children}
                    </ul>
                  ),

                  ol: ({ children, ...props }) => (
                    <ol
                      {...props}
                      className="mb-6 list-decimal pl-6 space-y-2"
                      data-oid="znbwz4h"
                    >
                      {children}
                    </ol>
                  ),

                  li: ({ children, ...props }) => (
                    <li
                      {...props}
                      className="text-[var(--gray-11)]"
                      data-oid="tq4fy3y"
                    >
                      {children}
                    </li>
                  ),

                  table: ({ children, ...props }) => (
                    <div
                      className="my-8 overflow-hidden border border-[var(--gray-6)] rounded-lg"
                      data-oid="6chm4-3"
                    >
                      <div className="overflow-x-auto" data-oid="x0zbpu0">
                        <table
                          {...props}
                          className="min-w-full divide-y divide-[var(--gray-6)]"
                          data-oid="5dwv6nd"
                        >
                          {children}
                        </table>
                      </div>
                    </div>
                  ),

                  thead: ({ children, ...props }) => (
                    <thead
                      {...props}
                      className="bg-[var(--gray-2)]"
                      data-oid="zdm3:j_"
                    >
                      {children}
                    </thead>
                  ),

                  th: ({ children, ...props }) => (
                    <th
                      {...props}
                      className="px-6 py-4 text-left text-sm font-semibold text-[var(--gray-12)] whitespace-nowrap"
                      data-oid="a0lkr5x"
                    >
                      {children}
                    </th>
                  ),

                  td: ({ children, ...props }) => (
                    <td
                      {...props}
                      className="px-6 py-4 text-sm text-[var(--gray-11)] border-t border-[var(--gray-4)] whitespace-nowrap"
                      data-oid="mdcyc9z"
                    >
                      {children}
                    </td>
                  ),

                  hr: (props) => (
                    <hr
                      {...props}
                      className="my-8 border-t border-[var(--gray-6)]"
                      data-oid=".nw6408"
                    />
                  ),

                  strong: ({ children, ...props }) => (
                    <strong
                      {...props}
                      className="font-semibold text-[var(--gray-12)]"
                      data-oid="mneqnx4"
                    >
                      {children}
                    </strong>
                  ),

                  a: ({ children, ...props }) => (
                    <a
                      {...props}
                      className="text-[var(--accent-11)] hover:text-[var(--accent-10)] underline transition-colors"
                      data-oid="ulsv8w7"
                    >
                      {children}
                    </a>
                  ),
                }}
                data-oid="1ksfr9g"
              />
            </div>

            {/* Footer */}
            <footer
              className="mt-12 pt-6 border-t border-[var(--gray-6)] not-prose"
              data-oid=".bcwzk2"
            >
              <div
                className="flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--gray-11)]"
                data-oid="vzcnyp7"
              >
                <p data-oid="1n0hq4v">最後更新: {frontmatter.date}</p>
                {frontmatter.tags && frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2" data-oid=".q3see.">
                    {(frontmatter.tags as string[]).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-[var(--accent-3)] text-[var(--accent-11)]"
                        data-oid="7zidl8s"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}

import { json, type LoaderFunctionArgs, type MetaFunction, type LinksFunction } from "@remix-run/node";
import { useLoaderData, useRouteError, isRouteErrorResponse, Link } from "@remix-run/react";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import { readFile } from "fs/promises";
import { join } from "path";
import { useMemo } from "react";
import invariant from "tiny-invariant";
import * as runtime from "react/jsx-runtime";
import { motion } from "framer-motion";

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  image?: string;
  tags?: string[];
}

interface LoaderData {
  code: string;
  frontmatter: Frontmatter;
  slug: string;
  structuredData: any;
}

export const links: LinksFunction = () => {
  return [
    {
      rel: "alternate",
      type: "application/json+ld",
      href: "/services.jsonld"
    }
  ];
};

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  if (!data) {
    return [
      { title: "服務不存在 | KFC Freight" },
      { description: "找不到您要查看的服務" },
      { "robots": "noindex" }
    ];
  }

  const { frontmatter, slug } = data;
  const canonicalUrl = `https://kfc-freight.com${location.pathname}`;
  
  return [
    { title: `${frontmatter.title} | KFC Freight` },
    { description: frontmatter.description },
    { "og:title": frontmatter.title },
    { "og:description": frontmatter.description },
    { "og:url": canonicalUrl },
    { "og:type": "article" },
    { "og:site_name": "KFC Freight" },
    { "og:locale": "zh_TW" },
    ...(frontmatter.image ? [
      { "og:image": frontmatter.image },
      { "og:image:alt": frontmatter.title },
      { "twitter:image": frontmatter.image },
      { "twitter:card": "summary_large_image" }
    ] : []),
    { "twitter:title": frontmatter.title },
    { "twitter:description": frontmatter.description },
    { "twitter:site": "@KFCFreight" },
    { "article:published_time": frontmatter.date },
    ...(frontmatter.tags ? frontmatter.tags.map(tag => ({
      "article:tag": tag
    })) : []),
    { "keywords": frontmatter.tags?.join(", ") },
    { canonical: canonicalUrl }
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  invariant(params.slug, "Expected params.slug");
  
  try {
    const filePath = join(process.cwd(), "app", "components", "posts", `${params.slug}.mdx`);
    const source = await readFile(filePath, "utf-8");

    const { code, frontmatter } = await bundleMDX<Frontmatter>({
      source,
      cwd: join(process.cwd(), "app", "components", "posts"),
      mdxOptions(options) {
        options.remarkPlugins = [...(options.remarkPlugins ?? [])];
        options.rehypePlugins = [...(options.rehypePlugins ?? [])];
        return options;
      },
      esbuildOptions(options) {
        options.target = 'es2020';
        return options;
      },
    });

    if (!frontmatter || !code) {
      throw json("無效的服務內容", { status: 500 });
    }

    // Generate JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: frontmatter.title,
      description: frontmatter.description,
      image: frontmatter.image,
      datePublished: frontmatter.date,
      author: {
        "@type": "Organization",
        name: "KFC Freight",
        url: "https://kfc-freight.com"
      },
      publisher: {
        "@type": "Organization",
        name: "KFC Freight",
        logo: {
          "@type": "ImageObject",
          url: "https://kfc-freight.com/images/logo.png"
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://kfc-freight.com/services/${params.slug}`
      },
      keywords: frontmatter.tags?.join(", ")
    };

    return json<LoaderData>({ 
      code, 
      frontmatter,
      slug: params.slug,
      structuredData
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("ENOENT")) {
      throw json(`找不到服務 '${params.slug}'`, { status: 404 });
    }
    console.error("處理 MDX 時發生錯誤:", error);
    throw json("載入服務時發生錯誤", { status: 500 });
  }
}

function MDXContent({ code }: { code: string }) {
  const Component = useMemo(() => {
    try {
      return getMDXComponent(code, { ...runtime });
    } catch (error) {
      console.error("建立 MDX 元件時發生錯誤:", error);
      throw new Error("無法渲染內容");
    }
  }, [code]);

  return <Component />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isRouteErrorResponse(error) ? (
            <>
              <h1 className="text-4xl font-bold mb-4 text-[var(--accent-11)]">
                {error.status === 404 ? "服務不存在" : "出現錯誤"}
              </h1>
              <p className="text-xl text-[var(--gray-11)] mb-8">
                {error.data}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-4 text-[var(--accent-11)]">
                系統錯誤
              </h1>
              <p className="text-xl text-[var(--gray-11)] mb-8">
                請稍後再試或聯繫我們的支援團隊
              </p>
            </>
          )}
          
          <Link 
            to="/services" 
            className="inline-flex items-center px-6 py-3 bg-[var(--accent-9)] text-white rounded-lg hover:bg-[var(--accent-10)] transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            返回服務列表
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function ServicePage() {
  const { code, frontmatter, structuredData } = useLoaderData<typeof loader>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          {frontmatter.image && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative h-[400px] mb-8 rounded-2xl overflow-hidden"
            >
              <img 
                src={frontmatter.image} 
                alt={frontmatter.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          )}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-5xl font-bold text-[var(--accent-11)]">
              {frontmatter.title}
            </h1>
            
            {frontmatter.description && (
              <p className="text-xl text-[var(--gray-11)]">
                {frontmatter.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--gray-10)]">
              {frontmatter.date && (
                <time dateTime={frontmatter.date}>
                  {new Date(frontmatter.date).toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              
              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-[var(--accent-3)] text-[var(--accent-11)] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <div className="prose-headings:text-[var(--accent-11)] prose-p:text-[var(--gray-11)] prose-strong:text-[var(--gray-12)] prose-a:text-[var(--accent-11)] hover:prose-a:text-[var(--accent-10)] prose-code:text-[var(--accent-11)] prose-code:bg-[var(--accent-3)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[var(--accent-3)] prose-table:w-full prose-table:border-collapse prose-td:border prose-td:border-[var(--gray-6)] prose-td:p-2 prose-th:border prose-th:border-[var(--gray-6)] prose-th:p-2 prose-th:bg-[var(--accent-3)] prose-th:text-[var(--accent-11)] prose-blockquote:border-l-[var(--accent-6)] prose-blockquote:text-[var(--gray-11)] prose-blockquote:bg-[var(--accent-2)] prose-blockquote:py-1 prose-hr:border-[var(--gray-6)]">
            <MDXContent code={code} />
          </div>
        </motion.div>
      </article>
    </motion.div>
  );
}
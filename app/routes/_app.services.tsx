import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { motion, AnimatePresence } from "framer-motion";
import matter from "gray-matter";

// Types
interface ServiceMeta {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  tags: string[];
}

interface LoaderData {
  services: ServiceMeta[];
}

// Constants
const APP_DIR = join(process.cwd(), "app");
const ROUTES_DIR = join(APP_DIR, "routes");

export const loader = async () => {
  try {
    const files = await readdir(ROUTES_DIR);
    const mdxFiles = files.filter(
      (file) => file.endsWith(".mdx") && !file.startsWith("_"),
    );

    const services = await Promise.all(
      mdxFiles.map(async (filename) => {
        try {
          const filePath = join(ROUTES_DIR, filename);
          const source = await readFile(filePath, "utf-8");
          const { data } = matter(source);

          // Validate required frontmatter fields
          if (!data.title || !data.description || !data.date) {
            console.warn(`Missing required frontmatter in ${filename}. Required fields: title, description, date`);
            return null;
          }

          // Convert filename to route path
          // e.g., "services.china-shipping.mdx" -> "/services/china-shipping"
          const routePath = filename
            .replace(/\.mdx$/, '')  // Remove .mdx extension
            .split('.')             // Split by dots
            .join('/');            // Join with slashes

          // Type check the data
          const service: ServiceMeta = {
            slug: routePath,
            title: String(data.title),
            description: String(data.description),
            image: data.image ? String(data.image) : "",
            date: String(data.date),
            tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          };

          return service;
        } catch (error) {
          console.error(`Error processing ${filename}:`, error);
          return null;
        }
      }),
    );

    // Filter out any null values and sort by date
    const validServices = services
      .filter((service): service is ServiceMeta => service !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return json<LoaderData>({ services: validServices });
  } catch (error) {
    console.error("Error loading services:", error);
    return json<LoaderData>({ services: [] });
  }
};

export default function Services() {
  const { services } = useLoaderData<typeof loader>();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const overlayVariants = {
    hover: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[var(--accent-2)] to-transparent"
      data-oid="7r_hln6"
    >
      <div className="container mx-auto px-4 py-40" data-oid="0n:yt52">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          data-oid="e6kpo8u"
        >
          <h1
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-11)] to-[var(--accent-9)]"
            data-oid="tbllho."
          >
            我們的服務
          </h1>
          <p
            className="text-lg md:text-xl text-[var(--gray-11)] max-w-2xl mx-auto leading-relaxed"
            data-oid="hef:c5z"
          >
            全方位的物流解決方案，為您的業務提供最佳支持
          </p>
        </motion.div>

        {services.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
            data-oid="67zst:d"
          >
            <p className="text-[var(--gray-11)] text-xl" data-oid="3z4ih_5">
              目前沒有可用的服務資訊
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-oid="j730ecj"
          >
            {services.map((service) => (
              <motion.div
                key={service.slug}
                variants={item}
                className="group relative bg-gradient-to-b from-[var(--accent-1)] to-[var(--accent-2)] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                data-oid="xfyfduv"
              >
                <Link to={`/${service.slug}`} className="block" data-oid="_95w5up">
                  {service.image ? (
                    <div
                      className="relative h-48 overflow-hidden"
                      data-oid="wdf50d8"
                    >
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        variants={imageVariants}
                        whileHover="hover"
                        data-oid="lbe4540"
                      />

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                        variants={overlayVariants}
                        whileHover="hover"
                        data-oid="jhdzo70"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-48 bg-gradient-to-br from-[var(--accent-3)] to-[var(--accent-4)] flex items-center justify-center"
                      data-oid="eqlr41h"
                    >
                      <span
                        className="text-[var(--accent-11)] text-4xl"
                        data-oid="gh45r3h"
                      >
                        🚢
                      </span>
                    </div>
                  )}
                  <div className="p-6" data-oid="_ski4fz">
                    <h2
                      className="text-2xl leading-tight font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-11)] to-[var(--accent-10)] group-hover:from-[var(--accent-10)] group-hover:to-[var(--accent-9)] transition-all duration-300"
                      data-oid="x7.:vqk"
                    >
                      {service.title}
                    </h2>
                    <p
                      className="text-[var(--gray-11)] mb-6 line-clamp-2 leading-relaxed"
                      data-oid="5dydcxc"
                    >
                      {service.description}
                    </p>
                    <div
                      className="flex flex-wrap gap-2 mb-4"
                      data-oid="x5xuyl2"
                    >
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-3 py-1 text-sm bg-[var(--accent-4)] text-[var(--accent-11)] rounded-full font-medium transition-colors duration-300 group-hover:bg-[var(--accent-5)]"
                          data-oid="oz5ju9w"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div
                      className="flex items-center justify-end mt-4"
                      data-oid=".:k5rtn"
                    >
                      <span
                        className="text-sm text-[var(--accent-11)] group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1"
                        data-oid="8zt_hvu"
                      >
                        了解更多
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          data-oid="v8ike9."
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                            data-oid="y0w.eu."
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

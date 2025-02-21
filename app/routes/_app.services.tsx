import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { motion, AnimatePresence } from "framer-motion";
import matter from "gray-matter";

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

export const loader = async () => {
  const postsDirectory = join(process.cwd(), "app", "components", "posts");
  
  try {
    const files = await readdir(postsDirectory);
    const mdxFiles = files.filter(file => file.endsWith(".mdx"));
    
    const services = await Promise.all(
      mdxFiles.map(async (filename) => {
        const filePath = join(postsDirectory, filename);
        const source = await readFile(filePath, "utf-8");
        const { data } = matter(source);
        
        return {
          slug: filename.replace(/\.mdx$/, ""),
          title: data.title,
          description: data.description,
          image: data.image,
          date: data.date,
          tags: data.tags || [],
        };
      })
    );

    services.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return json<LoaderData>({ services });
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
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    hover: { 
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--accent-2)] to-transparent">
      <div className="container mx-auto px-4 py-16">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-11)] to-[var(--accent-9)]">
              我們的服務
            </h1>
            <p className="text-xl text-[var(--gray-11)] max-w-2xl mx-auto">
              提供全方位的跨境物流解決方案，為您的業務保駕護航
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.slug}
                variants={item}
                className="group"
                whileHover="hover"
              >
                <Link
                  prefetch="intent"
                  to={`/services/${service.slug}`}
                  className="block rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      variants={imageVariants}
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      variants={overlayVariants}
                      className="absolute inset-0 bg-black/30"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-3 text-[var(--accent-11)] group-hover:text-[var(--accent-9)] transition-colors duration-300">
                      {service.title}
                    </h2>
                    <p className="text-[var(--gray-11)] mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-[var(--accent-3)] text-[var(--accent-11)] rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-[var(--gray-10)]">
                      <time>
                        {new Date(service.date).toLocaleDateString('zh-TW', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        瞭解更多 →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

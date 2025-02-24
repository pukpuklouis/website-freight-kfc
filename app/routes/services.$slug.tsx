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
  useNavigate,
} from "@remix-run/react";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { useMemo } from "react";
import invariant from "tiny-invariant";
import React from "react";
import type { Root } from "mdast";
import { mdxComponents, MDXWrapper } from "~/components/mdx/mdx-components";
import {
  motion,
  AnimatePresence,
  useScroll,
  useInView,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { IoChevronBack, IoHome } from "react-icons/io5";
import { HiChevronRight } from "react-icons/hi2";
import remarkGfm from 'remark-gfm';

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// Hero image variants
const heroImageVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const heroTextVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// Types
interface Frontmatter {
  title: string;
  description: string;
  date?: string | Date;
  image?: string;
  tags?: string[];
}

const CONTENT_DIR = join(process.cwd(), "content", "services");

// Default hero images for different service types
const DEFAULT_HERO_IMAGES = {
  default: "/images/services/default-hero.jpg",
  shipping: "/images/services/ocean-freight.jpg",
  logistics: "/images/services/logistics.jpg",
  express: "/images/services/express.jpg",
} as const;

const getHeroImage = (frontmatter: Frontmatter): string => {
  // If image is specified in frontmatter, use it
  if (frontmatter.image) {
    return frontmatter.image;
  }

  // If tags exist, try to find a matching hero image
  if (
    frontmatter.tags &&
    Array.isArray(frontmatter.tags) &&
    frontmatter.tags.length > 0
  ) {
    const matchingTag = frontmatter.tags.find((tag) =>
      Object.keys(DEFAULT_HERO_IMAGES).includes(tag),
    );

    if (matchingTag) {
      return DEFAULT_HERO_IMAGES[
        matchingTag as keyof typeof DEFAULT_HERO_IMAGES
      ];
    }
  }

  // Default fallback
  return DEFAULT_HERO_IMAGES.default;
};

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
    const source = await readFile(
      join(CONTENT_DIR, `${params.slug}.mdx`),
      "utf-8",
    );

    const { code, frontmatter } = await bundleMDX<Frontmatter>({
      source,
      cwd: CONTENT_DIR,
      mdxOptions(options) {
        options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
        return options;
      },
      esbuildOptions(options) {
        options.target = "es2020";
        options.platform = "neutral";
        options.format = "iife";
        return options;
      },
    });

    // Validate frontmatter
    if (!frontmatter || typeof frontmatter !== "object") {
      throw new Error("Missing frontmatter");
    }

    if (!frontmatter.title || typeof frontmatter.title !== "string") {
      throw new Error("Missing or invalid frontmatter.title");
    }

    if (
      !frontmatter.description ||
      typeof frontmatter.description !== "string"
    ) {
      throw new Error("Missing or invalid frontmatter.description");
    }

    // Date validation - handle both string and Date objects
    if (frontmatter.date) {
      const dateValue = frontmatter.date;
      if (typeof dateValue === "string" || dateValue instanceof Date) {
        // Valid date format
      } else {
        throw new Error("Invalid frontmatter.date format");
      }
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
    <div className="container mx-auto px-4 py-20" data-oid="t_sz-h1">
      <div className="max-w-2xl mx-auto text-center" data-oid="8a..a0m">
        <h1
          className="text-4xl font-bold mb-4 text-[var(--accent-11)]"
          data-oid="dwd2r8u"
        >
          {isRouteErrorResponse(error) ? "找不到服務" : "發生錯誤"}
        </h1>
        <p className="text-xl text-[var(--gray-11)] mb-8" data-oid="2nz36mx">
          {isRouteErrorResponse(error) ? error.data.message : "請稍後再試"}
        </p>
        <Link
          to="/services"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[var(--accent-9)] hover:bg-[var(--accent-10)] rounded-lg transition-colors"
          data-oid="ryro.l8"
        >
          返回服務內容
        </Link>
      </div>
    </div>
  );
}

// Main Page Component
export default function ServicePage() {
  const { code, frontmatter } = useLoaderData<typeof loader>();
  const navigate = useNavigate();



  // Create MDX component without frontmatter scope
  const Component = useMemo(() => {
    return getMDXComponent(code);
  }, [code]);

  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef);
  const heroScrollProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 1], [1, 0.3]);
  const heroImage = getHeroImage(frontmatter);

  return (
    <div
      className="min-h-screen bg-[var(--gray-1)] relative"
      data-oid="i:4qnkd"
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent-9)] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
        data-oid="8a1jhqm"
      />

      {/* Hero Section with Frontmatter Data */}
      <motion.div
        ref={heroRef}
        className="relative w-full h-[40vh] min-h-[200px] overflow-hidden z-0"
        initial="hidden"
        animate="visible"
        data-oid="l:uvf1-"
      >
        {/* Hero Content */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center text-[var(--accent-2)] text-center px-4 z-20"
          variants={heroTextVariants}
          data-oid="x_lw1jo"
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            data-oid="a5628vi"
          >
            {frontmatter.title}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl" data-oid="b7wzp1d">
            {frontmatter.description}
          </p>
        </motion.div>

        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
          data-oid="mzs3wkv"
        >
          <motion.div
            variants={heroImageVariants}
            className="relative w-full h-full"
            data-oid="hemiom0"
          >
            <img
              src={heroImage}
              alt={frontmatter.title}
              className="w-full h-full object-cover"
              data-oid="8r3hyv."
            />

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[var(--gray-1)]"
              data-oid="w2pqkz-"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Main Content Container */}
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4"
        data-oid="ifjio5y"
      >
        {/* Breadcrumb and Back Navigation */}
        <div className="py-6 border-b border-[var(--accent-3)]" data-oid="e:l8sah">
          <div className="flex items-center justify-between" data-oid="fb902nv">
            {/* Back Button */}
            <button
              onClick={() => navigate("/services")}
              className="inline-flex items-center text-[var(--gray-11)] hover:text-[var(--accent-9)] transition-colors"
              data-oid="b:robzt"
            >
              <IoChevronBack className="w-5 h-5 mr-1" data-oid="s8gt7wb" />
              <span className="text-sm font-medium" data-oid="u69m8ry">
                返回服務項目
              </span>
            </button>

            {/* Breadcrumbs */}
            <nav
              className="flex items-center space-x-2 text-sm text-[var(--gray-10)]"
              data-oid="a41iwd1"
            >
              <Link
                to="/"
                className="inline-flex items-center hover:text-[var(--accent-9)] transition-colors"
                data-oid="6.ur7xn"
              >
                <IoHome className="w-4 h-4" data-oid="w0u73qs" />
                <span className="ml-1" data-oid="xw63r8f">
                  首頁
                </span>
              </Link>
              <HiChevronRight className="w-4 h-4" data-oid="_9fh43m" />
              <Link
                to="/services"
                className="hover:text-[var(--accent-9)] transition-colors"
                data-oid="6kyt7.7"
              >
                服務項目
              </Link>
              <HiChevronRight className="w-4 h-4" data-oid="12cfsid" />
              <span className="text-[var(--accent-9)] font-medium" data-oid="gct2fwt">
                {frontmatter.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article Content */}
        <article className="py-8" data-oid="b0fkb_f">
          <motion.div
            ref={contentRef}
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-[var(--gray-2)] rounded-xl lg:px-16 md:px-8 px-4 shadow-lg py-8"
            data-oid="0vr53.a"
          >
            <MDXWrapper data-oid="3oh06_:">
              <Component components={mdxComponents} data-oid="lewrdv1" />
            </MDXWrapper>
          </motion.div>
        </article>
      </div>
    </div>
  );
}

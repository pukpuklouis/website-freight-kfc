# Service Slug Page Implementation Guide

This guide explains how to implement dynamic service pages using MDX in a Remix application.

## Table of Contents
- [Overview](#overview)
- [File Structure](#file-structure)
- [Implementation Steps](#implementation-steps)
- [MDX Configuration](#mdx-configuration)
- [Error Handling](#error-handling)
- [Styling Guide](#styling-guide)
- [Best Practices](#best-practices)

## Overview

The service slug page (`app/routes/_app.services.$slug.tsx`) dynamically renders service content from MDX files. It supports:
- Dynamic routing based on service slugs
- MDX content rendering with frontmatter
- Rich typography and styling
- Error boundaries
- Responsive design

## File Structure

```
app/
├── routes/
│   ├── _app.services.tsx        # Services index page
│   └── _app.services.$slug.tsx  # Dynamic service page
└── components/
    └── posts/                   # MDX files directory
        └── *.mdx               # Service content files
```

## Implementation Steps

1. **Install Dependencies**

```bash
npm install mdx-bundler tiny-invariant @types/react-dom
```

2. **Create MDX Files**

Create MDX files in `app/posts/` with the following frontmatter structure:

```mdx
---
title: Service Title
description: Service description
date: 2024-02-22
image: /images/services/image.jpg
tags: ['tag1', 'tag2']
---

# Content goes here
```

3. **Implement the Slug Route**

Create `app/routes/_app.services.$slug.tsx`:

```tsx
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import * as runtime from "react/jsx-runtime";

// ... (rest of the implementation)
```

## MDX Configuration

### Bundler Setup

```tsx
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
```

### MDX Component Rendering

```tsx
function MDXContent({ code }: { code: string }) {
  const Component = useMemo(() => {
    return getMDXComponent(code, { ...runtime });
  }, [code]);

  return <Component />;
}
```

## Error Handling

Implement proper error boundaries:

```tsx
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      // Error UI implementation
    );
  }

  return (
    // Generic error UI
  );
}
```

## Styling Guide

### Prose Styles

Use Tailwind's typography plugin with custom styles:

```tsx
<div className="prose prose-lg dark:prose-invert max-w-none">
  <div className="prose-headings:text-[var(--accent-11)] 
                  prose-p:text-[var(--gray-11)] 
                  prose-strong:text-[var(--gray-12)]">
    <MDXContent code={code} />
  </div>
</div>
```

### Image Styling

```tsx
<div className="relative h-[400px] mb-8 rounded-2xl overflow-hidden">
  <img 
    src={frontmatter.image} 
    alt={frontmatter.title}
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
</div>
```

## Best Practices

1. **Type Safety**
   - Use TypeScript interfaces for frontmatter
   - Add proper error handling
   - Use invariant checks for required parameters

2. **Performance**
   - Memoize MDX components
   - Use proper image optimization
   - Implement prefetching for navigation

3. **Accessibility**
   - Use semantic HTML
   - Provide proper alt text for images
   - Ensure proper color contrast

4. **Error Handling**
   - Implement proper error boundaries
   - Show user-friendly error messages
   - Log errors for debugging

5. **SEO**
   - Use proper meta tags
   - Implement proper heading hierarchy
   - Add proper schema markup

## Troubleshooting

Common issues and solutions:

1. **MDX Not Rendering**
   - Check if the MDX file exists
   - Verify frontmatter format
   - Check console for runtime errors

2. **Styling Issues**
   - Verify Tailwind configuration
   - Check CSS variable definitions
   - Ensure proper class names

3. **Navigation Issues**
   - Check route configuration
   - Verify link paths
   - Check for proper prefetching

## Maintenance

To maintain the service pages:

1. **Adding New Services**
   - Create new MDX files in the posts directory
   - Follow the frontmatter structure
   - Add proper images and tags

2. **Updating Content**
   - Edit MDX files directly
   - Rebuild the application if needed
   - Test changes in development

3. **Monitoring**
   - Check error logs regularly
   - Monitor performance metrics
   - Update dependencies as needed

1. Performance Optimizations
a. Image Optimization
Currently using direct image URLs without any optimization
Recommendation: Implement responsive images with different sizes and formats
>
b. Pagination/Infinite Scroll
Currently loading all services at once
Recommendation: Implement pagination or infinite scroll for better performance with large datasets
;
c. Memoization
Add memoization for animation variants to prevent recreating objects on each render
;
2. Error Handling Improvements
a. Better Error Handling in Loader
;
3. SEO Improvements
a. Add Meta Tags
;
4. Accessibility Improvements
a. Add ARIA Labels and Roles
>
5. Code Organization
a. Extract Service Card Component
Create a new component ServiceCard.tsx to improve code organization and reusability:
182
6. Type Safety Improvements
a. Add Strict Type Checking
}
Implementation Plan
Phase 1: Critical Improvements
Implement image optimization
Add proper error handling
Extract ServiceCard component
Add meta tags for SEO
Phase 2: Performance Optimizations
Implement pagination/infinite scroll
Add memoization for animation variants
Optimize image loading with lazy loading
Phase 3: Enhancement
Improve accessibility
Add loading states
Implement error boundaries
Add proper TypeScript types
Phase 4: Testing
Add unit tests for components
Add integration tests for loader
Performance testing
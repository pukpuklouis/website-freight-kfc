# MDX Implementation Guide in Remix

## Overview
This guide documents our MDX implementation in the KFC Freight website, focusing on the service pages implementation in `app/routes/services.$slug.tsx`.

## Tools and Libraries Used

### Core Libraries
- `mdx-bundler`: For processing and bundling MDX files
- `remark-gfm`: GitHub Flavored Markdown support
- `rehype-slug`: Adds IDs to headings
- `rehype-autolink-headings`: Adds anchor links to headings

### File Structure
```
app/
├── components/
│   └── mdx/
│       └── mdx-components.tsx    # Reusable MDX components
├── routes/
│   └── services.$slug.tsx        # Service page route
└── content/
    └── services/                 # MDX content files
```

## Best Practices

### 1. MDX Component Organization
- Separate MDX components into a dedicated file (`mdx-components.tsx`)
- Use TypeScript interfaces for component props
- Implement consistent styling using Tailwind CSS
- Create reusable wrapper components for common layouts

### 2. Content Processing
```typescript
// Example of MDX content processing
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
  }
});
```

### 3. Error Handling
- Implement proper error boundaries
- Validate frontmatter data
- Handle missing or malformed MDX files
- Provide user-friendly error messages

### 4. Type Safety
```typescript
interface Frontmatter {
  title: string;
  description: string;
  date: string;
  image?: string;
  tags: string[];
}

interface MDXComponentProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}
```

### 5. Performance Optimization
- Use `useMemo` for MDX component creation
- Implement proper bundling options
- Control image sizes and optimization
- Use appropriate caching strategies

### 6. Styling Guidelines
- Use Tailwind CSS for consistent styling
- Implement responsive design patterns
- Maintain proper typography hierarchy
- Use CSS variables for theming

### 7. Accessibility
- Implement proper heading structure
- Add ARIA labels where necessary
- Ensure proper color contrast
- Make content keyboard-navigable

## Common Patterns

### Loading MDX Content
```typescript
export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const rawSource = await readFile(
      join(CONTENT_DIR, `${params.slug}.mdx`),
      "utf-8"
    );
    // Process MDX content...
  } catch (error) {
    throw json({ message: "Content not found" }, { status: 404 });
  }
};
```

### Rendering MDX Components
```typescript
export default function ServicePage() {
  const { code, frontmatter } = useLoaderData<typeof loader>();
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <MDXWrapper>
      <Component components={mdxComponents} />
    </MDXWrapper>
  );
}
```

## Troubleshooting

### Common Issues
1. **Frontmatter Parsing**: Ensure proper YAML formatting
2. **Import Errors**: Check path aliases and import statements
3. **Styling Conflicts**: Use proper CSS scoping
4. **Type Errors**: Ensure proper interface definitions

### Debug Tips
- Use console.logging strategically
- Implement proper error boundaries
- Check bundler configurations
- Validate MDX syntax

## Future Improvements
1. Implement MDX content caching
2. Add more interactive components
3. Enhance SEO capabilities
4. Implement content search functionality
5. Add dynamic content loading

## Resources
- [MDX Documentation](https://mdxjs.com/)
- [Remix MDX Guide](https://remix.run/docs/en/main/guides/mdx)
- [mdx-bundler Documentation](https://github.com/kentcdodds/mdx-bundler)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

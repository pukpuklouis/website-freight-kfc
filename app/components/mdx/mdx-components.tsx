import type { ReactNode } from "react";

export interface MDXComponentProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

export interface MDXWrapperProps {
  components?: Record<string, React.ComponentType<MDXComponentProps>>;
  [key: string]: any;
}

export interface TableBodyProps extends MDXComponentProps {
  striped?: boolean;
}

export const mdxComponents = {
  // Headings
  h1: ({ children, ...props }: MDXComponentProps) => (
    <h1
      {...props}
      className="text-4xl font-bold mb-6 text-[var(--accent-9)]"
      data-oid="chuoopg"
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }: MDXComponentProps) => (
    <h2
      {...props}
      className="text-3xl font-semibold mb-5 text-[var(--accent-10)]"
      data-oid="0ubm9-8"
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }: MDXComponentProps) => (
    <h3
      {...props}
      className="text-2xl font-medium mb-4 text-[var(--accent-11)]"
      data-oid="h3-oid"
    >
      {children}
    </h3>
  ),

  h4: ({ children, ...props }: MDXComponentProps) => (
    <h4
      {...props}
      className="text-xl font-medium mb-3 text-[var(--accent-12)]"
      data-oid="h4-oid"
    >
      {children}
    </h4>
  ),

  h5: ({ children, ...props }: MDXComponentProps) => (
    <h5
      {...props}
      className="text-lg font-medium mb-2 text-[var(--gray-12)]"
      data-oid="h5-oid"
    >
      {children}
    </h5>
  ),

  h6: ({ children, ...props }: MDXComponentProps) => (
    <h6
      {...props}
      className="text-base font-medium mb-2 text-[var(--gray-11)]"
      data-oid="h6-oid"
    >
      {children}
    </h6>
  ),

  // Text elements
  p: ({ children, ...props }: MDXComponentProps) => (
    <p
      {...props}
      className="mb-6 text-[var(--gray-11)] leading-relaxed"
      data-oid=".limgn7"
    >
      {children}
    </p>
  ),

  strong: ({ children, ...props }: MDXComponentProps) => (
    <strong
      {...props}
      className="font-semibold text-[var(--gray-12)]"
      data-oid="3ka:d6m"
    >
      {children}
    </strong>
  ),

  a: ({ children, ...props }: MDXComponentProps) => (
    <a
      {...props}
      className="text-[var(--accent-11)] hover:text-[var(--accent-10)] underline transition-colors"
      data-oid="nw61mjx"
    >
      {children}
    </a>
  ),

  // Lists
  ul: ({ children, ...props }: MDXComponentProps) => (
    <ul {...props} className="mb-6 list-disc pl-6 space-y-2" data-oid="-bblslt">
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: MDXComponentProps) => (
    <ol
      {...props}
      className="mb-6 list-decimal pl-6 space-y-2"
      data-oid="rk7yyoo"
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }: MDXComponentProps) => (
    <li {...props} className="text-[var(--gray-11)]" data-oid=":e4z:jp">
      {children}
    </li>
  ),

  // Table elements
  table: ({ children, ...props }: MDXComponentProps) => (
    <div className="my-8 overflow-hidden border border-[var(--gray-6)] rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table
            {...props}
            className="my-0 min-w-full divide-y divide-[var(--gray-6)]"
          >
            {children}
          </table>
        </div>
      </div>
    </div>
  ),

  caption: ({ children, ...props }: MDXComponentProps) => (
    <caption
      {...props}
      className="px-3 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm text-[var(--gray-11)] text-left bg-[var(--gray-2)] border-b border-[var(--gray-6)]"
    >
      {children}
    </caption>
  ),

  thead: ({ children, ...props }: MDXComponentProps) => (
    <thead {...props} className="bg-[var(--gray-4)]">
      {children}
    </thead>
  ),

  tbody: ({ children, striped, ...props }: TableBodyProps) => (
    <tbody
      {...props}
      className={`divide-y divide-[var(--gray-4)] ${
        striped ? '[&>tr:nth-child(even)]:bg-[var(--gray-3)]' : ''
      }`}
    >
      {children}
    </tbody>
  ),

  tr: ({ children, ...props }: MDXComponentProps) => (
    <tr
      {...props}
      className="group transition-colors hover:bg-[var(--gray-3)]"
    >
      {children}
    </tr>
  ),

  th: ({ children, ...props }: MDXComponentProps) => (
    <th
      {...props}
      className="px-3 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-5 text-sm lg:text-md font-semibold text-[var(--gray-12)] whitespace-normal"
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: MDXComponentProps) => (
    <td
      {...props}
      className="px-3 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-5 text-sm text-[var(--gray-11)] whitespace-normal"
    >
      {children}
    </td>
  ),

  // Other elements
  hr: (props: MDXComponentProps) => (
    <hr
      {...props}
      className="my-8 border-t border-[var(--gray-6)]"
      data-oid="qn0gln5"
    />
  ),
};

export const MDXWrapper = ({ children, components = mdxComponents }: MDXWrapperProps) => (
  <div className="mdx-content">
    {children}
  </div>
);

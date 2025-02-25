import type { Components } from 'react-markdown';
import type { DetailedHTMLProps, HTMLAttributes, TableHTMLAttributes, AnchorHTMLAttributes } from 'react';

// Helper type to add ReactMarkdown node prop to HTML elements
type WithNode<T> = T & { node?: any };

// Component props types
type TableProps = WithNode<DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>>;
type TheadProps = WithNode<DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>>;
type TrProps = WithNode<DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>>;
type ThProps = WithNode<DetailedHTMLProps<HTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>>;
type TdProps = WithNode<DetailedHTMLProps<HTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>>;
type LinkProps = WithNode<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>>;
type BlockquoteProps = WithNode<DetailedHTMLProps<HTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>>;
type CodeProps = WithNode<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>> & {
  inline?: boolean;
  className?: string;
};

export const markdownComponents: Components = {
  table: ({node, ...props}: TableProps) => (
    <div className="markdown-table-wrapper">
      <table className="markdown-table" {...props} />
    </div>
  ),
  thead: ({node, ...props}: TheadProps) => (
    <thead className="markdown-thead" {...props} />
  ),
  tr: ({node, ...props}: TrProps) => (
    <tr className="markdown-tr" {...props} />
  ),
  th: ({node, ...props}: ThProps) => (
    <th className="markdown-th" {...props} />
  ),
  td: ({node, ...props}: TdProps) => (
    <td className="markdown-td" {...props} />
  ),
  a: ({node, ...props}: LinkProps) => (
    <a className="markdown-link" {...props} />
  ),
  blockquote: ({node, ...props}: BlockquoteProps) => (
    <blockquote className="markdown-blockquote" {...props} />
  ),
  code: ({node, inline, className, ...props}: CodeProps) => (
    inline 
      ? <code className="markdown-code-inline" {...props} />
      : <code className="markdown-code-block" {...props} />
  ),
};

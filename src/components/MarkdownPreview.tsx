import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

interface MarkdownPreviewProps {
  file: File | null;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ file }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContent(text || '');
        setIsLoading(false);
      };
      reader.readAsText(file);
    } else {
      setContent('');
      setIsLoading(false);
    }
  }, [file]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse-subtle">
          <svg className="animate-spin-slow w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No markdown content to display
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="prose prose-sm max-w-none p-6 prose-headings:text-primary prose-a:text-blue-600 prose-strong:font-bold prose-li:marker:text-primary"
    >
      <ReactMarkdown
        components={{
          table: ({ node, ...props }) => (
            <div className="my-4 w-full overflow-x-auto">
              <Table {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <TableHeader {...props} />,
          tbody: ({ node, ...props }) => <TableBody {...props} />,
          tr: ({ node, ...props }) => <TableRow {...props} />,
          th: ({ node, ...props }) => <TableHead className="font-bold bg-muted/50" {...props} />,
          td: ({ node, ...props }) => <TableCell {...props} />,
          
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 my-4 space-y-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
          ),
          li: ({ node, children, ...props }) => (
            <li className="my-1" {...props}>
              {children}
            </li>
          ),
          
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 italic my-4" {...props} />
          ),
          hr: () => <Separator className="my-6" />,
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold mt-6 mb-4 text-primary" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-bold mt-5 mb-3 text-primary/90" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-bold mt-4 mb-2 text-primary/80" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="my-3" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:underline" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic" {...props} />
          ),
          code: ({ node, inline, ...props }) => 
            inline ? (
              <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono" {...props} />
            ) : (
              <code className="block bg-gray-100 p-2 rounded text-sm font-mono overflow-x-auto my-4" {...props} />
            ),
          pre: ({ node, ...props }) => (
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-4" {...props} />
          ),
          img: ({ node, ...props }) => (
            <img className="max-w-full h-auto my-4 rounded-md" {...props} alt={props.alt || 'image'} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
};

export default MarkdownPreview;

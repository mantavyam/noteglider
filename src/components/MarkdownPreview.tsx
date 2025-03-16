
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import rehypeRaw from 'rehype-raw';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';

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

  // YouTube link detection
  const renderYouTubeEmbed = (text: string) => {
    const youtubeRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11}))/i;
    const match = text.match(youtubeRegex);
    if (match && match[1]) {
      const videoId = match[2];
      return (
        <div className="my-4">
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          />
        </div>
      );
    }
    return null;
  };

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="prose prose-sm max-w-none p-6 bg-card rounded-lg shadow-lg border"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]}
        components={{
          table: ({ node, children, ...props }) => (
            <div className="my-6 w-full overflow-x-auto">
              <Table className="border rounded-lg shadow-sm">
                {children}
              </Table>
            </div>
          ),
          thead: ({ node, children, ...props }) => (
            <TableHeader {...props}>{children}</TableHeader>
          ),
          tbody: ({ node, children, ...props }) => (
            <TableBody {...props}>{children}</TableBody>
          ),
          tr: ({ node, children, ...props }) => (
            <TableRow className="hover:bg-muted/50" {...props}>{children}</TableRow>
          ),
          th: ({ node, children, ...props }) => (
            <TableHead className="font-bold bg-muted/50 p-3" {...props}>{children}</TableHead>
          ),
          td: ({ node, children, ...props }) => (
            <TableCell className="p-3" {...props}>{children}</TableCell>
          ),
          
          ul: ({ node, children, ...props }) => (
            <ul className="list-disc pl-6 my-4 space-y-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ node, children, ...props }) => (
            <ol className="list-decimal pl-6 my-4 space-y-2" {...props}>
              {children}
            </ol>
          ),
          li: ({ node, children, ...props }) => (
            <li className="my-1" {...props}>
              {children}
            </li>
          ),
          
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 italic my-6 bg-muted/20 p-4 rounded-r-lg shadow-sm" {...props} />
          ),
          hr: () => <Separator className="my-6 bg-gradient-to-r from-transparent via-primary to-transparent h-0.5" />,
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-primary bg-gradient-to-r from-primary/10 to-transparent pr-4 rounded-lg" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold mt-6 mb-3 text-primary/90 border-b border-primary/20 pb-1" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold mt-4 mb-2 text-primary/80" {...props} />
          ),
          p: ({ node, children, ...props }) => {
            const youtubeEmbed = renderYouTubeEmbed(children?.toString() || '');
            return youtubeEmbed ? youtubeEmbed : <p className="my-4 leading-relaxed" {...props} />;
          },
          a: ({ node, href, ...props }) => (
            <a href={href} className="text-blue-600 hover:underline hover:text-blue-800 transition-colors" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-foreground" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-foreground/90" {...props} />
          ),
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            
            if (!isInline) {
              // Remove any props that might cause type issues
              const syntaxProps = {
                style: oneDark as any,
                language: match ? match[1] : '',
                PreTag: "div" as const,
                className: "rounded-md my-4 shadow-md"
              };
              
              return (
                <SyntaxHighlighter {...syntaxProps}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            } else {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props}>
                  {children}
                </code>
              );
            }
          },
          img: ({ node, src, alt, ...props }) => (
            <figure className="my-6">
              <img
                src={src}
                alt={alt || 'image'}
                className="max-w-full h-auto rounded-lg shadow-md border"
                {...props}
              />
              {alt && <figcaption className="text-center text-sm text-muted-foreground mt-2">{alt}</figcaption>}
            </figure>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
};

export default MarkdownPreview;

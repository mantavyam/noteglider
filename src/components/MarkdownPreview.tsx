
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

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
      className="prose prose-sm max-w-none p-6 overflow-auto h-full"
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </motion.div>
  );
};

export default MarkdownPreview;

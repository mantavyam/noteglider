
import React, { ReactNode } from 'react';

interface NewsDescriptionProps {
  children: ReactNode;
}

const NewsDescription: React.FC<NewsDescriptionProps> = ({ children }) => {
  return (
    <div style={{
      width: '60mm',
      display: 'flex',
      flexDirection: 'column',
      gap: '0mm'
    }}>
      <div style={{
        width: '60mm',
        fontSize: '8px',
        padding: '1mm',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        textAlign: 'justify',
        textJustify: 'inter-word'
      }}>
        {children}
      </div>
    </div>
  );
};

export default NewsDescription;

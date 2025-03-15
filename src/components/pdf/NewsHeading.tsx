
import React from 'react';

interface NewsHeadingProps {
  heading: string;
}

const NewsHeading: React.FC<NewsHeadingProps> = ({ 
  heading = "Heading Data Comes Here"
}) => {
  return (
    <div style={{
      width: '60mm',
      display: 'flex',
      flexDirection: 'column',
      gap: '0mm'
    }}>
      <div style={{
        width: '60mm',
        fontSize: '10px',
        padding: '0mm',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        textAlign: 'justify',
        textJustify: 'inter-word'
      }}>
        {heading}
      </div>
    </div>
  );
};

export default NewsHeading;

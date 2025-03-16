
import React from 'react';

interface NewsDescriptionProps {
  content: string;
}

const NewsDescription: React.FC<NewsDescriptionProps> = ({ content }) => {
  return (
    <div className="descriptive-block">
      <div className="descriptive-info">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default NewsDescription;

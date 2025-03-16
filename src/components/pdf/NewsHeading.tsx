
import React from 'react';

interface NewsHeadingProps {
  heading: string;
}

const NewsHeading: React.FC<NewsHeadingProps> = ({ heading }) => {
  return (
    <div className="heading-block">
      <div className="news-heading">
        {heading}
      </div>
    </div>
  );
};

export default NewsHeading;

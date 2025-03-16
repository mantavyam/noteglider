
import React from 'react';

interface NewsImageProps {
  src: string;
  alt: string;
}

const NewsImage: React.FC<NewsImageProps> = ({ src, alt }) => {
  return (
    <div className="image-block">
      <div className="image-placeholder">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

export default NewsImage;

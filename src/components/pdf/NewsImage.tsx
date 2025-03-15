
import React from 'react';

interface NewsImageProps {
  src?: string;
  alt?: string;
}

const NewsImage: React.FC<NewsImageProps> = ({ 
  src,
  alt = "News Image"
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
        height: '22mm',
        backgroundColor: '#eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        color: '#666',
        overflow: 'hidden'
      }}>
        {src ? (
          <img 
            src={src} 
            alt={alt} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }} 
          />
        ) : (
          <span>Image Placeholder</span>
        )}
      </div>
    </div>
  );
};

export default NewsImage;

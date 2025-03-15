import React from 'react';

interface NewsImageProps {
  src: string;
  alt: string;
}

export const NewsImage: React.FC<NewsImageProps> = ({ src, alt }) => {
  return (
    <div className="w-[60mm] flex flex-col gap-0">
      <div className="w-[60mm] h-[22mm] bg-gray-200 flex items-center justify-center text-[12px] text-gray-600 overflow-hidden">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
import React from 'react';

interface NewsHeadingProps {
  heading: string;
}

export const NewsHeading: React.FC<NewsHeadingProps> = ({ heading }) => {
  return (
    <div className="w-[60mm] flex flex-col gap-0">
      <div className="w-[60mm] text-[10px] p-0 box-border break-words text-justify">
        {heading}
      </div>
    </div>
  );
};
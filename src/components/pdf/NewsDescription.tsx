import React from 'react';

interface NewsDescriptionProps {
  content: string;
}

export const NewsDescription: React.FC<NewsDescriptionProps> = ({ content }) => {
  return (
    <div className="w-[60mm] flex flex-col gap-0">
      <div className="w-[60mm] text-[8px] p-[1mm] box-border break-words text-justify">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};
import React from 'react';

interface CategorySeparatorProps {
  text: string;
}

export const CategorySeparator: React.FC<CategorySeparatorProps> = ({ text }) => {
  return (
    <div className="flex items-center w-[63.33mm] justify-center">
      <div className="flex-grow h-[4px] bg-gradient-to-r from-[#004aad] to-[#5de0e6]"></div>
      <div className="bg-[#0097b2] text-white text-[10px] font-bold text-center p-[2px_8px] h-[4mm] flex items-center justify-center whitespace-nowrap m-0">
        <b>{text}</b>
      </div>
      <div className="flex-grow h-[4px] bg-gradient-to-r from-[#004aad] to-[#5de0e6]"></div>
    </div>
  );
};
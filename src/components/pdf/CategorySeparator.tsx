
import React from 'react';

interface CategorySeparatorProps {
  text: string;
}

const CategorySeparator: React.FC<CategorySeparatorProps> = ({ text }) => {
  return (
    <div className="separator-container">
      <div className="separator-line"></div>
      <div className="separator-text"><b>{text}</b></div>
      <div className="separator-line"></div>
    </div>
  );
};

export default CategorySeparator;

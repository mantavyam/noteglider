
import React from 'react';

interface CategorySeparatorProps {
  category: string;
}

const CategorySeparator: React.FC<CategorySeparatorProps> = ({ 
  category = "NEWS-CATEGORY"
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: '63.33mm',
      justifyContent: 'center'
    }}>
      <div style={{
        flexGrow: 1,
        height: '4px',
        background: 'linear-gradient(90deg, #004aad, #5de0e6)'
      }}></div>
      <div style={{
        background: '#0097b2',
        color: 'white',
        fontSize: '10px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '2px 8px',
        height: '4mm',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        margin: '0px'
      }}>
        <b>{category}</b>
      </div>
      <div style={{
        flexGrow: 1,
        height: '4px',
        background: 'linear-gradient(90deg, #5de0e6, #004aad)'
      }}></div>
    </div>
  );
};

export default CategorySeparator;

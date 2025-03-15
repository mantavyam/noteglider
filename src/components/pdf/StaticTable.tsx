
import React, { ReactNode } from 'react';

interface TableRow {
  cells: ReactNode[];
}

interface StaticTableProps {
  descriptiveRow: string;
  headerRow?: string[];
  rows: TableRow[];
}

const StaticTable: React.FC<StaticTableProps> = ({ 
  descriptiveRow,
  headerRow,
  rows
}) => {
  const colSpan = headerRow ? headerRow.length : rows[0]?.cells.length || 2;
  
  return (
    <table style={{
      width: '60mm',
      borderCollapse: 'collapse',
      borderSpacing: '0',
      border: '1px solid #c8daea',
      fontSize: '8px'
    }}>
      <tbody>
        <tr style={{
          backgroundColor: '#1d93d2',
          color: 'white',
          fontWeight: 'bold'
        }}>
          <td colSpan={colSpan} style={{
            padding: '4px',
            border: '1px solid #c8daea',
            textAlign: 'left'
          }}>
            {descriptiveRow}
          </td>
        </tr>
        
        {headerRow && (
          <tr style={{
            color: 'white',
            backgroundColor: '#1d93d2',
            fontWeight: 'bold'
          }}>
            {headerRow.map((header, index) => (
              <th key={index} style={{
                padding: '4px',
                border: '1px solid #c8daea',
                textAlign: 'left'
              }}>
                {header}
              </th>
            ))}
          </tr>
        )}
        
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.cells.map((cell, cellIndex) => (
              <td key={cellIndex} style={{
                padding: '4px',
                border: '1px solid #c8daea',
                textAlign: 'left'
              }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StaticTable;

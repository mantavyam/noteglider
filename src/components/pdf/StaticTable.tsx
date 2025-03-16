
import React from 'react';

interface StaticTableProps {
  descriptiveRow: string;
  headers?: string[];
  rows: string[][];
}

const StaticTable: React.FC<StaticTableProps> = ({ descriptiveRow, headers, rows }) => {
  return (
    <table className="static-table">
      <tbody>
        <tr className="descriptive-row">
          <td colSpan={headers ? headers.length : rows[0].length}>{descriptiveRow}</td>
        </tr>
        {headers && (
          <tr className="header-row">
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        )}
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StaticTable;

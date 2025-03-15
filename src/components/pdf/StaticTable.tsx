import React from 'react';

interface StaticTableProps {
  descriptiveRow: string;
  headers?: string[];
  rows: string[][];
}

export const StaticTable: React.FC<StaticTableProps> = ({ descriptiveRow, headers, rows }) => {
  return (
    <table className="w-[60mm] border-collapse border border-[#c8daea] text-[8px]">
      <tbody>
        <tr className="bg-[#1d93d2] text-white font-bold">
          <td colSpan={headers ? headers.length : 2} className="p-[4px] border border-[#c8daea] text-left">
            {descriptiveRow}
          </td>
        </tr>
        {headers && (
          <tr className="bg-[#1d93d2] text-white font-bold">
            {headers.map((header, index) => (
              <th key={index} className="p-[4px] border border-[#c8daea] text-left">
                {header}
              </th>
            ))}
          </tr>
        )}
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="p-[4px] border border-[#c8daea] text-left">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
import React from 'react';

interface AnswerTableProps {
  title: string;
  answers: { number: number; text: string }[];
}

export const AnswerTable: React.FC<AnswerTableProps> = ({ title, answers }) => {
  return (
    <div className="w-[60mm] bg-[#f5f0e6] p-[5px] box-border text-center border-0">
      <div className="text-[12px] text-black mb-[5px] font-bold">{title}</div>
      <div className="w-[57mm] border border-black p-0 box-border mx-auto">
        <table className="w-full border-collapse">
          <tbody>
            {answers.map((answer, index) => (
              <tr key={index}>
                <td className="text-[10px] p-[12px] border-b border-black text-center w-0 border-r border-black">
                  {answer.number}
                </td>
                <td className="text-[10px] p-[12px] border-b border-black text-left w-[37mm]">
                  {answer.text}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
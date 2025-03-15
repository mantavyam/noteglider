import React from 'react';

interface QuestionTableProps {
  title: string;
  questions: string[];
}

export const QuestionTable: React.FC<QuestionTableProps> = ({ title, questions }) => {
  return (
    <div className="w-[60mm] border border-black p-[5px] box-border text-center">
      <div className="text-[10px] text-black mb-[5px] font-bold">{title}</div>
      <div className="w-[57mm] border border-black p-0 box-border mx-auto">
        <table className="w-full border-separate border-spacing-0">
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td className="text-[10px] p-[12px] border-b border-black text-left last:border-b-0">
                  {question}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
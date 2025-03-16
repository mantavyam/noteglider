
import React from 'react';

interface AnswerTableProps {
  title: string;
  answers: { number: number; text: string }[];
}

const AnswerTable: React.FC<AnswerTableProps> = ({ title, answers }) => {
  return (
    <div className="outer-container">
      <div className="table-title">{title}</div>
      <div className="inner-table-container">
        <table className="answer-table">
          <tbody>
            {answers.map((answer, index) => (
              <tr key={index}>
                <td>{answer.number}</td>
                <td>{answer.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnswerTable;

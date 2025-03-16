
import React from 'react';

interface QuestionTableProps {
  title: string;
  questions: string[];
}

const QuestionTable: React.FC<QuestionTableProps> = ({ title, questions }) => {
  return (
    <div className="outer-container">
      <div className="table-title">{title}</div>
      <div className="inner-table-container">
        <table className="question-table" cellSpacing="0">
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td>{question}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionTable;

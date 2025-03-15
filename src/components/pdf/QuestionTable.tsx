
import React from 'react';

interface QuestionTableProps {
  questions: string[];
  title?: string;
}

const QuestionTable: React.FC<QuestionTableProps> = ({ 
  questions = ["Q1", "Q2", "Q3", "Q4", "Q5"],
  title = "Important Q&A" 
}) => {
  return (
    <div style={{
      width: '60mm',
      border: '1px solid black',
      padding: '5px',
      boxSizing: 'border-box',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '10px',
        color: 'black',
        marginBottom: '5px',
        fontWeight: 'bold'
      }}>
        {title}
      </div>
      <div style={{
        width: '57mm',
        border: '1px solid black',
        padding: '0px',
        boxSizing: 'border-box',
        margin: '0 auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '0'
        }} cellSpacing="12">
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td style={{
                  fontSize: '10px',
                  padding: '12px',
                  borderBottom: index === questions.length - 1 ? 'none' : '1px solid black',
                  textAlign: 'left'
                }}>
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

export default QuestionTable;


import React from 'react';

interface Answer {
  number: string | number;
  text: string;
}

interface AnswerTableProps {
  answers: Answer[];
  title?: string;
}

const AnswerTable: React.FC<AnswerTableProps> = ({ 
  answers = [
    { number: 1, text: "Sample answer for row 1" },
    { number: 2, text: "Sample answer for row 2" },
    { number: 3, text: "Sample answer for row 3" },
    { number: 4, text: "Sample answer for row 4" },
    { number: 5, text: "Sample answer for row 5" }
  ],
  title = "ANSWERS"
}) => {
  return (
    <div style={{
      width: '60mm',
      backgroundColor: '#f5f0e6',
      padding: '5px',
      boxSizing: 'border-box',
      textAlign: 'center',
      border: '0px solid black'
    }}>
      <div style={{
        fontSize: '12px',
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
          borderCollapse: 'collapse'
        }}>
          <tbody>
            {answers.map((answer, index) => (
              <tr key={index}>
                <td style={{
                  fontSize: '10px',
                  padding: '12px',
                  borderBottom: index === answers.length - 1 ? 'none' : '1px solid black',
                  borderRight: '1px solid black',
                  textAlign: 'center',
                  width: '0mm'
                }}>
                  {answer.number}
                </td>
                <td style={{
                  fontSize: '10px',
                  padding: '12px',
                  borderBottom: index === answers.length - 1 ? 'none' : '1px solid black',
                  textAlign: 'left',
                  width: '37mm'
                }}>
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

export default AnswerTable;

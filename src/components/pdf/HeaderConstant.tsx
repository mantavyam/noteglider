
import React from 'react';

interface HeaderConstantProps {
  youtubeIconSrc?: string;
  youtubeLink?: string;
  title?: string;
  linkText?: string;
}

const HeaderConstant: React.FC<HeaderConstantProps> = ({
  youtubeIconSrc = "youtube.png",
  youtubeLink = "https://www.youtube.com/@Studyniti/streams",
  title = "IMPORTANT NEWS COVERAGE FOR ALL BANK EXAMS",
  linkText = "[CLICK] to WATCH Today's NEWS Analysis + Current Affairs"
}) => {
  return (
    <div id="header" style={{
      width: '210mm',
      height: '15mm',
      backgroundColor: '#0097b2',
      color: '#ffffff',
      fontSize: '8px',
      fontFamily: 'sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 5mm'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5mm'
      }}>
        <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
          <img 
            src={youtubeIconSrc} 
            alt="YouTube" 
            style={{
              width: '6.74mm',
              height: '4.67mm',
              flexShrink: 0
            }}
          />
        </a>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          lineHeight: 0
        }}>
          <p style={{
            fontSize: '7px',
            fontWeight: 'bold'
          }}>
            {title}
          </p>
          <p>
            <a 
              href={youtubeLink} 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '8px'
              }}
            >
              {linkText}
            </a>
          </p>
        </div>

        <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
          <img 
            src={youtubeIconSrc} 
            alt="YouTube" 
            style={{
              width: '6.74mm',
              height: '4.67mm',
              flexShrink: 0
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default HeaderConstant;

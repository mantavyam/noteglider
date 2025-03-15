
import React from 'react';

interface HeaderMainProps {
  brandName?: string;
  docType?: string;
  youtubeLink?: string;
  tagline?: string;
  brandHeading?: string;
  date?: string;
  author?: string;
  youtubeIconSrc?: string;
}

const HeaderMain: React.FC<HeaderMainProps> = ({
  brandName = "Learning Niti",
  docType = "DAILY NEWSLETTER",
  youtubeLink = "https://www.youtube.com/@Studyniti/streams",
  tagline = "ONE STOP SOLUTION FOR ALL BANKING EXAMS",
  brandHeading = "CROSSWORD",
  date = new Date().toLocaleDateString('en-GB'),
  author = "Kapil Kathpal",
  youtubeIconSrc = "youtube-icon.png" 
}) => {
  return (
    <div style={{
      width: '210mm',
      height: '24mm',
      backgroundColor: '#0097b2',
      position: 'relative',
      marginBottom: '10mm'
    }}>
      <div style={{
        position: 'absolute',
        top: '8mm',
        left: '36mm',
        right: '36mm',
        height: '0',
        borderTop: '3px solid white'
      }}></div>

      <div style={{
        position: 'absolute',
        top: '2mm',
        left: '8mm',
        fontSize: '14px',
        color: 'white'
      }}>
        <b>{brandName}</b>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '7mm',
        left: '8mm',
        background: 'black',
        color: 'white',
        fontSize: '14px',
        padding: '2px 5px'
      }}>
        {docType}
      </div>
      
      <div style={{
        position: 'absolute',
        top: '12mm',
        left: '8mm',
        display: 'flex',
        alignItems: 'flex-start'
      }}>
        <div style={{
          marginRight: '2mm'
        }}>
          <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
            <img 
              src={youtubeIconSrc} 
              alt="YouTube" 
              style={{
                width: '9.37mm',
                height: '6.48mm'
              }}
            />
          </a>
        </div>
        <div>
          <a 
            href={youtubeLink} 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'white',
              textDecoration: 'underline',
              fontSize: '10px',
              lineHeight: '1.2',
              display: 'block'
            }}
          >
            [CLICK] to WATCH Today's<br/>NEWS Analysis + Current Affairs
          </a>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: '3mm',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '10px',
        color: 'white',
        textAlign: 'center'
      }}>
        <b>{tagline}</b>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '10mm',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '36px',
        fontFamily: 'Ahsing, sans-serif',
        color: 'white',
        textAlign: 'center'
      }}>
        <b>{brandHeading}</b>
      </div>

      <div style={{
        position: 'absolute',
        top: '8mm',
        right: '8mm',
        transform: 'translateY(-50%)',
        background: 'black',
        color: 'white',
        fontSize: '18px',
        padding: '2px 5px'
      }}>
        {date}
      </div>
      
      <div style={{
        position: 'absolute',
        top: '18mm',
        right: '8mm',
        fontSize: '14px',
        color: 'white'
      }}>
        <b>By: {author}</b>
      </div>
    </div>
  );
};

export default HeaderMain;

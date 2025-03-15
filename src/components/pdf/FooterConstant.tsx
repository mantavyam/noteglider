
import React from 'react';

interface FooterConstantProps {
  youtubeIconSrc?: string;
  instagramIconSrc?: string;
  telegramIconSrc?: string;
  brandIconSrc?: string;
  youtubeUsername?: string;
  instagramUsername?: string;
  telegramUsername?: string;
  youtubeLink?: string;
  instagramLink?: string;
  telegramLink?: string;
  appLink?: string;
  websiteLink?: string;
  courseLink?: string;
  email?: string;
}

const FooterConstant: React.FC<FooterConstantProps> = ({
  youtubeIconSrc = "youtube.png",
  instagramIconSrc = "instagram.png",
  telegramIconSrc = "telegram.png",
  brandIconSrc = "brand-icon.png",
  youtubeUsername = "@Studyniti",
  instagramUsername = "@iamkapilkathpal",
  telegramUsername = "@kkathpal",
  youtubeLink = "https://www.youtube.com/@Studyniti/featured",
  instagramLink = "https://www.instagram.com/iamkapilkathpal/",
  telegramLink = "https://t.me/kkathpal",
  appLink = "https://play.google.com/store/apps/details?id=co.rios.czhgm",
  websiteLink = "https://www.learningniti.com",
  courseLink = "https://www.learningniti.com/courses/399651",
  email = "inquiry.learningniti@gmail.com"
}) => {
  return (
    <div id="footer" style={{
      width: '210mm',
      height: '15mm',
      backgroundColor: '#0097b2',
      color: '#ffffff',
      fontSize: '7.5px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0 15mm'
    }}>
      <div style={{
        width: '33%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          marginBottom: '2px'
        }}>
          <span style={{
            fontWeight: 'bold',
            margin: '0 0 2px 0',
            lineHeight: '1.2em'
          }}>Connect with Kapil Sir</span>
          <a 
            href={youtubeLink} 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffffff',
              textDecoration: 'none'
            }}
          >
            <img 
              src={youtubeIconSrc} 
              alt="YouTube" 
              style={{
                width: '4.84mm',
                height: '3.35mm'
              }}
            />
            <u>{youtubeUsername}</u>
          </a>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          marginBottom: '2px'
        }}>
          <a 
            href={instagramLink} 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffffff',
              textDecoration: 'none'
            }}
          >
            <img 
              src={instagramIconSrc} 
              alt="Instagram" 
              style={{
                width: '4.17mm',
                height: '4.17mm'
              }}
            />
            <u>{instagramUsername}</u>
          </a>
          <a 
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffffff',
              textDecoration: 'none'
            }}
          >
            <img 
              src={telegramIconSrc} 
              alt="Telegram" 
              style={{
                width: '3.67mm',
                height: '3.67mm'
              }}
            />
            <u>{telegramUsername}</u>
          </a>
        </div>
      </div>

      <div style={{
        width: '33%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <p style={{
          fontWeight: 'bold',
          margin: '0 0 2px 0',
          lineHeight: '1.2em'
        }}>Level Up Your Preparation with:</p>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '5px'
        }}>
          <img 
            src={brandIconSrc} 
            alt="Brand Icon" 
            style={{
              width: '7mm',
              height: '7mm',
              flexShrink: 0
            }}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            alignItems: 'flex-start'
          }}>
            <a 
              href={appLink} 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ffffff',
                textDecoration: 'none'
              }}
            >
              <u>"Learning Niti" App (Click to View)</u>
            </a>
            <a 
              href={websiteLink} 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ffffff',
                textDecoration: 'none'
              }}
            >
              <u>"Learning Niti" Website (Click to View)</u>
            </a>
          </div>
        </div>
      </div>

      <div style={{
        width: '33%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <p style={{
          fontWeight: 'bold',
          margin: '0 0 2px 0',
          lineHeight: '1.2em'
        }}>Get Crossword Current Affairs Package:</p>
        <div style={{
          margin: '2px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          flexWrap: 'wrap'
        }}>
          <a 
            href={courseLink} 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffffff',
              textDecoration: 'none'
            }}
          >
            <u>{courseLink}</u>
          </a>
        </div>
        <div style={{
          margin: '2px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          flexWrap: 'wrap'
        }}>
          For Enquiry Mail at:
          <a 
            href={`mailto:${email}`}
            style={{
              color: '#ffffff',
              textDecoration: 'none'
            }}
          >
            <u>{email}</u>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterConstant;

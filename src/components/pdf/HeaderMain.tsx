
import React from 'react';

interface HeaderMainProps {
  brandName: string;
  docType: string;
  youtubeLink: string;
  youtubeText: string;
  tagline: string;
  brandHeading: string;
  date: string;
  author: string;
}

const HeaderMain: React.FC<HeaderMainProps> = ({
  brandName,
  docType,
  youtubeLink,
  youtubeText,
  tagline,
  brandHeading,
  date,
  author,
}) => {
  return (
    <div id="header">
      <div className="line"></div>
      <div className="brand-name"><b>{brandName}</b></div>
      <div className="doc-type">{docType}</div>
      <div className="youtube-link">
        <div className="youtube-icon">
          <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
            <img src="/static/youtube-icon.png" alt="YouTube" />
          </a>
        </div>
        <div className="youtube-text">
          <a href={youtubeLink} target="_blank" rel="noopener noreferrer" dangerouslySetInnerHTML={{ __html: youtubeText }}></a>
        </div>
      </div>
      <div className="tagline"><b>{tagline}</b></div>
      <div className="brand-heading"><b>{brandHeading}</b></div>
      <div className="date">{date}</div>
      <div className="author"><b>{author}</b></div>
    </div>
  );
};

export default HeaderMain;

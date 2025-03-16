
import React from 'react';

interface HeaderConstantProps {
  title: string;
  linkText: string;
  linkUrl: string;
}

const HeaderConstant: React.FC<HeaderConstantProps> = ({ title, linkText, linkUrl }) => {
  return (
    <div id="header">
      <div className="header-content">
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          <img src="/static/youtube.png" alt="YouTube" className="icon-youtube" />
        </a>

        <div className="header-text">
          <p className="header-title">{title}</p>
          <p className="header-link">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkText}
            </a>
          </p>
        </div>

        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          <img src="/static/youtube.png" alt="YouTube" className="icon-youtube" />
        </a>
      </div>
    </div>
  );
};

export default HeaderConstant;

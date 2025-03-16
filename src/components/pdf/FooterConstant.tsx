
import React from 'react';

const FooterConstant: React.FC = () => {
  return (
    <div id="footer">
      <div className="footer-block">
        <div className="block-1-row">
          <span className="footer-title">Connect with Kapil Sir</span>
          <a href="https://www.youtube.com/@Studyniti/featured" target="_blank" rel="noopener noreferrer">
            <img src="/static/youtube.png" alt="YouTube" className="icon-youtube" />
            <u>@Studyniti</u>
          </a>
        </div>
        <div className="block-1-row">
          <a href="https://www.instagram.com/iamkapilkathpal/" target="_blank" rel="noopener noreferrer">
            <img src="/static/instagram.png" alt="Instagram" className="icon-instagram" />
            <u>@iamkapilkathpal</u>
          </a>
          <a href="https://t.me/kkathpal" target="_blank" rel="noopener noreferrer">
            <img src="/static/telegram.png" alt="Telegram" className="icon-telegram" />
            <u>@kkathpal</u>
          </a>
        </div>
      </div>
      
      <div className="footer-block">
        <p className="footer-title">Level Up Your Preparation with:</p>
        <div className="block-2-content">
          <img src="/static/brand-icon.png" alt="Brand Icon" className="icon-brand" />
          <div className="block-2-links">
            <a href="https://play.google.com/store/apps/details?id=co.rios.czhgm" target="_blank" rel="noopener noreferrer">
              <u>"Learning Niti" App (Click to View)</u>
            </a>
            <a href="https://www.learningniti.com" target="_blank" rel="noopener noreferrer">
              <u>"Learning Niti" Website (Click to View)</u>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-block">
        <p className="footer-title">Get Crossword Current Affairs Package:</p>
        <div className="footer-line">
          <a href="https://www.learningniti.com/courses/399651" target="_blank" rel="noopener noreferrer">
            <u>https://www.learningniti.com/courses/399651</u>
          </a>
        </div>
        <div className="footer-line">
          For Enquiry Mail at:
          <a href="mailto:inquiry.learningniti@gmail.com"><u>inquiry.learningniti@gmail.com</u></a>
        </div>
      </div>
    </div>
  );
};

export default FooterConstant;

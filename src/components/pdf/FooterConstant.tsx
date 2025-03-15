import React from 'react';

export const FooterConstant: React.FC = () => {
  return (
    <div className="w-[210mm] h-[15mm] bg-[#0097b2] text-white text-[7.5px] font-sans flex justify-around items-center p-[0_15mm]">
      <div className="w-1/3 flex flex-col justify-center items-start">
        <div className="flex items-center gap-[5px] mb-[2px]">
          <span className="font-bold leading-[1.2em]">Connect with Kapil Sir</span>
          <a href="https://www.youtube.com/@Studyniti/featured" target="_blank" className="flex items-center">
            <img src="/static/youtube.png" alt="YouTube" className="w-[4.84mm] h-[3.35mm]" />
            <u>@Studyniti</u>
          </a>
        </div>
        <div className="flex items-center gap-[5px] mb-[2px]">
          <a href="https://www.instagram.com/iamkapilkathpal/" target="_blank" className="flex items-center">
            <img src="/static/instagram.png" alt="Instagram" className="w-[4.17mm] h-[4.17mm]" />
            <u>@iamkapilkathpal</u>
          </a>
          <a href="https://t.me/kkathpal" target="_blank" className="flex items-center">
            <img src="/static/telegram.png" alt="Telegram" className="w-[3.67mm] h-[3.67mm]" />
            <u>@kkathpal</u>
          </a>
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-center items-start">
        <p className="font-bold mb-[2px] leading-[1.2em]">Level Up Your Preparation with:</p>
        <div className="flex items-start gap-[5px]">
          <img src="/static/brand-icon.png" alt="Brand Icon" className="w-[7mm] h-[7mm]" />
          <div className="flex flex-col gap-[3px] items-start">
            <a href="https://play.google.com/store/apps/details?id=co.rios.czhgm" target="_blank" className="underline">“Learning Niti” App (Click to View)</a>
            <a href="https://www.learningniti.com" target="_blank" className="underline">“Learning Niti” Website (Click to View)</a>
          </div>
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-center items-start">
        <p className="font-bold mb-[2px] leading-[1.2em]">Get Crossword Current Affairs Package:</p>
        <div className="flex items-center gap-[5px] mb-[2px]">
          <a href="https://www.learningniti.com/courses/399651" target="_blank" className="underline">https://www.learningniti.com/courses/399651</a>
        </div>
        <div className="flex items-center gap-[5px]">
          For Enquiry Mail at:
          <a href="mailto:inquiry.learningniti@gmail.com" className="underline">inquiry.learningniti@gmail.com</a>
        </div>
      </div>
    </div>
  );
};
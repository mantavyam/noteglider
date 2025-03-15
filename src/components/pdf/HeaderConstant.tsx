import React from 'react';

interface HeaderConstantProps {
  title: string;
  linkText: string;
  linkUrl: string;
}

export const HeaderConstant: React.FC<HeaderConstantProps> = ({ title, linkText, linkUrl }) => {
  return (
    <div className="w-[210mm] h-[15mm] bg-[#0097b2] text-white text-[8px] font-sans flex justify-center items-center p-[0_5mm]">
      <div className="flex items-center gap-[5mm]">
        <a href={linkUrl} target="_blank">
          <img src="/static/youtube.png" alt="YouTube" className="w-[6.74mm] h-[4.67mm]" />
        </a>
        <div className="flex flex-col items-center text-center leading-none">
          <p className="text-[7px] font-bold">{title}</p>
          <p className="font-bold text-[8px]">
            <a href={linkUrl} target="_blank" className="text-white no-underline">
              {linkText}
            </a>
          </p>
        </div>
        <a href={linkUrl} target="_blank">
          <img src="/static/youtube.png" alt="YouTube" className="w-[6.74mm] h-[4.67mm]" />
        </a>
      </div>
    </div>
  );
};
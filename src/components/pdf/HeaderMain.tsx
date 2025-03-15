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

export const HeaderMain: React.FC<HeaderMainProps> = ({
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
    <div className="w-[210mm] h-[24mm] bg-[#0097b2] relative mb-[10mm]">
      <div className="absolute top-[8mm] left-[36mm] right-[36mm] h-0 border-t-[3px] border-white"></div>
      <div className="absolute top-[2mm] left-[8mm] text-[14px] text-white">{brandName}</div>
      <div className="absolute top-[7mm] left-[8mm] bg-black text-white text-[14px] p-[2px_5px]">{docType}</div>
      <div className="absolute top-[12mm] left-[8mm] flex items-start">
        <div className="mr-[2mm]">
          <a href={youtubeLink} target="_blank">
            <img src="/static/youtube-icon.png" alt="YouTube" className="w-[9.37mm] h-[6.48mm]" />
          </a>
        </div>
        <div className="text-white underline text-[10px] leading-[1.2]">
          <a href={youtubeLink} target="_blank">{youtubeText}</a>
        </div>
      </div>
      <div className="absolute top-[3mm] left-1/2 transform -translate-x-1/2 text-[10px] text-white text-center">{tagline}</div>
      <div className="absolute top-[10mm] left-1/2 transform -translate-x-1/2 text-[36px] font-['Ahsing',_sans-serif] text-white text-center">{brandHeading}</div>
      <div className="absolute top-[8mm] right-[8mm] bg-black text-white text-[18px] p-[2px_5px]">{date}</div>
      <div className="absolute top-[18mm] right-[8mm] text-[14px] text-white">{author}</div>
    </div>
  );
};
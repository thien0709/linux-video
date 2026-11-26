import React from "react";
import { TikTokIconCover } from "../../components/TikTokIconCover";

export const PacmanArchShortCover: React.FC = () => (
  <TikTokIconCover>
    <g transform="translate(540 930)">
      <ellipse cx="0" cy="210" rx="250" ry="54" fill="#080706" opacity="0.58" />

      {/* Isometric package cube */}
      <g transform="translate(0 92)">
        <polygon points="0,-116 178,-26 0,68 -178,-26" fill="#302A24" stroke="#B8C5D4" strokeWidth="8" strokeLinejoin="round" />
        <polygon points="-178,-26 0,68 0,250 -178,156" fill="#1C2630" stroke="#8AA0B5" strokeWidth="8" strokeLinejoin="round" />
        <polygon points="0,68 178,-26 178,156 0,250" fill="#151C23" stroke="#8AA0B5" strokeWidth="8" strokeLinejoin="round" />
        <path d="M-104,-26 L0,28 L104,-26 M0,28 V174" fill="none" stroke="#E4A84A" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Bright round package marker with a cutout */}
      <path d="M-4,-306 A156,156 0 1 0 124,-239 L0,-150 Z" fill="#FFCA55" stroke="#FFE7A4" strokeWidth="12" strokeLinejoin="round" />
      <circle cx="-56" cy="-358" r="18" fill="#FFF1C8" opacity="0.9" />
      <circle cx="-176" cy="-194" r="12" fill="#FF6B00" />
      <circle cx="191" cy="-190" r="15" fill="#FF6B00" />
    </g>
  </TikTokIconCover>
);

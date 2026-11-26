import React, { useId } from "react";
import { AbsoluteFill } from "remotion";

interface TikTokIconCoverProps {
  children: React.ReactNode; // Tự do vẽ cụm đồ họa vector/2.5D trong vùng x: 140..940, y: 740..1360
}

export const TikTokIconCover: React.FC<TikTokIconCoverProps> = ({ children }) => {
  const rawId = useId().replace(/:/g, "");
  const patternId = `cover-grid-${rawId}`;
  const gradId = `cover-fade-${rawId}`;
  const maskId = `cover-mask-${rawId}`;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 56%, #26221E 0%, #171513 72%, #110F0D 100%)",
      }}
    >
      <svg
        viewBox="0 0 1080 1920"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <pattern
            id={patternId}
            width="96"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 96 24 L 48 48 L 0 24 Z"
              fill="none"
              stroke="#EAE3D9"
              strokeOpacity="0.12"
              strokeWidth="1.4"
            />
          </pattern>

          {/* Lưới cục bộ tập trung ở nửa dưới (vùng đặt cụm icon), trên cùng để thoáng đặt Title TikTok */}
          <radialGradient id={gradId} cx="50%" cy="56%" r="38%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="65%" stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id={maskId}>
            <rect x="0" y="520" width="1080" height="960" fill={`url(#${gradId})`} />
          </mask>
        </defs>

        <rect
          x="0"
          y="520"
          width="1080"
          height="960"
          fill={`url(#${patternId})`}
          mask={`url(#${maskId})`}
        />

        {/* Vùng sáng tâm nhẹ phía sau cụm hình họa */}
        <circle cx="540" cy="1050" r="240" fill="#FF6B00" fillOpacity="0.06" />

        {/* Cụm đồ họa tự do của từng video (không chữ, không logo) */}
        {children}
      </svg>
    </AbsoluteFill>
  );
};

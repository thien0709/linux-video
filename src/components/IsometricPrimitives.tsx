import React, { useId } from "react";
import { interpolate } from "remotion";

interface IsometricStageProps {
  children: React.ReactNode;
  badgeText?: string;
}

export const IsometricStage: React.FC<IsometricStageProps> = ({
  children,
  badgeText = "LIVE SYSTEM FLOW",
}) => {
  const rawId = useId().replace(/:/g, "");
  const patternId = `iso-grid-${rawId}`;
  const gradId = `iso-fade-${rawId}`;
  const maskId = `iso-mask-${rawId}`;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 830 650"
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "660px",
          overflow: "visible",
        }}
      >
        <defs>
          {/* Lưới kim cương isometric 2:1 chỉ hiển thị bên trong sân khấu hoạt động */}
          <pattern
            id={patternId}
            width="80"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 80 20 L 40 40 L 0 20 Z"
              fill="none"
              stroke="#EAE3D9"
              strokeOpacity="0.11"
              strokeWidth="1.2"
            />
          </pattern>

          {/* Mặt nạ tỏa tròn giúp lưới tan mượt ra nền trơn bên ngoài, không có viền cứng hay tấm đen */}
          <radialGradient id={gradId} cx="50%" cy="52%" r="48%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="68%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id={maskId}>
            <rect x="0" y="20" width="830" height="610" fill={`url(#${gradId})`} />
          </mask>
        </defs>

        {/* Vùng lưới cục bộ phía sau các icon */}
        <rect
          x="0"
          y="20"
          width="830"
          height="610"
          fill={`url(#${patternId})`}
          mask={`url(#${maskId})`}
        />

        {/* Nhãn trạng thái góc trên trái khu vực sơ đồ */}
        <g transform="translate(16, 24)">
          <rect
            x="0"
            y="0"
            width={Math.max(220, badgeText.length * 14 + 44)}
            height="38"
            rx="19"
            fill="rgba(33, 30, 27, 0.85)"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1.5"
          />
          <circle cx="20" cy="19" r="6" fill="#FF6B00" />
          <text
            x="36"
            y="25"
            fill="#C7BFB5"
            fontSize="24"
            fontWeight="700"
            fontFamily="'JetBrainsMono Nerd Font', monospace"
            letterSpacing="1.2"
          >
            {badgeText}
          </text>
        </g>

        {children}
      </svg>
    </div>
  );
};

interface IsoBoxProps {
  x: number; // Tọa độ X tâm mặt trên (khuyên dùng: 200..650)
  y: number; // Tọa độ Y tâm mặt trên (khuyên dùng: 220..380)
  label: string;
  sublabel?: string;
  accent?: string;
  scale?: number;
  opacity?: number;
}

export const IsoBox: React.FC<IsoBoxProps> = ({
  x,
  y,
  label,
  sublabel,
  accent = "#FF6B00",
  scale = 1,
  opacity = 1,
}) => {
  const w = 78; // Tăng kích thước khối để rõ nét trên điện thoại
  const h = 40;
  const d = 62;
  const pillWidth = Math.max(190, label.length * 17 + 40);

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      style={{ opacity }}
    >
      {/* Bóng đổ mềm trên mặt lưới */}
      <ellipse
        cx="0"
        cy={h + d + 10}
        rx={w * 1.1}
        ry={h * 0.72}
        fill="rgba(0, 0, 0, 0.45)"
      />

      {/* Mặt trái */}
      <polygon
        points={`${-w},0 0,${h} 0,${h + d} ${-w},${d}`}
        fill="#24201C"
        stroke={accent}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Mặt phải */}
      <polygon
        points={`0,${h} ${w},0 ${w},${d} 0,${h + d}`}
        fill="#1A1714"
        stroke={accent}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Mặt trên */}
      <polygon
        points={`0,${-h} ${w},0 0,${h} ${-w},0`}
        fill="#322C27"
        stroke={accent}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Viền nhấn mặt trên */}
      <polygon
        points={`0,${-h + 10} ${w - 18},0 0,${h - 10} ${-w + 18},0`}
        fill="none"
        stroke={accent}
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />

      {/* Nhãn Pill độ tương phản cao đặt dưới khối */}
      <g transform={`translate(0, ${h + d + 40})`}>
        <rect
          x={-pillWidth / 2}
          y="-24"
          width={pillWidth}
          height="46"
          rx="23"
          fill="#211E1B"
          stroke={accent}
          strokeWidth="2.2"
        />
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fill="#F4F1EA"
          fontSize="25"
          fontWeight="800"
          fontFamily="'JetBrainsMono Nerd Font', monospace"
        >
          {label}
        </text>
        {sublabel && (
          <text
            x="0"
            y="48"
            textAnchor="middle"
            fill="#B5ADA4"
            fontSize="21"
            fontWeight="700"
            fontFamily="'JetBrainsMono Nerd Font', monospace"
          >
            {sublabel}
          </text>
        )}
      </g>
    </g>
  );
};

interface IsoBadgeProps {
  x: number;
  y: number;
  text: string;
  accent?: string;
}

export const IsoBadge: React.FC<IsoBadgeProps> = ({
  x,
  y,
  text,
  accent = "#F4F1EA",
}) => {
  const width = Math.max(160, text.length * 15 + 44);
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={-width / 2}
        y="-22"
        width={width}
        height="44"
        rx="22"
        fill="#211E1B"
        stroke={accent}
        strokeOpacity="0.75"
        strokeWidth="2"
      />
      <text
        x="0"
        y="7"
        textAnchor="middle"
        fill={accent}
        fontSize="22"
        fontWeight="700"
        fontFamily="'JetBrainsMono Nerd Font', monospace"
      >
        {text}
      </text>
    </g>
  );
};

interface IsoPacketFlowProps {
  from: [number, number];
  to: [number, number];
  progress: number;
  arcHeight?: number;
  color?: string;
  showPacket?: boolean;
}

export const IsoPacketFlow: React.FC<IsoPacketFlowProps> = ({
  from,
  to,
  progress,
  arcHeight = 105,
  color = "#FF6B00",
  showPacket = true,
}) => {
  const [x1, y1] = from;
  const [x2, y2] = to;

  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - arcHeight;

  const t = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const u = 1 - t;
  const px = u * u * x1 + 2 * u * t * cx + t * t * x2;
  const py = u * u * y1 + 2 * u * t * cy + t * t * y2;

  return (
    <g>
      <path
        d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth="3.8"
        strokeDasharray="11 9"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx={x1} cy={y1} r="5.5" fill={color} />
      <circle cx={x2} cy={y2} r="5.5" fill={color} />

      {showPacket && t > 0.01 && t < 0.99 && (
        <g transform={`translate(${px}, ${py})`}>
          <circle r="17" fill={color} opacity="0.28" />
          <circle r="8.5" fill={color} stroke="#F4F1EA" strokeWidth="2.2" />
        </g>
      )}
    </g>
  );
};

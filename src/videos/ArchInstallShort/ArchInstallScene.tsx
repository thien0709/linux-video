import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { TikTokSubtitle } from "../../components/TikTokSubtitle";
import { IsometricStage } from "../../components/IsometricPrimitives";
import { SCENES_DATA } from "./scenesData";

const C = { orange: "#FF6B00", mint: "#5BC0BE", ivory: "#F4F1EA", muted: "#B8B0A6", panel: "#211E1B", deep: "#171513", line: "#514941" };
const labelStyle: React.CSSProperties = { fontFamily: "'JetBrainsMono Nerd Font', monospace", fontWeight: 800, letterSpacing: 1 };

const Check: React.FC<{ x: number; y: number; color?: string }> = ({ x, y, color = C.mint }) => <g transform={`translate(${x} ${y})`}>
  <circle r="19" fill="#1C2421" stroke={color} strokeWidth="3" />
  <path d="M-9 0l6 7 13-15" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
</g>;

const Speaker: React.FC<{ x: number; y: number }> = ({ x, y }) => <g transform={`translate(${x} ${y})`} fill="none" stroke={C.mint} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
  <path d="M-20-8h10l13-11v38L-10 8h-10z" fill="#1C2523" />
  <path d="M12-11q16 11 0 22M18-19q27 19 0 38" />
</g>;

const Wifi: React.FC<{ x: number; y: number }> = ({ x, y }) => <g transform={`translate(${x} ${y})`} fill="none" stroke={C.mint} strokeWidth="4" strokeLinecap="round">
  <path d="M-27-12q27-24 54 0M-18-2q18-16 36 0M-9 9q9-8 18 0" />
  <circle cy="19" r="3.5" fill={C.orange} stroke="none" />
</g>;

const Clock: React.FC<{ x: number; y: number }> = ({ x, y }) => <g transform={`translate(${x} ${y})`}>
  <circle r="25" fill="#1C2523" stroke={C.mint} strokeWidth="4" />
  <path d="M0-14V1l11 7" fill="none" stroke={C.ivory} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M-32-26h9M23 26h9" stroke={C.orange} strokeWidth="4" strokeLinecap="round" />
</g>;

const Drive: React.FC<{ x: number; y: number }> = ({ x, y }) => <g transform={`translate(${x} ${y})`}>
  <rect x="-26" y="-22" width="52" height="44" rx="8" fill="#25201C" stroke={C.orange} strokeWidth="3" />
  <path d="M-16-9h32M-16 1h32" stroke={C.ivory} strokeWidth="3" strokeLinecap="round" />
  <circle cx="15" cy="13" r="3" fill={C.mint} />
</g>;

const UserIcon: React.FC<{ x: number; y: number }> = ({ x, y }) => <g transform={`translate(${x} ${y})`} fill="none" stroke={C.orange} strokeWidth="3.5" strokeLinecap="round">
  <circle cy="-11" r="10" fill="#25201C" />
  <path d="M-22 20q2-19 22-19t22 19z" fill="#25201C" />
</g>;

const Desktop: React.FC<{ x: number; y: number }> = ({ x, y }) => <g transform={`translate(${x} ${y})`}>
  <rect x="-32" y="-24" width="64" height="43" rx="5" fill="#25201C" stroke={C.mint} strokeWidth="3" />
  <path d="M0 19v11m-15 0h30" stroke={C.ivory} strokeWidth="4" strokeLinecap="round" />
  <circle cx="-19" cy="-13" r="3" fill={C.orange} />
</g>;

const SceneArt: React.FC<{ step: number; frame: number }> = ({ step, frame }) => {
  const reveal = (index: number) => interpolate(frame, [index * 5, index * 5 + 10], [0.72, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (step === 1) return <g>
    <text x="415" y="133" textAnchor="middle" fill={C.muted} fontSize="19" style={labelStyle}>CHỌN NƠI THỬ ARCH</text>
    <g opacity={reveal(0)}>
      <rect x="65" y="170" width="324" height="300" rx="24" fill={C.panel} stroke={C.line} strokeWidth="2" />
      <rect x="65" y="170" width="8" height="300" rx="4" fill={C.orange} />
      <g transform="translate(225 265)">
        <ellipse cy="36" rx="72" ry="24" fill="#24201C" stroke={C.mint} strokeWidth="4" />
        <ellipse cy="21" rx="72" ry="24" fill="#322C27" stroke={C.mint} strokeWidth="4" />
        <ellipse cy="6" rx="72" ry="24" fill="#24201C" stroke={C.mint} strokeWidth="4" />
        <circle cx="47" cy="6" r="6" fill={C.orange} />
      </g>
      <rect x="103" y="352" width="246" height="72" rx="12" fill="#191613" stroke="#514941" strokeWidth="2" />
      <text x="226" y="382" textAnchor="middle" fill={C.ivory} fontSize="20" style={labelStyle}>MÁY THẬT</text>
      <text x="226" y="408" textAnchor="middle" fill={C.muted} fontSize="15">USB khởi động</text>
    </g>
    <g opacity={reveal(1)}>
      <rect x="441" y="170" width="324" height="300" rx="24" fill={C.panel} stroke={C.mint} strokeWidth="3" />
      <g transform="translate(603 259)">
        <rect x="-62" y="-43" width="124" height="85" rx="12" fill="#24201C" stroke={C.ivory} strokeWidth="3" />
        <path d="M-16 43v16m-27 0h86" stroke={C.ivory} strokeWidth="5" strokeLinecap="round" />
        <rect x="-39" y="-22" width="78" height="43" rx="7" fill="#18302E" stroke={C.mint} strokeWidth="2" />
        <circle cx="0" cy="0" r="10" fill={C.orange} />
      </g>
      <rect x="479" y="352" width="246" height="72" rx="12" fill="#191613" stroke="#514941" strokeWidth="2" />
      <text x="602" y="382" textAnchor="middle" fill={C.ivory} fontSize="20" style={labelStyle}>MÁY ẢO</text>
      <text x="602" y="408" textAnchor="middle" fill={C.mint} fontSize="15">khuyên dùng để thử</text>
    </g>
    <path d="M389 319h52" stroke={C.orange} strokeWidth="4" strokeLinecap="round" />
    <path d="M426 309l12 10-12 10" fill="none" stroke={C.orange} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </g>;

  if (step === 2) return <g>
    <text x="415" y="133" textAnchor="middle" fill={C.muted} fontSize="19" style={labelStyle}>TỪ ẢNH ISO ĐẾN SHELL</text>
    <path d="M177 320H650" stroke={C.line} strokeWidth="5" strokeLinecap="round" />
    {[184, 415].map((x) => <path key={x} d={`M${x + 95} 320h83`} stroke={C.orange} strokeWidth="4" strokeLinecap="round" />)}
    {[0, 1, 2].map((i) => <g key={i} opacity={reveal(i)} transform={`translate(${178 + i * 230} 320)`}>
      <circle r="72" fill="#211E1B" stroke={i === 2 ? C.mint : C.orange} strokeWidth="4" />
      {i === 0 && <g transform="translate(0 -7)"><rect x="-16" y="-34" width="32" height="60" rx="10" fill="#24201C" stroke={C.ivory} strokeWidth="3" /><path d="M-8 26v20m16-20v20M-7-20h14" stroke={C.orange} strokeWidth="4" strokeLinecap="round" /></g>}
      {i === 1 && <g><circle r="33" fill="#24201C" stroke={C.mint} strokeWidth="3" /><circle r="17" fill="none" stroke={C.ivory} strokeWidth="3" /><path d="M-45 0h90" stroke={C.orange} strokeWidth="3" /></g>}
      {i === 2 && <g><rect x="-39" y="-28" width="78" height="56" rx="8" fill="#10100F" stroke={C.mint} strokeWidth="3" /><path d="M-25-8h12m7 0h17M-25 7h34" stroke={C.ivory} strokeWidth="3" strokeLinecap="round" /><circle cx="25" cy="-17" r="3" fill={C.orange} /></g>}
      <rect x="-89" y="91" width="178" height="55" rx="12" fill="#211E1B" stroke={i === 2 ? C.mint : C.line} strokeWidth="2" />
      <text y="125" textAnchor="middle" fill={C.ivory} fontSize="16" style={labelStyle}>{["USB BOOT", "ARCH ISO", "ROOT SHELL"][i]}</text>
    </g>)}
    <path d="M350 320l13-12v24zM580 320l13-12v24z" fill={C.orange} />
  </g>;

  if (step === 3) return <g>
    <text x="415" y="133" textAnchor="middle" fill={C.muted} fontSize="19" style={labelStyle}>CHẠY TRÌNH CÀI ĐẶT</text>
    <rect x="95" y="170" width="640" height="330" rx="22" fill="#11100F" stroke={C.mint} strokeWidth="3" />
    <path d="M95 217h640" stroke={C.line} strokeWidth="2" />
    {[0, 1, 2].map((i) => <circle key={i} cx={124 + i * 24} cy="194" r="6" fill={[C.orange, C.mint, C.ivory][i]} />)}
    <rect x="128" y="258" width="24" height="29" rx="5" fill={C.orange} />
    <path d="M137 265l9 7-9 7" fill="none" stroke="#171513" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <text x="174" y="282" fill={C.ivory} fontSize="31" style={{ ...labelStyle, letterSpacing: 0 }}>archinstall</text>
    <rect x="378" y="257" width="12" height="34" rx="4" fill={C.mint} opacity={reveal(1)} />
    <g opacity={reveal(2)}>
      <rect x="128" y="335" width="574" height="112" rx="14" fill="#211E1B" stroke="#514941" strokeWidth="2" />
      <path d="M161 372l11 10-11 10m28 0h34" fill="none" stroke={C.mint} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="260" y="390" fill={C.ivory} fontSize="19" style={labelStyle}>MENU VĂN BẢN</text>
      <text x="161" y="423" fill={C.muted} fontSize="16">Mũi tên di chuyển · Space chọn · Enter xác nhận</text>
    </g>
  </g>;

  if (step === 4) return <g>
    <text x="415" y="133" textAnchor="middle" fill={C.muted} fontSize="19" style={labelStyle}>BA LỰA CHỌN CẦN KIỂM TRA</text>
    <rect x="106" y="160" width="618" height="358" rx="24" fill={C.panel} stroke={C.line} strokeWidth="2" />
    {[
      { y: 220, title: "Ổ ĐĨA ĐÍCH", sub: "Bố cục mặc định · ext4", color: C.orange, icon: <Drive x={177} y={220} /> },
      { y: 327, title: "TÀI KHOẢN", sub: "Mật khẩu mạnh · superuser", color: C.mint, icon: <UserIcon x={177} y={327} /> },
      { y: 434, title: "MÔI TRƯỜNG", sub: "Desktop · greeter", color: C.orange, icon: <Desktop x={177} y={434} /> },
    ].map((row, i) => <g key={row.title} opacity={reveal(i)}>
      {i > 0 && <path d={`M134 ${row.y - 54}h562`} stroke={C.line} strokeWidth="2" />}
      {row.icon}
      <text x="239" y={row.y - 5} fill={C.ivory} fontSize="19" style={labelStyle}>{row.title}</text>
      <text x="239" y={row.y + 23} fill={C.muted} fontSize="16">{row.sub}</text>
      <Check x={658} y={row.y} color={row.color} />
    </g>)}
  </g>;

  if (step === 5) return <g>
    <text x="415" y="133" textAnchor="middle" fill={C.muted} fontSize="19" style={labelStyle}>CHỌN CÁC DỊCH VỤ MONG MUỐN</text>
    <g opacity={reveal(0)}>
      <rect x="105" y="158" width="620" height="91" rx="18" fill={C.panel} stroke={C.line} strokeWidth="2" />
      <Speaker x={160} y={204} />
      <text x="220" y="196" fill={C.ivory} fontSize="20" style={labelStyle}>ÂM THANH</text>
      <text x="220" y="224" fill={C.muted} fontSize="16">PipeWire</text>
      <Check x={667} y={204} />
    </g>
    <g opacity={reveal(1)}>
      <rect x="105" y="270" width="620" height="91" rx="18" fill={C.panel} stroke={C.line} strokeWidth="2" />
      <Wifi x={160} y={315} />
      <text x="220" y="308" fill={C.ivory} fontSize="20" style={labelStyle}>KẾT NỐI MẠNG</text>
      <text x="220" y="336" fill={C.muted} fontSize="16">NetworkManager</text>
      <Check x={667} y={315} />
    </g>
    <g opacity={reveal(2)}>
      <rect x="105" y="382" width="620" height="91" rx="18" fill={C.panel} stroke={C.line} strokeWidth="2" />
      <Clock x={160} y={427} />
      <text x="220" y="420" fill={C.ivory} fontSize="20" style={labelStyle}>MÚI GIỜ</text>
      <text x="220" y="448" fill={C.muted} fontSize="16">Chọn vùng của bạn</text>
      <Check x={667} y={427} />
    </g>
    <path d="M414 493v24m-28 0h56" stroke={C.orange} strokeWidth="4" strokeLinecap="round" />
    <rect x="322" y="527" width="186" height="54" rx="16" fill="#1C2925" stroke={C.mint} strokeWidth="3" opacity={reveal(3)} />
    <Check x={354} y={554} />
    <text x="383" y="561" fill={C.ivory} fontSize="17" style={labelStyle}>SẴN SÀNG</text>
  </g>;

  return <g>
    <text x="415" y="133" textAnchor="middle" fill={C.muted} fontSize="19" style={labelStyle}>CÀI XONG · THÁO ISO · KHỞI ĐỘNG</text>
    <g opacity={reveal(0)}>
      <circle cx="229" cy="323" r="108" fill="#211E1B" stroke={C.mint} strokeWidth="4" />
      <path d="M190 276a63 63 0 0 1 100 26" fill="none" stroke={C.orange} strokeWidth="10" strokeLinecap="round" />
      <path d="M294 286l-4 24-21-12" fill={C.orange} />
      <path d="M269 371a63 63 0 0 1-100-26" fill="none" stroke={C.mint} strokeWidth="10" strokeLinecap="round" />
      <path d="M165 360l4-24 21 12" fill={C.mint} />
      <text x="229" y="330" textAnchor="middle" fill={C.ivory} fontSize="19" style={labelStyle}>REBOOT</text>
    </g>
    <path d="M338 323h76" stroke={C.orange} strokeWidth="5" strokeLinecap="round" />
    <path d="M399 311l15 12-15 12" fill="none" stroke={C.orange} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <g opacity={reveal(1)}>
      <rect x="464" y="213" width="252" height="173" rx="17" fill="#24201C" stroke={C.mint} strokeWidth="4" />
      <rect x="481" y="230" width="218" height="131" rx="9" fill="#19302D" />
      <circle cx="590" cy="293" r="42" fill="#24201C" stroke={C.orange} strokeWidth="5" />
      <path d="M575 293l11 11 22-26" fill="none" stroke={C.ivory} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M559 386v29m-34 0h68" stroke={C.ivory} strokeWidth="5" strokeLinecap="round" />
    </g>
    <rect x="168" y="474" width="500" height="67" rx="16" fill={C.panel} stroke={C.line} strokeWidth="2" />
    <Check x={213} y={507} />
    <text x="252" y="514" fill={C.ivory} fontSize="18" style={labelStyle}>DESKTOP ARCH LINUX SẴN SÀNG</text>
  </g>;
};

export const ArchInstallScene: React.FC<{ step: number; captionText: string; durationInFrames: number; words: ReadonlyArray<{ text: string; startMs: number; endMs: number }> }> = ({ step, captionText, durationInFrames, words }) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 5, durationInFrames - 5, durationInFrames - 1], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scene = SCENES_DATA[step - 1];
  return <div style={{ position: "absolute", inset: 0, opacity: fade }}>
    <main style={{ position: "absolute", top: 355, left: 0, width: "100%", height: 660, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <IsometricStage badgeText={scene.stageBadge}><SceneArt step={step} frame={frame} /></IsometricStage>
    </main>
    <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 12px", boxSizing: "border-box" }}>
      <TikTokSubtitle text={captionText} durationInFrames={durationInFrames} words={words} maxWordsPerLine={4} maxCharsPerLine={20} />
    </div>
  </div>;
};

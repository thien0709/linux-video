import React from "react";

type Props = { size?: "sm" | "md" };

export const NiisLogo: React.FC<Props> = ({ size = "sm" }) => {
  const fontSize = size === "sm" ? 26 : 38;
  return (
    <div
      aria-label="NIIS"
      style={{
        display: "inline-flex",
        alignItems: "center",
        color: "#F4F1EA",
        fontFamily: "'JetBrainsMono Nerd Font', monospace",
        fontSize,
        fontWeight: 700,
        letterSpacing: -1.2,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "#FF6B00", marginRight: 7 }}>[&gt;_</span>
      <span>NIIS<span style={{ color: "#FF6B00" }}>.</span></span>
      <span style={{ color: "#FF6B00", marginLeft: 7 }}>]</span>
    </div>
  );
};

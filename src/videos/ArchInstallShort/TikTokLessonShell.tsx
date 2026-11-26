import React from "react";
import { NiisLogo } from "../../components/NiisLogo";
import { SCENES_DATA } from "./scenesData";

export const TikTokLessonShell: React.FC<{ children: React.ReactNode; activeIndex: number }> = ({ children, activeIndex }) => {
  const scene = SCENES_DATA[activeIndex];
  const progress = ((activeIndex + 1) / SCENES_DATA.length) * 100;
  return <div style={{ position: "absolute", inset: 0, fontFamily: "'JetBrainsMono Nerd Font', monospace", color: "#F4F1EA" }}>
    <header style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 3 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><NiisLogo size="sm" /><span style={{ fontSize: 28, lineHeight: 1, fontWeight: 800, letterSpacing: 1 }}>{String(activeIndex + 1).padStart(2, "0")} / 06</span></div>
      <div style={{ height: 6, marginTop: 22, borderRadius: 3, backgroundColor: "#38332E", overflow: "hidden" }}><div style={{ width: `${progress}%`, height: "100%", backgroundColor: "#FF6B00", borderRadius: 3 }} /></div>
      <h1 style={{ width: "100%", boxSizing: "border-box", margin: "22px 0 0", fontSize: 48, lineHeight: 1.13, fontWeight: 800, letterSpacing: -1, overflowWrap: "break-word" }}>{scene.stepTitle}</h1>
    </header>
    <section style={{ position: "absolute", top: 175, left: 0, width: "100%", minHeight: 145, boxSizing: "border-box", padding: "22px 26px", border: "2.5px solid #FF6B00", borderRadius: 18, backgroundColor: "#211E1B", zIndex: 3 }}>
      <div style={{ fontSize: 42, lineHeight: 1.12, fontWeight: 800, overflowWrap: "anywhere" }}>{scene.commandBadge}</div>
      <div style={{ marginTop: 10, fontSize: 27, lineHeight: 1.25, color: "#C7BFB5" }}>{scene.commandDesc}</div>
    </section>{children}
  </div>;
};

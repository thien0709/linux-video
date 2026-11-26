import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { TikTokSubtitle } from "../../components/TikTokSubtitle";

type Props = {
  children: React.ReactNode;
  captionText: string;
  durationInFrames: number;
  words: ReadonlyArray<{ text: string; startMs: number; endMs: number }>;
};

export const PacmanScene: React.FC<Props> = ({ children, captionText, durationInFrames, words }) => {
  const frame = useCurrentFrame();
  const visualOpacity = interpolate(
    frame,
    [0, 6, durationInFrames - 6, durationInFrames - 1],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div style={{ position: "absolute", inset: 0, opacity: visualOpacity }}>
      <main style={{ position: "absolute", top: 355, left: 0, width: "100%", height: 660, display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible", boxSizing: "border-box" }}>
        <div style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
          {children}
        </div>
      </main>
      <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 12px", boxSizing: "border-box" }}>
        <TikTokSubtitle text={captionText} durationInFrames={durationInFrames} words={words} maxWordsPerLine={4} maxCharsPerLine={20} />
      </div>
    </div>
  );
};

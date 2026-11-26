import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface WordTimestamp {
  text: string;
  startMs: number;
  endMs: number;
}

interface TikTokSubtitleProps {
  text: string;
  durationInFrames: number;
  words?: ReadonlyArray<WordTimestamp>;
  maxWordsPerLine?: number;
  maxCharsPerLine?: number;
}

export const TikTokSubtitle: React.FC<TikTokSubtitleProps> = ({
  text,
  durationInFrames,
  words = [],
  maxWordsPerLine = 4,
  maxCharsPerLine = 19,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pages = useMemo(() => {
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    const result: string[][] = [];
    let currentPage: string[] = [];
    let currentLength = 0;

    for (const token of tokens) {
      const addedLength = currentPage.length === 0 ? token.length : token.length + 1;
      if (
        currentPage.length > 0 &&
        (currentPage.length >= maxWordsPerLine || currentLength + addedLength > maxCharsPerLine)
      ) {
        result.push(currentPage);
        currentPage = [token];
        currentLength = token.length;
      } else {
        currentPage.push(token);
        currentLength += addedLength;
      }
    }
    if (currentPage.length > 0) result.push(currentPage);
    return result;
  }, [text, maxWordsPerLine, maxCharsPerLine]);

  const totalDurationMs = (durationInFrames / fps) * 1000;
  const speechStartMs = words.length > 0 ? words[0].startMs : 0;
  const speechEndMs =
    words.length > 0 ? words[words.length - 1].endMs : Math.max(300, totalDurationMs - 200);

  const currentMs = (frame / fps) * 1000 + 45;
  const progress = interpolate(currentMs, [speechStartMs, speechEndMs], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const totalChars = useMemo(() => text.replace(/\s+/g, "").length || 1, [text]);
  const currentCharIndex = Math.floor(progress * totalChars);

  let accumulatedChars = 0;
  let activePageIndex = pages.length - 1;
  let activeWordIndex = (pages[activePageIndex]?.length ?? 1) - 1;
  let pageStartChar = 0;

  for (let pIdx = 0; pIdx < pages.length; pIdx++) {
    const page = pages[pIdx];
    const pageChars = page.join("").length;

    if (currentCharIndex < accumulatedChars + pageChars || pIdx === pages.length - 1) {
      activePageIndex = pIdx;
      pageStartChar = accumulatedChars;
      let wordAcc = accumulatedChars;
      for (let wIdx = 0; wIdx < page.length; wIdx++) {
        wordAcc += page[wIdx].length;
        if (currentCharIndex < wordAcc || wIdx === page.length - 1) {
          activeWordIndex = wIdx;
          break;
        }
      }
      break;
    }
    accumulatedChars += pageChars;
  }

  const pageStartFrame = Math.floor(
    ((speechStartMs + (pageStartChar / totalChars) * (speechEndMs - speechStartMs)) / 1000) * fps
  );
  const popScale = spring({
    frame: Math.max(0, frame - pageStartFrame),
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  const visibleWords = pages[activePageIndex] || [];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        padding: "16px 24px",
        backgroundColor: "rgba(28, 25, 22, 0.88)",
        border: "1.5px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "20px",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)",
        fontFamily: "'JetBrainsMono Nerd Font', monospace",
        fontSize: "54px",
        fontWeight: 800,
        letterSpacing: "-0.5px",
        whiteSpace: "nowrap",
        transform: `scale(${0.94 + 0.06 * popScale})`,
      }}
    >
      {visibleWords.map((word, idx) => {
        const isCurrent = idx === activeWordIndex;
        const isPassed = idx < activeWordIndex;

        return (
          <span
            key={`${activePageIndex}-${idx}`}
            style={{
              display: "inline-block",
              color: isCurrent ? "#FF6B00" : isPassed ? "#FFA94D" : "#F4F1EA",
              transform: isCurrent ? "scale(1.08)" : "scale(1)",
              textShadow: isCurrent
                ? "0 4px 24px rgba(255, 107, 0, 0.55)"
                : "0 2px 8px rgba(0, 0, 0, 0.75)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

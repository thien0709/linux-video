import React from "react";
import { AbsoluteFill } from "remotion";

interface VerticalSafeZoneProps {
  children: React.ReactNode;
  showGuides?: boolean;
}

// Vùng an toàn đối xứng chuẩn cho TikTok 1080x1920 (vùng sạch: 830 x 1320, căn đúng trục giữa x = 540)
export const TIKTOK_VERTICAL_INSETS = {
  top: 220,    // Né thanh trạng thái + thanh Live / Following / For You / Search
  right: 125,  // Né Avatar (+), Tim, Bình luận, Lưu, Chia sẻ, Đĩa nhạc (bắt đầu từ x ~ 955)
  bottom: 380, // Né tên kênh, mô tả, hashtag, nhạc nền, thanh tua và thanh đáy
  left: 125,   // Đối xứng với lề phải để toàn bộ bố cục nằm chính giữa màn hình
};

export const TikTokVerticalSafeZone: React.FC<VerticalSafeZoneProps> = ({
  children,
  showGuides = false,
}) => {
  return (
    <AbsoluteFill
      style={{
        paddingTop: TIKTOK_VERTICAL_INSETS.top,
        paddingRight: TIKTOK_VERTICAL_INSETS.right,
        paddingBottom: TIKTOK_VERTICAL_INSETS.bottom,
        paddingLeft: TIKTOK_VERTICAL_INSETS.left,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {children}
      </div>

      {showGuides && (
        <AbsoluteFill style={{ pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: TIKTOK_VERTICAL_INSETS.top,
              backgroundColor: "rgba(255, 59, 48, 0.2)",
              borderBottom: "2px dashed #FF3B30",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: TIKTOK_VERTICAL_INSETS.top,
              right: 0,
              bottom: TIKTOK_VERTICAL_INSETS.bottom,
              width: TIKTOK_VERTICAL_INSETS.right,
              backgroundColor: "rgba(255, 59, 48, 0.2)",
              borderLeft: "2px dashed #FF3B30",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: TIKTOK_VERTICAL_INSETS.bottom,
              backgroundColor: "rgba(255, 59, 48, 0.2)",
              borderTop: "2px dashed #FF3B30",
            }}
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

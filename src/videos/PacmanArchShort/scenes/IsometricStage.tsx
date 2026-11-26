import React from "react";
import { useCurrentFrame } from "remotion";
import { IsoBadge, IsoBox, IsoPacketFlow, IsometricStage as PrimitiveStage } from "../../../components/IsometricPrimitives";

type BoxSpec = { point: [number, number]; label: string; sublabel?: string; accent?: string };
type FlowSpec = { from: number; to: number; color?: string };
type SceneSpec = { badge: string; boxes: BoxSpec[]; flows: FlowSpec[] };

const ORANGE = "#FF6B00";
const SAGE = "#81B29A";

const STAGES: SceneSpec[] = [
  {
    badge: "PACKAGE FLOW",
    boxes: [
      { point: [230, 300], label: "PACKAGE", sublabel: "APP", accent: SAGE },
      { point: [435, 245], label: "PACMAN", sublabel: "MANAGER", accent: ORANGE },
      { point: [640, 300], label: "ARCH", sublabel: "LINUX", accent: SAGE },
    ],
    flows: [{ from: 0, to: 1 }, { from: 1, to: 2, color: SAGE }],
  },
  {
    badge: "FULL UPDATE",
    boxes: [
      { point: [230, 300], label: "REPO", sublabel: "SYNC", accent: SAGE },
      { point: [435, 245], label: "-Syu", sublabel: "UPDATE", accent: ORANGE },
      { point: [640, 300], label: "SYSTEM", sublabel: "UP TO DATE", accent: SAGE },
    ],
    flows: [{ from: 0, to: 1 }, { from: 1, to: 2, color: SAGE }],
  },
  {
    badge: "SEARCH & INSTALL",
    boxes: [
      { point: [300, 285], label: "REPOSITORY", sublabel: "-Ss", accent: SAGE },
      { point: [580, 285], label: "INSTALL", sublabel: "-S", accent: ORANGE },
    ],
    flows: [{ from: 0, to: 1 }],
  },
  {
    badge: "PACKAGE QUERY",
    boxes: [
      { point: [240, 300], label: "PACKAGE", sublabel: "DATABASE", accent: SAGE },
      { point: [435, 245], label: "QUERY", sublabel: "-Qi", accent: ORANGE },
      { point: [630, 300], label: "ORPHANS", sublabel: "-Qdt", accent: SAGE },
    ],
    flows: [{ from: 0, to: 1 }, { from: 1, to: 2, color: SAGE }],
  },
  {
    badge: "REMOVE PACKAGES",
    boxes: [
      { point: [300, 285], label: "INSTALLED", sublabel: "APP", accent: SAGE },
      { point: [580, 285], label: "REMOVE", sublabel: "-Rns", accent: ORANGE },
    ],
    flows: [{ from: 0, to: 1 }],
  },
  {
    badge: "CACHE CLEANUP",
    boxes: [
      { point: [240, 300], label: "LATEST", sublabel: "KEEP", accent: SAGE },
      { point: [435, 245], label: "PACCACHE", sublabel: "-r", accent: ORANGE },
      { point: [630, 300], label: "OLD", sublabel: "VERSIONS", accent: SAGE },
    ],
    flows: [{ from: 0, to: 1 }, { from: 1, to: 2, color: SAGE }],
  },
];

export const IsometricStage: React.FC<{ step: number }> = ({ step }) => {
  const frame = useCurrentFrame();
  const scene = STAGES[step - 1];
  const progress = (frame % 90) / 90;

  return (
    <PrimitiveStage badgeText={scene.badge}>
      {scene.flows.map((flow, index) => {
        const from = scene.boxes[flow.from].point;
        const to = scene.boxes[flow.to].point;
        return (
          <IsoPacketFlow
            key={`flow-${index}`}
            from={from}
            to={to}
            progress={progress}
            arcHeight={86}
            color={flow.color ?? ORANGE}
          />
        );
      })}
      {scene.boxes.map((box, index) => (
        <IsoBox
          key={`box-${index}`}
          x={box.point[0]}
          y={box.point[1]}
          label={box.label}
          sublabel={box.sublabel}
          accent={box.accent}
        />
      ))}
      <IsoBadge x={425} y={590} text="LIVE FLOW" accent={ORANGE} />
    </PrimitiveStage>
  );
};

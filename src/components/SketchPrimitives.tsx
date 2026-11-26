import React from "react";
import rough from "roughjs/bin/rough";
import type { Drawable, Options, PathInfo } from "roughjs/bin/core";

/** Colors from the video-sketch-orange visual identity. */
export const SKETCH_COLORS = {
  background: "#191715",
  surface: "#211E1B",
  border: "#38332E",
  orange: "#FF6B00",
  amber: "#FFA94D",
  sage: "#81B29A",
  cream: "#F2CC8F",
  ink: "#F4F1EA",
  muted: "#9A938A",
} as const;

type CommonProps = {
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  progress?: number;
  seed?: number;
  roughness?: number;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
};

const clampProgress = (progress: number) => Math.max(0, Math.min(1, progress));

const drawablePaths = (drawables: Drawable[], generator: ReturnType<typeof rough.generator>) =>
  drawables.flatMap((drawable) => generator.toPaths(drawable));

const SketchSvg: React.FC<CommonProps & { paths: PathInfo[]; viewBox?: string }> = ({
  width = 200,
  height = 120,
  color = SKETCH_COLORS.ink,
  strokeWidth = 3,
  progress = 1,
  className,
  style,
  title,
  paths,
}) => {
  const visibleProgress = clampProgress(progress);
  return (
    <svg
      aria-label={title}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={style}
    >
      {title ? <title>{title}</title> : null}
      {paths.map((path, index) => {
        const length = path.d.length * 1.8;
        return (
          <path
            key={index}
            d={path.d}
            fill={path.fill === "none" ? "none" : path.fill}
            stroke={path.stroke === "none" ? color : path.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={length}
            strokeDashoffset={length * (1 - visibleProgress)}
          />
        );
      })}
    </svg>
  );
};

const makeGenerator = (roughness: number, seed: number) =>
  rough.generator({ options: { roughness, seed, stroke: SKETCH_COLORS.ink, strokeWidth: 3 } });

export type SketchStrokeProps = CommonProps & { d: string };

/** Draws an arbitrary SVG path with a hand-drawn roughjs stroke. */
export const SketchStroke: React.FC<SketchStrokeProps> = ({
  d,
  width = 200,
  height = 120,
  color = SKETCH_COLORS.ink,
  strokeWidth = 3,
  progress = 1,
  seed = 1,
  roughness = 1.5,
  ...props
}) => {
  const generator = makeGenerator(roughness, seed);
  const paths = drawablePaths([generator.path(d, { stroke: color, strokeWidth })], generator);
  return <SketchSvg {...props} width={width} height={height} color={color} strokeWidth={strokeWidth} progress={progress} paths={paths} />;
};

export type SketchBoxProps = CommonProps & {
  x?: number;
  y?: number;
  radius?: number;
  fill?: string;
};

/** A rough hand-drawn rectangle, optionally filled with a low-opacity color. */
export const SketchBox: React.FC<SketchBoxProps> = ({
  width = 220,
  height = 120,
  x = 8,
  y = 8,
  radius = 0,
  fill = "none",
  color = SKETCH_COLORS.orange,
  strokeWidth = 3,
  progress = 1,
  seed = 2,
  roughness = 1.6,
  ...props
}) => {
  const generator = makeGenerator(roughness, seed);
  const options: Options = { stroke: color, strokeWidth, fill, fillStyle: "solid", seed };
  const drawable = radius > 0
    ? generator.path(`M ${x + radius} ${y} H ${x + width - radius} Q ${x + width} ${y} ${x + width} ${y + radius} V ${y + height - radius} Q ${x + width} ${y + height} ${x + width - radius} ${y + height} H ${x + radius} Q ${x} ${y + height} ${x} ${y + height - radius} V ${y + radius} Q ${x} ${y} ${x + radius} ${y} Z`, options)
    : generator.rectangle(x, y, width, height, options);
  const paths = drawablePaths([drawable], generator);
  return <SketchSvg {...props} width={width + x * 2} height={height + y * 2} color={color} strokeWidth={strokeWidth} progress={progress} paths={paths} />;
};

export type SketchArrowProps = CommonProps & {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  headSize?: number;
};

/** A rough arrow with a two-stroke open arrowhead. */
export const SketchArrow: React.FC<SketchArrowProps> = ({
  width = 220,
  height = 100,
  x1 = 12,
  y1 = 50,
  x2 = 195,
  y2 = 50,
  headSize = 16,
  color = SKETCH_COLORS.orange,
  strokeWidth = 3,
  progress = 1,
  seed = 3,
  roughness = 1.5,
  ...props
}) => {
  const generator = makeGenerator(roughness, seed);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const left = angle + Math.PI * 0.82;
  const right = angle - Math.PI * 0.82;
  const paths = drawablePaths([
    generator.line(x1, y1, x2, y2, { stroke: color, strokeWidth, seed }),
    generator.line(x2, y2, x2 + Math.cos(left) * headSize, y2 + Math.sin(left) * headSize, { stroke: color, strokeWidth, seed: seed + 1 }),
    generator.line(x2, y2, x2 + Math.cos(right) * headSize, y2 + Math.sin(right) * headSize, { stroke: color, strokeWidth, seed: seed + 2 }),
  ], generator);
  return <SketchSvg {...props} width={width} height={height} color={color} strokeWidth={strokeWidth} progress={progress} paths={paths} />;
};

export type SketchHighlightProps = CommonProps & {
  x?: number;
  y?: number;
  highlightWidth?: number;
  highlightHeight?: number;
  mode?: "circle" | "underline";
};

/** An orange rough circle or underline used to call attention to a detail. */
export const SketchHighlight: React.FC<SketchHighlightProps> = ({
  width = 240,
  height = 90,
  x = 12,
  y = 12,
  highlightWidth = 210,
  highlightHeight = 58,
  mode = "circle",
  color = SKETCH_COLORS.orange,
  strokeWidth = 4,
  progress = 1,
  seed = 4,
  roughness = 1.8,
  ...props
}) => {
  const generator = makeGenerator(roughness, seed);
  const drawable = mode === "circle"
    ? generator.ellipse(x + highlightWidth / 2, y + highlightHeight / 2, highlightWidth, highlightHeight, { stroke: color, strokeWidth, seed })
    : generator.path(`M ${x} ${y + highlightHeight} Q ${x + highlightWidth / 2} ${y + highlightHeight + 5} ${x + highlightWidth} ${y + highlightHeight - 2}`, { stroke: color, strokeWidth, seed });
  const paths = drawablePaths([drawable], generator);
  return <SketchSvg {...props} width={width} height={height} color={color} strokeWidth={strokeWidth} progress={progress} paths={paths} />;
};

export type SketchIconName = "check" | "cross" | "bulb" | "gear" | "play" | "spark";
export type SketchIconProps = CommonProps & { name: SketchIconName; size?: number };

/** Small roughjs icons for common explainer concepts. */
export const SketchIcon: React.FC<SketchIconProps> = ({
  name,
  size = 96,
  width = size,
  height = size,
  color = name === "cross" ? SKETCH_COLORS.orange : SKETCH_COLORS.ink,
  strokeWidth = 3,
  progress = 1,
  seed = 5,
  roughness = 1.7,
  ...props
}) => {
  const generator = makeGenerator(roughness, seed);
  const line = (x1: number, y1: number, x2: number, y2: number, offset = 0) =>
    generator.line(x1, y1, x2, y2, { stroke: color, strokeWidth, seed: seed + offset });
  let drawables: Drawable[];
  switch (name) {
    case "check": drawables = [line(18, 50, 40, 72), line(40, 72, 80, 24, 1)]; break;
    case "cross": drawables = [line(24, 24, 72, 72), line(72, 24, 24, 72, 1)]; break;
    case "bulb": drawables = [generator.ellipse(48, 39, 46, 48, { stroke: color, strokeWidth, seed }), line(36, 61, 60, 61, 1), line(38, 69, 58, 69, 2), line(40, 77, 56, 77, 3), line(48, 4, 48, 13, 4), line(10, 38, 19, 41, 5), line(77, 41, 86, 38, 6)]; break;
    case "gear": drawables = [generator.ellipse(48, 48, 42, 42, { stroke: color, strokeWidth, seed }), generator.ellipse(48, 48, 15, 15, { stroke: color, strokeWidth, seed: seed + 1 }), line(48, 5, 48, 21, 2), line(48, 75, 48, 91, 3), line(5, 48, 21, 48, 4), line(75, 48, 91, 48, 5), line(17, 17, 28, 28, 6), line(68, 68, 79, 79, 7), line(79, 17, 68, 28, 8), line(28, 68, 17, 79, 9)]; break;
    case "play": drawables = [generator.polygon([[24, 14], [78, 48], [24, 82]], { stroke: color, strokeWidth, seed })]; break;
    case "spark": drawables = [line(48, 7, 48, 89), line(7, 48, 89, 48, 1), line(19, 19, 77, 77, 2), line(77, 19, 19, 77, 3)]; break;
  }
  const paths = drawablePaths(drawables, generator);
  return <SketchSvg {...props} width={width} height={height} color={color} strokeWidth={strokeWidth} progress={progress} paths={paths} />;
};

import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { TikTokVerticalSafeZone } from "../../components/TikTokVerticalSafeZone";
import { SfxTrack, type SfxCue } from "../../components/SfxTrack";
import { audioManifest } from "./audioData";
import { SCENES_DATA } from "./scenesData";
import { ArchInstallScene } from "./ArchInstallScene";
import { TikTokLessonShell } from "./TikTokLessonShell";

const durations = audioManifest.scenes.map((scene) => scene.durationInFrames);
const starts: number[] = [];
let cursor = 0;
for (const duration of durations) { starts.push(cursor); cursor += duration; }
export const archInstallDurationInFrames = cursor;
const cues: SfxCue[] = [{ frame: 0, sound: "tick" }, ...starts.slice(1).map((frame) => ({ frame, sound: "tick" as const })), { frame: starts[2] + 28, sound: "ding" }, { frame: starts[5] + 28, sound: "ding" }];

export const ArchInstallShort: React.FC = () => {
  const frame = useCurrentFrame();
  const found = starts.findIndex((start, index) => frame < start + durations[index]);
  const activeIndex = found < 0 ? SCENES_DATA.length - 1 : found;
  return <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "radial-gradient(circle at 50% 48%, #26221E 0%, #171513 72%, #110F0D 100%)" }}>
    <TikTokVerticalSafeZone><TikTokLessonShell activeIndex={activeIndex}>
      {SCENES_DATA.map((scene, index) => {
        const audio = audioManifest.scenes[index];
        return <Sequence key={scene.id} name={`${index + 1} • ${scene.stepTitle}`} from={starts[index]} durationInFrames={audio.durationInFrames}>
          <Audio src={staticFile(audio.audioPath)} />
          <ArchInstallScene step={index + 1} captionText={scene.captionText} durationInFrames={audio.durationInFrames} words={audio.words} />
        </Sequence>;
      })}
      <SfxTrack cues={cues} />
    </TikTokLessonShell></TikTokVerticalSafeZone>
  </div>;
};

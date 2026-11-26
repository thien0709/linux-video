import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { TikTokVerticalSafeZone } from "../../components/TikTokVerticalSafeZone";
import { SfxTrack, type SfxCue } from "../../components/SfxTrack";
import { audioManifest } from "./audioData";
import { SCENES_DATA } from "./scenesData";
import { PacmanScene } from "./PacmanScene";
import { TikTokLessonShell } from "./TikTokLessonShell";
import { Step1 } from "./scenes/Step1";
import { Step2 } from "./scenes/Step2";
import { Step3 } from "./scenes/Step3";
import { Step4 } from "./scenes/Step4";
import { Step5 } from "./scenes/Step5";
import { Step6 } from "./scenes/Step6";

const steps = [Step1, Step2, Step3, Step4, Step5, Step6] as const;
const sceneDurations = audioManifest.scenes.map((scene) => scene.durationInFrames);
const sceneStarts: number[] = [];
let nextSceneStart = 0;
for (const duration of sceneDurations) {
  sceneStarts.push(nextSceneStart);
  nextSceneStart += duration;
}

export const pacmanDurationInFrames = nextSceneStart;

const soundCues: SfxCue[] = [
  { frame: 0, sound: "tick" },
  ...sceneStarts.slice(1).map((frame) => ({ frame, sound: "tick" as const })),
  { frame: sceneStarts[1] + 30, sound: "ding" },
  { frame: sceneStarts[5] + 30, sound: "ding" },
];

export const PacmanArchShort: React.FC = () => {
  const frame = useCurrentFrame();
  const foundIndex = sceneStarts.findIndex((start, index) => frame < start + sceneDurations[index]);
  const activeIndex = foundIndex < 0 ? SCENES_DATA.length - 1 : foundIndex;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "radial-gradient(circle at 50% 48%, #26221E 0%, #171513 72%, #110F0D 100%)" }}>
    <TikTokVerticalSafeZone>
      <TikTokLessonShell activeIndex={activeIndex}>
        {SCENES_DATA.map((scene, index) => {
          const SceneStep = steps[index];
          const sceneAudio = audioManifest.scenes[index];
          return (
            <Sequence
              key={scene.id}
              name={`${index + 1} • ${scene.stepTitle}`}
              from={sceneStarts[index]}
              durationInFrames={audioManifest.scenes[index].durationInFrames}
            >
              <Audio src={staticFile(sceneAudio.audioPath)} />
              <PacmanScene captionText={scene.captionText} durationInFrames={sceneAudio.durationInFrames} words={sceneAudio.words}>
                <SceneStep />
              </PacmanScene>
            </Sequence>
          );
        })}
        <SfxTrack cues={soundCues} />
      </TikTokLessonShell>
    </TikTokVerticalSafeZone>
  </div>
  );
};

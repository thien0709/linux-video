import "./loadFonts";
import { Composition, Still } from "remotion";
import { ArchInstallShort, archInstallDurationInFrames } from "./videos/ArchInstallShort/ArchInstallShort";
import { ArchInstallShortCover } from "./videos/ArchInstallShort/ArchInstallShortCover";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="ArchInstallShort" component={ArchInstallShort} durationInFrames={archInstallDurationInFrames} fps={30} width={1080} height={1920} />
      <Still id="ArchInstallShortCover" component={ArchInstallShortCover} width={1080} height={1920} />
    </>
  );
};

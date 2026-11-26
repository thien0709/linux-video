import { continueRender, delayRender, staticFile } from "remotion";

const waitForFont = delayRender("Loading JetBrainsMono Nerd Font");

const loadFontFace = async (fileName: string, weight: string) => {
  const font = new FontFace(
    "JetBrainsMono Nerd Font",
    `url(${staticFile(`fonts/${fileName}`)}) format('truetype')`,
    { weight, style: "normal" }
  );
  const loadedFont = await font.load();
  document.fonts.add(loadedFont);
};

Promise.all([
  loadFontFace("JetBrainsMonoNerdFont-Regular.ttf", "400"),
  loadFontFace("JetBrainsMonoNerdFont-Bold.ttf", "700"),
])
  .then(() => {
    continueRender(waitForFont);
  })
  .catch((err) => {
    console.error("Failed to load font:", err);
    continueRender(waitForFont);
  });

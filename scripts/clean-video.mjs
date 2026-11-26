import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const rawName = process.argv[2]?.trim();
if (!rawName) {
  console.error("Cách dùng: node scripts/clean-video.mjs <TenVideo>");
  process.exit(1);
}

// Tự dò đúng tên thư mục không phân biệt chữ hoa/thường (vd: systemctlshort -> SystemctlShort)
let videoName = rawName;
const videosDir = path.join(projectRoot, "src", "videos");
if (fs.existsSync(videosDir)) {
  const matched = fs
    .readdirSync(videosDir)
    .find((entry) => entry.toLowerCase() === rawName.toLowerCase());
  if (matched) videoName = matched;
}

const targets = [
  path.join(projectRoot, "src", "videos", videoName),
  path.join(projectRoot, "src", videoName),
  path.join(projectRoot, "public", "audio", videoName),
  path.join(projectRoot, "out", `${videoName}.mp4`),
  path.join(projectRoot, "out", `${videoName}-cover.png`),
  path.join(projectRoot, "out", `${videoName}.txt`),
  path.join(projectRoot, "out", "content-research", videoName),
];

let deletedCount = 0;
for (const target of targets) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`✔ Đã xóa: ${path.relative(projectRoot, target)}`);
    deletedCount++;
  }
}

const rootPath = path.join(projectRoot, "src", "Root.tsx");
if (fs.existsSync(rootPath)) {
  let content = fs.readFileSync(rootPath, "utf8");
  const original = content;
  const importRegex = new RegExp(`^import\\s+.*${videoName}.*;\\r?\\n?`, "gm");
  const compRegex = new RegExp(
    `\\s*<Composition[\\s\\S]*?id=["']${videoName}["'][\\s\\S]*?/>\\r?\\n?`,
    "g"
  );
  const stillRegex = new RegExp(
    `\\s*<Still[\\s\\S]*?id=["']${videoName}Cover["'][\\s\\S]*?/>\\r?\\n?`,
    "g"
  );
  content = content
    .replace(importRegex, "")
    .replace(compRegex, "\n")
    .replace(stillRegex, "\n");
  if (content !== original) {
    fs.writeFileSync(rootPath, content, "utf8");
    console.log(`✔ Đã gỡ ${videoName} và ${videoName}Cover khỏi src/Root.tsx`);
    deletedCount++;
  }
}

if (deletedCount === 0) {
  console.log(`⚠ Không tìm thấy dữ liệu nào của "${rawName}". Kiểm tra lại tên trong src/videos/`);
}

---
name: content-to-video
description: Tạo trọn gói video TikTok dọc 9:16 (1080x1920 @ 30fps) từ URL bài viết/blog, file .txt hoặc kịch bản dán sẵn — lấy ý tưởng cốt lõi từ nguồn để viết lại thành kịch bản giải thích mới mẻ, cuốn hút trên nền template NIIS, giọng đọc CIT Voice Studio, SFX, caption và ảnh bìa vẽ tự do thuần icon.
argument-hint: "<URL bài viết, đường dẫn file .txt, hoặc nội dung kịch bản>"
---

# Quy trình Chuyển Nội dung thành Video TikTok Dọc (`/content-to-video`)

Đầu vào từ người dùng: **$ARGUMENTS**

Khi skill này được kích hoạt, **chạy thẳng mạch từ đầu đến cuối không dừng hỏi xác nhận bản quyền** (trừ khi đầu vào là kịch bản dán sẵn không rõ muốn giữ nguyên lời hay viết lại thì mới hỏi nhanh 1 câu).

## Bước 1: Lấy Nội dung Nguồn (Lưu tạm vào `/tmp/`, không sinh rác trong `out/`)
- Đặt `<CompositionName>` theo chuẩn PascalCase kết thúc bằng `Short` (ví dụ: `ArchInstallShort`, `NixFlakesShort`).
- Tạo thư mục tạm `/tmp/content-research-<CompositionName>/` để xử lý nội dung, tuyệt đối không tạo thư mục `content-research` hay file nháp trong `out/`.
- **URL:** Tải bằng `curl -sSLf -m 30 -A "Mozilla/5.0" -o /tmp/content-research-<CompositionName>/source.html "<URL>"`, trích phần nội dung chính và tiêu đề/nguồn (nếu bị chặn/rỗng thì báo ngắn gọn để người dùng dán nội dung).
- **File `.txt` / Kịch bản dán:** Đọc nội dung trực tiếp. Nếu người dùng dán kịch bản sẵn và yêu cầu giữ nguyên lời thì giữ nguyên từng chữ; nếu là bài viết/ý tưởng/URL thì chuyển hóa thành kịch bản giải thích mới.

## Bước 2: Sáng tạo Lại Kịch bản 6 Cảnh (`src/videos/<CompositionName>/scenesData.ts`)
- **Lấy ý tưởng & dữ kiện cốt lõi từ bài nguồn, viết lại thành một bài giải thích mới mẻ, mạch lạc, có nhịp kể chuyện TikTok** (khoảng 200–225 từ, 45–60 giây).
- **Không lặp đi lặp lại cụm `"theo <nguồn>"` trong lời thoại** — hãy nói thẳng như một người chia sẻ kiến thức kỹ thuật tự nhiên, chỉ giữ đúng các thông số/lệnh/bước kỹ thuật quan trọng từ bài và có thể bổ sung ngữ cảnh giải thích dễ hiểu cho người xem nếu cần (nhưng không bịa sai thông tin kỹ thuật).
- Xuất mảng `SCENES_DATA` gồm `id`, `stageBadge`, `commandBadge`, `commandDesc`, `captionText`, `voiceText`:
  - Viết số bằng chữ trong `voiceText` nếu cần CIT TTS đọc chuẩn, giữ chữ số trong `captionText`.
  - Rà soát chính tả tiếng Việt 100%.

## Bước 3: Dựng Giao diện Chuẩn Template NIIS (1080x1920 @ 30fps)
1. **Khung & Vùng an toàn:** `width={1080}`, `height={1920}`, `fps={30}`, bọc trong `<TikTokVerticalSafeZone>` (`src/components/TikTokVerticalSafeZone.tsx`, lề đối xứng `125px` hai bên). Nền ngoài `radial-gradient(circle at 50% 48%, #26221E 0%, #171513 72%, #110F0D 100%)` cố định ngoài `<Sequence>`.
2. **Bố cục 3 tầng:**
   - **Tầng 1:** `<NiisLogo size="sm" />` + `0X / 06` + thanh progress cam `#FF6B00`, tiêu đề `48px` và `Hero Command Card` (`#211E1B`, viền `2.5px solid #FF6B00`).
   - **Tầng 2 (Sân khấu Minh họa Tự do theo Cơ chế — BẮT BUỘC ĐA DẠNG):**
     Bọc hình vẽ trong `<IsometricStage badgeText={scene.stageBadge}>` (`viewBox="0 0 830 650"`).
     **Nguyên tắc chống lặp "khối hộp truyền dữ liệu":**
     - **TUYỆT ĐỐI CẤM** vẽ kiểu "các khối hộp lập phương/hình thoi nối nhau bằng đường đứt kèm nhãn pill bên dưới" lặp lại giữa các cảnh (đặc biệt không dùng cho các cảnh tùy chọn, cài đặt, cấu hình, so sánh hay tổng kết).
     - **Mỗi cảnh phải tự viết SVG vector mô tả trực tiếp hành động/cơ chế của ý đó**, kết hợp đa dạng các hình thức như: bảng tích chọn/checklist trạng thái (`[✓]` / `[•]`), sơ đồ kết nối thiết bị/mạng (sóng Wi-Fi, cổng cắm, loa/tai nghe, đồng hồ múi giờ), luồng bước ngang/dọc có mũi tên chỉ hướng, biểu đồ cột/thanh tiến trình, khung terminal/code, hoặc lát cắt thành phần. Có thể dùng component trong `src/components/IsometricPrimitives.tsx` khi phù hợp, nhưng **ưu tiên tự dựng hình SVG chuyên biệt sát với từng ngữ cảnh** để mỗi cảnh nhìn khác hẳn nhau.
     - **4 Luật Hình Học Bắt Buộc:**
       1. Cấm đặt chữ bên trong hình thoi/đa giác vát cạnh (chữ chỉ nằm trong thẻ chữ nhật ngang, ô tròn/badge gọn hoặc khoảng trống sạch).
       2. Đổ nền đặc cho mọi khối/hình có chiều sâu (`fill="#24201C"` / `#211E1B`), không để nét đằng sau cắt ngang qua chữ.
       3. Không vẽ thêm pill `STEP X / 6` bên trong `<IsometricStage>`.
       4. Giữ mọi chi tiết trong `x: 25..805`, `y: 75..620`; dùng `useCurrentFrame()` cục bộ từ `0` bên trong `<Sequence>`, hiển thị rõ ngay từ frame `0..10`.
   - **Tầng 3:** `<TikTokSubtitle text={scene.captionText} durationInFrames={sceneAudio.durationInFrames} words={sceneAudio.words} />` (`54px`).

## Bước 4: Sinh Giọng đọc CIT Voice Studio, SFX & Render Video
1. Đọc `.env` (`TTS_PROVIDER=cit`, `CIT_TTS_URL=http://127.0.0.1:8001`). Nếu Sandbox chặn kết nối `localhost`, yêu cầu chạy với quyền ngoài sandbox (escalated permissions).
2. Chạy `npx tsx scripts/generate-tts.ts <CompositionName>`.
3. Gắn `<Audio>` vào tất cả `<Sequence>`, gắn `<SfxTrack />`, đăng ký `<Composition>` trong `src/Root.tsx`.
4. Chạy `npx tsc --noEmit` và render `npx remotion render <CompositionName> out/<CompositionName>.mp4`.

## Bước 5: Tạo Ảnh bìa Vẽ Tự Do Thuần Icon (`out/<CompositionName>-cover.png`)
1. Tạo `<CompositionName>Cover` bọc bởi `<TikTokIconCover>` (`src/components/TikTokIconCover.tsx`).
2. **Chừa trống nửa trên (`y: 0..680`)** để người dùng đặt tiêu đề chữ trên TikTok. Trong vùng **`x: 200..880, y: 740..1340`**, tự do sáng tác một cụm đồ họa vector / 2.5D độc đáo sát với chủ đề video (khối đặc màu `#24201C`, nét cam `#FF6B00`, xanh ngọc `#5BC0BE`, trắng ngà `#F4F1EA`) — **TUYỆT ĐỐI KHÔNG chứa chữ, số hay logo**.
3. Đăng ký `<Still id="<CompositionName>Cover" ... width={1080} height={1920} />` vào `src/Root.tsx` và chạy `npx remotion still <CompositionName>Cover out/<CompositionName>-cover.png`.

## Bước 6: Dọn File Tạm & Trả Kết quả Gọn
1. Xóa sạch `/tmp/content-research-<CompositionName>` để thư mục `out/` chỉ chứa `.mp4` và `-cover.png`.
2. In sẵn **Caption đăng TikTok** (dưới 350 ký tự, có hook + 3 gạch đầu dòng ngắn + CTA + ghi tên nguồn gọn 1 dòng + hashtag `#niis`) trong code block, kèm đường dẫn file `.mp4` / `-cover.png` và lệnh dọn dẹp `node scripts/clean-video.mjs <CompositionName>`.

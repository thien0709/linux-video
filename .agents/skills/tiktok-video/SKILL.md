---
name: tiktok-video
description: Tạo trọn gói video TikTok dọc 9:16 (1080x1920 @ 30fps) giữ nguyên bộ nhận diện NIIS (nền gradient ấm, Header + Progress bar, Hero Command Card viền cam, sân khấu lưới cục bộ IsometricStage với hình vẽ minh họa vector tự do đa dạng từng cảnh, phụ đề Karaoke 54px), giọng đọc CIT Voice Studio, SFX, caption và ảnh bìa thuần icon.
argument-hint: "<chủ đề hoặc nội dung video cần tạo>"
---

# Quy trình Tự động Tạo Video TikTok Dọc (`/tiktok-video`)

Yêu cầu từ người dùng: **$ARGUMENTS**

Khi skill này được kích hoạt, hãy tự động thực hiện trọn vẹn 7 bước dưới đây mà **không cần hỏi lại người dùng**:

## Bước 1: Lên Kịch bản 6 Bước & Đặt tên Composition
1. Từ chủ đề `$ARGUMENTS`, đặt tên Composition theo chuẩn PascalCase kết thúc bằng `Short` (ví dụ: `ArchBootShort`, `DockerLayerShort`, `SystemctlShort`).
2. Biên soạn kịch bản **6 bước** súc tích, cuốn hút (tổng thời lượng khoảng 40–55 giây):
   - **Bước 1 (Hook):** Câu mở đầu đánh trúng vấn đề hoặc cơ chế cốt lõi khiến người xem dừng lại.
   - **Bước 2 – 5 (Phân tích trực quan):** Giải thích từng mảnh ghép kỹ thuật, luồng hoạt động, so sánh hoặc số liệu.
   - **Bước 6 (Chốt hạ):** Mẹo thực chiến hoặc 3 nguyên tắc cần nhớ.
3. Tạo file `src/videos/<CompositionName>/scenesData.ts` xuất mảng `SCENES_DATA` gồm 6 phần tử (`id`, `stageBadge`, `commandBadge`, `commandDesc`, `captionText`, `voiceText`):
   - **Rà soát chính tả tiếng Việt 100%** cho mọi trường văn bản.
   - `voiceText` viết tiếng Việt tự nhiên có dấu phẩy `,` ngắt nhịp lấy hơi, **giữ nguyên thuật ngữ tiếng Anh gốc** (`Linux`, `Kernel`, `systemd`, `Docker`...) để CIT Voice Studio đọc song ngữ chuẩn.

## Bước 2: Dựng Giao diện NIIS Chuẩn Mobile-First (1080x1920 @ 30fps)
Tham khảo cấu trúc chuẩn của `src/videos/PacmanArchShort/` và tuân thủ nghiêm ngặt:
1. **Khung & Vùng an toàn:** `width={1080}`, `height={1920}`, `fps={30}`. Bọc toàn bộ trong `<TikTokVerticalSafeZone>` (`src/components/TikTokVerticalSafeZone.tsx`, lề đối xứng `top: 220`, `right: 125`, `bottom: 380`, `left: 125` → vùng sạch `830 x 1320`).
2. **Nền & Chống nháy đen:**
   - Lớp nền ngoài cùng dùng nền trơn chuyển sắc ấm `radial-gradient(circle at 50% 48%, #26221E 0%, #171513 72%, #110F0D 100%)` (**cấm vẽ lưới lên nền ngoài**).
   - Đặt nền ngoài, `<TikTokVerticalSafeZone>` và `<NiisLogo size="sm" />` cố định bên ngoài các `<Sequence>`. Các `<Sequence>` nối khít frame (`nextStart = prevStart + prevDuration`).
3. **Bố cục 3 tầng cố định của NIIS (`width: "100%"`):**
   - **Tầng 1 — Header & Hero Command Card (GIỮ NGUYÊN TEMPLATE CŨ):**
     - Hàng trên: `<NiisLogo size="sm" />` bên trái + bộ đếm `0X / 06` (`28px` đậm) bên phải + thanh progress bar cam `#FF6B00` (`height: 6px`).
     - Tiêu đề chính: cỡ **`48px`** đậm (`#F4F1EA`).
     - **Hero Command Card:** Thẻ nổi bật (`background: #211E1B`, viền `2.5px solid #FF6B00`, `borderRadius: 18px`, `padding: 22px 26px`) hiển thị từ khóa/lệnh trọng tâm cỡ **`44px`** đậm và dòng giải thích cỡ **`28px`** (`#C7BFB5`).
   - **Tầng 2 — Sân khấu Minh họa Tự do (`<IsometricStage badgeText={scene.stageBadge}>`):**
     - Luôn bọc hình vẽ trong `<IsometricStage>` (`src/components/IsometricPrimitives.tsx`, `viewBox="0 0 830 650"`) để giữ nền lưới cục bộ tan viền đặc trưng của kênh.
     - **TỰ DO SÁNG TẠO HÌNH VẼ THEO NGỮ CẢNH (CẤM LẶP LẠI MỘT KIỂU HỘP TRUYỀN HẠT):** Bên trong `<IsometricStage>`, kết hợp linh hoạt các component có sẵn (`<IsoLayerStack>`, `<IsoTerminal>`, `<IsoCompare>`, `<IsoNode icon="..." />`, `<IsoPacketFlow>`) **VÀ tự viết thêm SVG vector minh họa chuyên biệt** (`strokeWidth: 2.2–2.8`, bảng màu `#F4F1EA`, `#FF6B00`, `#5BC0BE`, `#FFA94D`, `#211E1B`) sao cho mỗi cảnh là một cách phân tích hình ảnh khác nhau:
       - *Mặt cắt & Cấu trúc bộ nhớ/đĩa:* Vẽ sơ đồ phân vùng ổ đĩa, ánh xạ RAM, cấu trúc file/layer xếp chồng.
       - *Cây tiến trình & Luồng thực thi:* Vẽ cây phân nhánh song song (như `systemd` rẽ nhánh service), bánh răng xử lý, phễu lọc, ổ khóa phân quyền.
       - *Biểu đồ & Số liệu trực quan:* Vẽ biểu đồ cột so sánh tốc độ, đường cong tài nguyên, thước đo thời gian khởi động.
       - *So sánh đối đầu (A vs B):* Hai cột thẻ hoặc hai mô hình đặt cạnh nhau có điểm khác biệt nổi bật.
       - *Cảnh chốt (3 điều cần nhớ):* 3 hàng đánh số `1, 2, 3` rõ nét kèm 3 icon vector mini ở bên phải.
     - **Quy tắc Animation chống khung hình trống:** Bên trong `<Sequence>`, `useCurrentFrame()` đã bắt đầu từ `0` — **tuyệt đối không trừ thêm `startFrame`**, luôn hiển thị rõ hình vẽ chính ngay từ frame `0..10` (không bao giờ để vùng giữa màn hình trống trơn).
   - **Tầng 3 — Phụ đề Karaoke:** `<TikTokSubtitle text={scene.captionText} durationInFrames={sceneAudio.durationInFrames} words={sceneAudio.words} />` (`54px`) neo gọn ở đáy vùng an toàn.

## Bước 3: Sinh Giọng đọc qua CIT Voice Studio
1. Đọc cấu hình từ `.env` (`TTS_PROVIDER=cit`, `CIT_TTS_URL=http://127.0.0.1:8001`, `CIT_TTS_VOICE`).
2. **Lưu ý Sandbox:** CIT Voice Studio chạy trên máy host tại `http://127.0.0.1:8001`. Nếu script sinh TTS thất bại do Sandbox chặn mạng `localhost`, **không chạy `docker start`**, hãy yêu cầu chạy với quyền ngoài sandbox (escalated permissions).
3. Xóa `public/audio/<CompositionName>` (nếu có) và chạy `npx tsx scripts/generate-tts.ts <CompositionName>`.

## Bước 4: Ghép Giọng đọc, Hiệu ứng SFX & Đăng ký Composition
1. Gắn `<Audio src={staticFile(sceneAudio.audioPath)} />` vào đủ cả 6 `<Sequence>`.
2. Import và gắn `<SfxTrack />` từ `src/components/SfxTrack.tsx` để tạo âm thanh chuyển cảnh/nhấn nhá.
3. Đăng ký `<Composition id="<CompositionName>" ... width={1080} height={1920} fps={30} />` trong `src/Root.tsx` trỏ tới `src/videos/<CompositionName>/`.

## Bước 5: Kiểm tra & Render Video
1. Chạy `npx tsc --noEmit` để đảm bảo sạch lỗi TypeScript.
2. Chạy `npx remotion render <CompositionName> out/<CompositionName>.mp4`.

## Bước 6: Tự động Viết Caption & Hashtag Đăng TikTok
1. Không lưu file `.txt` vào `out/` (giữ thư mục `out/` chỉ có `.mp4` và `-cover.png`). In nguyên văn caption trong code block ở cuối phản hồi kèm lệnh dọn dẹp: `node scripts/clean-video.mjs <CompositionName>`.

## Bước 7: Tạo Ảnh bìa TikTok Vẽ Tự Do Thuần Icon (`out/<CompositionName>-cover.png`)
1. Tạo component `<CompositionName>Cover` bọc bởi `<TikTokIconCover>` (`src/components/TikTokIconCover.tsx`).
2. **Chừa trống nửa trên (`y: 0..680`)** để người dùng đặt tiêu đề chữ trên TikTok. Trong vùng **`x: 200..880, y: 740..1340`**, tự do sáng tác một cụm minh họa vector / 2.5D độc đáo sát với chủ đề video (kết hợp hình khối đặc màu `#24201C`, nét cam `#FF6B00`, xanh ngọc `#5BC0BE`, trắng ngà `#F4F1EA`) — không dùng lại một khuôn icon đơn điệu giữa các video, và **TUYỆT ĐỐI KHÔNG chứa chữ, số hay logo**.
3. Đăng ký `<Still id="<CompositionName>Cover" ... width={1080} height={1920} />` vào `src/Root.tsx` và chạy `npx remotion still <CompositionName>Cover out/<CompositionName>-cover.png`.

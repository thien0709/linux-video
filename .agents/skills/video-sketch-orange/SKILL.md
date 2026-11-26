---
name: video-sketch-orange
description: Tạo video giải thích công nghệ 50-60s (1920x1080 @ 30fps) theo giao diện Interactive Isometric Lesson UI (nền than ấm lưới kim cương mờ, logo thương hiệu NIIS, khối minh họa isometric 2.5D, thẻ trạng thái phía trên, thanh tiến trình bước phía dưới) sử dụng font JetBrainsMono Nerd Font, giọng đọc tiếng Việt tự nhiên và phụ đề 1 dòng đổi màu từng từ kiểu TikTok.
---

# Isometric Tech Lesson Skill (NIIS + JetBrainsMono + TikTok Karaoke Edition)

## 1. Hệ thống Nhận diện & Bố cục Bắt buộc (Layout & Design Tokens)

Toàn bộ giao diện sử dụng duy nhất font `'JetBrainsMono Nerd Font', monospace` (đã nạp qua `src/loadFonts.ts`) và chia thành 4 tầng cố định trên khung hình `1920x1080`:

1. **Nền & Bảng màu:**
   - **Nền chính:** Đen than ấm `#191715` phủ lưới đường chéo isometric mờ (stroke `#262320`, `strokeWidth: 1`).
   - **Bề mặt thẻ (Cards & Pills):** `#211E1B` với viền mảnh `#38332E` (`borderRadius: 12px`).
   - **Màu nhấn chính (Primary Orange):** `#FF6B00` (dấu nhắc logo `NIIS.`, đường luồng dữ liệu chính, từ đang đọc trên phụ đề, thẻ/bước đang active).
   - **Màu nhấn phụ:** Cam ấm `#FFA94D` (từ đã đọc qua trên phụ đề), Xanh xô thơm `#81B29A` (luồng phản hồi `response` / badge), Vàng kem `#F2CC8F`.
   - **Chữ:** Trắng ngà `#F4F1EA` (tiêu đề chính & từ chưa đọc) và Xám ấm `#9A938A` (mô tả phụ).

2. **Tầng 1 — Top Lesson Header & Logo `NIIS` (Cố định phía trên):**
   - **Bên trái:** Đặt component `<NiisLogo size="sm" />` (từ `src/components/NiisLogo.tsx`) nằm ngang hàng ngay trước dòng Breadcrumb màu xám (ví dụ: `[>_ NIIS.]  •  01. Linux Core / Lesson 1 of 6`), bên dưới là tiêu đề lớn đậm (`44px`) và 1 dòng mô tả ngắn.
   - **Bên phải:** 3 huy hiệu viên thuốc (pill badges) viền mảnh: `[⏱ 1 min]`, `[📶 Beginner]`, `[☰ 6 steps]`.

3. **Tầng 2 — Top Status / Flag Cards (Hàng thẻ chỉ số ngang):**
   - 4–5 thẻ chữ nhật bo góc nằm ngang ngay dưới Header (hiển thị các cờ lệnh hoặc thông số chính của bài học), thẻ nào đang được giải thích ở cảnh hiện tại sẽ sáng viền màu cam `#FF6B00`.

4. **Tầng 3 — Center Isometric Stage (Sân khấu minh họa 2.5D) & TikTok Subtitle:**
   - Vẽ các khối kiến trúc isometric bo góc nổi khối (Laptop, Terminal, Server, Package, Kernel...) đặt trên đế tối màu có viền sáng `#D8D3CC`.
   - Các đối tượng gắn nhãn dạng viên thuốc (`pill label` nền `#211E1B` viền `#F4F1EA`, kèm icon) và nối với nhau bằng đường ống/mũi tên có các hạt tín hiệu màu `#FF6B00` và `#81B29A` di chuyển mượt mà (`interpolate`).
   - **Phụ đề kiểu TikTok (`<TikTokSubtitle />`):** Đặt ngay phía dưới khối minh họa trung tâm, dùng component `TikTokSubtitle` từ `src/components/TikTokSubtitle.tsx`. KHÔNG đóng khung viền chữ nhật quanh phụ đề; hiển thị 1 dòng duy nhất (5–6 từ nguyên vẹn/cụm, tuyệt đối không cắt ngang từ), đọc tới từ nào từ đó đổi sang màu cam `#FF6B00` và phóng nhẹ `scale(1.08)`.

5. **Tầng 4 — Bottom Lesson Stepper (Cố định cạnh dưới):**
   - Dòng chữ nhỏ `IN THIS LESSON` bên trái và `Step X of 6` bên phải.
   - Thanh tiến trình ngang gồm 6 vòng tròn đánh số `1` đến `6` nối bằng đường kẻ mảnh, kèm nhãn ngắn bên dưới mỗi số. Vòng tròn của cảnh hiện tại tô nền nổi bật (`#81B29A` hoặc `#FF6B00`).

---

## 2. Quy tắc Giọng đọc Tiếng Việt Tự nhiên (BẮT BUỘC)

Để giọng đọc mượt mà như người Việt thật, không bị khựng khi gặp thuật ngữ tiếng Anh hay ký tự đặc biệt:
1. **Tách đôi kịch bản mỗi cảnh:**
   - `captionText`: Văn bản chuẩn kỹ thuật hiển thị lên `<TikTokSubtitle />` (ví dụ: `Cập nhật toàn hệ thống với sudo pacman -Syu`). Rà soát kỹ chính tả tiếng Việt trước khi xuất.
   - `voiceText`: Văn bản thuần tiếng Việt văn nói đưa cho TTS đọc — **bắt buộc phiên âm mềm hoặc diễn giải các từ tiếng Anh/cờ lệnh**, dùng dấu phẩy `,` để ngắt nhịp lấy hơi tự nhiên (ví dụ: `Để cập nhật toàn bộ hệ thống, bạn dùng lệnh pắc-man trừ S, Y, U.`).
2. **Sinh audio & Đồng bộ frame:**
   - Gọi `generateTopicVoices("<TopicName>", scenes)` (truyền `voiceText` vào trường `text`) từ `scripts/generate-tts.ts`.
   - Dùng `durationInFrames` thực tế từ `audioData.ts` cho từng cảnh và đặt `<SfxTrack />` từ `src/components/SfxTrack.tsx` (`tick` nhẹ khi chuyển bước, `ding` tại điểm nhấn chính).

---

## 3. Quy trình Thực thi Tự động (5 Bước)

1. **Soạn kịch bản 6 bước:** Thiết kế 6 bước logic tương ứng với 6 vòng tròn trên thanh Stepper phía dưới, mỗi bước có đủ `stepTitle`, `captionText` và `voiceText`.
2. **Sinh Voiceover:** Tạo thư mục `src/videos/<TopicName>/`, chạy `npx tsx scripts/generate-tts.ts <TopicName>` để lấy file âm thanh và `audioData.ts`.
3. **Tạo Component `src/videos/<TopicName>/`:**
   - Tạo layout chung `LessonFrame.tsx` chứa sẵn: Nền lưới isometric + Top Header kèm `<NiisLogo />` + Hàng thẻ trạng thái + Bottom Stepper tự động highlight theo `activeStep` (1..6) + `<TikTokSubtitle />`.
   - Tạo 6 file `scenes/Step1.tsx` -> `Step6.tsx` chỉ tập trung vẽ phần minh họa Isometric 2.5D ở khu vực trung tâm.
4. **Nguyên tắc Code Remotion:** Tuân thủ `remotion-best-practices`, dùng `spring({ frame, fps, config: { damping: 14, stiffness: 110 } })` và `interpolate` có clamp. Luôn đọc audio qua `staticFile(audioManifest.scenes[i].audioPath)`.
5. **Đăng ký & Render:** Thêm `<Composition id="<TopicName>" width={1920} height={1080} fps={30} ... />` vào `src/Root.tsx` và chạy `npx remotion render <TopicName> out/<TopicName>.mp4`.

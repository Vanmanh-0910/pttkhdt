# Danh mục sơ đồ ODauDay Stay

Toàn bộ sơ đồ được sinh từ `docs/nguon-tai-lieu/Bao_Cao_BTL_OOAD_NAL_Stay_Hoan_Chinh.md`. **Không sửa trực tiếp ảnh**: sửa Mermaid trong báo cáo, sau đó render lại.

## Cách tái tạo

```bash
# 1. Cài Mermaid CLI (chỉ cần một lần)
npm install @mermaid-js/mermaid-cli

# 2. Tách các khối mermaid từ báo cáo ra file .mmd
python3 _extract_mermaid.py "docs/nguon-tai-lieu/Bao_Cao_BTL_OOAD_NAL_Stay_Hoan_Chinh.md" docs/diagrams/src

# 3. Render toàn bộ sang SVG + PNG
./render-diagrams.sh

# Chỉ render một sơ đồ (theo tiền tố số)
./render-diagrams.sh 13
```

## Cấu trúc thư mục

| Thư mục | Nội dung |
|---|---|
| `src/` | File nguồn `.mmd`, có thể mở bằng Mermaid Live Editor |
| `svg/` | Ảnh vector, nên dùng khi chèn vào DOCX/PDF |
| `png/` | Ảnh raster scale 3x, dùng khi công cụ không hỗ trợ SVG |
| `mermaid-config.json` | Cấu hình theme, font và khoảng cách node |

## Danh mục sơ đồ

| # | Mục trong báo cáo | Loại | Tên file |
|---|---|---|---|
| 01 | 1.7.1 Use Case tổng quát | Use Case (flowchart) | `01-1.7.1.-so-đo-tong-quat-tac-nhan-va-ca-su-dung` |
| 02 | 1.7.2 Quan hệ include/extend | Use Case (flowchart) | `02-1.7.2.-quan-he-include-va-extend` |
| 03 | 2.2 Mô hình khái niệm | Class (conceptual) | `03-2.2.-mo-hinh-khai-niem` |
| 04 | 2.4.1 SSD Đặt phòng | Sequence | `04-2.4.1.-ssd-đat-phong` |
| 05 | 2.4.2 SSD Xác nhận đơn | Sequence | `05-2.4.2.-ssd-chu-nha-xac-nhan-đon` |
| 06 | 2.4.3 SSD Đánh giá | Sequence | `06-2.4.3.-ssd-đanh-gia` |
| 07 | 3.1 Kiến trúc phân tầng | Layering | `07-3.1.-kien-truc-phan-tang` |
| 08 | 3.2 Sơ đồ lớp BCE | Class (BCE) | `08-3.2.-so-đo-lop-bce` |
| 09 | 3.3.1 Sequence Đặt phòng | Sequence | `09-3.3.1.-sequence-diagram-đat-phong-theo-bce` |
| 10 | 3.3.2 Sequence Xác nhận đơn | Sequence | `10-3.3.2.-sequence-diagram-chu-nha-xac-nhan-đon` |
| 11 | 3.3.3 Sequence Đánh giá | Sequence | `11-3.3.3.-sequence-diagram-đanh-gia-ky-luu-tru` |
| 12 | 3.3.4 State Machine Booking | State | `12-3.3.4.-state-machine-booking` |
| 13 | 3.3.5 Design Class Diagram | Class (DCD) | `13-3.3.5.-design-class-diagram-dcd` |
| 14 | 3.4.2 ERD | ERD | `14-3.4.2.-erd` |
| 15 | B.1 AD-01 Tìm và đặt phòng | Activity | `15-b.1.-ad-01-tim-va-đat-phong` |
| 16 | B.2 AD-02 Xử lý đơn | Activity | `16-b.2.-ad-02-chu-nha-xu-ly-đon-va-ky-luu-tru` |
| 17 | B.3 AD-03 Publish nhà/phòng | Activity | `17-b.3.-ad-03-tao-va-publish-nhaphong` |
| 18 | B.4 AD-04 Kiểm tra khả dụng | Activity (fork/join) | `18-b.4.-ad-04-kiem-tra-phong-kha-dung-song-song` |
| 19 | C.1 Object Diagram | Object | `19-c.1.-object-diagram-snapshot-mot-ky-luu-tru-đa-hoan-thanh` |
| 20 | D.2 Package Diagram | Package | `20-d.2.-package-diagram` |
| 21 | D.3 Component Diagram | Component | `21-d.3.-component-diagram` |
| 22 | D.4 Deployment Diagram | Deployment | `22-d.4.-deployment-diagram` |

## Lưu ý khi chèn vào báo cáo Word/PDF

1. **Ưu tiên SVG.** Ảnh vector không bị mờ khi phóng to hoặc in.
2. **Sơ đồ 13 (DCD) rất rộng** (khoảng 17000 × 7700 px). Nên đặt trang ngang, hoặc tách thành 2–3 hình theo nhóm: Entity, Control/Service, Repository/Enumeration.
3. **Sơ đồ 14 (ERD) và 15–17 (Activity) cao.** Nên để mỗi hình một trang và đánh số Hình rõ ràng.
4. Mỗi hình cần caption dạng `Hình x.y — Tên sơ đồ` và phải được dẫn trong nội dung.

## Giới hạn về ký pháp UML

Mermaid không có ký pháp Use Case và Activity gốc của UML, nên:

- Tác nhân hiển thị là hình chữ nhật, **không phải hình người que**.
- Activity Diagram được mô phỏng bằng flowchart; fork/join được biểu diễn bằng node dạng `[[FORK]]`, `[[JOIN]]`; swimlane được biểu diễn bằng `subgraph`.
- Object Diagram dùng `classDiagram` với stereotype `<<object:Class>>` thay vì tên gạch dưới.

Nếu giảng viên yêu cầu ký pháp UML chuẩn, hãy vẽ lại **các sơ đồ 01, 02, 15–19** bằng StarUML/Visual Paradigm/draw.io và giữ bản Mermaid làm tài liệu nguồn.

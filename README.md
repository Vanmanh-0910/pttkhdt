# ODauDay Stay — Prototype giao diện

Prototype web **tĩnh** minh hoạ giao diện theo 10 Use Case của báo cáo ODauDay Stay. Dùng để chụp ảnh cho **Chương 4 — Cài đặt và Kiểm thử**.

## Cách chạy

Mở trực tiếp bằng trình duyệt (double-click `index.html`), hoặc chạy server tĩnh:

```bash
cd prototype
python3 -m http.server 8080
# mở http://localhost:8080
```

## Giới hạn (bắt buộc nêu trong báo cáo)

- Dữ liệu **fake, viết cứng trong HTML**, khớp `seed.sql` ở mục 3.4.4. Không có CSDL đang chạy.
- **Không có backend, API, xác thực thật.** Đăng nhập chỉ mô phỏng ở giao diện.
- Kiểm thử ở mức **giao diện và luồng**, không phải kiểm thử tích hợp/đồng thời.
- `TC-15` (đặt phòng đồng thời) **không mô phỏng được** bằng trang tĩnh.

## Xem các trạng thái lỗi để chụp ảnh

Các trang có luồng ngoại lệ dùng tham số `?state=`:

| Trang | Tham số | Dùng cho |
|---|---|---|
| `search-states.html` | `?state=empty`, `?state=invalid-date` | TC-03 |
| `login.html` | `?state=wrong`, `?state=locked` | TC-02 |
| `booking-errors.html` | `?state=conflict`, `?state=capacity` | TC-05, TC-06 |
| `cancel-states.html` | `?state=confirm`, `?state=blocked` | TC-07, TC-08 |
| `review-form.html` | `?state=done` | TC-12 |
| `host-roomblock.html` | `?state=conflict` | TC-13 |
| `host-booking-detail.html` | `?state=forbidden` | TC-09 |

Không có tham số thì trang hiển thị trạng thái mặc định (happy path).

## Bản đồ màn hình ↔ Use Case ↔ Test

| # | File | Use Case | Test |
|---|---|---|---|
| 1 | `index.html` | UC-02 | — |
| 2 | `search-results.html` | UC-02 | — |
| 3 | `search-states.html` | UC-02 | TC-03 |
| 4 | `property-detail.html` | UC-02 | — |
| 5 | `login.html` | UC-01 | TC-01, TC-02 |
| 6 | `register.html` | UC-01 | — |
| 7 | `booking-quote.html` | UC-03 | TC-04 |
| 8 | `booking-success.html` | UC-03 | TC-04 |
| 9 | `booking-errors.html` | UC-03 | TC-05, TC-06 |
| 10 | `my-bookings.html` | UC-04 | — |
| 11 | `my-booking-detail.html` | UC-04 | TC-07 |
| 12 | `cancel-states.html` | UC-04 | TC-07, TC-08 |
| 13 | `review-form.html` | UC-05 | TC-11, TC-12 |
| 14 | `host-properties.html` | UC-06 | — |
| 15 | `host-rooms.html` | UC-07 | — |
| 16 | `host-roomblock.html` | UC-07 | TC-13 |
| 17 | `host-bookings.html` | UC-08 | — |
| 18 | `host-booking-detail.html` | UC-08 | TC-09, TC-10 |
| 19 | `host-revenue.html` | UC-09 | TC-14 |
| 20 | `admin-users.html` | UC-10 | — |

## Cấu trúc

```text
prototype/
├── index.html + 19 trang .html
├── assets/
│   ├── css/styles.css   # stylesheet dùng chung
│   └── js/
│       ├── data.js      # dữ liệu tham chiếu khớp seed.sql
│       └── ui.js        # menu active + hiển thị state theo ?state=
└── README.md
```

Kiến trúc file bám theo BCE: dữ liệu (Entity) trong `data.js`, các trang là Boundary. Prototype không hiện thực tầng Control/persistence.

## Chụp ảnh hàng loạt

Ảnh minh chứng cho Chương 4 được sinh bằng script ở thư mục gốc dự án:

```bash
node shot.js            # chụp 25 ảnh vào docs/evidence/ui/
```

Script dùng Chromium sẵn có của `@mermaid-js/mermaid-cli`. Nếu muốn chụp thủ công, mở từng trang kèm `?state=` theo bảng ở trên rồi chụp toàn trang.

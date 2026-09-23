# ODauDay Stay — Backend RESTful API

Backend xây dựng trên nền tảng **Node.js + Express** theo kiến trúc 3 lớp (3-Tier Architecture), phục vụ API cho hệ thống đặt phòng Homestay & Nghỉ dưỡng ODauDay Stay (BTL OOAD).

---

## 1. Cấu trúc thư mục tinh gọn

`	ext
backend/
├── src/
│   ├── app.js               # Cấu hình Express app (CORS, Helmet, RateLimit)
│   ├── index.js             # Khởi động server HTTP & kết nối Database
│   ├── config/              # Biến môi trường, Passport JWT, Winston Logger
│   ├── controllers/         # Tầng xử lý Request/Response (auth, user,...)
│   ├── docs/                # Cấu hình Swagger API docs
│   ├── middlewares/         # Middleware bảo mật, xác thực JWT, bắt lỗi
│   ├── models/              # Schema dữ liệu (User, Token,...)
│   ├── routes/v1/           # Khai báo Endpoint API (/v1/auth, /v1/users,...)
│   ├── services/            # Tầng logic nghiệp vụ (Service layer)
│   ├── utils/               # ApiError, catchAsync helper
│   └── validations/         # Kiểm tra tính hợp lệ dữ liệu (Joi)
├── .env.example             # Mẫu cấu hình môi trường
├── .gitignore               # Loại bỏ node_modules, .env khi push Git
└── package.json             # Danh sách dependencies cốt lõi
`

---

## 2. Hướng dẫn cài đặt & Khởi chạy

### Bước 1: Cài đặt thư viện
`ash
cd backend
npm install
`

### Bước 2: Thiết lập file môi trường
Tạo file .env từ file mẫu:
`ash
cp .env.example .env
`
*Điền đường dẫn kết nối MONGODB_URL và chuỗi bí mật JWT_SECRET.*

### Bước 3: Chạy ứng dụng
- **Chế độ phát triển (Hot reload):**
  `ash
  npm run dev
  `
- **Chế độ production:**
  `ash
  npm start
  `

---

## 3. Tài liệu API (Swagger UI)
Khi server đang chạy ở môi trường development, truy cập:
- **Swagger Docs:** http://localhost:3000/v1/docs

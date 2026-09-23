/* ODauDay Stay prototype — dữ liệu fake dùng chung.
   CÁC GIÁ TRỊ NÀY KHỚP VỚI seed.sql TRONG BÁO CÁO (mục 3.4.4).
   Chỉ dùng để tham chiếu nhanh khi soát nội dung giữa các trang; mỗi trang
   vẫn hiển thị dữ liệu trực tiếp trong HTML để "mở file là chạy". */
window.NAL = {
  roles: [
    { id: 1, name: "ADMIN", desc: "Quản trị hệ thống" },
    { id: 2, name: "HOST", desc: "Chủ nhà" },
    { id: 3, name: "GUEST", desc: "Khách thuê" }
  ],
  users: [
    { id: 1, role: "ADMIN", username: "admin.demo", fullName: "Quản trị Demo", phone: "0900000001", status: "ACTIVE" },
    { id: 2, role: "HOST", username: "host.demo", fullName: "Chủ nhà Demo", phone: "0900000002", status: "ACTIVE" },
    { id: 3, role: "GUEST", username: "guest.demo", fullName: "Khách thuê Demo", phone: "0900000003", status: "ACTIVE" },
    { id: 4, role: "GUEST", username: "linh.tran", fullName: "Trần Thùy Linh", phone: "0900000004", status: "ACTIVE" },
    { id: 5, role: "HOST", username: "minh.pham", fullName: "Phạm Quang Minh", phone: "0900000005", status: "LOCKED" }
  ],
  propertyTypes: [
    { id: 1, name: "Homestay", desc: "Nhà ở du lịch quy mô nhỏ" },
    { id: 2, name: "Căn hộ", desc: "Căn hộ cho thuê ngắn hạn" }
  ],
  properties: [
    { id: 1, owner: "host.demo", type: "Homestay", name: "ODauDay Stay Hồ Tây", address: "Quận Tây Hồ, Hà Nội", desc: "Không gian yên tĩnh, phù hợp nhóm nhỏ.", status: "PUBLISHED", rating: 5.0 }
  ],
  rooms: [
    { id: 1, property: "ODauDay Stay Hồ Tây", name: "Phòng Garden", capacity: 2, price: 650000, status: "ACTIVE" },
    { id: 2, property: "ODauDay Stay Hồ Tây", name: "Phòng Family", capacity: 4, price: 1100000, status: "ACTIVE" }
  ],
  roomBlocks: [
    { id: 1, room: "Phòng Family", start: "2027-02-10", end: "2027-02-12", reason: "Bảo trì điều hoà" }
  ],
  bookings: [
    { code: "ODD-DEMO-0001", guest: "Khách thuê Demo", room: "Phòng Garden", checkIn: "2027-01-10", checkOut: "2027-01-12", adults: 2, children: 0, price: 650000, total: 1300000, status: "COMPLETED" }
  ],
  reviews: [
    { booking: "ODD-DEMO-0001", guest: "Khách thuê Demo", property: "ODauDay Stay Hồ Tây", rating: 5, comment: "Phòng sạch và chủ nhà hỗ trợ tốt." }
  ]
};

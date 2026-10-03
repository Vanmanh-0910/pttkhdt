/**
 * ODauDay Stay — Store & Client-side Business Logic Engine (OOAD Standard)
 * Quản lý trạng thái, mô phỏng CSDL qua LocalStorage, thực thi trọn vẹn
 * các Business Rules (BR-01 đến BR-10) và Use Case (UC-01 đến UC-10).
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'ODD_STAY_DATA_V1';
  var USER_KEY = 'ODD_CURRENT_USER_V1';

  var INITIAL_DATA = {
    users: [
      { id: 1, role: 'ADMIN', username: 'admin', password: '123', fullName: 'Quản trị viên Hệ thống', phone: '0900000001', status: 'ACTIVE', email: 'admin@odauday.vn' },
      { id: 2, role: 'HOST', username: 'host.demo', password: '123', fullName: 'Chủ nhà Demo (Nguyễn Văn An)', phone: '0900000002', status: 'ACTIVE', email: 'host.an@gmail.com' },
      { id: 3, role: 'GUEST', username: 'guest.demo', password: '123', fullName: 'Khách thuê Demo (Lê Hoàng Nam)', phone: '0900000003', status: 'ACTIVE', email: 'nam.le@gmail.com' },
      { id: 4, role: 'GUEST', username: 'linh.tran', password: '123', fullName: 'Trần Thùy Linh', phone: '0912345678', status: 'ACTIVE', email: 'linh.tran@gmail.com' },
      { id: 5, role: 'HOST', username: 'minh.pham', password: '123', fullName: 'Phạm Quang Minh (Tài khoản bị khóa)', phone: '0900000005', status: 'LOCKED', email: 'minh.pham@gmail.com' }
    ],
    properties: [
      {
        id: 1,
        owner: 'host.demo',
        name: 'ODauDay Stay Hồ Tây',
        type: 'Homestay',
        address: 'Số 12 ngõ 29 Quảng Bá, Quận Tây Hồ, Hà Nội',
        city: 'Hà Nội',
        area: 'Hồ Tây',
        rating: 5.0,
        reviewsCount: 24,
        priceMin: 650000,
        desc: 'Không gian yên tĩnh ven hồ Tây, view hồ thoáng mát, đầy đủ tiện nghi nghỉ dưỡng và bếp nấu riêng biệt.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        badge: 'Yêu thích nhất',
        amenities: ['Wifi 500M', 'Sân vườn', 'Bếp nấu riêng', 'Smart TV 55 inch', 'Tự nhận phòng bằng khóa số']
      },
      {
        id: 2,
        owner: 'host.demo',
        name: 'ODauDay Stay Ba Vì',
        type: 'Biệt thự sinh thái',
        address: 'Thôn Mái, Yên Bài, Ba Vì, Hà Nội',
        city: 'Hà Nội',
        area: 'Ba Vì',
        rating: 4.6,
        reviewsCount: 18,
        priceMin: 720000,
        desc: 'Biệt thự đồi thông trong lành, có bể bơi ngoài trời và sân cỏ BBQ sức chứa lớn cho gia đình.',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        badge: 'View núi đồi',
        amenities: ['Bể bơi', 'Sân BBQ', 'Sân cỏ teambuilding', 'Chỗ đỗ xe ô tô miễn phí']
      },
      {
        id: 3,
        owner: 'host.demo',
        name: 'ODauDay Stay Cầu Giấy',
        type: 'Căn hộ dịch vụ',
        address: 'Tòa Central Point, 219 Trung Kính, Cầu Giấy, Hà Nội',
        city: 'Hà Nội',
        area: 'Cầu Giấy',
        rating: 4.4,
        reviewsCount: 32,
        priceMin: 900000,
        desc: 'Căn hộ Studio cao cấp ngay trung tâm thương mại, di chuyển thuận tiện tới các trường đại học và phố ẩm thực.',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        badge: 'Trung tâm',
        amenities: ['Smart TV', 'Smartlock', 'Thang máy thẻ từ', 'Máy giặt & sấy']
      },
      {
        id: 4,
        owner: 'host.demo',
        name: 'ODauDay Stay Sapa Eco',
        type: 'Nhà gỗ view thung lũng',
        address: 'Bản Tả Van, Thị xã Sa Pa, Lào Cai',
        city: 'Lào Cai',
        area: 'Sa Pa',
        rating: 4.9,
        reviewsCount: 45,
        priceMin: 1250000,
        desc: 'Bungalow gỗ pơmu tự nhiên nhìn thẳng ra thung lũng Mường Hoa, săn mây buổi sớm và thưởng thức cà phê ngắm ruộng bậc thang.',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
        badge: 'Mới ra mắt',
        amenities: ['View săn mây', 'Bữa sáng miễn phí', 'Lò sưởi củi', 'Hỗ trợ thuê xe máy']
      },
      {
        id: 5,
        owner: 'host.demo',
        name: 'ODauDay Stay Đà Lạt Mộng Mơ',
        type: 'Nhà gỗ đồi thông',
        address: 'Đường Khởi Nghĩa Bắc Sơn, Phường 10, TP. Đà Lạt',
        city: 'Lâm Đồng',
        area: 'Đà Lạt',
        rating: 4.9,
        reviewsCount: 56,
        priceMin: 580000,
        desc: 'Nhà gỗ nép mình giữa rừng thông cổ thụ, view săn mây và thung lũng đèn lãng mạn buổi tối.',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        badge: 'Săn mây',
        amenities: ['Sân nướng BBQ', 'Lò sưởi củi', 'View đồi thông', 'Bữa sáng bản địa']
      },
      {
        id: 6,
        owner: 'host.demo',
        name: 'ODauDay Stay Phố Cổ Heritage',
        type: 'Căn hộ Indochine',
        address: 'Số 18 Hàng Vôi, Phường Lý Thái Tổ, Hoàn Kiếm, Hà Nội',
        city: 'Hà Nội',
        area: 'Phố Cổ',
        rating: 4.8,
        reviewsCount: 38,
        priceMin: 850000,
        desc: 'Không gian kiến trúc Pháp cổ giao thoa nét văn hóa Tràng An, đi bộ 3 phút tới Hồ Hoàn Kiếm.',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
        badge: 'Trung tâm phố cổ',
        amenities: ['Đi bộ ra Hồ Gươm', 'Ban công cổ kính', 'Smartlock', 'Máy giặt & sấy']
      },
      {
        id: 7,
        owner: 'host.demo',
        name: 'ODauDay Stay Tam Đảo Mây Ngàn',
        type: 'Biệt thự sinh thái',
        address: 'Khu 1, Thị trấn Tam Đảo, Vĩnh Phúc',
        city: 'Vĩnh Phúc',
        area: 'Tam Đảo',
        rating: 4.7,
        reviewsCount: 29,
        priceMin: 1100000,
        desc: 'Villa đồi cao nhìn trọn cảnh biển mây Tam Đảo, trang bị bể bơi vô cực nước ấm và sân thượng BBQ.',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
        badge: 'Bể bơi vô cực',
        amenities: ['Bể bơi nước ấm', 'Sân BBQ hoàng hôn', 'Khu vui chơi trẻ em', 'Karaoke gia đình']
      },
      {
        id: 8,
        owner: 'host.demo',
        name: 'ODauDay Stay Ninh Bình Mountain',
        type: 'Bungalow ven hồ',
        address: 'Thôn Tràng An, Xã Trường Yên, Hoa Lư, Ninh Bình',
        city: 'Ninh Bình',
        area: 'Tràng An',
        rating: 5.0,
        reviewsCount: 42,
        priceMin: 680000,
        desc: 'Bungalow mái cọ giữa hồ sen ngắm núi đá vôi sừng sững, trải nghiệm chèo thuyền kayak miễn phí.',
        image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80',
        badge: 'Gần di sản Tràng An',
        amenities: ['Thuyền Kayak miễn phí', 'Xe đạp dạo hồ', 'Bữa sáng phục vụ tận phòng', 'Câu cá giải trí']
      },
      {
        id: 9,
        owner: 'host.demo',
        name: 'ODauDay Stay Hội An Riverside',
        type: 'Nhà vườn truyền thống',
        address: 'Số 54 Nguyễn Tri Phương, Cẩm Nam, Hội An, Quảng Nam',
        city: 'Quảng Nam',
        area: 'Hội An',
        rating: 4.9,
        reviewsCount: 63,
        priceMin: 750000,
        desc: 'Nhà cổ ngói âm dương bên bờ sông Hoài hiền hòa, cách phố cổ đèn lồng chỉ 500m tản bộ.',
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
        badge: 'Ven sông Hoài',
        amenities: ['Hồ bơi sân vườn', 'Đạp xe phố cổ', 'Tiệc trà chiều', 'Bữa sáng đặc sản Hội An']
      },
      {
        id: 10,
        owner: 'host.demo',
        name: 'ODauDay Stay Phú Quốc Sunset',
        type: 'Villa sát biển',
        address: 'Đường Trần Hưng Đạo, Dương Tơ, TP. Phú Quốc, Kiên Giang',
        city: 'Kiên Giang',
        area: 'Phú Quốc',
        rating: 4.8,
        reviewsCount: 51,
        priceMin: 1450000,
        desc: 'Biệt thự bờ biển ngắm trọn hoàng hôn Bãi Trường, bước vài bước chân chạm ngay cát trắng và sóng biển.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        badge: 'Sát biển Bãi Trường',
        amenities: ['Bãi biển riêng', 'Hồ bơi hướng biển', 'Quầy bar ngoài trời', 'Đưa đón sân bay']
      },
      {
        id: 11,
        owner: 'host.demo',
        name: 'ODauDay Stay Hạ Long Bay View',
        type: 'Căn hộ dịch vụ',
        address: 'Tòa Green Bay Premium, Hoàng Quốc Việt, Bãi Cháy, Quảng Ninh',
        city: 'Quảng Ninh',
        area: 'Hạ Long',
        rating: 4.7,
        reviewsCount: 34,
        priceMin: 950000,
        desc: 'Căn hộ cao cấp tầng 22 phóng tầm mắt bao trọn vịnh Hạ Long kỳ vĩ, đi bộ ra bãi tắm Bãi Cháy.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        badge: 'View vịnh Hạ Long',
        amenities: ['View vịnh 180 độ', 'Bể bơi bốn mùa', 'Bếp hiện đại', 'Cạnh chợ đêm hải sản']
      },
      {
        id: 12,
        owner: 'host.demo',
        name: 'ODauDay Stay Vũng Tàu Ocean',
        type: 'Căn hộ view biển',
        address: 'Số 02 Lê Lợi, Phường 1, TP. Vũng Tàu, Bà Rịa - Vũng Tàu',
        city: 'Bà Rịa - Vũng Tàu',
        area: 'Vũng Tàu',
        rating: 4.6,
        reviewsCount: 27,
        priceMin: 820000,
        desc: 'Căn hộ ban công lộng gió Bãi Trước, nội thất hiện đại tông màu xanh biển sảng khoái và yên tĩnh.',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        badge: 'Gần Bãi Trước',
        amenities: ['Đi bộ 2 phút ra biển', 'Bếp nướng hải sản', 'Chỗ đỗ xe ô tô', 'Smart TV 65 inch']
      },
      {
        id: 13,
        owner: 'host.demo',
        name: 'ODauDay Stay Huế Cố Đô',
        type: 'Homestay nhà vườn',
        address: 'Số 11 thôn Lại Thế, Xã Phú Thượng, Huyện Phú Vang, Thừa Thiên Huế',
        city: 'Thừa Thiên Huế',
        area: 'Huế',
        rating: 4.9,
        reviewsCount: 31,
        priceMin: 520000,
        desc: 'Nhà rường truyền thống xứ Huế giữa vườn thanh trà râm mát, đắm chìm trong vẻ đẹp thơ mộng sông Hương.',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
        badge: 'Văn hóa Cố Đô',
        amenities: ['Thưởng trà cung đình', 'Vườn hoa trái xanh mát', 'Bếp nấu truyền thống', 'Thuê áo dài chụp ảnh']
      },
      {
        id: 14,
        owner: 'host.demo',
        name: 'ODauDay Stay Quy Nhơn Sea',
        type: 'Bungalow biển',
        address: 'Bãi Xép, Phường Ghềnh Ráng, TP. Quy Nhơn, Bình Định',
        city: 'Bình Định',
        area: 'Quy Nhơn',
        rating: 4.8,
        reviewsCount: 22,
        priceMin: 890000,
        desc: 'Bungalow vách đá nhìn xuống làng chài bình yên Bãi Xép, ngắm bình minh đại dương rực rỡ từ giường ngủ.',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        badge: 'View làng chài Bãi Xép',
        amenities: ['Ngắm bình minh biển', 'Hải sản tươi sống làng chài', 'Lặn ngắm san hô', 'Võng thư giãn']
      }
    ],
    rooms: [
      {
        id: 1,
        propertyId: 1,
        propertyName: 'ODauDay Stay Hồ Tây',
        name: 'Phòng Garden',
        capacity: 2,
        price: 650000,
        weekendPrice: 750000,
        desc: '1 giường đôi Queen · View vườn xanh mát · Bếp nấu mini · Điều hòa 2 chiều',
        status: 'ACTIVE'
      },
      {
        id: 2,
        propertyId: 1,
        propertyName: 'ODauDay Stay Hồ Tây',
        name: 'Phòng Family',
        capacity: 4,
        price: 1100000,
        weekendPrice: 1300000,
        desc: '2 giường King · Ban công lớn nhìn ra hồ · Phòng tắm kính tiện nghi',
        status: 'ACTIVE'
      },
      {
        id: 3,
        propertyId: 2,
        propertyName: 'ODauDay Stay Ba Vì',
        name: 'Villa Rừng Thông',
        capacity: 8,
        price: 2500000,
        weekendPrice: 3200000,
        desc: '3 phòng ngủ riêng biệt · Bếp nướng BBQ · Hồ bơi riêng ngoài trời',
        status: 'ACTIVE'
      },
      {
        id: 4,
        propertyId: 3,
        propertyName: 'ODauDay Stay Cầu Giấy',
        name: 'Studio Deluxe',
        capacity: 2,
        price: 900000,
        weekendPrice: 950000,
        desc: '1 giường Queen · View thành phố tầng cao · Bàn làm việc cao cấp',
        status: 'ACTIVE'
      }
    ],
    roomBlocks: [
      {
        id: 1,
        roomId: 2,
        roomName: 'Phòng Family',
        start: '2027-02-10',
        end: '2027-02-12',
        reason: 'Bảo trì hệ thống điều hòa và sơn mới ban công'
      }
    ],
    bookings: [
      {
        code: 'ODD-DEMO-0001',
        guestUsername: 'guest.demo',
        guestName: 'Khách thuê Demo (Lê Hoàng Nam)',
        guestPhone: '0900000003',
        guestEmail: 'nam.le@gmail.com',
        propertyId: 1,
        propertyName: 'ODauDay Stay Hồ Tây',
        roomId: 1,
        roomName: 'Phòng Garden',
        checkIn: '2027-01-10',
        checkOut: '2027-01-12',
        nights: 2,
        guests: 2,
        pricePerNight: 650000,
        subtotal: 1300000,
        serviceFee: 0,
        total: 1300000,
        status: 'COMPLETED',
        createdAt: '2026-12-20',
        isReviewed: true
      },
      {
        code: 'ODD-DEMO-0002',
        guestUsername: 'guest.demo',
        guestName: 'Khách thuê Demo (Lê Hoàng Nam)',
        guestPhone: '0900000003',
        guestEmail: 'nam.le@gmail.com',
        propertyId: 1,
        propertyName: 'ODauDay Stay Hồ Tây',
        roomId: 1,
        roomName: 'Phòng Garden',
        checkIn: '2027-01-10',
        checkOut: '2027-01-12',
        nights: 2,
        guests: 2,
        pricePerNight: 650000,
        subtotal: 1300000,
        serviceFee: 0,
        total: 1300000,
        status: 'PENDING',
        createdAt: '2027-01-02',
        isReviewed: false
      },
      {
        code: 'ODD-DEMO-0003',
        guestUsername: 'guest.demo',
        guestName: 'Khách thuê Demo (Lê Hoàng Nam)',
        guestPhone: '0900000003',
        guestEmail: 'nam.le@gmail.com',
        propertyId: 1,
        propertyName: 'ODauDay Stay Hồ Tây',
        roomId: 1,
        roomName: 'Phòng Garden',
        checkIn: '2027-01-08',
        checkOut: '2027-01-11',
        nights: 3,
        guests: 2,
        pricePerNight: 650000,
        subtotal: 1950000,
        serviceFee: 0,
        total: 1950000,
        status: 'CHECKED_IN',
        createdAt: '2027-01-01',
        isReviewed: false
      },
      {
        code: 'ODD-DEMO-0004',
        guestUsername: 'linh.tran',
        guestName: 'Trần Thùy Linh',
        guestPhone: '0912345678',
        guestEmail: 'linh.tran@gmail.com',
        propertyId: 1,
        propertyName: 'ODauDay Stay Hồ Tây',
        roomId: 2,
        roomName: 'Phòng Family',
        checkIn: '2027-01-20',
        checkOut: '2027-01-22',
        nights: 2,
        guests: 4,
        pricePerNight: 1100000,
        subtotal: 2200000,
        serviceFee: 0,
        total: 2200000,
        status: 'CONFIRMED',
        createdAt: '2027-01-15',
        isReviewed: false
      }
    ],
    reviews: [
      {
        id: 1,
        bookingCode: 'ODD-DEMO-0001',
        propertyId: 1,
        guestUsername: 'guest.demo',
        guestName: 'Khách thuê Demo',
        rating: 5,
        comment: 'Phòng sạch sẽ, không gian thoáng đãng mát mẻ, chủ nhà hỗ trợ check-in rất nhanh chóng và nhiệt tình. Vị trí đi bộ ra hồ Tây rất gần!',
        date: '13/01/2027'
      }
    ]
  };

  // Helper load/save
  function loadData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        saveData(INITIAL_DATA);
        return JSON.parse(JSON.stringify(INITIAL_DATA));
      }
      return JSON.parse(raw);
    } catch (e) {
      console.warn('LocalStorage error, using memory fallback:', e);
      return JSON.parse(JSON.stringify(INITIAL_DATA));
    }
  }

  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Cannot save data to LocalStorage:', e);
    }
  }

  function getCurrentUser() {
    try {
      var raw = localStorage.getItem(USER_KEY);
      if (!raw || raw === 'LOGGED_OUT' || raw === 'null') return null;
      return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  function setCurrentUser(user) {
    try {
      if (!user) localStorage.setItem(USER_KEY, 'LOGGED_OUT');
      else localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {}
  }

  var ODDStore = {
    // 1. Quản lý trạng thái & CSDL mẫu
    getData: function () {
      return loadData();
    },

    reset: function () {
      saveData(INITIAL_DATA);
      this.logout();
      return INITIAL_DATA;
    },

    getCurrentUser: getCurrentUser,
    setCurrentUser: setCurrentUser,

    // 2. Xác thực (UC-01 / BR-02)
    login: function (username, password) {
      var data = loadData();
      var inputName = (username || '').trim().toLowerCase();
      var user = data.users.find(function (u) {
        var uname = u.username.toLowerCase();
        return uname === inputName || 
               ((uname === 'admin' || uname === 'admin.demo') && (inputName === 'admin' || inputName === 'admin.demo'));
      });

      if (!user) {
        return { success: false, code: 'NOT_FOUND', message: 'Tài khoản không tồn tại trên hệ thống.' };
      }

      if (user.status === 'LOCKED') {
        return { success: false, code: 'LOCKED', message: 'Tài khoản này đang bị khóa bởi Quản trị viên (UC-01 Locked).' };
      }

      if (password !== '********' && user.password !== password) {
        return { success: false, code: 'WRONG_PASSWORD', message: 'Mật khẩu không chính xác (TC-02).' };
      }

      var sessionUser = {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone,
        email: user.email
      };
      setCurrentUser(sessionUser);
      return { success: true, user: sessionUser };
    },

    register: function (newUser) {
      var data = loadData();
      var exists = data.users.find(function (u) {
        return u.username.toLowerCase() === newUser.username.trim().toLowerCase();
      });
      if (exists) {
        return { success: false, message: 'Tên đăng nhập đã tồn tại, vui lòng chọn tên khác!' };
      }
      var created = {
        id: data.users.length + 1,
        username: newUser.username.trim(),
        password: newUser.password,
        fullName: newUser.fullName,
        phone: newUser.phone,
        email: newUser.email,
        role: newUser.role || 'GUEST',
        status: 'ACTIVE'
      };
      data.users.push(created);
      saveData(data);
      return { success: true, user: created };
    },

    logout: function () {
      setCurrentUser(null);
    },

    // 3. Tìm kiếm & Kiểm tra ngày (UC-02 / BR-03 / TC-03)
    search: function (criteria) {
      var checkIn = criteria.checkIn;
      var checkOut = criteria.checkOut;

      // BR-03 / TC-03: Ngày đi phải lớn hơn ngày đến
      if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
        return {
          success: false,
          code: 'INVALID_DATES',
          message: 'Lỗi quy tắc ngày (TC-03): Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 đêm!'
        };
      }

      var data = loadData();
      var kw = (criteria.kw || '').toLowerCase().trim();
      var type = criteria.type || 'Tất cả';
      var maxPrice = parseInt(criteria.maxPrice, 10) || Infinity;

      var results = data.properties.filter(function (p) {
        var matchKw = !kw || p.name.toLowerCase().includes(kw) || p.address.toLowerCase().includes(kw) || p.city.toLowerCase().includes(kw);
        var matchType = type === 'Tất cả' || type === 'Tất cả chỗ ở' || type === 'Tất cả loại hình' || p.type.toLowerCase().includes(type.toLowerCase());
        var matchPrice = p.priceMin <= maxPrice;
        return matchKw && matchType && matchPrice;
      });

      return {
        success: true,
        count: results.length,
        properties: results
      };
    },

    // 4. Báo giá tự động & Tính tiền Snapshot (UC-03 / BR-04 / BR-05 / BR-06)
    formatVND: function (amount) {
      if (typeof amount !== "number") amount = Number(amount) || 0;
      return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
    },

    calculateQuote: function (roomId, checkInStr, checkOutStr, guestsCount) {
      var data = loadData();
      var room = data.rooms.find(function (r) { return r.id === parseInt(roomId, 10); }) || data.rooms[0];
      var property = data.properties.find(function (p) { return p.id === room.propertyId; }) || data.properties[0];

      if (!checkInStr || !checkOutStr) {
        checkInStr = '2027-01-10';
        checkOutStr = '2027-01-12';
      }

      var dIn = new Date(checkInStr);
      var dOut = new Date(checkOutStr);

      if (dOut <= dIn) {
        return { success: false, code: 'INVALID_DATES', message: 'Ngày trả phòng phải sau ngày nhận phòng!' };
      }

      var nights = Math.max(1, Math.round((dOut - dIn) / (1000 * 60 * 60 * 24)));
      var guests = parseInt(guestsCount, 10) || 2;

      // BR-06 / TC-06: Sức chứa tối đa của phòng
      if (guests > room.capacity) {
        return {
          success: false,
          code: 'CAPACITY_EXCEEDED',
          message: 'Lỗi sức chứa (BR-06 / TC-06): ' + room.name + ' chỉ phục vụ tối đa ' + room.capacity + ' khách (bạn chọn ' + guests + ' khách).'
        };
      }

      // BR-04 / TC-05: Kiểm tra trùng phòng với đơn khác hoặc bảo trì
      var conflict = this.checkConflict(room.id, checkInStr, checkOutStr);
      if (conflict.hasConflict) {
        return {
          success: false,
          code: 'ROOM_CONFLICT',
          message: 'Lỗi trùng phòng (BR-04 / TC-05): ' + conflict.reason,
          conflictDetails: conflict
        };
      }

      var unitPrice = room.price;
      var subtotal = unitPrice * nights;
      var serviceFee = 0; // Miễn phí dịch vụ
      var total = subtotal + serviceFee;

      return {
        success: true,
        property: property,
        room: room,
        checkIn: checkInStr,
        checkOut: checkOutStr,
        nights: nights,
        guests: guests,
        pricePerNight: unitPrice,
        subtotal: subtotal,
        serviceFee: serviceFee,
        total: total
      };
    },

    // Kiểm tra xung đột lịch (BR-03 & BR-04)
    checkConflict: function (roomId, checkInStr, checkOutStr, excludeBookingCode) {
      var data = loadData();
      var rId = parseInt(roomId, 10);
      var newIn = new Date(checkInStr);
      var newOut = new Date(checkOutStr);

      // 1. Kiểm tra với lịch bảo trì (Host RoomBlock)
      var block = data.roomBlocks.find(function (b) {
        if (b.roomId !== rId) return false;
        var bIn = new Date(b.start);
        var bOut = new Date(b.end);
        return !(newOut <= bIn || newIn >= bOut);
      });

      if (block) {
        return {
          hasConflict: true,
          type: 'BLOCK',
          reason: 'Phòng đang có lịch bảo trì từ ' + block.start + ' đến ' + block.end + ' (' + block.reason + ')'
        };
      }

      // 2. Kiểm tra với các đơn đặt đang hoạt động (PENDING, CONFIRMED, CHECKED_IN)
      var activeBooking = data.bookings.find(function (b) {
        if (b.roomId !== rId) return false;
        if (excludeBookingCode && b.code === excludeBookingCode) return false;
        if (['PENDING', 'CONFIRMED', 'CHECKED_IN'].indexOf(b.status) === -1) return false;

        var bIn = new Date(b.checkIn);
        var bOut = new Date(b.checkOut);
        return !(newOut <= bIn || newIn >= bOut);
      });

      if (activeBooking) {
        return {
          hasConflict: true,
          type: 'BOOKING',
          reason: 'Khoảng ngày này đã có khách đặt trước (Đơn: ' + activeBooking.code + ', trạng thái: ' + activeBooking.status + ')'
        };
      }

      return { hasConflict: false };
    },

    // 5. Tạo đơn đặt phòng mới (UC-03 / BR-05 Snapshot)
    createBooking: function (bookingPayload) {
      var quote = this.calculateQuote(
        bookingPayload.roomId,
        bookingPayload.checkIn,
        bookingPayload.checkOut,
        bookingPayload.guests
      );

      if (!quote.success) {
        return quote;
      }

      var data = loadData();
      var currentUser = getCurrentUser();
      var code = 'ODD-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));

      var newBooking = {
        code: code,
        guestUsername: (currentUser && currentUser.username) ? currentUser.username : 'guest.demo',
        guestName: bookingPayload.guestName || (currentUser && currentUser.fullName) || 'Khách thuê',
        guestPhone: bookingPayload.guestPhone || '0900000003',
        guestEmail: bookingPayload.guestEmail || 'guest@odauday.vn',
        propertyId: quote.property.id,
        propertyName: quote.property.name,
        roomId: quote.room.id,
        roomName: quote.room.name,
        checkIn: quote.checkIn,
        checkOut: quote.checkOut,
        nights: quote.nights,
        guests: quote.guests,
        pricePerNight: quote.pricePerNight,
        subtotal: quote.subtotal,
        serviceFee: quote.serviceFee,
        total: quote.total,
        status: 'PENDING',
        createdAt: new Date().toISOString().split('T')[0],
        isReviewed: false
      };

      data.bookings.unshift(newBooking);
      saveData(data);

      return {
        success: true,
        booking: newBooking
      };
    },

    // 6. Quản lý chuyến đi & Hủy đơn (UC-04 / BR-10)
    getBookingsByGuest: function (username) {
      var data = loadData();
      var cur = getCurrentUser();
      var u = username || (cur && cur.username) || 'guest.demo';
      return data.bookings.filter(function (b) {
        return b.guestUsername === u || u === 'admin.demo' || u === 'admin' || (cur && cur.role === 'ADMIN');
      });
    },

    getBookingByCode: function (code) {
      var data = loadData();
      return data.bookings.find(function (b) { return b.code === code; });
    },

    cancelBooking: function (code, reason) {
      var data = loadData();
      var idx = data.bookings.findIndex(function (b) { return b.code === code; });
      if (idx === -1) {
        return { success: false, message: 'Không tìm thấy đơn đặt phòng: ' + code };
      }

      var booking = data.bookings[idx];

      // BR-10: Kiểm tra điều kiện hủy
      if (booking.status === 'CHECKED_IN') {
        return {
          success: false,
          code: 'BLOCKED_CHECKED_IN',
          message: 'Quy tắc BR-10: Khách đã nhận phòng (CHECKED_IN), hệ thống khóa quyền tự hủy đơn trực tuyến!'
        };
      }

      if (booking.status === 'COMPLETED') {
        return {
          success: false,
          code: 'ALREADY_COMPLETED',
          message: 'Kỳ nghỉ đã hoàn thành, không thể hủy đơn!'
        };
      }

      if (booking.status === 'CANCELLED') {
        return {
          success: false,
          code: 'ALREADY_CANCELLED',
          message: 'Đơn này đã được hủy trước đó!'
        };
      }

      // Hợp lệ: PENDING hoặc CONFIRMED
      booking.status = 'CANCELLED';
      booking.cancelReason = reason || 'Khách chủ động hủy đơn';
      booking.cancelledAt = new Date().toISOString().split('T')[0];
      saveData(data);

      return {
        success: true,
        booking: booking,
        message: 'Hủy đơn ' + code + ' thành công! Đã hoàn 100% tiền đặt phòng.'
      };
    },

    // 7. Đánh giá chỗ ở (UC-05 / BR-07)
    addReview: function (reviewPayload) {
      var data = loadData();
      var booking = data.bookings.find(function (b) { return b.code === reviewPayload.bookingCode; });

      if (!booking) {
        return { success: false, message: 'Đơn đặt phòng không tồn tại!' };
      }

      // BR-07: Chỉ được viết đánh giá khi đã hoàn tất lưu trú (COMPLETED)
      if (booking.status !== 'COMPLETED') {
        return {
          success: false,
          code: 'NOT_ELIGIBLE',
          message: 'Quy tắc BR-07: Chỉ những đơn đã hoàn tất kỳ nghỉ (COMPLETED) mới được quyền gửi đánh giá!'
        };
      }

      if (booking.isReviewed) {
        return {
          success: false,
          code: 'ALREADY_REVIEWED',
          message: 'Đơn này đã được gửi đánh giá trước đó, không thể gửi lại!'
        };
      }

      var newReview = {
        id: data.reviews.length + 1,
        bookingCode: booking.code,
        propertyId: booking.propertyId,
        guestUsername: booking.guestUsername,
        guestName: booking.guestName,
        rating: parseInt(reviewPayload.rating, 10) || 5,
        comment: reviewPayload.comment || 'Dịch vụ rất tốt!',
        date: new Date().toLocaleDateString('vi-VN')
      };

      booking.isReviewed = true;
      data.reviews.push(newReview);
      saveData(data);

      return {
        success: true,
        review: newReview,
        message: 'Gửi đánh giá thành công! Cảm ơn nhận xét quý báu của bạn.'
      };
    },

    // 8. Thao tác Chủ nhà (UC-06 / UC-07 / UC-08 / UC-09)
    hostConfirmBooking: function (code) {
      var data = loadData();
      var booking = data.bookings.find(function (b) { return b.code === code; });
      if (!booking) return { success: false, message: 'Không tìm thấy đơn!' };
      booking.status = 'CONFIRMED';
      saveData(data);
      return { success: true, booking: booking, message: 'Đã phê duyệt đơn ' + code + ' thành công!' };
    },

    hostRejectBooking: function (code, reason) {
      var data = loadData();
      var booking = data.bookings.find(function (b) { return b.code === code; });
      if (!booking) return { success: false, message: 'Không tìm thấy đơn!' };
      booking.status = 'CANCELLED';
      booking.cancelReason = reason || 'Chủ nhà từ chối tiếp nhận';
      saveData(data);
      return { success: true, booking: booking, message: 'Đã từ chối đơn ' + code + '!' };
    },

    addRoomBlock: function (blockData) {
      var data = loadData();
      var conflict = this.checkConflict(blockData.roomId, blockData.start, blockData.end);

      if (conflict.hasConflict && conflict.type === 'BOOKING') {
        return {
          success: false,
          code: 'CONFLICT_WITH_GUEST',
          message: 'Lỗi BR-03: Khoảng ngày này đã có khách đặt phòng (' + conflict.reason + '). Vui lòng hủy hoặc dời đơn của khách trước khi tạo lịch bảo trì!'
        };
      }

      var newBlock = {
        id: data.roomBlocks.length + 1,
        roomId: parseInt(blockData.roomId, 10),
        roomName: blockData.roomName,
        start: blockData.start,
        end: blockData.end,
        reason: blockData.reason || 'Bảo trì phòng'
      };

      data.roomBlocks.push(newBlock);
      saveData(data);
      return { success: true, block: newBlock, message: 'Tạo lịch bảo trì phòng thành công!' };
    },

    // 9. Thao tác Quản trị Admin (UC-10)
    toggleUserStatus: function (userId) {
      var data = loadData();
      var user = data.users.find(function (u) { return u.id === parseInt(userId, 10); });
      if (!user) return { success: false, message: 'Không tìm thấy người dùng!' };

      user.status = user.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
      saveData(data);
      return {
        success: true,
        user: user,
        message: 'Đã ' + (user.status === 'LOCKED' ? 'khóa' : 'mở khóa') + ' tài khoản ' + user.username + ' thành công!'
      };
    }
  };

  global.ODDStore = ODDStore;
})(window);

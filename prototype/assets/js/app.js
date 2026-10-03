/**
 * ODauDay Stay — App Interactive Controller & UI Operations
 * Kết nối tương tác người dùng, xử lý form, lọc dữ liệu thời gian thực,
 * thông báo Toast và liên kết dữ liệu với ODDStore.
 */
(function (global) {
  'use strict';

  var store = global.ODDStore;
  if (!store) {
    console.error('ODDStore is required before loading app.js');
    return;
  }

  window.ODDToast = function (msg, type, duration) {
    if (window.ODDApp && window.ODDApp.toast) window.ODDApp.toast(msg, type, duration);
  };

  var ODDApp = {
    // 1. Toast Notification System
    toast: function (message, type, duration) {
      type = type || 'info'; // success, error, warning, info
      duration = duration || 3500;

      var container = document.getElementById('odd-toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'odd-toast-container';
        container.className = 'odd-toast-container';
        document.body.appendChild(container);
      }

      var icons = {
        success: 'bi-check-circle-fill',
        error: 'bi-exclamation-octagon-fill',
        warning: 'bi-exclamation-triangle-fill',
        info: 'bi-info-circle-fill'
      };

      var toastEl = document.createElement('div');
      toastEl.className = 'odd-toast odd-toast-' + type;
      toastEl.innerHTML = [
        '<i class="bi ' + (icons[type] || icons.info) + '"></i>',
        '<div class="odd-toast-msg">' + message + '</div>',
        '<button type="button" class="odd-toast-close" aria-label="Đóng">&times;</button>'
      ].join('');

      container.appendChild(toastEl);

      // Trigger animation
      setTimeout(function () {
        toastEl.classList.add('show');
      }, 20);

      var closeBtn = toastEl.querySelector('.odd-toast-close');
      function dismiss() {
        toastEl.classList.remove('show');
        setTimeout(function () {
          if (toastEl.parentNode) toastEl.parentNode.removeChild(toastEl);
        }, 300);
      }

      closeBtn.addEventListener('click', dismiss);
      setTimeout(dismiss, duration);
    },

    // 2. Demo Floating Bar (Compact, Collapsible & Non-intrusive)
    renderDemoBar: function () {
      if (document.getElementById('odd-demo-bar')) return;

      var bar = document.createElement('aside');
      bar.id = 'odd-demo-bar';
      bar.className = 'odd-demo-bar';
      bar.setAttribute('aria-label', 'Thanh công cụ kiểm thử prototype');

      var user = store.getCurrentUser();
      var currentRole = user ? user.role : '';
      var roleName = user ? (user.role === 'ADMIN' ? 'Quản trị' : (user.role === 'HOST' ? 'Chủ nhà' : 'Khách')) : 'Chưa đăng nhập';

      var isCollapsed = sessionStorage.getItem('ODD_DEMO_COLLAPSED') === 'true';
      if (isCollapsed) {
        bar.classList.add('collapsed');
      }

      var guestAct = (user && currentRole === 'GUEST') ? ' active' : '';
      var hostAct = (user && currentRole === 'HOST') ? ' active' : '';
      var adminAct = (user && currentRole === 'ADMIN') ? ' active' : '';

      bar.innerHTML = [
        '<div class="demo-bar-badge" id="demo-toggle-btn" title="Nhấp để thu nhỏ / mở rộng công cụ demo">',
        '  <i class="bi bi-shield-lock-fill text-brand"></i>',
        '  <span>Demo: <strong>' + (user ? user.username : 'Chưa đăng nhập') + '</strong> (' + roleName + ')</span>',
        '  <i class="bi bi-chevron-down demo-chevron"></i>',
        '</div>',
        '<div class="demo-bar-actions">',
        '  <button type="button" class="demo-btn' + guestAct + '" data-switch-role="guest" title="Chuyển sang vai trò Khách thuê"><i class="bi bi-person"></i> Khách</button>',
        '  <button type="button" class="demo-btn' + hostAct + '" data-switch-role="host" title="Chuyển sang vai trò Chủ nhà (Host)"><i class="bi bi-house"></i> Chủ nhà</button>',
        '  <button type="button" class="demo-btn' + adminAct + '" data-switch-role="admin" title="Chuyển sang vai trò Quản trị viên (Admin)"><i class="bi bi-gear"></i> Admin</button>',
        '  <button type="button" class="demo-btn' + (!user ? ' active' : '') + '" data-demo-logout="true" title="Thoát tài khoản / Màn đăng nhập"><i class="bi bi-box-arrow-right"></i> Thoát</button>',
        '  <button type="button" class="demo-btn demo-btn-reset" data-reset-store="true" title="Khôi phục CSDL mẫu ban đầu"><i class="bi bi-arrow-counterclockwise"></i></button>',
        '  <button type="button" class="demo-btn demo-btn-toggle" id="demo-minimize-btn" title="Thu nhỏ"><i class="bi bi-dash-lg"></i></button>',
        '</div>'
      ].join('');

      document.body.appendChild(bar);

      // Toggle collapse/expand
      function toggleDemoBar() {
        bar.classList.toggle('collapsed');
        sessionStorage.setItem('ODD_DEMO_COLLAPSED', bar.classList.contains('collapsed'));
      }

      var toggleBtn = document.getElementById('demo-toggle-btn');
      if (toggleBtn) toggleBtn.addEventListener('click', toggleDemoBar);

      var minBtn = document.getElementById('demo-minimize-btn');
      if (minBtn) minBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleDemoBar();
      });

      // Switch roles quickly
      bar.querySelectorAll('[data-switch-role]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          var targetRole = btn.getAttribute('data-switch-role');
          if (targetRole === 'admin') {
            store.login('admin.demo', '123');
            ODDApp.toast('Đã đăng nhập vai trò: Quản trị viên (admin.demo)', 'info', 1800);
            setTimeout(function () { location.href = 'admin-users.html'; }, 300);
          } else if (targetRole === 'host') {
            store.login('host.demo', '123');
            ODDApp.toast('Đã đăng nhập vai trò: Chủ nhà (host.demo)', 'info', 1800);
            setTimeout(function () { location.href = 'host-properties.html'; }, 300);
          } else {
            store.login('guest.demo', '123');
            ODDApp.toast('Đã đăng nhập vai trò: Khách thuê (guest.demo)', 'info', 1800);
            setTimeout(function () { location.href = 'index.html'; }, 300);
          }
        });
      });

      // Event demo logout
      var demoLogoutBtn = bar.querySelector('[data-demo-logout]');
      if (demoLogoutBtn) {
        demoLogoutBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          store.logout();
          ODDApp.toast('Đã đăng xuất tài khoản thành công.', 'info');
          setTimeout(function () { location.href = 'login.html'; }, 300);
        });
      }

      // Event reset store
      var resetBtn = bar.querySelector('[data-reset-store]');
      if (resetBtn) {
        resetBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          if (confirm('Khôi phục toàn bộ CSDL mẫu và giỏ hàng về trạng thái ban đầu?')) {
            store.reset();
            ODDApp.toast('Đã khôi phục dữ liệu mẫu ban đầu!', 'success');
            setTimeout(function () { location.reload(); }, 600);
          }
        });
      }
    },
    // 3. Khởi tạo tương tác theo từng trang
    init: function () {
      var path = location.pathname.split('/').pop() || 'index.html';

      this.renderDemoBar();
      this.bindStateParams();

      if (path === 'index.html' || path === '') {
        this.initHomePage();
      } else if (path === 'search-results.html') {
        this.initSearchResultsPage();
      } else if (path === 'property-detail.html') {
        this.initPropertyDetailPage();
      } else if (path === 'booking-quote.html') {
        this.initBookingQuotePage();
      } else if (path === 'my-bookings.html') {
        this.initMyBookingsPage();
      } else if (path === 'my-booking-detail.html') {
        this.initMyBookingDetailPage();
      } else if (path === 'review-form.html') {
        this.initReviewFormPage();
      } else if (path === 'login.html') {
        this.initLoginPage();
      } else if (path === 'register.html') {
        this.initRegisterPage();
      } else if (path === 'host-bookings.html') {
        this.initHostBookingsPage();
      } else if (path === 'host-booking-detail.html') {
        this.initHostBookingDetailPage();
      } else if (path === 'host-roomblock.html') {
        this.initHostRoomBlockPage();
      } else if (path === 'admin-users.html') {
        this.initAdminUsersPage();
      }
    },

    // Xử lý tham số ?state= từ URL (Hỗ trợ chụp ảnh kiểm thử giáo trình)
    bindStateParams: function () {
      var params = new URLSearchParams(location.search);
      var state = params.get('state') || 'default';
      var blocks = document.querySelectorAll('[data-state]');
      if (blocks.length) {
        blocks.forEach(function (el) {
          var states = (el.getAttribute('data-state') || '').split(/\s+/);
          el.hidden = states.indexOf(state) === -1;
        });
      }

      document.querySelectorAll('[data-goto-state]').forEach(function (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          var next = el.getAttribute('data-goto-state');
          var url = new URL(location.href);
          if (next && next !== 'default') url.searchParams.set('state', next);
          else url.searchParams.delete('state');
          location.href = url.toString();
        });
      });
    },

    // TRANG CHỦ (index.html)
    initHomePage: function () {
      var self = this;
      var searchForm = document.querySelector('form[action*="search-results.html"]');

      if (searchForm) {
        var inInput = searchForm.querySelector('#in') || searchForm.querySelector('input[name="in"]');
        var outInput = searchForm.querySelector('#out') || searchForm.querySelector('input[name="out"]');

        searchForm.addEventListener('submit', function (e) {
          if (inInput && outInput) {
            var checkIn = inInput.value;
            var checkOut = outInput.value;
            if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
              e.preventDefault();
              self.toast('Lỗi quy tắc ngày (TC-03): Ngày trả phòng phải sau ngày nhận phòng!', 'error');
              setTimeout(function () {
                location.href = 'search-states.html?state=invalid-date';
              }, 1200);
            }
          }
        });
      }

      // Quick Category Filter Pills
      var pills = document.querySelectorAll('.category-pill');
      pills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          pills.forEach(function (p) { p.classList.remove('active'); });
          pill.classList.add('active');
          var text = pill.innerText.trim();
          self.toast('Đang lọc chỗ ở: ' + text, 'info', 2000);
        });
      });
    },

    // KẾT QUẢ TÌM KIẾM (search-results.html)
    initSearchResultsPage: function () {
      var self = this;
      var params = new URLSearchParams(location.search);
      var kw = params.get('kw') || '';
      var checkIn = params.get('in') || '';
      var checkOut = params.get('out') || '';

      if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
        self.toast('Lỗi ngày đi nhỏ hơn ngày đến (TC-03)!', 'error');
      }
    },

    // CHI TIẾT CHỖ Ở & BÁO GIÁ ĐỘNG (property-detail.html - Airbnb Industry Standard)
    initPropertyDetailPage: function () {
      var self = this;
      var inEl = document.getElementById('detail-in') || document.querySelector('input[type="date"]:nth-of-type(1)');
      var outEl = document.getElementById('detail-out') || document.querySelector('input[type="date"]:nth-of-type(2)');
      var roomEl = document.getElementById('detail-room');
      var guestEl = document.getElementById('detail-guests') || document.querySelector('input[type="number"]');
      var priceEl = document.getElementById('widget-room-price');
      var nightsLabel = document.getElementById('calc-nights-label');
      var nightsAmount = document.getElementById('calc-nights-amount');
      var totalAmount = document.getElementById('calc-total-amount');
      var formEl = document.getElementById('detail-booking-form');

      var currentRoomId = 1;
      function fmt(val) { return (store && fmt) ? fmt(val) : (new Intl.NumberFormat("vi-VN").format(val) + "đ"); }

      function recalc() {
        var checkIn = inEl ? inEl.value : '2027-01-10';
        var checkOut = outEl ? outEl.value : '2027-01-12';
        var guests = guestEl ? parseInt(guestEl.value, 10) : 2;

        if (roomEl) {
          currentRoomId = parseInt(roomEl.value, 10) || 1;
        }

        var quote = store.calculateQuote(currentRoomId, checkIn, checkOut, guests);
        if (quote.success && quote.room) {
          sessionStorage.setItem('ODD_ACTIVE_QUOTE', JSON.stringify(quote));

          if (priceEl) priceEl.innerText = fmt(quote.room.basePrice);
          if (nightsLabel) nightsLabel.innerText = fmt(quote.room.basePrice) + ' × ' + quote.nights + ' đêm';
          if (nightsAmount) nightsAmount.innerText = fmt(quote.baseTotal);
          if (totalAmount) totalAmount.innerText = fmt(quote.finalTotal);
        }
      }

      // Chọn hạng phòng từ bảng phòng khả dụng
      document.querySelectorAll('.btn-select-room').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var rId = parseInt(btn.getAttribute('data-room-id'), 10) || 1;
          var rName = btn.getAttribute('data-room-name') || 'Phòng';

          if (roomEl) {
            roomEl.value = String(rId);
          }
          currentRoomId = rId;
          recalc();
          self.toast('Đã chọn ' + rName + ' vào widget báo giá!', 'success');

          // Cuộn mượt tới widget đặt phòng
          var asideWidget = document.querySelector('aside[aria-label="Tóm tắt đặt phòng"]');
          if (asideWidget) {
            asideWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      });

      if (inEl) inEl.addEventListener('change', recalc);
      if (outEl) outEl.addEventListener('change', recalc);
      if (roomEl) roomEl.addEventListener('change', recalc);
      if (guestEl) guestEl.addEventListener('change', recalc);

      if (formEl) {
        formEl.addEventListener('submit', function (e) {
          var cIn = inEl ? inEl.value : '';
          var cOut = outEl ? outEl.value : '';
          if (cIn && cOut && new Date(cOut) <= new Date(cIn)) {
            e.preventDefault();
            self.toast('Lỗi quy tắc ngày (TC-03): Ngày trả phòng phải sau ngày nhận phòng!', 'error');
            return;
          }
          recalc();
        });
      }

      recalc();
    },

    // BÁO GIÁ & ĐẶT PHÒNG (booking-quote.html - Industry Checkout Standard)
    initBookingQuotePage: function () {
      var self = this;
      var form = document.getElementById('booking-checkout-form') || document.querySelector('form[action*="booking-success.html"]');
      var quoteRaw = sessionStorage.getItem('ODD_ACTIVE_QUOTE');
      var quote = quoteRaw ? JSON.parse(quoteRaw) : store.calculateQuote(1, '2027-01-10', '2027-01-12', 2);

      // Cập nhật giao diện nếu có dữ liệu quote
      if (quote && quote.room) {
        var inInput = document.getElementById('in');
        var outInput = document.getElementById('out');
        if (inInput && quote.checkIn) inInput.value = quote.checkIn;
        if (outInput && quote.checkOut) outInput.value = quote.checkOut;
      }

      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();

          var nameInput = document.getElementById('guest_name') || form.querySelector('input[name="fullname"]') || form.querySelector('input[type="text"]');
          var phoneInput = document.getElementById('guest_phone') || form.querySelector('input[name="phone"]');
          var emailInput = document.getElementById('guest_email') || form.querySelector('input[name="email"]');

          var result = store.createBooking({
            roomId: (quote && quote.room) ? quote.room.id : 1,
            checkIn: (quote && quote.checkIn) ? quote.checkIn : '2027-01-10',
            checkOut: (quote && quote.checkOut) ? quote.checkOut : '2027-01-12',
            guests: (quote && quote.guests) ? quote.guests : 2,
            guestName: nameInput ? nameInput.value : 'Khách thuê Demo',
            guestPhone: phoneInput ? phoneInput.value : '0900000003',
            guestEmail: emailInput ? emailInput.value : 'guest.demo@odaudaystay.vn'
          });

          if (!result.success) {
            self.toast(result.message, 'error', 4500);
            return;
          }

          self.toast('Tạo đơn đặt phòng thành công! Mã đơn: ' + result.booking.code, 'success', 3000);
          setTimeout(function () {
            location.href = 'booking-success.html?code=' + result.booking.code;
          }, 800);
        });
      }

      // Nút thử nghiệm lỗi trùng lịch (TC-05)
      var conflictBtn = document.querySelector('a[href*="booking-errors.html?state=conflict"]');
      if (conflictBtn) {
        conflictBtn.addEventListener('click', function (e) {
          self.toast('Đang kích hoạt kịch bản kiểm thử trùng lịch (BR-04 / TC-05)...', 'warning');
        });
      }

      // Nút thử nghiệm quá sức chứa (TC-06)
      var capacityBtn = document.querySelector('a[href*="booking-errors.html?state=capacity"]');
      if (capacityBtn) {
        capacityBtn.addEventListener('click', function (e) {
          self.toast('Đang kích hoạt kịch bản kiểm thử vượt quá sức chứa (BR-06 / TC-06)...', 'warning');
        });
      }
    },

    // QUẢN LÝ ĐƠN ĐẶT CỦA KHÁCH (my-bookings.html)
    initMyBookingsPage: function () {
      var self = this;
      var cancelButtons = document.querySelectorAll('button, a');
      cancelButtons.forEach(function (btn) {
        if (btn.innerText.includes('Hủy đơn')) {
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            var card = btn.closest('.panel') || btn.closest('.card') || btn.closest('tr');
            var codeEl = card ? card.querySelector('strong') : null;
            var code = codeEl ? codeEl.innerText.trim() : 'ODD-DEMO-0002';

            if (confirm('Bạn có chắc chắn muốn hủy đơn đặt phòng ' + code + '?')) {
              var res = store.cancelBooking(code);
              if (res.success) {
                self.toast(res.message, 'success');
                setTimeout(function () { location.reload(); }, 800);
              } else {
                self.toast(res.message, 'error', 4000);
              }
            }
          });
        }
      });
    },

    // CHI TIẾT ĐƠN CỦA KHÁCH & HỦY ĐƠN (my-booking-detail.html)
    initMyBookingDetailPage: function () {
      var self = this;
      var cancelBtn = document.querySelector('.btn-outline-danger') || document.querySelector('a[href*="cancel-states.html"]');

      if (cancelBtn) {
        cancelBtn.addEventListener('click', function (e) {
          var href = cancelBtn.getAttribute('href') || '';
          if (href.includes('blocked')) {
            // Trường hợp kịch bản chặn hủy
            self.toast('Quy tắc BR-10: Khách đã nhận phòng, không thể hủy đơn trực tuyến!', 'error', 4000);
            return;
          }

          if (confirm('Xác nhận yêu cầu hủy đơn đặt phòng này? Toàn bộ số tiền cọc sẽ được hoàn lại.')) {
            var res = store.cancelBooking('ODD-DEMO-0002');
            if (res.success) {
              self.toast(res.message, 'success');
            } else {
              self.toast(res.message, 'error');
            }
          }
        });
      }
    },

    // ĐÁNH GIÁ (review-form.html)
    initReviewFormPage: function () {
      var self = this;
      var stars = document.querySelectorAll('.bi-star, .bi-star-fill');
      var selectedRating = 5;

      stars.forEach(function (star, idx) {
        star.style.cursor = 'pointer';
        star.addEventListener('click', function () {
          selectedRating = idx + 1;
          stars.forEach(function (s, i) {
            if (i <= idx) {
              s.className = 'bi bi-star-fill text-warning';
            } else {
              s.className = 'bi bi-star text-muted';
            }
          });
          self.toast('Đã chọn ' + selectedRating + ' sao!', 'info', 1500);
        });
      });

      var form = document.querySelector('form');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var commentEl = form.querySelector('textarea');
          var comment = commentEl ? commentEl.value : '';

          var res = store.addReview({
            bookingCode: 'ODD-DEMO-0001',
            rating: selectedRating,
            comment: comment
          });

          if (res.success) {
            self.toast(res.message, 'success', 3000);
            setTimeout(function () {
              location.href = 'review-form.html?state=reviewed';
            }, 800);
          } else {
            self.toast(res.message, 'warning', 4000);
          }
        });
      }
    },

    // ĐĂNG NHẬP (login.html)
    initLoginPage: function () {
      var self = this;
      var form = document.querySelector('form');
      var userIn = document.getElementById('username') || document.querySelector('input[type="text"]');
      var passIn = document.getElementById('password') || document.querySelector('input[type="password"]');

      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var username = userIn ? userIn.value.trim() : '';
          var password = passIn ? passIn.value : '';

          var res = store.login(username, password);
          if (res.success) {
            self.toast('Đăng nhập thành công! Xin chào ' + res.user.fullName, 'success', 2000);
            setTimeout(function () {
              if (res.user.role === 'ADMIN') location.href = 'admin-users.html';
              else if (res.user.role === 'HOST') location.href = 'host-properties.html';
              else location.href = 'index.html';
            }, 600);
          } else {
            if (res.code === 'LOCKED') {
              self.toast(res.message, 'error', 4500);
              location.href = 'login.html?state=locked';
            } else {
              self.toast(res.message, 'error', 4000);
              location.href = 'login.html?state=wrong-password';
            }
          }
        });
      }

      // Quick Fill Credential Buttons
      document.querySelectorAll('[data-fill-user]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var target = btn.getAttribute('data-fill-user');
          if ((target === 'guest' || target === 'guest.demo') && userIn && passIn) {
            userIn.value = 'guest.demo';
            passIn.value = '123';
          } else if ((target === 'host' || target === 'host.demo') && userIn && passIn) {
            userIn.value = 'host.demo';
            passIn.value = '123';
          } else if ((target === 'admin' || target === 'admin.demo') && userIn && passIn) {
            userIn.value = 'admin';
            passIn.value = '123';
          } else if ((target === 'locked' || target === 'minh.pham') && userIn && passIn) {
            userIn.value = 'minh.pham';
            passIn.value = '123';
          }
          self.toast('Đã tự động điền tài khoản mẫu: ' + (userIn ? userIn.value : ''), 'info', 1800);
        });
      });
    },

    // ĐĂNG KÝ (register.html)
    initRegisterPage: function () {
      var self = this;
      var form = document.querySelector('form');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var u = form.querySelector('#reg-username') || form.querySelector('input[name="username"]');
          var p = form.querySelector('#reg-password') || form.querySelector('input[name="password"]');
          var n = form.querySelector('#reg-fullname') || form.querySelector('input[name="fullname"]');
          var ph = form.querySelector('#reg-phone') || form.querySelector('input[name="phone"]');
          var em = form.querySelector('#reg-email') || form.querySelector('input[name="email"]');

          var res = store.register({
            username: u ? u.value : 'user_' + Date.now(),
            password: p ? p.value : '123',
            fullName: n ? n.value : 'Người dùng mới',
            phone: ph ? ph.value : '0900000009',
            email: em ? em.value : 'newuser@odauday.vn',
            role: 'GUEST'
          });

          if (res.success) {
            self.toast('Đăng ký tài khoản thành công! Đang chuyển hướng...', 'success', 2500);
            store.login(res.user.username, res.user.password);
            setTimeout(function () { location.href = 'index.html'; }, 800);
          } else {
            self.toast(res.message, 'error');
          }
        });
      }
    },

    // CHỦ NHÀ - QUẢN LÝ ĐƠN ĐẶT PHÒNG (host-bookings.html)
    initHostBookingsPage: function () {
      var self = this;
      // Nút Duyệt đơn & Từ chối trên bảng
      document.querySelectorAll('table button, table a').forEach(function (btn) {
        var text = btn.innerText;
        if (text.includes('Duyệt') || text.includes('Xác nhận') || text.includes('Confirm')) {
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            var row = btn.closest('tr');
            var code = row ? row.querySelector('strong').innerText.trim() : 'ODD-DEMO-0002';
            var res = store.hostConfirmBooking(code);
            if (res.success) {
              self.toast(res.message, 'success');
              var badge = row.querySelector('.badge') || row.querySelector('span[class*="status"]');
              if (badge) {
                badge.className = 'badge badge-success';
                badge.innerText = 'CONFIRMED';
              }
              btn.remove();
            }
          });
        } else if (text.includes('Từ chối') || text.includes('Hủy') || text.includes('Reject')) {
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            var row = btn.closest('tr');
            var code = row ? row.querySelector('strong').innerText.trim() : 'ODD-DEMO-0002';
            if (confirm('Xác nhận từ chối đơn ' + code + '?')) {
              var res = store.hostRejectBooking(code);
              if (res.success) {
                self.toast(res.message, 'info');
                setTimeout(function () { location.reload(); }, 600);
              }
            }
          });
        }
      });
    },

    // CHỦ NHÀ - CHI TIẾT ĐƠN (host-booking-detail.html)
    initHostBookingDetailPage: function () {
      var self = this;
      var confirmBtn = document.querySelector('.btn-primary') || document.querySelector('[data-action="confirm"]');
      if (confirmBtn && confirmBtn.innerText.includes('Xác nhận')) {
        confirmBtn.addEventListener('click', function (e) {
          e.preventDefault();
          var res = store.hostConfirmBooking('ODD-DEMO-0002');
          self.toast(res.message, 'success');
          setTimeout(function () {
            location.href = 'host-bookings.html?state=confirmed';
          }, 800);
        });
      }
    },

    // CHỦ NHÀ - CHẶN LỊCH BẢO TRÌ (host-roomblock.html)
    initHostRoomBlockPage: function () {
      var self = this;
      var form = document.querySelector('form');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var roomSelect = form.querySelector('select');
          var startInput = form.querySelector('input[type="date"]:nth-of-type(1)');
          var endInput = form.querySelector('input[type="date"]:nth-of-type(2)');
          var reasonInput = form.querySelector('input[type="text"]') || form.querySelector('textarea');

          var res = store.addRoomBlock({
            roomId: roomSelect ? parseInt(roomSelect.value, 10) || 2 : 2,
            roomName: 'Phòng Family',
            start: startInput ? startInput.value : '2027-01-20',
            end: endInput ? endInput.value : '2027-01-22',
            reason: reasonInput ? reasonInput.value : 'Bảo trì phòng'
          });

          if (res.success) {
            self.toast(res.message, 'success');
            setTimeout(function () { location.reload(); }, 800);
          } else {
            self.toast(res.message, 'error', 5000);
            setTimeout(function () {
              location.href = 'host-roomblock.html?state=block-conflict';
            }, 1200);
          }
        });
      }
    },

    // ADMIN - QUẢN LÝ NGƯỜI DÙNG (admin-users.html)
    initAdminUsersPage: function () {
      var self = this;
      document.querySelectorAll('table button, table a').forEach(function (btn) {
        var text = btn.innerText;
        if (text.includes('Khóa') || text.includes('Mở khóa') || text.includes('Lock')) {
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            var row = btn.closest('tr');
            var userId = row ? (row.getAttribute('data-user-id') || (row.innerText.includes('minh.pham') ? 5 : 2)) : 5;

            var res = store.toggleUserStatus(userId);
            if (res.success) {
              self.toast(res.message, 'success');
              var badge = row.querySelector('.badge');
              if (badge) {
                if (res.user.status === 'LOCKED') {
                  badge.className = 'badge badge-danger';
                  badge.innerText = 'LOCKED';
                  btn.innerText = 'Mở khóa';
                  btn.className = 'btn btn-sm btn-outline-success';
                } else {
                  badge.className = 'badge badge-success';
                  badge.innerText = 'ACTIVE';
                  btn.innerText = 'Khóa';
                  btn.className = 'btn btn-sm btn-outline-danger';
                }
              }
            }
          });
        }
      });
    }
  };

  global.ODDApp = ODDApp;

  // Auto initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { ODDApp.init(); });
  } else {
    ODDApp.init();
  }
})(window);

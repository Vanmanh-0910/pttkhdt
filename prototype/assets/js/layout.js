/**
 * ODauDay Stay — Shared Layout Component Loader
 * Single source of truth for Header, Navigation, and Footer across all pages.
 * Supports Guest, Host, and Admin roles.
 * Works seamlessly with file:// protocol (no CORS restriction).
 */
(function () {
  "use strict";

  var currentPath = location.pathname.split("/").pop() || "index.html";

  // Determine current user role
  function detectRole() {
    var headerEl = document.getElementById("site-header");
    if (headerEl && headerEl.getAttribute("data-role")) {
      return headerEl.getAttribute("data-role");
    }
    if (currentPath.indexOf("host-") === 0) return "host";
    if (currentPath.indexOf("admin-") === 0) return "admin";
    return "guest";
  }

  var role = detectRole();

  // Header Templates for each role
  var headers = {
    guest: {
      sub: "· homestay & nghỉ dưỡng",
      nav: [
        { href: "index.html", icon: "bi-compass", label: "Trang chủ" },
        { href: "search-results.html", icon: "bi-search", label: "Tìm kiếm" },
        { href: "my-bookings.html", icon: "bi-bag-check", label: "Đơn của tôi" },
        { href: "login.html", icon: "bi-box-arrow-in-right", label: "Đăng nhập" }
      ]
    },
    host: {
      sub: "· khu vực chủ nhà (Host Portal)",
      nav: [
        { href: "host-properties.html", icon: "bi-building", label: "Nhà của tôi" },
        { href: "host-rooms.html", icon: "bi-door-open", label: "Phòng" },
        { href: "host-bookings.html", icon: "bi-calendar-check", label: "Đơn đặt" },
        { href: "host-revenue.html", icon: "bi-graph-up-arrow", label: "Doanh thu" }
      ]
    },
    admin: {
      sub: "· khu vực quản trị hệ thống (Admin Console)",
      nav: [
        { href: "admin-users.html", icon: "bi-people-fill", label: "Quản lý tài khoản" }
      ]
    }
  };

  function buildHeaderHTML(roleName) {
    var conf = headers[roleName] || headers.guest;
    
    var navHTML = conf.nav.map(function (item) {
      var isAct = item.href === currentPath ? ' class="active"' : '';
      return '<a href="' + item.href + '"' + isAct + '><i class="bi ' + item.icon + '"></i> ' + item.label + '</a>';
    }).join("\n        ");

    var guestAct = roleName === "guest" ? ' class="active"' : '';
    var hostAct = roleName === "host" ? ' class="active"' : '';
    var adminAct = roleName === "admin" ? ' class="active"' : '';

    return [
      '<div class="proto-flag">PROTOTYPE HỆ THỐNG — Dữ liệu mô phỏng theo Use Case bài toán OOAD · Không yêu cầu kết nối CSDL thực tế</div>',
      '<header class="site-header">',
      '  <div class="bar">',
      '    <a class="brand" href="index.html">',
      '      <i class="bi bi-house-heart-fill"></i>',
      '      <span>ODauDay Stay <small>' + conf.sub + '</small></span>',
      '    </a>',
      '    <nav class="nav" aria-label="Điều hướng">',
      '        ' + navHTML,
      '    </nav>',
      '    <div class="role-switch" aria-label="Chuyển vai trò để xem màn hình">',
      '      <span>Vai trò:</span>',
      '      <a href="index.html"' + guestAct + '>Khách</a>',
      '      <a href="host-properties.html"' + hostAct + '>Chủ nhà</a>',
      '      <a href="admin-users.html"' + adminAct + '>Quản trị</a>',
      '    </div>',
      '  </div>',
      '</header>'
    ].join("\n");
  }

  function buildFooterHTML() {
    return [
      '<footer class="site-footer">',
      '  <div class="footer-grid">',
      '    <div class="footer-col">',
      '      <a class="brand" href="index.html" style="margin-bottom:0.75rem;display:inline-flex;">',
      '        <i class="bi bi-house-heart-fill"></i>',
      '        <span>ODauDay Stay</span>',
      '      </a>',
      '      <p class="desc">',
      '        Hệ thống website cho thuê nhà ODauDay Stay — Đề tài Bài tập lớn môn Phân tích và Thiết kế Hướng đối tượng (OOAD), Trường Đại học Giao thông Vận tải (UTC).',
      '      </p>',
      '      <div style="margin-top:0.75rem;">',
      '        <span class="badge badge-active"><i class="bi bi-check2-circle"></i> Kiến trúc BCE & Mô hình 4+1 View</span>',
      '      </div>',
      '      <div style="display:flex;gap:0.75rem;margin-top:1rem;font-size:1.1rem;color:var(--muted);">',
      '        <a href="#" style="color:var(--muted);"><i class="bi bi-facebook"></i></a>',
      '        <a href="#" style="color:var(--muted);"><i class="bi bi-instagram"></i></a>',
      '        <a href="#" style="color:var(--muted);"><i class="bi bi-tiktok"></i></a>',
      '        <a href="#" style="color:var(--muted);"><i class="bi bi-youtube"></i></a>',
      '      </div>',
      '    </div>',
      '    <div class="footer-col">',
      '      <h4>Dành cho Khách</h4>',
      '      <ul>',
      '        <li><a href="index.html">Khám phá điểm đến</a></li>',
      '        <li><a href="search-results.html">Tìm kiếm chỗ ở (UC-02)</a></li>',
      '        <li><a href="my-bookings.html">Quản lý kỳ nghỉ (UC-04)</a></li>',
      '        <li><a href="cancel-states.html?state=confirm">Chính sách hủy phòng (BR-10)</a></li>',
      '      </ul>',
      '    </div>',
      '    <div class="footer-col">',
      '      <h4>Dành cho Chủ nhà</h4>',
      '      <ul>',
      '        <li><a href="host-properties.html">Quản lý cơ sở (UC-06)</a></li>',
      '        <li><a href="host-rooms.html">Hạng phòng & Bảng giá (UC-07)</a></li>',
      '        <li><a href="host-bookings.html">Xử lý yêu cầu đặt (UC-08)</a></li>',
      '        <li><a href="host-revenue.html">Báo cáo doanh thu (UC-09)</a></li>',
      '      </ul>',
      '    </div>',
      '    <div class="footer-col">',
      '      <h4>Thông tin học phần</h4>',
      '      <p class="desc" style="margin:0 0 0.5rem;font-size:0.85rem;line-height:1.7;">',
      '        Học phần: Phân tích thiết kế hướng đối tượng (OOAD)<br />',
      '        Giảng viên hướng dẫn: Thầy Nguyễn Hiếu Cường<br />',
      '        Nhóm sinh viên thực hiện: UTC Team',
      '      </p>',
      '      <div style="margin-top:0.5rem;">',
      '        <a class="btn btn-outline btn-sm" href="admin-users.html">',
      '          <i class="bi bi-shield-lock"></i> Khu vực Quản trị (Admin)',
      '        </a>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div class="footer-bottom">',
      '    <span>© 2026 – 2027 <strong>ODauDay Stay Platform</strong>. Toàn bộ mã nguồn & sơ đồ UML Mermaid phát triển theo đặc tả BTL.</span>',
      '    <span><i class="bi bi-hdd-network"></i> MySQL 8 / Spring Boot · <i class="bi bi-layout-text-window"></i> HTML5 / Bootstrap Icons</span>',
      '  </div>',
      '</footer>'
    ].join("\n");
  }

  // Render into DOM
  function renderLayout() {
    var headerContainer = document.getElementById("site-header");
    if (headerContainer) {
      headerContainer.outerHTML = buildHeaderHTML(role);
    }

    var footerContainer = document.getElementById("site-footer");
    if (footerContainer) {
      footerContainer.outerHTML = buildFooterHTML();
    }
  }

  // Execute synchronously
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderLayout);
  } else {
    renderLayout();
  }
})();

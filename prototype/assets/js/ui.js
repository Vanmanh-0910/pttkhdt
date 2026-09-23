/* ODauDay Stay prototype — JS tối thiểu.
   Chỉ làm hai việc: đánh dấu menu đang active và hiển thị khối lỗi/thông báo
   theo tham số ?state= trên URL để tiện chụp ảnh các luồng ngoại lệ.
   KHÔNG có logic nghiệp vụ, KHÔNG gọi API. */
(function () {
  "use strict";

  // 1) Đánh dấu link điều hướng ứng với trang hiện tại.
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a, .role-switch a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("/").pop();
    if (href === here) a.classList.add("active");
  });

  // 2) Hiện các khối [data-state] khớp ?state=... ; nếu không có tham số thì
  //    hiển thị khối [data-state="default"].
  var params = new URLSearchParams(location.search);
  var state = params.get("state") || "default";
  var blocks = document.querySelectorAll("[data-state]");
  if (blocks.length) {
    blocks.forEach(function (el) {
      var states = (el.getAttribute("data-state") || "").split(/\s+/);
      el.hidden = states.indexOf(state) === -1;
    });
  }

  // 3) Cho phép chuyển nhanh giữa các state bằng liên kết .state-link
  //    (dùng khi trình diễn để đổi kịch bản mà giữ nguyên trang).
  document.querySelectorAll("[data-goto-state]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var next = el.getAttribute("data-goto-state");
      var url = new URL(location.href);
      if (next && next !== "default") url.searchParams.set("state", next);
      else url.searchParams.delete("state");
      location.href = url.toString();
    });
  });
})();

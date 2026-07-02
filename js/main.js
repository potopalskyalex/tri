(function () {
  "use strict";

  var detail = document.querySelector(".detail");
  if (!detail) return;

  var prevUrl = detail.getAttribute("data-prev");
  var nextUrl = detail.getAttribute("data-next");

  function go(url) {
    if (!url || url === "#") return;
    window.location.href = url;
  }

  // Keyboard navigation
  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") go(prevUrl);
    if (e.key === "ArrowRight") go(nextUrl);
  });

  // Swipe navigation (touch)
  var startX = null;
  var startY = null;
  var THRESHOLD = 50;

  detail.addEventListener(
    "touchstart",
    function (e) {
      var t = e.changedTouches[0];
      startX = t.clientX;
      startY = t.clientY;
    },
    { passive: true }
  );

  detail.addEventListener(
    "touchend",
    function (e) {
      if (startX === null) return;
      var t = e.changedTouches[0];
      var dx = t.clientX - startX;
      var dy = t.clientY - startY;
      startX = null;

      if (Math.abs(dx) < THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

      if (dx < 0) {
        go(nextUrl); // swipe left -> next
      } else {
        go(prevUrl); // swipe right -> prev
      }
    },
    { passive: true }
  );
})();

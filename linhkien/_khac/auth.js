/* Trạng thái đăng nhập (mô phỏng, lưu bằng localStorage) – cập nhật thanh header */
(function () {
  var KEY = 'tp_logged_in', NAME = 'Nguyễn Văn A';
  function get() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function set(v) { try { v ? localStorage.setItem(KEY, '1') : localStorage.removeItem(KEY); } catch (e) {} }

  function render() {
    var on = get();
    var user = document.querySelector('header .user');
    if (user) {
      var cart = user.querySelector('.cart-btn');
      var cartHtml = cart ? cart.outerHTML : '';
      user.innerHTML = on
        ? '<a href="profile.html">👤 ' + NAME + '</a><a href="orders.html">🧾 Đơn mua</a><a href="login.html" data-logout>Đăng xuất</a>' + cartHtml
        : '<a href="login.html">Đăng nhập</a><a href="register.html">Đăng ký</a>' + cartHtml;
    }
    var tb = document.querySelector('.topbar-right');
    if (tb) {
      tb.querySelectorAll('a[href="profile.html"]').forEach(function (a) { a.style.display = on ? '' : 'none'; });
    }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    if (a.hasAttribute('data-logout')) set(false);
    else if (/login\.html$/.test(location.pathname) && a.classList.contains('btn') && a.getAttribute('href') === 'index.html') set(true);
  });

  render();
})();

/* Tự động thêm dấu chấm ngăn cách hàng nghìn khi nhập giá: 100000 -> 100.000 */
(function () {
  function fmt(s) {
    return s.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 12).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  document.querySelectorAll('input.money').forEach(function (inp) {
    inp.addEventListener('input', function () {
      var pos = inp.selectionStart;
      var digitsBefore = inp.value.slice(0, pos).replace(/\D/g, '').length;
      var v = fmt(inp.value);
      inp.value = v;
      var k = 0, n = 0;
      while (k < v.length && n < digitsBefore) { if (/\d/.test(v[k])) n++; k++; }
      try { inp.setSelectionRange(k, k); } catch (e) {}
    });
    if (inp.value) inp.value = fmt(inp.value);
  });
})();

// 好物安利下载配置 —— 每次发新版只改这个文件
window.APP_DOWNLOAD = {
  version: '1.0.67',
  date: '2026-11-21',
  size: '57.9 MB',
  apk: 'dist/haowuanli_1.0.67.apk',
  sha256: 'c2e6d0ec485f2f717c1735bc9ab270718d03754a895b3421c5dd7a237edc53ae',
  changelog: '1. 线报页右上角新增分享按钮,分享内容附带页面链接'
};

(function () {
  function apply() {
    var d = window.APP_DOWNLOAD;
    // 所有 data-dl 占位链接指向 APK
    document.querySelectorAll('a[data-dl]').forEach(function (a) {
      a.href = d.apk;
      a.setAttribute('download', '');
    });
    // 填充信息字段（元素不存在则跳过）
    var set = function (id, v) {
      var el = document.getElementById(id);
      if (el) el.textContent = v;
    };
    set('d-version', 'v' + d.version);
    set('d-size', d.size);
    set('d-date', d.date);
    set('cl-box', '本次更新内容\n' + d.changelog);
    set('k-version', 'v' + d.version);
    set('k-size', d.size);
    set('k-date', d.date);
    set('k-sha', d.sha256);
    set('v-name', 'v' + d.version);
    set('dl-meta', '当前最新 v' + d.version + ' · ' + d.size + ' · 更新于 ' + d.date);
    set('changelog-box', d.changelog);
    set('changelog-list', d.changelog);
    // SHA-256 复制按钮（兼容旧版页面）
    var btn = document.getElementById('copy-sha');
    if (btn) {
      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(d.sha256).then(function () {
          btn.textContent = '已复制 ✓';
          setTimeout(function () { btn.textContent = '复制'; }, 1500);
        });
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();

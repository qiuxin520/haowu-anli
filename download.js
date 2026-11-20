// 好物安利下载配置 —— 每次发新版只改这个文件
window.APP_DOWNLOAD = {
  version: '1.0.67',
  date: '2026-11-21',
  size: '57.9 MB',
  apk: 'dist/haowuanli_1.0.67.apk',
  sha256: 'c2e6d0ec485f2f717c1735bc9ab270718d03754a895b3421c5dd7a237edc53ae',
  changelog: '1. 线报页右上角新增分享按钮,分享内容附带页面链接'
};

// iOS 巨魔版配置
window.APP_DOWNLOAD_IOS = {
  version: '1.0.67',
  date: '2026-11-21',
  size: '20.0 MB',
  ipa: 'dist/haowuanli_1.0.67_trollstore.ipa',
  sha256: 'a86dd96f6236adc7d613fdd754a4efcf6e12a3b0c331fa4d2e9e704b95caef53',
  changelog: '1. 线报页右上角新增分享按钮,分享内容附带页面链接'
};

(function () {
  function bindCopy(btnId, text) {
    var btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = '已复制 ✓';
          setTimeout(function () { btn.textContent = '复制'; }, 1500);
        });
      });
    }
  }

  function apply() {
    var d = window.APP_DOWNLOAD;
    var ios = window.APP_DOWNLOAD_IOS;
    var isIOS = !!document.querySelector('a[data-dl-ios]');
    var cur = isIOS ? ios : d;

    // 所有 data-dl 占位链接指向 APK
    document.querySelectorAll('a[data-dl]').forEach(function (a) {
      a.href = d.apk;
      a.setAttribute('download', '');
    });
    // 所有 data-dl-ios 占位链接指向 IPA
    document.querySelectorAll('a[data-dl-ios]').forEach(function (a) {
      a.href = ios.ipa;
      a.setAttribute('download', '');
    });
    // 填充信息字段（元素不存在则跳过）
    var set = function (id, v) {
      var el = document.getElementById(id);
      if (el) el.textContent = v;
    };
    // 安卓
    set('d-version', 'v' + d.version);
    set('d-size', d.size);
    set('d-date', d.date);
    set('k-version', 'v' + d.version);
    set('k-size', d.size);
    set('k-date', d.date);
    set('k-sha', d.sha256);
    // iOS
    set('i-version', 'v' + ios.version);
    set('i-size', ios.size);
    set('i-date', ios.date);
    set('i-sha', ios.sha256);
    // 通用（当前页面按平台取值）
    set('v-name', 'v' + cur.version);
    set('dl-meta', '当前最新 v' + cur.version + ' · ' + cur.size + ' · 更新于 ' + cur.date);
    set('changelog-box', '本次更新内容\n' + cur.changelog);
    set('changelog-list', cur.changelog);
    // SHA-256 复制按钮
    bindCopy('copy-sha', cur.sha256);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();

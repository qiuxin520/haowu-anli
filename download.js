// 好物安利下载配置 —— 每次发新版只改这个文件
window.APP_DOWNLOAD = {
  version: '1.02.3',
  date: '2026-11-27',
  size: '62.5 MB',
  apk: 'dist/haowuanli_1.02.3.apk',
  sha256: 'b11b749dbdb35b897cf3254c734162b8603b6259b2aa58923230ade7bd30d4b4',
  changelog: '1. 修复京东/拼多多功能图标和banner点击无反应\n2. QQ群链接改为后台可配置,点击直接拉起QQ\n3. 修复WebView首屏黑屏,专题页数据加载优化'
};

// iOS 巨魔版配置
window.APP_DOWNLOAD_IOS = {
  version: '1.02.3',
  date: '2026-11-27',
  size: '25.0 MB',
  ipa: 'dist/haowuanli_1.02.3_trollstore.ipa',
  sha256: '3555c65b6ab56540db4fff52d57d2a67cbb61be29457f6d835b0858b2e1446f9',
  changelog: '1. 修复iOS点击QQ群要点好多下才响应,改为直接浏览器打开加群页\n2. 修复京东/拼多多功能图标和banner点击无反应\n3. QQ群链接后台可配置,WebView首屏黑屏修复'
};

// 鸿蒙版配置（HAP 231MB 超 GitHub Pages 单文件上限，托管在下载后台）
window.APP_DOWNLOAD_HARMONY = {
  version: '1.02.3',
  date: '2026-11-27',
  size: '307 MB',
  hap: 'http://520596.xyz:8082/api/app-release/download/1604',
  sha256: 'f54abedae2f1461ec5f3c08589e3d1c5296a28038210a2d3434b22935e135509',
  changelog: '1. 修复京东/拼多多功能图标和banner点击无反应\n2. QQ群链接改为后台可配置,点击直接拉起QQ\n3. 修复WebView首屏黑屏,专题页数据加载优化'
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
    var harmony = window.APP_DOWNLOAD_HARMONY;
    var isIOS = !!document.querySelector('a[data-dl-ios]');
    var isHarmony = !!document.querySelector('a[data-dl-harmony]');
    var cur = isHarmony ? harmony : (isIOS ? ios : d);

    // 所有 data-dl 占位链接指向 APK
    document.querySelectorAll('a[data-dl]').forEach(function (a) {
      a.href = d.apk;
      a.setAttribute('download', '好物安利_' + d.version + '.apk');
    });
    // 所有 data-dl-ios 占位链接指向 IPA
    document.querySelectorAll('a[data-dl-ios]').forEach(function (a) {
      a.href = ios.ipa;
      a.setAttribute('download', '好物安利_' + ios.version + '_巨魔版.ipa');
    });
    // 所有 data-dl-harmony 占位链接指向 HAP（后台地址，download 属性指定扩展名）
    document.querySelectorAll('a[data-dl-harmony]').forEach(function (a) {
      a.href = harmony.hap;
      a.setAttribute('download', '好物安利_' + harmony.version + '_鸿蒙版.hap');
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
    // 鸿蒙
    set('h-version', 'v' + harmony.version);
    set('h-size', harmony.size);
    set('h-date', harmony.date);
    set('h-sha', harmony.sha256);
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

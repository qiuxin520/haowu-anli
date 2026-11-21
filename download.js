// 好物安利下载配置 —— 每次发新版只改这个文件
window.APP_DOWNLOAD = {
  version: '1.0.68',
  date: '2026-11-22',
  size: '57.9 MB',
  apk: 'dist/haowuanli_1.0.68.apk',
  sha256: '83c57520fbaf7b8061029002048227db79361132451bd44310ddf1118c61b607',
  changelog: '1. 新增 App 内更新检测（含鸿蒙跳转下载页）\n2. 统一包名为 com.haowuanli.app'
};

// iOS 巨魔版配置
window.APP_DOWNLOAD_IOS = {
  version: '1.0.68',
  date: '2026-11-22',
  size: '20.0 MB',
  ipa: 'dist/haowuanli_1.0.68_trollstore.ipa',
  sha256: '87081b8dd9458869670d021be1f29fa2e2d35e85e485b12e6d4deca0bf3694cb',
  changelog: '1. 新增 App 内更新检测（含鸿蒙跳转下载页）\n2. 统一包名为 com.haowuanli.app'
};

// 鸿蒙版配置（HAP 524MB 超 GitHub Pages 单文件上限，托管在下载后台）
window.APP_DOWNLOAD_HARMONY = {
  version: '1.0.67',
  date: '2026-11-22',
  size: '36.7 MB',
  hap: 'http://192.144.158.126:8082/files/apk/f249dcc4_haowuanli_1.0.67_harmony_update.hap.apk',
  sha256: '119c4ca5a0ff01d334dcca77e6580c54cbc8b01ad56ea2faec7d99d2dd702e1b',
  changelog: '1. 鸿蒙原生版正式签名发布,支持 HarmonyOS NEXT'
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

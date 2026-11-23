// 好物安利下载配置 —— 每次发新版只改这个文件
window.APP_DOWNLOAD = {
  version: '1.0.85',
  date: '2026-11-23',
  size: '57.9 MB',
  apk: 'dist/haowuanli_1.0.85.apk',
  sha256: '87320347029e6927e7418c0275cb99fccfe40b5f3b961b29ef020e33176fd75f',
  changelog: '1. 修复AI搜索商品卡详情:主图灰色空白、点立即领券提示加载中的问题\n2. AI商品卡补齐轮播图与详情图,大淘客来源改走完整详情接口\n3. 好单库商品购买链接转链绑定自有PID'
};

// iOS 巨魔版配置
window.APP_DOWNLOAD_IOS = {
  version: '1.0.85',
  date: '2026-11-23',
  size: '21.0 MB',
  ipa: 'dist/haowuanli_1.0.85_trollstore.ipa',
  sha256: '142cdd39195e9df42190bc6b40b020f6f46dbeb9ace6166addf5175369698288',
  changelog: '1. 修复AI搜索商品卡详情:主图灰色空白、点立即领券提示加载中的问题\n2. AI商品卡补齐轮播图与详情图,大淘客来源改走完整详情接口\n3. 好单库商品购买链接转链绑定自有PID'
};

// 鸿蒙版配置（HAP 231MB 超 GitHub Pages 单文件上限，托管在下载后台）
window.APP_DOWNLOAD_HARMONY = {
  version: '1.0.85',
  date: '2026-11-23',
  size: '231 MB',
  hap: 'http://192.144.158.126:8082/api/app-release/download/1156',
  sha256: 'c95a707dfcc643397de57c3d6681692719d6309814321b3dcaa5fab9e690d5b6',
  changelog: '1. 修复AI搜索商品卡详情:主图灰色空白、点立即领券提示加载中的问题\n2. AI商品卡补齐轮播图与详情图,大淘客来源改走完整详情接口\n3. 好单库商品购买链接转链绑定自有PID'
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

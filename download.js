// 好物安利下载配置 —— 每次发新版只改这个文件
window.APP_DOWNLOAD = {
  version: '1.0.1',
  date: '2026-11-28',
  size: '62.7 MB',
  apk: 'dist/haowuanli_1.0.1.apk',
  sha256: '1bc5590e55db10b68a9be3f7811b8bb49bd9f586af26b1cf57ff2c34f1903691',
  changelog: '1. 新增省钱助手:商品卡一键看省钱攻略/跨平台比价/商品百科\n2. AI导购接入DeepSeek大模型,回答更自然更懂商品\n3. 收藏/足迹/搜索结果页商品卡均可直接唤起省钱助手'
};

// iOS 巨魔版配置
window.APP_DOWNLOAD_IOS = {
  version: '1.0.0',
  date: '2026-11-27',
  size: '25.0 MB',
  ipa: 'dist/haowuanli_1.0.0_trollstore.ipa',
  sha256: '2f6ec648ec959e4b482d0ba8ab55edb92fa0ff7899c672ea345f04c3a5856ec4',
  changelog: '1. 服务器迁移新节点,全面启用HTTPS加密,更快更安全\n2. iOS点QQ群改为直接浏览器打开\n3. 修复京东/拼多多功能图标和banner点击无反应'
};

// 鸿蒙版配置（HAP 231MB 超 GitHub Pages 单文件上限，托管在下载后台）
window.APP_DOWNLOAD_HARMONY = {
  version: '1.0.0',
  date: '2026-11-27',
  size: '307 MB',
  hap: 'https://520596.xyz/api/app-release/download/1654',
  sha256: '5685c76cd6ec6259323e5d392cfede825097436e6eeef41918dd93cfa1e7ea0e',
  changelog: '1. 服务器迁移新节点,全面启用HTTPS加密,更快更安全\n2. iOS点QQ群改为直接浏览器打开\n3. 修复京东/拼多多功能图标和banner点击无反应'
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

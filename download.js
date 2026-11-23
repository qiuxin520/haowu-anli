// 好物安利下载配置 —— 每次发新版只改这个文件
window.APP_DOWNLOAD = {
  version: '1.0.84',
  date: '2026-11-23',
  size: '57.9 MB',
  apk: 'dist/haowuanli_1.0.84.apk',
  sha256: '9888276a1a3d3250812fca382f95f75224f100d4f086eda520e07f03b437dd6c',
  changelog: '1. 搜索改为服务端分页，上拉无限翻页，结果不再只有120条\n2. 排序/筛选改服务端处理，人气/热销/价格/优惠券/平台筛选更全更准\n3. 全平台下单佣金均绑定自有推广位'
};

// iOS 巨魔版配置
window.APP_DOWNLOAD_IOS = {
  version: '1.0.84',
  date: '2026-11-23',
  size: '20.0 MB',
  ipa: 'dist/haowuanli_1.0.84_trollstore.ipa',
  sha256: '2e2e4a0dccc2ea505a1ddf270064d6e50f59a79b7f446482188ae7d99dd338b7',
  changelog: '1. 搜索改为服务端分页，上拉无限翻页\n2. 排序/筛选改服务端处理，结果更全更准\n3. 全平台下单佣金均绑定自有推广位'
};

// 鸿蒙版配置（HAP 219.8MB 超 GitHub Pages 单文件上限，托管在下载后台）
window.APP_DOWNLOAD_HARMONY = {
  version: '1.0.84',
  date: '2026-11-23',
  size: '219.8 MB',
  hap: 'http://192.144.158.126:8082/api/app-release/download/1154',
  sha256: 'f66bb7ce862a3c895236282d6e2efbc8e1f76bb5faf73cb56463db92afa31a8a',
  changelog: '1. 搜索改为服务端分页，上拉无限翻页\n2. 排序/筛选改服务端处理，结果更全更准\n3. 全平台下单佣金均绑定自有推广位'
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

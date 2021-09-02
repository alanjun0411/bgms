import remoteLoad from './remoteLoad'
export default {
  formatTime (format = 'Y-m-d H:m:s', data = '') {
    data = data || new Date()
    const o = {
      Y: data.getFullYear(),
      m: data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1,
      d: data.getDate() < 10 ? '0' + data.getDate() : data.getDate(),
      H: data.getHours() < 10 ? '0' + data.getHours() : data.getHours(),
      M: data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes(),
      s: data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds(),
      q: Math.floor((data.getMonth() + 3) / 3)
    }
    const day = {
      'Y-m-d H:m:s': `${o.Y}-${o.m}-${o.d} ${o.H}:${o.M}:${o.s}`,
      'Y-m-d': `${o.Y}-${o.m}-${o.d}`,
      'H:m:s': `${o.H}:${o.M}:${o.s}`,
      'Y/m/d H:m:s': `${o.Y}/${o.m}/${o.d} ${o.H}:${o.M}:${o.s}`,
      'Y/m/d': `${o.Y}/${o.m}/${o.d}`,
      'Y年m月d日': `${o.Y}年${o.m}月${o.d}日`,
      'Y年m月d日 H:m:s': `${o.Y}年${o.m}月${o.d}日 ${o.H}:${o.M}:${o.s}`
    }
    return !day[format] ? '输入的日期格式不对' : day[format]
  },
  formatWeek (format = '星期', data = '') {
    data = data || new Date()
    const day = {
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六',
      7: '日'
    }
    return format + day[data.getDay()]
  },
  getLocation (callback) {
    this.loadAMapJs((AMap) => {
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)
        function onComplete (data) {
          // data是具体的定位信息
          data = { status: true, data }
          callback && callback(data)
        }
        function onError (data) {
          // 定位出错
          data = { status: false, msg: '无法定位' }
          callback && callback(data)
        }
      })
    })
  },
  async loadAMapJs (callback) {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
    // 未载入高德地图API，则先载入API再初始化
      callback && callback(window.AMap)
    } else {
      await remoteLoad('https://webapi.amap.com/maps?v=1.4.15&key=eec4bfef5fc03a89a3e3da55989b720e')
      await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
      callback && callback(window.AMap)
    }
  }
}

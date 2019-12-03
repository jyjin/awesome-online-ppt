/**
 * 全局工具类
 *    add by jyjin 2019.07.31
 */
module.exports = {
  // 键盘事件
  onKeyboard: (e, theCode, callback) => {
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code === theCode) {
      callback(e)
    }
  },
  // 获取滚动条滚动距离
  getScrollTop: () => {
    var scrollPos;
    if (window.pageYOffset) {
      scrollPos = window.pageYOffset;
    }
    else if (document.compatMode && document.compatMode !== 'BackCompat') {
      scrollPos = document.documentElement.scrollTop;
    }
    else if (document.body) {
      scrollPos = document.body.scrollTop;
    }
    return scrollPos;
  },
  // 元素添加样式
  addClass: (ele, className) => {
    let a = ele.getAttribute('class').split(' ')
    a.push(className)
    ele.setAttribute('class', a.join(' '))
    return a
  },
  // 元素删除样式
  removeClass: (ele, className) => {
    let a = ele.getAttribute('class').split(' ')
    const i = a.findIndex(item => item === className)
    a.splice(i, 1)
    ele.setAttribute('class', a.join(' '))
    return a
  },
  // 获取元素高度
  getElementHeight: (ele) => {
    return ele.clientHeight;
  },
  // 设置网页标题
  setTitle: (title) => {
    document.querySelector('title').innerText = title;
  },
  // 头像名称截取
  avatarName: (name) => {
    if (typeof name !== 'string') return ''
    return name.charAt(0).toUpperCase()
  },
  isPc: () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },
  createUrlSearch: (data) => {
    if (data) {
      let arr = []
      Object.keys(data).map(key => {
        arr.push(`${key}=${data[key]}`)
      })
      if (arr.length) {
        return `?${arr.join('&')}`
      } else {
        return ``
      }
    } else {
      return ``
    }
  },
  closePage: function () {
    if (navigator.userAgent.indexOf("MSIE") > 0) { //no-restricted-globals
      if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
        window.opener = null; window.close();
      }
      else {
        window.open('', '_top'); window.top.close();
      }
    }
    else if (navigator.userAgent.indexOf("Firefox") > 0) {
      //火狐默认状态非window.open的页面window.close是无效的    
      window.location.href = 'about:blank '; //no-restricted-globals
      //window.history.go(-2);     
    }
    else {
      window.opener = null;
      window.open('', '_self', '');
      window.open(window.location.href, '_self').close() //no-restricted-globals
    }
  },
  isFireFox() {
    return !!~navigator.userAgent.toLowerCase().indexOf('firefox')
  }
 
}
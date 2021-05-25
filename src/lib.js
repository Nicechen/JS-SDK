// 检查是否能用浏览器缓存
function checkStorge() {
  const mod = 'modernizr';
  try {
    sessionStorage.setItem(mod, mod);
    sessionStorage.removeItem(mod);
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
    return true;
  } catch (e) {
    return false;
  }
}

// 屏幕旋转
// eslint-disable-next-line no-unused-vars
function orientationchange(cb) {
  window.addEventListener('orientationchange', cb);
  // let orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
}

function splitUrl() {
  const obj = {};
  const url = location.href.replace(/#\//, '').split('?');

  if (url.length > 1) {
    const o = url[1].split('&');
    for (let i = 0; i < o.length; i++) {
      obj[o[i].split('=')[0]] = o[i].split('=')[1];
    }
  }
  return obj;
}

// 乱序数组
// eslint-disable-next-line no-unused-vars
function shuffle(arr) {
  const { length } = arr;
  for (let index = 0, rand; index < length; index++) {
    rand = Math.floor(Math.random() * (length - 1));

    const temp = arr[rand];
    arr[rand] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

export {
  checkStorge,
  splitUrl,
};

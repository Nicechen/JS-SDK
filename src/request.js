import { urlPrefix } from './config';

class Fetch {
  constructor(opt = {}) {
    this.header = opt.header || {};
    this.prefix = urlPrefix;
  }

  get(apiName, qs, header = {}) {
    const _header = Object.assign({}, header, this.header);
    return new Promise((resolve, reject) => {
      let url = apiName;
      qs ? url += qsStringify(qs) : url = apiName;
      console.log(_header);
      ajax({
        url: `${this.prefix}/${url}`,  // 请求地址
        type: 'GET',  // 请求类型，默认"GET"，还可以是"POST"
        header: _header,
        success(res) {  // 请求成功的回调函数
          resolve(JSON.parse(res));
        },
        error(error) {
          // 请求失败的回调函数
          reject(error);
        },
      });
    });
  }

  post(apiName, body = {}, header = {}) {
    const _header = Object.assign({}, header, this.header);

    return new Promise((resolve, reject) => {
      ajax({
        url: `${this.prefix}/${apiName}`,  // 请求地址
        type: 'POST',  // 请求类型，默认"GET"，还可以是"POST"
        data: body,  // 传输数据
        header: _header,
        success(res) {
          // 请求成功的回调函数
          resolve(JSON.parse(res));
        },
        error(error) {
          // 请求失败的回调函数
          reject(error);
        },
      });
    });
  }
}

function qsStringify(obj) {
  let s = '?';
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      s += `${k}=${obj[k]}&`;
    }
  }
  return s;
}

function ajax(params = {}) {
  params.data = params.data || {};
  _ajax(params);

  // ajax请求
  function _ajax(params) {
    // 请求方式，默认是GET
    params.type = (params.type || 'GET').toUpperCase();
    // 避免有特殊字符，必须格式化传输数据
    params.data = JSON.stringify(params.data);
    let xhr = null;


    // 实例化XMLHttpRequest对象
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      // IE6及其以下版本
      xhr = new window.ActiveXObjcet('Microsoft.XMLHTTP');
    }


    // 监听事件，只要 readyState 的值变化，就会调用 readystatechange 事件
    xhr.onreadystatechange = function () {
      // readyState属性表示请求/响应过程的当前活动阶段，4为完成，已经接收到全部响应数据
      if (xhr.readyState === 4) {
        const { status } = xhr;
        // status：响应的HTTP状态码，以2开头的都是成功
        if (status >= 200 && status < 300) {
          let response = '';
          // 判断接受数据的内容类型
          const type = xhr.getResponseHeader('Content-type');
          if (type.indexOf('xml') !== -1 && xhr.responseXML) {
            response = xhr.responseXML; // Document对象响应
          } else if (type === 'application/json') {
            response = JSON.parse(xhr.responseText); // JSON响应
          } else {
            response = xhr.responseText; // 字符串响应
          }
          // 成功回调函数
          params.success && params.success(response);
        } else {
          params.error && params.error(status);
        }
      }
    };

    // 连接和传输数据
    if (params.type === 'GET') {
      // 三个参数：请求方式、请求地址(get方式时，传输数据是加在地址后的)、是否异步请求(同步请求的情况极少)；
      xhr.open(params.type, params.url, true);
      // 必须，设置提交时的内容类型
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      for (const item in params.header) {
        xhr.setRequestHeader(item, params.header[item]);
      }
      xhr.send(null);
    } else {
      xhr.open(params.type, params.url, true);
      // 必须，设置提交时的内容类型
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      for (const item in params.header) {
        xhr.setRequestHeader(item, params.header[item]);
      }
      // 传输数据
      xhr.send(params.data);
    }
  }

  // 获取随机数
  function random() {
    return Math.floor(Math.random() * 10000 + 500);
  }
}

export default Fetch;

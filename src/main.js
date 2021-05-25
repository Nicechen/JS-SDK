import Ajax from './request';

class CoralDemo {
  constructor(options) {
    this.options = options || {};
  }

  // 必须要在这里回调
  async ready(cb, errCb) {
    console.log(1030, this.options);
    if (cb) {
      if (document.readyState !== 'loading') {
        this.doInit(cb, errCb);
      } else if (window.addEventListener) {
        // DOMContentLoaded - 所有DOM解析完会触发整个事件 不需要等到样式表、图片等加载完。
        window.addEventListener('DOMContentLoaded', () => {
          this.doInit(cb, errCb);
        });
      } else {
        window.attachEvent('onreadystatechange', () => {
          if (document.readyState !== 'loading') ;
          this.doInit(cb, errCb);
        });
      }
    }
  }

  async doInit(cb, err) {
    const {
      appId,
      timestamp,
      nonceStr,
      signature,
    } = this.options;

    if (!appId) {
      err('empty appid');
    }
    if (!timestamp) {
      err('empty timestamp');
    }

    if (!signature) {
      err('empty signature');
    }
    if (!nonceStr) {
      err('empty nonceStr');
    }
    this.ajax = new Ajax({
      header: {
        'coral-sign-params': `nonce=${nonceStr};signature=${signature};ts=${timestamp};appid=${appId}`,
      },
    });
    await CoralDemo.init(cb);
  }

  static init(cb) {
    console.log('init');
    return new Promise(async (resolve, reject) => {
      // 这里其实还是要拉取配置
      // CoralDemo.ajax.get();
      cb();
    });
  }

  getTaskTest() {
    this.ajax.get('extfe/getJSSDKTask');
  }
}

export default CoralDemo;

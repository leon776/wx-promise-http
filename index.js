const request = Symbol('request');

class WxHttp {
  constructor(config) {
    this.config = config;
    if(!Promise.prototype.always) {
      Promise.prototype.always = function (callback) {
        return this.then(function (d) {
          return callback(d, undefined)
        }, function (e) {
          return callback(undefined, e)
        })
      }
    }
  }
  //内部方法，发http请求
  [request](method, url, params) {
    console.log(this.config)
    const promise = new Promise((resolve, reject) => {
      wx.request({
        method: method || 'get',
        url: this.config.api + url,
        header: this.config.header,
        data: params,
        success: (res) => {
          resolve(res.data);
        },
        fail: (res) => {
          reject(res);
        },
        complete: () => {

        }
      });
    });
    return promise;
  }
  //仿axios风格对外暴露
  http = {
    get: (url, params) => {
      return this[request]('get', url, params);
    },
    post: (url, params) => {
      return this[request]('post', url, params);
    },
  }
  config = {}
}

export default WxHttp;

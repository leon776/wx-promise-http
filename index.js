const request = Symbol('request');

class WxHttp {
  constructor() {
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
    const promise = new Promise((resolve, reject) => {
      wx.request({
        method: method || 'get',
        url: 'https://babytest.zjtech.cc/api/' + url,
        header: {
          token: params.token || this.vm.token
        },
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
}

export default WxHttp;

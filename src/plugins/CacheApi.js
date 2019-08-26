/* eslint-disable */
import 'whatwg-fetch';
import 'url-polyfill';
class AbstractApi {
  constructor() {}
  get() {}
  post() {}
}

export const METHOD = {
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
  PUT: 'PUT',
  JSONP: 'JSONP',
};
const NET_ERROR = '网络异常';

export class Api extends AbstractApi {
  constructor(host) {
    super();
    this.host = host;
  }
  static getSearchParams(obj) {
    const urlSearchParamsObj = new URLSearchParams();
    for (const key in obj) {
      urlSearchParamsObj.set(key, obj[key]);
    }
    return urlSearchParamsObj.toString();
  }
  getUrl(url, data, method = METHOD.GET) {
    let urlIns;
    let key;
    if (url.indexOf('http') == 0) {
      urlIns = new URL(url);
    } else {
      url = this.host + url;
      urlIns = new URL(url, document.URL);
    }
    if (method == METHOD.GET || method == METHOD.HEAD) {
      for (key in data) {
        urlIns.searchParams.set(key, data[key]);
      }
      urlIns.searchParams.set('_t', +new Date());
    }
    return urlIns.toString();
  }

  fetch(url, data, option) {
    const args = {
      method: METHOD.GET,
      credentials: 'same-origin',
    };
    Object.assign(args, option);
    url = this.getUrl(url, data, args.method);
    //处理body 以及参数g
    if (args.method == METHOD.GET || args.method == METHOD.HEAD) {
    } else {
      if (data.constructor == Object.prototype.constructor) {
        args.body = Api.getSearchParams(data);
      } else {
        args.body = data;
      }
    }
    const request = new Request(url, args);
    return new Promise((resolve, reject) => {
      window.fetch(request).then(
        response => {
          if (response.ok) {
            response.json().then(
              data => {
                resolve(data);
              },
              e => {
                reject(new Error('data json error'));
              }
            );
          } else {
            reject(new Error('error ' + response.status));
          }
        },
        e => {
          reject(e);
        }
      );
    });
  }
  get(url, data, option) {
    return this.fetch(url, data, option);
  }
  post(url, data, option) {
    const args = {
      method: METHOD.POST,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return this.fetch(url, data, Object.assign(args, option));
  }
  jsonp(url, data, option) {
    const args = {
      type: 'text/javascript',
      charset: 'UTF-8',
      jsonp: 'callback',
      jsonpCallback:
        'jsonp' +
        Math.random()
          .toString()
          .substr(2),
    };
    Object.assign(args, option);
    data = data || {};
    data[args.jsonp] = args.jsonpCallback;
    return new Promise((resolve, reject) => {
      window[args.jsonpCallback] = function(data) {
        resolve(data);
        window[args.jsonpCallback] = null;
      };
      const script = document.createElement('script');
      script.type = args.type;
      script.charset = args.charset;
      script.onload = function() {
        script.onload = null;
        document.head.removeChild(script);
      };
      script.onerror = function() {
        script.onerror = null;
        document.head.removeChild(script);
        reject(new Error(NET_ERROR));
      };
      script.src = this.getUrl(url, data);
      document.head.appendChild(script);
    });
  }
}

class CacheApi extends Api {
  constructor(host) {
    super(host);
    this.caches = {};
  }
  cache(method, url, data, option) {
    const args = {
      memoryCache: false,
    };
    Object.assign(args, option);
    const key = url + JSON.stringify(data);
    const res = this.caches[key];
    if (!res) {
      this.caches[key] = new Promise((resolve, reject) => {
        super[method.toLowerCase()](url, data, option).then(
          data => {
            if (!args.memoryCache) {
              this.caches[key] = null;
            }
            resolve(data);
          },
          e => {
            this.caches[key] = null;
            reject(e);
          }
        );
      });
    }
    return this.caches[key];
  }
  get(url, data, option) {
    return this.cache(METHOD.GET, url, data, option);
  }
  jsonp(url, data, option) {
    return this.cache(METHOD.JSONP, url, data, option);
  }
}

const storage = {
  get(key) {
    return localStorage.getItem(key);
  },
  set(key, val, cacheDuration) {
    cacheDuration = cacheDuration * 1000;
    localStorage.setItem(
      key,
      JSON.stringify(val) + '|' + +new Date() + '|' + cacheDuration
    );
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

// 暂时还未使用，使用前先验证
export class ApiLocalCache extends Api {
  constructor(host) {
    super(host);
  }
  jsonp(url, data, option, localConfig) {
    const isLocalStore = localConfig && localConfig.isLocalCache,
      isDelayUpdate = localConfig && localConfig.isDelayUpdate,
      cacheTime = localConfig && localConfig.cacheTime,
      key = url + JSON.stringify(data),
      localData = storage.get(key);

    return new Promise((resolve, reject) => {
      // 不用localstorage
      if (!isLocalStore) {
        super.getjsonp(url, data, option, localConfig).then(
          data => {
            resolve(data);
          },
          e => {
            reject(e);
          }
        );

        // 需要local
      } else {
        const storeArr = localData && localData.split('|'),
          outOfDate = localData && +storeArr[1] + +storeArr[2] < +new Date();

        !outOfDate || (outOfDate && isDelayUpdate);
        // 本地有&(没过期|过期了后更新)，用本地的
        if (localData) {
          if (!outOfDate || (outOfDate && isDelayUpdate)) {
            resolve(JSON.parse(storeArr[0]));
          }
        }

        if (!localData || outOfDate) {
          // 本地没有 | 过期了(必须使用最新数据&后更新 都需要再拉一次接口)
          super.jsonp(url, data, option, localConfig).then(
            data => {
              storage.set(key, data, cacheTime);
              resolve(data);
            },
            e => {
              reject(e);
            }
          );
        }
      }
    });
  }
  get(url, data, option, localConfig) {
    const isLocalStore = localConfig && localConfig.isLocalCache,
      isDelayUpdate = localConfig && localConfig.isDelayUpdate,
      cacheTime = localConfig && localConfig.cacheTime,
      key = url + JSON.stringify(data),
      localData = storage.get(key);
    return new Promise((resolve, reject) => {
      // 不用localstorage
      if (!isLocalStore) {
        super.get(url, data, option, localConfig).then(
          data => {
            resolve(data);
          },
          e => {
            reject(e);
          }
        );

        // 需要local
      } else {
        const storeArr = localData && localData.split('|'),
          outOfDate = localData && +storeArr[1] + +storeArr[2] < +new Date();

        !outOfDate || (outOfDate && isDelayUpdate);
        // 本地有&(没过期|过期了后更新)，用本地的
        if (localData) {
          if (!outOfDate || (outOfDate && isDelayUpdate)) {
            resolve(JSON.parse(storeArr[0]));
          }
        }

        if (!localData || outOfDate) {
          // 本地没有 | 过期了(必须使用最新数据&后更新 都需要再拉一次接口)
          super.get(url, data, option).then(
            data => {
              storage.set(key, data, cacheTime);
              resolve(data);
            },
            e => {
              reject(e);
            }
          );
        }
      }
    });
  }
}

export default CacheApi;

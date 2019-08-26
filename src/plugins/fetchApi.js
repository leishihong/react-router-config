/*
 * @Author: shihong.lei@advance.ai
 * @Date: 2019-07-24 16:47:15
 * @Last Modified by: shihong.lei@advance.ai
 * @Last Modified time: 2019-08-26 11:19:57
 */
/* eslint-disable */

import axios from './axios';
import cookies from 'js-cookie';
import Jsonp from 'jsonp';
// import config from './config';
import qs from 'query-string';

const fetchApi = (url = '', data = {}, type = 'GET', config) => {
  axios.defaults.withCredentials = true;
  type = type.toUpperCase();
  if (type === 'GET') {
    let dataStr = '';
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    });
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + encodeURI(dataStr) + '&t=' + new Date().getTime();
    }
  }
  if (url.indexOf('?') < 0) {
    url = encodeURI(url) + '?t=' + new Date().getTime();
  }
  const defaultConfig = { showLoading: true };
  // http://47.105.60.116:8002
  let tokenUid =
    url.split('?')[0] === 'user/loginValidateCode' ||
    url.split('?')[0] === 'user/login'
      ? ''
      : `&uid=${cookies.get('tokenUid') ? cookies.get('tokenUid') : ''}`;
  return axios({
    method: type,
    baseURL: '',
    url: `${url}${tokenUid}`,
    data: data,
    ...{ ...defaultConfig, ...config },
  });
};

axios.jsonp = url => {
  if (!url) {
    console.error('Axios.JSONP 至少需要一个url参数!');
    return;
  }
  return new Promise((resolve, reject) => {
    window.jsonCallBack = result => {
      resolve(result);
    };
    var JSONP = document.createElement('script');
    JSONP.type = 'text/javascript';
    JSONP.src = `${url}&callback=jsonCallBack`;
    document.getElementsByTagName('head')[0].appendChild(JSONP);
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP);
    }, 500);
  });
};
const fetchJsonp = url => axios.jsonp(url);

/**
 * 调用 统一用户 相关的接口
 */
const fetchUniServerData = (uri, data = {}, type = 'GET') => {
  axios.defaults.withCredentials = false;
  type = type.toUpperCase();
  let url = 'config.uniServer.prod + uri';
  return axios({
    method: type,
    baseURL: url,
    data: qs.stringify(data),
  });
};

const fetchApiJsonp = (url, data, options) => {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

  return new Promise((resolve, reject) => {
    Jsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

const param = data => {
  let url = '';
  for (const i in data) {
    const value = data[i] !== undefined ? data[i] : '';
    url += `&${i}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : '';
};

export { fetchApi, fetchUniServerData, fetchJsonp, fetchApiJsonp, param };

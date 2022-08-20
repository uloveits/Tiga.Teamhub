// import { round } from 'lodash';

export function Guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

export function getFromLS<T>(key: string): T | null {
  if (window.localStorage) {
    try {
      return JSON.parse(window.localStorage.getItem(key) || '');
    } catch (e) {
      // Ignore
    }
  }
  return null;
}

export function saveToLS<T>(key: string, value: T | null | undefined) {
  if (window.localStorage) {
    if (value === null || value === undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

export function delFromLS(key: string) {
  window.localStorage.removeItem(key);
}

/** 处理路径 */
export function formatPath(url: string, type: 'window.open' | 'location' | 'history.push' | 'assets'): string {
  if (url.indexOf('/api/Oss/File') >= 0) {
    return url;
  }

  switch (type) {
    case 'window.open': {
      return formatWindowOpenURL(url);
    }
    case 'location': {
      return formatLocationURL(url);
    }
    case 'history.push': {
      return url;
    }
    case 'assets': {
      return formatAssetsURL(url);
    }
    default:
      return url;
  }
}

/** 处理 window.open 路径 */
function formatWindowOpenURL(url: string): string {
  const prefix = '.';
  if (url[0] === '/') {
    return `${prefix}${url}`;
  }
  return url;
}

/** 处理 location 路径 */
function formatLocationURL(url: string): string {
  const prefix = '.';
  if (url[0] === '/') {
    return `${prefix}${url}`;
  }

  return url;
}

/** 处理 assets(图片、字体等) 路径 */
function formatAssetsURL(url: string): string {
  const prefix = '.';
  if (url[0] === '/') {
    console.log('formatAssetsURL url', `${prefix}${url}`);

    return `${prefix}${url}`;
  }
  return url;
}
export function GetRequest(url: string) {
  const theRequest: any = {};
  if (url && url.indexOf('?') !== -1) {
    const urls = url.split('?');
    const str = urls[1] || '';
    // let str = url.substr(1);
    const strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  return theRequest;
}

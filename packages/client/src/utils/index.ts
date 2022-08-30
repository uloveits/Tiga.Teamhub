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

export function handleSameTypeList(list: any[], name: string, resultList: any[] = []): any[] {
  // 每一个类型的单独数组，注意此处不能return出每个sameTypeArr，
  // 因为递归的返回值只返回最后一次的值
  const sameTypeList: any[] = [];
  let propVal = '';

  if (list.length > 0) {
    propVal = list[0][`${name}`];
    const tempList: any[] = [];
    // 将含有相同的name属性值的对象push到此次遍历的list中，
    // 将其他的对象放入到tempList中，下次遍历
    list.forEach((item, key) => {
      if (item[`${name}`] === propVal) {
        sameTypeList.push(item);
      } else {
        tempList.push(item);
      }
    });
    resultList.push(sameTypeList);
    list = tempList;
    return handleSameTypeList(list, name, resultList);
  }

  return resultList;
}

/**
 * 调用时不用把参数补全; getValue(array, key) 一样可以调用
 * @param array 数组
 * @param key 指定的数值
 * @returns {string|string|string}
 */
export function getConstantValue(array: any[], key: string | number, strKey?: string, strValue?: string): string {
  let result = '';
  let _strKey = 'id';
  let _strValue = 'value';
  if (strKey) {
    _strKey = strKey;
  }
  if (strValue) {
    _strValue = strValue;
  }
  if (array) {
    for (const item of array) {
      if (key === item[_strKey]) {
        result = item[_strValue];
      }
    }
  }
  return result;
}

/**
 *
 * @param array
 * @param keys
 * @param index
 * @returns
 */
export function recursiveGrouping(array: any[], keys: string[], by = 'name', index = 0, key: string[] = []) {
  const temp: { id: string; [x: string]: any; children: any[] }[] = [];
  const id: string[] = key;
  if (keys[index]) {
    array.forEach((item) => {
      const data = temp.find((x) => x[by] === item[keys[index]]);

      if (data) {
        data.children.push(item);
      } else {
        const _id = Guid();
        temp.push({
          id: _id,
          [by]: item[keys[index]],
          children: [item],
        });
        id.push(_id);
      }
    });
    index = index + 1;
    temp.forEach((item) => {
      item.children = recursiveGrouping(item.children, keys, by, index, id).data;
    });
  } else {
    return { data: array, id };
  }
  return { data: temp, id };
}

export function getMax(arr: number[]) {
  return Math.max(...arr);
}

export function getMin(arr: number[]) {
  return Math.min(...arr);
}

/**
 * 生成tree
 * @param pid 父id
 */
export function toTree(array: any[], pid: number = -1): any[] {
  const child = array.filter((it) => it.pid === pid);

  return child.map((it: any) => {
    return {
      ...it,
      key: it.id,
      title: it.name,
      children: toTree(array, it.id),
    };
  });
}

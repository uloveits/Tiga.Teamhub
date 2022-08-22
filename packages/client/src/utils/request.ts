/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:42
 * @LastEditTime: 2022-08-22 18:39:07
 */
import { message } from 'antd';
import HttpClient, { http } from 'ronds-react-ui/es/http/index';
import { USER_CACHE_KEY } from '@/UIConfig';
import { getFromLS, config as SystemConfig } from 'ronds-react-ui';

http.interceptors.request.use((request) => {
  if (!request.headers) {
    request.headers = {};
  }
  const userCache = getFromLS(USER_CACHE_KEY) as any;

  if (userCache?.token) {
    SystemConfig.userToken = `Bearer ${userCache.token}`;
    request.headers.Authorization = `Bearer ${userCache.token}`;
  }
  return request;
});

http.interceptors.response.use((response: any) => {
  if (response.data.status === 200 || response.data.status === 201) {
    return {
      data: response.data.data || response.data.errorData,
    };
  }

  message.error(response.data.message);
  if (response.data.code === 401) {
    window.localStorage.removeItem(USER_CACHE_KEY);
    window.sessionStorage.removeItem(USER_CACHE_KEY);
    window.location.href = '#/login';
  }

  return response;
});

export default class baseHttp {
  static HttpClient = HttpClient;
}

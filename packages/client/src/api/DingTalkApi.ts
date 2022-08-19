/*
 * @Author: wangxian
 * @Date: 2021-12-16 19:42:40
 * @LastEditTime: 2021-12-17 17:50:39
 * @LastEditors: Please set LastEditors
 * @FilePath: \Happy.Points.Client\src\api\DingTalkApi.tsx
 */
import baseHttp from '@/utils/request';

const HttpClient = baseHttp.HttpClient;

export default class DingTalkApi {
  /**
   * 发送消息
   * @param input
   */
  static send(data: any) {
    const api = '/api/ding/send';
    return HttpClient.fetch<any>(api, { method: 'post', body: data });
  }

  /**
   * 获取DingHook列表
   * @param input
   */
  static getList(data?: any) {
    let api = '/api/ding/list';

    if (data?.page && data?.size) {
      api = `${api}?page=${data.page}&size=${data.size}`;
    }
    const keyValue = data?.keyValue || '';
    return HttpClient.fetch<any>(api, { method: 'get', params: { keyValue } });
  }

  /**
   * 添加DingHook
   * @param input
   */
  static save(data?: any) {
    const api = '/api/ding/list';
    return HttpClient.fetch<any>(api, { method: 'post', body: data });
  }

  /**
   * 删除DingHook
   * @param input
   */
  static delete(data?: any) {
    const api = '/api/ding/list/del';
    return HttpClient.fetch<any>(api, { method: 'post', body: data });
  }
}

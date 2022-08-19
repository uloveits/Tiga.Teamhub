/*
 * @Author: wangxian
 * @Date: 2022-03-01 09:16:39
 * @LastEditTime: 2022-03-01 09:26:19
 */
import baseHttp from '@/utils/request';

const HttpClient = baseHttp.HttpClient;

export default class DocApi {
  /**
   * 获取Api接口所有的html文件
   * @param input
   */
  static getApiNameList() {
    const api = '/api/doc/html/list';
    return HttpClient.fetch<any>(api, { method: 'get' });
  }
}

/*
 * @Author: wangxian
 * @Date: 2022-03-01 09:16:39
 * @LastEditTime: 2022-08-30 11:50:13
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

  /**
   * 获取文档列表
   * @param input
   */
  static getDocListByType(type: number) {
    const api = `/api/docs/type/${type}`;
    return HttpClient.fetch<any>(api, { method: 'get' });
  }

  /**
   * 获取文档种类
   * @param input
   */
  static getDocTypes() {
    const api = '/api/docs/types';
    return HttpClient.fetch<any>(api, { method: 'get' });
  }

  /**
   * 保存文档
   * @param input
   */
  static saveDocContent(data: any) {
    const api = `/api/docs/content/${data.docId}`;
    return HttpClient.fetch<any>(api, { method: 'post', data });
  }

  /**
   * 获取文档内容
   * @param input
   */
  static getDocContent(id: number) {
    const api = `/api/docs/content/${id}`;
    return HttpClient.fetch<any>(api, { method: 'get' });
  }

  /**
   * 保存文档目录
   * @param input
   */
  static saveDocs(data: any) {
    const api = '/api/docs';
    return HttpClient.fetch<any>(api, { method: 'post', data });
  }
}

/*
 * @Author: wangxian
 * @Date: 2022-03-01 09:16:39
 * @LastEditTime: 2022-08-30 18:53:47
 */
import baseHttp from '@/utils/request';

const HttpClient = baseHttp.HttpClient;

export default class BooksApi {
  /**
   * 上传
   * @param input
   */
  static upload(file: any) {
    const api = '/api/files/upload';

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
      formData.append('name', file.name);
    }

    return HttpClient.fetch<any>(api, {
      method: 'post',
      body: formData,
    });
  }
}

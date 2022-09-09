/*
 * @Author: wangxian
 * @Date: 2022-03-01 09:16:39
 * @LastEditTime: 2022-09-07 10:03:07
 */
import baseHttp from '@/utils/request';

const HttpClient = baseHttp.HttpClient;

export default class BooksApi {
  /**
   * 上传
   * @param input
   */
  static add(data: any) {
    const api = '/api/books/add';

    const formData = new FormData();

    if (data) {
      formData.append('file', data?.file?.file?.originFileObj);
      formData.append('name', data.name);
      formData.append('sort', data.sort);
      formData.append('tags', data.tags.toString());
    }

    return HttpClient.fetch<any>(api, {
      method: 'post',
      body: formData,
    });
  }

  /**
   * 获取所有图书
   * @param input
   */
  static getAllBook() {
    const api = '/api/books/list';

    return HttpClient.fetch<any>(api, {
      method: 'post',
    });
  }
}

import baseHttp from '@/utils/request';

const HttpClient = baseHttp.HttpClient;

export default class PointsRuleApi {
  /**
   * 获取积分规则列表
   * @param input
   */
  static getList(data?: any) {
    let api = '/api/points/list';

    if (data?.page && data?.size) {
      api = `${api}?page=${data.page}&size=${data.size}`;
    }
    const keyValue = data.keyValue;
    return HttpClient.fetch<any>(api, { method: 'get', params: { keyValue } });
  }

  /**
   * 保存积分规则列表
   * @param input
   */
  static save(data: any) {
    const api = '/api/points/list';
    return HttpClient.fetch<any>(api, { method: 'post', body: data });
  }

  /**
   * 删除积分规则
   * @param input
   */
  static delete(data: string[]) {
    const api = '/api/points/list/del';
    return HttpClient.fetch<any>(api, { method: 'post', body: data });
  }

  /**
   * 获取积分规则种类
   * @param input
   */
  static getTags() {
    const api = '/api/points/tags';
    return HttpClient.fetch<any>(api, { method: 'get' });
  }
}

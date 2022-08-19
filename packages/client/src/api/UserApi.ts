import baseHttp from '@/utils/request';

const HttpClient = baseHttp.HttpClient;

export default class UserApi {
  /**
   * 登录
   * @param data
   */
  static login(data: any) {
    const api = '/api/user/login';
    return HttpClient.fetch<any>(api, { method: 'post', data });
  }

  /**
   * 获取用户列表
   * @param input
   */
  static getList(data?: any) {
    let api = '/api/user/list';

    if (data?.page && data?.size) {
      api = `${api}?page=${data.page}&size=${data.size}`;
    }
    const keyValue = data.keyValue;
    return HttpClient.fetch<any>(api, { method: 'get', params: { keyValue } });
  }

  /**
   * 保存用户列表
   * @param input
   */
  static save(data: any) {
    const api = '/api/user/list';
    return HttpClient.fetch<any>(api, { method: 'post', body: data });
  }

  /**
   * 删除用户
   * @param input
   */
  static delete(data: string[]) {
    const api = '/api/user/list/del';
    return HttpClient.fetch<any>(api, { method: 'post', body: data });
  }

  /**
   * 保存积分
   * @param input
   */
  static savePoints(data: any) {
    const api = '/api/user/points';
    return HttpClient.fetch<any>(api, { method: 'post', body: data });
  }

  /**
   * 获取积分列表
   * @param input
   */
  static getPointsList(data?: any) {
    let api = '/api/user/points/list';
    if (data?.page && data?.size) {
      api = `${api}?page=${data.page}&size=${data.size}`;
    }
    const keyName = data.keyName;
    const keyTags = data.keyTags;
    return HttpClient.fetch<any>(api, { method: 'get', params: { keyName, keyTags } });
  }

  /**
   * 获取积分列表
   * @param input
   */
  static getPointsSummaryList(data?: any) {
    let api = '/api/user/points/summary/list';
    if (data?.page && data?.size) {
      api = `${api}?page=${data.page}&size=${data.size}`;
    }
    const keyName = data.keyName;
    const keyTags = data.keyTags;
    return HttpClient.fetch<any>(api, { method: 'get', params: { keyName, keyTags } });
  }

  /**
   * 获取用户积分所的姓名，type和分数，并进行排序
   * @param input
   */
  static getPointsListCharts() {
    const api = '/api/user/points/list/charts';
    return HttpClient.fetch<any>(api, { method: 'get' });
  }

  /**
   * 获取用户的所有积分总数
   * @param input
   */
  static getPointsCountChart(data?: any) {
    const api = '/api/user/points/count/charts';
    return HttpClient.fetch<any>(api, { method: 'get' });
  }
}

import baseHttp from '@/utils/request';

const HttpClient = baseHttp.HttpClient;

export default class MeetingApi {
  /**
   * 获取会议列表
   * @param input
   */
  static getList(data?: any) {
    let api = '/api/meeting/list';

    if (data?.page && data?.size) {
      api = `${api}?page=${data.page}&size=${data.size}`;
    }
    const keyValue = data.keyValue;
    return HttpClient.fetch<any>(api, { method: 'get', params: { keyValue } });
  }

  /**
   * 添加会议
   * @param input
   */
  static save(data?: any) {
    const api = '/api/meeting/list';
    return HttpClient.fetch<any>(api, { method: 'post', body: data });
  }

  /**
   * 删除会议
   * @param input
   */
  static delete(data?: any) {
    const api = '/api/meeting/list/del';
    return HttpClient.fetch<any>(api, { method: 'post', body: data });
  }

  /**
   * 获取会议记录
   * @param input
   */
  static getRecordList(data?: any) {
    const api = '/api/meeting/record';
    return HttpClient.fetch<any>(api, { method: 'get', params: { data } });
  }

  /**
   * 添加会议记录
   * @param input
   */
  static addRecord(data?: any) {
    const api = '/api/meeting/add/record';
    return HttpClient.fetch<any>(api, { method: 'post', body: data });
  }
}

/*
 * @Author: wangxian
 * @Date: 2022-03-01 09:16:39
 * @LastEditTime: 2022-09-01 15:35:07
 */

import httpClient from "@/utils/request";

export default class SiteApi {
  /**
   * 获取文档列表
   * @param input
   */
  static getDocListByType(type: number) {
    const api = `/api/docs/type/${type}`;
    return httpClient.get(api);
  }
  /**
   * 获取文档内容
   * @param input
   */
  static getDocContent(id: number) {
    const api = `/api/docs/content/${id}`;
    return httpClient.get(api);
  }
}

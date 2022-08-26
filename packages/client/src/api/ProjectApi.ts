/*
 * @Author: wangxian
 * @Date: 2022-03-01 09:16:39
 * @LastEditTime: 2022-08-25 17:57:59
 */
import baseHttp from '@/utils/request';

const HttpClient = baseHttp.HttpClient;

export default class ProjectApi {
  /**
   *  获取当前用户项目列表
   * @returns
   */
  static getMyProjectList() {
    const api = '/api/project/list';
    return HttpClient.fetch<any>(api, { method: 'get' });
  }

  /**
   *  创建项目
   * @returns
   */
  static saveProject(data: any) {
    const api = '/api/project';
    return HttpClient.fetch<any>(api, { method: 'post', data });
  }

  /**
   *  获取当前用户项目列表
   * @returns
   */
  static getMyProjectTaskList(data: any) {
    const api = '/api/project/task/{projectId}/list'.replace('{projectId}', data.projectId);
    return HttpClient.fetch<any>(api, { method: 'post', data });
  }

  /**
   *  获取当前项目成员列表
   * @returns
   */
  static getProjectMemberList(id: number) {
    const api = '/api/project/{id}/member/list'.replace('{id}', id.toString());
    return HttpClient.fetch<any>(api, { method: 'get' });
  }

  /**
   *  创建任务
   * @returns
   */
  static saveProjectTask(data: any) {
    const api = '/api/project/task/{projectId}'.replace('{projectId}', data.projectId);
    return HttpClient.fetch<any>(api, { method: 'post', data });
  }

  /**
   *  获取任务详情任务
   * @returns
   */
  static getProjectTaskInfo(id: number) {
    const api = '/api/project/task/{id}'.replace('{id}', id.toString());
    return HttpClient.fetch<any>(api, { method: 'get' });
  }

  /**
   *  获取子任务列表
   * @returns
   */
  static getSubtTaskList(id: number) {
    const api = '/api/project/task/sub/{id}/list'.replace('{id}', id.toString());
    return HttpClient.fetch<any>(api, { method: 'get' });
  }

  /**
   *  获取子任务列表
   * @returns
   */
  static saveTaskDes(data: any) {
    const api = '/api/project/task/{id}/des'.replace('{id}', data.taskId);
    return HttpClient.fetch<any>(api, { method: 'post', data });
  }
}

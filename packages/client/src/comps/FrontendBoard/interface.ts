/*
 * @Author: wangxian
 * @Date: 2022-08-20 11:16:25
 * @LastEditTime: 2022-08-23 09:07:58
 */
export namespace FBoard {
  export interface Card {
    id: string | number;
    pid: string | number;
    name: string;
    startTime: string;
    endTime: string;
    assignee: string;
    completeRate: number;
  }

  export interface Lanes {
    id: string | number;
    title: string;
    cards: Card[] | any[];
  }
}

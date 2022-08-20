/*
 * @Author: wangxian
 * @Date: 2022-08-20 11:16:25
 * @LastEditTime: 2022-08-20 13:36:35
 */
export namespace FBoard {
  export interface Card {
    id: string | number;
    pid: string | number;
    title: string;
    startTime: string;
    endTime: string;
    assignee: { id: number; username: string; color: string }[];
    completRate: number;
  }

  export interface Lanes {
    id: string | number;
    title: string;
    label: string;
    cards: Card[];
  }
}

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

const LANES_TYPE = [
  { key: 1, value: '开放任务' },
  { key: 2, value: '计划中' },
  { key: 3, value: '进行中' },
  { key: 4, value: '待检查' },
  { key: 5, value: '已归档' },
];

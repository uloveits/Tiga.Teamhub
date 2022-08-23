/*
 * @Author: wangxian
 * @Date: 2021-11-26 19:05:30
 * @LastEditTime: 2022-08-23 08:30:15
 */
const MENUS = [
  { title: '首页', path: 'home', icon: 'dashboard', hidden: false, comp: 'home', children: [] },
  {
    title: '项目管理',
    path: 'project',
    icon: 'task',
    hidden: false,
    children: [
      { title: '项目列表', path: 'project/list', hidden: false, comp: 'project/list', children: [] },
      { title: '项目详情', path: 'project/detail', hidden: true, comp: 'project/detail', children: [] },
    ],
  },
  {
    title: '文档管理',
    path: 'wiki',
    icon: 'md',
    hidden: false,
    children: [
      { title: '接口文档', path: 'wiki/api', hidden: false, comp: 'wiki/api', children: [] },
      { title: '需求文档', path: 'wiki/demand', hidden: false, comp: 'wiki/demand', children: [] },
      { title: '知识分享', path: 'wiki/knowledge', hidden: false, comp: 'wiki/knowledge', children: [] },
    ],
  },
  {
    title: '图书馆',
    path: 'books',
    icon: 'books',
    hidden: false,
    comp: 'books',
    children: [],
  },
];

export default MENUS;

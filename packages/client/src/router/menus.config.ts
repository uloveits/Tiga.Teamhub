/*
 * @Author: wangxian
 * @Date: 2021-11-26 19:05:30
 * @LastEditTime: 2022-08-30 09:52:49
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
      { title: '文档中心', path: 'wiki', hidden: false, comp: 'wiki', children: [] },
      { title: '文档详情', path: 'wiki/detail', hidden: true, comp: 'wiki/detail', children: [] },
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

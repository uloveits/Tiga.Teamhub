/*
 * @Author: wangxian
 * @Date: 2021-11-26 19:05:30
 * @LastEditTime: 2022-08-19 16:41:32
 */
const MENUS = [
  { title: '首页', path: 'home', icon: 'dashboard', hidden: false, comp: 'home', children: [] },
  {
    title: '项目管理',
    path: 'project',
    icon: 'module',
    hidden: false,
    children: [{ title: '项目列表', path: 'project/list', hidden: false, comp: 'project/list', children: [] }],
  },
  {
    title: '文档管理',
    path: 'wiki',
    icon: 'md',
    hidden: false,
    children: [{ title: '接口文档', path: 'wiki/api', hidden: false, comp: 'wiki/api', children: [] }],
  },
];

export default MENUS;

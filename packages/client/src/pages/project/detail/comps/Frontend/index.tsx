/*
 * @Author: wangxian
 * @Date: 2022-08-20 09:46:19
 * @LastEditTime: 2022-08-20 12:10:34
 */
import FrontendBoard from '@/comps/FrontendBoard';
import './index.less';

const ProjectFrontend = () => {
  const data = {
    lanes: [
      {
        id: 'lane1',
        title: '开放任务',
        label: '2/2',
        cards: [
          {
            id: 'Card1',
            pid: 'lane1',
            title: '无趋势节点标签数据回显',
            startTime: '2022/08/12',
            endTime: '2022/08/20',
            assignee: [
              { id: 1, username: '王宪', color: '#51f298' },
              { id: 2, username: '胡飞', color: '#ebb73b' },
            ],
            completRate: 100,
          },
          {
            id: 'Card2',
            pid: 'lane1',
            title: '标注任务自定义属性',
            startTime: '2022/08/12',
            endTime: '2022/08/20',
            assignee: [{ id: 1, username: '王宪', color: '#51f298' }],
            completRate: 0,
          },
        ],
      },
      {
        id: 'lane2',
        title: '计划中',
        label: '0/0',
        cards: [],
      },
      {
        id: 'lane3',
        title: '正在进行',
        label: '0/0',
        cards: [],
      },
      {
        id: 'lane4',
        title: '待检查',
        label: '0/0',
        cards: [],
      },
      {
        id: 'lane5',
        title: '已归档',
        label: '0/0',
        cards: [],
      },
    ],
  };

  return (
    <>
      <FrontendBoard data={data} />
    </>
  );
};

export default ProjectFrontend;

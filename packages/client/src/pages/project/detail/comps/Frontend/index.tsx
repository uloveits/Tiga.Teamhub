/*
 * @Author: wangxian
 * @Date: 2022-08-20 09:46:19
 * @LastEditTime: 2022-08-20 13:50:40
 */
import ProjectApi from '@/api/ProjectApi';
import FrontendBoard from '@/comps/FrontendBoard';
import React from 'react';

interface IProjectFrontendProps {
  projectId: number;
}

const ProjectFrontend = (props: IProjectFrontendProps) => {
  const { projectId } = props;
  const data = {
    lanes: [
      {
        id: 'lane1',
        title: '开放任务',
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
        cards: [],
      },
      {
        id: 'lane3',
        title: '正在进行',
        cards: [],
      },
      {
        id: 'lane4',
        title: '待检查',
        cards: [],
      },
      {
        id: 'lane5',
        title: '已归档',
        cards: [],
      },
    ],
  };

  const [list, setList] = React.useState<any[]>([]);

  const processListData2Board = React.useCallback((_data: any[]) => {
    setList([..._data]);
  }, []);

  const getTaskList = React.useCallback(async () => {
    const param = { projectId };

    const res = await ProjectApi.getMyProjectTaskList(param);
    if (res.successed) {
      processListData2Board(res.data);
    }
  }, [projectId]);

  React.useEffect(() => {
    getTaskList();
  }, [projectId, getTaskList]);

  console.log(list);

  const onAddCard = (laneId: string | number) => {
    console.log('onAddCard', laneId);
  };

  const onCardClick = (id: string | number) => {
    console.log('onCardClick', id);
  };

  const onDataChange = (_data: any) => {
    console.log('onDataChange', _data);
  };

  const onCardMoveAcrossLanes = (_data: any) => {
    console.log('onCardMoveAcrossLanes', _data);
  };

  const handleDragEnd = (_data: any) => {
    console.log('handleDragEnd', _data);
  };
  return (
    <>
      <FrontendBoard
        data={data}
        onAddCard={onAddCard}
        onCardClick={onCardClick}
        handleDragEnd={handleDragEnd}
        onCardMoveAcrossLanes={onCardMoveAcrossLanes}
        onDataChange={onDataChange}
      />
    </>
  );
};

export default ProjectFrontend;

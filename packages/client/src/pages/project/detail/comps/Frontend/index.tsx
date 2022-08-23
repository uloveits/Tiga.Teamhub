/*
 * @Author: wangxian
 * @Date: 2022-08-20 09:46:19
 * @LastEditTime: 2022-08-23 09:17:34
 */
import ProjectApi from '@/api/ProjectApi';
import FrontendBoard from '@/comps/FrontendBoard';
import { handleSameTypeList } from '@/utils';
import { LANES_DATA } from '@/comps/FrontendBoard/constants';
import React from 'react';
import { FBoard } from '@/comps/FrontendBoard/interface';

interface IProjectFrontendProps {
  projectId: number;
}

const ProjectFrontend = (props: IProjectFrontendProps) => {
  const { projectId } = props;

  const [list, setList] = React.useState<any[]>([]);

  const processListData2Board = React.useCallback((values: any[]) => {
    const lanesData: FBoard.Lanes[] = LANES_DATA;
    if (values.length > 0) {
      const _data = handleSameTypeList(values, 'workflow', []);

      for (let i = 0; i < _data.length; i++) {
        const idx = lanesData.findIndex((it) => it.id === _data[i][0].workflow);
        lanesData[idx].cards = _data[i];
      }
    }

    setList([...lanesData]);
  }, []);

  const getTaskList = React.useCallback(async () => {
    const param = { projectId };

    const res = await ProjectApi.getMyProjectTaskList(param);
    if (res.successed) {
      processListData2Board(res.data);
    }
  }, [projectId, processListData2Board]);

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
        data={{ lanes: list }}
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

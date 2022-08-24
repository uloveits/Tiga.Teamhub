/*
 * @Author: wangxian
 * @Date: 2022-08-20 09:46:19
 * @LastEditTime: 2022-08-24 10:12:45
 */
import ProjectApi from '@/api/ProjectApi';
import GanttChart from '@/comps/Charts/GanttChart';
import React from 'react';
import { Task } from 'gantt-task-react';
import { getMax, getMin, handleSameTypeList } from '@/utils';
import moment from 'moment';

interface IProjectGanttProps {
  projectId: number;
}
const ProjectGantt = (props: IProjectGanttProps) => {
  const { projectId } = props;
  console.log(projectId);

  const [list, setList] = React.useState<Task[]>([]);

  const processListData2Gantt = React.useCallback((values: any[]) => {
    const _list = [];
    console.log('_list', values);
    const _data = handleSameTypeList(values, 'classification', []);
    for (let i = 0; i < _data.length; i++) {
      const _start = getMin(
        _data[i].map((it: any) => {
          return moment(it.startTime).valueOf();
        })
      );
      const _end = getMax(
        _data[i].map((it: any) => {
          return moment(it.endTime).valueOf();
        })
      );

      const obj: Task = {
        id: _data[i][0].classification,
        name: _data[i][0].classification,
        progress: 0,
        type: 'project',
        start: new Date(_start),
        end: new Date(_end),
        hideChildren: false,
      };
      _list.push(obj);
      for (let j = 0; j < _data[i].length; j++) {
        const obj2: Task = {
          id: _data[i][j].id,
          name: _data[i][j].name,
          progress: _data[i][j].completeRate,
          type: 'task',
          start: new Date(_data[i][j].startTime),
          end: new Date(_data[i][j].endTime),
          project: _data[i][j].classification,
        };

        _list.push(obj2);
      }
    }

    setList([..._list]);
  }, []);

  const getTaskList = React.useCallback(async () => {
    const param = { projectId };

    const res = await ProjectApi.getMyProjectTaskList(param);
    if (res.successed) {
      processListData2Gantt(res.data);
    }
  }, [projectId, processListData2Gantt]);

  React.useEffect(() => {
    getTaskList();
  }, [projectId, getTaskList]);

  return (
    <>
      <GanttChart tasks={list} />
    </>
  );
};

export default ProjectGantt;

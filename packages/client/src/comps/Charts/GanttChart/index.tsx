/*
 * @Author: wangxian
 * @Date: 2022-08-23 17:43:10
 * @LastEditTime: 2022-08-23 19:40:22
 */

import React from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { ViewSwitcher } from './comps/ViewSwitcher';

interface IGanttChartProps {
  // tasks?: any[];
  // viewMode?: any;
  // onClick?: (data: any) => void;
  // onDateChange?: (data: any) => void;
  // onProgressChange?: (data: any) => void;
  // onViewChange?: (data: any) => void;
  // customPopupHtml?: (data: any) => void;
}

const GanttChart = (props: IGanttChartProps) => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);

  const currentDate = new Date();

  const tasks: Task[] = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: 'Some Project',
      id: 'ProjectSample',
      progress: 25,
      type: 'project',
      hideChildren: false,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2, 12, 28),
      name: 'Idea',
      id: 'Task 0',
      progress: 120,
      type: 'task',
      project: 'ProjectSample',
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: 'Research',
      id: 'Task 1',
      progress: 25,
      dependencies: ['Task 0'],
      type: 'task',
      project: 'ProjectSample',
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: 'Discussion with team',
      id: 'Task 2',
      progress: 10,
      dependencies: ['Task 1'],
      type: 'task',
      project: 'ProjectSample',
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: 'Developing',
      id: 'Task 3',
      progress: 2,
      dependencies: ['Task 2'],
      type: 'task',
      project: 'ProjectSample',
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: 'Review',
      id: 'Task 4',
      type: 'task',
      progress: 70,
      dependencies: ['Task 2'],
      project: 'ProjectSample',
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: 'Release',
      id: 'Task 6',
      progress: currentDate.getMonth(),
      type: 'milestone',
      dependencies: ['Task 4'],
      project: 'ProjectSample',
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: 'Party Time',
      id: 'Task 9',
      progress: 0,
      isDisabled: true,
      type: 'task',
    },
  ];
  return (
    <>
      <ViewSwitcher onViewModeChange={(viewMode: ViewMode) => setView(viewMode)} onViewListChange={(data: any) => {}} isChecked={true} />
      <Gantt tasks={tasks} viewMode={view} locale="zh-cn" ganttHeight={200} columnWidth={60} />
    </>
  );
};

export default GanttChart;

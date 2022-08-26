/*
 * @Author: wangxian
 * @Date: 2022-08-23 17:43:10
 * @LastEditTime: 2022-08-25 08:10:07
 */

import React from 'react';
import { Spin } from 'antd';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { ViewSwitcher } from './comps/ViewSwitcher';

interface IGanttChartProps {
  tasks: Task[];
  // viewMode?: any;
  // onClick?: (data: any) => void;
  // onDateChange?: (data: any) => void;
  // onProgressChange?: (data: any) => void;
  // onViewChange?: (data: any) => void;
  // customPopupHtml?: (data: any) => void;
}

const GanttChart = (props: IGanttChartProps) => {
  const { tasks } = props;
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [isChecked, setIsChecked] = React.useState<boolean>(true);

  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 200;
  } else if (view === ViewMode.Year) {
    columnWidth = 450;
  }

  if (tasks.length === 0) return <Spin />;

  return (
    <>
      <ViewSwitcher
        viewMode={view}
        onViewModeChange={(viewMode: ViewMode) => setView(viewMode)}
        onViewListChange={(b: boolean) => {
          setIsChecked(b);
        }}
        isChecked={isChecked}
      />
      <div key={columnWidth} style={{ width: '100%', height: 'calc(100% - 40px)' }}>
        <Gantt tasks={tasks} viewMode={view} locale="zh-CN" columnWidth={columnWidth} listCellWidth={isChecked ? '155px' : ''} />
      </div>
    </>
  );
};

export default GanttChart;

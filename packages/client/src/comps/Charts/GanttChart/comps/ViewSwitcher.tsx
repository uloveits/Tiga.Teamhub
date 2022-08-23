/*
 * @Author: wangxian
 * @Date: 2022-08-23 19:19:29
 * @LastEditTime: 2022-08-23 19:34:37
 */
import React from 'react';
import 'gantt-task-react/dist/index.css';
import { ViewMode } from 'gantt-task-react';
import { Button } from 'antd';

type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export const ViewSwitcher: React.SFC<ViewSwitcherProps> = ({ onViewModeChange, onViewListChange, isChecked }) => {
  return (
    <div className="ViewContainer flex items-center pb-2">
      <Button className="Button" onClick={() => onViewModeChange(ViewMode.Day)}>
        按天查看
      </Button>
      <Button className="Button" onClick={() => onViewModeChange(ViewMode.Week)}>
        按周查看
      </Button>
      <Button className="Button" onClick={() => onViewModeChange(ViewMode.Month)}>
        按月查看
      </Button>
      <Button className="Button" onClick={() => onViewModeChange(ViewMode.Year)}>
        按年查看
      </Button>
      <div className="Switch">
        <label className="Switch_Toggle">
          <input type="checkbox" defaultChecked={isChecked} onClick={() => onViewListChange(!isChecked)} />
          <span className="Slider" />
        </label>
        显示任务列表
      </div>
    </div>
  );
};

/*
 * @Author: wangxian
 * @Date: 2022-08-23 19:19:29
 * @LastEditTime: 2022-08-24 11:10:27
 */
import React from 'react';
import 'gantt-task-react/dist/index.css';
import { ViewMode } from 'gantt-task-react';
import { Button, Checkbox, Popover } from 'antd';
import { getConstantValue } from '@/utils';

type ViewSwitcherProps = {
  viewMode: ViewMode;
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export const ViewSwitcher: React.SFC<ViewSwitcherProps> = ({ viewMode, onViewModeChange, onViewListChange, isChecked }) => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const Mode = [
    { id: ViewMode.Day, value: '天' },
    { id: ViewMode.Week, value: '周' },
    { id: ViewMode.Month, value: '月' },
    { id: ViewMode.Year, value: '年' },
  ];

  const modeContent = (
    <>
      {Mode.map((it) => (
        <Button
          key={it.id}
          onClick={() => {
            onViewModeChange(it.id);
            setVisible(false);
          }}
        >
          {it.value}
        </Button>
      ))}
    </>
  );

  const onVisibleChange = (b: boolean) => {
    setVisible(b);
  };

  const onCheckboxChange = (e: any) => {
    console.log(e.target.checked);
    onViewListChange(e.target.checked);
  };

  return (
    <div className="ViewContainer flex flex-row-reverse items-center pb-2">
      <Popover placement="bottom" content={modeContent} trigger="click" visible={visible} onVisibleChange={onVisibleChange}>
        <Button style={{ marginLeft: '10px' }} type="dashed">
          {`按${getConstantValue(Mode, viewMode)}查看`}
        </Button>
      </Popover>
      <Checkbox checked={isChecked} onChange={onCheckboxChange}>
        展示任务列表
      </Checkbox>
    </div>
  );
};

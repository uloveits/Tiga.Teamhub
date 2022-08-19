import React from 'react';
import { Menu } from 'antd';
import './index.less';

export interface IMenuGroupProps {
  groups?: string[];
  mode?: 'vertical' | 'horizontal' | 'inline' | undefined;
  defaultKey?: string;
  onMenuItemClick?: (groupName: string) => void;
}

export default function Group(props: IMenuGroupProps) {
  const { groups, mode = 'inline', defaultKey, onMenuItemClick } = props;

  const onItemClick = (param: any) => {
    onMenuItemClick && onMenuItemClick(param.key.toString());
  };
  // 如果没有分组
  if (groups === null || groups === undefined || groups.length === 0) {
    return <></>;
  }

  return (
    <Menu
      className={`ant-${mode}-panel-menu`}
      style={{ height: '100%' }}
      onClick={onItemClick}
      defaultSelectedKeys={[defaultKey || groups[0]]}
      mode={mode}
    >
      {groups.map((g) => (
        <Menu.Item key={g}>
          <span>{g}</span>
        </Menu.Item>
      ))}
    </Menu>
  );
}

import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import React from 'react';
import './index.less';

const { TabPane } = Tabs;

export interface ITabs {
  key: string;
  label: string;
  closable?: boolean;
  content: React.ReactNode;
}
interface ICommonTabsProps {
  name?: string;
  curTab?: string;
  tabs: ITabs[];
  onTabChange?: (data: string) => void;
  onRemoveTab?: (targetKey: string) => void;
  onMaxChange?: (b: boolean) => void;
}

const CommonTabs = (props: ICommonTabsProps) => {
  const { name, curTab, tabs, onTabChange, onRemoveTab, onMaxChange } = props;

  const [isMaxSize, setIsMaxSize] = React.useState<boolean>(false);

  // 编辑
  const onEdit = (targetKey: any, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey);
    }
  };

  // 移除tab
  const remove = (targetKey: string) => {
    onRemoveTab && onRemoveTab(targetKey);
  };

  console.log('===================', tabs);

  return (
    <div className="w-full h-full relative">
      <div style={{ position: 'absolute', right: 0, zIndex: 9999 }}>
        {onMaxChange && isMaxSize && (
          <Button
            type="link"
            icon={<DownOutlined />}
            onClick={() => {
              setIsMaxSize(false);
              onMaxChange(false);
            }}
          />
        )}
        {onMaxChange && !isMaxSize && (
          <Button
            type="link"
            icon={<UpOutlined />}
            onClick={() => {
              setIsMaxSize(true);
              onMaxChange(true);
            }}
          />
        )}
      </div>
      <Tabs
        hideAdd
        className="h-full common-tabs"
        tabBarStyle={{ borderBottom: '1px solid var(--card-line)', lineHeight: '30px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.08)' }}
        activeKey={curTab}
        type="editable-card"
        onChange={onTabChange}
        onEdit={onEdit}
        tabBarExtraContent={name ? { left: <div className="font-bold text-2xl pl-6 pr-6">{name}</div> } : ''}
      >
        {tabs.map((it) => (
          <TabPane className="h-full" tab={it.label} key={it.key} closable={it.closable || false}>
            {it.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default CommonTabs;

/*
 * @Author: wangxian
 * @Date: 2022-01-06 19:17:59
 * @LastEditTime: 2022-08-20 09:28:54
 */

import React from 'react';
import ErrorBoundary from '@/comps/ErrorBoundary';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Spin, Tabs } from 'antd';
import './index.less';

const { TabPane } = Tabs;

export interface ITabs {
  key: string;
  label: string;
  disabled?: boolean;
  closable?: boolean;
  content: React.ReactNode;
}
interface ICommonTabsProps {
  name?: string;
  curTab?: string;
  tabs: ITabs[];
  tabBarStyle?: React.CSSProperties;
  onTabChange?: (data: string) => void;
  onRemoveTab?: (targetKey: string) => void;
  onMaxChange?: (b: boolean) => void;
  onTitleClick?: () => void;
}

const CommonTabs = (props: ICommonTabsProps) => {
  const { name, curTab, tabs, tabBarStyle, onTabChange, onRemoveTab, onMaxChange, onTitleClick } = props;

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

  const onMyTabChange = (value: string) => {
    onTabChange && onTabChange(value);
  };

  return (
    <div className="w-full h-full relative">
      <div style={{ position: 'absolute', right: 0, zIndex: 1000 }}>
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
        className="h-full common-tabs"
        tabBarStyle={{ borderBottom: '1px solid var(--card-line)', lineHeight: '30px', boxShadow: '0 0px 5px rgba(0, 0, 0, 0.1)', ...tabBarStyle }}
        activeKey={curTab}
        type="editable-card"
        hideAdd={true}
        onChange={onMyTabChange}
        onEdit={onEdit}
        tabBarExtraContent={
          name ? (
            {
              left: (
                <div role="button" onClick={onTitleClick} className=" text-lg pl-6 pr-6 cursor-pointer">
                  {name}
                </div>
              ),
            }
          ) : (
            <div style={{ width: '10px' }} />
          )
        }
      >
        {tabs.map((it) => (
          <TabPane className="h-full" tab={it.label} key={it.key} closable={it.closable || false}>
            <ErrorBoundary>
              <React.Suspense fallback={<Spin />}>{it.content}</React.Suspense>
            </ErrorBoundary>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default CommonTabs;

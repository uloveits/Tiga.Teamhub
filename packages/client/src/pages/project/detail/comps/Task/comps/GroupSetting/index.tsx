/*
 * @Author: wangxian
 * @Date: 2022-08-15 14:15:32
 * @LastEditTime: 2022-08-23 15:32:31
 */

import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import React from 'react';
import './index.less';

interface IGroupSettingProps {
  groupBy: any[];
  onFinish?: (data: any[]) => void;
}

const GroupSetting = (props: IGroupSettingProps) => {
  const { groupBy, onFinish } = props;
  console.log('GroupSetting===', groupBy);

  const [groupOpts, setGroupOpts] = React.useState<{ label: string; value: string }[]>([]);
  const [groupList, setGroupList] = React.useState<{ name: string; order: string }[]>([{ name: '', order: 'ASC' }]);
  const groupListRef = React.useRef<{ name: string; order: string }[]>([{ name: '', order: 'ASC' }]);

  React.useEffect(() => {
    setGroupOpts([...groupBy]);
  }, [groupBy]);

  const ORDER_TYPE = [
    { label: tr('选项正序'), value: 'ASC' },
    { label: tr('选项倒序'), value: 'DESC' },
  ];

  const onAdd = () => {
    const _groupList = groupListRef.current;
    _groupList.push({ name: '', order: 'ASC' });
    setGroupList([..._groupList]);
    groupListRef.current = _groupList;
  };

  const onRemove = (idx: number) => {
    const _groupList = groupListRef.current;
    _groupList.splice(idx, 1);
    setGroupList([..._groupList]);
    groupListRef.current = _groupList;
  };

  const onSelectOrder = (idx: number, value: string) => {
    const _groupList = groupListRef.current;
    _groupList[idx].order = _groupList[idx].order === value ? '' : value;
    setGroupList([..._groupList]);
    groupListRef.current = _groupList;
  };

  const onSelectChange = (value: string, idx: number) => {
    const _groupList = groupListRef.current;
    _groupList[idx].name = value;
    setGroupList([..._groupList]);
    groupListRef.current = _groupList;
  };

  const onSubmit = () => {
    console.log(groupListRef.current);
    onFinish && onFinish(groupListRef.current);
  };
  return (
    <>
      {groupList.map((it: any, idx: number) => (
        <div className="group-setting flex items-center mb-2" key={it.name}>
          <Select
            key={it.name}
            value={it.name}
            style={{ width: '120px' }}
            allowClear
            placeholder={tr('选择分组方式')}
            onChange={(value: string) => {
              onSelectChange(value, idx);
            }}
            showSearch
            filterOption={(input: string, option: any) => {
              console.log(input, option);
              return option?.children?.toString().indexOf(input) >= 0;
            }}
          >
            {groupOpts.map((opt) => (
              <Select.Option key={opt.value} value={opt.value} disabled={groupList.findIndex((g) => g.name === opt.value) !== -1}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
          <div className="flex ml-2 rounded-sm" style={{ background: 'var(--color-border-2)', lineHeight: '22px' }}>
            {ORDER_TYPE.map((order) => (
              <div
                key={order.value}
                className={`${it.order === order.value ? 'group-setting-selected' : ''} p-1 cursor-pointer`}
                onClick={() => {
                  onSelectOrder(idx, order.value);
                }}
                role="button"
              >
                {order.label}
              </div>
            ))}
          </div>
          <div className="ml-2">
            {idx === groupList.length - 1 && <PlusCircleOutlined onClick={onAdd} className="mr-2" />}
            {groupList.length !== 1 && (
              <MinusCircleOutlined
                onClick={() => {
                  onRemove(idx);
                }}
              />
            )}
          </div>
        </div>
      ))}
      <div className="mt-3 flex">
        <Button type="primary" block onClick={onSubmit}>
          {'确认'}
        </Button>
      </div>
    </>
  );
};

export default GroupSetting;

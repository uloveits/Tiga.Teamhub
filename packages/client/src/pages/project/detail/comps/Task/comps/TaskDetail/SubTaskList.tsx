/*
 * @Author: wangxian
 * @Date: 2022-08-25 15:47:04
 * @LastEditTime: 2022-08-25 16:59:21
 */

import { Avatar, Checkbox, Empty } from 'antd';

interface ISubTaskListProps {
  list: any[];
}
const SubTaskList = (props: ISubTaskListProps) => {
  const { list } = props;

  return (
    <>
      {list.map((it) => (
        <div
          key={it.id}
          className="drop-shadow-sm rounded p-2 mb-2 flex gap-4 items-center cursor-pointer"
          style={{ background: '#fff', border: '1px solid #E5E6EB' }}
        >
          <Checkbox checked={it.workflow === 5} />
          <div className="flex-1">{it.name}</div>
          <div className="flex">
            {it.assignee &&
              it.assignee.split(',').map((user: any, idx: number) => (
                <div className="pr-2" key={user}>
                  <Avatar className="avatar" style={{ backgroundColor: `${it.assignee_color.split(',')[idx]}`, verticalAlign: 'middle' }}>
                    {user}
                  </Avatar>
                </div>
              ))}
          </div>
          <div className="mr-10">
            <div className="text-gray-900">{tr('权重')}</div>
            <div className="text-gray-500 text-xs">{it.completeRate}</div>
          </div>
          <div className="mr-10">
            <div className="text-gray-900">{tr('开始时间')}</div>
            <div className="text-gray-500 text-xs">{it.startTime}</div>
          </div>
          <div className="mr-10">
            <div className="text-gray-900">{tr('结束时间')}</div>
            <div className="text-gray-500 text-xs">{it.endTime}</div>
          </div>
        </div>
      ))}
      {list.length === 0 && <Empty />}
    </>
  );
};

export default SubTaskList;

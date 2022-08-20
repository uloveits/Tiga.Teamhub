/*
 * @Author: wangxian
 * @Date: 2022-08-20 11:33:47
 * @LastEditTime: 2022-08-20 12:09:27
 */

import { Avatar, Divider } from 'antd';

type IFbCardProps =
  | {
      onCardClick: (id: string | number) => void;
    }
  | any;
const FbCard = (props: IFbCardProps) => {
  console.log('FbCard', props);
  const { id, title, assignee, completRate, endTime, onCardClick } = props;

  return (
    <div
      className="w-full bg-white shadow-inner mb-2 p-2 rounded"
      onClick={() => {
        onCardClick && onCardClick(id);
      }}
      role="button"
    >
      <div className="flex">
        <div className="flex-1 text-sm text-green-900">{title}</div>
        <div className="text-xs text-red-600">{completRate}%</div>
      </div>
      <Divider className="p-0 m-0" />
      <div className="flex items-center">
        <div className="flex flex-1">
          {assignee.map((user: any) => (
            <div key={user.id}>
              <Avatar className="avatar" size="small" style={{ backgroundColor: `${user.color}`, verticalAlign: 'middle' }}>
                {user.username}
              </Avatar>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500">{endTime}</div>
      </div>
    </div>
  );
};
export default FbCard;

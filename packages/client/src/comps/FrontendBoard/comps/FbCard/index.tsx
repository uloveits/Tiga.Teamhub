/*
 * @Author: wangxian
 * @Date: 2022-08-20 11:33:47
 * @LastEditTime: 2022-08-23 13:39:15
 */

import { Avatar, Divider } from 'antd';

type IFbCardProps =
  | {
      onCardClick: (id: string | number) => void;
    }
  | any;
const FbCard = (props: IFbCardProps) => {
  console.log('FbCard', props);
  const { id, name, assignee, assignee_color, completeRate, endTime, onCardClick } = props;

  return (
    <div
      className="w-full bg-white shadow-inner mb-2 p-2 rounded"
      onClick={() => {
        onCardClick && onCardClick(id);
      }}
      role="button"
    >
      <div className="flex">
        <div className="flex-1 text-sm text-green-900">{name}</div>
        <div className="text-xs text-red-600">{completeRate}%</div>
      </div>
      <Divider className="p-0 m-0" />
      <div className="flex items-center">
        <div className="flex flex-1">
          {assignee &&
            assignee.split(',').map((user: any, idx: number) => (
              <div key={user}>
                <Avatar className="avatar" size="small" style={{ backgroundColor: `${assignee_color.split(',')[idx]}`, verticalAlign: 'middle' }}>
                  {user}
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

/*
 * @Author: wangxian
 * @Date: 2022-08-19 18:51:17
 * @LastEditTime: 2022-08-20 11:46:24
 */

import { Avatar, Empty } from 'antd';

interface IProjectCardListProps {
  list: any[];
}
const ProjectCardList = (props: IProjectCardListProps) => {
  const { list } = props;
  return (
    <>
      <div className="w-full h-full overflow-y-auto">
        {list.length > 0 ? (
          <>
            {list.map((it) => (
              <div
                key={it.id}
                className="drop-shadow-sm rounded p-2 mb-2 flex gap-4 items-center cursor-pointer"
                style={{ background: '#fff', border: '1px solid #E5E6EB' }}
                onClick={() => {
                  window.location.href = `/#/project/detail?id=${it.id}&name=${it.name}`;
                }}
                role="button"
              >
                <div className="rounded" style={{ width: '40px', height: '40px', background: `${it.color}` }} />

                <div className="flex-1">
                  <div className="pb-1 text-blue-600">{it.name}</div>
                  <div className="text-gray-500 text-xs">{it.des}</div>
                </div>

                <div className="mr-10 flex">
                  {it.users.map((user: any) => (
                    <div key={user.id}>
                      <Avatar className="avatar" style={{ backgroundColor: `${user.color}`, verticalAlign: 'middle' }}>
                        {user.username}
                      </Avatar>
                      {user.isManaged && <div className="text-xs text-gray-500">管理员</div>}
                    </div>
                  ))}
                </div>
                <div className="mr-10">
                  <div className="text-gray-900">{tr('更新时间')}</div>
                  <div className="text-gray-500 text-xs">{it.update_time}</div>
                </div>
                <div className="mr-10">
                  <div className="text-gray-900">{tr('创建时间')}</div>
                  <div className="text-gray-500 text-xs">{it.create_time}</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default ProjectCardList;

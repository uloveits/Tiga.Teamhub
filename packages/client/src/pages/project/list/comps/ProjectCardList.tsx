/*
 * @Author: wangxian
 * @Date: 2022-08-19 18:51:17
 * @LastEditTime: 2022-08-19 19:04:57
 */

import { Empty } from 'antd';

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
                className="shadow rounded p-2 mb-2 flex gap-4 items-center cursor-pointer"
                style={{ background: '#fff' }}
                role="button"
              >
                <div className="flex-1">
                  <div className="pb-1 text-gray-800 font-bold">{it.name}</div>
                  <div className="text-gray-500">{it.des}</div>
                </div>

                <div className="mr-10" style={{ width: '100px' }}>
                  123
                </div>
                <div className="mr-10">
                  <div className="text-gray-900">{tr('更新时间')}</div>
                  <div className="text-gray-500">{it.update_time}</div>
                </div>
                <div className="mr-10">
                  <div className="text-gray-900">{tr('创建时间')}</div>
                  <div className="text-gray-500">{it.create_time}</div>
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

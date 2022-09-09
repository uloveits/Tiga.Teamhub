/*
 * @Author: wangxian
 * @Date: 2022-08-30 09:04:03
 * @LastEditTime: 2022-09-07 09:04:18
 */

import moment from 'moment';

interface IWikiCardProps {
  list: any[];
}
const WikiCard = (props: IWikiCardProps) => {
  const { list } = props;
  return (
    <>
      <div className="grid grid-cols-9 gap-6">
        {list.map((it) => {
          return (
            <div
              key={it.id}
              className="bg-white shadow cursor-pointer p-2 text-center rounded"
              style={{ width: '100%', height: '180px', border: '1px solid #E5E6EB' }}
              onClick={() => {
                window.location.href = `/#/wiki/detail?id=${it.id}`;
              }}
              role="button"
            >
              <div className="pt-5 font-bold">{it.name}</div>
              <div className="pt-20 ">{it.creator}</div>
              <div className="pt-1 text-green-700 text-sm ">{moment(it.create_time).format('YYYY/MM/DD')}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WikiCard;

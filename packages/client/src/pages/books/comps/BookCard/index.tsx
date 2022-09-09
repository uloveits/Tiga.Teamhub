/*
 * @Author: wangxian
 * @Date: 2022-08-30 09:04:03
 * @LastEditTime: 2022-09-07 16:22:28
 */

import moment from 'moment';

interface IBookCardProps {
  list: any[];
}
const BookCard = (props: IBookCardProps) => {
  const { list } = props;
  return (
    <>
      <div className="grid grid-cols-9 gap-6">
        {list.map((it) => {
          return (
            <div
              key={it.id}
              className="bg-white shadow cursor-pointer p-2 text-center rounded relative"
              style={{ width: '100%', height: '180px', border: '1px solid #E5E6EB' }}
              onClick={() => {
                window.open(it.url);
              }}
              role="button"
            >
              <div className="pt-5 font-bold pb-10">{it.name}</div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
                <div>{it.creator}</div>
                <div className="pt-1 text-green-700 text-sm ">{moment(it.create_time).format('YYYY/MM/DD')}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BookCard;

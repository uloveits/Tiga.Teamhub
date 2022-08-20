/*
 * @Author: wangxian
 * @Date: 2022-08-20 11:33:47
 * @LastEditTime: 2022-08-20 14:00:30
 */

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const FbHeader = (props: any) => {
  console.log('FbHeader', props);

  const { id, title, cards } = props;

  return (
    <div className="w-full flex items-center">
      <div className="font-bold flex-1">{title}</div>
      <div className="text-purple-800">{cards.length}</div>
      <div style={{ marginLeft: '10px' }}>
        <Button
          type="primary"
          shape="circle"
          size="small"
          onClick={() => {
            console.log(id);
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};
export default FbHeader;

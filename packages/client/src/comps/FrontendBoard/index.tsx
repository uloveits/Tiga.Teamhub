/*
 * @Author: wangxian
 * @Date: 2022-08-20 11:09:10
 * @LastEditTime: 2022-08-20 13:56:09
 */
import { Button } from 'antd';
import Board from 'react-trello';
import FbCard from './comps/FbCard';
import FbHeader from './comps/FbHeader';
import './index.less';

interface IFrontendBoardProps {
  data: any;
}
const FrontendBoard = (props: IFrontendBoardProps) => {
  const { data } = props;

  const components = {
    AddCardLink: (record: any) => {
      console.log('AddCardLink', record);
      return (
        <Button onClick={record.onClick} block type="primary">
          新建任务
        </Button>
      );
    },
    LaneHeader: (record: any) => {
      console.log('LaneHeader', record);
      return <FbHeader {...record} />;
    },
    Card: (record: any) => {
      return <FbCard {...record} />;
    },
  };

  const onCardClick = (id: string) => {
    console.log('onCardClick', id);
  };
  const onCardDelete = (id: string) => {
    console.log('onCardDelete', id);
  };
  const onDataChange = (id: string) => {
    console.log('onDataChange', id);
  };

  return (
    <>
      <Board components={components} data={data} draggable onCardClick={onCardClick} onCardDelete={onCardDelete} onDataChange={onDataChange} />
    </>
  );
};

export default FrontendBoard;

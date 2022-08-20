/*
 * @Author: wangxian
 * @Date: 2022-08-20 11:09:10
 * @LastEditTime: 2022-08-20 11:37:11
 */
import { Button, Card } from 'antd';
import Board from 'react-trello';
import FbCard from './comps/FbCard';
import './index.less';

interface IFrontendBoardProps {
  data: any;
}
const FrontendBoard = (props: IFrontendBoardProps) => {
  const { data } = props;

  const components = {
    AddCardLink: (record: any) => {
      console.log(record);
      return (
        <Button onClick={record.onClick} block type="primary">
          新建任务
        </Button>
      );
    },
    Card: (record: any) => {
      console.log('value', record);
      return <FbCard {...record} />;
    },
  };

  const onCardClick = (id: string) => {
    console.log('onCardClick', id);
  };
  const onCardAdd = (id: string) => {
    console.log('onCardAdd', id);
  };
  const onCardDelete = (id: string) => {
    console.log('onCardDelete', id);
  };
  const onDataChange = (id: string) => {
    console.log('onDataChange', id);
  };

  return (
    <>
      <Board
        components={components}
        data={data}
        editable
        draggable
        onCardClick={onCardClick}
        onCardAdd={onCardAdd}
        onCardDelete={onCardDelete}
        onDataChange={onDataChange}
      />
    </>
  );
};

export default FrontendBoard;

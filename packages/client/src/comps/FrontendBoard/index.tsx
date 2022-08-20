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
  onAddCard?: (laneId: string | number) => void;
  onCardClick?: (id: string | number) => void;
  onDataChange?: (data: any) => void;
  handleDragEnd?: (data: any) => void;
  onCardMoveAcrossLanes?: (data: any) => void;
}
const FrontendBoard = (props: IFrontendBoardProps) => {
  const { data, onAddCard, onCardClick, onDataChange, handleDragEnd, onCardMoveAcrossLanes } = props;

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
      return <FbHeader {...record} onAddCard={onAddCard} />;
    },
    Card: (record: any) => {
      return <FbCard {...record} onCardClick={onCardClick} />;
    },
  };

  const onCardDelete = (id: string) => {
    console.log('onCardDelete', id);
  };

  return (
    <>
      <Board
        components={components}
        data={data}
        draggable
        onCardDelete={onCardDelete}
        onDataChange={onDataChange}
        handleDragEnd={handleDragEnd}
        onCardMoveAcrossLanes={onCardMoveAcrossLanes}
      />
    </>
  );
};

export default FrontendBoard;

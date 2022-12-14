/*
 * @Author: wangxian
 * @Date: 2022-08-23 08:14:23
 * @LastEditTime: 2022-09-07 16:24:26
 */

import BooksApi from '@/api/BooksApi';
import AuthButton from '@/comps/common/AuthButton';
import { Input } from 'antd';
import React from 'react';
import AddBookModal from './comps/AddBookModal';
import BookCard from './comps/BookCard';

const Books = () => {
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [list, setList] = React.useState<any[]>([]);

  const getAllBook = React.useCallback(async () => {
    const res = await BooksApi.getAllBook({ filter: { name: '' } });
    if (res.successed) {
      console.log(res);
      setList([...res.data]);
    }
  }, []);

  React.useEffect(() => {
    getAllBook();
  }, [getAllBook]);

  return (
    <>
      <div className="pb-2 flex items-center">
        <div className="flex-1">
          <AuthButton
            type="primary"
            onClick={() => {
              setIsModal(true);
            }}
          >
            新建
          </AuthButton>
        </div>

        <div>
          <Input placeholder="根据名称检索" />
        </div>
      </div>
      <div style={{ height: 'calc(100% - 40px)' }}>
        <BookCard list={list} />
      </div>

      <AddBookModal
        isModal={isModal}
        onCancel={() => {
          setIsModal(false);
        }}
        onSuccess={() => {
          setIsModal(false);
          getAllBook();
        }}
      />
    </>
  );
};

export default Books;

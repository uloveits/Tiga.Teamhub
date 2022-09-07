/*
 * @Author: wangxian
 * @Date: 2022-08-23 08:14:23
 * @LastEditTime: 2022-08-23 08:15:03
 */

import AuthButton from '@/comps/common/AuthButton';
import React from 'react';
import AddBookModal from './comps/AddBookModal';

const Books = () => {
  const [isModal, setIsModal] = React.useState<boolean>(false);
  return (
    <>
      <div className="pb-2">
        <AuthButton
          type="primary"
          onClick={() => {
            setIsModal(true);
          }}
        >
          新建
        </AuthButton>
      </div>
      <div style={{ height: 'calc(100% - 40px)' }}>12</div>

      <AddBookModal
        isModal={isModal}
        onCancel={() => {
          setIsModal(false);
        }}
      />
    </>
  );
};

export default Books;

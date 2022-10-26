/*
 * @Author: wangxian
 * @Date: 2022-08-30 08:30:29
 * @LastEditTime: 2022-08-30 15:42:56
 */

import DocApi from '@/api/DocApi';
import { Button, Input } from 'antd';
import React from 'react';
import AddOrEditDocModal from './comps/AddOrEditDoc';
import WikiCard from './comps/WikiCard';

const WikiCenter = () => {
  const [types, setTypes] = React.useState<any[]>([]);

  const [isModal, setIsModal] = React.useState<boolean>(false);

  const getDocTypes = React.useCallback(() => {
    DocApi.getDocTypes().then((res) => {
      if (res.successed) {
        setTypes([...res.data]);
      }
    });
  }, []);
  React.useEffect(() => {
    getDocTypes();
  }, [getDocTypes]);

  return (
    <>
      <div className="pb-2 flex items-center">
        <div className="flex-1">
          <Button
            type="primary"
            onClick={() => {
              setIsModal(true);
            }}
          >
            新建
          </Button>
        </div>
        <div>
          <Input placeholder="根据名称检索" />
        </div>
      </div>
      <div style={{ height: 'calc(100% - 40px)' }}>
        <WikiCard list={types} />
      </div>

      <AddOrEditDocModal
        isModal={isModal}
        onCancel={() => {
          setIsModal(false);
        }}
        onSuccess={() => {
          setIsModal(false);
          getDocTypes();
        }}
      />
    </>
  );
};

export default WikiCenter;

/*
 * @Author: wangxian
 * @Date: 2022-02-28 18:58:38
 * @LastEditTime: 2022-08-30 11:49:50
 */
import React from 'react';
import DocApi from '@/api/DocApi';
import { GetRequest } from '@/utils';
import { Split } from 'ronds-react-ui';
import NavMenu from '../comps/NavMenu';
import DocMarkdown from '../comps/Markdown';

const DetailManage = () => {
  const [list, setList] = React.useState<string[]>([]);

  const [curDoc, setCurDoc] = React.useState<{ id: number; label: string }>();
  const [typeId, setTypeId] = React.useState<number>();

  React.useEffect(() => {
    const request = GetRequest(window.location.href);
    setTypeId(request.id);
  }, []);

  const getDocList = React.useCallback(() => {
    if (typeId) {
      DocApi.getDocListByType(typeId).then((res) => {
        if (res.successed) {
          setList([...res.data]);
        }
      });
    }
  }, [typeId]);

  React.useEffect(() => {
    getDocList();
  }, [getDocList]);

  const onMenuClick = (data: any) => {
    console.log('onMenuClick', data);
    setCurDoc({ ...data });
  };

  return (
    <div className="bg-white w-full h-full">
      <Split gutterSize={0} sizes={[15, 85]} direction="horizontal">
        <div className="p-3" style={{ background: '#f7f7f7' }}>
          <NavMenu
            typeId={typeId}
            list={list}
            onSelectChange={onMenuClick}
            onCallback={() => {
              getDocList();
            }}
          />
        </div>
        <div className="p-3">
          <DocMarkdown id={curDoc?.id} name={curDoc?.label} />
        </div>
      </Split>
    </div>
  );
};

export default DetailManage;

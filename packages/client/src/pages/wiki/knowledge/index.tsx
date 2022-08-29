/*
 * @Author: wangxian
 * @Date: 2022-02-28 18:58:38
 * @LastEditTime: 2022-08-29 17:10:16
 */

import DocApi from '@/api/DocApi';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { Split } from 'ronds-react-ui';
import NavMenu from '../comps/NavMenu';
import { DOCS_TYPE } from '../constants';
import DocMarkdown from '../comps/Markdown';

const KnowledgeManage = () => {
  const [list, setList] = React.useState<any[]>([]);

  const [curDoc, setCurDoc] = React.useState<{ id: number; label: string }>();

  React.useEffect(() => {
    DocApi.getDocListByType(DOCS_TYPE.KONW_LEDGE).then((res) => {
      if (res.successed) {
        console.log('getDocListByType', res);
        setList([...res.data]);
      }
    });
  }, []);

  const onMenuClick = (data: any) => {
    console.log('onMenuClick', data);
    setCurDoc({ ...data });
  };

  return (
    <div className="bg-white w-full h-full">
      <Split gutterSize={0} sizes={[15, 85]} direction="horizontal">
        <div className="p-3" style={{ background: '#f7f7f7' }}>
          <div className="flex items-center">
            <div className="text-gray-400 flex-1">目录</div>
            <div>
              <Button type="link" icon={<PlusOutlined />} />
            </div>
          </div>
          <div style={{ height: 'calc(100% - 40px)' }}>
            <NavMenu list={list} onSelectChange={onMenuClick} />
          </div>
        </div>
        <div className="p-3">
          <DocMarkdown id={curDoc?.id} name={curDoc?.label} />
        </div>
      </Split>
    </div>
  );
};

export default KnowledgeManage;

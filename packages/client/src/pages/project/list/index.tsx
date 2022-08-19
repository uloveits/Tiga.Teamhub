/*
 * @Author: wangxian
 * @Date: 2022-08-04 19:32:02
 * @LastEditTime: 2022-08-19 18:54:48
 */
import { Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import { Modal } from 'ronds-react-ui';
import { MetadataForm } from 'ronds-metadata';
import ProjectApi from '@/api/ProjectApi';
import ProjectCardList from './comps/ProjectCardList';

const ProjectList = () => {
  const [isModal, setIsModal] = React.useState<boolean>(false);

  const [list, setList] = React.useState<any[]>([]);

  const formRef = React.useRef<FormInstance>();

  React.useEffect(() => {
    ProjectApi.getMyProjectList().then((res) => {
      if (res.successed) {
        console.log('getMyProjectList', res);
        setList([...res.data]);
      }
    });
  }, []);

  const onFinish = (values: any) => {
    console.log('onFinsi', values);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setIsModal(true);
        }}
      >
        新建
      </Button>

      <div className="mt-2" style={{ height: 'calc(100% - 40px)' }}>
        <ProjectCardList list={list} />
      </div>

      <Modal
        visible={isModal}
        onCancel={() => {
          setIsModal(false);
        }}
        onOk={() => {
          if (formRef.current) formRef.current.submit();
        }}
        title={'创建项目'}
        canMaximize={true}
        itemState={{
          width: 600,
          height: 400,
        }}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <MetadataForm
            initialValues={{}}
            schema={ADD_SCHEMA}
            getFormInstance={(from: FormInstance) => {
              formRef.current = from;
            }}
            onFinish={onFinish}
          />
        </div>
      </Modal>
    </>
  );
};
export default ProjectList;

const ADD_SCHEMA = [
  {
    id: 'Test',
    type: 'object',
    properties: [
      {
        id: 'name',
        type: 'text',
        fields: [
          {
            id: 'Rule.Form',
            refId: 'com.ronds.schema.default.Rule.Form',
            type: 'ref',
            value: {
              common: {
                label: '项目名称',
                require: true,
              },
            },
          },
        ],
      },
      {
        id: 'color',
        type: 'text',
        fields: [
          {
            id: 'Rule.Form',
            refId: 'com.ronds.schema.default.Rule.Form',
            type: 'ref',
            value: {
              common: {
                label: '颜色标识',
                require: true,
              },
              text: {
                type: 'colorPicker',
              },
            },
          },
        ],
      },
      {
        id: 'describe',
        type: 'text',
        fields: [
          {
            type: 'ref',
            refId: 'com.ronds.schema.default.Rule.Form',
            id: 'Rule.Form',
            value: {
              common: {
                label: '项目描述',
                require: true,
              },
              text: {
                type: 'textarea',
              },
            },
          },
        ],
      },
    ],
  },
];

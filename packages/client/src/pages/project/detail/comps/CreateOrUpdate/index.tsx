/*
 * @Author: wangxian
 * @Date: 2022-08-24 11:12:40
 * @LastEditTime: 2022-08-24 13:38:58
 */

import { FormInstance } from 'antd/lib/form';
import React from 'react';
import { MetadataForm } from 'ronds-metadata';
import { Modal } from 'ronds-react-ui';

interface ICreateOrUpdateProps {
  isModal: boolean;
  onCancel: () => void;
}
const CreateOrUpdateModal = (props: ICreateOrUpdateProps) => {
  const { isModal, onCancel } = props;

  const formRef = React.useRef<FormInstance>();

  const onFinish = async (values: any) => {
    console.log('onFinsi', values);
  };

  return (
    <>
      <Modal
        visible={isModal}
        onCancel={onCancel}
        onOk={() => {
          if (formRef.current) formRef.current.submit();
        }}
        title={'添加任务'}
        canMaximize={true}
        itemState={{
          width: 600,
          height: 700,
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

export default CreateOrUpdateModal;
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
        id: 'des',
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

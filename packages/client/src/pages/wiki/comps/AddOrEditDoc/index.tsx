/*
 * @Author: wangxian
 * @Date: 2022-08-24 11:12:40
 * @LastEditTime: 2022-08-30 15:29:23
 */

import DocApi from '@/api/DocApi';
import { message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import { MetadataForm } from 'ronds-metadata';
import { Modal } from 'ronds-react-ui';

interface IAddDocModalProps {
  isModal: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}
const AddOrEditDocModal = (props: IAddDocModalProps) => {
  const { isModal, onCancel, onSuccess } = props;

  const formRef = React.useRef<FormInstance>();

  const onFinish = async (values: any) => {
    const param = {
      ...values,
      pid: -1,
      type: -1,
    };
    const res = await DocApi.saveDocs(param);
    if (res.successed) {
      message.success('保存成功');
      onSuccess && onSuccess();
    }
  };

  return (
    <>
      <Modal
        visible={isModal}
        onCancel={onCancel}
        onOk={() => {
          if (formRef.current) formRef.current.submit();
        }}
        title={'创建文档'}
        canMaximize={true}
        itemState={{
          width: 400,
          height: 300,
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

export default AddOrEditDocModal;
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
                label: '文档名称',
                require: true,
              },
            },
          },
        ],
      },
      {
        id: 'sort',
        type: 'number',
        fields: [
          {
            id: 'Rule.Form',
            refId: 'com.ronds.schema.default.Rule.Form',
            type: 'ref',
            value: {
              common: {
                label: '排序',
                require: true,
              },
            },
          },
        ],
      },
    ],
  },
];

/*
 * @Author: wangxian
 * @Date: 2022-08-24 11:12:40
 * @LastEditTime: 2022-09-07 13:44:32
 */

import BooksApi from '@/api/BooksApi';
import { message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import { MetadataForm } from 'ronds-metadata';
import { Modal } from 'ronds-react-ui';

interface IAddBookModalProps {
  isModal: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}
const AddBookModal = (props: IAddBookModalProps) => {
  const { isModal, onCancel, onSuccess } = props;

  const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);
  const formRef = React.useRef<FormInstance>();

  const onFinish = async (values: any) => {
    console.log(values);
    setConfirmLoading(true);
    const res = await BooksApi.add(values);
    if (res.successed) {
      message.success('保存成功');
      setConfirmLoading(false);
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
        confirmLoading={confirmLoading}
        title={'添加书籍'}
        canMaximize={true}
        itemState={{
          width: 500,
          height: 500,
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

export default AddBookModal;
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
                label: '书籍名称',
                require: true,
              },
            },
          },
        ],
      },
      {
        id: 'tags',
        type: 'array',
        items: {
          type: 'text',
        },
        fields: [
          {
            type: 'ref',
            refId: 'com.ronds.schema.default.Rule.Form',
            id: 'Rule.Form',
            value: {
              'common-en-US': {
                label: 'Tags',
                require: true,
              },
              common: {
                label: '标签',
                require: true,
              },
            },
          },
        ],
      },
      {
        id: 'file',
        type: 'text',
        fields: [
          {
            id: 'Rule.Form',
            refId: 'com.ronds.schema.default.Rule.Form',
            type: 'ref',
            value: {
              common: {
                label: '上传书籍pdf',
                require: true,
              },
              text: {
                type: 'upload',
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

/*
 * @Author: wangxian
 * @Date: 2022-08-24 11:12:40
 * @LastEditTime: 2022-08-29 17:22:47
 */

import DocApi from '@/api/DocApi';
import { message } from 'antd';
import React from 'react';
import MdEdit from 'ronds-metadata/es/comps/MdEdit';
import { Modal } from 'ronds-react-ui';

interface IAddTaskDesModalProps {
  content: string;
  docId?: number;
  isModal: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}
const AddOrEditDocContentModal = (props: IAddTaskDesModalProps) => {
  const { content, isModal, onCancel, docId, onSuccess } = props;
  const [value, setValue] = React.useState<string>('');
  console.log(docId);

  React.useEffect(() => {
    setValue(content);
  }, [content]);

  const onEditChange = (txt: string) => {
    setValue(txt);
  };

  const onSubmit = async () => {
    const param = {
      docId,
      content: value,
    };

    const res = await DocApi.saveDocContent(param);
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
        onOk={onSubmit}
        title={'编辑文档内容'}
        canMaximize={true}
        itemState={{
          width: 900,
          height: 800,
        }}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <MdEdit value={value} onChange={onEditChange} />
        </div>
      </Modal>
    </>
  );
};

export default AddOrEditDocContentModal;

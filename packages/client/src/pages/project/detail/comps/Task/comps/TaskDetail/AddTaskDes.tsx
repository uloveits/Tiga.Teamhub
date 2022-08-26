/*
 * @Author: wangxian
 * @Date: 2022-08-24 11:12:40
 * @LastEditTime: 2022-08-25 18:18:39
 */

import ProjectApi from '@/api/ProjectApi';
import { message } from 'antd';
import React from 'react';
import MdEdit from 'ronds-metadata/es/comps/MdEdit';
import { Modal } from 'ronds-react-ui';

interface IAddTaskDesModalProps {
  des: string;
  taskId?: number;
  isModal: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}
const AddTaskDesModal = (props: IAddTaskDesModalProps) => {
  const { des, isModal, onCancel, taskId, onSuccess } = props;
  const [value, setValue] = React.useState<string>('');
  console.log(taskId);

  React.useEffect(() => {
    setValue(des);
  }, [des]);

  const onEditChange = (txt: string) => {
    setValue(txt);
  };

  const onSubmit = async () => {
    const param = {
      taskId,
      content: value,
    };

    const res = await ProjectApi.saveTaskDes(param);
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
        title={'编辑任务描述'}
        canMaximize={true}
        itemState={{
          width: 800,
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

export default AddTaskDesModal;

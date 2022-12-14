/*
 * @Author: wangxian
 * @Date: 2022-08-24 11:12:40
 * @LastEditTime: 2022-08-25 12:07:15
 */

import ProjectApi from '@/api/ProjectApi';
import { message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import moment from 'moment';
import React from 'react';
import { MetadataForm } from 'ronds-metadata';
import { Modal } from 'ronds-react-ui';
import { TASK_CLASSIFICATION_ENUM, TASK_STAGE_ENUM } from '../../constants';

interface ICreateOrUpdateProps {
  projectId?: number;
  isModal: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}
const CreateOrUpdateModal = (props: ICreateOrUpdateProps) => {
  const { projectId, isModal, onCancel, onSuccess } = props;

  const [member, setMember] = React.useState<any[]>([]);

  const formRef = React.useRef<FormInstance>();

  React.useEffect(() => {
    if (projectId) {
      ProjectApi.getProjectMemberList(projectId).then((res) => {
        if (res.successed) {
          console.log('getProjectMemberList', res);
          setMember([...res.data]);
        }
      });
    }
  }, [projectId]);

  const getAssigneeColor = (_assignee: string[]) => {
    return _assignee.map((it) => {
      const _ = member.find((v) => v.username === it);
      return _.color;
    });
  };

  const onFinish = async (values: any) => {
    console.log('onFinsi', values);
    const assignee_color = getAssigneeColor(values.assignee);
    const param = {
      projectId,
      ...values,
      startTime: moment(values.startTime).format('YYYY/MM/DD'),
      endTime: moment(values.endTime).format('YYYY/MM/DD'),
      assignee: values.assignee.toString(),
      assignee_color: assignee_color.toString(),
    };
    const res = await ProjectApi.saveProjectTask(param);
    if (res.successed) {
      message.success('创建成功');
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
            initEnumValue={{
              assignee: member.map((it) => {
                return { key: it.username, value: it.username };
              }),
            }}
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
                label: '任务名称',
                require: true,
              },
            },
          },
        ],
      },
      {
        id: 'stage',
        type: 'enum',
        enum: TASK_STAGE_ENUM,
        fields: [
          {
            id: 'Rule.Form',
            refId: 'com.ronds.schema.default.Rule.Form',
            type: 'ref',
            value: {
              common: {
                label: '阶段',
                require: true,
              },
            },
          },
        ],
      },
      {
        id: 'completeRate',
        type: 'number',
        fields: [
          {
            type: 'ref',
            refId: 'com.ronds.schema.default.Rule.Form',
            id: 'Rule.Form',
            value: {
              common: {
                label: '完成率',
                require: true,
              },
            },
          },
        ],
      },
      {
        id: 'startTime',
        type: 'text',
        fields: [
          {
            type: 'ref',
            refId: 'com.ronds.schema.default.Rule.Form',
            id: 'Rule.Form',
            value: {
              common: {
                label: '开始时间',
                require: true,
              },
              text: {
                type: 'datePicker',
              },
            },
          },
        ],
      },
      {
        id: 'endTime',
        type: 'text',
        fields: [
          {
            type: 'ref',
            refId: 'com.ronds.schema.default.Rule.Form',
            id: 'Rule.Form',
            value: {
              common: {
                label: '结束时间',
                require: true,
              },
              text: {
                type: 'datePicker',
              },
            },
          },
        ],
      },
      {
        id: 'assignee',
        type: 'enum',
        fields: [
          {
            type: 'ref',
            refId: 'com.ronds.schema.default.Rule.Form',
            id: 'Rule.Form',
            value: {
              common: {
                label: '责任人',
                require: true,
              },
              enum: { isMutiple: true },
            },
          },
        ],
      },
      {
        id: 'iteration',
        type: 'text',
        fields: [
          {
            type: 'ref',
            refId: 'com.ronds.schema.default.Rule.Form',
            id: 'Rule.Form',
            value: {
              common: {
                label: '迭代周',
                require: true,
              },
            },
          },
        ],
      },
      {
        id: 'classification',
        type: 'enum',
        enum: TASK_CLASSIFICATION_ENUM,
        fields: [
          {
            type: 'ref',
            refId: 'com.ronds.schema.default.Rule.Form',
            id: 'Rule.Form',
            value: {
              common: {
                label: '功能分类',
                require: true,
              },
            },
          },
        ],
      },
    ],
  },
];

import DingTalkApi from '@/api/DingTalkApi';
import React from 'react';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { Button, CrudTable, Modal, ViewStateTableModel } from 'ronds-react-ui';
import { Divider, message, Popconfirm } from 'antd';
import { ILoadDataRes, ITableQuery } from 'ronds-react-ui/es/provider/models/ViewStateTableModel';
import { MetadataForm } from 'ronds-metadata';
import { FormInstance } from 'antd/lib/form';
import { ISchema } from '@formily/antd';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';

const ADD_DingTalk_SCHEMA = [
  {
    id: 'UpdateUser',
    type: 'object',
    properties: [
      {
        id: 'name',
        type: 'text',
        fields: [
          {
            type: 'ref',
            refId: 'Rule.Form',
            id: 'Rule.Form',
            value: {
              label: '群会名称',
              require: true,
            },
          },
        ],
      },
      {
        id: 'hook',
        type: 'text',
        fields: [
          {
            type: 'ref',
            refId: 'Rule.Form',
            id: 'Rule.Form',
            value: {
              label: 'HOOK',
              require: true,
            },
          },
        ],
      },
    ],
  },
];

const DingTalkManage = () => {
  const model = React.useMemo(() => {
    return new DingTalkManageModel();
  }, []);

  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [detail, setDetail] = React.useState<any>();
  const formRef = React.useRef<FormInstance>();

  const columns: any[] = [
    {
      title: '群组名称',
      dataKey: 'name',
      width: 30,
    },
    {
      title: 'webhook',
      dataKey: 'hook',
      width: 50,
    },
    {
      title: '创建时间',
      dataKey: 'create_time',
      width: 30,
    },
    {
      title: '更新时间',
      dataKey: 'update_time',
      width: 30,
    },
    {
      dataKey: '_aciton_',
      title: '操作',
      width: 150,
      maxWidth: 150,
      export: false,
      minWidth: 120,
      frozen: 'right',
      render: (val: any, record: any) => {
        return (
          <>
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={(e) => {
                setDetail({ ...record });
                setIsModal(true);
              }}
              title="编辑"
            />
            <Divider type="vertical" />
            <Popconfirm
              placement={'left'}
              title="确认删除这条数据?"
              onConfirm={() => {
                onDelete(record.id);
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" size="small" icon={<DeleteOutlined />} title="删除" />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const querySchema: ISchema = React.useMemo<ISchema>(() => {
    const schema: ISchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: '会议名称',
        },
      },
    };
    return schema;
  }, []);

  const getAddBtn = (onAdd: () => void): React.ReactElement => {
    return (
      <>
        <Button
          size="small"
          icon={<PlusOutlined />}
          title="添加"
          onClick={(e) => {
            setDetail(undefined);
            setIsModal(true);
          }}
        />
      </>
    );
  };

  const onSave = async (values: any) => {
    let param = values;
    if (detail) {
      param = { ...detail, ...values };
    }
    console.log(values);
    const res = await DingTalkApi.save(param);
    if (res.successed) {
      message.success('保存成功');
      setIsModal(false);
      model.getData({});
    }
  };

  const onDelete = async (id: string) => {
    const res = await DingTalkApi.delete([id]);
    if (res.successed) {
      message.success('删除成功');
      model.getData({});
    }
  };

  return (
    <>
      <CrudTable
        autoIndex={false}
        add={{
          getAddBtn,
          enabled: true,
        }}
        tableProps={{
          rowKey: 'id',
          columns,
          border: false,
        }}
        model={model}
        query={{
          enabled: true,
          schema: querySchema,
        }}
      />
      <Modal
        visible={isModal}
        onCancel={() => {
          setIsModal(false);
        }}
        onOk={() => {
          if (formRef.current) formRef.current.submit();
        }}
        title={detail ? '编辑会议' : '新增会议'}
        canMaximize={true}
        itemState={{
          width: 500,
          height: 400,
        }}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <MetadataForm
            initialValues={detail}
            schema={ADD_DingTalk_SCHEMA}
            getFormInstance={(from: FormInstance) => {
              formRef.current = from;
            }}
            onFinish={onSave}
          />
        </div>
      </Modal>
    </>
  );
};

export default DingTalkManage;

class DingTalkManageModel extends ViewStateTableModel<any, any> {
  public async loadData(sourceData: ITableQuery<any>): Promise<ILoadDataRes<any>> {
    const reqData: any = this.getPageArgs(sourceData);

    const filterData: any = {
      keyValue: '',
    };
    if (sourceData.pageSize) {
      filterData.size = reqData.maxResultCount;
      filterData.page = sourceData.pageNumber || 1;
    }
    if (sourceData.args?.name) {
      filterData.keyValue = sourceData.args.name;
    }
    // 调用
    const res = await DingTalkApi.getList(filterData);
    console.log('filter', filterData);
    if (res.successed) {
      return {
        total: res.data.total || 0,
        data: res.data.list,
      };
    }
    return [];
  }
}

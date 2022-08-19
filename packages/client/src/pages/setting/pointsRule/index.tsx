import PointsRuleApi from '@/api/PointsRuleApi';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import React from 'react';
import { Button, CrudTable, Modal, NewGuid, ViewStateTableModel } from 'ronds-react-ui';
import { ILoadDataRes, ITableQuery } from 'ronds-react-ui/es/provider/models/ViewStateTableModel';
import { MetadataForm } from 'ronds-metadata';
import { FormInstance } from 'antd/lib/form';
import { Divider, message, Popconfirm, Tag } from 'antd';
import { ISchema } from '@formily/antd';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';

const ADD_USER_SCHEMA = [
  {
    id: 'UpdatePointsRule',
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
              label: '规则名称',
              require: true,
            },
          },
        ],
      },
      {
        id: 'score',
        type: 'number',
        fields: [
          {
            type: 'ref',
            refId: 'Rule.Form',
            id: 'Rule.Form',
            value: {
              label: '积分',
              require: true,
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
            refId: 'Rule.Form',
            id: 'Rule.Form',
            value: {
              label: '标签',
              require: true,
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
            refId: 'Rule.Form',
            id: 'Rule.Form',
            value: {
              label: '描述',
              type: 'textarea',
            },
          },
        ],
      },
    ],
  },
];

const PointsRuleManage = () => {
  const model = React.useMemo(() => {
    return new PointsRuleModel();
  }, []);

  const [isModal, setIsModal] = React.useState<boolean>(false);

  const [detail, setDetail] = React.useState<any>();

  const formRef = React.useRef<FormInstance>();

  const columns: any[] = [
    {
      title: tr('规则名称'),
      dataKey: 'name',
      width: 70,
    },
    {
      title: tr('积分'),
      dataKey: 'score',
      width: 20,
    },
    {
      title: tr('标签'),
      dataKey: 'tags',
      width: 80,
      render: (val: string[], record: any) => {
        return val.map((it) => (
          <Tag color="blue" key={NewGuid()}>
            {it}
          </Tag>
        ));
      },
    },
    {
      title: tr('描述'),
      dataKey: 'des',
      width: 100,
    },
    {
      title: tr('创建时间'),
      dataKey: 'createTime',
      width: 50,
    },
    {
      title: tr('更新时间'),
      dataKey: 'updateTime',
      width: 50,
    },
    {
      dataKey: '_aciton_',
      title: tr('操作'),
      width: 120,
      maxWidth: 120,
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
              title={tr('编辑')}
            />
            <Divider type="vertical" />
            <Popconfirm
              placement={'left'}
              title={tr('确认删除这条数据?')}
              onConfirm={() => {
                onDelete(record.id);
              }}
              okText={tr('确定')}
              cancelText={tr('取消')}
            >
              <Button type="link" size="small" icon={<DeleteOutlined />} title={tr('删除')} />
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
        tags: {
          type: 'string',
          title: tr('标签'),
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
          title={tr('添加')}
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
    const res = await PointsRuleApi.save(param);
    if (res.successed) {
      message.success('保存成功');
      setIsModal(false);
      model.getData();
    }
  };

  const onDelete = async (id: string) => {
    const res = await PointsRuleApi.delete([id]);
    if (res.successed) {
      message.success('删除成功');
      model.getData();
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
        title={detail ? '编辑用户' : '新增用户'}
        canMaximize={true}
        itemState={{
          width: 600,
          height: 500,
        }}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <MetadataForm
            initialValues={detail}
            schema={ADD_USER_SCHEMA}
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

export default PointsRuleManage;

class PointsRuleModel extends ViewStateTableModel<any, any> {
  public async loadData(sourceData: ITableQuery<any>): Promise<ILoadDataRes<any>> {
    const reqData: any = this.getPageArgs(sourceData);

    const filterData: any = {
      keyValue: '',
    };

    if (sourceData.pageSize) {
      filterData.size = reqData.maxResultCount;
      filterData.page = sourceData.pageNumber || 1;
    }
    if (sourceData.args.tags) {
      filterData.keyValue = sourceData.args.tags;
    }
    // 调用
    const res = await PointsRuleApi.getList(filterData);
    if (res.successed) {
      return {
        total: res.data.total || 0,
        data: res.data.list,
      };
    }
    return [];
  }
}

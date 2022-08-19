import DingTalkApi from '@/api/DingTalkApi';
import UserApi from '@/api/UserApi';
import MeetingApi from '@/api/MeetingApi';
import React from 'react';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { Button, CrudTable, Modal, NewGuid, ViewStateTableModel } from 'ronds-react-ui';
import { ILoadDataRes, ITableQuery } from 'ronds-react-ui/es/provider/models/ViewStateTableModel';
import { FormInstance } from 'antd/lib/form';
import { MetadataForm } from 'ronds-metadata';
import { Divider, message, Popconfirm, Popover, Select, Tag } from 'antd';
import { ISchema } from '@formily/antd';
import { DeleteOutlined, EditOutlined, DingdingOutlined, DownloadOutlined } from '@ant-design/icons/lib/icons';

const ADD_MEETING_SCHEMA = [
  {
    id: 'UpdateMeetings',
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
              label: '会议名称',
              require: true,
            },
          },
        ],
      },
      {
        id: 'address',
        type: 'text',
        fields: [
          {
            type: 'ref',
            refId: 'Rule.Form',
            id: 'Rule.Form',
            value: {
              label: '会议地点',
              require: true,
            },
          },
        ],
      },
      {
        id: 'start_time',
        type: 'text',
        fields: [
          {
            type: 'ref',
            refId: 'Rule.Form',
            id: 'Rule.Form',
            value: {
              label: '开始时间',
              require: true,
              type: 'datePicker',
            },
          },
        ],
      },
      {
        id: 'target',
        type: 'text',
        fields: [
          {
            type: 'ref',
            refId: 'Rule.Form',
            id: 'Rule.Form',
            value: {
              label: '目标',
              require: true,
            },
          },
        ],
      },
      {
        id: 'process',
        type: 'text',
        fields: [
          {
            type: 'ref',
            refId: 'Rule.Form',
            id: 'Rule.Form',
            value: {
              label: '会议流程',
              type: 'textarea',
            },
          },
        ],
      },
      {
        id: 'mentions',
        type: 'enum',
        enum: [],
        fields: [
          {
            type: 'ref',
            refId: 'Rule.Form',
            id: 'Rule.Form',
            value: {
              label: '参会人员',
              mode: 'multiple',
            },
          },
        ],
      },
    ],
  },
];

const MeetingCreate = () => {
  const model = React.useMemo(() => {
    return new MeetingModel();
  }, []);

  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [userOption, setUserOption] = React.useState<{ key: string; value: string }[]>([]);
  const [detail, setDetail] = React.useState<any>();

  const [isSelectGroups, setIsSelectGroups] = React.useState<any>({});
  const [groups, setGroups] = React.useState<any[]>([]);
  const formRef = React.useRef<FormInstance>();
  const curRowRef = React.useRef<any>({});

  React.useEffect(() => {
    UserApi.getList({}).then((res) => {
      if (res.successed) {
        console.log(res);
        const _userOption = res.data.list.map((it: any) => {
          return { key: it.phone, value: it.nameCN };
        });
        setUserOption([..._userOption]);
      }
    });
  }, []);

  React.useEffect(() => {
    DingTalkApi.getList().then((res: any) => {
      console.log('DingTalkApi', res);
      if (res.successed) {
        setGroups([...res.data.list]);
      }
    });
  }, []);

  const columns: any[] = [
    {
      title: tr('会议名称'),
      dataKey: 'name',
      width: 40,
    },
    {
      title: tr('会议地点'),
      dataKey: 'address',
      width: 20,
    },
    {
      title: tr('开始时间'),
      dataKey: 'start_time',
      width: 30,
    },

    {
      title: tr('目标'),
      dataKey: 'target',
      width: 40,
    },
    {
      title: tr('会议流程'),
      dataKey: 'process',
      width: 50,
    },
    {
      title: tr('参会人员'),
      dataKey: 'mentions',
      width: 60,
      render: (val: string[], record: any) => {
        return (val || []).map((it) => (
          <Tag color="blue" key={NewGuid()}>
            @{it}
          </Tag>
        ));
      },
    },

    {
      title: tr('创建时间'),
      dataKey: 'create_time',
      width: 30,
    },
    {
      title: tr('更新时间'),
      dataKey: 'update_time',
      width: 30,
    },
    {
      dataKey: '_aciton_',
      title: tr('操作'),
      width: 170,
      maxWidth: 170,
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
                const _record = record;
                _record.mentions = _record.mentions_phone;
                setDetail({ ..._record });
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
            <Divider type="vertical" />
            <Popover
              content={webhookContent}
              title="选择群组"
              trigger="click"
              placement="left"
              visible={isSelectGroups[record.id]}
              onVisibleChange={(b) => {
                curRowRef.current = record;
                const _selectGroup = isSelectGroups;
                _selectGroup[record.id] = b;
                setIsSelectGroups({ ..._selectGroup });
              }}
            >
              <Button type="link" size="small" icon={<DingdingOutlined />} title={tr('钉钉通知')} />
            </Popover>

            <Divider type="vertical" />
            <Popconfirm
              placement={'left'}
              title={tr('确定下载会议记录')}
              onConfirm={() => {
                onDownLoad(record);
              }}
              okText={tr('确定')}
              cancelText={tr('取消')}
            >
              <Button type="link" size="small" icon={<DownloadOutlined />} title={tr('下载会议记录')} />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const webhookContent = () => {
    return (
      <>
        <div className="pb-2">
          <Select
            style={{ width: '200px' }}
            onChange={(txt: string) => {
              curRowRef.current.hook = txt;
            }}
          >
            {groups.map((item: any) => (
              <Select.Option value={item.hook} key={item.hook}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Button
          block
          type="primary"
          onClick={() => {
            onSendDingding(curRowRef.current);
          }}
        >
          发送
        </Button>
      </>
    );
  };

  const onSendDingding = async (record: any) => {
    console.log('record', record);
    const param = {
      title: '会议通知！',
      message: `● 会议主题：${record.name}\n\n ● 会议时间：${record.start_time} \n\n ● 会议地点：${record.address}\n\n`,
      mentions: record.mentions_phone,
      webhook: record.hook,
    };
    const res = await DingTalkApi.send(param);
    if (res.successed) {
      message.success('已发送');
    }
  };

  const querySchema: ISchema = React.useMemo<ISchema>(() => {
    const schema: ISchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: tr('会议名称'),
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
    console.log(values);
    debugger;
    let param = values;

    const _mentions: string[] = [];
    param.mentions_phone = param.mentions;

    param.mentions.forEach((v: any) => {
      const _mention = userOption.filter((it) => it.key === v);
      _mentions.push(_mention[0]?.value);
    });

    param.mentions = _mentions;

    if (detail) {
      param = { ...detail, ...values };
    }
    console.log(values);
    const res = await MeetingApi.save(param);
    if (res.successed) {
      message.success('保存成功');
      setIsModal(false);
      model.getData({});
    }
  };

  const onDelete = async (id: string) => {
    const res = await MeetingApi.delete([id]);
    if (res.successed) {
      message.success('删除成功');
      model.getData({});
    }
  };

  const onDownLoad = async (id: any) => {
    let _name = '';
    let _value = '';
    MeetingApi.getRecordList(id.id).then((res) => {
      if (res.successed) {
        _name = res.data.list[0]?.id || '1';
        _value = res.data.list[0]?.content || '';
        const blob = new Blob([_value], { type: 'text/markdown' });
        const objectURL = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = objectURL;
        anchor.download = `${_name}.md`;
        anchor.click();
        URL.revokeObjectURL(objectURL);
      }
    });
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
          width: 600,
          height: 600,
        }}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <MetadataForm
            initialValues={detail}
            schema={ADD_MEETING_SCHEMA}
            initEnumValue={{ mentions: userOption }}
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

export default MeetingCreate;

class MeetingModel extends ViewStateTableModel<any, any> {
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
    const res = await MeetingApi.getList(filterData);
    if (res.successed) {
      return {
        total: res.data.total || 0,
        data: res.data.list,
      };
    }
    return [];
  }
}

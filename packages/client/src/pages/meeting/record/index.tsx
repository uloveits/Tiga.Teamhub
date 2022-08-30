/*
 * @Author: wangxian
 * @Date: 2021-12-16 09:52:04
 * @LastEditTime: 2022-08-29 19:36:11
 */
import DingTalkApi from '@/api/DingTalkApi';
import MeetingApi from '@/api/MeetingApi';

import { Button, message, Popover, Select } from 'antd';
import React from 'react';
import MdEdit from 'ronds-metadata/es/comps/MdEdit';

const { Option } = Select;

const MeetingRecord = () => {
  const [value, setValue] = React.useState<string>('');
  const [meetingId, setMeetingId] = React.useState<string>('');
  const [options, setOptions] = React.useState<any>([]);
  const [recordId, setRecordId] = React.useState<string>('');
  const [groups, setGroups] = React.useState<any[]>([]);
  const [isSend, setIsSend] = React.useState<boolean>(false);
  const webhookRef = React.useRef<string>('');

  React.useEffect(() => {
    MeetingApi.getList({}).then((res) => {
      if (res.successed) {
        const _Option = res.data.list.map((it: any) => {
          return { key: it.id, value: it.name };
        });
        setOptions([..._Option]);
      }
    });
  }, []);

  React.useEffect(() => {
    DingTalkApi.getList().then((res) => {
      if (res.successed) {
        setGroups([...res.data.list]);
      }
    });
  }, []);

  const onEditChange = (txt: string) => {
    setValue(txt);
  };

  const onSelectChange = (txt: string) => {
    let _value = '';
    let _recordId = '';
    MeetingApi.getRecordList(txt).then((res) => {
      if (res.successed) {
        _recordId = res.data.list[0]?.id || '';
        _value = res.data.list[0]?.content || '';
      }
      setMeetingId(txt);
      setValue(_value);
      setRecordId(_recordId);
    });
  };

  const onSave = () => {
    const param: any = {};
    if (recordId !== '') {
      param.id = recordId;
    } else {
      delete param.id;
    }
    param.meeting_id = meetingId;
    param.content = value;
    MeetingApi.addRecord(param).then((res) => {
      if (res.successed && !res.data?.code) {
        console.log('success');
        message.success('保存成功');
      }
    });
  };

  const webhookContent = () => {
    return (
      <>
        <div className="pb-2">
          <Select
            style={{ width: '200px' }}
            onChange={(txt: string) => {
              webhookRef.current = txt;
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
            onSendDingding();
          }}
        >
          发送
        </Button>
      </>
    );
  };

  const onSendDingding = async () => {
    const param = {
      title: '会议纪要',
      message: value,
      mentions: [],
      webhook: webhookRef.current,
    };
    const res = await DingTalkApi.send(param);
    if (res.successed && !res.data?.code) {
      message.success('已发送');
      setIsSend(false);
    }
  };

  return (
    <>
      <div className="pb-2 flex items-center">
        <div className="flex-1">
          选择会议：
          <Select style={{ width: '280px' }} onChange={onSelectChange}>
            {options.map((item: any) => (
              <Option value={item.key} key={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Popover
            content={webhookContent}
            title="选择群组"
            trigger="click"
            placement="top"
            visible={isSend}
            onVisibleChange={(b) => {
              setIsSend(b);
            }}
          >
            <Button>发送到钉钉</Button>
          </Popover>
        </div>
        <div className="ml-2">
          <Button type="primary" onClick={onSave}>
            保存
          </Button>
        </div>
      </div>
      <div style={{ height: 'calc(100% - 42px)' }}>
        <MdEdit value={value} onChange={onEditChange} />
      </div>
    </>
  );
};

export default MeetingRecord;

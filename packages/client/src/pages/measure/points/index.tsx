import React from 'react';
import { MetadataForm } from 'ronds-metadata';
import { Split } from 'ronds-react-ui';
import { FormInstance } from 'antd/lib/form';
import UserApi from '@/api/UserApi';
import PointsRuleApi from '@/api/PointsRuleApi';
import CommonTabs from '@/comps/CommonTabs';
import { Button, message } from 'antd';
import UserPointsList from './comps/UserPointsList';
import UserPointsSummaryList from './comps/UserPointsSummaryList';

const SCHEMA = [
  {
    id: 'UpdatePointsRule',
    type: 'object',
    properties: [
      {
        id: 'users',
        type: 'enum',
        enum: [],
        fields: [
          {
            type: 'ref',
            refId: 'Rule.Form',
            id: 'Rule.Form',
            value: {
              label: '选择用户',
              require: true,
              mode: 'multiple',
            },
          },
        ],
      },
      {
        id: 'rule',
        type: 'enum',
        enum: [],
        fields: [
          {
            type: 'ref',
            refId: 'Rule.Form',
            id: 'Rule.Form',
            value: {
              label: '选择规则',
              require: true,
            },
          },
        ],
      },
    ],
  },
];

const PointsManage = () => {
  const formRef = React.useRef<FormInstance>();

  const childRef = React.useRef<any>();
  const childSummaryRef = React.useRef<any>();

  const [userOption, setUserOption] = React.useState<{ key: string; value: string }[]>([]);
  const [ruleOption, setRuleOption] = React.useState<{ key: string; value: string }[]>([]);

  const [curTab, setCurTab] = React.useState<string>('summary');

  const tabs = [
    { key: 'summary', label: '积分总数', content: <UserPointsSummaryList cRef={childSummaryRef} /> },
    {
      key: 'points',
      label: '积分明细',
      content: <UserPointsList cRef={childRef} />,
    },
  ];

  React.useEffect(() => {
    UserApi.getList({}).then((res) => {
      if (res.successed) {
        console.log(res);
        const _userOption = res.data.list.map((it: any) => {
          return { key: it.id, value: it.nameCN };
        });
        setUserOption([..._userOption]);
      }
    });
  }, []);

  React.useEffect(() => {
    PointsRuleApi.getList({}).then((res) => {
      if (res.successed) {
        console.log(res);
        const _rulesOption = res.data.list.map((it: any) => {
          return { key: it.id, value: it.name };
        });
        setRuleOption([..._rulesOption]);
      }
    });
  }, []);

  const onFinish = async (values: any) => {
    const res = await UserApi.savePoints(values);
    if (res.successed) {
      message.success('保存成功');
      childSummaryRef.current.onSearch();
      formRef.current?.resetFields();
    }
  };

  return (
    <>
      <Split gutterSize={5} sizes={[20, 80]} direction="horizontal">
        <div className="pr-2">
          <MetadataForm
            schema={SCHEMA}
            initEnumValue={{ users: userOption, rule: ruleOption }}
            getFormInstance={(from: FormInstance) => {
              formRef.current = from;
            }}
            onFinish={onFinish}
          />

          <div className="pt-2">
            <Button
              type="primary"
              block
              onClick={() => {
                if (formRef.current) formRef.current.submit();
              }}
            >
              保存
            </Button>
          </div>
        </div>
        <div className="pl-3">
          <CommonTabs
            tabs={tabs}
            curTab={curTab}
            onTabChange={(key: string) => {
              setCurTab(key);
            }}
          />
        </div>
      </Split>
    </>
  );
};

export default PointsManage;

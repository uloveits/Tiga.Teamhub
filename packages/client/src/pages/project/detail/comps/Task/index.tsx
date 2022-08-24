/**
 * @Author: wangxian
 * @Date: 2022-08-20 09:46:19
 * @LastEditTime: 2022-08-23 16:47:17
 */

import ProjectApi from '@/api/ProjectApi';
import { recursiveGrouping } from '@/utils';
import { Button, Popover, Tag } from 'antd';
import React from 'react';
import { Table } from 'ronds-react-ui';
import CreateOrUpdateModal from '../CreateOrUpdate';
import GroupSetting from './comps/GroupSetting';

interface IProjectTaskProps {
  projectId: number;
}
const ProjectTask = (props: IProjectTaskProps) => {
  const { projectId } = props;

  const [list, setList] = React.useState<any[]>([]);
  const [groupList, setGroupList] = React.useState<any[]>();

  const [visible, setVisible] = React.useState<boolean>(false);
  const [isModal, setIsModal] = React.useState<boolean>(false);

  const [groupSetting, setGroupSetting] = React.useState<{ name: string; order: string }[]>([{ name: 'stage', order: 'ASC' }]);
  const [expandedRowKeys, setExpandedRowKeys] = React.useState<string[]>([]);

  const getTaskList = React.useCallback(async () => {
    const param = { projectId };

    const res = await ProjectApi.getMyProjectTaskList(param);
    if (res.successed) {
      setList([...res.data]);
    }
  }, [projectId]);

  React.useEffect(() => {
    getTaskList();
  }, [projectId, getTaskList]);

  const onProcessData2Group = React.useCallback((groups: { name: string; order: string }[], data: any[]) => {
    console.log(groups);
    const _groupList: any[] = data;

    const res = recursiveGrouping(
      _groupList,
      groups.map((it) => it.name)
    );

    console.log('recursiveGrouping', res);

    setGroupList([...res.data]);
    setExpandedRowKeys([...res.id]);
  }, []);

  React.useEffect(() => {
    if (groupSetting.length > 0 && groupSetting[0].name) {
      onProcessData2Group(groupSetting, list);
    } else {
      setGroupList(undefined);
    }
  }, [groupSetting, onProcessData2Group, list]);

  const columns: any[] = React.useMemo(() => {
    const res = [
      {
        title: '任务名称',
        dataKey: 'name',
        width: 100,
        sortable: true,
        colSpan: (args: { rowData: any; rowIndex: number }) => {
          console.log(args);
          if (args.rowData?.children) {
            return 6;
          }
          return 1;
        },
        render: (val: string, record: any) => {
          if (record?.children && record.children.length > 0) {
            return (
              <>
                <Tag color="volcano">
                  {val} <span style={{ color: '#f20' }}>( {record.children.length} )</span>
                </Tag>
              </>
            );
          }
          return val;
        },
      },
      {
        title: '阶段',
        dataKey: 'stage',
        width: 60,
        render: (val: string) => {
          if (val) {
            return <Tag color="#108ee9">{val}</Tag>;
          }
          return '';
        },
      },
      {
        title: '完成率',
        dataKey: 'completeRate',
        width: 60,
      },
      {
        title: '开始时间',
        dataKey: 'startTime',
        width: 40,
      },
      {
        title: '结束时间',
        dataKey: 'endTime',
        width: 40,
      },
      {
        title: '责任人',
        dataKey: 'assignee',
        width: 65,
        sortable: true,
        render: (val: string, record: any) => {
          if (val) {
            return val.split(',').map((it, idx) => (
              <Tag key={it} color={record.assignee_color.split(',')[idx]}>
                {it}
              </Tag>
            ));
          }
          return '';
        },
      },
      {
        title: '迭代周',
        dataKey: 'iteration',
        width: 65,
        sortable: true,
        render: (val: string) => {
          if (val) {
            return <Tag color="red">{val}</Tag>;
          }
          return '';
        },
      },
      {
        title: '功能分类',
        dataKey: 'classification',
        width: 65,
        sortable: true,
        render: (val: string) => {
          if (val) {
            return <Tag color="#87d068">{val}</Tag>;
          }
          return '';
        },
      },
      {
        title: '创建人',
        dataKey: 'creator',
        width: 65,
      },
    ];

    return res;
  }, []);

  const onVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  return (
    <>
      <div className="pb-2">
        <Button
          type="primary"
          onClick={() => {
            setIsModal(true);
          }}
        >
          新建
        </Button>
        <Popover
          placement="bottom"
          content={
            <GroupSetting
              value={groupSetting}
              groupBy={columns.map((it) => {
                return { label: it.title, value: it.dataKey };
              })}
              onFinish={(data: any[]) => {
                console.log('data', data);
                setGroupSetting([...data]);
                setVisible(false);
              }}
            />
          }
          trigger="click"
          visible={visible}
          onVisibleChange={onVisibleChange}
        >
          <Button style={{ marginLeft: '10px' }} type="dashed">
            {groupSetting.length > 0 ? `${groupSetting.length}个分组` : '设置分组'}
          </Button>
        </Popover>
      </div>
      <div style={{ height: 'calc(100% - 40px)' }}>
        <Table
          columns={columns}
          dataSource={groupList || list}
          autoIndex={false}
          rowKey="id"
          expandColumnKey="name"
          defaultExpandAllRows={true}
          expandedRowKeys={expandedRowKeys}
          // onColumnSort={onColumnSort}
          // sortState={{ [sortColumn.key]: sortColumn.order } as any}
          onRowExpand={(args: { expanded: boolean; rowData: any; rowIndex: number; rowKey: any }) => {
            const record = args.rowData;
            if (args.expanded) {
              const _expandedRowKeys = expandedRowKeys;
              _expandedRowKeys.push(record.id);
              setExpandedRowKeys([...expandedRowKeys]);
            } else {
              const _expandedRowKeys = expandedRowKeys;
              const data = _expandedRowKeys.filter((it) => it !== record.id);
              setExpandedRowKeys([...data]);
            }
          }}
          // rowRenderer={onRowRenderer}
          rowClassName={(args: any) => {
            // console.log('rowClassName', args);

            // const _rowData = args.rowData;

            // if (focusIds && focusIds.findIndex((v) => v === _rowData.id) > -1 && streamRef.current[_rowData?.datasourceId]) {
            //   streamRef.current[_rowData?.datasourceId]?.next({ type: 'activePoint', payload: _rowData.result?.position });
            // }
            // if (selectedRowIds.findIndex((v) => v === _rowData.id) > -1 || (focusIds && focusIds.findIndex((v) => v === _rowData.id) > -1)) {
            //   return 'table-row-selected';
            // }

            return '';
          }}
          rowEventHandlers={{
            onClick: (args: { rowData: any; rowIndex: number; rowKey: React.ReactText; event: any }) => {
              // onRowClick({ ...args.rowData });
            },
          }}
        />
      </div>
      <CreateOrUpdateModal
        isModal={isModal}
        onCancel={() => {
          setIsModal(false);
        }}
      />
    </>
  );
};

export default ProjectTask;

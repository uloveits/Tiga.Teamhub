/*
 * @Author: wangxian
 * @Date: 2022-08-20 09:46:19
 * @LastEditTime: 2022-08-22 14:56:42
 */

import ProjectApi from '@/api/ProjectApi';
import { Button, Tag } from 'antd';
import React from 'react';
import { Table } from 'ronds-react-ui';

interface IProjectTaskProps {
  projectId: number;
}
const ProjectTask = (props: IProjectTaskProps) => {
  const { projectId } = props;

  const [list, setList] = React.useState<any[]>([]);

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
                {val} <span style={{ color: '#f20' }}>( {record.children.length} )</span>
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
        render: (val: string) => {
          if (val) {
            return val.split(',').map((it) => (
              <Tag key={it} color="#f50">
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

  return (
    <>
      <div className="pb-2">
        <Button type="primary">新建</Button>
      </div>
      <div style={{ height: 'calc(100% - 40px)' }}>
        <Table
          rowHeight={40}
          columns={columns}
          dataSource={list}
          autoIndex={false}
          rowKey="id"
          expandColumnKey="name"
          defaultExpandAllRows={true}
          // expandedRowKeys={expandedRowKeys}
          // onColumnSort={onColumnSort}
          // sortState={{ [sortColumn.key]: sortColumn.order } as any}
          onRowExpand={(args: { expanded: boolean; rowData: any; rowIndex: number; rowKey: any }) => {
            // const record = args.rowData;
            // if (args.expanded) {
            //   const _expandedRowKeys = expandedRowKeys;
            //   _expandedRowKeys.push(record._rowKey_);
            //   setExpandedRowKeys([...expandedRowKeys]);
            // } else {
            //   const _expandedRowKeys = expandedRowKeys;
            //   const data = _expandedRowKeys.filter((it) => it !== record._rowKey_);
            //   setExpandedRowKeys([...data]);
            // }
          }}
          // rowRenderer={onRowRenderer}
          rowClassName={(args: any) => {
            console.log('rowClassName', args);

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
    </>
  );
};

export default ProjectTask;

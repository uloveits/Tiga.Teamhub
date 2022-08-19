import React from 'react';
import { CrudTable, ViewStateTableModel } from 'ronds-react-ui';
import { ILoadDataRes, ITableQuery } from 'ronds-react-ui/es/provider/models/ViewStateTableModel';
import { ISchema } from '@formily/antd';
import UserApi from '@/api/UserApi';

interface IUserPointsListProps {
  cRef?: any;
}
const UserPointsList = (props: IUserPointsListProps) => {
  const { cRef } = props;

  const model = React.useMemo(() => {
    return new UserPointsListModel();
  }, []);

  React.useImperativeHandle(cRef, () => ({
    // 暴露给父组件的方法
    onSearch: () => {
      model.getData();
    },
  }));

  const columns: any[] = [
    {
      title: tr('姓名'),
      dataKey: 'userName',
      width: 70,
      render: (val: any, record: any) => {
        return record.to_users.nameCN;
      },
    },
    {
      title: tr('制度名称'),
      dataKey: 'rules',
      width: 80,
      render: (val: any, record: any) => {
        return record.to_points.name;
      },
    },
    {
      title: tr('积分'),
      dataKey: 'score',
      width: 80,
      render: (val: any, record: any) => {
        return record.to_points.score;
      },
    },
    {
      title: tr('创建时间'),
      dataKey: 'createTime',
      width: 80,
    },
    {
      title: tr('更新时间'),
      dataKey: 'updateTime',
      width: 80,
    },
  ];
  const querySchema: ISchema = React.useMemo<ISchema>(() => {
    const schema: ISchema = {
      type: 'object',
      properties: {
        name_cn: {
          type: 'string',
          title: tr('姓名'),
        },
        tags: {
          type: 'string',
          title: tr('制度名称'),
        },
      },
    };
    return schema;
  }, []);
  const getAddBtn = () => {
    return <></>;
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
    </>
  );
};

export default UserPointsList;

class UserPointsListModel extends ViewStateTableModel<any, any> {
  public async loadData(sourceData: ITableQuery<any>): Promise<ILoadDataRes<any>> {
    const reqData: any = this.getPageArgs(sourceData);

    const filterData: any = {
      keyName: '',
      keyTags: '',
    };

    if (sourceData.pageSize) {
      filterData.size = reqData.maxResultCount;
      filterData.page = sourceData.pageNumber || 1;
    }
    if (sourceData.args.name_cn) {
      filterData.keyName = sourceData.args.name_cn;
    }
    if (sourceData.args.tags) {
      filterData.keyTags = sourceData.args.tags;
    }
    // 调用
    const res = await UserApi.getPointsList(filterData);

    if (res.successed) {
      return {
        total: res.data.total || 0,
        data: res.data.list,
      };
    }

    return [];
  }
}

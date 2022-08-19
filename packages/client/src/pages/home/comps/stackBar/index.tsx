/*
 * @Author: your name
 * @Date: 2021-12-07 16:56:00
 * @LastEditTime: 2021-12-07 17:05:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Happy.Points.Client\src\pages\home\comps\stackBar\index.tsx
 */

import UserApi from '@/api/UserApi';
import PointsRuleApi from '@/api/PointsRuleApi';
import StackedBar from '@/comps/Charts/stackBar';
import React from 'react';
import { Spin } from 'antd';

const MyStackBar = () => {
  const [data, setData] = React.useState<any>([]);
  const [tags, setTags] = React.useState<any>([]);

  React.useEffect(() => {
    UserApi.getPointsListCharts().then((res) => {
      if (res.successed) {
        setData([...res.data]);
      }
    });
    PointsRuleApi.getTags().then((res) => {
      if (res.successed) {
        setTags(res.data);
        console.log(res.data);
      }
    });
    console.log('123');
  }, []);

  if (data.length === 0 || tags.length === 0) return <Spin />;

  return (
    <>
      <StackedBar
        seriesType={tags}
        x={data}
        y={data.map((v: any) => {
          return v.username;
        })}
      />
    </>
  );
};

export default MyStackBar;

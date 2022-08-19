/*
 * @Author: your name
 * @Date: 2021-12-07 16:56:00
 * @LastEditTime: 2021-12-16 15:45:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Happy.Points.Client\src\pages\home\comps\stackBar\index.tsx
 */

import React from 'react';
import { Spin } from 'antd';
import BackGroundBar from '../../../../comps/Charts/BackGroundBar';
import UserApi from '../../../../api/UserApi';

const MyBackGroundBar = () => {
  const [data, setData] = React.useState<any>([]);

  React.useEffect(() => {
    UserApi.getPointsCountChart().then((res) => {
      if (res.successed) {
        setData([...res.data.list]);
      }
    });
  }, []);

  if (data.length === 0) return <Spin />;

  return (
    <>
      <BackGroundBar
        seriesData={data.map((v: any) => {
          return v.total;
        })}
        xData={data.map((v: any) => {
          return v.userName;
        })}
      />
    </>
  );
};

export default MyBackGroundBar;

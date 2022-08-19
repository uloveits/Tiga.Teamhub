/*
 * @Author: your name
 * @Date: 2021-12-07 16:56:00
 * @LastEditTime: 2021-12-07 17:05:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Happy.Points.Client\src\pages\home\comps\stackBar\index.tsx
 */

import React from 'react';
import BaseChart from '../BaseCharts';

interface IBackGroundBarProps {
  seriesData: any[];
  xData: any[];
}

const defaultOption = {
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
    },
  ],
};
const BackGroundBar = (props: IBackGroundBarProps) => {
  const { seriesData = [], xData = [] } = props;

  const option = React.useMemo(() => {
    const _option: any = defaultOption;
    if (seriesData.length > 0) {
      _option.series[0].data = seriesData;
    }

    if (xData.length > 0) {
      _option.xAxis.data = xData;
    }

    return _option;
  }, [seriesData, xData]);
  return (
    <>
      <BaseChart option={option} />
    </>
  );
};

export default BackGroundBar;

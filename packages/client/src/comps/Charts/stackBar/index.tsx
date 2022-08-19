/*
 * @Author: wangxian
 * @Date: 2021-12-07 16:34:54
 * @LastEditTime: 2021-12-07 17:00:40
 * @LastEditors: Please set LastEditors
 * @FilePath: \Happy.Points.Client\src\comps\Charts\StackedBar\index.tsx
 */

import React from 'react';
import BaseChart from '../BaseCharts';

interface IStackedBarProps {
  seriesType: string[];
  y: any[];
  x: any[];
}

const defaultOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: [],
  },
  series: [],
};
const StackedBar = (props: IStackedBarProps) => {
  const { seriesType = [], y = [], x = [] } = props;

  const option = React.useMemo(() => {
    const _option: any = defaultOption;
    if (y.length > 0) {
      _option.yAxis.data = y;
    }

    if (seriesType.length > 0 && x.length > 0) {
      const _series = [];
      for (let i = 0; i < seriesType.length; i++) {
        const obj = {
          name: seriesType[i],
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: x.map((it) => {
            if (it[seriesType[i]]) {
              return it[seriesType[i]];
            }
            return 0;
          }),
        };
        _series.push(obj);
      }
      _option.series = _series;
    }

    return _option;
  }, [seriesType, y, x]);

  return (
    <>
      <BaseChart option={option} />
    </>
  );
};

export default StackedBar;

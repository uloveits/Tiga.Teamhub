/*
 * @Author: wangxian
 * @Date: 2021-12-07 16:28:38
 * @LastEditTime: 2021-12-16 16:33:38
 * @LastEditors: Please set LastEditors
 * @FilePath: \Happy.Points.Client\src\comps\Charts\BaseCharts\index.tsx
 */

import React from 'react';
import * as echarts from 'echarts';

interface IBaseChartProps {
  option: any;
}

const BaseChart = (props: IBaseChartProps) => {
  const { option } = props;
  const chartRef = React.useRef<any>();
  const divRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    if (!divRef.current) return;
    chartRef.current = echarts.init(divRef.current);
  }, []);

  React.useEffect(() => {
    if (option && chartRef.current) {
      option && chartRef.current.setOption(option as any);
    }
  }, [option]);

  return (
    <>
      <div ref={divRef as any} style={{ width: '100', height: '100%' }} />
    </>
  );
};
export default React.memo(BaseChart);

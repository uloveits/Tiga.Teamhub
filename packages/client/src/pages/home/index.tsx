/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:42
 * @LastEditTime: 2022-09-13 15:44:45
 */

import React from 'react';
import Plot from 'react-plotly.js';
import { AutoSize } from 'ronds-react-ui';
import phm_demo_ha from './phm_demo_ha.json';
import phm_demo_la from './phm_demo_la.json';

const Home = () => {
  const [tickvals, setTickvals] = React.useState<number[]>([]);
  const [ticktext, setTicktext] = React.useState<string[]>([]);

  React.useEffect(() => {
    console.log('phm_demo_ha', phm_demo_ha);
    console.log('phm_demo_la', phm_demo_la);
    const _chartData: any = phm_demo_ha;
    const xLength = (phm_demo_ha as any).x.length;
    const tickNumber = [0, 1, 2, 3, 4];
    const aver = Math.round(xLength / tickNumber.length);
    const _tickvals = tickNumber.map((it: number) => it * aver);
    const _ticktext = _tickvals.map((it: number, idx: number) => {
      const val = _chartData.x[it];
      if (idx === 0) {
        return _chartData.x[0]?.substring(0, 16);
      }
      return val?.substring(5, 16);
    });
    setTickvals([..._tickvals, xLength - 1]);
    setTicktext([..._ticktext, (phm_demo_ha as any).x[xLength - 1]]);
  }, []);

  const onPlotClick = (e: any) => {
    console.log(e);
    console.log(e, e.points[0].x, (phm_demo_ha as any).wid[e.points[0].x]);
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <AutoSize>
        {({ width, height }) => {
          return (
            <div className="flex">
              <div>
                <Plot
                  data={[
                    {
                      y: (phm_demo_ha as any).y,
                      z: (phm_demo_ha as any).z,
                      text: (phm_demo_ha as any).x,
                      type: 'heatmap',
                      // mode: 'lines+markers',

                      hovertext: (phm_demo_ha as any).x,
                      hovertemplate: 'text=%{text}<br>y=%{y}<extra></extra>',
                    },
                  ]}
                  layout={{
                    title: 'phm_demo_ha.json(log)',
                    width: width / 2,
                    // margin: { t: 0, r: 0, l: 0, b: 0 },
                    height: 400,
                    yaxis: { type: 'log' },
                    xaxis: {
                      tickvals,
                      tickmode: 'array',
                      ticktext,
                    },
                  }}
                  config={{ displayModeBar: false, doubleClick: 'reset+autosize' }}
                  onClick={onPlotClick}
                />
                <Plot
                  data={[
                    {
                      // x: (phm_demo_ha as any).x,
                      y: (phm_demo_ha as any).y,
                      z: (phm_demo_ha as any).z,
                      type: 'heatmap',
                    },
                  ]}
                  layout={{ title: 'phm_demo_ha.json(linear)', width: width / 2, height: 400, yaxis: { type: 'linear' } }}
                  config={{ displayModeBar: false, doubleClick: 'reset+autosize' }}
                />
              </div>
              <div>
                <Plot
                  data={[
                    {
                      // x: (phm_demo_la as any).x,
                      y: (phm_demo_la as any).y,
                      z: (phm_demo_la as any).z,
                      type: 'heatmap',
                    },
                  ]}
                  layout={{ title: 'phm_demo_la.json(log)', width: width / 2, height: 400, yaxis: { type: 'log' } }}
                  config={{ displayModeBar: false, doubleClick: 'reset+autosize' }}
                />
                <Plot
                  data={[
                    {
                      // x: (phm_demo_la as any).x,
                      y: (phm_demo_la as any).y,
                      z: (phm_demo_la as any).z,
                      type: 'heatmap',
                    },
                  ]}
                  layout={{ title: 'phm_demo_la.json(linear)', width: width / 2, height: 400, yaxis: { type: 'linear' } }}
                  config={{ displayModeBar: false, doubleClick: 'reset+autosize' }}
                />
              </div>
            </div>
          );
        }}
      </AutoSize>
    </div>
  );
};

export default Home;

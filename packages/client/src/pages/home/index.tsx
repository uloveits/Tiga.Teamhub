/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:42
 * @LastEditTime: 2022-09-09 14:04:30
 */

import React from 'react';
import Plot from 'react-plotly.js';
import { AutoSize } from 'ronds-react-ui';
import phm_demo_ha from './phm_demo_ha.json';
import phm_demo_la from './phm_demo_la.json';
import Spectrogram from './Spectrogram.json';

const Home = () => {
  React.useEffect(() => {
    console.log('phm_demo_ha', phm_demo_ha);
    console.log('phm_demo_la', phm_demo_la);
    console.log('Spectrogram', Spectrogram);
  }, []);

  const onPlotClick = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <AutoSize>
        {({ width, height }) => {
          return (
            <div className="flex ">
              <div>
                <Plot
                  data={[
                    {
                      // x: (phm_demo_ha as any).x,
                      y: (phm_demo_ha as any).y,
                      z: (phm_demo_ha as any).z,
                      type: 'heatmap',
                    },
                  ]}
                  layout={{ title: 'phm_demo_ha.json(log)', width: width / 2, height: 400, yaxis: { type: 'log' }, xaxis: { type: 'date' } }}
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
                  layout={{ title: 'phm_demo_ha.json(linear)', width: width / 2, height: 400, yaxis: { type: 'linear' }, xaxis: { type: 'date' } }}
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
                  layout={{ title: 'phm_demo_la.json(log)', width: width / 2, height: 400, yaxis: { type: 'log' }, xaxis: { type: 'date' } }}
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
                  layout={{ title: 'phm_demo_la.json(linear)', width: width / 2, height: 400, yaxis: { type: 'linear' }, xaxis: { type: 'date' } }}
                  config={{ displayModeBar: false, doubleClick: 'reset+autosize' }}
                />
              </div>
            </div>
          );
        }}
      </AutoSize>
    </>
  );
};

export default Home;

/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:42
 * @LastEditTime: 2022-09-15 14:10:41
 */

import { Button } from 'antd';
import Plotly from 'plotly.js-dist-min';
import React from 'react';
import moment from 'moment';
import Plot, { Figure } from 'react-plotly.js';
import { AutoSize } from 'ronds-react-ui';
import mel_data from './mel_data.json';

const Home = () => {
  const graphDivRef = React.useRef<HTMLElement>();

  const onInitialized = (figure: Figure, graphDiv: HTMLElement) => {
    console.log('onInitialized', figure, graphDiv);
    graphDivRef.current = graphDiv as any;
  };

  const onPlotClick = (e: any) => {
    console.log(e, mel_data);

    const pointIndex = e.points[0].pointIndex;
    const x = e.points[0].data.x[pointIndex[1]];
    const y = e.points[0].data.y[pointIndex[0]];
    const y2 = (mel_data as any).y[pointIndex[0]];

    console.log('x', x, moment(e.points[0].x).valueOf(), e.points[0].x);
    console.log('y', y, e.points[0].y);
    console.log('log', Math.log(y2), Math.log(y2) * 0.3);
  };

  const onZoom = async () => {
    if (!graphDivRef.current) return;
    debugger;
    Plotly.relayout(graphDivRef.current, {
      'yaxis.autorange': true,
      'xaxis.autorange': true,
    });
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <AutoSize>
        {({ width }) => {
          return (
            <>
              <Button onClick={onZoom}>reset zoom</Button>

              <Plot
                divId="test"
                data={[
                  {
                    x: (mel_data as any).x,
                    y: (mel_data as any).y,
                    z: (mel_data as any).z,
                    type: 'heatmap',
                  },
                ]}
                layout={{
                  title: 'phm_demo_ha.json(log)',
                  width: width / 2,
                  // margin: { t: 0, r: 0, l: 0, b: 0 },
                  height: 400,
                  plot_bgcolor: '#000',
                  yaxis: { type: 'log', dtick: 0.30102999566 },
                  xaxis: {
                    type: 'date',
                    tickformat: '%m-%d %H:%M',
                  },
                  annotations: [
                    {
                      arrowwidth: 1,
                      arrowhead: 0,
                      showarrow: true,
                      x: '2021-09-29 12:00:00',
                      y: Math.log(4096) * 0.30102999566,
                      text: '2,3',
                      font: { color: 'yellow' },
                      ay: 17,
                      ax: -14,
                      valign: 'middle',
                      xanchor: 'left',
                      arrowcolor: 'yellow',
                    },
                  ],
                }}
                config={{
                  displayModeBar: false,
                  doubleClick: 'reset+autosize',
                  edits: {
                    annotationTail: true,
                    shapePosition: false,
                  },
                }}
                onClick={onPlotClick}
                onInitialized={onInitialized}
                // onHover={(e: any) => console.log('onHover', e)}
                // onUnhover={(e: any) => console.log('onUnhover', e)}
                // onSelected={(e: any) => console.log('onSelected', e)}
                onRelayout={(e: any) => console.log('onRelayout', e)}
              />
            </>
          );
        }}
      </AutoSize>
    </div>
  );
};

export default Home;

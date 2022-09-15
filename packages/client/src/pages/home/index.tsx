/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:42
 * @LastEditTime: 2022-09-15 14:10:41
 */

import { Button } from 'antd';
import Plotly from 'plotly.js';
import React from 'react';
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
    console.log(e);
    console.log(e, e.points[0].x, (mel_data as any).extra[e.points[0].x]);
  };

  const onZoom = async () => {
    if (!graphDivRef.current) return;

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
                data={[
                  {
                    x: (mel_data as any).x,
                    y: (mel_data as any).y,
                    z: (mel_data as any).z,
                    type: 'heatmap',
                    // colorscale: [[-1, '#000']],
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
                  // annotations: [
                  //   {
                  //     arrowwidth: 1,
                  //     arrowhead: 0,
                  //     showarrow: true,
                  //     x: '2021-09-19 12:00:00',
                  //     y: 3,
                  //     text: '2,3',
                  //     font: { color: 'yellow' },
                  //     // ay: 0,
                  //     // ax: 0,
                  //     // valign: 'middle',
                  //     // xanchor: 'left',
                  //     arrowcolor: 'yellow',
                  //   },
                  // ],
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

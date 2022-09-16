/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:42
 * @LastEditTime: 2022-09-16 17:09:14
 */

import { Button } from 'antd';
import React from 'react';
import moment from 'moment';
import Plot, { Figure } from 'react-plotly.js';
import { AutoSize } from 'ronds-react-ui';
import { Plotly } from './plotly';
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

    addXLineByValue('123', x, y);
    console.log('x', x, moment(e.points[0].x).valueOf(), e.points[0].x);
    console.log('y', y, e.points[0].y);
  };

  const onZoom = async () => {
    if (!graphDivRef.current) return;
    Plotly.relayout(graphDivRef.current, {
      'yaxis.autorange': true,
      'xaxis.autorange': true,
    });
  };

  const removeShapeById = async (id: string) => {
    if (!graphDivRef.current) return;

    const shapes = (graphDivRef.current as any).layout?.shapes || [];
    let index = shapes.findIndex((p: any) => p.name === id);
    while (index >= 0) {
      Plotly.relayoutex(graphDivRef.current as any, `shapes[${index}]`, 'remove', {
        calc: false,
        layoutReplot: false,
      });
      index = shapes.findIndex((p: any) => p.name === id);
    }
  };

  const addXLineByValue = async (id: string, xValue: number | string, yValue: number) => {
    if (!graphDivRef.current) return;

    const shapesLine = {
      type: 'line',
      yref: 'paper',
      name: id,
      x0: xValue,
      y0: 0,
      x1: xValue,
      y1: 100,
      fillcolor: 'yellow',
      line: {
        color: 'yellow',
        width: 1,
        dash: 'dot',
      },
    };

    const shapesDot = {
      type: 'circle',
      xsizemode: 'pixel',
      ysizemode: 'pixel',
      xanchor: xValue,
      yanchor: yValue,
      x0: -2,
      y0: -2,
      x1: 2,
      y1: 2,
      name: `${id}dot`,
      line: {
        color: 'yellow',
        width: 1,
      },
      fillcolor: 'yellow',
    };

    await removeShapeById(id);
    await removeShapeById(`${id}dot`);

    await Plotly.relayoutex(graphDivRef.current, 'shapes[0]', shapesLine, {
      calc: false,
      layoutReplot: false,
    });

    await Plotly.relayoutex(graphDivRef.current, 'shapes[1]', shapesDot, {
      calc: false,
      layoutReplot: false,
    });

    await addLabelByValue(xValue, yValue);
  };

  const addLabelByValue = async (xValue: number | string, yValue: number) => {
    if (!graphDivRef.current) return;

    // const annotation = {
    //   arrowwidth: 1,
    //   arrowhead: 0,
    //   showarrow: true,
    //   x: xValue,
    //   y: Math.log(yValue) * 0.30102999566,
    //   text: `${xValue},${yValue}`,
    //   // y方向的偏移
    //   ay: 17,
    //   ax: -14,
    //   valign: 'middle',
    //   xanchor: 'left',
    //   font: { color: 'yellow' },
    //   arrowcolor: 'yellow',
    // };

    const a = {
      arrowwidth: 0,
      arrowhead: 0,
      showarrow: false,
      x: xValue,
      font: { color: 'yellow' },
      // 这里y 值得是百分比  0就是最下面 1就是最上面
      y: 1,
      ay: 'top',
      yref: 'paper',
      text: `${moment(xValue).format('YY-MM-DD HH:MM:SS')},${yValue}`,
      valign: 'top',
      xanchor: 'left',
    };

    await Plotly.relayoutex(graphDivRef.current, 'annotations[0]', 'remove', {
      calc: false,
      layoutReplot: false,
    });

    await Plotly.relayoutex(graphDivRef.current, 'annotations[0]', a, {
      calc: false,
      layoutReplot: false,
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
                  width: width / 2,

                  height: 400,
                  plot_bgcolor: '#000',
                  margin: { t: 0, r: 0, l: 60, b: 20 },
                  yaxis: { type: 'log', dtick: 0.30102999566 },
                  xaxis: {
                    type: 'date',
                    tickformat: '%m-%d %H:%M',
                  },
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

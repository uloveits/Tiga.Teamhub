/*
 * @Author: wangxian
 * @Date: 2022-09-16 08:21:52
 * @LastEditTime: 2022-09-16 08:52:46
 */
import * as PlotlyT from 'plotly.js';
// @ts-ignore
import * as P from './lib/plotly.js';

type PlotlyTEx = {
  relayoutex: (root: PlotlyT.Root, astr: any, val?: any, _flags?: any) => Promise<PlotlyHTMLElement>;
};

window.Plotly = P;

export const Plotly: typeof PlotlyT & PlotlyTEx = P;

export type PlotlyHTMLElement = PlotlyT.PlotlyHTMLElement & {
  data?: Partial<PlotlyT.PlotData>[];
  _fullLayout?: any;
  layout?: Partial<PlotlyT.Layout>;
};

export type Options = {
  data: PlotlyT.Data;
  layout?: Partial<PlotlyT.Layout> & Record<string, any>;
  config?: Partial<PlotlyT.Config>;
};

/*
 * @Author: wangxian
 * @Date: 2022-08-20 09:46:19
 * @LastEditTime: 2022-08-20 09:47:15
 */

import React from 'react';
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';

const ProjectTask = () => {
  // 1. 准备数据
  const data = [
    {
      name: '专家标注排序',
      stage: '开发阶段',
      conpleteRate: 80,
      startTime: '2022/08/22',
      endTime: '2022/08/25',
      assignee: '王宪',
      iteration: '8-3',
      classification: '标注分析平台',
      source: '专家标注排序',
    },
    {
      name: '实验管理平台',
      stage: '设计阶段',
      conpleteRate: 80,
      startTime: '2022/08/22',
      endTime: '2022/08/25',
      assignee: '王宪',
      iteration: '8-3',
      classification: '标注分析平台',
      source: '专家标注排序',
    },
  ];

  // 2. 配置数据
  const s2DataCfg = {
    fields: {
      // columns: ['name', 'stage', 'conpleteRate', 'startTime', 'endTime', 'assignee', 'iteration', 'classification', 'source'], // 要展示的列头字段 id 列表
      values: ['name', 'stage', 'conpleteRate', 'startTime', 'endTime', 'assignee', 'iteration', 'classification', 'source'], // 要展示的列头字段 id 列表
      rows: ['stage', 'assignee'],
    },
    meta: [
      // 列头字段对应的元信息，比如展示的中文名
      {
        field: 'name',
        name: '任务名称',
      },
      {
        field: 'stage',
        name: '阶段',
      },
      {
        field: 'conpleteRate',
        name: '完成率',
      },
      {
        field: 'startTime',
        name: '开始时间',
      },
      {
        field: 'endTime',
        name: '完成时间',
      },
      {
        field: 'assignee',
        name: '责任人',
      },
      {
        field: 'iteration',
        name: '迭周',
      },
      {
        field: 'classification',
        name: '功能分类',
      },
      {
        field: 'source',
        name: '需求',
      },
    ],
    data,
  };

  // 3. 添加配置
  const s2Options = {
    width: 800,
    height: 600,
    // hierarchyType: 'tree',
  };
  return (
    <>
      <SheetComponent sheetType="pivot" dataCfg={s2DataCfg} options={s2Options} />
    </>
  );
};

export default ProjectTask;

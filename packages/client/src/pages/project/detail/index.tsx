/*
 * @Author: wangxian
 * @Date: 2022-08-20 09:00:56
 * @LastEditTime: 2022-08-20 10:04:05
 */

import React from 'react';
import { GetRequest } from '@/utils';
import CommonTabs from '@/comps/CommonTabs';

const ProjectFrontend = React.lazy(() => import('./comps/Frontend'));
const ProjectTask = React.lazy(() => import('./comps/Task'));

const ProjectDetail = () => {
  const tabs = [
    { label: '看板', key: 'dashboard', closable: false, content: <ProjectFrontend /> },
    { label: '任务', key: 'task', closable: false, content: <ProjectTask /> },
    { label: '甘特图', key: 'gantt', closable: false, content: <>甘特图</> },
    { label: '成员', key: 'member', closable: false, content: <>成员</> },
    { label: '统计', key: 'statistics', closable: false, content: <>统计</> },
  ];
  const [curTab, setCurTab] = React.useState<string>('dashboard');

  const onTabChange = (key: string) => {
    setCurTab(key);
  };

  React.useEffect(() => {
    const request = GetRequest(window.location.href);
    console.log('request', request);
  });

  return (
    <>
      <CommonTabs name="PHM" tabs={tabs} curTab={curTab} onTabChange={onTabChange} />
    </>
  );
};

export default ProjectDetail;

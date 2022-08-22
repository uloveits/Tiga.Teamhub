/*
 * @Author: wangxian
 * @Date: 2022-08-20 09:00:56
 * @LastEditTime: 2022-08-22 08:22:41
 */

import React from 'react';
import { GetRequest } from '@/utils';
import CommonTabs from '@/comps/CommonTabs';

const ProjectFrontend = React.lazy(() => import('./comps/Frontend'));
const ProjectTask = React.lazy(() => import('./comps/Task'));

const ProjectDetail = () => {
  const [curTab, setCurTab] = React.useState<string>('task');

  const [curName, setCurName] = React.useState<string>('');
  const [projectId, setProjectId] = React.useState<number>();

  const onTabChange = (key: string) => {
    setCurTab(key);
  };

  React.useEffect(() => {
    const request = GetRequest(window.location.href);
    setCurName(request.name);
    setProjectId(request.id);
  }, []);

  const tabs = React.useMemo(() => {
    if (projectId) {
      return [
        { label: '看板', key: 'dashboard', closable: false, content: <ProjectFrontend projectId={projectId} /> },
        { label: '任务', key: 'task', closable: false, content: <ProjectTask projectId={projectId} /> },
        { label: '甘特图', key: 'gantt', closable: false, content: <>甘特图</> },
        { label: '成员', key: 'member', closable: false, content: <>成员</> },
        { label: '统计', key: 'statistics', closable: false, content: <>统计</> },
      ];
    }
    return [];
  }, [projectId]);

  const onTitleClick = () => {
    window.location.href = '#/project/list';
  };

  return (
    <>
      <CommonTabs name={curName} tabs={tabs} curTab={curTab} onTabChange={onTabChange} onTitleClick={onTitleClick} />
    </>
  );
};

export default ProjectDetail;

/*
 * @Author: wangxian
 * @Date: 2022-08-20 09:00:56
 * @LastEditTime: 2022-08-25 18:29:26
 */

import React from 'react';
import { BehaviorSubject } from 'ronds-graph-chart-phm';
import { GetRequest, Guid } from '@/utils';
import CommonTabs from '@/comps/CommonTabs';
import ProjectGantt from './comps/Gantt';

const ProjectFrontend = React.lazy(() => import('./comps/Frontend'));
const ProjectTask = React.lazy(() => import('./comps/Task'));
const TaskDetail = React.lazy(() => import('./comps/Task/comps/TaskDetail'));

const addTabMap = {
  'project:task:detail:{id}': TaskDetail,
};

const ProjectDetail = () => {
  const [curTab, setCurTab] = React.useState<string>('task');

  const [curName, setCurName] = React.useState<string>('');
  const [projectId, setProjectId] = React.useState<number>();

  const lastTabRef = React.useRef<string>('task');
  const firstLoad = React.useRef<boolean>(true);

  const tabsStream = React.useMemo(() => {
    return new BehaviorSubject<{ type: string; payload: any } | undefined>(undefined);
  }, []);

  const onTabChange = (key: string) => {
    lastTabRef.current = key;
    setCurTab(key);
  };

  React.useEffect(() => {
    const request = GetRequest(window.location.href);
    setCurName(decodeURI(request.name));
    setProjectId(request.id);
  }, []);

  // 移除tab
  const onRemoveTab = React.useCallback(
    (key: string) => {
      let newActiveKey = curTab;
      let lastIndex: number = 0;
      tabRef.current.forEach((pane, i) => {
        if (pane.key === key) {
          lastIndex = i - 1;
        }
      });
      const newPanes = tabRef.current.filter((pane) => pane.key !== key);
      if (newPanes.length) {
        if (lastIndex >= 0) {
          newActiveKey = newPanes[lastIndex].key;
        } else {
          newActiveKey = 'main';
        }
      }

      if (lastTabRef.current && lastTabRef.current !== key && tabRef.current.findIndex((pane) => pane.key === lastTabRef.current) > -1) {
        newActiveKey = lastTabRef.current;
      }

      setTabs([...newPanes]);
      tabRef.current = newPanes;
      setCurTab(newActiveKey);
      // 刷新数据
      tabsStream.next({ type: 'onSearch', payload: '' });
    },
    [curTab, tabsStream]
  );

  const onAddTab = React.useCallback(
    (record: any) => {
      console.log('onAddTab==', record);

      const _tabs = tabRef.current;
      let _key: string;
      if (record?.props?.isNewTarget) {
        _key = record.key.replace('{id}', Guid());
      } else {
        _key = record.key.replace('{id}', record?.props?.id);
      }

      const idx = _tabs.findIndex((v) => v.key === _key);

      if (idx === -1) {
        const Comp = addTabMap[record.key] as any;
        // 是否有回调
        if (record?.props?.isCallback) {
          record.props.onChange = onAddTab;
          delete record.props.isCallback;
        }

        if (record?.props?.tabsStream) {
          record.props.tabsStream = tabsStream;
        }

        console.log('record', record, Comp);

        _tabs.push({
          label: record.name,
          key: _key,
          closable: true,
          content: (
            <Comp
              {...record.props}
              onClose={() => {
                onRemoveTab(_key);
              }}
            />
          ),
        });

        console.log('====================', _tabs);

        setTabs([..._tabs]);
        tabRef.current = _tabs;
      }
      setCurTab(_key);
    },
    [tabsStream, onRemoveTab]
  );

  const [tabs, setTabs] = React.useState<any[]>([]);
  const tabRef = React.useRef<any[]>(tabs);

  React.useEffect(() => {
    if (projectId && firstLoad.current) {
      const _tabs = [
        { label: '看板', key: 'dashboard', closable: false, content: <ProjectFrontend projectId={projectId} /> },
        { label: '任务', key: 'task', closable: false, content: <ProjectTask projectId={projectId} onChange={onAddTab} /> },
        { label: '甘特图', key: 'gantt', closable: false, content: <ProjectGantt projectId={projectId} /> },
        { label: '成员', key: 'member', closable: false, content: <>成员</> },
        { label: '统计', key: 'statistics', closable: false, content: <>统计</> },
      ];
      setTabs([..._tabs]);
      tabRef.current = _tabs;
      firstLoad.current = false;
    }
  }, [onAddTab, projectId]);

  const onTitleClick = () => {
    window.location.href = '#/project/list';
  };

  return (
    <>
      <CommonTabs name={curName} tabs={tabs} curTab={curTab} onTabChange={onTabChange} onTitleClick={onTitleClick} onRemoveTab={onRemoveTab} />
    </>
  );
};

export default ProjectDetail;

import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Redirect } from 'react-router';
import memoize from 'memoize-one';
import BaseLayout from '@/comps/layout/Baselayout';
import Login from '@/pages/login';
import Shared from '@/pages/wiki/shared';

import MENUS from './menus.config';

const history = createHashHistory();

export interface IRouterConfig {
  /** 标题 */
  title: string;
  /** 隐藏模块 */
  hidden?: boolean;
  /** 路径 */
  path: string;
  /** 图标 */
  icon?: string;
  /** 模块代码路径 */
  comp?: string;
  /** 子路由 */
  children?: IRouterConfig[];
}

const RouterConfig = () => {
  // 异步加载组件文件
  const importComps = (comp: string | undefined) => {
    return React.lazy(() => import(`@/pages/${comp}`));
  };

  const getRoute = (r: IRouterConfig) => {
    const Item: any = importComps(r.comp);
    const routeProps = {
      key: r.path,
      path: `/${r.path}`,
      exact: true,
      title: r.title,
      component: (props: any) => {
        return <Item {...props} />;
      },
    };
    return <Route {...routeProps} />;
  };

  // 创建路由
  const createRoute = memoize(() => {
    const res: React.ReactElement[] = [];
    MENUS.forEach((r: any) => {
      const _Route = r.children.length === 0 ? getRoute(r) : r.children.map((_r: IRouterConfig) => getRoute(_r));
      res.push(_Route);
    });

    res.push(<Redirect exact from="/" to="/home" />);

    return <Switch>{res}</Switch>;
  });

  const onEnter = (_props: any) => {
    return <BaseLayout pathname={_props.location.pathname}>{createRoute()}</BaseLayout>;
  };

  return (
    <Router history={history}>
      <Route
        render={(props) => {
          return (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/shared" component={Shared} />
              <Route path="/" render={(_props) => onEnter(_props)} />
            </Switch>
          );
        }}
      />
    </Router>
  );
};
export default RouterConfig;

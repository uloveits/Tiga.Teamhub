/*
 * @Author: wangxian
 * @Date: 2022-08-27 11:04:24
 * @LastEditTime: 2022-08-27 11:23:52
 */
import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import BaseLayout from "../comps/layout/Baselayout";
import HomePage from "../pages/home";

export interface IRouterConfig {}

const RouterConfig = () => {
  // 异步加载组件文件
  const importComps = (comp: string | undefined) => {
    return React.lazy(() => import(`@/pages/${comp}`));
  };

  return (
    <HashRouter>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BaseLayout>
    </HashRouter>
  );
};
export default RouterConfig;

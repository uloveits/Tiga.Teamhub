/*
 * @Author: wangxian
 * @Date: 2022-08-27 11:04:24
 * @LastEditTime: 2022-08-29 10:05:35
 */
// import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import BaseLayout from "@/comps/layout/Baselayout";
import HomePage from "@/pages/home";
// import React from "react";
// import { MENUS } from "./config";
import DocsPage from "@/pages/docs";

export interface IRouterConfig {}

const RouterConfig = () => {
  // 异步加载组件文件
  // const importComps = (comp: string | undefined) => {
  //   return React.lazy(() => import(`@/pages/${comp}`));
  // };

  return (
    <BaseLayout>
      <Routes>
        {/* {MENUS.map((it) => (
          <Route path={`/${it.path}`} element={importComps(it.comp) as any} />
        ))} */}

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/help" element={<DocsPage />} />
        <Route path="/readme" element={<DocsPage />} />
      </Routes>
    </BaseLayout>
  );
};
export default RouterConfig;

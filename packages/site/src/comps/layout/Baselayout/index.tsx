/*
 * @Author: wangxian
 * @Date: 2022-08-27 11:12:53
 * @LastEditTime: 2022-08-27 11:34:31
 */
import React from "react";
import { Layout } from "antd";
import MyHeader from "../Header";
import "./index.less";

const { Header, Content } = Layout;

interface IBaseLayoutProps {
  children: React.ReactNode;
}
const BaseLayout = (props: IBaseLayoutProps) => {
  const { children } = props;

  return (
    <Layout className="my-layout">
      <Header>
        <MyHeader />
      </Header>
      <Content className="p-2">{children}</Content>
    </Layout>
  );
};

export default BaseLayout;

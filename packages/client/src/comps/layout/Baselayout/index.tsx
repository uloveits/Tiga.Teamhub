import React from 'react';
import { Layout, Spin } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import './index.less';
import MySider from '../Sider';
import MyHeader from '../Header';
import MyBreadcrumb from '../Breadcrumb';

const { Header, Content, Sider } = Layout;

interface IBaseLayoutProps {
  pathname: string;
  children: React.ReactNode;
}
const BaseLayout = (props: IBaseLayoutProps) => {
  const { children, pathname } = props;

  return (
    <Layout className="my-layout">
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 100,
        }}
      >
        <MySider pathname={pathname} />
      </Sider>
      <Layout className="system-bg" style={{ marginLeft: '90px' }}>
        <Header
          style={{
            background: 'transparent',
            boxShadow: '0 0 18px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <MyHeader />
        </Header>
        <Content style={{ padding: '10px' }}>
          <div style={{ paddingLeft: '10px' }}>
            <MyBreadcrumb pathname={pathname} />
          </div>
          <div className="site-layout-content">
            <React.Suspense fallback={<Spin delay={200} className="global-spin" />}>{children}</React.Suspense>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>皖ICP备19025030号-1 2022 Created by uloveits</Footer>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;

import React from 'react';
import { Layout } from 'antd';
import Logo from '@/public/img/logo.png';

import './index.less';

const { Header } = Layout;

const LoginHeader = () => {
  return (
    <>
      <Header className="login-header" style={{ display: 'flex' }}>
        <div className="left logo">
          <img alt="logo" src={Logo} />
          <h2>工业设备数据管理平台</h2>
        </div>
      </Header>
    </>
  );
};
export default LoginHeader;

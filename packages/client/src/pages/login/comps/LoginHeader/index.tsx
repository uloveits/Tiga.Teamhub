import React from 'react';
import { Layout } from 'antd';
import Logo from '@/public/img/logo.png';

import './index.less';
import { SYSTEM_CONFIG } from '@/UIConfig';

const { Header } = Layout;

const LoginHeader = () => {
  return (
    <>
      <Header className="login-header" style={{ display: 'flex' }}>
        <div className="left logo">
          <img alt="logo" src={Logo} />
          <h2>{SYSTEM_CONFIG.SYSTEM_NAME}</h2>
        </div>
      </Header>
    </>
  );
};
export default LoginHeader;

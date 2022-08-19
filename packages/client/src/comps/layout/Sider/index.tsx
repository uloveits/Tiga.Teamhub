/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:42
 * @LastEditTime: 2022-08-19 17:45:52
 */
import React from 'react';
import logo from '@/public/img/logo.png';
import { SYSTEM_CONFIG } from '@/UIConfig';
import MyMenu from '../Menu';
import './index.less';

interface IMySiderProps {
  pathname: string;
}
const MySider = (props: IMySiderProps) => {
  const { pathname } = props;
  return (
    <>
      {/* logo部分 */}
      <div className="my-sider-logo">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img style={{ width: '35px', height: '35px' }} src={logo} alt="logo" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ color: '#fff', fontSize: '12px' }}>{SYSTEM_CONFIG.LOGO_NAME}</div>
        </div>
      </div>
      {/* 菜单部分 */}
      <div>
        <MyMenu pathname={pathname} />
      </div>
    </>
  );
};

export default MySider;

/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:42
 * @LastEditTime: 2022-08-19 18:14:10
 */
import React from 'react';
import logo from '@/public/img/logo.png';
import { Avatar, Dropdown, Menu } from 'antd';
import Separation from '@/comps/common/Separation';
import Icon from '@/comps/Icons';
import { useHistory } from 'react-router';
import './index.less';
import { SYSTEM_CONFIG, USER_CACHE_KEY } from '@/UIConfig';
import { getFromLS } from 'ronds-react-ui';

const MyHeader = () => {
  const history = useHistory();
  const onLogout = () => {
    history.push('/login');
    window.localStorage.removeItem(USER_CACHE_KEY);
    window.sessionStorage.removeItem(USER_CACHE_KEY);
  };

  const content = (
    <Menu>
      <Menu.Item>
        <div>
          <Icon type="fa-user" className="mr-10" />
          <span style={{ fontSize: '16px' }}> {(getFromLS(USER_CACHE_KEY) as any).username}</span>
        </div>
      </Menu.Item>
      <Separation />
      <Menu.Item>
        <div>
          <Icon type="fa-password" className="mr-10" />
          修改密码
        </div>
      </Menu.Item>
      <Separation />
      <Menu.Item>
        <div onClick={onLogout} role="button">
          <Icon type="fa-logout" className="mr-10" />
          退出登录
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="header-bar" style={{ display: 'flex', alignItems: 'center', height: '64px', lineHeight: '64px' }}>
        <div className="logo-img" style={{ paddingLeft: '10px' }}>
          <img style={{ width: '30px', height: '30px' }} src={logo} alt="logo" />
        </div>
        <div className="logo-text" style={{ paddingLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}>
          {SYSTEM_CONFIG.SYSTEM_NAME}
        </div>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          {/* <Tooltip title="数据BI">
            <Button className="header-icon mlr-20" type="link" icon={<Icon type="fa-screen" style={{ fontSize: '24px' }} />} />
          </Tooltip>
          <Tooltip title="最近消息">
            <Button
              className="header-icon mlr-20"
              type="link"
              icon={
                <Badge count={10} overflowCount={999}>
                  <Icon type="fa-news" style={{ fontSize: '24px' }} />{' '}
                </Badge>
              }
            />
          </Tooltip>
          <Tooltip title="最近操作">
            <Button className="header-icon mlr-20" type="link" icon={<Icon type="fa-record" style={{ fontSize: '24px' }} />} />
          </Tooltip> */}
          <Dropdown overlay={content} overlayStyle={{ width: '120px' }} placement="bottomRight" arrow>
            <Avatar className="avatar mlr-20" style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size="large">
              {(getFromLS(USER_CACHE_KEY) as any).username}
            </Avatar>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
export default MyHeader;

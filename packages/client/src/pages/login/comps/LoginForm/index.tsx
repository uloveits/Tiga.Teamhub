/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:42
 * @LastEditTime: 2022-08-19 18:30:24
 */
import React from 'react';
import { Button, Divider, Form, Input } from 'antd';
import { saveToLS, config as SystemConfig } from 'ronds-react-ui';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import './index.less';
import UserApi from '@/api/UserApi';

import { USER_CACHE_KEY } from '@/UIConfig';

const LoginForm = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const history = useHistory();
  const onFinish = async (values: any) => {
    setLoading(true);

    const res = await UserApi.login(values);

    console.log(res);

    if (res.successed) {
      SystemConfig.userToken = `Bearer ${res.data.token}`;
      saveToLS(USER_CACHE_KEY, res.data);

      history.push('/');
    }
    setLoading(false);
  };

  return (
    <>
      <div style={{ height: '60px', lineHeight: '60px', background: '#19386B' }}>账户登录</div>
      <div>
        <Form className="login-form" style={{ width: '100%', padding: 20, height: '100%' }} name="basic" onFinish={onFinish}>
          <div style={{ margin: 24 }}>
            <Form.Item
              name="account"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
              style={{ marginBottom: 24 }}
            >
              <Input
                size="large"
                placeholder="请输入用户名"
                prefix={
                  <>
                    <UserOutlined />
                    <Divider type="vertical" className="account-driver" />
                  </>
                }
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}
              style={{ marginBottom: 30 }}
            >
              <Input.Password
                size="large"
                placeholder="请输入密码"
                prefix={
                  <>
                    <LockOutlined />
                    <Divider type="vertical" className="account-driver" />
                  </>
                }
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 14 }}>
              <Button loading={loading} size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
                登录
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;

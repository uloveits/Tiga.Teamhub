/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:41
 * @LastEditTime: 2022-08-19 17:15:40
 */
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import 'normalize.css/normalize.css';
import { ConfigProvider } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
// import antdZH from 'antd/es/locale/zh_CN';
// import antdEN from 'antd/es/locale/en_US';
import RouterConfig from './router';
import './App.less';
import { stores, StoresContext } from './stores';

const App = () => {
  return (
    <div className="App">
      <Provider {...stores}>
        <ConfigProvider locale={locale}>
          <StoresContext.Provider value={stores}>
            <RouterConfig />
          </StoresContext.Provider>
        </ConfigProvider>
      </Provider>
    </div>
  );
};

// @ts-ignore
window.tr = (name: string) => {
  return name;
};

export default hot(module)(App);

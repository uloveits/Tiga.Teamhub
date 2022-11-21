/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:42
 * @LastEditTime: 2022-09-16 17:09:14
 */

import { Col, Row, Statistic } from 'antd';
import React from 'react';

const Home = () => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="图书数量" value={1128} />
      </Col>
      <Col span={12}>
        <Statistic title="文档数量" value={93} suffix="/ 100" />
      </Col>
    </Row>
  );
};

export default Home;

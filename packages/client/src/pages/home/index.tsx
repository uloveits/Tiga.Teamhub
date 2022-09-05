/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:42
 * @LastEditTime: 2022-09-03 09:24:17
 */

import React from 'react';

const Home = () => {
  React.useEffect(() => {
    const a = 10;
    console.log(a.toPrecision(5));
  }, []);

  return (
    <>
      <div className="flex justify-around ...">123</div>
    </>
  );
};

export default Home;

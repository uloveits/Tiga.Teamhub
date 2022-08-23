/*
 * @Author: wangxian
 * @Date: 2022-02-28 18:58:38
 * @LastEditTime: 2022-08-23 08:30:43
 */
import React from 'react';
import DocApi from '@/api/DocApi';

const DemandManage = () => {
  const [list, setList] = React.useState<string[]>([]);

  React.useEffect(() => {
    DocApi.getApiNameList().then((res) => {
      if (res.successed) {
        console.log(res);
        setList([...res.data]);
      }
    });
  }, []);

  const onRouteToHtml = () => {
    (window as any).open('about:blank').location.href = 'http://localhost:2260/html/AnalyseToolController.html';
  };

  return (
    <>
      {list.map((it) => (
        <div role="button" key={it} onClick={onRouteToHtml}>
          {it}
        </div>
      ))}
    </>
  );
};

export default DemandManage;

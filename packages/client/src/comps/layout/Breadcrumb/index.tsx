import MENUS from '@/router/menus.config';
import { Breadcrumb } from 'antd';
import React from 'react';

interface IMyBreadcrumbProps {
  pathname: string;
}
const MyBreadcrumb = (props: IMyBreadcrumbProps) => {
  const { pathname } = props;

  const createBreadcrumb = () => {
    const paths = pathname.split('/').filter((item) => !!item);
    console.log('===paths===');
    console.log(paths);

    const breads: React.ReactNode[] = [];

    paths.forEach((item: string) => {
      const temp = MENUS.find((v) => v.path === item);

      if (temp) {
        breads.push(
          <Breadcrumb.Item key={item}>
            {/* <span className={`fa fa-${temp.icon}`} /> */}
            {temp.title}
          </Breadcrumb.Item>
        );
      }
      if (temp && temp.children.length > 0) {
        const child:any = temp.children.find((_child:any) => _child?.path === pathname.substring(1));

        if (child.title) {
          breads.push(<Breadcrumb.Item key={item}>{child?.title}</Breadcrumb.Item>);
        }
      }
    });
    return breads;
  };
  return (
    <>
      <div style={{ padding: '5px 0' }}>
        <Breadcrumb>{createBreadcrumb()}</Breadcrumb>
      </div>
    </>
  );
};

export default MyBreadcrumb;

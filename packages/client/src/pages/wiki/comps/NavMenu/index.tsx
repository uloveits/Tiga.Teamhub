/*
 * @Author: wangxian
 * @Date: 2022-08-29 13:39:57
 * @LastEditTime: 2022-08-29 16:25:40
 */

import { toTree } from '@/utils';
import { Menu } from 'antd';
import React from 'react';
import './index.less';

interface INavMenuProps {
  list: any[];
  onSelectChange?: (data: any) => void;
}
const NavMenu = (props: INavMenuProps) => {
  const { list, onSelectChange } = props;

  const [items, setItems] = React.useState<any[]>([]);
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const processNavMenuData = React.useCallback((_list: any[]) => {
    const _items = toTree(_list);
    const _keys = _list.map((it) => it.id.toString());
    setItems([..._items]);
    setOpenKeys([..._keys]);
  }, []);

  React.useEffect(() => {
    processNavMenuData(list);
  }, [processNavMenuData, list]);

  const onClick = (data: any) => {
    setSelectedKeys([data.key]);
    const _ = list.find((it) => it.id.toString() === data.key);
    onSelectChange && onSelectChange({ id: _.id, label: _.name });
  };

  const onOpenChange = (keys: string[]) => {
    console.log('onOpenChange', keys);
    setOpenKeys([...keys]);
  };

  return (
    <div className="nav-menu">
      {items.length > 0 && (
        <Menu
          items={items}
          style={{ width: 256 }}
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          inlineIndent={8}
          onOpenChange={onOpenChange}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default NavMenu;

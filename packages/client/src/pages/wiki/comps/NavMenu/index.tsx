/*
 * @Author: wangxian
 * @Date: 2022-08-29 13:39:57
 * @LastEditTime: 2022-08-30 16:15:01
 */

import { toTree } from '@/utils';
import { Button, Input, message, Tree } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import './index.less';
import { DataNode } from 'antd/lib/tree';
import DocApi from '@/api/DocApi';

interface INavMenuProps {
  list: any[];
  typeId?: number;
  onSelectChange?: (data: any) => void;
  onCallback?: () => void;
}
const NavMenu = (props: INavMenuProps) => {
  const { list, typeId, onSelectChange, onCallback } = props;

  const [items, setItems] = React.useState<any[]>([]);
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const selectedNodesRef = React.useRef<any>({});

  const processNavMenuData = React.useCallback((_list: any[]) => {
    const _items = toTree(_list);
    const _keys = _list.map((it) => it.id);
    setItems([..._items]);
    setOpenKeys([..._keys]);
  }, []);

  React.useEffect(() => {
    processNavMenuData(list);
  }, [processNavMenuData, list]);

  const onSelect = (keys: any[], info: any) => {
    console.log('onSelect', keys, info);
    if (info.selected && info.node.key !== 'new') {
      setSelectedKeys([info.node.key]);
      selectedNodesRef.current = info.selectedNodes[0];
      onSelectChange && onSelectChange({ id: info.node.key, label: info.node.title });
    }
  };

  const onOpenChange = (keys: any[], info: any) => {
    console.log('onOpenChange', keys);
    setOpenKeys([...keys]);
  };

  const updateTreeData = (_list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] =>
    _list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const onBlur = async (e: any) => {
    console.log('onBlur', e.target.value);
    if (typeId && e.target.value) {
      const node = selectedNodesRef.current;
      const children = node.children;
      const l = children.length;
      const param = {
        name: e.target.value,
        type: typeId,
        pid: node.key,
        sort: l > 0 ? children[l - 1].sort + 10 : 10,
      };
      const res = await DocApi.saveDocs(param);
      if (res.successed) {
        onCallback && onCallback();
      }
    } else {
      onCallback && onCallback();
    }
  };

  const onAddItem = () => {
    console.log('onAddItem', selectedNodesRef.current);
    const node = selectedNodesRef.current;
    if (node?.key) {
      setItems((origin) =>
        updateTreeData(origin, node.key, [...node.children, { key: 'new', title: <Input size="small" onBlur={onBlur} onPressEnter={onBlur} /> }])
      );
    } else {
      message.warning('请选择添加的节点');
    }
  };

  return (
    <div className="nav-menu">
      <div className="flex items-center pb-2">
        <div className="text-gray-400 flex-1">目录</div>
        <div>
          <Button type="link" icon={<PlusOutlined />} onClick={onAddItem} />
        </div>
      </div>
      <div style={{ height: 'calc(100% - 40px)' }}>
        {items.length > 0 && (
          <Tree
            className="draggable-tree"
            expandedKeys={openKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            draggable
            blockNode
            onExpand={onOpenChange}
            treeData={items}
          />
        )}
      </div>
    </div>
  );
};

export default NavMenu;

/*
 * @Author: wangxian
 * @Date: 2022-08-29 13:39:57
 * @LastEditTime: 2022-09-07 09:07:55
 */

import { toTree } from '@/utils';
import { Input, message, Popconfirm, Tree } from 'antd';
import React from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.less';
import { DataNode } from 'antd/lib/tree';
import DocApi from '@/api/DocApi';
import AuthButton from '@/comps/common/AuthButton';

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
    if (_items[0]?.children && _items[0]?.children.length > 0) {
      setSelectedKeys([_items[0].children[0].id]);
      onSelectChange && onSelectChange({ id: _items[0].children[0].id, label: _items[0].children[0].title });
    }
    // eslint-disable-next-line
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

  const onDeleteItem = async () => {
    const node = selectedNodesRef.current;
    if (node?.key) {
      const res = await DocApi.delDocs(node?.key);
      if (res.successed) {
        onCallback && onCallback();
      }
    } else {
      message.warning('请选择删除的节点');
    }
  };

  const onDrop = async (data: any) => {
    console.log('onDrop', data);
    const param = {
      id: data.dragNode.id,
      pid: data.dropToGap ? data.node.pid : data.node.id,
      sort: data.node.sort + 1,
    };
    const res = await DocApi.saveDocs(param);
    if (res.successed) {
      onCallback && onCallback();
    }
  };

  return (
    <div className="nav-menu">
      <div className="flex items-center pb-2">
        <div className="text-gray-400 flex-1">目录</div>
        <div>
          <Popconfirm placement={'left'} title={tr('确认删除这条数据?')} onConfirm={onDeleteItem} okText={tr('确定')} cancelText={tr('取消')}>
            <AuthButton type="link" icon={<DeleteOutlined />} />
          </Popconfirm>

          <AuthButton type="link" icon={<PlusOutlined />} onClick={onAddItem} />
        </div>
      </div>
      <div style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {items.length > 0 && (
          <Tree
            className="draggable-tree"
            expandedKeys={openKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            draggable
            blockNode
            onExpand={onOpenChange}
            onDrop={onDrop}
            treeData={items}
          />
        )}
      </div>
    </div>
  );
};

export default NavMenu;

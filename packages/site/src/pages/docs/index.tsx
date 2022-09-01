/*
 * @Author: wangxian
 * @Date: 2022-08-29 09:19:07
 * @LastEditTime: 2022-09-01 16:43:59
 */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // markdown 对表格/删除线/脚注等的支持
import MarkNav from "markdown-navbar"; // markdown 目录
import "markdown-navbar/dist/navbar.css";
import "github-markdown-css";
import React from "react";
import SiteApi from "@/api";
import { Empty, Tree } from "antd";
import { toTree } from "@/utils";
import "./index.less";

const DocsPage = () => {
  const [items, setItems] = React.useState<any[]>([]);
  const [openKeys, setOpenKeys] = React.useState<number[]>([]);

  const [selectedKeys, setSelectedKeys] = React.useState<number[]>([]);
  const selectedNodesRef = React.useRef<any>({});

  const [content, setContent] = React.useState<string>("");

  const processNavMenuData = React.useCallback((_list: any[]) => {
    const _items = toTree(_list);
    const _keys = _list.map((it) => it.id);
    setItems([..._items]);
    setOpenKeys([..._keys]);
    if (_items[0].children && _items[0].children.length > 0) {
      setSelectedKeys([_items[0].children[0].id]);
    }
  }, []);

  React.useEffect(() => {
    SiteApi.getDocListByType(1).then((res: any) => {
      if (res.successed) {
        processNavMenuData(res.data);
      }
    });
  }, [processNavMenuData]);

  React.useEffect(() => {
    if (selectedKeys?.length > 0) {
      SiteApi.getDocContent(selectedKeys[0]).then((res: any) => {
        if (res.successed) {
          setContent(res.data?.content);
        }
      });
    }
  }, [selectedKeys]);

  const onSelect = (keys: any[], info: any) => {
    console.log("onSelect", keys, info);
    if (info.selected && info.node.key !== "new") {
      setSelectedKeys([info.node.key]);
      selectedNodesRef.current = info.selectedNodes[0];
    }
  };

  const onOpenChange = (keys: any[], info: any) => {
    setOpenKeys([...keys]);
  };

  return (
    <>
      <div className="flex w-full h-full">
        <div className="h-full p-2 overflow-y-auto nav-menu">
          {items[0]?.children ? (
            <Tree
              expandedKeys={openKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              blockNode
              onExpand={onOpenChange}
              treeData={items[0].children}
            />
          ) : (
            <Empty />
          )}
        </div>
        <div
          className="h-full flex"
          style={{ background: "#fff", width: "100%" }}
        >
          <div className="flex-1 p-6 markdown-body overflow-y-auto">
            <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
          </div>
          <div className="h-full " style={{ width: "200px" }}>
            <MarkNav
              className="h-full w-full"
              source={content}
              ordered={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DocsPage;

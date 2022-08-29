/*
 * @Author: wangxian
 * @Date: 2022-08-29 09:19:07
 * @LastEditTime: 2022-08-29 11:00:17
 */
import { Menu, MenuProps } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // markdown 对表格/删除线/脚注等的支持
import MarkNav from "markdown-navbar"; // markdown 目录
import "markdown-navbar/dist/navbar.css";

type MenuItem = Required<MenuProps>["items"][number];

const DocsPage = () => {
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps["items"] = [
    getItem("Navigation One", "sub1", <MailOutlined />, [
      getItem(
        "Item 1",
        "g1",
        null,
        [getItem("Option 1", "1"), getItem("Option 2", "2")],
        "group"
      ),
      getItem(
        "Item 2",
        "g2",
        null,
        [getItem("Option 3", "3"), getItem("Option 4", "4")],
        "group"
      ),
    ]),

    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Submenu", "sub3", null, [
        getItem("Option 7", "7"),
        getItem("Option 8", "8"),
      ]),
    ]),

    getItem("Navigation Three", "sub4", <SettingOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  const onClick = () => {};

  return (
    <>
      <div className="flex w-full h-full">
        <div
          className="h-full p-2 overflow-y-auto"
          style={{ background: "#F7F7F7", width: "300px" }}
        >
          <Menu
            onClick={onClick}
            style={{ background: "transparent" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </div>
        <div
          className="h-full flex"
          style={{ background: "#fff", width: "100%" }}
        >
          <div className="flex-1 p-6 markdown-body overflow-y-auto">
            <ReactMarkdown children={md.content} remarkPlugins={[remarkGfm]} />
          </div>
          <div className="h-full " style={{ width: "200px" }}>
            <MarkNav
              className="h-full w-full"
              source={md.content}
              ordered={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DocsPage;

const md = {
  content:
    "## \ud83d\udce7 \u4f1a\u8bae\u6982\u89c8\n\n\u25cf \u4f1a\u8bae\u4e3b\u9898\uff1a\u3010\u5934\u8111\u98ce\u66b4\u3011\u6570\u636e\u5de5\u5382\u6570\u636e\u96c6\u6a21\u5757\n\n\u25cf \u4f1a\u8bae\u65f6\u95f4\uff1a2021-12-14 18:50:00\n\n\u25cf \u4f1a\u8bae\u5730\u70b9\uff1a\u8d1d\u53f6\u65af\n\n\u25cf \u53c2\u4f1a\u4eba\u5458\uff1a` @\u738b\u5baa`  `@\u674e\u660a`  `@\u5434\u65b9\u8d35` ` @\u80e1\u98de`  `@\u8d3e\u4e66\u4e1c`  `@\u6c64\u5dde ` `@\u5218\u7acb\u7115`  `@\u91d1\u610f` ` @\u6768\u6770 ` `@\u674e\u5e05`  `@\u6c99\u601d\u5b87`  `@\u6731\u56fd\u519b`  `@\u5218\u6c38`\n\n\n\n## \ud83d\udd17 \u53c2\u8003\u8d44\u6599\n\n\n## \ud83d\udcd1 \u4f1a\u8bae\u8bae\u7a0b\n\n\u25cf \u4e3b\u9898\u8bf4\u660e\n\n\u25cf \u5b50\u8bba\u70b9\uff1a\n\n a. \u5404\u6570\u636e\u6e90\u9700\u6c42\u6536\u96c6\n\n b. \u4ea7\u54c1\u5982\u4f55\u63a8\u5e7f\u843d\u5730\n\n\n\u25cf \u8f6e\u6d41\u53d1\u8a00\n\n\u25cf \u96c6\u4f53\u8ba8\u8bba \n\n\n## \ud83d\udcc1 \u4f1a\u8bae\u8bb0\u5f55\n\n\u25cf  \u5ba2\u6237\u7fa4\u4f53\u8981\u5206\u6e05\u695a\uff0c\u603b\u5171\u52063\u7c7b\u3002\n\u6700\u5927\u7684\u5ba2\u6237\u7fa4\u4f53\u662f\u6211\u4eec\u81ea\u5df1\uff0c\u5176\u6b21\u662f\u5185\u90e8\u5f00\u53d1\u4eba\u5458\uff0c\u6700\u5c11\u7684\u662f\u7b97\u6cd5\u5de5\u7a0b\u5e08\uff0c\u4e13\u5bb6\u4e0d\u4f1a\u7528\u3002\u6570\u636e\u6cbb\u7406\u5de5\u7a0b\u5e08\u3001\u6570\u636e\u7ba1\u7406\u5de5\u7a0b\u5e08\u3001\u6570\u636e\u5f00\u53d1\u5de5\u7a0b\u5e08\uff1b\u7b97\u6cd5\u5de5\u7a0b\u5e08\uff08\u67e5\u627e\u6570\u636e\u3001\u7b97\u6cd5\u4e0a\u7ebf\u7528\uff09 \u63d0\u4f9b\u54ea\u4e9b\u63a5\u53e3 \u5176\u4ed6\u4eba\u8c03\u7528\u901a\u8fc7sdk\u8fde\u63a5\u6570\u636e\u6e90 sdk\u662f\u670d\u52a1\u8fd8\u662fjar\u5305 \u80fd\u4e0d\u80fd\u652f\u6301\u591a\u8bed\u8a00\n\n\u25cf  \u6570\u636e\u5e93\u8fde\u63a5\u5de5\u5177\u57fa\u672c\u529f\u80fd\uff1a\u67e5\u8be2\uff08DML\uff09\u3001\u7ed3\u6784\u76f8\u5173\u7684\uff08DDL\uff09\u3001sql\u6267\u884c\u8ba1\u5212\uff08\u6267\u884c\u65f6\u95f4\u3001\u6267\u884c\u6027\u80fd\u7b49\uff09\u3001\u6570\u636e\u5bfc\u5165\u5bfc\u51fa\uff08\u6570\u636e\u7b80\u5355\u7684\u8fc1\u79fb\uff09\u3001\u6570\u636e\u5907\u4efd\u8fd8\u539f\n\n\u25cf  http\u6e90\u7684\u4f5c\u7528\u662f\u4ec0\u4e48\uff1f\u76ee\u524d\u63d0\u4f9b\u7ed9\u6267\u884c\u5668\u4f7f\u7528\n\n\u25cf \u4e86\u89e3\u7b97\u6cd5\u4e13\u5bb6\u90e8\u95e8\u7684\u5de5\u4f5c\u6d41\u7a0b\uff1a\u7ec4\u7ec7\u8de8\u90e8\u95e8\u4f1a\u8bae\uff0c\u8ba9\u7b97\u6cd5\uff0c\u4e13\u5bb6\u5b9a\u671f\u7ed9\u6211\u4eec\u57f9\u8bad\uff08\u6216\u8005\u53c2\u52a0\u7b97\u6cd5\uff0c\u4e13\u5bb6\u5185\u90e8\u7684\u65b0\u4eba\u57f9\u8bad\uff09\n\n\u25cf  \u6570\u636e\u96c6\u7528\u6237\u4ea4\u4e92\u4f18\u5316\uff1a1.\u5c42\u7ea7\u9884\u89c8 2.\u5e93\u8868\u663e\u793a\u5728\u7edf\u4e00\u9875\u9762 \n\n\u25cf  \u6570\u636e\u96c6\u7684\u8868\u7ed3\u6784\u63cf\u8ff0\u4e0d\u5b8c\u5168\uff1a\u51fd\u6570 \u81ea\u589e\u5e8f\u5217\u7b49\n\n\u25cf  \u6bcf\u4e2a\u6570\u636e\u6e90\u8981\u7a81\u51fa\u91cd\u70b9\uff1asql\u7f16\u8f91\u5668\u6536\u96c6\u6e32\u67d3\u4e0d\u9700\u8981\u5c55\u793a\uff0c\u6570\u636e\u6e90\u70b9\u8fdb\u53bb \u76f4\u63a5\u770b\u5b9e\u4f53\u6570\u636e\n\n\u25cf  \u6743\u9650\u529f\u80fd\uff0c\u63a8\u5e7f\u524d\u63d0\u4ea7\u54c1\u4f18\u5148\u6ee1\u8db3\u81ea\u5df1\u4f7f\u7528 \n\n\u25cf  \u6570\u636e\u96c6\u5c42\u7ea7\u8fc7\u6df1 \u4e0d\u77e5\u9053\u5f53\u524d\u6240\u5904\u7684\u5c42\u7ea7\u662f\u4ec0\u4e48\u4f4d\u7f6e\n\n\u25cf  \u4ea7\u54c1\u7684\u9876\u5c42\u67b6\u6784\u4e0d\u660e\u6670\uff0c\u76ee\u6807\u4e0d\u6e05\u6670\n\n\u25cf  \u6570\u636e\u96c6\u4f7f\u7528\u8303\u56f4\uff1a\u6570\u636e\u7ba1\u7406\uff0c\u63d0\u4f9b\u7ed9\u5176\u4ed6\u6a21\u5757\u8c03\u7528\uff0c\u7b97\u6cd5\u548c\u6570\u636e\u96c6\u5982\u4f55\u4ea4\u4e92\n\n\u25cf  \u5907\u4efd\uff1f\n\n\u25cf \u6570\u636e\u96c6\u7684\u76ee\u6807\uff1a\u7b97\u6cd5\u5de5\u5382\u63d0\u4f9b\u652f\u6491 \u6570\u636e\u6807\u51c6\u5316\u7ba1\u7406  \n\n\u25cf  \u6570\u636e\u6807\u51c6\u7684\u5b9a\u4e49\uff1a\u6c89\u6dc0\u51fa\u884c\u4e1a\u6570\u636e\u89c4\u5219\uff08\u5143\u6570\u636e\u5b9a\u4e49\uff09\n\n\n",
  create_time: "2021-12-16 18:34:44",
  id: "c8f04180-5e5b-11ec-8db3-d45d64f3c800",
  meeting_id: "fcf733ac-5e59-11ec-a4ee-d45d64f3c800",
  update_time: "2021-12-17 18:45:42",
};

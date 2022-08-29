/*
 * @Author: wangxian
 * @Date: 2022-08-29 08:35:23
 * @LastEditTime: 2022-08-29 09:53:44
 */
import { MENUS } from "@/route/config";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const MyMenu = () => {
  return (
    <>
      <div className="text-white flex items-center">
        <Menu mode="horizontal" defaultSelectedKeys={["home"]} theme="dark">
          {MENUS.map(
            (it: any) =>
              !it.hidden && (
                <Menu.Item key={it.path}>
                  <Link to={it.path}>{it.title}</Link>
                </Menu.Item>
              )
          )}
        </Menu>
      </div>
    </>
  );
};

export default MyMenu;

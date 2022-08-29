/*
 * @Author: wangxian
 * @Date: 2022-08-27 11:33:56
 * @LastEditTime: 2022-08-29 10:43:39
 */
import { SYSTEM_CONFIG } from "@/UIConfig";
import logo from "@/public/imgs/logo.png";
import "./index.less";
import MyMenu from "../Menu";

const MyHeader = () => {
  return (
    <div className="my-header flex items-center">
      <div className="logo-img pr-2">
        <img style={{ width: "30px", height: "30px" }} src={logo} alt="logo" />
      </div>
      <div
        className="text-purple-500 font-bold text-xl cursor-pointer"
        onClick={() => {
          window.location.href = "/#/home";
        }}
      >
        {SYSTEM_CONFIG.SITE_NAME}
      </div>
      <div className="ml-20">
        <MyMenu />
      </div>
    </div>
  );
};

export default MyHeader;

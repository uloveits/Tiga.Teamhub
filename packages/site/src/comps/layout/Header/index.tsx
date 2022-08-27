/*
 * @Author: wangxian
 * @Date: 2022-08-27 11:33:56
 * @LastEditTime: 2022-08-27 14:04:56
 */
import { SYSTEM_CONFIG } from "@/UIConfig";

const MyHeader = () => {
  return (
    <div className="flex items-center">
      <div className="text-white text-xl">{SYSTEM_CONFIG.SITE_NAME}</div>

      <div className="text-white ml-5">文档</div>
    </div>
  );
};

export default MyHeader;

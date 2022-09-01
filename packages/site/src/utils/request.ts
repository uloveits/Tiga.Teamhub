/*
 * @Author: wangxian
 * @Date: 2022-09-01 13:52:47
 * @LastEditTime: 2022-09-01 16:13:57
 */

import axios from "axios";
import { message } from "antd";

const getbaseUrl = () => {
  return window.location.origin;
};

const callback = (res: any, resolve: any) => {
  if (res.successed) {
    resolve(res);
  } else {
    if (res.message) {
      message.warn(res.message);
    }
    resolve(res);
  }
};

const httpClient = {
  async get(url: string) {
    try {
      let res = await axios.get(getbaseUrl() + url, {
        headers: {
          // Authorization: "Bearer " + localStorage.getItem(LOCAL_STORAGE.TOKEN),
          "Content-Type": "application/json",
        },
      });
      res = res.data;
      return new Promise((resolve) => {
        callback(res, resolve);
      });
    } catch (err) {
      message.warn("服务器出错");
    }
  },

  async post(url: string, data: any) {
    try {
      let res = await axios.post(getbaseUrl() + url, data, {
        headers: {
          // Authorization: "Bearer " + localStorage.getItem(LOCAL_STORAGE.TOKEN),
          "Content-Type": "application/json",
        },
      });
      res = res.data;
      return new Promise((resolve) => {
        callback(res, resolve);
      });
    } catch (err) {
      message.warn("服务器出错");
    }
  },

  async put(url: string, data: any) {
    try {
      let res = await axios.put(getbaseUrl() + url, data, {
        headers: {
          // Authorization: "Bearer " + localStorage.getItem(LOCAL_STORAGE.TOKEN),
          "Content-Type": "application/json",
        },
      });
      res = res.data;
      return new Promise((resolve, reject) => {
        callback(res, resolve);
      });
    } catch (err) {
      message.warn("服务器出错");
    }
  },

  async delete(url: string) {
    try {
      let res = await axios.delete(getbaseUrl() + url, {
        headers: {
          // Authorization: "Bearer " + localStorage.getItem(LOCAL_STORAGE.TOKEN),
          "Content-Type": "application/json",
        },
      });
      res = res.data;
      return new Promise((resolve, reject) => {
        callback(res, resolve);
      });
    } catch (err) {
      message.warn("服务器出错");
    }
  },
};

export default httpClient;

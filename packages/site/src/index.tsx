/*
 * @Author: wangxian
 * @Date: 2022-08-26 16:45:37
 * @LastEditTime: 2022-08-27 10:29:12
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./public/tailwind/output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

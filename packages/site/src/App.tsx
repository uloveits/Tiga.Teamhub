/*
 * @Author: wangxian
 * @Date: 2022-08-26 16:45:37
 * @LastEditTime: 2022-08-27 11:24:09
 */
import { hot } from "react-hot-loader";
import "./App.less";
import RouterConfig from "./route";

function App() {
  return (
    <div className="App">
      <RouterConfig />
    </div>
  );
}

export default hot(module)(App);

import React from "react";
import { createRoot } from "react-dom/client"; // '/client'からcreateRootをインポート
import App from "./App";

// rootコンテナを取得
const container = document.getElementById("root");

// createRootを使用してrootに対してAppコンポーネントをレンダリング
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

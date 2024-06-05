import React from 'react';
import { createRoot } from 'react-dom/client'; // '/client'からcreateRootをインポート
import App from './App';
import { AuthProvider } from './AuthProvider';

// rootコンテナを取得
const container = document.getElementById('root');

// createRootを使用してrootに対してAppコンポーネントをレンダリング
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

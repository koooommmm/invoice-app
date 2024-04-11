import React from "react";
import { useNavigate } from "react-router-dom"; // ログアウト後のリダイレクト用
import { useAuth } from "../AuthProvider"; // AuthProviderからuseAuthフックをインポート。パスは環境に合わせてください。

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // ログアウト後にログインページにリダイレクト
    } catch (error) {
      console.error("ログアウトに失敗しました。", error);
    }
  };

  return (
    <header>
      <nav className="max-w-5xl mx-auto mt-10">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              請求書
            </span>
          </a>
          {currentUser && ( // currentUserが存在する場合のみログアウトボタンを表示
            <div className="flex items-center lg:order-2">
              <button
                onClick={handleLogout}
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                ログアウト
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

import React from "react";

const Header = () => {
  return (
    <header>
      <nav class="max-w-4xl mx-auto mt-10">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" class="flex items-center">
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              請求書
            </span>
          </a>
          <div class="flex items-center lg:order-2">
            <a
              href="#"
              class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              ログアウト
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

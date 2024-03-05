# ベースイメージとしてNode.jsの公式イメージを使用
FROM node:14

# アプリケーションの作業ディレクトリを指定
WORKDIR /app

# アプリケーションの依存関係ファイルをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# Reactアプリケーションを起動するコマンド
CMD ["npm", "start"]

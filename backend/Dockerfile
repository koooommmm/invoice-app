# ベースイメージ
FROM node:lts

# 作業ディレクトリの設定
WORKDIR /app

# 依存関係ファイルをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# アプリケーションの起動
CMD [ "node", "server.js" ]

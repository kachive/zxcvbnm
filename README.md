# Notice Board Application

掲示板アプリケーション

## 設定方法

1. リポジトリをクローン:
```bash
git clone <repository-url>
```

2. 依存関係をインストール:
```bash
npm install
```

3. 環境変数の設定:
- `.env.example` を `.env` にコピー
- `.env` ファイルに適切な値を設定

4. アプリケーションの起動:
```bash
npm run dev
```

## 環境変数

以下の環境変数が必要です：

- `REACT_APP_COSMOS_ENDPOINT`: Cosmos DB のエンドポイント
- `REACT_APP_COSMOS_KEY`: Cosmos DB のアクセスキー
- `REACT_APP_COSMOS_DATABASE`: データベース名
- `REACT_APP_COSMOS_CONTAINER`: コンテナ名

## 機能

- 通知の作成、編集、削除
- タイトル検索
- 作成日・更新日による絞り込み
- レスポンシブデザイン
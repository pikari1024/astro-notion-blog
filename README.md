# Astro Notion Blog

Notion を CMS として使用する、Astro 製の高速ブログシステムです。

## 特徴

*   **Astro v5**: 最新の Astro フレームワークによる高速なパフォーマンス。
*   **Notion CMS**: 記事の執筆・管理は全て Notion 上で行えます。
*   **React**: UI コンポーネントに React (v18) を使用。
*   **Cloudflare Pages 対応**: エッジでの高速配信と自動デプロイに対応。

## 必要要件

*   Node.js: **v22.11.0** 以上 (Astro v5 の要件および Cloudflare Pages 設定準拠)

## セットアップ

1.  **インストール**
    ```bash
    npm install
    ```

2.  **環境変数の設定**
    プロジェクトルートに `.env` ファイルを作成し、以下の変数を設定してください。
    ```env
    NOTION_API_SECRET=your_notion_api_secret
    DATABASE_ID=your_database_id
    ```
    *   `NOTION_API_SECRET`: Notion インテグレーションのシークレットトークン
    *   `DATABASE_ID`: ブログ記事として使用する Notion データベースの ID

## 開発

ローカル開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで `http://localhost:4321` を開いて確認できます。

## ビルド

本番用の静的ファイルを生成します。

```bash
npm run build
```

生成されたファイルは `dist/` ディレクトリに出力されます。

## デプロイ (Cloudflare Pages)

このプロジェクトは Cloudflare Pages へのデプロイ向けに構成されています。

### Node.js バージョン設定
Cloudflare Pages のビルド環境で Node.js v22.11.0 を使用するように設定済みです。
*   `.node-version`: `22.11.0`
*   `.nvmrc`: `22.11.0`

もしビルドが失敗する場合は、Cloudflare Pages の管理画面で環境変数 `NODE_VERSION` が古いバージョンに固定されていないか確認してください。

### ビルド設定 (推奨)

ビルド時間を短縮し、Notion の更新がないページの再構築をスキップするには、以下の設定を行ってください。

1.  **Build command の変更**
    Cloudflare Pages の設定で `Build command` を以下に変更します。
    ```bash
    npm run build:cached
    ```

2.  **Nx Cloud の設定 (オプション)**
    ビルドキャッシュを永続化するために、[Nx Cloud](https://nx.app/) の利用を推奨します。
    *   Nx Cloud でリポジトリを接続し、アクセストークンを取得。
    *   Cloudflare Pages の環境変数に `NX_CLOUD_ACCESS_TOKEN` を追加。

## ディレクトリ構成

*   `src/`: ソースコード
    *   `components/`: Astro/React コンポーネント
    *   `layouts/`: ページレイアウト
    *   `pages/`: ページルーティング
    *   `lib/`: Notion API クライアントなどのユーティリティ
*   `public/`: 静的アセット
*   `astro.config.mjs`: Astro 設定ファイル
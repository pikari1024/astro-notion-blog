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

## ビルド最適化 (推奨)

Notion コンテンツの取得をキャッシュし、変更があったページのみを再取得することでビルド時間を大幅に短縮します。
本プロジェクトでは、Cloudflare Pages の **Build Cache** 機能を活用する「Cloudflare ネイティブ・キャッシュ戦略」を採用しています。

### 1. Nx Cloud の設定
Nx Cloud を利用してビルドアーティファクトをキャッシュします。
[Nx Cloud](https://nx.app/) にサインアップし、アクセストークンを取得してください。

### 2. 環境変数の追加
`.env` ファイルおよび Cloudflare Pages の環境変数に以下を追加してください。

```env
NX_CLOUD_ACCESS_TOKEN=your_nx_cloud_access_token
```

### 3. Cloudflare Pages の設定 (重要)
Cloudflare Pages のダッシュボードで以下の設定を行ってください。

1.  **Build Cache (ビルドキャッシュ)**: **有効 (Enable)** に設定してください。
    *   これにより `node_modules` がキャッシュされ、Notion のデータも永続化されます。
2.  **Install command**: `npm install` (推奨)
    *   デフォルトの `npm ci` でも動作する可能性がありますが、`npm install` の方がキャッシュ保持の観点で確実です。

### 4. キャッシュ付きビルドの実行

**ローカル / Cloudflare Pages 共通:**

```bash
npm run build:cached
```

このコマンドは以下の処理を順に行います：
1.  `npm run cache:fetch`: Notion からコンテンツを取得（`node_modules/.astro/notion-cache` にキャッシュ）
2.  `nx build`: Astro ビルドを実行（Nx Cloud キャッシュを利用）
3.  `node scripts/save-cache.cjs`: キャッシュを `dist` にバックアップ（保険）

> **Note**: Cloudflare Pages の「Build command」設定も `npm run build:cached` に変更することを推奨します。

## デプロイ (Cloudflare Pages)

このプロジェクトは Cloudflare Pages へのデプロイ向けに構成されています。

### Node.js バージョン設定
Cloudflare Pages のビルド環境で Node.js v22.11.0 を使用するように設定済みです。
*   `.node-version`: `22.11.0`
*   `.nvmrc`: `22.11.0`

## ディレクトリ構成

*   `src/`: ソースコード
    *   `components/`: React/Astro コンポーネント
    *   `layouts/`: ページレイアウト
    *   `pages/`: ページルーティング
    *   `lib/`: Notion API クライアントなどのユーティリティ
*   `public/`: 静的アセット
*   `astro.config.mjs`: Astro 設定ファイル
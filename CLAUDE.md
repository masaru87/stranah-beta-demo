# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## プロジェクト概要

**Stranah** はクラウドインフラの構築をテンプレート化し、専門性や複雑性を排除した自動構築SaaS。
本リポジトリはβ版デモ画面のフロントエンド実装。官公庁向けが主要ターゲット。

## 技術スタック

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui v4** (base-ui ベース — `asChild` 非対応、`render` prop を使用)
- **React Flow** (@xyflow/react) — インフラ構成図の可視化
- **React Hook Form** + **Zod v4** — フォームバリデーション（Zod は `zod/v4` からインポート）
- **Recharts** — コスト分析チャート
- **next-themes** — ダーク/ライトモード
- **Vitest** + **React Testing Library** — 単体/コンポーネントテスト
- **Playwright** — E2Eテスト

## コマンド

```bash
npm run dev          # 開発サーバー起動 (Turbopack)
npm run build        # プロダクションビルド
npm run lint         # ESLint
npm run test         # Vitest (全テスト実行)
npm run test:watch   # Vitest (ウォッチモード)
npm run test:e2e     # Playwright E2Eテスト
npm run test:e2e:ui  # Playwright UI モード
```

## アーキテクチャ

### ディレクトリ構成

```
src/
├── app/
│   ├── (auth)/          # 認証画面 (ログイン, 新規登録, パスワード再設定)
│   │   └── layout.tsx   # 中央寄せレイアウト、サイドバーなし
│   ├── (dashboard)/     # ダッシュボード画面 (ワークスペース, プロジェクト, 環境)
│   │   └── layout.tsx   # サイドバー + ヘッダー付きレイアウト
│   └── layout.tsx       # ルートレイアウト (ThemeProvider, TooltipProvider, Toaster)
├── components/
│   ├── layout/          # AppHeader, AppSidebar
│   ├── ui/              # shadcn/ui コンポーネント (自動生成、手動編集可)
│   └── {domain}/        # ドメイン別コンポーネント (auth, workspace, project, environment, shared)
├── types/               # 型定義 (User, Workspace, Project, Environment, Deploy, Template 等)
├── hooks/               # カスタムフック
├── lib/                 # ユーティリティ (utils.ts: cn() 関数)
├── data/                # モックデータ (JSON)
└── test/                # テストセットアップ
e2e/                     # Playwright E2Eテスト
docs/                    # 要件定義、画面一覧、機能一覧 (CSV/MD)
```

### ルートグループ

- `(auth)` — 認証系画面。サイドバーなし、中央寄せのカードUI
- `(dashboard)` — メイン画面。`SidebarProvider` + `AppSidebar` + `AppHeader` のレイアウト

### 主要ルート (β版スコープ)

| パス | 用途 |
|------|------|
| `/login` | ログイン |
| `/workspace` | ワークスペース一覧 |
| `/workspace/[wsId]` | ワークスペースダッシュボード |
| `/workspace/[wsId]/member` | メンバー管理 |
| `/env/[envId]` | 環境詳細（構成図表示 — 中核画面） |
| `/env/[envId]/deploy` | デプロイ履歴/進捗 |
| `/env/[envId]/settings/variables` | Variables管理 |
| `/env/[envId]/settings/secrets` | Secrets管理 |
| `/env/[envId]/software` | ソフトウェアデプロイ一覧 |
| `/architectures` | テンプレート一覧 |
| `/project/[pjId]/settings` | プロジェクト設定 |

## 重要な注意事項

### shadcn/ui v4 (base-ui ベース)
- `asChild` は使えない。代わりに `render` prop でカスタム要素をレンダリング
  ```tsx
  // NG: <SidebarMenuButton asChild><Link href="/">...</Link></SidebarMenuButton>
  // OK: <SidebarMenuButton render={<Link href="/" />}>...</SidebarMenuButton>
  ```
- Button も `asChild` 非対応。Link で Button を wrap するか、`render` を使用

### Zod v4
- インポートは `zod/v4` から: `import { z } from "zod/v4"`

### デモ用データ
- バックエンド接続なし。モックデータで動作
- 認証はダミー実装（常にログイン成功）

### 言語
- UIテキスト、コメント: 日本語
- コード（変数名、関数名）: 英語

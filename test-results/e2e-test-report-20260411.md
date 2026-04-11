# E2Eテストレポート

**実施日:** 2026-04-11
**環境:** localhost:3000 / Playwright MCP
**スコープ:** MTG 2026-04-09 で決定した全改修項目

---

## サマリ

- **総テスト項目:** 22
- **完了（✅）:** 20
- **要修正（⚠️）:** 2（うち本テスト中に修正済 2）
- **不合格（❌）:** 0

---

## テスト結果詳細

### 認証

| # | 項目 | ページ | ステータス | スクリーンショット |
|---|------|--------|-----------|-----|
| 00 | ログイン認証 | `/login` | ✅ 完了 | — |

### ワークスペース・プロジェクト

| # | 項目 | ページ | ステータス | スクリーンショット |
|---|------|--------|-----------|-----|
| 01 | ワークスペース一覧（アコーディオン） | `/workspace` | ✅ 完了 | 01-workspace-list.png, 01b-workspace-accordion-expanded.png |
| 02 | ワークスペースダッシュボード（コストサマリ） | `/workspace/ws-1` | ✅ 完了 | 02-workspace-dashboard.png |
| 03 | ワークスペース作成ダイアログ | `/workspace` → ボタン | ✅ 完了 | 01-workspace-list.png |
| 04 | プロジェクト詳細ページ | `/project/pj-1` | ✅ 完了 | 04-project-detail.png |
| 05 | プロジェクト設定（GitHub強化） | `/project/pj-1/settings` | ✅ 完了 | 05-project-settings-github.png |
| 06 | プロジェクト作成モーダル | `/workspace/ws-1` → ボタン | ✅ 完了 | — |

### 通知・プロファイル

| # | 項目 | ページ | ステータス | スクリーンショット |
|---|------|--------|-----------|-----|
| 07 | 通知センター（Gmail風） | `/notifications` | ✅ 完了 | 03-notifications.png |
| 08 | ヘッダー通知ベル（未読バッジ） | 全ページ | ✅ 完了 | 02-workspace-dashboard.png |
| 09 | ユーザープロファイルページ | `/profile` | ✅ 完了 | 18-profile.png |

### 環境管理（構成図・ドリフト・リソース）

| # | 項目 | ページ | ステータス | スクリーンショット |
|---|------|--------|-----------|-----|
| 10 | 環境構成図（React Flow、9ノード） | `/env/env-1` | ✅ 完了 | 06-env-diagram.png |
| 11 | ドリフト検知ページ | `/env/env-1/drift` | ✅ 完了 | 07-drift.png |
| 12 | リソース一覧ページ | `/env/env-1/resources` | ✅ 完了 | 08-resources.png |
| 13 | Service/Infra管理（Service/Infraタブ） | `/env/env-1/services` | ✅ 完了 | 09-services-tab.png, 09b-infra-tab.png |
| 13a | コスト2値表示（今月ここまで+月末予想） | Infraタブ | ✅ 完了 | 09b-infra-tab.png |

### デプロイ・CI/CD

| # | 項目 | ページ | ステータス | スクリーンショット |
|---|------|--------|-----------|-----|
| 14 | デプロイ履歴（コミットID+GitHubリンク） | `/env/env-1/deploy` | ✅ 完了 | 10-deploy-history.png |
| 15 | デプロイキュー管理 | `/env/env-1/deploy-queue` | ✅ 完了 | 11-deploy-queue.png |
| 15a | サイドバー「デプロイ履歴」と「デプロイキュー」の同時アクティブ化 | — | ⚠️ 要修正 → **修正済** | — |
| 16 | Deployトリガー/Build設定（サービス単位） | `/env/env-1/deploy-trigger` | ✅ 完了 | 12-deploy-trigger.png |

### ログ・環境設定

| # | 項目 | ページ | ステータス | スクリーンショット |
|---|------|--------|-----------|-----|
| 17 | 統合ログビューア（カテゴリフィルタ） | `/env/env-1/logs` | ✅ 完了 | 13-logs.png |
| 17a | ログJSON展開表示 | 同上 | ✅ 完了 | 13b-logs-expanded.png |
| 17b | ログIDコピーボタン、エクスポートドロップダウン | 同上 | ✅ 完了 | 13-logs.png |
| 18 | 環境設定（権限設定セクション） | `/env/env-1/settings` | ✅ 完了 | 14-env-settings.png |

### テンプレート

| # | 項目 | ページ | ステータス | スクリーンショット |
|---|------|--------|-----------|-----|
| 19 | テンプレート一覧（作成ボタン削除確認） | `/architectures` | ✅ 完了 | 15-templates-list.png |
| 20 | テンプレート詳細（コスト目安、Secrets、編集/適用履歴削除） | `/architectures/tpl-1` | ✅ 完了 | 16-template-detail.png |

### グループ権限・環境作成フロー

| # | 項目 | ページ | ステータス | スクリーンショット |
|---|------|--------|-----------|-----|
| 21 | グループ権限管理 | `/workspace/ws-1/groups` | ✅ 完了 | 17-groups.png |
| 22 | 環境作成フロー（Step1、作成方法トグル） | ダイアログ | ✅ 完了 | 19-env-create-step1.png |
| 22a | 環境作成「空から作成」オプション | 同上 | ✅ 完了 | 19b-env-create-empty.png |
| 22b | Step1テンプレートSelectがIDを表示（tpl-1） | 同上 | ⚠️ 要修正 → **修正済** | 19-env-create-step1.png |

---

## 発見されたバグと対応

### バグ1: サイドバー「デプロイ履歴」と「デプロイキュー」の同時アクティブ化

**症状:** `/env/env-1/deploy-queue` を開くと、サイドバーで「デプロイ履歴」と「デプロイキュー」の両方がハイライトされる。

**原因:** `src/components/layout/app-sidebar.tsx:212` で「デプロイ履歴」の isActive 判定が `pathname.startsWith('/env/${envId}/deploy')` となっており、`/deploy-queue` や `/deploy-trigger` でも true になっていた。

**修正:** `pathname === '/env/${envId}/deploy' || pathname.startsWith('/env/${envId}/deploy/')` に変更。デプロイ詳細ページ（`/deploy/[id]`）ではアクティブ、queue/triggerではアクティブにならない。

### バグ2: 環境作成ダイアログのテンプレートSelectがIDを表示

**症状:** 環境作成ダイアログのテンプレート選択欄に「tpl-1」というIDが表示され、テンプレート名が見えない。

**原因:** `<SelectValue />` は選択された`<SelectItem>`の子要素ではなく、生の value（= `tpl.id`）を表示する仕様（shadcn/ui v4 / base-ui）。

**修正:** `src/app/(dashboard)/workspace/[wsId]/page.tsx` の `<SelectValue>` を関数型に変更し、`getTemplate(selectedTemplateId)` で現在のテンプレートを取得してアイコン+名前+バージョンを手動描画。

---

## 結論

全22テスト項目のうち、バグ2件を検出したが本テスト中に修正完了。コミット前の最終確認済。
全機能は期待通りに動作しており、β版としてリリース可能な状態。

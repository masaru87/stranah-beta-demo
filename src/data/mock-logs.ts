import type { LogEntry } from "@/types";

export const mockLogs: LogEntry[] = [
  {
    id: "log-i1",
    category: "infra",
    timestamp: "2026-03-29T09:15:00Z",
    level: "info",
    message: "sakuracloud_server.web-1 のスケールアップを実行 (2core → 4core)",
    source: "さくらクラウド API",
    resource: "web-1",
  },
  {
    id: "log-i2",
    category: "infra",
    timestamp: "2026-03-29T08:15:00Z",
    level: "warn",
    message: "構成ドリフトを検知: sakuracloud_server.web-2 のメモリが定義と不一致",
    source: "Stranah Scanner",
    resource: "web-2",
  },
  {
    id: "log-i3",
    category: "infra",
    timestamp: "2026-03-28T16:00:00Z",
    level: "info",
    message: "VPCルーターのファイアウォールルールを更新",
    source: "さくらクラウド API",
    resource: "vpc-router",
  },
  {
    id: "log-d1",
    category: "deploy",
    timestamp: "2026-03-28T11:05:00Z",
    level: "info",
    message: "resident-portal-web のビルド・デプロイが完了 (a1b2c3d)",
    source: "Deploy Pipeline",
  },
  {
    id: "log-d2",
    category: "deploy",
    timestamp: "2026-03-28T10:30:00Z",
    level: "info",
    message: "Terraform apply 完了: 8リソース作成",
    source: "Terraform",
  },
  {
    id: "log-d3",
    category: "deploy",
    timestamp: "2026-03-27T15:33:00Z",
    level: "error",
    message: "resident-portal-web のビルドが失敗: npm run build exit code 1",
    source: "Deploy Pipeline",
  },
  {
    id: "log-s1",
    category: "system",
    timestamp: "2026-03-29T09:00:00Z",
    level: "info",
    message: "GitHub Webhook受信: push event (tokyo-gov/resident-portal, main)",
    source: "Webhook Handler",
  },
  {
    id: "log-s2",
    category: "system",
    timestamp: "2026-03-29T08:00:00Z",
    level: "info",
    message: "定期スキャンジョブを実行開始",
    source: "Scheduler",
  },
  {
    id: "log-s3",
    category: "system",
    timestamp: "2026-03-28T23:00:00Z",
    level: "warn",
    message: "さくらクラウド APIレートリミットに近づいています (80%)",
    source: "API Gateway",
  },
  {
    id: "log-s4",
    category: "system",
    timestamp: "2026-03-28T12:00:00Z",
    level: "error",
    message: "Webhook署名検証に失敗しました (IP: 203.0.113.50)",
    source: "Webhook Handler",
  },
];

export function getLogsByEnvironment(
  _envId: string,
  category?: string
): LogEntry[] {
  if (category && category !== "all") {
    return mockLogs.filter((l) => l.category === category);
  }
  return mockLogs;
}

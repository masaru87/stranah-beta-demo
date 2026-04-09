import type { Drift } from "@/types";

export const mockDrifts: Drift[] = [
  {
    id: "drift-1",
    environmentId: "env-1",
    resource: "sakuracloud_server.web-1",
    field: "core",
    expected: "2",
    actual: "4",
    status: "detected",
    detectedAt: "2026-03-29T08:15:00Z",
  },
  {
    id: "drift-2",
    environmentId: "env-1",
    resource: "sakuracloud_server.web-2",
    field: "memory",
    expected: "4GB",
    actual: "8GB",
    status: "detected",
    detectedAt: "2026-03-29T08:15:00Z",
  },
  {
    id: "drift-3",
    environmentId: "env-1",
    resource: "sakuracloud_switch.frontend",
    field: "description",
    expected: "フロントエンドスイッチ",
    actual: "FE Switch (edited manually)",
    status: "resolved",
    detectedAt: "2026-03-27T10:00:00Z",
  },
  {
    id: "drift-4",
    environmentId: "env-1",
    resource: "sakuracloud_database.primary",
    field: "backup_time",
    expected: "03:00",
    actual: "未設定",
    status: "ignored",
    detectedAt: "2026-03-26T06:00:00Z",
  },
];

export function getDriftsByEnvironment(envId: string): Drift[] {
  return mockDrifts.filter((d) => d.environmentId === envId);
}

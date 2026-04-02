import type { Environment, Deploy, User } from "@/types";

export const mockUser: User = {
  id: "user-1",
  name: "菊池 幸太郎",
  email: "kikuchi@example.com",
  company: "東京都 情報システム部",
};

export const mockEnvironments: Environment[] = [
  {
    id: "env-1",
    projectId: "pj-1",
    name: "開発環境",
    type: "dev",
    status: "active",
    templateId: "tpl-1",
    resourceCount: 8,
    lastDeployedAt: "2026-03-28T10:30:00Z",
    updatedAt: "2026-03-28T10:30:00Z",
  },
  {
    id: "env-2",
    projectId: "pj-1",
    name: "ステージング環境",
    type: "stg",
    status: "active",
    templateId: "tpl-1",
    resourceCount: 8,
    lastDeployedAt: "2026-03-25T14:00:00Z",
    updatedAt: "2026-03-25T14:00:00Z",
  },
  {
    id: "env-3",
    projectId: "pj-1",
    name: "本番環境",
    type: "prod",
    status: "deploying",
    templateId: "tpl-1",
    resourceCount: 10,
    lastDeployedAt: "2026-03-20T09:00:00Z",
    updatedAt: "2026-03-29T08:00:00Z",
  },
];

export const mockDeploys: Deploy[] = [
  {
    id: "deploy-1",
    environmentId: "env-1",
    status: "success",
    triggeredBy: mockUser,
    startedAt: "2026-03-28T10:25:00Z",
    finishedAt: "2026-03-28T10:30:00Z",
    logs: [
      {
        id: "log-1",
        timestamp: "2026-03-28T10:25:00Z",
        level: "info",
        message: "Terraform plan を実行中...",
      },
      {
        id: "log-2",
        timestamp: "2026-03-28T10:26:00Z",
        level: "info",
        message: "sakuracloud_server.web-1 を作成中...",
        resource: "web-1",
      },
      {
        id: "log-3",
        timestamp: "2026-03-28T10:28:00Z",
        level: "info",
        message: "sakuracloud_server.app-1 を作成中...",
        resource: "app-1",
      },
      {
        id: "log-4",
        timestamp: "2026-03-28T10:30:00Z",
        level: "info",
        message: "デプロイ完了: 8リソース作成",
      },
    ],
  },
];

export function getEnvironment(envId: string): Environment | undefined {
  return mockEnvironments.find((e) => e.id === envId);
}

export function getDeploys(envId: string): Deploy[] {
  return mockDeploys.filter((d) => d.environmentId === envId);
}

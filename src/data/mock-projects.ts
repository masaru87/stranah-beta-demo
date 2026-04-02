import type { Project, Environment, Template, Member, User } from "@/types";

export const mockMembers: Member[] = [
  {
    id: "m-1",
    user: {
      id: "user-1",
      name: "菊池 幸太郎",
      email: "kikuchi@example.com",
      company: "東京都 情報システム部",
    },
    role: "owner",
    status: "active",
    joinedAt: "2026-01-10T09:00:00Z",
  },
  {
    id: "m-2",
    user: {
      id: "user-2",
      name: "田中 美咲",
      email: "tanaka@example.com",
      company: "東京都 情報システム部",
    },
    role: "admin",
    status: "active",
    joinedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "m-3",
    user: {
      id: "user-3",
      name: "鈴木 大輔",
      email: "suzuki@example.com",
      company: "株式会社イーストクラウド",
    },
    role: "member",
    status: "active",
    joinedAt: "2026-02-01T09:00:00Z",
  },
  {
    id: "m-4",
    user: {
      id: "user-4",
      name: "佐藤 健太",
      email: "sato@example.com",
    },
    role: "member",
    status: "invited",
    invitedAt: "2026-03-25T14:00:00Z",
  },
  {
    id: "m-5",
    user: {
      id: "user-5",
      name: "高橋 愛",
      email: "takahashi@example.com",
      company: "東京都 情報システム部",
    },
    role: "viewer",
    status: "active",
    joinedAt: "2026-02-20T11:00:00Z",
  },
];

export const mockProjects: Project[] = [
  {
    id: "pj-1",
    workspaceId: "ws-1",
    name: "住民サービスポータル",
    description: "住民向けオンライン申請・届出ポータルシステムのインフラ基盤",
    repositoryUrl: "https://github.com/tokyo-gov/resident-portal",
    branch: "main",
    templateId: "tpl-1",
    environments: [
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
        status: "active",
        templateId: "tpl-1",
        resourceCount: 10,
        lastDeployedAt: "2026-03-20T09:00:00Z",
        updatedAt: "2026-03-20T09:00:00Z",
      },
    ],
    updatedAt: "2026-03-28T10:30:00Z",
  },
  {
    id: "pj-2",
    workspaceId: "ws-1",
    name: "内部業務システム",
    description: "職員向け業務管理・ワークフローシステム",
    repositoryUrl: "https://github.com/tokyo-gov/internal-ops",
    branch: "main",
    templateId: "tpl-2",
    environments: [
      {
        id: "env-4",
        projectId: "pj-2",
        name: "開発環境",
        type: "dev",
        status: "active",
        templateId: "tpl-2",
        resourceCount: 6,
        lastDeployedAt: "2026-03-27T16:00:00Z",
        updatedAt: "2026-03-27T16:00:00Z",
      },
      {
        id: "env-5",
        projectId: "pj-2",
        name: "本番環境",
        type: "prod",
        status: "deploying",
        templateId: "tpl-2",
        resourceCount: 6,
        updatedAt: "2026-03-29T08:00:00Z",
      },
    ],
    updatedAt: "2026-03-27T16:00:00Z",
  },
  {
    id: "pj-3",
    workspaceId: "ws-1",
    name: "オープンデータ基盤",
    description: "オープンデータ公開・API提供基盤",
    templateId: "tpl-3",
    environments: [
      {
        id: "env-6",
        projectId: "pj-3",
        name: "開発環境",
        type: "dev",
        status: "pending",
        resourceCount: 0,
        updatedAt: "2026-03-15T12:00:00Z",
      },
    ],
    updatedAt: "2026-03-15T12:00:00Z",
  },
];

export const mockTemplates: Template[] = [
  {
    id: "tpl-1",
    name: "官公庁向け Web3層構成",
    description:
      "ロードバランサー + Webサーバー冗長化 + App + DB の標準3層構成。さくらクラウド対応。",
    category: "官公庁標準",
    version: "1.2.0",
    resourceTypes: [
      "ロードバランサー",
      "VPCルーター",
      "サーバー",
      "データベースアプライアンス",
      "スイッチ",
    ],
    updatedAt: "2026-03-20T09:00:00Z",
  },
  {
    id: "tpl-2",
    name: "シンプル Web+DB 構成",
    description: "Webサーバー + DBの最小構成。開発・検証環境向け。",
    category: "汎用",
    version: "1.0.0",
    resourceTypes: ["サーバー", "データベースアプライアンス", "スイッチ"],
    updatedAt: "2026-03-10T12:00:00Z",
  },
  {
    id: "tpl-3",
    name: "API基盤構成",
    description:
      "API Gateway + App冗長化 + DB の構成。マイクロサービス基盤向け。",
    category: "官公庁標準",
    version: "0.9.0",
    resourceTypes: [
      "ロードバランサー",
      "VPCルーター",
      "サーバー",
      "データベースアプライアンス",
      "スイッチ",
    ],
    updatedAt: "2026-03-05T15:00:00Z",
  },
  {
    id: "tpl-4",
    name: "静的ホスティング構成",
    description:
      "オブジェクトストレージ + CDN の静的ファイルホスティング構成。",
    category: "汎用",
    version: "1.1.0",
    resourceTypes: ["サーバー", "スイッチ"],
    updatedAt: "2026-02-28T10:00:00Z",
  },
];

export function getProjectsByWorkspace(wsId: string): Project[] {
  return mockProjects.filter((p) => p.workspaceId === wsId);
}

export function getProject(pjId: string): Project | undefined {
  return mockProjects.find((p) => p.id === pjId);
}

export function getTemplate(tplId: string): Template | undefined {
  return mockTemplates.find((t) => t.id === tplId);
}

export function getMembersByWorkspace(_wsId: string): Member[] {
  return mockMembers;
}

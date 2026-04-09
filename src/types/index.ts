// ユーザー・認証
export type User = {
  id: string;
  name: string;
  email: string;
  company?: string;
  avatarUrl?: string;
};

export type Role = "owner" | "admin" | "member" | "viewer";

export type Member = {
  id: string;
  user: User;
  role: Role;
  status: "active" | "invited" | "pending";
  invitedAt?: string;
  joinedAt?: string;
};

// ワークスペース
export type Workspace = {
  id: string;
  name: string;
  memberCount: number;
  projectCount: number;
  updatedAt: string;
};

// プロジェクト
export type Project = {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  repositoryUrl?: string;
  branch?: string;
  templateId?: string;
  environments: Environment[];
  updatedAt: string;
};

// 環境
export type EnvironmentType = "dev" | "stg" | "prod";

export type EnvironmentStatus =
  | "active"
  | "deploying"
  | "failed"
  | "pending"
  | "destroying";

export type Environment = {
  id: string;
  projectId: string;
  name: string;
  type: EnvironmentType;
  status: EnvironmentStatus;
  templateId?: string;
  resourceCount: number;
  lastDeployedAt?: string;
  updatedAt: string;
};

// テンプレート
export type Template = {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  resourceTypes: string[];
  updatedAt: string;
};

// デプロイ
export type DeployStatus =
  | "queued"
  | "running"
  | "success"
  | "failed"
  | "cancelled";

export type Deploy = {
  id: string;
  environmentId: string;
  status: DeployStatus;
  triggeredBy: User;
  startedAt: string;
  finishedAt?: string;
  logs: DeployLog[];
};

export type DeployLog = {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
  resource?: string;
};

// ソフトウェアデプロイ
export type SoftwareDeploy = {
  id: string;
  environmentId: string;
  repositoryName: string;
  branch: string;
  commitHash: string;
  commitMessage: string;
  status: DeployStatus;
  triggeredBy: User;
  startedAt: string;
  finishedAt?: string;
};

// Variables / Secrets
export type Variable = {
  key: string;
  value: string;
  updatedAt: string;
};

export type Secret = {
  key: string;
  maskedValue: string;
  updatedAt: string;
};

// インフラ構成図用ノード
export type InfraNode = {
  id: string;
  type: string;
  label: string;
  status: "running" | "stopped" | "error" | "creating";
  metadata: Record<string, string>;
};

export type InfraEdge = {
  id: string;
  source: string;
  target: string;
  label?: string;
};

// ドリフト
export type DriftStatus = "detected" | "resolved" | "ignored";

export type Drift = {
  id: string;
  environmentId: string;
  resource: string;
  field: string;
  expected: string;
  actual: string;
  status: DriftStatus;
  detectedAt: string;
};

// 通知
export type NotificationType =
  | "deploy_success"
  | "deploy_failed"
  | "drift_detected"
  | "member_invited"
  | "environment_created";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  linkTo?: string;
};

// Serviceレイヤー
export type Service = {
  id: string;
  environmentId: string;
  name: string;
  repositoryName: string;
  branch: string;
  buildCommand: string;
  outputDir: string;
  lastDeployedAt?: string;
  status: DeployStatus | "idle";
};

// Infraレイヤー
export type InfraLayer = {
  id: string;
  environmentId: string;
  provider: "sakuracloud" | "aws" | "gcp";
  resourceType: string;
  resourceName: string;
  status: "running" | "stopped" | "error" | "creating";
  region: string;
  spec: string;
  monthlyCost?: string;
};

// テンプレート適用履歴
export type TemplateApplication = {
  id: string;
  templateId: string;
  environmentId: string;
  environmentName: string;
  projectName: string;
  appliedAt: string;
  appliedBy: User;
  version: string;
};

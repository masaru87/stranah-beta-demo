import type { Service, InfraLayer } from "@/types";

export const mockServices: Service[] = [
  {
    id: "svc-1",
    environmentId: "env-1",
    name: "resident-portal-web",
    repositoryName: "tokyo-gov/resident-portal",
    branch: "main",
    buildCommand: "npm run build",
    outputDir: "dist",
    lastDeployedAt: "2026-03-28T11:05:00Z",
    status: "success",
  },
  {
    id: "svc-2",
    environmentId: "env-1",
    name: "resident-portal-api",
    repositoryName: "tokyo-gov/resident-portal-api",
    branch: "main",
    buildCommand: "go build -o server ./cmd/server",
    outputDir: ".",
    lastDeployedAt: "2026-03-28T10:50:00Z",
    status: "success",
  },
  {
    id: "svc-3",
    environmentId: "env-1",
    name: "notification-worker",
    repositoryName: "tokyo-gov/notification-service",
    branch: "develop",
    buildCommand: "npm run build",
    outputDir: "dist",
    status: "idle",
  },
];

export const mockInfraLayers: InfraLayer[] = [
  {
    id: "infra-1",
    environmentId: "env-1",
    provider: "sakuracloud",
    resourceType: "サーバー",
    resourceName: "web-1",
    status: "running",
    region: "東京第1",
    spec: "2コア / 4GB",
    monthlyCost: "¥3,520",
  },
  {
    id: "infra-2",
    environmentId: "env-1",
    provider: "sakuracloud",
    resourceType: "サーバー",
    resourceName: "web-2",
    status: "running",
    region: "東京第1",
    spec: "2コア / 4GB",
    monthlyCost: "¥3,520",
  },
  {
    id: "infra-3",
    environmentId: "env-1",
    provider: "sakuracloud",
    resourceType: "サーバー",
    resourceName: "app-1",
    status: "running",
    region: "東京第1",
    spec: "4コア / 8GB",
    monthlyCost: "¥7,040",
  },
  {
    id: "infra-4",
    environmentId: "env-1",
    provider: "sakuracloud",
    resourceType: "データベースアプライアンス",
    resourceName: "db-primary",
    status: "running",
    region: "東京第1",
    spec: "PostgreSQL 15 / 100GB",
    monthlyCost: "¥10,560",
  },
  {
    id: "infra-5",
    environmentId: "env-1",
    provider: "sakuracloud",
    resourceType: "VPCルーター",
    resourceName: "vpc-router",
    status: "running",
    region: "東京第1",
    spec: "スタンダード",
    monthlyCost: "¥5,280",
  },
  {
    id: "infra-6",
    environmentId: "env-1",
    provider: "sakuracloud",
    resourceType: "ロードバランサー",
    resourceName: "lb-1",
    status: "running",
    region: "東京第1",
    spec: "スタンダード",
    monthlyCost: "¥2,200",
  },
];

export function getServicesByEnvironment(envId: string): Service[] {
  return mockServices.filter((s) => s.environmentId === envId);
}

export function getInfraLayersByEnvironment(envId: string): InfraLayer[] {
  return mockInfraLayers.filter((i) => i.environmentId === envId);
}

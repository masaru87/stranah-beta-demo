import type { DeployQueueItem } from "@/types";
import { mockUser } from "./mock-environments";

export const mockDeployQueue: DeployQueueItem[] = [
  {
    id: "dq-1",
    environmentId: "env-1",
    type: "software",
    serviceName: "resident-portal-web",
    triggeredBy: mockUser,
    triggerSource: "github_push",
    status: "running",
    position: 1,
    createdAt: "2026-03-29T09:00:00Z",
    startedAt: "2026-03-29T09:00:30Z",
  },
  {
    id: "dq-2",
    environmentId: "env-1",
    type: "software",
    serviceName: "resident-portal-api",
    triggeredBy: { id: "user-3", name: "鈴木 大輔", email: "suzuki@example.com" },
    triggerSource: "github_merge",
    status: "queued",
    position: 2,
    createdAt: "2026-03-29T09:01:00Z",
  },
  {
    id: "dq-3",
    environmentId: "env-1",
    type: "infra",
    triggeredBy: mockUser,
    triggerSource: "manual",
    status: "queued",
    position: 3,
    createdAt: "2026-03-29T09:02:00Z",
  },
];

export function getDeployQueueByEnvironment(envId: string): DeployQueueItem[] {
  return mockDeployQueue.filter((d) => d.environmentId === envId);
}

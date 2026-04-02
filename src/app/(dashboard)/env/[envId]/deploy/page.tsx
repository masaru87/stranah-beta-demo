"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Deploy } from "@/types";
import { mockUser } from "@/data/mock-environments";

const statusLabels: Record<string, string> = {
  queued: "待機中",
  running: "実行中",
  success: "成功",
  failed: "失敗",
  cancelled: "キャンセル",
};

const statusColors: Record<string, string> = {
  queued: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  running: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  cancelled: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

const mockDeployList: Deploy[] = [
  {
    id: "deploy-1",
    environmentId: "env-1",
    status: "success",
    triggeredBy: mockUser,
    startedAt: "2026-03-28T10:25:00Z",
    finishedAt: "2026-03-28T10:30:00Z",
    logs: [],
  },
  {
    id: "deploy-2",
    environmentId: "env-1",
    status: "success",
    triggeredBy: mockUser,
    startedAt: "2026-03-25T14:00:00Z",
    finishedAt: "2026-03-25T14:08:00Z",
    logs: [],
  },
  {
    id: "deploy-3",
    environmentId: "env-1",
    status: "failed",
    triggeredBy: { id: "user-3", name: "鈴木 大輔", email: "suzuki@example.com" },
    startedAt: "2026-03-24T11:00:00Z",
    finishedAt: "2026-03-24T11:03:00Z",
    logs: [],
  },
  {
    id: "deploy-4",
    environmentId: "env-1",
    status: "success",
    triggeredBy: mockUser,
    startedAt: "2026-03-20T09:00:00Z",
    finishedAt: "2026-03-20T09:12:00Z",
    logs: [],
  },
];

function formatDuration(start: string, end?: string): string {
  if (!end) return "—";
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${minutes}分${seconds}秒`;
}

export default function DeployHistoryPage() {
  const params = useParams();
  const envId = params.envId as string;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/env/${envId}`}>
            <Button variant="ghost" size="icon-sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">デプロイ履歴</h1>
            <p className="text-sm text-muted-foreground">
              環境の構築履歴と実行ログ
            </p>
          </div>
        </div>
        <Link href={`/env/${envId}`}>
          <Button size="sm">構成図に戻る</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ステータス</TableHead>
            <TableHead>実行者</TableHead>
            <TableHead>開始日時</TableHead>
            <TableHead>所要時間</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockDeployList.map((deploy) => (
            <TableRow key={deploy.id}>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn("text-xs", statusColors[deploy.status])}
                >
                  {statusLabels[deploy.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">
                {deploy.triggeredBy.name}
              </TableCell>
              <TableCell className="text-sm">
                {new Date(deploy.startedAt).toLocaleString("ja-JP")}
              </TableCell>
              <TableCell className="text-sm">
                {formatDuration(deploy.startedAt, deploy.finishedAt)}
              </TableCell>
              <TableCell>
                <Link href={`/env/${envId}/deploy/${deploy.id}`}>
                  <Button variant="ghost" size="icon-xs">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

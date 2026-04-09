"use client";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DeployQueueItem } from "@/types";

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

const triggerLabels: Record<string, string> = {
  manual: "手動",
  github_push: "GitHub Push",
  github_merge: "GitHub Merge",
  schedule: "スケジュール",
};

type DeployQueueTableProps = {
  items: DeployQueueItem[];
};

export function DeployQueueTable({ items }: DeployQueueTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>ステータス</TableHead>
          <TableHead>種別</TableHead>
          <TableHead>サービス</TableHead>
          <TableHead>トリガー</TableHead>
          <TableHead>実行者</TableHead>
          <TableHead>作成日時</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="text-sm font-mono">{item.position}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={cn("text-xs", statusColors[item.status])}
              >
                {statusLabels[item.status]}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="text-xs">
                {item.type === "infra" ? "インフラ" : "ソフトウェア"}
              </Badge>
            </TableCell>
            <TableCell className="text-sm">
              {item.serviceName ?? "—"}
            </TableCell>
            <TableCell className="text-sm">
              {triggerLabels[item.triggerSource]}
            </TableCell>
            <TableCell className="text-sm">{item.triggeredBy.name}</TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {new Date(item.createdAt).toLocaleString("ja-JP")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

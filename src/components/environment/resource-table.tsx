"use client";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ResourceStatus = "running" | "stopped" | "error" | "creating";

const statusLabels: Record<ResourceStatus, string> = {
  running: "稼働中",
  stopped: "停止",
  error: "エラー",
  creating: "作成中",
};

const statusColors: Record<ResourceStatus, string> = {
  running: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  stopped: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  creating: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

type Resource = {
  id: string;
  label: string;
  resourceType: string;
  status: ResourceStatus;
  metadata: Record<string, string>;
};

type ResourceTableProps = {
  resources: Resource[];
};

export function ResourceTable({ resources }: ResourceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ステータス</TableHead>
          <TableHead>リソース名</TableHead>
          <TableHead>種別</TableHead>
          <TableHead>詳細</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resources.map((r) => (
          <TableRow key={r.id}>
            <TableCell>
              <Badge
                variant="secondary"
                className={cn("text-xs", statusColors[r.status])}
              >
                {statusLabels[r.status]}
              </Badge>
            </TableCell>
            <TableCell className="font-medium text-sm">{r.label}</TableCell>
            <TableCell className="text-sm">{r.resourceType}</TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {Object.entries(r.metadata)
                .map(([k, v]) => `${k}: ${v}`)
                .join(", ")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

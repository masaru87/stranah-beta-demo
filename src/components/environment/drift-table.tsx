"use client";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Drift, DriftStatus } from "@/types";

const statusLabels: Record<DriftStatus, string> = {
  detected: "検知",
  resolved: "解消済",
  ignored: "無視",
};

const statusColors: Record<DriftStatus, string> = {
  detected: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  resolved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  ignored: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
};

type DriftTableProps = {
  drifts: Drift[];
};

export function DriftTable({ drifts }: DriftTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ステータス</TableHead>
          <TableHead>リソース</TableHead>
          <TableHead>フィールド</TableHead>
          <TableHead>期待値</TableHead>
          <TableHead>実測値</TableHead>
          <TableHead>検知日時</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drifts.map((drift) => (
          <TableRow key={drift.id}>
            <TableCell>
              <Badge
                variant="secondary"
                className={cn("text-xs", statusColors[drift.status])}
              >
                {statusLabels[drift.status]}
              </Badge>
            </TableCell>
            <TableCell className="font-mono text-sm">{drift.resource}</TableCell>
            <TableCell className="text-sm">{drift.field}</TableCell>
            <TableCell className="font-mono text-sm text-emerald-700 dark:text-emerald-400">
              {drift.expected}
            </TableCell>
            <TableCell className="font-mono text-sm text-red-700 dark:text-red-400">
              {drift.actual}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {new Date(drift.detectedAt).toLocaleString("ja-JP")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

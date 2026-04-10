"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronDown, ChevronRight, Copy, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getLogsByEnvironment } from "@/data/mock-logs";
import type { LogCategory } from "@/types";

const categoryLabels: Record<string, string> = {
  all: "すべて",
  infra: "インフラ操作",
  deploy: "デプロイ",
  system: "システム",
};

const levelColors: Record<string, string> = {
  info: "text-blue-600 dark:text-blue-400",
  warn: "text-amber-600 dark:text-amber-400",
  error: "text-red-600 dark:text-red-400",
};

const categoryColors: Record<LogCategory, string> = {
  infra: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  deploy: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  system: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
};

export default function LogsPage() {
  const params = useParams();
  const envId = params.envId as string;
  const [category, setCategory] = useState<string>("all");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const logs = getLogsByEnvironment(envId, category);

  function toggleExpand(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleCopyId(id: string) {
    navigator.clipboard.writeText(id);
    toast.success(`ログID「${id}」をコピーしました`);
  }

  function handleExport(format: "json" | "csv") {
    const data = format === "json"
      ? JSON.stringify(logs, null, 2)
      : [
          "id,timestamp,category,level,message,source",
          ...logs.map((l) =>
            `${l.id},${l.timestamp},${l.category},${l.level},"${l.message}",${l.source ?? ""}`
          ),
        ].join("\n");
    const blob = new Blob([data], { type: format === "json" ? "application/json" : "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logs.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${format.toUpperCase()} でエクスポートしました`);
  }

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
            <h1 className="text-2xl font-bold">ログ</h1>
            <p className="text-sm text-muted-foreground">
              インフラ操作・デプロイ・システムログの統合ビュー
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
              <Download className="h-3.5 w-3.5" />
              エクスポート
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("json")}>
                JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("csv")}>
                CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="infra">インフラ操作</SelectItem>
              <SelectItem value="deploy">デプロイ</SelectItem>
              <SelectItem value="system">システム</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="divide-y">
          {logs.map((log) => {
            const isExpanded = expandedIds.has(log.id);
            const hasDetails = log.details && Object.keys(log.details).length > 0;
            return (
              <div key={log.id}>
                <div
                  className={cn(
                    "flex items-start gap-3 px-4 py-3",
                    hasDetails && "cursor-pointer hover:bg-muted/50"
                  )}
                  onClick={() => hasDetails && toggleExpand(log.id)}
                >
                  <div className="mt-0.5 w-4 shrink-0">
                    {hasDetails && (
                      isExpanded
                        ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <span className="mt-0.5 w-32 shrink-0 font-mono text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString("ja-JP", {
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                  <Badge
                    variant="secondary"
                    className={cn("w-20 shrink-0 justify-center text-[10px]", categoryColors[log.category])}
                  >
                    {categoryLabels[log.category]}
                  </Badge>
                  <span
                    className={cn(
                      "w-12 shrink-0 text-xs font-medium uppercase",
                      levelColors[log.level]
                    )}
                  >
                    {log.level}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{log.message}</p>
                    {log.source && (
                      <p className="text-xs text-muted-foreground">{log.source}</p>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCopyId(log.id); }}
                    className="shrink-0 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    title="ログIDをコピー"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
                {isExpanded && log.details && (
                  <div className="border-t bg-muted/30 px-14 py-3">
                    <pre className="overflow-x-auto rounded bg-muted p-3 text-xs font-mono">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

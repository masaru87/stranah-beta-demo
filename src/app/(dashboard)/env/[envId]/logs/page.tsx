"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const logs = getLogsByEnvironment(envId, category);

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

      <div className="rounded-lg border">
        <div className="divide-y">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 px-4 py-3">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

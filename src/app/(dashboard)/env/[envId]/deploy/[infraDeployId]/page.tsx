"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, User, Clock, CheckCircle, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DeployLog } from "@/types";

const mockDeployDetail: {
  id: string;
  status: "success";
  triggeredBy: { name: string };
  startedAt: string;
  finishedAt: string;
  logs: DeployLog[];
} = {
  id: "deploy-1",
  status: "success" as const,
  triggeredBy: { name: "菊池 幸太郎" },
  startedAt: "2026-03-28T10:25:00Z",
  finishedAt: "2026-03-28T10:30:00Z",
  logs: [
    { id: "1", timestamp: "2026-03-28T10:25:00Z", level: "info", message: "Terraform init を実行中..." },
    { id: "2", timestamp: "2026-03-28T10:25:05Z", level: "info", message: "プロバイダ sakuracloud v2.25.0 を初期化" },
    { id: "3", timestamp: "2026-03-28T10:25:10Z", level: "info", message: "Terraform plan を実行中... (8 リソース)" },
    { id: "4", timestamp: "2026-03-28T10:25:30Z", level: "info", message: "sakuracloud_vpc_router.main: 作成中..." },
    { id: "5", timestamp: "2026-03-28T10:26:00Z", level: "info", message: "sakuracloud_vpc_router.main: 作成完了 (30s)" },
    { id: "6", timestamp: "2026-03-28T10:26:05Z", level: "info", message: "sakuracloud_switch.frontend: 作成中..." },
    { id: "7", timestamp: "2026-03-28T10:26:15Z", level: "info", message: "sakuracloud_switch.frontend: 作成完了 (10s)" },
    { id: "8", timestamp: "2026-03-28T10:26:20Z", level: "info", message: "sakuracloud_load_balancer.main: 作成中..." },
    { id: "9", timestamp: "2026-03-28T10:27:00Z", level: "info", message: "sakuracloud_load_balancer.main: 作成完了 (40s)" },
    { id: "10", timestamp: "2026-03-28T10:27:05Z", level: "info", message: "sakuracloud_server.web-1: 作成中..." },
    { id: "11", timestamp: "2026-03-28T10:27:35Z", level: "info", message: "sakuracloud_server.web-1: 作成完了 (30s)" },
    { id: "12", timestamp: "2026-03-28T10:27:40Z", level: "info", message: "sakuracloud_server.web-2: 作成中..." },
    { id: "13", timestamp: "2026-03-28T10:28:10Z", level: "info", message: "sakuracloud_server.web-2: 作成完了 (30s)" },
    { id: "14", timestamp: "2026-03-28T10:28:15Z", level: "warn", message: "sakuracloud_switch.backend: 既存リソースと競合の可能性あり" },
    { id: "15", timestamp: "2026-03-28T10:28:25Z", level: "info", message: "sakuracloud_switch.backend: 作成完了 (10s)" },
    { id: "16", timestamp: "2026-03-28T10:28:30Z", level: "info", message: "sakuracloud_server.app-1: 作成中..." },
    { id: "17", timestamp: "2026-03-28T10:29:00Z", level: "info", message: "sakuracloud_server.app-1: 作成完了 (30s)" },
    { id: "18", timestamp: "2026-03-28T10:29:05Z", level: "info", message: "sakuracloud_database.main: 作成中..." },
    { id: "19", timestamp: "2026-03-28T10:29:55Z", level: "info", message: "sakuracloud_database.main: 作成完了 (50s)" },
    { id: "20", timestamp: "2026-03-28T10:30:00Z", level: "info", message: "Apply complete! Resources: 8 added, 0 changed, 0 destroyed." },
  ],
};

const levelIcons = {
  info: <Info className="h-3.5 w-3.5 text-blue-500" />,
  warn: <XCircle className="h-3.5 w-3.5 text-amber-500" />,
  error: <XCircle className="h-3.5 w-3.5 text-red-500" />,
};

export default function DeployDetailPage() {
  const params = useParams();
  const envId = params.envId as string;
  const deploy = mockDeployDetail;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link href={`/env/${envId}/deploy`}>
          <Button variant="ghost" size="icon-sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">デプロイ詳細</h1>
          <p className="text-sm text-muted-foreground">{deploy.id}</p>
        </div>
      </div>

      {/* サマリ */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-500" />
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
            成功
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          {deploy.triggeredBy.name}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {new Date(deploy.startedAt).toLocaleString("ja-JP")} — {new Date(deploy.finishedAt!).toLocaleString("ja-JP")}
        </div>
      </div>

      <Separator />

      {/* ログ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">実行ログ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 font-mono text-sm">
            {deploy.logs.map((log) => (
              <div
                key={log.id}
                className={cn(
                  "flex items-start gap-2 rounded px-2 py-1",
                  log.level === "warn" && "bg-amber-50 dark:bg-amber-950/30",
                  log.level === "error" && "bg-red-50 dark:bg-red-950/30"
                )}
              >
                {levelIcons[log.level]}
                <span className="shrink-0 text-xs text-muted-foreground">
                  {new Date(log.timestamp).toLocaleTimeString("ja-JP")}
                </span>
                <span className="text-sm">{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

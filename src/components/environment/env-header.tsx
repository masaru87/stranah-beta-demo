"use client";

import Link from "next/link";
import type { Environment } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Rocket,
  History,
  Settings,
  ChevronRight,
  Code,
  KeyRound,
  Variable,
} from "lucide-react";
import { cn } from "@/lib/utils";

const envTypeLabels = {
  dev: "開発",
  stg: "ステージング",
  prod: "本番",
} as const;

const envTypeColors = {
  dev: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  stg: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  prod: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
} as const;

const statusLabels = {
  active: "稼働中",
  deploying: "デプロイ中",
  failed: "失敗",
  pending: "待機中",
  destroying: "削除中",
} as const;

const statusColors = {
  active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  deploying: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  pending: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  destroying: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
} as const;

type EnvHeaderProps = {
  environment: Environment;
  workspaceName?: string;
  projectName?: string;
};

export function EnvHeader({
  environment,
  workspaceName = "東京都 情報システム部",
  projectName = "住民サービスポータル",
}: EnvHeaderProps) {
  return (
    <div className="space-y-4">
      {/* パンくず */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/workspace" className="hover:text-foreground">
          {workspaceName}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/workspace/ws-1" className="hover:text-foreground">
          {projectName}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{environment.name}</span>
      </nav>

      {/* タイトル行 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{environment.name}</h1>
          <Badge
            variant="secondary"
            className={cn("text-xs", envTypeColors[environment.type])}
          >
            {envTypeLabels[environment.type]}
          </Badge>
          <Badge
            variant="secondary"
            className={cn("text-xs", statusColors[environment.status])}
          >
            {statusLabels[environment.status]}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/env/${environment.id}/software`}>
            <Button variant="outline" size="sm">
              <Code className="mr-1.5 h-3.5 w-3.5" />
              ソフトウェア
            </Button>
          </Link>
          <Link href={`/env/${environment.id}/deploy`}>
            <Button variant="outline" size="sm">
              <History className="mr-1.5 h-3.5 w-3.5" />
              デプロイ履歴
            </Button>
          </Link>
          <Link href={`/env/${environment.id}/settings`}>
            <Button variant="outline" size="sm">
              <Settings className="mr-1.5 h-3.5 w-3.5" />
              設定
            </Button>
          </Link>
          <Button size="sm">
            <Rocket className="mr-1.5 h-3.5 w-3.5" />
            構築実行
          </Button>
        </div>
      </div>

      {/* サブナビ */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>
          リソース数:{" "}
          <span className="font-medium text-foreground">
            {environment.resourceCount}
          </span>
        </span>
        <Separator orientation="vertical" className="h-4" />
        {environment.lastDeployedAt && (
          <span>
            最終デプロイ:{" "}
            <span className="font-medium text-foreground">
              {new Date(environment.lastDeployedAt).toLocaleString("ja-JP")}
            </span>
          </span>
        )}
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-2">
          <Link
            href={`/env/${environment.id}/settings/variables`}
            className="flex items-center gap-1 hover:text-foreground"
          >
            <Variable className="h-3.5 w-3.5" />
            Variables
          </Link>
          <Link
            href={`/env/${environment.id}/settings/secrets`}
            className="flex items-center gap-1 hover:text-foreground"
          >
            <KeyRound className="h-3.5 w-3.5" />
            Secrets
          </Link>
        </div>
      </div>
    </div>
  );
}

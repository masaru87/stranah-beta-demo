"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  ChevronLeft, ChevronRight, Server, GitBranch, Settings, Users,
} from "lucide-react";
import { getProject } from "@/data/mock-projects";
import { cn } from "@/lib/utils";

const envTypeColors = {
  dev: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  stg: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  prod: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
} as const;

const envTypeLabels = {
  dev: "開発",
  stg: "ステージング",
  prod: "本番",
} as const;

const statusColors = {
  active: "bg-emerald-500",
  deploying: "bg-blue-500 animate-pulse",
  failed: "bg-red-500",
  pending: "bg-gray-400",
  destroying: "bg-orange-500",
} as const;

export default function ProjectDetailPage() {
  const params = useParams();
  const pjId = params.pjId as string;
  const project = getProject(pjId);

  if (!project) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-muted-foreground">プロジェクトが見つかりません</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/workspace/${project.workspaceId}`}>
            <Button variant="ghost" size="icon-sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            {project.description && (
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/project/${pjId}/member`}>
            <Button variant="outline" size="sm">
              <Users className="mr-1.5 h-3.5 w-3.5" />
              メンバー
            </Button>
          </Link>
          <Link href={`/project/${pjId}/settings`}>
            <Button variant="outline" size="sm">
              <Settings className="mr-1.5 h-3.5 w-3.5" />
              設定
            </Button>
          </Link>
        </div>
      </div>

      {/* GitHub接続状態 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <GitBranch className="h-4 w-4" />
            GitHub連携
          </CardTitle>
        </CardHeader>
        <CardContent>
          {project.repositoryUrl ? (
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium">接続済み</span>
              <code className="text-xs text-muted-foreground">
                {project.repositoryUrl}
              </code>
              <Badge variant="outline" className="text-xs font-mono">
                {project.branch ?? "main"}
              </Badge>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-gray-400" />
              <span className="text-sm text-muted-foreground">未接続</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 環境一覧 */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            環境 ({project.environments.length})
          </h2>
        </div>
        <div className="space-y-2">
          {project.environments.map((env) => (
            <Link
              key={env.id}
              href={`/env/${env.id}`}
              className="flex items-center justify-between rounded-md border px-4 py-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    statusColors[env.status]
                  )}
                />
                <Server className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{env.name}</span>
                <Badge
                  variant="secondary"
                  className={cn("text-xs", envTypeColors[env.type])}
                >
                  {envTypeLabels[env.type]}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">
                  {env.resourceCount} リソース
                </span>
                {env.lastDeployedAt && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(env.lastDeployedAt).toLocaleDateString("ja-JP")}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

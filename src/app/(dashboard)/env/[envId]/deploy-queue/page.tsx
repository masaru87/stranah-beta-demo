"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Play } from "lucide-react";
import { toast } from "sonner";
import { DeployQueueTable } from "@/components/environment/deploy-queue-table";
import { getDeployQueueByEnvironment } from "@/data/mock-deploy-queue";

export default function DeployQueuePage() {
  const params = useParams();
  const envId = params.envId as string;
  const queue = getDeployQueueByEnvironment(envId);
  const runningCount = queue.filter((q) => q.status === "running").length;
  const queuedCount = queue.filter((q) => q.status === "queued").length;

  function handleManualDeploy() {
    toast.success("手動デプロイをキューに追加しました");
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
            <h1 className="text-2xl font-bold">デプロイキュー</h1>
            <p className="text-sm text-muted-foreground">
              デプロイの実行順序と状態を管理
            </p>
          </div>
          <div className="flex gap-2">
            {runningCount > 0 && (
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {runningCount}件 実行中
              </Badge>
            )}
            {queuedCount > 0 && (
              <Badge variant="secondary">{queuedCount}件 待機中</Badge>
            )}
          </div>
        </div>
        <Button size="sm" onClick={handleManualDeploy}>
          <Play className="mr-1.5 h-3.5 w-3.5" />
          手動デプロイ
        </Button>
      </div>

      <DeployQueueTable items={queue} />
    </div>
  );
}

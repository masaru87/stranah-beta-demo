"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { DriftTable } from "@/components/environment/drift-table";
import { getDriftsByEnvironment } from "@/data/mock-drifts";

export default function DriftPage() {
  const params = useParams();
  const envId = params.envId as string;
  const drifts = getDriftsByEnvironment(envId);
  const detectedCount = drifts.filter((d) => d.status === "detected").length;

  function handleSync() {
    toast.success("環境状態を同期しました（最終同期: 今）");
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
            <h1 className="text-2xl font-bold">構成差分検知</h1>
            <p className="text-sm text-muted-foreground">
              テンプレート定義と実環境の差分を表示
            </p>
          </div>
          {detectedCount > 0 && (
            <Badge variant="destructive">{detectedCount}件の差分</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSync}>
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            環境状態を同期
          </Button>
        </div>
      </div>

      <div className="rounded-lg border p-3 text-sm text-muted-foreground">
        最終同期: 2026-03-29 08:15 (さくらクラウド API)
      </div>

      <DriftTable drifts={drifts} />
    </div>
  );
}

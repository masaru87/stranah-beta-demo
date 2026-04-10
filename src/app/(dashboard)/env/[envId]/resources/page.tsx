"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { ResourceTable } from "@/components/environment/resource-table";
import { getInfraNodes } from "@/data/mock-infra-nodes";

export default function ResourcesPage() {
  const params = useParams();
  const envId = params.envId as string;
  const nodes = getInfraNodes(envId);

  const resources = nodes.map((node) => ({
    id: node.id,
    label: node.data.label,
    resourceType: node.data.resourceType,
    status: node.data.status as "running" | "stopped" | "error" | "creating",
    metadata: node.data.metadata,
  }));

  function handleRefresh() {
    toast.success("リソース情報を最新に更新しました");
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
            <h1 className="text-2xl font-bold">リソース一覧</h1>
            <p className="text-sm text-muted-foreground">
              クラウドAPIから取得したリソース情報
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
          更新
        </Button>
      </div>
      <ResourceTable resources={resources} />
    </div>
  );
}

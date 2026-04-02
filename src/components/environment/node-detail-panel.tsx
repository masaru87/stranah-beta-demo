"use client";

import type { Node } from "@xyflow/react";
import type { InfraNodeData } from "@/data/mock-infra-nodes";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Server,
  Database,
  Network,
  Router,
  Cable,
  HardDrive,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  server: Server,
  database: Database,
  "load-balancer": Network,
  router: Router,
  switch: Cable,
  disk: HardDrive,
  internet: Globe,
} as const;

const statusLabels = {
  running: "稼働中",
  stopped: "停止",
  error: "エラー",
  creating: "作成中",
} as const;

const statusVariants = {
  running: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  stopped: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  creating: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
} as const;

type NodeDetailPanelProps = {
  node: Node<InfraNodeData> | null;
  onClose: () => void;
};

export function NodeDetailPanel({ node, onClose }: NodeDetailPanelProps) {
  if (!node) return null;

  const data = node.data as unknown as InfraNodeData;
  const Icon = iconMap[data.resourceType] || Server;
  const metadataEntries = Object.entries(data.metadata);

  return (
    <Sheet open={!!node} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[400px] sm:w-[480px] overflow-y-auto px-6 py-6">
        <SheetHeader className="px-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <SheetTitle>{data.label}</SheetTitle>
              <div className="mt-1 flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={cn("text-xs", statusVariants[data.status])}
                >
                  {statusLabels[data.status]}
                </Badge>
                {data.ip && (
                  <span className="font-mono text-xs text-muted-foreground">
                    {data.ip}
                  </span>
                )}
              </div>
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">
              概要
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              設定
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            {data.spec && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  スペック
                </h4>
                <p className="mt-1 text-sm">{data.spec}</p>
              </div>
            )}

            {metadataEntries.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                    リソース情報
                  </h4>
                  <div className="space-y-3">
                    {metadataEntries.map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-muted-foreground">
                          {key}
                        </span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Separator />
            <div>
              <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                リソースID
              </h4>
              <code className="rounded bg-muted px-2 py-1 text-xs">
                {node.id}
              </code>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-4 space-y-4">
            {data.resourceType === "server" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="hostname">ホスト名</Label>
                  <Input
                    id="hostname"
                    defaultValue={data.metadata["ホスト名"] || ""}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="os">OS</Label>
                  <Input
                    id="os"
                    defaultValue={data.metadata["OS"] || ""}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disk">ディスク</Label>
                  <Input
                    id="disk"
                    defaultValue={data.metadata["ディスク"] || ""}
                    readOnly
                  />
                </div>
              </>
            )}

            {data.resourceType === "database" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="engine">データベースエンジン</Label>
                  <Input
                    id="engine"
                    defaultValue={data.metadata["エンジン"] || ""}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storage">ストレージ</Label>
                  <Input
                    id="storage"
                    defaultValue={data.metadata["ストレージ"] || ""}
                    readOnly
                  />
                </div>
              </>
            )}

            {data.resourceType === "load-balancer" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="vip">VIP</Label>
                  <Input
                    id="vip"
                    defaultValue={data.metadata["VIP"] || ""}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">ポート</Label>
                  <Input
                    id="port"
                    defaultValue={data.metadata["ポート"] || ""}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="balancing">バランシング方式</Label>
                  <Input
                    id="balancing"
                    defaultValue={data.metadata["バランシング方式"] || ""}
                    readOnly
                  />
                </div>
              </>
            )}

            {(data.resourceType === "switch" ||
              data.resourceType === "router" ||
              data.resourceType === "internet" ||
              data.resourceType === "disk") && (
              <div className="space-y-3">
                {metadataEntries.map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label>{key}</Label>
                    <Input defaultValue={value} readOnly />
                  </div>
                ))}
              </div>
            )}

            <Separator />
            <p className="text-xs text-muted-foreground">
              設定の変更はTerraformテンプレートから行います。
            </p>
            <Button variant="outline" className="w-full" disabled>
              テンプレートで編集
            </Button>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

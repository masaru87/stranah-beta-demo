"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Code, Server, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getServicesByEnvironment,
  getInfraLayersByEnvironment,
} from "@/data/mock-services";

const deployStatusLabels: Record<string, string> = {
  idle: "未デプロイ",
  queued: "待機中",
  running: "実行中",
  success: "成功",
  failed: "失敗",
  cancelled: "キャンセル",
};

const deployStatusColors: Record<string, string> = {
  idle: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  queued: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  running: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  cancelled: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

const infraStatusLabels: Record<string, string> = {
  running: "稼働中",
  stopped: "停止",
  error: "エラー",
  creating: "作成中",
};

const infraStatusColors: Record<string, string> = {
  running: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  stopped: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  creating: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

export default function ServicesPage() {
  const params = useParams();
  const envId = params.envId as string;
  const services = getServicesByEnvironment(envId);
  const infraLayers = getInfraLayersByEnvironment(envId);

  const totalMonthlyCost = infraLayers.reduce((sum, i) => {
    const cost = i.monthlyCost
      ? parseInt(i.monthlyCost.replace(/[¥,]/g, ""), 10)
      : 0;
    return sum + cost;
  }, 0);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link href={`/env/${envId}`}>
          <Button variant="ghost" size="icon-sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Service / Infra 管理</h1>
          <p className="text-sm text-muted-foreground">
            アプリケーションサービスとインフラ構成の管理
          </p>
        </div>
      </div>

      <Tabs defaultValue="services">
        <TabsList>
          <TabsTrigger value="services">
            <Code className="mr-1.5 h-3.5 w-3.5" />
            Service ({services.length})
          </TabsTrigger>
          <TabsTrigger value="infra">
            <Server className="mr-1.5 h-3.5 w-3.5" />
            Infra ({infraLayers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ステータス</TableHead>
                <TableHead>サービス名</TableHead>
                <TableHead>リポジトリ</TableHead>
                <TableHead>ブランチ</TableHead>
                <TableHead>ビルドコマンド</TableHead>
                <TableHead>最終デプロイ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((svc) => (
                <TableRow key={svc.id}>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn("text-xs", deployStatusColors[svc.status])}
                    >
                      {deployStatusLabels[svc.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-sm">{svc.name}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {svc.repositoryName}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs font-mono">
                      {svc.branch}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {svc.buildCommand}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {svc.lastDeployedAt
                      ? new Date(svc.lastDeployedAt).toLocaleString("ja-JP")
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="infra" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Cloud className="h-4 w-4" />
                さくらクラウド
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-8">
                <div>
                  <p className="text-xs text-muted-foreground">今月のここまで</p>
                  <p className="text-xl font-bold">¥{Math.round(totalMonthlyCost * 0.3).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">月末予想</p>
                  <p className="text-xl font-bold">¥{totalMonthlyCost.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ステータス</TableHead>
                <TableHead>リソース名</TableHead>
                <TableHead>種別</TableHead>
                <TableHead>リージョン</TableHead>
                <TableHead>スペック</TableHead>
                <TableHead>月額コスト</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {infraLayers.map((infra) => (
                <TableRow key={infra.id}>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn("text-xs", infraStatusColors[infra.status])}
                    >
                      {infraStatusLabels[infra.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {infra.resourceName}
                  </TableCell>
                  <TableCell className="text-sm">{infra.resourceType}</TableCell>
                  <TableCell className="text-sm">{infra.region}</TableCell>
                  <TableCell className="text-sm">{infra.spec}</TableCell>
                  <TableCell className="text-sm">
                    {infra.monthlyCost ?? "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}

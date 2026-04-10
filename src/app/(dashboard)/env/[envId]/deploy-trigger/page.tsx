"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, GitBranch, Wrench, Webhook } from "lucide-react";
import { toast } from "sonner";
import { getServicesByEnvironment } from "@/data/mock-services";

export default function DeployTriggerPage() {
  const params = useParams();
  const envId = params.envId as string;
  const services = getServicesByEnvironment(envId);

  function handleSaveTrigger() {
    toast.success("トリガー設定を保存しました");
  }

  function handleSaveBuild() {
    toast.success("ビルド設定を保存しました");
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link href={`/env/${envId}`}>
          <Button variant="ghost" size="icon-sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">トリガー / ビルド設定</h1>
          <p className="text-sm text-muted-foreground">
            デプロイトリガーとビルドパイプラインの設定
          </p>
        </div>
      </div>

      <Tabs defaultValue="trigger">
        <TabsList>
          <TabsTrigger value="trigger">
            <Webhook className="mr-1.5 h-3.5 w-3.5" />
            トリガー設定
          </TabsTrigger>
          <TabsTrigger value="build">
            <Wrench className="mr-1.5 h-3.5 w-3.5" />
            ビルド設定
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trigger" className="mt-4 space-y-4">
          {services.map((svc) => (
            <Card key={svc.id}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <GitBranch className="h-4 w-4" />
                  {svc.repositoryName}
                </CardTitle>
                <CardDescription>
                  サービス: {svc.name} / ブランチ: {svc.branch}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>有効なイベント</Label>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>push — 対象ブランチへのpush時にデプロイ</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>pull_request (merged) — PRマージ時にデプロイ</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>release — リリース公開時にデプロイ</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>対象ブランチ (正規表現)</Label>
                  <Input defaultValue={`^${svc.branch}$`} placeholder="例: ^main$" />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button size="sm" onClick={handleSaveTrigger}>保存</Button>
        </TabsContent>

        <TabsContent value="build" className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Service単位のビルド設定を管理します
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>サービス名</TableHead>
                <TableHead>ビルドコマンド</TableHead>
                <TableHead>出力ディレクトリ</TableHead>
                <TableHead>リポジトリ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((svc) => (
                <TableRow key={svc.id}>
                  <TableCell className="font-medium text-sm">{svc.name}</TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      {svc.buildCommand}
                    </code>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{svc.outputDir}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs font-mono">
                      {svc.repositoryName}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button size="sm" onClick={handleSaveBuild}>保存</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

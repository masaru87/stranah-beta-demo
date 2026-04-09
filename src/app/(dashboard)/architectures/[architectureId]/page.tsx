"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Layers, Server, Database, Network, Router, Cable, Pencil, History } from "lucide-react";
import { getTemplate } from "@/data/mock-projects";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TemplateApplication } from "@/types";

const mockApplications: TemplateApplication[] = [
  {
    id: "app-1",
    templateId: "tpl-1",
    environmentId: "env-1",
    environmentName: "開発環境",
    projectName: "住民サービスポータル",
    appliedAt: "2026-03-28T10:25:00Z",
    appliedBy: { id: "user-1", name: "菊池 幸太郎", email: "kikuchi@example.com" },
    version: "1.2.0",
  },
  {
    id: "app-2",
    templateId: "tpl-1",
    environmentId: "env-2",
    environmentName: "ステージング環境",
    projectName: "住民サービスポータル",
    appliedAt: "2026-03-25T14:00:00Z",
    appliedBy: { id: "user-1", name: "菊池 幸太郎", email: "kikuchi@example.com" },
    version: "1.2.0",
  },
  {
    id: "app-3",
    templateId: "tpl-1",
    environmentId: "env-3",
    environmentName: "本番環境",
    projectName: "住民サービスポータル",
    appliedAt: "2026-03-20T09:00:00Z",
    appliedBy: { id: "user-2", name: "田中 美咲", email: "tanaka@example.com" },
    version: "1.1.0",
  },
];

const resourceIcons: Record<string, React.ReactNode> = {
  "サーバー": <Server className="h-4 w-4" />,
  "データベースアプライアンス": <Database className="h-4 w-4" />,
  "ロードバランサー": <Network className="h-4 w-4" />,
  "VPCルーター": <Router className="h-4 w-4" />,
  "スイッチ": <Cable className="h-4 w-4" />,
};

export default function ArchitectureDetailPage() {
  const params = useParams();
  const tplId = params.architectureId as string;
  const template = getTemplate(tplId);

  if (!template) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-muted-foreground">テンプレートが見つかりません</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/architectures">
            <Button variant="ghost" size="icon-sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <Layers className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{template.name}</h1>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{template.category}</Badge>
          <Badge variant="outline">v{template.version}</Badge>
          <Dialog>
            <DialogTrigger className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
              <Pencil className="h-3.5 w-3.5" />
              編集
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>テンプレートを編集</DialogTitle>
                <DialogDescription>テンプレートの情報を更新します</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">テンプレート名</Label>
                  <Input id="edit-name" defaultValue={template.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-desc">説明</Label>
                  <Textarea id="edit-desc" defaultValue={template.description} rows={2} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">カテゴリ</Label>
                  <Input id="edit-category" defaultValue={template.category} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-version">バージョン</Label>
                  <Input id="edit-version" defaultValue={template.version} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
                  キャンセル
                </DialogClose>
                <DialogClose
                  className="inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/80"
                  onClick={() => toast.success("テンプレートを更新しました")}
                >
                  保存
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="detail">
        <TabsList>
          <TabsTrigger value="detail">
            <Layers className="mr-1.5 h-3.5 w-3.5" />
            詳細
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-1.5 h-3.5 w-3.5" />
            適用履歴 ({mockApplications.filter(a => a.templateId === tplId).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="detail" className="mt-4 space-y-6">
          {/* リソース構成 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">含まれるリソース</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {template.resourceTypes.map((rt) => (
                  <div
                    key={rt}
                    className="flex items-center gap-3 rounded-md border px-4 py-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                      {resourceIcons[rt] ?? <Server className="h-4 w-4" />}
                    </div>
                    <span className="text-sm font-medium">{rt}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Variables定義 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Variables（設定項目）</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                  <code>server_core</code>
                  <span className="text-muted-foreground">サーバーコア数</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                  <code>server_memory</code>
                  <span className="text-muted-foreground">サーバーメモリ (GB)</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                  <code>db_engine</code>
                  <span className="text-muted-foreground">DBエンジン種別</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                  <code>db_storage_size</code>
                  <span className="text-muted-foreground">DBストレージ容量 (GB)</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                  <code>lb_plan</code>
                  <span className="text-muted-foreground">LBプラン</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => toast.info("ワークスペースダッシュボードの「環境を追加」から作成してください")}>
              このテンプレートで環境を作成
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>環境名</TableHead>
                <TableHead>プロジェクト</TableHead>
                <TableHead>バージョン</TableHead>
                <TableHead>適用者</TableHead>
                <TableHead>適用日時</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockApplications
                .filter((a) => a.templateId === tplId)
                .map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <Link
                        href={`/env/${app.environmentId}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {app.environmentName}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm">{app.projectName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        v{app.version}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{app.appliedBy.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(app.appliedAt).toLocaleString("ja-JP")}
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

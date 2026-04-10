"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Layers, Server, Database, Network, Router, Cable, Coins } from "lucide-react";
import { getTemplate, mockProjects } from "@/data/mock-projects";
import { toast } from "sonner";

const resourceIcons: Record<string, React.ReactNode> = {
  "サーバー": <Server className="h-4 w-4" />,
  "データベースアプライアンス": <Database className="h-4 w-4" />,
  "ロードバランサー": <Network className="h-4 w-4" />,
  "VPCルーター": <Router className="h-4 w-4" />,
  "スイッチ": <Cable className="h-4 w-4" />,
};

export default function ArchitectureDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tplId = params.architectureId as string;
  const template = getTemplate(tplId);

  const [createOpen, setCreateOpen] = useState(false);
  const [selectedWsId, setSelectedWsId] = useState("ws-1");
  const [selectedPjId, setSelectedPjId] = useState("");

  const availableProjects = mockProjects.filter((p) => p.workspaceId === selectedWsId);

  function handleCreate() {
    setCreateOpen(false);
    toast.success("環境を作成しました");
    router.push("/env/env-1");
  }

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
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        {/* コスト目安 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Coins className="h-4 w-4" />
              コスト目安
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">¥3,520〜 <span className="text-sm font-normal text-muted-foreground">/ 月</span></p>
            <p className="mt-1 text-xs text-muted-foreground">※ 最小構成（1台）の場合の参考価格です</p>
          </CardContent>
        </Card>

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

        {/* Secrets定義 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Secrets（機密設定項目）</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                <code>db_password</code>
                <span className="text-muted-foreground">データベースパスワード</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                <code>api_secret_key</code>
                <span className="text-muted-foreground">API シークレットキー</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                <code>ssl_certificate</code>
                <span className="text-muted-foreground">SSL証明書</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={() => setCreateOpen(true)}>
            このテンプレートで環境を作成
          </Button>
        </div>
      </div>

      {/* 環境作成モーダル */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>環境を作成</DialogTitle>
            <DialogDescription>
              「{template.name}」を使用して環境を作成します
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>ワークスペース</Label>
              <Select value={selectedWsId} onValueChange={(v) => { if (v) { setSelectedWsId(v); setSelectedPjId(""); } }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ws-1">東京都 情報システム部</SelectItem>
                  <SelectItem value="ws-2">大阪府 デジタル推進課</SelectItem>
                  <SelectItem value="ws-3">開発チーム</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>プロジェクト</Label>
              <Select value={selectedPjId} onValueChange={(v) => v && setSelectedPjId(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="プロジェクトを選択" />
                </SelectTrigger>
                <SelectContent>
                  {availableProjects.length === 0 ? (
                    <SelectItem value="__none__" disabled>
                      プロジェクトがありません
                    </SelectItem>
                  ) : (
                    availableProjects.map((pj) => (
                      <SelectItem key={pj.id} value={pj.id}>
                        {pj.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tpl-env-name">環境名</Label>
              <Input id="tpl-env-name" placeholder="例: 開発環境" />
            </div>
            <div className="space-y-2">
              <Label>環境タイプ</Label>
              <Select defaultValue="dev">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dev">開発 (dev)</SelectItem>
                  <SelectItem value="stg">ステージング (stg)</SelectItem>
                  <SelectItem value="prod">本番 (prod)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
              キャンセル
            </DialogClose>
            <Button size="sm" onClick={handleCreate} disabled={!selectedPjId}>
              作成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

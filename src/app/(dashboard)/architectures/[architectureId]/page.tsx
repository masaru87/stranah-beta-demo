"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Layers, Server, Database, Network, Router, Cable, Coins } from "lucide-react";
import { getTemplate } from "@/data/mock-projects";
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
          <Button onClick={() => toast.info("ワークスペースダッシュボードの「環境を追加」から作成してください")}>
            このテンプレートで環境を作成
          </Button>
        </div>
      </div>
    </div>
  );
}

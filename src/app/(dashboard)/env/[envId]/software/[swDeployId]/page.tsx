"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, CheckCircle, User, Clock, GitBranch } from "lucide-react";

export default function SoftwareDeployDetailPage() {
  const params = useParams();
  const envId = params.envId as string;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link href={`/env/${envId}/software`}>
          <Button variant="ghost" size="icon-sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">ビルド/デプロイ詳細</h1>
          <p className="text-sm text-muted-foreground">sw-1</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-500" />
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
            成功
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GitBranch className="h-3.5 w-3.5" />
          <Badge variant="outline" className="font-mono text-xs">main</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          菊池 幸太郎
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          5分0秒
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">コミット情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">メッセージ</span>
            <span>feat: 申請フォームのバリデーション追加</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ハッシュ</span>
            <code>a1b2c3d</code>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">リポジトリ</span>
            <span>tokyo-gov/resident-portal</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">ビルドログ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 rounded-md bg-muted/50 p-4 font-mono text-sm">
            <p className="text-muted-foreground">[11:00:00] ソースコードを取得中...</p>
            <p className="text-muted-foreground">[11:00:05] 依存関係をインストール中...</p>
            <p className="text-muted-foreground">[11:01:30] npm install 完了 (85s)</p>
            <p className="text-muted-foreground">[11:01:35] ビルドを実行中...</p>
            <p className="text-muted-foreground">[11:03:00] ビルド完了</p>
            <p className="text-muted-foreground">[11:03:05] コンテナイメージを作成中...</p>
            <p className="text-muted-foreground">[11:04:00] イメージ push 完了</p>
            <p className="text-muted-foreground">[11:04:05] デプロイ実行中...</p>
            <p className="text-emerald-600">[11:05:00] デプロイ成功</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

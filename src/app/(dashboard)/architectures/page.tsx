"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Layers, Plus } from "lucide-react";
import { mockTemplates } from "@/data/mock-projects";
import { toast } from "sonner";

const resourceTypeOptions = [
  "サーバー",
  "データベースアプライアンス",
  "ロードバランサー",
  "VPCルーター",
  "スイッチ",
];

export default function ArchitecturesPage() {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);

  function handleCreate() {
    setCreateOpen(false);
    toast.success("テンプレートを作成しました");
    router.push(`/architectures/${mockTemplates[0].id}`);
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">テンプレート</h1>
          <p className="text-muted-foreground">
            インフラ構成テンプレートを選択して環境を構築
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/80"
          >
            <Plus className="h-3.5 w-3.5" />
            テンプレート作成
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>テンプレートを作成</DialogTitle>
              <DialogDescription>
                クラウド構成テンプレートを定義します
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tpl-name">テンプレート名</Label>
                <Input id="tpl-name" placeholder="例: 官公庁向け Web3層構成" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tpl-desc">説明</Label>
                <Textarea
                  id="tpl-desc"
                  placeholder="テンプレートの用途や構成の概要"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tpl-category">カテゴリ</Label>
                <Input id="tpl-category" placeholder="例: 官公庁標準" />
              </div>
              <div className="space-y-2">
                <Label>含めるリソースタイプ</Label>
                <div className="space-y-2">
                  {resourceTypeOptions.map((rt) => (
                    <label key={rt} className="flex items-center gap-2 text-sm">
                      <Checkbox defaultChecked />
                      {rt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
                キャンセル
              </DialogClose>
              <Button size="sm" onClick={handleCreate}>
                作成
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockTemplates.map((tpl) => (
          <Link key={tpl.id} href={`/architectures/${tpl.id}`}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{tpl.name}</CardTitle>
                    <CardDescription className="mt-0.5">
                      {tpl.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {tpl.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    v{tpl.version}
                  </Badge>
                  {tpl.resourceTypes.map((rt) => (
                    <Badge key={rt} variant="outline" className="text-xs">
                      {rt}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import { Users, FolderKanban, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Workspace } from "@/types";

const initialWorkspaces: Workspace[] = [
  {
    id: "ws-1",
    name: "東京都 情報システム部",
    memberCount: 12,
    projectCount: 3,
    updatedAt: "2026-03-28T10:00:00Z",
  },
  {
    id: "ws-2",
    name: "大阪府 デジタル推進課",
    memberCount: 8,
    projectCount: 2,
    updatedAt: "2026-03-27T15:30:00Z",
  },
  {
    id: "ws-3",
    name: "開発チーム",
    memberCount: 5,
    projectCount: 1,
    updatedAt: "2026-03-25T09:00:00Z",
  },
];

export default function WorkspacePage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  function handleCreate() {
    if (!name.trim()) return;
    const newWs: Workspace = {
      id: `ws-${Date.now()}`,
      name: name.trim(),
      memberCount: 1,
      projectCount: 0,
      updatedAt: new Date().toISOString(),
    };
    setWorkspaces((prev) => [newWs, ...prev]);
    setName("");
    setOpen(false);
    toast.success(`「${newWs.name}」を作成しました`);
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ワークスペース</h1>
          <p className="text-muted-foreground">
            所属するワークスペースを選択してください
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/80">
            <Plus className="h-3.5 w-3.5" />
            ワークスペース作成
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ワークスペースを作成</DialogTitle>
              <DialogDescription>
                企業・組織単位のワークスペースを作成します
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="ws-name">ワークスペース名</Label>
                <Input
                  id="ws-name"
                  placeholder="例: 東京都 デジタル推進部"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
                キャンセル
              </DialogClose>
              <Button size="sm" onClick={handleCreate} disabled={!name.trim()}>
                作成
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((ws) => (
          <Link key={ws.id} href={`/workspace/${ws.id}`}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{ws.name}</CardTitle>
                <CardDescription>
                  最終更新: {new Date(ws.updatedAt).toLocaleDateString("ja-JP")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Badge variant="secondary" className="gap-1">
                    <Users className="h-3 w-3" />
                    {ws.memberCount} メンバー
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <FolderKanban className="h-3 w-3" />
                    {ws.projectCount} プロジェクト
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

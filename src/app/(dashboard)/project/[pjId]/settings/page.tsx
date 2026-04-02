"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ChevronLeft, Trash2, GitBranch, Users } from "lucide-react";
import { getProject } from "@/data/mock-projects";
import { toast } from "sonner";

export default function ProjectSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const pjId = params.pjId as string;
  const project = getProject(pjId);

  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleSaveBasic() {
    toast.success("プロジェクト情報を保存しました");
  }

  function handleSaveGitHub() {
    toast.success("GitHub連携設定を保存しました");
  }

  function handleDelete() {
    setDeleteOpen(false);
    toast.success(`「${project?.name ?? "プロジェクト"}」を削除しました`);
    router.push("/workspace/ws-1");
  }

  const name = project?.name ?? "プロジェクト";
  const description = project?.description ?? "";
  const repoUrl = project?.repositoryUrl ?? "";
  const branch = project?.branch ?? "main";

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link href="/workspace/ws-1">
          <Button variant="ghost" size="icon-sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">プロジェクト設定</h1>
          <p className="text-sm text-muted-foreground">{name}</p>
        </div>
      </div>

      {/* メンバー管理への導線 */}
      <Link href={`/project/${pjId}/member`} className="block">
        <Card className="transition-colors hover:bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4" />
              プロジェクトメンバー
            </CardTitle>
            <CardDescription>メンバーの招待・権限管理</CardDescription>
          </CardHeader>
        </Card>
      </Link>

      {/* 基本情報 */}
      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
          <CardDescription>プロジェクトの名前と説明</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">プロジェクト名</Label>
            <Input id="name" defaultValue={name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <Textarea id="description" defaultValue={description} rows={3} />
          </div>
          <Button size="sm" onClick={handleSaveBasic}>保存</Button>
        </CardContent>
      </Card>

      {/* GitHub連携 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            GitHub連携
          </CardTitle>
          <CardDescription>
            リポジトリと連携してソフトウェアデプロイを自動化
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repo">リポジトリURL</Label>
            <Input id="repo" defaultValue={repoUrl} placeholder="https://github.com/org/repo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="branch">デフォルトブランチ</Label>
            <Input id="branch" defaultValue={branch} />
          </div>
          <Button size="sm" onClick={handleSaveGitHub}>保存</Button>
        </CardContent>
      </Card>

      {/* 危険ゾーン */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">危険な操作</CardTitle>
          <CardDescription>
            プロジェクトを削除すると、配下の全環境も削除されます
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger
              className="inline-flex items-center gap-2 rounded-lg border border-destructive/50 px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              プロジェクトを削除
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>プロジェクトを削除しますか？</DialogTitle>
                <DialogDescription>
                  「{name}」と配下の全環境が削除されます。この操作は取り消せません。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
                  キャンセル
                </DialogClose>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  削除する
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

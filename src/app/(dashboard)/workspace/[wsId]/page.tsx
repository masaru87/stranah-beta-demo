"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Users,
  ChevronRight,
  Server,
  FolderKanban,
  Settings,
  Plus,
  Layers,
} from "lucide-react";
import { getProjectsByWorkspace, mockTemplates } from "@/data/mock-projects";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const envTypeColors = {
  dev: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  stg: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  prod: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
} as const;

const envTypeLabels = {
  dev: "開発",
  stg: "ステージング",
  prod: "本番",
} as const;

const statusColors = {
  active: "bg-emerald-500",
  deploying: "bg-blue-500 animate-pulse",
  failed: "bg-red-500",
  pending: "bg-gray-400",
  destroying: "bg-orange-500",
} as const;

export default function WorkspaceDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const wsId = params.wsId as string;
  const projects = getProjectsByWorkspace(wsId);
  const [createProjOpen, setCreateProjOpen] = useState(false);
  const [createEnvOpen, setCreateEnvOpen] = useState(false);
  const [createEnvProjectId, setCreateEnvProjectId] = useState<string>("");

  function openCreateEnv(projectId: string) {
    setCreateEnvProjectId(projectId);
    setCreateEnvOpen(true);
  }

  function handleCreateEnv() {
    setCreateEnvOpen(false);
    toast.success("環境を作成しました。デプロイを開始します。");
    router.push("/env/env-1");
  }

  return (
    <div className="space-y-6 p-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">東京都 情報システム部</h1>
          <p className="text-muted-foreground">
            {projects.length} プロジェクト
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setCreateProjOpen(true)}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            プロジェクト作成
          </Button>
          <Link href={`/workspace/${wsId}/member`}>
            <Button variant="outline" size="sm">
              <Users className="mr-1.5 h-3.5 w-3.5" />
              メンバー
            </Button>
          </Link>
        </div>
      </div>

      {/* プロジェクト一覧 */}
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                    <FolderKanban className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <Link href={`/project/${project.id}`} className="hover:underline">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                    </Link>
                    {project.description && (
                      <CardDescription className="mt-0.5">
                        {project.description}
                      </CardDescription>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openCreateEnv(project.id)}
                  >
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    環境を追加
                  </Button>
                  <Link href={`/project/${project.id}/settings`}>
                    <Button variant="ghost" size="icon-sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {project.environments.map((env) => (
                  <Link
                    key={env.id}
                    href={`/env/${env.id}`}
                    className="flex items-center justify-between rounded-md border px-4 py-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full",
                          statusColors[env.status]
                        )}
                      />
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{env.name}</span>
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", envTypeColors[env.type])}
                      >
                        {envTypeLabels[env.type]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">
                        {env.resourceCount} リソース
                      </span>
                      {env.lastDeployedAt && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(env.lastDeployedAt).toLocaleDateString(
                            "ja-JP"
                          )}
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* プロジェクト作成ダイアログ */}
      <Dialog open={createProjOpen} onOpenChange={setCreateProjOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>プロジェクトを作成</DialogTitle>
            <DialogDescription>
              クラウド管理単位としてプロジェクトを作成します
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="proj-name">プロジェクト名</Label>
              <Input id="proj-name" placeholder="例: 住民サービスポータル" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proj-desc">説明</Label>
              <Textarea id="proj-desc" placeholder="プロジェクトの概要" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
              キャンセル
            </DialogClose>
            <Button size="sm" onClick={() => { setCreateProjOpen(false); toast.success("プロジェクトを作成しました"); }}>
              作成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 環境作成ダイアログ */}
      <Dialog open={createEnvOpen} onOpenChange={setCreateEnvOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>環境を作成</DialogTitle>
            <DialogDescription>
              テンプレートを選択し、新しい環境を作成します。作成後にデプロイが開始されます。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="env-name">環境名</Label>
              <Input id="env-name" placeholder="例: 開発環境" />
            </div>
            <div className="space-y-2">
              <Label>環境タイプ</Label>
              <Select defaultValue="開発">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="開発">開発 (dev)</SelectItem>
                  <SelectItem value="ステージング">
                    ステージング (stg)
                  </SelectItem>
                  <SelectItem value="本番">本番 (prod)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>テンプレート</Label>
              <Select defaultValue={mockTemplates[0].name}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockTemplates.map((tpl) => (
                    <SelectItem key={tpl.id} value={tpl.name}>
                      <div className="flex items-center gap-2">
                        <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{tpl.name}</span>
                        <span className="text-xs text-muted-foreground">
                          v{tpl.version}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
              キャンセル
            </DialogClose>
            <Button size="sm" onClick={handleCreateEnv}>
              作成してデプロイ開始
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

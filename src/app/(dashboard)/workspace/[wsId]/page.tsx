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
  Coins,
} from "lucide-react";
import { getProjectsByWorkspace, getTemplate, mockTemplates } from "@/data/mock-projects";
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
  const [createEnvStep, setCreateEnvStep] = useState(1);
  const [createMode, setCreateMode] = useState<"template" | "empty">("template");
  const [selectedTemplateId, setSelectedTemplateId] = useState(mockTemplates[0].id);

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

      {/* コストサマリ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Coins className="h-4 w-4" />
            コストサマリ（ワークスペース全体）
          </CardTitle>
          <CardDescription>全プロジェクト・全環境の月額コスト</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">今月のここまで</p>
              <p className="mt-1 text-2xl font-bold">¥29,680</p>
              <p className="text-xs text-muted-foreground">10日経過</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">月末予想</p>
              <p className="mt-1 text-2xl font-bold">¥96,450</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">前月比 -3.2%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">前月実績</p>
              <p className="mt-1 text-2xl font-bold text-muted-foreground">¥99,640</p>
              <p className="text-xs text-muted-foreground">2026年3月</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">環境数</p>
              <p className="mt-1 text-2xl font-bold">{projects.reduce((sum, p) => sum + p.environments.length, 0)}</p>
              <p className="text-xs text-muted-foreground">{projects.length} プロジェクト</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
      <Dialog open={createEnvOpen} onOpenChange={(open) => { setCreateEnvOpen(open); if (!open) { setCreateEnvStep(1); setCreateMode("template"); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {createEnvStep === 1 ? "環境を作成" : "テンプレート確認"}
            </DialogTitle>
            <DialogDescription>
              {createEnvStep === 1
                ? "テンプレートを選択し、新しい環境を作成します"
                : "テンプレートの構成を確認してください"}
            </DialogDescription>
          </DialogHeader>

          {createEnvStep === 1 ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>作成方法</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCreateMode("template")}
                    className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                      createMode === "template"
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="font-medium">テンプレートから</div>
                    <div className="text-xs text-muted-foreground">既存構成を使用</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCreateMode("empty")}
                    className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                      createMode === "empty"
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="font-medium">空から作成</div>
                    <div className="text-xs text-muted-foreground">リソースを後から追加</div>
                  </button>
                </div>
              </div>
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
                    <SelectItem value="ステージング">ステージング (stg)</SelectItem>
                    <SelectItem value="本番">本番 (prod)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {createMode === "template" && (
                <div className="space-y-2">
                  <Label>テンプレート</Label>
                  <Select value={selectedTemplateId} onValueChange={(v) => v && setSelectedTemplateId(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTemplates.map((tpl) => (
                        <SelectItem key={tpl.id} value={tpl.id}>
                          <div className="flex items-center gap-2">
                            <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{tpl.name}</span>
                            <span className="text-xs text-muted-foreground">v{tpl.version}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3 py-4">
              {(() => {
                const tpl = getTemplate(selectedTemplateId);
                if (!tpl) return null;
                return (
                  <>
                    <div className="rounded-md border px-3 py-2">
                      <p className="text-sm font-medium">{tpl.name} <span className="text-xs text-muted-foreground">v{tpl.version}</span></p>
                      <p className="text-xs text-muted-foreground">{tpl.description}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-muted-foreground">含まれるリソース</p>
                      {tpl.resourceTypes.map((rt) => (
                        <div key={rt} className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5 text-sm">
                          <Server className="h-3.5 w-3.5 text-muted-foreground" />
                          {rt}
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          <DialogFooter>
            {createEnvStep === 1 ? (
              <>
                <DialogClose className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
                  キャンセル
                </DialogClose>
                {createMode === "template" ? (
                  <Button size="sm" onClick={() => setCreateEnvStep(2)}>
                    次へ
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleCreateEnv}>
                    空の環境を作成
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setCreateEnvStep(1)}>
                  戻る
                </Button>
                <Button size="sm" onClick={handleCreateEnv}>
                  作成してデプロイ開始
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

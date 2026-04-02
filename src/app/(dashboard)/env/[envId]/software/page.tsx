"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, GitBranch } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { SoftwareDeploy } from "@/types";

const statusLabels: Record<string, string> = {
  queued: "待機中",
  running: "ビルド中",
  success: "成功",
  failed: "失敗",
  cancelled: "キャンセル",
};

const statusColors: Record<string, string> = {
  queued: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  running: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  cancelled: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

const mockSoftwareDeploys: SoftwareDeploy[] = [
  {
    id: "sw-1",
    environmentId: "env-1",
    repositoryName: "tokyo-gov/resident-portal",
    branch: "main",
    commitHash: "a1b2c3d",
    commitMessage: "feat: 申請フォームのバリデーション追加",
    status: "success",
    triggeredBy: { id: "user-1", name: "菊池 幸太郎", email: "kikuchi@example.com" },
    startedAt: "2026-03-28T11:00:00Z",
    finishedAt: "2026-03-28T11:05:00Z",
  },
  {
    id: "sw-2",
    environmentId: "env-1",
    repositoryName: "tokyo-gov/resident-portal",
    branch: "feature/notification",
    commitHash: "e5f6g7h",
    commitMessage: "fix: メール通知の送信エラーを修正",
    status: "failed",
    triggeredBy: { id: "user-3", name: "鈴木 大輔", email: "suzuki@example.com" },
    startedAt: "2026-03-27T15:30:00Z",
    finishedAt: "2026-03-27T15:33:00Z",
  },
  {
    id: "sw-3",
    environmentId: "env-1",
    repositoryName: "tokyo-gov/resident-portal",
    branch: "main",
    commitHash: "i9j0k1l",
    commitMessage: "chore: 依存パッケージの更新",
    status: "success",
    triggeredBy: { id: "user-1", name: "菊池 幸太郎", email: "kikuchi@example.com" },
    startedAt: "2026-03-25T09:00:00Z",
    finishedAt: "2026-03-25T09:04:00Z",
  },
];

export default function SoftwareDeployPage() {
  const params = useParams();
  const envId = params.envId as string;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/env/${envId}`}>
            <Button variant="ghost" size="icon-sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">ソフトウェアデプロイ</h1>
            <p className="text-sm text-muted-foreground">
              アプリケーションのビルド・デプロイ履歴
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/80">
            <GitBranch className="h-3.5 w-3.5" />
            リポジトリ接続
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>GitHubリポジトリを接続</DialogTitle>
              <DialogDescription>
                GitHub App経由でリポジトリを接続します。コード変更をトリガーにビルド・デプロイを自動実行します。
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="gh-owner">オーナー / Organization</Label>
                <Input id="gh-owner" placeholder="例: tokyo-gov" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gh-repo">リポジトリ名</Label>
                <Input id="gh-repo" placeholder="例: resident-portal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gh-branch">対象ブランチ</Label>
                <Input id="gh-branch" defaultValue="main" />
              </div>
              <p className="text-xs text-muted-foreground">
                ※ デモのため実際のGitHub連携は行われません
              </p>
            </div>
            <DialogFooter>
              <DialogClose className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
                キャンセル
              </DialogClose>
              <DialogClose
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/80"
                onClick={() => toast.success("リポジトリを接続しました")}
              >
                <GitBranch className="h-3.5 w-3.5" />
                接続
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ステータス</TableHead>
            <TableHead>コミット</TableHead>
            <TableHead>ブランチ</TableHead>
            <TableHead>実行者</TableHead>
            <TableHead>日時</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSoftwareDeploys.map((deploy) => (
            <TableRow key={deploy.id}>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn("text-xs", statusColors[deploy.status])}
                >
                  {statusLabels[deploy.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm">{deploy.commitMessage}</p>
                  <code className="text-xs text-muted-foreground">
                    {deploy.commitHash}
                  </code>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs font-mono">
                  {deploy.branch}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">
                {deploy.triggeredBy.name}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(deploy.startedAt).toLocaleString("ja-JP")}
              </TableCell>
              <TableCell>
                <Link href={`/env/${envId}/software/${deploy.id}`}>
                  <Button variant="ghost" size="icon-xs">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

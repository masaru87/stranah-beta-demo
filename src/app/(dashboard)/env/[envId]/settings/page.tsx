"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ChevronLeft, Trash2, Variable, KeyRound, Shield } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEnvironment } from "@/data/mock-environments";
import { toast } from "sonner";

export default function EnvSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const envId = params.envId as string;
  const env = getEnvironment(envId);
  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleSave() {
    toast.success("環境設定を保存しました");
  }

  function handleDelete() {
    setDeleteOpen(false);
    toast.success(`「${env?.name ?? "環境"}」を削除しました`);
    router.push("/workspace/ws-1");
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link href={`/env/${envId}`}>
          <Button variant="ghost" size="icon-sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">環境設定</h1>
          <p className="text-sm text-muted-foreground">
            {env?.name ?? "環境"}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="env-name">環境名</Label>
            <Input id="env-name" defaultValue={env?.name ?? ""} />
          </div>
          <Button size="sm" onClick={handleSave}>保存</Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href={`/env/${envId}/settings/variables`}>
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardHeader className="pb-5">
              <CardTitle className="flex items-center gap-2 text-base">
                <Variable className="h-4 w-4" />
                Variables
              </CardTitle>
              <CardDescription>環境変数の管理</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href={`/env/${envId}/settings/secrets`}>
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardHeader className="pb-5">
              <CardTitle className="flex items-center gap-2 text-base">
                <KeyRound className="h-4 w-4" />
                Secrets
              </CardTitle>
              <CardDescription>機密情報の管理</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* 権限設定 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4" />
            権限設定
          </CardTitle>
          <CardDescription>
            この環境へのアクセス権限をグループごとに設定
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>グループ</TableHead>
                <TableHead className="text-center">閲覧</TableHead>
                <TableHead className="text-center">デプロイ</TableHead>
                <TableHead className="text-center">設定変更</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-sm">管理者</TableCell>
                <TableCell className="text-center"><input type="checkbox" defaultChecked disabled className="rounded" /></TableCell>
                <TableCell className="text-center"><input type="checkbox" defaultChecked disabled className="rounded" /></TableCell>
                <TableCell className="text-center"><input type="checkbox" defaultChecked disabled className="rounded" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-sm">メンバー</TableCell>
                <TableCell className="text-center"><input type="checkbox" defaultChecked className="rounded" /></TableCell>
                <TableCell className="text-center"><input type="checkbox" defaultChecked className="rounded" /></TableCell>
                <TableCell className="text-center"><input type="checkbox" className="rounded" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-sm">閲覧のみ</TableCell>
                <TableCell className="text-center"><input type="checkbox" defaultChecked className="rounded" /></TableCell>
                <TableCell className="text-center"><input type="checkbox" className="rounded" /></TableCell>
                <TableCell className="text-center"><input type="checkbox" className="rounded" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-sm">請求情報閲覧</TableCell>
                <TableCell className="text-center"><input type="checkbox" className="rounded" /></TableCell>
                <TableCell className="text-center"><input type="checkbox" className="rounded" /></TableCell>
                <TableCell className="text-center"><input type="checkbox" className="rounded" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4">
            <Button size="sm" onClick={() => toast.success("権限設定を保存しました")}>保存</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">危険な操作</CardTitle>
          <CardDescription>
            環境を削除すると全リソースが破棄されます
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger
              className="inline-flex items-center gap-2 rounded-lg border border-destructive/50 px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              環境を削除
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>環境を削除しますか？</DialogTitle>
                <DialogDescription>
                  Terraform stateがクリアされ、全リソースが破棄されます。この操作は取り消せません。
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

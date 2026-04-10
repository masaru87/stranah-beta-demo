"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, User, KeyRound } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  function handleSave() {
    toast.success("プロファイルを更新しました");
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link href="/workspace">
          <Button variant="ghost" size="icon-sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">プロファイル</h1>
          <p className="text-sm text-muted-foreground">
            アカウント情報の確認・変更
          </p>
        </div>
      </div>

      {/* アバター */}
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg">菊</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-medium">菊池 幸太郎</p>
          <p className="text-sm text-muted-foreground">東京都 情報システム部</p>
        </div>
      </div>

      {/* 基本情報 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4" />
            基本情報
          </CardTitle>
          <CardDescription>名前やメールアドレスの変更</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile-name">名前</Label>
            <Input id="profile-name" defaultValue="菊池 幸太郎" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-email">メールアドレス</Label>
            <Input id="profile-email" defaultValue="kikuchi@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-company">所属</Label>
            <Input id="profile-company" defaultValue="東京都 情報システム部" />
          </div>
          <Button size="sm" onClick={handleSave}>保存</Button>
        </CardContent>
      </Card>

      {/* パスワード変更 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <KeyRound className="h-4 w-4" />
            パスワード変更
          </CardTitle>
          <CardDescription>ログインパスワードの変更</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-pw">現在のパスワード</Label>
            <Input id="current-pw" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-pw">新しいパスワード</Label>
            <Input id="new-pw" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-pw">新しいパスワード（確認）</Label>
            <Input id="confirm-pw" type="password" />
          </div>
          <Button size="sm" onClick={() => toast.success("パスワードを変更しました")}>
            パスワードを変更
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

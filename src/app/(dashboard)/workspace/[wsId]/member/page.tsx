"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { ChevronLeft, Plus, Mail, Trash2, RotateCw, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getMembersByWorkspace } from "@/data/mock-projects";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Role, Member } from "@/types";

const roleLabels: Record<Role, string> = {
  owner: "オーナー",
  admin: "管理者",
  member: "メンバー",
  viewer: "閲覧者",
};

const statusLabels: Record<string, string> = {
  active: "アクティブ",
  invited: "招待中",
  pending: "保留",
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  invited: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  pending: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
};

export default function MemberManagementPage() {
  const params = useParams();
  const wsId = params.wsId as string;
  const [members, setMembers] = useState<Member[]>(() =>
    getMembersByWorkspace(wsId)
  );
  const [inviteOpen, setInviteOpen] = useState(false);

  function handleResend(member: Member) {
    toast.success(`${member.user.email} に招待を再送しました`, {
      description: "デモのため実際には送信されていません",
    });
  }

  function handleCancelInvite(member: Member) {
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
    toast.success(`${member.user.name} の招待をキャンセルしました`);
  }

  function handleRemove(member: Member) {
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
    toast.success(`${member.user.name} を削除しました`);
  }

  function handleInvite() {
    setInviteOpen(false);
    toast.success("招待を送信しました", {
      description: "デモのため実際には送信されていません",
    });
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/workspace/${wsId}`}>
            <Button variant="ghost" size="icon-sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">メンバー管理</h1>
            <p className="text-sm text-muted-foreground">
              {members.length} 名のメンバー
            </p>
          </div>
        </div>
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/80"
          >
            <Plus className="h-3.5 w-3.5" />
            メンバーを招待
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>メンバーを招待</DialogTitle>
              <DialogDescription>
                メールアドレスを入力して招待リンクを送信します
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="invite-email">メールアドレス</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="user@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>権限</Label>
                <Select defaultValue="メンバー">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="管理者">管理者</SelectItem>
                    <SelectItem value="メンバー">メンバー</SelectItem>
                    <SelectItem value="閲覧者">閲覧者</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground">
                ※ デモのため実際にはメールは送信されません
              </p>
            </div>
            <DialogFooter>
              <DialogClose
                className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted"
              >
                キャンセル
              </DialogClose>
              <Button size="sm" onClick={handleInvite}>
                <Mail className="mr-1.5 h-3.5 w-3.5" />
                招待を送信
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>メンバー</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead>権限</TableHead>
            <TableHead>参加日</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {member.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.user.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn("text-xs", statusColors[member.status])}
                >
                  {statusLabels[member.status]}
                </Badge>
              </TableCell>
              <TableCell>
                {member.role === "owner" ? (
                  <span className="text-sm font-medium">
                    {roleLabels[member.role]}
                  </span>
                ) : (
                  <Select
                    defaultValue={roleLabels[member.role]}
                    onValueChange={(val) =>
                      toast.success(
                        `${member.user.name} の権限を${val}に変更しました`
                      )
                    }
                  >
                    <SelectTrigger className="w-28 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="管理者">管理者</SelectItem>
                      <SelectItem value="メンバー">メンバー</SelectItem>
                      <SelectItem value="閲覧者">閲覧者</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {member.joinedAt
                  ? new Date(member.joinedAt).toLocaleDateString("ja-JP")
                  : member.invitedAt
                    ? `${new Date(member.invitedAt).toLocaleDateString("ja-JP")} 招待`
                    : "—"}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {member.status === "invited" && (
                    <>
                      <Tooltip>
                        <TooltipTrigger
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-muted"
                          onClick={() => handleResend(member)}
                        >
                          <RotateCw className="h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>招待を再送</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-muted"
                          onClick={() => handleCancelInvite(member)}
                        >
                          <X className="h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>招待をキャンセル</TooltipContent>
                      </Tooltip>
                    </>
                  )}
                  {member.role !== "owner" && member.status !== "invited" && (
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleRemove(member)}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
